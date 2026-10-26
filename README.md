# V-deos-2d

Fábrica de vídeos de animação 2D (vetorial/SVG). Você envia o áudio da narração, o roteiro e uma linha com tema e tom; o Claude desenha as cenas, sintetiza efeitos e música e entrega um MP4 vertical 1080x1920 a 30 fps, sem legendas.

As regras e o fluxo completo estão em [`CLAUDE.md`](CLAUDE.md).

## Estrutura

- `tools/align.py`: alinha roteiro e áudio (`words.json`) por pausas e sílabas (estimativa).
- `tools/synth.py`: efeitos sintetizados (numpy/scipy) e mixagem voz + efeitos + música.
- `tools/render.py`: renderiza a cena HTML com Chromium/Playwright e gera o MP4 com FFmpeg; também faz folha de miniaturas (`--preview`) e checagens (`--check`).
- `tools/selftest.py`: teste de ponta a ponta com narração sintética.
- `lib/helpers.js`: funções neutras de SVG e animação.
- `templates/scene_template.html`: modelo de cena (sem legendas).
- `videos/<nome>/`: roteiro, `words.json`, `scene.html` e `events.json` de cada vídeo.

## Requisitos

Python 3 com numpy, scipy e playwright (Chromium instalado), FFmpeg/ffprobe e, opcionalmente, Pillow para a folha de miniaturas rotulada.

## Uso rápido

```bash
python tools/selftest.py                                   # confere o ambiente
python tools/align.py audio.mp3 videos/x/roteiro.txt --out videos/x/words.json
python tools/synth.py mix --voice audio.mp3 --events videos/x/events.json --out /tmp/mix.wav
python tools/render.py videos/x/scene.html --preview 0 3 6 --check
python tools/render.py videos/x/scene.html --audio /tmp/mix.wav --out out/x.mp4
```

## Limites

A sincronização é estimada (pausas e sílabas), o resultado sonoro não é ouvido por quem o produz, o estilo é vetorial e os efeitos são sintetizados.
