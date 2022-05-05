* 对易盾滑块的逆向分析
* 易盾滑块watchMan.js文件会每隔一段时间更新 更新后会导致一些变量变化, 这里做了适配, 只要代码结构不发生变化都可适配
* `server.js` 要以**debugger**的模式启动, 因为在这种模式下nodejs才会对watchMan.js的一个对象执行toString()操作, 而系统是对是否执行了这个操作有做检测
* 启动`server.js` 再启动`application.py`

![index](https://github.com/yangshimin/markdown-img/raw/master/%E6%98%93%E7%9B%BE.png)