![](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/animachine/animachine?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/animachine/animachine.svg)](https://travis-ci.org/animachine/animachine)

<img src="http://s9.postimg.org/mqolutoxb/amheader.png">

##animachine
*a GUI for [GSAP]*  
It lets you to create code driven animation using traditional animation tools (like timeline, transformtool, etc).  
You don't need to make any changes to your project to use animachine, just add the [chrome extension][extension] or embed it like any other js library and start animating.

###Status
This is the second alpha release completely rewritten using [React] and [Redux]. For now, it only animates React components with a very minimal feature set but you can see in the [Todos] what's coming up. **And it's ready to animate things!**

[###Docs and quick start guide](docs/README.md)

###Why is this needed?
You have great tools to make animations for the web (like Adobe Edge, Google Webdesigner or Animatron) but all of these are only for making sandboxed animations and embedding the boxes somewhere (usually in an iframe). If you need to animate some inner part of your project (ex. when a dialog appears or a game character jumps and walks) it has to be coded by a programmer. When this animation has to be long, artistic or done by somebody who is not a skilled programmer, this work can be tedious or almost impossible which can prevent us from seeing more fine and sophisticated animations on the web.

###How is this working?
In a nutshell, when you click on the extension you'll have an overlay on your page with the animation tools which you'll be familiar with if you ever made animations with programs like Anime Studio, Adobe Edge, After Effects, etc.  
Then you can pick elements from your page and start animating them.
When it's done, you can save your animation as a .js file and include it in your page.  
If you want to change your animation later, just open the animachine, load that .js file and you can continue where you stopped.  

###Demos: [marslanding][demo-marspolip], [argh][demo-argh]

###Todos:
- [ ] Select elements with click
- [ ] Advanced ease editor
- [ ] Undo/redo history
- [ ] Bezier motion path editor
- [ ] SVG path morphing
- [ ] Hotkeys
- [ ] Tooltips
- [ ] Support for plain DOM Nodes (and jQuery)
- [ ] Param groups (like scale for scaleX and scaleY)
- [ ] 3D transform params

<img src="http://i.imgur.com/9X2xUfz.png">


**DOM picking**   | ![Dom picking](http://i.imgur.com/LPCj6jp.gif)
-------------:|:-------------
![](http://i.imgur.com/LjBruea.gif) | **bezier path**
**advanced ease editor**   | ![](http://i.imgur.com/fZhQcc6.gif)
![](http://zippy.gfycat.com/IndolentBowedBustard.gif) | **free transform tool**
**inslnie ease editor**   | ![](http://i.imgur.com/hRiwrS2.gif)
![](http://i.imgur.com/d9K7DpQ.gif) | **timeline navigator**

These separated modules are developed as part of animachine:
- [transhand](https://github.com/azazdeaz/transhand)
- [react-matterkit](https://github.com/azazdeaz/react-matterkit)
- [json-vision](https://github.com/azazdeaz/json-vision)
- [spaceman](https://github.com/azazdeaz/spaceman)
- [react-theme](https://github.com/azazdeaz/react-theme)
- [custom-drag](https://github.com/azazdeaz/custom-drag)

[extension]: https://chrome.google.com/webstore/detail/animachine/gpnfomkfgajaojpakbkikiekmajeojgd
[demo-marspolip]: http://animachine.github.io/animachine/demos/marspolip/
[demo-argh]: http://animachine.github.io/animachine/demos/argh/
[tour-quickstart]: http://animachine.github.io/animachine/tours/quickstart/
[tour-bezier]: http://animachine.github.io/animachine/tours/bezier/
[GSAP]: http://greensock.com/
[React]: https://facebook.github.io/react/
[Redux]: https://github.com/rackt/redux/
