#!/usr/bin/env python3
"""render.py - renderiza uma cena HTML (SVG em função do tempo) para MP4.

A página precisa expor window.setT(t) (t em segundos) que desenha o quadro de forma
síncrona. Opcional: window.READY = false até terminar de carregar (ex.: words.json) e
true depois; window.DURATION (s) se não passar --audio/--duration.

Exemplos:
  # folha de miniaturas + checagens (texto cortado, elemento fora da tela, ids repetidos, rosto tapado)
  python tools/render.py videos/x/scene.html --preview 0 1 2.5 5 8 --check

  # render completo com áudio
  python tools/render.py videos/x/scene.html --audio /tmp/mix.wav --out out/x.mp4

  # dividir em processos (frames independentes) e depois juntar
  python tools/render.py videos/x/scene.html --audio mix.wav --start 0  --end 30 --no-encode &
  python tools/render.py videos/x/scene.html --audio mix.wav --start 30 --end 60 --no-encode &
  wait
  python tools/render.py videos/x/scene.html --audio mix.wav --out out/x.mp4 --encode-only

Opções principais: --preview t1 t2 ..., --audio, --duration, --out, --start, --end,
--no-encode, --encode-only. Padrão: 1080x1920, 30 fps (vertical 9:16). --scale 0.5 para testes rápidos.
"""
import argparse, functools, http.server, json, os, re, shutil, subprocess, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHECK_JS = r"""
() => {
  const W = innerWidth, H = innerHeight, out = [];
  const skip = new Set(['defs','clipPath','mask','linearGradient','radialGradient','pattern',
                        'stop','filter','style','script','title','desc','metadata','symbol',
                        'feGaussianBlur','feOffset','feBlend','feColorMatrix','feFlood',
                        'feComposite','feMerge','feMergeNode','feTurbulence','feDisplacementMap']);
  // ids repetidos
  const seen = {};
  document.querySelectorAll('[id]').forEach(e => { seen[e.id] = (seen[e.id] || 0) + 1; });
  Object.keys(seen).filter(k => seen[k] > 1).forEach(k => out.push(['id repetido', '#' + k + ' x' + seen[k]]));
  const effOpacity = (e) => {
    let o = 1;
    for (let n = e; n && n.nodeType === 1; n = n.parentNode) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return 0;
      o *= parseFloat(cs.opacity);
      const oa = n.getAttribute && n.getAttribute('opacity');
      if (oa !== null && oa !== undefined && oa !== '') o *= parseFloat(oa);
      if (o < 0.04) return 0;
    }
    return o;
  };
  const inDefs = (e) => { for (let n = e; n && n.nodeType === 1; n = n.parentNode)
      if (skip.has(n.tagName)) return true; return false; };
  const label = (e) => e.tagName + (e.id ? '#' + e.id : '') +
      (e.getAttribute('class') ? '.' + e.getAttribute('class').split(' ')[0] : '');
  document.querySelectorAll('body *').forEach(e => {
    if (inDefs(e) || e.tagName === 'svg' || e.tagName === 'g') return;
    if (effOpacity(e) === 0) return;
    const r = e.getBoundingClientRect();
    if (r.width < 1 && r.height < 1) return;
    const isText = e.tagName === 'text' || e.tagName === 'tspan';
    const outside = r.left < -2 || r.top < -2 || r.right > W + 2 || r.bottom > H + 2;
    if (!outside) return;
    const area = r.width * r.height;
    if (isText) out.push(['texto cortado/fora da tela', label(e) + ' [' + [r.left, r.top, r.right, r.bottom].map(Math.round) + ']']);
    else if (area < 0.25 * W * H)
      out.push(['elemento fora da tela', label(e) + ' [' + [r.left, r.top, r.right, r.bottom].map(Math.round) + ']']);
  });
  // rosto tapado: elementos marcados com data-face devem ficar no topo no próprio centro
  document.querySelectorAll('[data-face]').forEach(f => {
    if (effOpacity(f) === 0) return;
    const r = f.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx < 0 || cy < 0 || cx > W || cy > H) { out.push(['rosto fora da tela', label(f)]); return; }
    const top = document.elementFromPoint(cx, cy);
    if (top && !f.contains(top) && !top.contains(f)) out.push(['rosto possivelmente tapado', label(f) + ' por ' + label(top)]);
  });
  return out;
}
"""


