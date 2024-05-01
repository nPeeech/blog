---
title: "はじめてのプリント基板の設計と発注"
date: 2022-12-24T00:00:00+09:00
draft: false
images:
    - first_pcb/imgs/thumbnail.jpg
archives: 2022-12
tags:
    - 電子工作
    - Raspberry Pi
    - アドベントカレンダー
---
## はじめに

この記事は[東京高専プロコンゼミ① Advent Calendar 2022](https://adventar.org/calendars/8370)の24日目の記事です。  
授業などで回路設計 → ブレッドボードやユニバーサル基板に実装は経験したことがある、という方は多いと思いますが、プリント基板の設計経験者は少ないかと思います。（知らんけど）  
以下は、基板CADすら触ったことのなかった私が、無事組み込みシステム開発マイスター用のプリント基板を手に入れるまでの記録です。  
「プリント基板を作ってみたいけど何をすればいいかわからない」という方のお役に立てれば幸いです。

### 当初の筆者のスペック

- 回路図を起こし、ブレッドボードやユニバーサル基板に実装した経験あり
- 基板CADの使用経験なし
- プリント基板発注経験なし

## 基板CADの選定

ざっと調べて感じですと、以下の2つは個人が無料で使えるようです。

- KiCad (OSS)
- EAGLE (Autodesk)

すでにEAGLEと同じAutodesk社のFusion360を使っており、これ以上同社に依存したくなかったのでOSSのKiCadを選びました。

## KiCadの学習

KiCadの学習リソースを検索すると「KiCadことはじめ」という公式ドキュメントがあるようです。しかし、完全初心者の私は難しく感じたので、boothで[KiCad 6 入門実習テキスト『KiCad Basics for 6』](https://booth.pm/ja/items/3544989)を購入しました。  
この本にはKiCadの操作方法、回路の作り方、ライブラリに存在しない部品を自分で作る方法、基板データの書き出し、プリント基板の発注方法など、はじめてプリント基板を作るときに知りたいことはひととおり載っています。

## 基板製造業者の選定

上記の本に記載されているPCB製造業者である[FusionPCB](https://www.fusionpcb.jp/)は、送料込みで2000円程でした。  
どうせなら、安く作りたかったggっていたところ送料込みで1000円以下となる[JLCPCB](https://jlcpcb.com/)という業者を見つけました。ここにしました。

## プリント基板の発注

最初に発注した基板の設計に問題があり、修正版を発注しなおしたため、計2種類の基板を発注しました。以下がその送料込みの価格です。配送業者はOCS NEPを選択しました。

|  項目 |  初版   | 改良版    |
| --- | --- | ---|
| *基板（円）* | 265   | 265    |
| *送料（円）* | 597   | 132    |
| *PayPal手数料（円）*    | 66    | 66    |
| *割引（円）* | 199    | 0    |
| *合計（円）* | 729    | 464    |

{{<imgXX "imgs/redpcb_invoice.png" "1枚目の基板">}}
{{<imgXX "imgs/yellowpcb_invoce.png" "2枚目の基板">}}

## 発注から到着まで

以下の通りです。およそ10日で到着します。
| 基板の種類    |   発注日  |  発送日   |  到着日   |
| --- | --- | --- | --- |
|  初版   |  8/21   |  8/24   |  8/31  |
| 改良版 | 12/11 | 12/15 | 12/22 |

## 到着した基板

以下が出来立てほやほや（？）の基板たちの写真です。
{{<imgXX "imgs/redpcb.jpg" "初版">}}  
{{<imgXX "imgs/yellowpcb_top.jpg" "改良版　表">}}
{{<imgXX "imgs/yellowpcb_back.jpg" "改良版　裏">}}

## 最後に

私は、今回KiCadとJLCPCBを使ってみるまで、基板CADを使った回路設計は難解であり、プリント基板の価格はとても高額なものだと思っていました。この体験を知ってしまうとユニバーサル基板には戻れません。  
*皆さんもよいプリント基板ライフを！！！*

## おまけ 設計した回路の問題点

改良版の基板を作るに至った初版基板の問題点は、モーターを回すとモータードライバーが過電流で壊れるというものです。  
使用したモータードライバー[ＤＲＶ８８３５使用ステッピング＆ＤＣモータドライバモジュール
](https://akizukidenshi.com/catalog/g/gK-09848)は1chで最大1.5Aまで流せるようなのですが、なんとなく選定したトルクチューンモーターの消費電力があろうことか1.7A～2Aであり、余裕で破壊されました。幸いこのモータードライバーは、2つのchを束ねて使うこと3Aまでの電流を流せるようでしたので、そのように基板を修正しました。