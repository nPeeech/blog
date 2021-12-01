---
title: "KKHMF USB to UART TTL RS232 PL2303HX ワイヤーアダプタ変換ケーブルRaspberry Pi Arduino用でRaspberry PiとWin10を接続する"
date: 2020-12-17T16:44:53+09:00
draft: false
archives: 2020-12
tags: ["Raspberry Pi"]
---
※メモ書きです．

## 動機
SSHが使いにくい環境なので，いつかに聞いたシリアルコンソールを使ってみようと思った．

## 使ったもの
- Raspberry Pi 3 model B
- [KKHMF USB to UART TTL RS232 PL2303HX ワイヤーアダプタ変換ケーブルRaspberry Pi Arduino用](https://www.amazon.co.jp/dp/B01I500OWK)
- Windows10搭載PC

## PL2303HXのドライバーを入れる
手動でドライバーを入れないといけないようなので，とりあえず公式で配布されていたものを入れてみた...

http://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225&pcid=41

が動かない．

デバイスマネージャーで見てみるとコード10などと出ていた．

`PL2303HX Windows10`で検索してみるとありがたいことにこの問題を解決するソフトがあるようだったので，使わせていただいた．

[Prolific PL-2303 Code 10 Fix](http://www.ifamilysoftware.com/news37.html)  

動いた  
{{< imgXX device_property.png >}}  

## Raspberry PiのSerial Portをenableする
SSHが使えたので，`sudo raspi-config`から`Interface Option` -> `Serial Port`で有効化させた．

## Raspberry PiとUSBシリアル変換器を繋ぐ
Amazonのレビューによるとケーブルは以下のようになっているらしい．ありがたい...

| 緑 | 白 | 黒 |
| - | - | - |
| TX  | RX | GND |

Raspberry PiのGPIOは以下のサイトが見やすかった．  
https://pinout.xyz/  

これらを参考に接続し，以下のようになった．  
{{< imgXX RPipin.jpg >}}  

あとはWindows側でTera Term等を使えば接続できるはずである．

## おまけ
デフォルトで9600bpsなのでslがのんびりする．  
{{< youtube htqv9upQmL4 >}}  