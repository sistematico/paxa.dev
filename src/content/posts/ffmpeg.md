---
title: "Manipulação de vídeo usando o ffmpeg"
description: "This post is for testing the draft post functionality"
publishDate: "10 Mar 2016"
tags: ["ffmpeg", "snippets"]
draft: false
---

Vou postar aqui alguns snippets para a manipulação de vídeos usando o [ffmpeg](https://www.ffmpeg.org/).

# Edição
Cortando um vídeo

```
ffmpeg -i original.mp4 -ss 00:00:30.0 -c copy -t 00:00:10.0 alterado.mp4
```

Onde `-ss 00:00:30.0` é o tempo que o vídeo deve iniciar, neste caso 30 segundos.
E `-t 00:00:10.0` é a duração do vídeo, neste caso 10 segundos.

# Conversão

Convertendo um arquivo de vídeo FLV em MP4.

```
ffmpeg -i video.flv -codec copy "${video%.flv}.mp4"
```

# Escala

Diminuindo um vídeo.

```
ffmpeg -i video_1920.mp4 -vf scale=640:360 video_640.mp4 -hide_banner
```

Forte abraço.
