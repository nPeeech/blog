---
title: "LinuxでThinkPadの中クリックの動作をスクロールのみにする"
date: 2020-08-01T16:10:48+09:00
draft: false
archives: 2020-08
tags:
    - Linux
---
## はじめに
LinuxのドライバーはWindowsのそれより優秀なようでThinkPadの中クリックに本来の動作とスクロールの動作を同居させることができます．  
しかし，私はスクロールのみの動作をしてもらっていたほうが使いやすいです． 

## 環境 
```
Linux thinkingpad 5.4.52-1-MANJARO #1 SMP PREEMPT Thu Jul 16 16:07:11 UTC 2020 x86_64 GNU/Linux
```

## 方針
[Linuxで中クリックによるペーストを無効化する]({{< ref "/Linuxで中クリックによるペーストを無効化する/index.md" >}})  
(こちらの記事を書いていたときにふと思いついたものなので，もっといい方法があると思います．  )  

xbindkeysで中クリックの判定を吸い込みます．  

## やり方
`/home/[username]/.xbindkeysrc`に以下を記述します．  
```
""
b:2
```
`b:2`というのが中クリックのことです．  

`xbindkeys -p`でxbindkeysを起動します．  


## 永続化する
`/home/[username]/.xprofile`に'xbindkeys -p`を追記する．
