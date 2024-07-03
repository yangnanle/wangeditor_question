<template>
  <div style="min-height: 75vh;">
    <el-upload ref="originalUploadRef" class="upload-demo" drag action="#" :before-upload='beforeUpload'>
      <div class="el-upload__text">点击或拖拽文件至此区域即可上传</div>
    </el-upload>
    <Editor :value-html="editorHtml" />
  </div>
</template>

<script setup lang="ts">
import type { UploadRequestOptions } from "element-plus"
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import Editor from '@/components/editor.vue'
import mammoth from "mammoth";
import { Options, Run } from '@/types/mammoth'

const editorHtml = ref('')

const option: Options = reactive({
  styleMap: [
    "p[style-name='Section Title'] => h1:fresh", // fresh表示生成一个新的无样式的h1标签
    "p[style-name='Subsection Title'] => h2:fresh",
    "u => u", // 下划线，可能会和链接混淆，可以替换成em
    "comment-reference => sup", // 包含注释
    "table => table"
  ],
  convertImage: mammoth.images.imgElement(function (image) {
    return image.read("base64").then(function (imageBuffer) {
      // 这里可以定义图片上传，src也可以改成后端返回的链接--具体看需求
      return {
        src: "data:" + image.contentType + ";base64," + imageBuffer
      };
    });
  }),
  transformDocument: (element) => {
    console.log(element);
    // if (element.children) {
    //   for (let i = 0; i < element.children.length; i++) {
    //     const e = element.children[i];
    //     if (e.type == "paragraph") {
    //       e.children.forEach((dom: Array<Run>) => {

    //       });
    //     }
    //   }
    // }
    return element;
  }
})

const beforeUpload = (file: File) => {
  console.log(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    const arrayBuffer = e.target?.result as ArrayBuffer;
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, option).then((result) => {
      console.log(result.value);
      console.log(typeof result.value);
      editorHtml.value = result.value;
    }).catch((err) => {
      console.log('Error', err)
    })
  }
  reader.readAsArrayBuffer(file);
  return false
}

// const doHttpRequest = (option: UploadRequestOptions) => {
//   console.log(option.file);
// }

// onMounted(() => {
//   // const ohtml = `
//   // <p><u><p><img alt="snipaste20230314_134245" src="data:image/png;base64," /></p></u>Geolocation permission denied</p>
//   // <p><strong><img src="data:image/png;base64" />髋关节周围神经鞘瘤</strong></p>
//   // <p>以下图片是正常结构</p><p><img src='' alt='' /></p>`
//   // console.log('原始html：', ohtml);
//   // const newHtml = wrapImagesInP(ohtml)
//   // console.log('处理img后的html：', newHtml);
// })

</script>
<style>
v-deep .w-e-text-container .w-e-scroll {
  min-height: 400px;
}
</style>