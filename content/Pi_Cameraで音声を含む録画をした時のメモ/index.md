---
title: "Pi_Cameraで音声を含む録画をした時のメモ"
date: 2019-12-15T22:09:19+09:00
draft: false
archives: 2019-12
tags: 
    - Linux
    - Raspberry Pi
---
## はじめに
Raspbian BusterでFFmpegを使い、Webカメラから音声を含む映像を取得している記事がなかったため、メモとして残します．
時間があればきれいにします．
この記事はエラーの対処のみを書き、ffmpegでの録画の仕方は解説しません。参考にさせていただいた記事を見ていただくようお願いします．


## 音声がうまく取れない
https://signal-flag-z.blogspot.com/2016/09/rapberry-pi-3-h264omxffmpeg.html
こちらの記事を参考にさせていただいたところ、どうもRaspbian Buster環境もしくは最新(2019年12月当時)のffmpeg,ALSA環境だとエラーが出るようです．
以下のような引数で実行したところ，以下のようなエラーが出ました．

```bash
ffmpeg -f alsa -thread_queue_size 8192 -i hw:1,0 \
  -f v4l2 -thread_queue_size 8192 -s 640x480 -i /dev/video0 \
  -c:v h264_omx -b:v 768k \  
  -c:a aac \
  output.mp4 
```  

```bash
cannot set channel count to 2 (Invalid argument) hw:1,0: Input/output error
```

## 解決策．
おそらくバージョンアップ等により引数の形が変わったのでしょう．
以下のような引数にしたところ、正常に動作して音声もとれていました．

```bash
ffmpeg -f alsa -thread_queue_size 8192 -i plughw:1,0 \
 -f v4l2 -thread_queue_size 8192 -s 640x480 -i /dev/video0 \
 -c:v h264_omx -b:v 768k \ 
 -c:a aac \
 output.mp4
```
違いはマイクの指定を`hw:1,0`とするのではなく、`plughw:1,0`とするところです．

## 1080pで録画しようとするとなんかエラー出る
Pi Camera v1.3を使い1080p 5fps程度の動画を録画しようとしたところよくわからないエラーでFFmpegが落ちました．
エラーで検索してもほんとに情報がなくて苦労したのですが，結局`config.txt`の`gpu_mem`からGPUに割り当てるメモリを増やしたところうまく録画することができました．