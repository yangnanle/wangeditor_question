<template>
  <div style='border: 1px solid #ccc; min-height: 60vh;'>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" mode="default" v-model="props.valueHtml"
      style="min-height: 500px; overflow-y: hidden" @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import type { UploadRequestOptions } from "element-plus"
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  reactive,
  watch,
} from "vue";
import { ElMessage } from "element-plus";
import { IDomEditor, DomEditor, createEditor, SlateElement } from '@wangeditor/editor';
// 说明：需要找到editor-for-vue中的package.json文件，exports中添加："types": "./dist/src/index.d.ts"，否则ts会报错，找不到该模块
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
Boot.registerModule(markdownModule)


const props = defineProps({
  valueHtml: { type: String, required: true, default: '' },
});

const htmlValue = ref('')
const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef，重要！

const toolbarConfig = ref({
  excludeKeys: ['group-video', 'insertImage', 'insertLink', 'codeBlock', 'emotion']
}); // 工具栏配置
const editorConfig = reactive({}); // 编辑器配置

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
  // console.log('created', editor)
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor: IDomEditor) => {
  console.log('获取编辑区的HTML：', editor.getHtml());
}

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