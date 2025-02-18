<template>
  <div class="wrapper">
    <header class="header">
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">Main</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">Footer</footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header,
.footer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightblue;
}

.header ul {
  list-style: none;
}

.main {
  flex-grow: 1;
}
</style>
