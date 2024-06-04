<template>
  <div class="about">
    <h1>React 子应用👇</h1>
    <!-- name：应用名称, url：应用地址 -->
    <micro-app name="react-app" url="http://localhost:2000/"></micro-app>
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
