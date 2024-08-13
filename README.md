
> 我将项目放到了stackblitz，大家可以在线调试：https://stackblitz.com/~/github.com/yangnanle/wangeditor_question?file=src/views/normal.vue

# 问题
进行切页时，编辑器的撤销会是上一页的内容，不符合项目需求
# 解决
每次切页时，销毁重建编辑器

# 描述
项目需求，让docx转html，并在编辑器中展示，这个是使用了mammoth进行了转换，使用wangeditor进行展示

问题：使用python_mammoth转的html，也就是项目中```content```值，在https://www.wangeditor.com/demo/set-html.html 中可以展示，但是在项目中效果差强人意

页面阐述：

复现问题：这个页面是将wangeditor编辑器封装成了一个组件，在父页面模拟请求获取数据再通过props传递编辑区双向绑定的```valueHtml```值

正常效果：将wangeditor编辑器和获取html放在了同一个页面使用，```valueHtml```模拟请求获取数据后直接使用，可以正常显示

对比的区别：**editor绑定的值，一个是由父组件props传递的，一个是当前模拟接口获取的**

已经成功解决啦！在此感谢作者大大

在传递时，回车解析成了换行，所以在传递时```.replace(/\n/, '')```，可以完美解决

![image](https://github.com/yangnanle/wangeditor_question/assets/151699136/af1ad75f-c923-414a-9b43-778d9ffd44ee)


