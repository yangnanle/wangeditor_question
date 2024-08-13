<template>
  <div class="common-layout">
    <el-container>
      <el-header width="100%">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true"
          @select="handleSelect">
          <el-menu-item v-for="item in menus" :key="item.path" :index="item.path">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <el-card>
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menus = ref([
  { path: '/pageEditor', name: '切页获取内容' },
  { path: '/questionPage', name: 'wangeditor绑定的值通过父组件传递' },
  { path: '/normal', name: '绑定的值在当前页获取' },
])

const activeIndex = ref('/pageEditor')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key;
}
</script>

<style scoped></style>
