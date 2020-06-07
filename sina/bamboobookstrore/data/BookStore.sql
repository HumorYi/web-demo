#创建bookstore数据库
create database bookstore character set utf8;

use bookstore;

#创建图书表，存储图书基本信息
create table bs (bid int primary key auto_increment,
     name varchar(64) not null default '',
     price FLOAT(8,2) not null default 0.00,
     author varchar(108) not null default '',
     publish_time varchar(32) not null default '',
     publishing_house varchar(32) not null default '',
     buyCount int(8) not null default 0,
     img_sm varchar(64) not null default '',
     img_lg varchar(64) not null default '',
     img_alt varchar(64) not null default '',
     detail varchar(2048) not null default '',
     createTime datetime not null default now(),
     updateTime datetime not null default now()
 );

#向图书表插入数据
 insert into bs values
 (
     null,
     'CSS权威指南（第三版）',
     45.80,
     '[美]迈耶 著，尹志忠，侯妍 译',
     '2010-04-01',
     '中国电力出版社',
     2354,
     'cssAuthority_sm.jpg',
     'cssAuthority_lg.jpg',
     'CSS权威指南（第三版）',
     '你是否既想获得丰富复杂的网页样式，同时又想节省时间和精力？本书为你展示了如何遵循CSS全新规范（CSS2和CSS2.1）将层叠样式表的方方面面应用于实践。通过本书提供的诸多示例，你将了解如何做到仅在一处建立样式表就能创建或修改整个网站的外观，以及如何得到HTML力不能及的更丰富的表现效果。',
     now(),
     now()
 ),

 (
     null,
     'CSS揭秘',
     69.80,
     '[希]韦鲁（Lea Verou）著；CSS魔法 译',
     '2016-04-01','人民邮电出版社',
     264,
     'cssDemystify_sm.jpg',
     'cssDemystify_lg.jpg',
     'CSS揭秘',
     '这是一本注重实践的教程。CSS专家Lea Verou单刀直入，教你用代码解决实际问题。她在书中揭示了47个鲜为人知的CSS技巧，指导中高级CSS开发者循序渐进，探寻更优雅的解决方案，攻克每天都会遇到的各种网页样式难题。读者将在本书中领略作者的缜密思路，并学会用这种思路来应对各种不期而遇的CSS难题，达成DRY、可维护、可扩展、轻量级并且符合标准的结果。本书涵盖的主题如下：背景与边框形状视觉效果字体排印用户体验结构与布局过渡与动画',
     now(),
     now()
 ),

 (
     null,
     'HTML5权威指南',
     101.90,
     '[美]弗里曼 著，谢延晟，牛化成，刘美英 译',
     '2014-01-01',
     '人民邮电出版社',
     1881,
     'h5Authority_sm.jpg',
     'h5Authority_lg.jpg',
     'HTML5权威指南',
     '作为下一代Web标准，HTML5致力于为互联网开发者搭建更加便捷、开放的沟通平台。业界普遍认为，在未来几年内，HTML5无疑将成为移动互联网领域的主宰者。《HTML5权威指南》是系统学习网页设计和移动设计的权威参考图书。它涵盖创建标准兼容、语义化的新一代HTML5网站的所有基础知识，并囊括实现HTML5核心语言的HTML5生态系统和相关API。全书精彩呈现500多个实战代码示例及主流浏览器实现效果图，贴心汇聚HTML5和CSS3中所有属性、元素和函数的简明参考表。',
     now(),
     now()
 ),

 (
     null,
     '高性能网站建设指南',
     46.80,
     '[美]Steve Souders（史蒂夫.桑德斯）著，刘彦博　译',
     '2015-05-01 ',
     '电子工业出版社',
     308,
     'highPerformanceWebsite_sm.jpg',
     'highPerformanceWebsite_lg.jpg',
     '高性能网站建设指南',
     '网站做得再好，如果慢到无法访问也是毫无意义的。在Google，网页呈现速度慢500 毫秒将丢失20%的流量；在Yahoo!，慢400 毫秒将丢失5%~9%的流量；在Amazon，慢100 毫秒将丢失1%的交易量……反之，网站速度越快，越有利于用户汇聚、流量增长及交易量的上升。而优化网站性能的方法有很多，前端优化就是一条省时省力的捷径。如果我们可以将后端响应时间缩短一半，整体响应时间只能减少5%~10%。而如果关注前端性能，同样是将其响应时间减少一半，则整体响应时间可以减少40%~45%。本书告诉我们从“前端”入手改善网站性能简单明了。在对后端大动干戈之前，按照本书的14条“军规”，从前端入手改善性能，会有意想不到的惊人效果。',
     now(),
     now()
 ),

 (
     null,
     '高性能网站建设进阶指南',
     54.40,
     '[美]Steve Souders（史蒂夫.桑德斯）　著，口碑网前端团队　译',
     '2015-05-01',
     '电子工业出版社',
     203,
     'highPerformanceWebsiteAdvance_sm.jpg',
     'highPerformanceWebsiteAdvance_lg.jpg',
     '高性能网站建设进阶指南',
     '性能是任何一个网站成功的关键，然而，如今日益丰富的内容和大量使用Ajax的Web应用程序已迫使浏览器达到其处理能力的极限。Steve Souders是Google Web性能布道者和前Yahoo！首席性能工程师，他在《高性能网站建设进阶指南》中提供了宝贵的技术来帮助你优化网站性能。Souders的上一本畅销书《高性能网站建设指南》（High Performance Web Sites）震惊了Web开发界，它揭示了在客户端加载一个网页的时间大约占用了总时耗的80％。在《高性能网站建设进阶指南》（Even Faster Web Sites）中，Souders与另外8位专家级特约作者提供了提升网站性能的极佳实践和实用建议，主要包括以下3个关键领域。JavaScript——你将获得忠告：理解Ajax性能、编写高效的JavaScript、创建快速响应的应用程序、无阻塞加载脚本等。网络——你将学到：跨域共享资源、无损压缩图片大小，以及使用块编码加快网页渲染。浏览器——你将发现：避免或取代******的方法、简化CSS选择符，以及其他技术。对于当前的富媒体网站和Web2.0应用程序来说，速度至关重要。在《高性能网站建设进阶指南》中，你将学习如何节省宝贵的网站加载时间，使网站更快地响应用户的请求。',
     now(),
     now()
 ),

 (
     null,
     '锋利的jQuery（第2版）',
     38.70,
     '[中]单东林 张晓菲 魏然 编著',
     '2012-07-01',
     '人民邮电出版社',
     7583,
     'jqKeenness_sm.jpg',
     'jqKeenness_lg.jpg',
     '锋利的jQuery（第2版）',
     '《锋利的jQuery(第2版)》是《锋利的jQuery》全新升级版，例子采用全新的UI，代码更符合语义化；增加jQuery Mobile的章节；增加jQuery版本变化的章节；增加jQuery性能优化和技巧的章节提供了丰富的附录：jQuery中的$(document).ready()方法jQuery加载并解析XML前端开发调试工具Firbug插件的APIAJAX的核心对象XMLHttpRequestjQuery API速查表jQuery中的$.ajax方法。',
     now(),
     now()
 ),

 (
     null,
     '数据结构与算法JavaScript描述',
     41.70,
     '[美]麦克米伦　著，王群锋，杜欢　译',
     '2014-09-01',
     '人民邮电出版社',
     264,
     'jsArithmetic_sm.jpg',
     'jsArithmetic_lg.jpg',
     '数据结构与算法JavaScript描述',
     '随着JavaScript成功走出客户端，在服务器端编程中得到日益广泛的应用，JavaScript程序员需要实现与C#或Java等传统面向对象编程语言相似的数据结构与算法。本书是用JavaScript描述数据结构与算法的开山之作，汇聚了作者多年的实战经验。这本实战指南通过丰富的示例，向读者透彻讲解了在JavaScript环境下，如何通过一系列存储机制（包括链表、栈、队列和图）高效地达到编程目的。通过本书的学习，读者将能自如地选择*合适的数据结构与算法，并在JavaScript开发中懂得权衡使用。此外，本书也概述了与数据结构与算法相关的JavaScript特性。本书主要内容如下。数组和列表：*常用的数据结构。栈和队列：与列表类似但更复杂的数据结构。链表：如何通过它们克服数组的不足。字典：将数据以键-值对的形式存储。散列：适用于快速查找和检索。集合：适用于存储只出现一次的元素。二叉树：以层级的形式存储数据。图和图算法：网络建模的理想选择。算法：包括排序或搜索数据的算法。高级算法：动态规划和贪心算法。',
     now(),
     now()
 ),

 (
     null,
     'javascript权威指南(第6版)',
     109.80,
     '[美]David Flanagan（弗兰纳根）著；淘宝前端团队 译',
     '2012-04-01',
     '机械工业出版社',
     11431,
     'jsAuthority_sm.jpg',
     'jsAuthority_lg.jpg',
     'javascript权威指南(第6版)',
     '经典权威的JavaScript工具书本书是程序员学习核心JavaScript语言和由Web浏览器定义的JavaScript API的指南和综合参考手册。第6版涵盖HTML5和ECMAScript5相关阅读>>>编写高质量代码：改善C程序代码的125个建议JavaScript编程精解（原书第2版）Effective Python：编写高质量Python代码的59个有效方法Effective Ruby：改善Ruby程序的48条建议。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript经典实例(第二版)',
     75.30,
     '[美]Shelley Powers（谢丽·鲍尔斯） 著；李强 译 ',
     '2015-12-02',
     '中国电力出版社',
     121,
     'jsCase_sm.jpg',
     'jsCase_lg.jpg',
     'JavaScript经典实例(第二版)',
     '使用JavaScript解决问题涉及很多的技巧，因为JavaScript的用法在规模、范围和复杂性方面都有相当大的扩展。《JavaScript经典实例（第二版）》涵盖了JavaScript中完成常见任务的175个经典技巧，无论你是在浏览器、服务器，还是移动环境中工作，都会用到这些技巧。每个技巧包含了可复用的代码，并且针对处理JavaScript对象、Node 、Ajax、JSON、数据持久性、图形化和媒体应用程序、复杂的框架、模块化的JavaScript、API，以及很多相关技术给出了实用的建议。本书面向有一定经验的JavaScript程序员。第1部分介绍了JavaScript的传统用法，带有一些新的思路和改进的功能。第二部分深入到服务器、移动开发，以及一些领先的工具。本书将会节省你的宝贵时间，让你学到有关JavaScript的更多知识。',
     now(),
     now()
 ),

 (
     null,
     '深入理解JavaScript',
     66.20,
     '[美]罗彻麦尔（Axel Rauschmayer）',
     '2016-01-01',
     '人民邮电出版社',
     54,
     'jsDeep_sm.jpg',
     'jsDeep_lg.jpg',
     '深入理解JavaScript',
     '本书针对JavaScript初学者，帮助读者掌握JavaScript开发的精髓。每一章从教授语言的一个主题开始，给出了实践以及解决实际缺陷的指南，然后深入到相关的信息。本书帮助入门的程序员理解基础知识，掌握核心实践，甚至深入了解一些实践方法的优缺点，做到知其然且知其所以然。《JavaScript启示录》一书作者Cody Lindley鼎力推荐喜欢，又或是不喜欢，JavaScript都在那里，日夜相随，不离不弃。JavaScript正越来越多地出现在我们的生活中，从浏览器到服务端，再到移动端。想要学习这种语言，或者深入了解一些你没有涉足的内容，本书正是你的选择，它既可以指引入门也能够带你深入JavaScript。作者是一位程序员，也曾在相同的处境中暮然回首，找到了真实的自己。本书通过4个独立部分引领读者逐步接近JavaScript语言。首先，快速指引部分帮助你在JavaScript编程上变得富有成效。更有经验的程序员会返现有一个完整而易读的参考，深入覆盖了该语言的每个特性。本书包括以下内容：JavaScript快速上手：更习惯面向对象的编程？这个部分会帮你更快更好地开始学习JavaScript。背景：了解JavaScript的历史，以及它与其他语言之间的关系。深入JavaScript：详细学习ECMAScript 5，从语法，变量，函数，面向对象编程，再到正则表达式和JSON，以及大量的示例。技巧、工具和类库：对现有风格指引、实践、高阶技术、模块系统、包管理、构建工具进行调研和学习。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript DOM编程艺术(第2版)',
     38.70,
     '[英]基思(Keith,J.)，[加]桑布尔斯(Sambells,J.)　著，杨涛　等译 ',
     '2011-04-01',
     '人民邮电出版社',4613,
     'jsDom_sm.jpg',
     'jsDom_lg.jpg',
     'JavaScript DOM编程艺术(第2版)',
     '超级畅销书升级版，首版销量保证。书中详解开发Web应用的基石——W3C的DOM标准，由倡导Web标准的大牛领军人物执笔精心撰写，揭示了前端开发的真谛，是学习JavaScript和DOM开发的必读之作。纵情释放JavaScript和DOM编程的惊人潜力，内容全年涵盖HTML5、jQuery。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript函数式编程',
     41.00,
     '[美]Michael Fogus　著，欧阳继超　等译',
     '2015-08-01',
     '人民邮电出版社',
     181,
     'jsFun_sm.jpg',
     'jsFun_lg.jpg',
     'JavaScript函数式编程',
     '函数式编程是当前程序设计语言的发展趋势和热门话题。本书的作者Michael Fogus是Clojure和ClojureScript的核心贡献者，也是The Joy of Clojure一书的作者，是世界知名的函数式编程专家。全书共9章，分别介绍了JavaScript函数式编程、一等函数与Applicative编程、变量的作用域和闭包、高阶函数、由函数构建函数、递归、纯度和不变性以及更改政策、基于流的编程、类编程。除此之外，附录中还介绍了更多函数式JavaScript。本书内容全面，示例丰富，适合想要了解函数式编程的JavaScript程序员和学习JavaScript的函数式程序员阅读。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript高级程序设计(第3版)',
     78.20,
     '[美]Nicholas C. Zakas 著',
     '2012-03-01',
     '人民邮电出版社',
     10860,
     'jsHigh_sm.jpg',
     'jsHigh_lg.jpg',
     'JavaScript高级程序设计(第3版)',
     '1995年，Brendan Eich创造了JavaScript。 2005年，席卷全球的“Ajax热”激发了全世界Web开发人员学习JavaScript的热情。与此同时，本书第1版诞生。这一版的中文版狂销4万册，被誉为“*深度的JavaScript经典”，奠定了其不可替代的权威地位。2005年到2009年，前端开发社区在实践中充分检验了这门语言的各种实现和扩展，JavaScript从被戏谑的“玩具语言”一跃成为软件业举足轻重的通用编程语言。2009年1月本书第2版应运而生，凝聚作者和社区专家多年宝贵经验的这一技术名著再次得到读者认可和褒扬，中文版销量达到2万册。2009年到2011年，ECMAScript5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为这门语言增添了很多适应未来发展的新特性。2012年初本书第3版面世，中文版也紧随其后。第3版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。 作为JavaScript技术经典名著，《JavaScript高级程序设计（第3版）》承继了之前版本全面深入、贴近实战的特点，在详细讲解了JavaScript语言的核心之后，条分缕析地为读者展示了现有规范及实现为开发Web应用提供的各种支持和特性。',
     now(),
     now()
 ),

 (
     null,
     '高性能JavaScript',
     51.30,
     'Nicholas C. Zakas（尼古拉斯.泽卡斯） 著，丁琛 译 ',
     '2015-08-01',
     '电子工业出版社',
     452,
     'jsHighPerformance_sm.jpg',
     'jsHighPerformance_lg.jpg',
     '高性能JavaScript',
     '如果你使用 JavaScript 构建交互丰富的 Web 应用，那么 JavaScript 代码可能是造成你的Web应用速度变慢的主要原因。本书揭示的技术和策略能帮助你在开发过程中消除性能瓶颈。你将会了解如何提升各方面的性能，包括代码的加载、运行、DOM 交互、页面生存周期等。雅虎的前端工程师 Nicholas C. Zakas 和其他五位 JavaScript 专家介绍了页面代码加载的优佳方法和编程技巧，来帮助你编写更为高效和快速的代码。你还会了解到构建和部署文件到生产环境的优佳实践，以及有助于定位线上问题的工具。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript高效图形编程（修订版）',
     38.30,
     '[英]茄科　著，徐鹏飞　译','2015-03-01',
     '暂无',
     46,
     'jsImage_sm.jpg',
     'jsImage_lg.jpg',
     'JavaScript高效图形编程（修订版）',
     '随着HTML5的出现和Web浏览器对JavaScript支持的日益改进，JavaScript已经成为创建高性能Web图形的主要工具。本书介绍了如何使用JavaScript、jQuery、DHTML和HTML5的Canvas元素来为台式机和移动设备创建富Web应用程序。通过本书的示例，有经验的Web开发人员可以学习创建游戏、DHTML特效、业务仪表板和其他应用的方法。除了丰富的示例外，本书的另外一个特点是通俗易懂、循序渐进，每个主题都为下一个要讲解的主题提供了基础。本书涵盖了如下内容：JavaScript性能优化；综合jQuery和传统的DHTML来创建图形动画；学习使用jQuery UI和Ext JS库的高级UI技术；用碰撞检测、对象处理、JavaScript滚动技术构建游戏；掌握HTML5 Canvas、如绘制、填充、位图和动画等；用jQuery Mobile和PhoneGap创建手机应用；用Google的数据可视化工具创建交互式仪表板。本书是使用JavaScript进行图形编程的轻量级参考图书；如果读者对HTML5中的Canvas图形编程感兴趣，可以参阅《HTML5 Canvas开发详解（第2版）》。该书全面涵盖了使用Canvas进行图形编程的细节内容。',
     now(),
     now()
 ),

 (
     null,
     '你不知道的JavaScript',
     62.40,
     '[美]辛普森（Kyle Simpson） 著；赵望野，梁杰 译',
     '2016-09-01',
     '人民邮电出版社',
     127,
     'jsKnow_sm.jpg',
     'jsKnow_lg.jpg',
     '你不知道的JavaScript',
     'JavaScript语言有很多复杂的概念，但却用简单的方式体现出来（比如回调函数），因此，JavaScript开发者无需理解语言内部的原理，就能编写出功能全面的程序。然而，JavaScript的这些复杂精妙的概念才是语言的精髓，即使是经验丰富的JavaScript开发者，如果没有认真学习，也无法真正理解语言本身的特性。正是因为绝大多数人不求甚解，一遇到出乎意料的行为就认为是语言本身有缺陷，进而把相关的特性加入黑名单，久而久之就排除了这门语言的多样性，人为地使它变得不完整、不安全。 “你不知道的JavaScript”系列就是要让不求甚解的JavaScript开发者迎难而上，深入语言内部，弄清楚JavaScript每一个零部件的用途。本书介绍了该系列的两个主题：“类型和语法”以及“异步和性能”。掌握了这些知识之后，无论什么技术、框架和流行词语，你都能轻松理解。',
     now(),
     now()
 ),

 (
     null,
     '编写可维护的JavaScript',44.40,
     '[美]Nicholas C. Zakas（扎卡斯） 著；李晶，郭凯，张散集 译',
     '2013-04-01',
     '人民邮电出版社',
     792,
     'jsMaintain_sm.jpg',
     'jsMaintain_lg.jpg',
     '编写可维护的JavaScript',
     '1.作者是大名鼎鼎的NicholasZakas，他是《JavaScript高级程序设计》、《Ajax高级程序设计》和《高性能JavaScript》的作者。在业界很有知名度和影响力，畅销书作者。2.本书是**本集中关注编程风格和**实践的JavaScript技术图书。3.本书得到国内外众多知名前端工程师的推荐和好评。中文版由*UED团队负责翻译，质量可靠，著译双馨。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript设计模式',
     38.70,
     '[美] Addy Osmani（奥斯马尼 ）著；徐涛 译',
     '2013-06-01',
     '人民邮电出版社',
     1213,
     'jsModel_sm.jpg',
     'jsModel_lg.jpg',
     'JavaScript设计模式',
     'JavaScript设计模式教你如何学会把经典和现代设计模式应用到JavaScript语言中，来编写优美、结构化和可维护的代码。如果想让代码保持高效、更易于管理，并且能够同步**的**实践，那么JavaScript设计模式正是为你打造的。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript忍者秘籍',
     57.80,
     '[美]莱西格（Resig，J.）（美）贝比奥特（ Bibeault，B.） 著；徐涛 译',
     '2015-10-01',
     '人民邮电出版社',
     437,
     'jsNinja_sm.jpg',
     'jsNinja_lg.jpg',
     'JavaScript忍者秘籍',
     '本书内容极具深度，技术含量高，作者是jQuery JavaScript库的创造者，在JS领域享有盛誉。 JavaScript语言非常重要，相关的技术图书也很多，但没有任何一本书对JavaScript语言的重要部分（函数、闭包和原型）进行深入、全面的介绍，也没有任何一本书讲述跨浏览器代码的编写。本书是jQuery库创始人编写的一本深入剖析JavaScript语言的书。 可以开始编写更加出彩的JavaScript应用程序了，甚至也可以编写自己的代码库和框架。 本书包括以下内容： 函数、对象、闭包、正则表达式等； 正确的角度探视应用程序和库； 现代JavaScript设计； 处理跨浏览器开发的复杂性。',
     now(),
     now()
 ),

 (
     null,
     '基于MVC的JavaScript Web富应用开发',
     49.40,
     '[美]Alex MacCaw（亚历克斯·麦卡劳）　著，李晶　张散集　译',
     '2016-11-01',
     '电子工业出版社',
     14,
     'jsRich_sm.jpg',
     'jsRich_lg.jpg',
     '基于MVC的JavaScript Web富应用开发',
     '《基于MVC的JavaScriptWeb富应用开发》不是为JavaScript初学者所写，如果你对JavaScript这门语言缺乏基本的了解和认识，我建议你先阅读一些更基础的书，比如Douglas Crockford著的《JavaScript: The Good Parts》。《基于MVC的JavaScriptWeb富应用开发》更适合有一些JavaScript开发经验的开发者，比如使用jQuery类库的开发者，或者当你希望构建更复杂、更高级的JavaScript应用时，也是适合你的。此外，《基于MVC的JavaScriptWeb富应用开发》的很多章节，特别是附录，对于有经验的 JavaScript开发者来说也是非常有帮助的。',
     now(),
     now()
 ),

 (
     null,
     'JavaScript语言精粹（修订版）',
     32.90,
     '[美]DouglasCrockford（道格拉斯·克罗克福德）  著；赵泽欣 等 译',
     '2012-09-01',
     '电子工业出版社',
     2976,
     'jsSuccinct_sm.jpg',
     'jsSuccinct_lg.jpg',
     'JavaScript语言精粹（修订版）',
     'JavaScript 曾是“世界上误解的语言”，因为它担负太多的特性，包括糟糕的交互和失败的设计，但随着Ajax 的到来，JavaScript“从受误解的编程语言演变为非常流行的语言”，这除了幸运之外，也证明了它其实是一门优秀的语言。Douglas Crockford 在本书中剥开了JavaScript 沾污的外衣，抽离出一个具有更好可靠性、可读性和可维护性的JavaScript 子集，让你看到一门优雅的、轻量级的和非常富有表现力的语言。作者从语法、对象、函数、继承、数组、正则表达式、方法、样式和优美的特性这9 个方面来呈现这门语言真正的精华部分，通过它们完全可以构建出优雅高效的代码。作者还通过附录列出了这门语言的毒瘤和糟粕部分，且告诉你如何避免它们。最后还介绍了JSLint，通过它的检验，能有效地保障我们的代码品质。',
     now(),
     now()
 ),

 (
     null,
     '编写可测试的JavaScript代码',
     46.80,
     '[美]托斯勒　著，徐涛　译',
     '2015-02-01',
     '暂无',
     72,
     'jsTest_sm.jpg',
     'jsTest_lg.jpg',
     '编写可测试的JavaScript代码',
     '本书试图在良好开发实践和JavaScript 之间建立一个桥梁，试图结合测试和质量保证（QA）两个方面几十年的研究和经验教训，将这些经验教训应用于JavaScript。作者曾先后在YouTube、Yahoo！以及Google等公司从事前端开发及测试相关工作，具有丰富的经验。 随着越来越多的专业程序员开始使用JavaScript 语言，这种语言的**实践开始被理解和编纂测试JavaScript代码是一个复杂的过程。本书将在很大程度上帮你简化该过程。JavaScript专业开发人员必须具备的一个技能是编写可测试的代码。不管是创建新应用程序，还是重写遗留代码，本书都将向你展示如何为客户端和服务器编写和维护可测试的JavaScript代码。从减少代码复杂性的方法，到单元测试、代码覆盖率、调试以及自动化，你将全面学到如何编写出让自己和同事能够轻松修复和维护的JavaScript代码。测试JavaScript代码是一个复杂的过程。本书将在很大程度上帮你简化该过程。整体了解敏捷、测试驱动开发、行为驱动开发；使用静态语言模式和JavaScript标准减少代码复杂性；学习基于事件的架构优势，包括模块化、松耦合、可重用性；在功能和应用程序层面上探索用于编写和运行单元测试的相关工具；生成代码覆盖率，衡量测试范围和测试有效性；使用Selenium或CasperJS进行集成测试、性能测试、负载测试；使用浏览器内置工具、Node.js、移动、生产环境调试；理解什么是自动化开发，何时以及如何进行自动化开发。',
     now(),
     now()
 );

