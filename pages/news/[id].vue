<script lang="ts" setup>
const storedDetailNews = useDetailNewsStore();
const route = useRoute();
const username = ref('');
const comment = ref('');

storedDetailNews.fetchNews(route.params.id);

const sendComment = () => {
  if (username.value && comment.value) {
    storedDetailNews.addComment(route.params.id, username.value, comment.value);
  }
}
</script>

<template>
  <template v-if="storedDetailNews.news">
    <div class="container mt-2">
      <div>
        <h1 class="text-center fw-bold">{{ storedDetailNews.news.header }}</h1>
        <div class="d-flex justify-content-between">
          <div class="mt-4 ms-3">
            <strong>Автор(ы): </strong>
            <template v-for="(author, index) in storedDetailNews.news.authors">
              <span>{{ author.fio }}</span>
              <span v-if="index !== storedDetailNews.news.authors.length - 1">, </span>
            </template>
            <p class="mt-2">{{ storedDetailNews.news.created_at }}</p>
          </div>
          <div class="delete mt-4">
            <small class="text-body-secondary">
              <a class="text-decoration-none">
                <button @click="storedDetailNews.removeNews(storedDetailNews.news.id), $router.push('/')" class="btn btn-danger">Удалить</button>
              </a>
            </small>
          </div>
        </div>

      </div>
      <div class="d-flex justify-content-center mt-4">
        <img :src="storedDetailNews.news.link_img" class="img-fluid rounded-3" alt="">
      </div>
      <div class="content mt-4 px-5">
        <p>
          {{ storedDetailNews.news.content }}
        </p>
        <div>
          <span><i class="fa-solid fa-eye me-2"></i>{{ storedDetailNews.news.views }}</span>
        </div>
        <div>
          <span><i @click="storedDetailNews.addLike(route.params.id)" class="fa-solid fa-heart me-2"></i>{{
            storedDetailNews.news.likes }}</span>
        </div>
      </div>
      <div class="comments mt-5">
        <h4 class="text-center">Комментарии</h4>
        <div class="comment-send d-flex justify-content-center mt-4">
          <div class="col-md-2 me-2">
            <input type="text" class="form-control" v-model="username" placeholder="Username..."></input>
          </div>
          <div class="col-md-6 d-flex">
            <textarea class="form-control me-2" rows="3" v-model="comment" placeholder="Комментарий..."></textarea>
            <div class="col-md-2 d-flex align-items-end justify-content-start">
              <button class="btn btn-primary" @click="sendComment"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center mt-3">
          <div class="col-md-8" v-for="comment in storedDetailNews.news.comments" :key="comment.id">
            <div class="card mb-4 card-review">
              <div class="card-body">
                <h5 class="card-title"><strong>{{ comment.username }}</strong></h5>
                <div class="d-flex justify-content-between">
                  <p class="card-text">{{ comment.content }}</p>
                  <button @click="storedDetailNews.removeComment(storedDetailNews.news.id, comment.id)" class="btn btn-danger btn-sm">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>



<style></style>