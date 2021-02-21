---
title: "RaspberryPiとシリアルコンソールでファイルを送受信する"
date: 2020-12-17T16:24:35+09:00
draft: false
archives: 2020-12
tags: ["Raspberry Pi"]
---
※メモです

<!-- more -->

## 動機
SSHが使いにくい環境なので，シリアルコンソールで作業をしているのだが，ファイルの送受信の仕方がわからなかったのでメモとして残す．

## 環境

- Raspberry Pi 3 model B
- [KKHMF USB to UART TTL RS232 PL2303HX ワイヤーアダプタ変換ケーブルRaspberry Pi Arduino用](https://www.amazon.co.jp/dp/B01I500OWK)
- Tera Term

## 転送プロトコル
- XMODEM
> XMODEM（えっくすもでむ）は、バイナリ転送プロトコルの一種である。128バイト単位で非同期通信を行う。開発者の Ward Christensen がパブリックドメイン扱いで仕様を公開したため、パソコン通信で広く使われた。XMODEMを元に考案されたプロトコルも多く、またXMODEM自身にもいくつかのタイプがある。  [wikipediaより](https://ja.wikipedia.org/wiki/XMODEM)

- YMODEM
> YMODEM（わいもでむ）とは、バイナリ転送プロトコルの一種である。XMODEMやMODEM7を発展させたもので、Chuck Forsbergにより開発され、1985年にYMODEMという名称がつけられた。  [wikipediaより](https://ja.wikipedia.org/wiki/YMODEM)

- ZMODEM
> ZMODEM（ぜっともでむ）とは、バイナリ転送プロトコルの一種である。YMODEMを開発したChuck Forsbergにより1986年に開発された。 [wikipediaより](https://ja.wikipedia.org/wiki/ZMODEM)

後継のようなのでZMODEMを使うことにする．

## Raspberry Pi側の準備
インストール  
```bash
sudo apt update
sudo apt upgrade
sudo apt install lrzsz
```

## Tera Term -> Raspberry Pi

Raspberry Pi側が以下で受信状態に入る．
```bash
rz
```

Tera Termで`ファイル` -> `転送` -> `ZMODEM` -> `送信`からファイルを選択する．
{{< img500 "transmit.png" >}}

## Raspberry Pi -> Tera Term

Raspberry Pi側でファイルを送信する．
```bash
sz [ファイル名]
```

Tera Termで`ファイル` -> `転送` -> `ZMODEM` -> `受信` からファイルを選択する．
{{< img500 "recieve.png" >}}

### 受信したファイルの場所
`C:\Users\<ユーザー名>\AppData\Local\VirtualStore\Program Files (x86)\teraterm`に入っていた．