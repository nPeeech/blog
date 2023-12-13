---
title: "3Dプリンタでカメラ付き4WDを作った STLファイル配布"
date: 2023-12-13T01:00:00+09:00
draft: false
archives: 2023-12
tags: 
    - 3Dプリンタ
    - アドベントカレンダー
    - 電子工作
---
## はじめに
この記事は[東京高専プロコンゼミ① Advent Calendar 2023](https://adventar.org/calendars/8825)の13日目の記事です．

以前から3Dプリンタで作成していた4WDのラジコンのようなものが完成したので，紹介と車体部のデータの配布をします．  
### 以前の記事 
- [WebRTCを使ったカメラ付きラジコンカーをつくりたい]({{< ref "/camera_car_concept_using_webrtc/index.md" >}})
- [WebRTCを使ったカメラ付きラジコンカーを作った]({{< ref "camera_car_using_webrtc/index.md">}})
- [3Dプリンタで作った4WDの試作車を紹介する]({{< ref "3d_printed_awd_prototype/index.md" >}})

## 完成した4Wラジコンの様子
### 4WDの概要
- 車体のほぼすべての部品を3Dプリンタで製作
- 搭載したカメラの映像をスマホからリアルタイムで閲覧可能
- スマホから操作可能


{{< imgXX "imgs/overview/4wd.jpg" "画像はクリックすると高解像度版が見れるよ" >}}

3Dモデルも
{{< 3dmodel "4wd_model.glb" >}}

動画も
{{< youtube "xqx7qK0jKE8">}}


### システム構成
- 映像と制御情報の送受信には[WebRTC Native Client Momo](https://github.com/shiguredo/momo)を使用
- Raspberry Pi Zero 2 WとRaspberry Pi PicoはUARTでやり取りをしており，スマホから送られた制御情報がRaspberry Pi Zero 2 Wを介してRaspberry Pi Picoに伝わる


{{< imgXX "imgs/overview/system.png" >}}


WebRTC Native Client Momoは以下の記事でも扱っています．本記事の4WDにおいても，ほぼ同様の使い方をしています．
- [WebRTCを使ったカメラ付きラジコンカーをつくりたい]({{< ref "camera_car_concept_using_webrtc/index.md" >}})
- [WebRTCを使ったカメラ付きラジコンカーを作った]({{< ref "camera_car_using_webrtc/index.md" >}})

### 車体の構成
- 操舵にサーボモータを使用
- 走行用の動力に楽しい工作シリーズの3速クランクギヤーボックスを使用
- 超広角カメラを使用することでカメラの向きを変える機構を省略


{{< imgXX "imgs/overview/4wd_description.jpg" >}}

### 4WD機構の様子
- サスペンションやステアリングが動いても全てのタイヤが動く！！

{{< youtube AjzMPqekF-E >}}

機構の詳細な説明は以下の記事にあります．  
[3Dプリンタで作った4WDの試作車を紹介する]({{< ref "3d_printed_awd_prototype/index.md" >}})

以前の車体だけど他の動きも
{{< youtube z4Lw-_rjQZA >}}
{{< youtube Wu5kkeJir-s >}}


## 車体の作り方
上部の構造物や基板を除く，下部の車体のみの作り方です．

### 必要なもの
- [3速クランクギヤーボックスセット](https://www.tamiya.com/japan/products/70093/index.html)
- [マイクロサーボ　ＭＧ９０Ｓ](https://akizukidenshi.com/catalog/g/gM-13227/)
- [M2x4mm クロメ タップタイトねじPナベ 鉄製 十字穴](https://www.monotaro.com/p/1212/0763/)
- [M2x6mm クロメ タップタイトねじPナベ 鉄製 十字穴](https://www.monotaro.com/p/1212/0772/)
- [M3x6mm クロメ タップタイトねじPナベ 鉄製 十字穴](https://www.monotaro.com/p/1212/0806/)
- [M3x8mm クロメ タップタイトねじPナベ 鉄製 十字穴](https://www.monotaro.com/p/1212/0815/)
- **たくさんの3Dプリントパーツ**

### 3DプリントするSTLファイル
- [3DP4WD.zipのダウンロードページ]({{< ref "3d_printed_awd_download" >}})
- プリントに必要な各部品のSTLファイルと全体のSTEPファイルが含まれています．
- STEPファイルを見れば一応組み立てられるはず...

#### 印刷環境
- 使用機種：Ender 3  （底面積が220mm x 220mm程度必要なパーツがあります）
- フィラメント：[eSUN PLA Plus 3Dプリンターフィラメント PLA+ 寸法精度+/-0.03mm、1.75mm径 3Dプリンター用 正味量1KG (2.2LBS) スプール造形材料PLA材料 (ライトブラウン) ](https://amzn.asia/d/fXbvSAF)  
- 温度：205℃  
- レイヤー高さ：0.2mm  
- サポート：なるべく使わない（適当で申し訳ない...）

<!-- 続きを書く -->

後日ちゃんとした組み立て方を書きます．多分...maybe...
### 前輪部の組み立て
一部ねじが締めにくい構造になっていますが，頑張れば普通のドライバーでいけます．ギアには[プラスチック用グリス](https://www.monotaro.com/g/00533127/)，プロペラシャフトにはシリコンスプレーを塗布すると良いです．

ちなみに，傘歯車は[GF Gear Generator](https://apps.autodesk.com/FUSION/ja/Detail/Index?id=1236778940008086660&os=Win64&appLang=en)を用いて生成しました．
### 後輪部の組み立て
タイヤは前輪と後輪で異なりますが，入れ替えたり，一つに統一することが可能です．

### フレームとの組み立て
最も大きな部品であり，ベッドが220mm x 220mm程度の3Dプリンタが必要です．ねじ穴が潰れるため，サポートは使わずにプリントします．