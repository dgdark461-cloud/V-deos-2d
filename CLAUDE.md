# CLAUDE.md — Fábrica de vídeos de animação 2D

O usuário envia **só**: (1) o áudio da narração, (2) o texto do roteiro, (3) uma linha com tema e tom.
Claude cria as cenas, os efeitos sonoros e a música, e entrega **um MP4**.

## Regras fixas

1. **Sem legendas.** Os vídeos NÃO têm legendas, texto falado na tela nem camada de captions, a menos que o usuário peça de forma explícita para aquele vídeo. Texto que faz parte do desenho (placa, contador, tela de celular) é permitido.
2. **Nada é predefinido.** Personagem, cores, luz, cenários e ritmo nascem do conteúdo e do tom de cada áudio. Não reaproveitar o visual de um vídeo anterior nem de qualquer referência mostrada. Referências servem só para entender o nível de qualidade.
3. **Claude escolhe os efeitos sonoros**, com uso moderado e coerente com o clima da narração. O usuário envia só a narração.
4. **Formato padrão:** vertical 9:16, 1080x1920, 30 fps, salvo pedido diferente.
5. **Personagens sempre originais.** Nada de personagens, logos ou marcas conhecidos.
6. **Cada frase tem uma intenção visual e nada fica parado.** Os primeiros 12 segundos são os mais elaborados e mostram logo a situação que a narração descreve.

## Fluxo

1. **Testar o ambiente.** Conferir Python, Node, FFmpeg/ffprobe, numpy/scipy e Chromium com Playwright. Se pip, npm ou downloads de modelos (Whisper etc.) estiverem bloqueados, não contornar: usar só o que já está instalado. Como Claude não ouve nem transcreve o áudio, **o texto do roteiro é obrigatório**. Rodar `python tools/selftest.py` se houver dúvida sobre as ferramentas.
2. **Alinhar texto e áudio:** `python tools/align.py <audio> videos/<nome>/roteiro.txt --out videos/<nome>/words.json`. Em narração muito comprimida (poucas pausas detectadas), testar `--drop-db 16`.
3. **Planejar as cenas**, trocando de cena nas pausas (`words.json` → `pauses`/`segments`), com paleta e clima por cena. Anotar o plano em poucas linhas antes de desenhar.
4. **Desenhar cada cena em SVG como função do tempo `t`** (`templates/scene_template.html` + `lib/helpers.js`), usando `words.json` para disparar as animações (`H.timeOf`, `H.wordIndexAt`). `setT(t)` deve ser pura: mesmo `t`, mesmo quadro (aleatório só com `H.rng` e semente fixa). **Cada gradiente, recorte e filtro do SVG precisa de id único por cena** (prefixo `s1_`, `s2_`…), porque durante a transição de cerca de 0,25 s duas cenas aparecem juntas. Marcar rostos com `data-face=""`.
5. **Montar efeitos e música e mixar:** escrever `videos/<nome>/events.json` (ver cabeçalho de `tools/synth.py`) e rodar `python tools/synth.py mix --voice <audio> --events videos/<nome>/events.json --out /tmp/mix.wav`. Efeitos bem abaixo da voz, música que abaixa quando a voz fala, limitador suave.
6. **Folha de miniaturas e checagem antes de renderizar tudo:** `python tools/render.py videos/<nome>/scene.html --preview <t1> <t2> ... --check`. Abrir a folha (`render_tmp/<nome>/preview.jpg`) e conferir **texto cortado, rosto tapado, elemento fora da tela e ids repetidos**. Incluir instantes dentro das transições. Corrigir e repetir.
7. **Renderizar** (em segundo plano se for longo; dá para dividir com `--start/--end --no-encode` em vários processos e juntar com `--encode-only`). Conferir uma folha de miniaturas do MP4 final (ex.: extrair quadros com FFmpeg) e o volume do áudio (`ffmpeg -i out.mp4 -af volumedetect -f null -`; pico perto de -1 dBFS, sem corte).
8. **Entregar o MP4** com uma ou duas frases sobre o resultado.

## Limites (dizer com honestidade ao entregar)

- A sincronização é **estimada** pelas pausas e sílabas; não há transcrição.
- Claude **não escuta** o resultado: só mede pico/volume e olha miniaturas.
- O estilo é **vetorial/geométrico** (sem imagens realistas).
- Os efeitos são **sintetizados**, não gravações.

## Organização

- `videos/<nome-do-video>/` por vídeo: `roteiro.txt`, `words.json`, `scene.html`, `events.json` (e, se a cena for grande, arquivos de apoio como `art.js` e `scenes.js` na mesma pasta). O áudio original e o MP4 final **não** são versionados (ficam fora do git).
- Não versionar frames, WAV grandes nem `render_tmp/` (já no `.gitignore`).
- `tools/` e `lib/` são genéricos e não carregam estilo: nada de cores, personagens ou cenários de um vídeo específico aí.
- Commits na branch `main`.
