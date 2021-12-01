---
title: "TANG_PriMERを買ったので触る"
date: 2020-06-15T21:35:41+09:00
draft: false
archives: 2020-06
tags:
    - 環境構築シリーズ
    - FPGA
---

## はじめに
TANG PriMERとは，AIやら仮想通貨採掘やらで話題なFPGAというやつです．（怒られそう)  
[Sipeed TANG PriMER FPGA開発ボード](https://jp.seeedstudio.com/Sipeed-TANG-PriMER-FPGA-Development-Board-p-2881.html)

スペックを読めないので，これが高いのか安いのかは判断しかねますが，手ごろな価格であるのは確かだと思います．  
以前からFPGAには興味を持っていたのですが，敷居と値段の高さを感じていたところ，いいものを見つけたのでついポチってしまいました．Sipeedというのもありました．  

## 環境構築していく
**[GetStarted](https://nextpublishing.jp/book/11936.html)見たほうが正確だと思います．**  

- 私の環境  
    - CPU : i5-8250U  
    - OS : Windows10  

私はOfficeとOneDriveのせいでWindows10を使っていますが，Linuxでの方法も書いてありました．  

## IDEを入れる

- GetStartedから飛んだページからそれっぽいファイルを落とします．人間チャレンジがあるので正解してください．(1敗)  
https://dl.sipeed.com/TANG/Primer/IDE  
- 適当にハッシュ値をチェックをします．
  
{{< imgXX "td_installer.png" >}}  
インストーラーを起動したら中国語でちょっとびっくりしました．  
すべてNextっぽいボタンを押しておきました．  
{{< imgXX "td_screenshot.jpg" >}}  
IDE本体は英語のようで安心しました．  

##  ドライバーを入れる  
ドライバーの署名云々でセキュアブートを切っていないとうまくインストールできないようです．
私はすでに切っていたので特に問題ありませんでした．  

- デバイスマネージャーを開き，jtag cabelのような名前のデバイスを探します．それがTANG PriMERです．  
- それをダブルクリックしてプロパティを開きます．  
- ドライバーの更新からコンピューターを参照を選び，C:\Anlogic\TD4.6.4\driver\win8_10_64にあるドライバーのインストールを試みます．  

## 遊ぶ  
動作確認もかねて動かしたいです．

### 新しいプロジェクトを作るよ
早速IDEを起動して，Project>New Projectします．  
乗っているチップがAnlogic Technologies EG4S20という名前なのでそれっぽいのを選びます．  
{{< imgXX "td_new_proj_wizard.png" >}}  
...たくさんありますね．  
[秋月](http://akizukidenshi.com/catalog/g/gM-14786/)を見たところFPGA：EG4S20BG256とあったので助かりました．
ありがとう秋月！  
{{< imgXX "td_new_proj_wizard2.png" >}}  

### ソースファイルを追加
公式に使い方があったのでそっちを見ながらやっていきます．  
https://tang.sipeed.com/en/using-tang/using-gpio/   

- 左側のHierarchyを右クリック，New Sourceで適当な名前を付けてソースファイルを追加します．   
- とりあえず公式のコードを借ります．  
{{< imgXX "td_hello_code.png" >}}  
なんとなくボタンを押したらLEDが光りそうなコードに思えます．  

## 物理ピンをIOポートに割り当てる必要があるそうです．  
早速ボタンを押してみたいですが，まだやることがあるようです．  

- IO Containsをダブルクリックします．  
{{< imgXX "td_io.png" >}}  
- [サンプルコード](https://github.com/Lichee-Pi/Tang_FPGA_Examples/blob/master/0.LED/constraint/io.adc)を参考にそれっぽいピンを選択します．  
{{< imgXX "td_io2.png" >}}  
このようにしました．Bankとは何なのでしょう...  

適当な名前を付けて保存します．  

### 書き込むわよ  
ついに動かせます．やった．  

- Runアイコンを押します．文字がたくさん流れてきてどきどきしますね．  
- FPGAに変化はありません．コンパイルだけだったようです．  
- 続いてDownloadアイコンを押します．  
- Addアイコンを押し，[Project名].bitファイルを選択します．  
- Runアイコンを押すと書き込まれるようです．  
この時に上部のModeがJTAGだと電源を落としたら消える書き込み，PROGEAM FLASHだと電源を切っても消えない書き込みになるようです．(多分)  
{{< imgXX "td_flash.png" >}}  
とりあえずJTAG Modeで書き込んでみました．  

### 動いた
{{< tweet 1277942804996448257>}}  
Verilog学んで本格的に遊んでいきたいです．やはり基板やICは見てると興奮してきますね．  