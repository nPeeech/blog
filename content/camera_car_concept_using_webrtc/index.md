---
title: "WebRTCを使ったカメラ付きラジコンカーをつくりたい"
date: 2020-12-08T12:19:48+09:00
draft: false
archives: 2020-12
tags:
    - 環境構築シリーズ
    - Raspberry Pi
    - Linux
---
## はじめに
この記事は[東京高専プロコンゼミ① Advent Calendar 2020](https://adventar.org/calendars/5509)の10日目です．


[WebRTC Native Client Momo](https://github.com/shiguredo/momo)とRaspberry Piを使って，遠くから操作できるカメラ付きラジコンﾓﾄﾞｷを作りたいという記事です．

タイトルにWebRTCと入っていますが，WebRTCについてよくわかってないです．ごめんなさい．

## WebRTCとは  

> WebRTCを使用すると、オープンスタンダード上で動作するリアルタイム通信機能をアプリケーションに追加できます。出典:[WebRTC](https://webrtc.org/)

今回はAndroid上のGoogle ChromeとRaspberry Pi上の[WebRTC Native Client Momo](https://github.com/shiguredo/momo)で通信を行います．

## インストール
Momoの[Relese](https://github.com/shiguredo/momo/releases)より自分にあったファイルをダウンロードします．Raspberry Pi 2,3,4は`momo-<VERSION>_raspberry-pi-os_armv7.tar.gz`という名前のファイルです．`tar xvf [ファイル名]`で解凍できます．中にある`momo`が実行ファイルです．

以下で必要なパッケージを入れておきます．
```
sudo apt-get install libnspr4 libnss3
```

## ローカルで動かす
ひとまずRaspberry PiとAndroid端末がローカルネットワークにある状態で動かしてみます．

Momoをtestモードで起動します．
```
./momo --no-audio-device test
```

AndroidのChromeのアドレスバー以下を入力します．
```
<Raspberry PiのIPアドレス>:8080/html/test.html
```
すると以下のようなページが表示されます．  
{{< imgXX "momop2p.jpg" >}}  
Connectを押すことでカメラの映像が表示されます．
{{< youtube "jaVhUnFPHpg" >}}  
低遅延です．  

## 遠隔で動かす
WebRTCでP2P接続するためには，お互いの情報をお互いに渡してくれるシグナリングサーバーというものが必要になります．  
ローカルで動かすtestモードでは、Momoがシグナリングサーバーになっていたのですが，今回はMomoと同じく時雨堂様が開発している[Ayame Labo](https://ayame-labo.shiguredo.jp/)を使い，<s>Raspberry Pi</s>UbuntuとAndroid端末がLAN内になくても接続できるようにします．

けしからんネットワークにより，手元のRaspberry Piではうまく接続ができないので，長野県にいる知人に頼んで，Ubuntuで動かしてもらいました．  
{{< imgXX "naganoken.jpg" >}}  

### 知人のUbuntu上で環境構築
Momoのインストールは省きます．

どうやらカメラがついていないようなので，[v4l2loopback](https://github.com/umlaeute/v4l2loopback)で仮想カメラを作ります．


以下でビルドを行います．
```bash
git clone https://github.com/umlaeute/v4l2loopback.git
make && sudo make install
```
読み込みます．
```bash
sudo modprobe v4l2loopback
```

このままでは何も映っていないカメラなので，ffmpegで動画を流し込みます．`-stream_loop -1`で動画が無限ループします．
```bash
ffmpeg -stream_loop -1 -re -i [動画ファイル名].mp4 -f v4l2 /dev/video0
```

### 動かしてみる
[Ayame Labo](https://ayame-labo.shiguredo.jp/)にサインアップして，ルームIDとシグナリングキーを控えておきます．

AyameモードでMomoを起動します．
```bash
./momo --no-audio-device ayame wss://ayame-labo.shiguredo.jp/signaling [Ayame LaboのルームID] --signaling-key [Ayame Laboのシグナリングキー]
```

[Ayame Labo](https://ayame-labo.shiguredo.jp/)にサンプルがあるので，そちらを使わせていただきました．  
{{< youtube "YJfgqOsKTt4" >}}

ネットワークの問題かMomoが動いているマシンの問題かわかりませんが，カクツクことがあります．

流れている動画は，以前箱根のほうに行った時のものです．  
{{< youtube "-0qL0tsNuvU" >}}  

## コントロールする
このままではただカメラの映像を垂れ流しているだけなので，コントロールできないので，なにか文字列を送れるようにしてみます．

Momoは`--serial /dev/ttyhoge,huge`オプションをつけることでWebRTCのデータチャネルとシリアルポートを繋げる?ことができます．
今回は都合のいいシリアルデバイスがないので，`socat`で仮想シリアルデバイスを作ります．
### 仮想シリアルデバイスをつくる
`socat`をインストールします．
```bash
sudo apt install socat
```
[こちらの動画](https://www.youtube.com/watch?v=iFmD-CeB96A)をp参考にさせていただきました．
以下を実行して表示されたシリアルポート同士が繋がっています．
```bash
socat -d -d pty,raw,echo=0 pty,raw,echo=0
```

```bash
2020/12/04 18:23:04 socat[1664] N PTY is /dev/pts/1
2020/12/04 18:23:04 socat[1664] N PTY is /dev/pts/2
2020/12/04 18:23:04 socat[1664] N starting data transfer loop with FDs [5,5] and [7,7]
```
今回の場合は，`/dev/pts/1`と`/dev/pts/2`のようです．


### --serialオプションを付けて動かしてみる
今回のMomoの起動コマンドです．
```bash
./momo -- serial /dev/pts/1,9600 --no-audio-device ayame wss://ayame-labo.shiguredo.jp/signaling [ルームID] --signaling-key [シグナリングキー]
```

`cat`でシリアルポートを覗きます．
```bash
cat /dev/pts/2
```
{{< youtube "GnWfptz4fR0" >}}

こんな感じで映像以外も送受信できます．Youtubeの動画のほうはUbuntuとAndroid別々に録画していますが，電波時計を見ながらタイミングをとったので，互いの録画にあまりズレはないと思います．

## タイヤを履かせたいし，ボディも着せたい
車体やコントローラーは現在友人らと制作中です．

今回は`cat`を使っていましたが，PythonやCで`socat`のシリアルポートを読んで，Raspberry PiのGPIOを制御すればラジコンみたいになると思います．Arduinoとかを繋いでもいいかもね...  

[ OpenAyame/ayame-web-sdk ](https://github.com/OpenAyame/ayame-web-sdk)  

{{< imgXX "controller.jpg" >}}  
制作途中のコントローラー