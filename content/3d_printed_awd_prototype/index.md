---
title: "3Dプリンタで作った4WDの試作機"
date: 2021-12-19T08:26:18+09:00
draft: true
archives: 2021-12
tags: 
    - 3Dプリンタ
---
## はじめに
この記事は[東京高専プロコンゼミ① Advent Calendar 2021](https://adventar.org/calendars/6568)の21日目の記事です．

今年の7月に3Dプリンタの[ELEGOO NEPTUNE 2](https://www.amazon.co.jp/dp/B0928PRRRH)を購入しました．今回は，この3Dプリンタで作った5リンク式サスペンションの4WDの詳細を自己満足で紹介しようと思います．

### 5リンク式サスペンションってなんぞや？
[wikipedia](https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%B3%E3%82%AF%E5%BC%8F%E3%82%B5%E3%82%B9%E3%83%9A%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3#5%E3%83%AA%E3%83%B3%E3%82%AF%E5%BC%8F%E3%82%B5%E3%82%B9%E3%83%9A%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3)にそう書いてあった．車に詳しくないので作ったものがこれで本当に正しいのかはわからない...

構造は以下に張る写真を見てもらうのがわかりやすいと思います．

## 全体像

### 写真
{{< imgXX "imgs/overview/top.jpg">}}
{{< imgXX "imgs/overview/front.jpg">}}
{{< imgXX "imgs/overview/side.jpg">}}
{{< imgXX "imgs/overview/top_left.jpg">}}
{{< imgXX "imgs/overview/top_right.jpg">}}

### 走行動画
以下の動画は動きがわかりやすくなることを期待して0.25倍速にして，車におもりを載せています．

{{< youtube "Wu5kkeJir-s" >}}

## 各部紹介
### 車軸とハウジング
{{< imgXX "imgs/housing.jpg" >}}
{{< imgXX "imgs/housing_open.jpg" "開けた状態" >}}

ハウジング上にマイクロサーボを配置し，操舵できるようにしています．ベアリングは[ミニチュアベアリング 両側鋼板シールド形](https://www.monotaro.com/p/1169/8496/?displayId=5)を使用しています．自在継手も[M2 x 6mm ねじ](https://www.monotaro.com/p/1212/0772/?displayId=5)と3Dプリンタによる自作です．

後方もステアリングを省略している以外，構造は共通です．

### 車体
{{< imgXX "imgs/body1.jpg" >}}
{{< imgXX "imgs/body2.jpg" >}}
{{< imgXX "imgs/body3.jpg" >}}

車体は本当に適当に作っており，車軸やリンクができたあとに合うように作りました．合うように作ったところ，3Dプリンタの最大印刷長220mmを大きく上回る338mmと化したため，[楽しい工作シリーズ 3mmシャフトセット](https://www.tamiya.com/japan/products/70105/index.html)に含まれる3×100mm丸シャフトを突っ込めるようにし強度の確保を試みました．


### サスペンション
#### スプリング
{{< imgXX "imgs/spring.jpg" >}}

サスペンションのスプリングにはには[このバネ](https://www.monotaro.com/p/0730/3204/)を使用し，ダンパーは存在しません．モノタロウを今回初めて使ったのですが，こういったものを買うのに本当に便利ですね．

#### リンク
{{< imgXX "imgs/link.jpg">}}

タイトルの通り１つの車軸に付き5本のリンクが存在します． 4本が進行方向前後の力を受け止め，1本が進行方向左右の力の受け止めます．ただし，上下方向には動くようになっており，サスペンションが衝撃を吸収します．

リンクを止めるネジは締め切らず，簡易的なボールジョイントのようにしています．
{{< imgXX "imgs/link_screw.jpg" >}}

動画も用意しました．
{{< youtube "z4Lw-_rjQZA" >}}



### 動力
{{< imgXX "imgs/moter1.jpg" >}}
{{< imgXX "imgs/moter2.jpg" >}}
{{< imgXX "imgs/moter3.jpg" >}}


シャフトを50mmにした[3速クランクギヤーボックス](https://www.tamiya.com/japan/products/70093/index.html)を使っています．所謂ミニ四駆のノーマルモーターですが，パワーやスピードの不足を感じたらミニ四駆よろしくトルクチューンモーターなどに換装するつもりです．

### プロペラシャフト
{{< imgXX "imgs/propeller_shaft.jpg" "くっついてる" >}}
{{< imgXX "imgs/propeller_shaft2.jpg" "はずした" >}}

ギヤーボックスと前後のハウジングはこのような部品で繋がっており，車軸と車体の相対位置がずれても動力が伝達できるようになっています．

### タイヤ
{{< imgXX "imgs/tire1.jpg" "内">}}
{{< imgXX "imgs/tire2.jpg" "外">}}

トレッドパターンを適当につけた直径およそ800mm，幅20mmのPLA製のタイヤです．ゴム素材を使っていないため室内ではよく滑りますが，このおかげで[ディファレンシャルギア](https://ja.wikipedia.org/wiki/%E5%B7%AE%E5%8B%95%E8%A3%85%E7%BD%AE)を搭載しなくても内輪差が気になりません．


## 作ってみてわかったこと
### 長過ぎる
### モーターのトルクで車体が傾く
### サスペンションの配置間隔は広くしよう

## 次期4WD
誠意製作中

## おまけ