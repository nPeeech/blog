---
title: "WebRTCを使ったカメラ付きラジコンカーを作った"
date: 2021-06-26T22:31:13+09:00
draft: false
archives: 2021-06
tags:
    - Raspberry Pi
    - Linux
    - Arduino
    - 電子工作
---

## はじめに
この記事は、[WebRTCを使ったカメラ付きラジコンカーをつくりたい]({{< ref "/camera_car_concept_using_webrtc/index.md" >}})を実際に作ってみたというものです。つまり、カメラの付いたラジコン（ラジコンではない）カーを作ってみた記事です。  
作ったのが執筆時の半年前なので、あまり覚えておらず内容が薄くなってます。


## 構成
{{< imgXX minibros_diagram2.png>}}  
- Raspberry Piに取り付けた専用のカメラで映像の送る
- Raspberry Piは、コントローラーから送信された移動用モーターを制御するコマンドをArdunoにそのまま渡す
- 映像とコマンドのやり取りには[Momo](https://github.com/shiguredo/momo)を使う
- ArdunoのGPIOは5V、Raspberry PiのGPIOは3.3Vなのでレベル変換モジュールを使う
- Pi cameraはAmazonで600円くらいで打ってる怪しいものを使用

## 制作過程
とりあえず、Arduinoとモータードライバでモーターを動かしてみました。  
なるべく小さくしようとモータードライバのターミナルブロックを下向きにつけているのですが、シルクのプリントが表にしかないので、VccとGNDを逆に接続してしまい一つ壊しています。  
{{< imgXX arduino_motordriver.jpg >}}  

Arduino、Raspberry Pi、モータードライバ、レベル変換モジュールを接続するだけの基板なので単純な配線です。（一度失敗してやけくそでやったものなので、配線がアレですが）  
[なんとなくな配線図](https://github.com/nPeeech/MiniBros/blob/main/Circuits/circuit.svg)もあります。  
{{< imgXX circuit.jpg >}}  

モータードライバを壊して到着を待っている間に組んでみたところです。後ろのPCにはコントローラーが表示されています。Raspberry Piのカメラの映像です。  
{{< imgXX non_motor_driver.jpg >}}  

数日後、モータードライバーが届いたので完成しました。ちなみに、Arduino microも破壊して書き込めなくなりましたが、こちらはもともと2つ持っていたので事なきを得ました。Raspberry Piとモバイルバッテリーの接続が非常に汚いですが、めんどくさくなってこうなりました。  
{{< imgXX minibros1.jpg >}}
{{< imgXX minibros2.jpg >}}
{{< imgXX minibros2.jpg >}}

## 走行風景
画質が酷いのは、600円の怪しいPi cameraを使っているためです。安かったからね、仕方ないね。操作はWASDで行えるようにしています。
{{< youtube ClR-fIPTxZA >}}
{{< youtube 6fC4Mb3R_VQ >}}

## 制作中に詰まったところ
### Raspberry Pi zero　wでシリアル通信をする
**詳しいことは[公式のUART configuration](https://www.raspberrypi.org/documentation/configuration/uart.md)を見てください。**  
ソフトウェアのmini uartとハードウェアのPL011が存在し、Raspberry Pi zero wでは最初、GPIOにはmini uartが設定されており無効化されています。PL011はBluetoothに使われています。  
そのため、Bluetoothを無効化し、PL011をGPIOに設定します。私が行った設定は以下の通りです。
1. raspi-config → serial port
    1. Would you like a login shell to be accessible over serial?にno
    1. Would you like the serial port hardware to be enabled?にyes
1. `/boot/config.txt`に`dtoverlay=disable-bt`を追記

`/dev/ttyAMA0`がPL011、`/dev/serial0`は常にGPIOのシリアルデバイス(`/dev/ttyS0`か`/dev/ttyAMA0`)を指すシンボリックリンクです。

### Arduino microでシリアル通信をする
Arduino Unoでは、SerialクラスがGPIOのRX、TXとUSBシリアルで共有されていますが、Arduino microでは独立しておりSerial0クラスはUSBシリアル、Serial1クラスはGPIOのRX、TXになってます。これをまったく知らなくて1時間近く詰まっていました。

### Momoの起動コマンド
serialオプションを付けて、`/dev/serial0`を指定することで、datachannelを使って送信された内容がArdunoに渡されます。
```bash
./momo --no-audio-device --serial /dev/serial0,9600 --force-i420 --hw-mjpeg-decoder true ayame wss://ayame-labo.shiguredo.jp/signaling <username>@<roomId> --signaling-key <signaling key>
```

## 使用したもの
- 部品
    - 秋月
      - モータードライバ
        - https://akizukidenshi.com/catalog/g/gK-11219/
      - 基板
        - https://akizukidenshi.com/catalog/g/gP-03229/
      - 電池ボックス
        - https://akizukidenshi.com/catalog/g/gP-11523/
      - ターミナルブロック用のコネクタ
        - https://akizukidenshi.com/catalog/g/gC-09247/
      - UART用のレベル変換モジュール
        - https://akizukidenshi.com/catalog/g/gK-13837/
      - ピンソケット（メス）
        - https://akizukidenshi.com/catalog/g/gC-05779/
    - ヨドバシ
      - ユニバーサルプレート
        - https://www.yodobashi.com/product/100000001001083283/
    - その他
      - カメラ固定用のMDF
      - M2のねじ
      - Arduino micro
      - Raspberry Pi zero w
      - ユニバーサル基板
      - ユニバーサルアーム

- ソフト
    - [WebRTC Native Client Momo](https://github.com/shiguredo/momo)

- 作ったソフトや回路図ﾓﾄﾞｷなど
    - https://github.com/nPeeech/MiniBros