#创建用户表
 create table bs_users(
     uid int primary key auto_increment,
     uname varchar(16) not null default '',
     upwd varchar(32) not null default '',
     createTime datetime not null default now(),
     updateTime datetime not null default now()
 );

 #向用户表插入数据
 INSERT INTO bs_users VALUES
 (NULL,'tom','tttttttt',now(), now()),
 (NULL,'allen','aaaaaaaa',now(),now()),
 (NULL,'lucy','llllllll',now(),now());

#创建书车表
 create table bs_cart(
     cid int primary key auto_increment,
     uid int not null,
     bid int not null,
     bookCount int not null,
     isSelect tinyint not null default 1,
     createTime datetime not null default now(),
     updateTime datetime not null default now()
 );

#创建书单表
 create  table bs_order(
     oid int primary key auto_increment,
     uid int not null,
     uname varchar(16) not null,
     phone varchar(20) not null,
     addr varchar(128) not null,
     totalPrice FLOAT(8,2) not null,
     bookInfo text not null,
     createTime datetime not null default now(),
     updateTime datetime not null default now()
 );

 #创建我的关注表
 create table bs_heart(
     hid int primary key auto_increment,
     bid int not null,
     uid int not null,
     createTime datetime not null default now(),
     updateTime datetime not null default now()
 );