# ----------------------------------------------------------------- utilidades
def ffprobe_duration(path):
    p = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "default=nw=1:nk=1", path], capture_output=True, text=True)
    try:
        return float(p.stdout.strip())
    except ValueError:
        sys.exit(f"não consegui ler a duração de {path}")


def start_server(root):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=root)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def static_id_check(html_path):
    try:
        src = open(html_path, encoding="utf-8").read()
    except OSError:
        return
    ids = re.findall(r"""\bid=["']([^"'$`{}]+)["']""", src)
    dup = sorted({i for i in ids if ids.count(i) > 1})
    if dup:
        print("AVISO ids repetidos no HTML estático:", ", ".join(dup))


def open_page(p, url, w, h, scale=1.0):
    browser = p.chromium.launch(args=["--force-color-profile=srgb", "--disable-lcd-text"])
    page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=scale)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" else None)
    page.goto(url, wait_until="load")
    page.evaluate("document.fonts && document.fonts.ready")
    page.wait_for_function("window.READY !== false", timeout=30000)
    if not page.evaluate("typeof window.setT === 'function'"):
        sys.exit("a página não define window.setT(t)\n" + "\n".join(errors))
    return browser, page, errors


def contact_sheet(files, labels, out, cols=6, tw=270):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        tmp = os.path.dirname(files[0])
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-pattern_type", "glob", "-i", os.path.join(tmp, "p*.jpg"),
                        "-vf", f"scale={tw}:-1,tile={min(cols, len(files))}x{-(-len(files) // cols)}", out], check=True)
        return
    ims = [Image.open(f).convert("RGB") for f in files]
    th = int(tw * ims[0].height / ims[0].width)
    rows = -(-len(ims) // cols)
    pad, lab = 6, 22
    sheet = Image.new("RGB", (cols * (tw + pad) + pad, rows * (th + lab + pad) + pad), (24, 24, 28))
    d = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 15)
    except OSError:
        font = ImageFont.load_default()
    for i, (im, lb) in enumerate(zip(ims, labels)):
        x = pad + (i % cols) * (tw + pad)
        y = pad + (i // cols) * (th + lab + pad)
        sheet.paste(im.resize((tw, th), Image.LANCZOS), (x, y + lab))
        d.text((x + 2, y + 2), lb, fill=(230, 230, 230), font=font)
    sheet.save(out, quality=90)


# ----------------------------------------------------------------- principal
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("html", help="página da cena (dentro do repositório)")
    ap.add_argument("--audio", help="áudio final (mix) a juntar no MP4")
    ap.add_argument("--duration", type=float, help="duração em s (padrão: do áudio ou window.DURATION)")
    ap.add_argument("--out", default="out/video.mp4")
    ap.add_argument("--scale", type=float, default=1.0,
                    help="fator de escala da saída (ex.: 0.5 gera 540x960 sem mudar o layout 1080x1920)")
    ap.add_argument("--fps", type=int, default=30)
    ap.add_argument("--width", type=int, default=1080)
    ap.add_argument("--height", type=int, default=1920)
    ap.add_argument("--start", type=float, default=0.0, help="primeiro instante a renderizar (s)")
    ap.add_argument("--end", type=float, default=None, help="fim do trecho a renderizar (s)")
    ap.add_argument("--preview", type=float, nargs="+", metavar="T", help="folha de miniaturas nesses instantes")
    ap.add_argument("--sheet", default=None, help="arquivo da folha (padrão: render_tmp/<cena>/preview.jpg)")
    ap.add_argument("--check", action="store_true", help="checa texto cortado, fora da tela, ids repetidos, rosto tapado")
    ap.add_argument("--no-encode", action="store_true", help="só gera os quadros JPEG")
    ap.add_argument("--encode-only", action="store_true", help="só junta quadros já gerados + áudio")
    ap.add_argument("--frames-dir", default=None)
    ap.add_argument("--quality", type=int, default=92, help="qualidade JPEG dos quadros")
    ap.add_argument("--crf", type=int, default=18)
    ap.add_argument("--resume", action="store_true", help="pula quadros JPEG que já existem")
    a = ap.parse_args()

    html = os.path.abspath(a.html)
    if not os.path.exists(html):
        sys.exit(f"não achei {a.html}")
    stem = os.path.basename(os.path.dirname(html)) or os.path.splitext(os.path.basename(html))[0]
    tmp = os.path.join(ROOT, "render_tmp", stem)
    frames = a.frames_dir or os.path.join(tmp, "frames")
    os.makedirs(frames, exist_ok=True)

    dur = a.duration or (ffprobe_duration(a.audio) if a.audio else None)

    # ---- apenas encode
    if a.encode_only:
        if dur is None:
            sys.exit("--encode-only precisa de --audio ou --duration")
        return encode(a, frames, dur)

    # ---- servidor local + página
    root = ROOT if html.startswith(ROOT) else os.path.dirname(html)
    srv = start_server(root)
    url = f"http://127.0.0.1:{srv.server_address[1]}/" + os.path.relpath(html, root).replace(os.sep, "/")
    static_id_check(html)
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser, page, errors = open_page(p, url, a.width, a.height, a.scale)
        if dur is None:
            dur = page.evaluate("window.DURATION || null")
        if a.preview:
            ptmp = os.path.join(tmp, "preview")
            shutil.rmtree(ptmp, ignore_errors=True)
            os.makedirs(ptmp)
            files, labels = [], []
            for i, t in enumerate(a.preview):
                page.evaluate("t => window.setT(t)", t)
                f = os.path.join(ptmp, f"p{i:03d}.jpg")
                page.screenshot(path=f, type="jpeg", quality=85)
                files.append(f)
                labels.append(f"t = {t:g}s")
                if a.check:
                    report(page, t)
            sheet = a.sheet or os.path.join(tmp, "preview.jpg")
            contact_sheet(files, labels, sheet)
            print("folha de miniaturas:", sheet)
        elif a.check:
            end = dur or 10
            t = 0.0
            while t <= end:
                page.evaluate("tt => window.setT(tt)", t)
                report(page, t)
                t += 1.0
        if errors:
            print("ERROS NA PÁGINA:\n  " + "\n  ".join(sorted(set(errors))[:10]))
        if a.preview or a.check:
            browser.close(); srv.shutdown()
            return

        if dur is None:
            sys.exit("informe --audio, --duration ou defina window.DURATION na página")
        end = min(a.end if a.end is not None else dur, dur)
        f0 = int(round(a.start * a.fps))
        f1 = int(round(end * a.fps))
        print(f"renderizando quadros {f0}..{f1 - 1} ({int(a.width * a.scale)}x{int(a.height * a.scale)} @ {a.fps} fps)")
        for fr in range(f0, f1):
            fpath = os.path.join(frames, f"f{fr:06d}.jpg")
            if a.resume and os.path.exists(fpath) and os.path.getsize(fpath) > 1000:
                continue
            page.evaluate("t => window.setT(t)", fr / a.fps)
            page.screenshot(path=fpath, type="jpeg", quality=a.quality)
            if (fr - f0) % 90 == 0:
                print(f"  quadro {fr}/{f1 - 1}", flush=True)
        browser.close(); srv.shutdown()
        if errors:
            print("ERROS NA PÁGINA:\n  " + "\n  ".join(sorted(set(errors))[:10]))
    if not a.no_encode:
        encode(a, frames, dur)


def report(page, t):
    issues = page.evaluate(CHECK_JS)
    if not issues:
        print(f"[t={t:g}s] ok")
        return
    seen = set()
    for kind, what in issues[:12]:
        if (kind, what) in seen:
            continue
        seen.add((kind, what))
        print(f"[t={t:g}s] AVISO {kind}: {what}")


def encode(a, frames, dur):
    n = int(round(dur * a.fps))
    have = {f for f in os.listdir(frames) if re.fullmatch(r"f\d{6}\.jpg", f)}
    missing = [i for i in range(n) if f"f{i:06d}.jpg" not in have]
    if missing:
        sys.exit(f"faltam {len(missing)} quadros (ex.: {missing[:5]}); renderize os trechos que faltam antes de --encode-only")
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    cmd = ["ffmpeg", "-y", "-v", "error", "-framerate", str(a.fps), "-start_number", "0",
           "-i", os.path.join(frames, "f%06d.jpg")]
    if a.audio:
        cmd += ["-i", a.audio]
    cmd += ["-frames:v", str(n), "-c:v", "libx264", "-preset", "medium", "-crf", str(a.crf),
            "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
    if a.audio:
        cmd += ["-c:a", "aac", "-b:a", "192k", "-t", f"{dur:.3f}", "-map", "0:v:0", "-map", "1:a:0"]
    cmd.append(a.out)
    subprocess.run(cmd, check=True)
    size = os.path.getsize(a.out) / 1e6
    print(f"MP4: {a.out} ({size:.1f} MB, {dur:.2f}s, {n} quadros)")


if __name__ == "__main__":
    main()
