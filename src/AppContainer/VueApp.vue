<template>
  <div class="about">
    <h1>Vue 子应用👇</h1>
    <!-- name：应用名称, url：应用地址 -->
    <micro-app name="vue-app" url="http://localhost:3000/" iframe></micro-app>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
