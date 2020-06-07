# 为啥要写这个游戏？

1. 因为我儿子二年级数字下册最后一章讲到了数独。他想玩儿。
1. 因为我也想玩有提示功能的数独。
1. 因为我也正想决定要把HTML5和JS搞搞熟。熟悉一个编程平台，最好的办法，就是了解其原理与思想之后，做个真正完整的东西练练。

之前一直搞.net，后来管理事务多了，很多技术就没跟上，看过一些JS的书，但一直没动手，前几个月，写了第一个JS程序，是一个简单的产品规则引擎，利用v8引擎集成在.net程序中，用脚本来处理产品费用有关的计算。但那个只涉及数值计算。

这几天因为儿子的课本上学逻辑推理，有个数独游戏，儿子大感兴趣，玩了几个，想到如果能自动计算可选数字的话，就会很容易解开数独，在网上找来找去，发现都没有这样功能的数独。正好有点空闲，就决定自已写一个。

所以这个数独是我写的第二个JS程序。在写的过程中也在同时学习。


#几个要点
## canvas与windows的图形程序原理的不同

一开始，免不了受之前经验的影响，想用winform的图形程序原理来处理html5 canvas的绘图。但发现有点水土不服：windows的图形程序原理是说系统不管保存程序自己窗口里内容，有需要显示时——比如从后台切到前台啦、刚从别的程序下面露出脸来啦等等——就请程序自己再画一遍。所以，程序只需要重写form的OnPaint方法（对于win32程序，则是响应WM_PAINT消息），在其中绘制图形就行了。

在windows程序中，不能直接随时向窗口上画图，比如你想在鼠标点击时画个点，但你没法在鼠标或键盘事件的响应方法中得到窗口的绘图上下文句柄（对winform，是Graphics参数，对于win32程序是WM_PAINT消息里的某个参数），于是，你只好记下来“现在有个家伙点了鼠标了，某某地方应该有个点！”，然后调用Invalidate()方法，这个方法会强制系统向窗口程序发重绘消息，然后，你事先准备好的OnPaint方法被调用，在这个方法里，你有机会得到绘图句柄了，于是你检查之前有没有记录过要在某个地方画点的，并在这个地方画个点。

有点像MVC的意思，哈？

但在html5的canvas中，我发现浏览器是会帮canvas保存图形的，无论是被其他窗口盖到，切到后台，都没问题，只要一露出到屏幕上，原来的图形就还是在那里。这表示只要你并不想做动画效果，用canvas写图形程序要比windows程序原理更简单一些：你只要在合适的时候（鼠标点击、键盘事件等）向canvas上画图就是了,画上的东西就会总是在那里。绘图上下文context也不会消失掉，我把它在一开始时做为构造方法的参数传入，并保存为类成员，随时用随时取。

唯一要注意的，是要快点画完，别占太长时间。


##滚屏后座标的问题

从网上看到的代码都是用e.pageXY来得到位置的。这个位置是鼠标事件在整个文档中的绝对位置。也就是说，滚屏不会影响这个值。

只不过我用了getBoundingClientRect这个方法来取得canvas对应的box座标，用于把全局座标转换到canvas内的座标。而这个方法取得的座标是相对于浏览窗口的，而不是相对于整个文档的。这就与e.PageXY对不上了。

所以，这里只好用e.XY，工作得非常好。


## 支持Retina屏
一开始在一个旧笔记本上写的这个程序，运行得挺好，但放到MacBook Pro上一看，功能挺正常，但内容很模糊。

仲么办！

模糊的原理是canvas在浏览器中的大小是由style中的width与height来决定的，但其画布的大小是以canvas.width与height决定的。如果两者不一样大，就会进行拉伸缩放，把画布拉伸（或缩小）到style的大小。

在普通屏幕上，其style定义的像素大小与屏上的显示结果是一对一的，所以没问题。但在retina屏上，style的大小定义与屏幕上的像素大小是有个放大比例的（在MBP上，是2），也就是说，style定义的400px，显示时会用到800px个屏幕像素。但由于canvas里画布的大小是400px的，所以内容被拉伸，还自动消除了锯齿，看起来就很模糊。

所以，解决办法是就是：根据放大比例，把画布的大小设置为比外部大小更大的大小。

但是注意，鼠标器事件中的座标是按原点数值来提供的。比如说，你内部画布大小是800px, 但屏幕大小算成了400px, 当鼠标点击后，给的位置是（100，100），这个位置是按屏幕点数来计算的，要在画布中计算其对应的点，应该把这个值乘以那个放大系数才对。

可注意一下程序中的getPointOnCanvas函数。