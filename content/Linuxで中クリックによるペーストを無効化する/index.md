---
title: "Linuxで中クリックによるペーストを無効化する"
date: 2020-08-01T15:15:42+09:00
draft: false
archives: 2020-08
tags:
    - Linux
---

## はじめに
ThinkPadは中クリックを押しながらTrackPointを動かすことでスクロールができます．便利です．  
しかし，私が使っているThinkpad T480sは中クリックが押し続けにくく，スクロールしている最中に押す，離すが繰り返されます．  
するとどうなるか...クリップボードの中身が連続でペーストされます．ブラウザやCalibre等でなら問題ないのですが，これがIDEで起こるとかなり悲惨なことになります．ストレスがマッハです．  
これをどうにか無効化しようとがんばります．

## 環境
```
OS: Manjaro Linux x86_64 
Host: 20L7CTO1WW ThinkPad T480s 
Kernel: 5.4.52-1-MANJARO 
Shell: bash 5.0.18  
WM: i3 
CPU: Intel i5-8250U (8) @ 3.400GHz 
```

## 使用コマンド
- xsel
- xbindkeys
- xev
- xdotool

## 方針
どうやら中クリックによるペースト自体を無効化することは難しいようです．  
そこで，クリップボードの中身を消すという手段をとります．クリップボードにはPRIMARY,SECONDARY,CLIPBOARDがあり，中クリックによるペーストで使用されるものはPRIMARYです．また，右クリック->貼り付けで使用されるのはCLIPBOARDです．  
中クリックを離したタイミングでペーストされるので，中クリックが押されたタイミングでPRIMARYをクリアします．  

## やってみる
***[追記](#tsuiki)を見たほうが幸せになれると思います．***

xevで中クリックを調べてみると以下のようです．
```
ButtonRelease event, serial 34, synthetic NO, window 0x3600001,
    root 0x1a2, subw 0x0, time 5610176, (345,459), root:(1635,474),
    state 0x200, button 2, same_screen YES
```

先駆者様を参考にさせていただくと以下のように記述すれば良さそうです．  
`/home/[username]/.xbindkeysrc`
```
"xsel --primary --clear"
b:2
```

その後`xbindkeys -p`を実行します．  

## 永続化する
`/home/[username]/.xprofile`に以下を追記します．  
```
xbindkeys -p
```

## 追記{#tsuiki}
~~どうやら中クリックのもとの動作も上書きしてしまうようです．いずれどうにかします．~~ どうにかしました．  
`/home/[username]/.xbindkeys`  
```
"xsel --primary --clear; pkill xbindkeys; xdotool click 2; xbindkeys -p"
b:2
```
`xdotool click 2`でのループを避けるため`pkill xbindkeys`します．

## 参考
- [Xbindkeys - ArchWiki](https://wiki.archlinux.jp/index.php/Xbindkeys)  
- [クリップボード - ArchWiki](https://wiki.archlinux.jp/index.php/%E3%82%AF%E3%83%AA%E3%83%83%E3%83%97%E3%83%9C%E3%83%BC%E3%83%89)  
- [Bind Mouse Buttons to Keys or Scripts under Linux with xbindkeys and xvkbd](https://medium.com/@Aenon/bind-mouse-buttons-to-keys-or-scripts-under-linux-with-xbindkeys-and-xvkbd-7e6e6fcf4cba)  



