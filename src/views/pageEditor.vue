<template>
  <div>
    <el-button @click="prevPage">上一页</el-button>
    <el-button @click="nextPage">下一页</el-button>
    当前页：{{ currPage }}
  </div>
  <!-- <div style='border: 1px solid #ccc; min-height: 60vh;'>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" mode="default" v-model="valueHtml"
      style="min-height: 500px; overflow-y: hidden" @onCreated="handleCreated" @onChange="handleChange" />
  </div> -->
  <div id="editor—wrapper">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="editor-container"><!-- 编辑器 --></div>
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  watch
} from "vue";
import { IDomEditor, createEditor, createToolbar, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { list, data } from '@/utils/data'


const originalText = ref()
const editorConfig: Partial<IEditorConfig> = {
  autoFocus: true,
  hoverbarKeys: {
    'image': {
      menuKeys: ["imageWidth30", "imageWidth50", "imageWidth100", "editImage", "deleteImage"],
    }
  },
  onCreated(editor: IDomEditor) {
    editorRef.value = editor;
    originalText.value = editor.getHtml() // 初始化创建时，获取一次html，作为原始的html
  },
  onChange(editor: IDomEditor) {
    const html = editor.getHtml()
    if (html !== originalText.value && html !== valueHtml.value) {
      console.log('变化了');
      console.log('当前更改前的html', originalText.value)
      console.log('当前更改后的html', html)
    }
  },
}
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['italic', 'fullScreen', 'group-video', 'insertImage', 'insertLink', 'codeBlock', 'emotion'] // 'insertImage' group-image,
}; // 工具栏配置
const initEditor = () => {
  const editor = createEditor({
    selector: '#editor-container',
    html: valueHtml.value || '<p><br/></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
  })
  const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
  })
}

const currPage = ref(1)
const valueHtml = ref('')
onMounted(() => {
  setTimeout(() => {
    // var content = list.find(item => item.page === currPage.value).content
    var content = data.find(item => item.page === currPage.value).content
    valueHtml.value = content
    initEditor()
  }, 100);
})

const watchPage = watch(() => currPage.value, (newVal) => {
  const editor = editorRef.value
  if (editor == null) return
  // 不生效
  // editor.history.undos.length = 0;
  // editor.history.redos.length = 0;
  // 每次切换时，销毁重建编辑器
  editor.destroy()
  // 模拟请求
  setTimeout(() => {
    // 加在这里也不生效
    // editor.history.undos.length = 0;
    // editor.history.redos.length = 0;
    // var content = list.find(item => item.page === newVal).content
    var content = data.find(item => item.page === newVal).content
    if (content) {
      initEditor()
    }

    // valueHtml.value = content
    // editor.setHtml(content)
    // originalText.value = editor.getHtml()
  }, 100);
})

const prevPage = () => {
  if (currPage.value > 1) {
    currPage.value--
  }
}
const nextPage = () => {
  if (currPage.value < data?.length) {
    currPage.value++
  }
}

const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef，重要！

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
  watchPage()
});


</script>
<style>
v-deep .w-e-text-container .w-e-scroll {
  min-height: 400px;
}

/* 编辑区域整体文字对齐方式 */
.w-e-text-container *,
.w-e-toolbar * {
  text-align: start;
}


/* 去掉表格边框 */
/* .w-e-text-container [data-slate-editor] .table-container {
  border: none;
} */
/* 编辑区的表格样式 */
.w-e-text-container [data-slate-editor] table {
  width: 100%;
}

/* 表格内容居中 */
.w-e-text-container [data-slate-editor] table td,
.w-e-text-container [data-slate-editor] table th {
  text-align: center;
}
</style>