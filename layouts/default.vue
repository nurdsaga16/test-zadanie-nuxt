<script setup lang="ts">

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark d-flex">
        <div class="container-fluid d-flex justify-content-center">
            <NuxtLink to="/" class="navbar-brand">
                <img src="/public/assets/news-logo.png" @click="$router.push('/')" alt="Logo" width="200"
                    height="40" class="d-inline-block align-text-top">
            </NuxtLink>
        </div>
    </nav>
    <div class="container py-4 mb-auto">
        <slot />
    </div>
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top text-light">
        <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                style="margin-left: 20px;">
                <img src="/public/assets/news-logo.png" width="100" height="20" lt="">
            </a>
            <span class="mb-3 mb-md-0">© 2024 Новости, Inc</span>
        </div>
    </footer>
</template>

<style>
.navbar-brand {
    margin-top: 5px;
    margin-left: 20px;
    margin-bottom: 5px;
}

.navbar {
  background-color: #191970;
}

footer {
  background-color: #191970;
}

.container {
    min-height: calc(100vh - 136px);
}
</style>