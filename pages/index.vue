<script lang="ts" setup>

const storedNews = useNewsStore();
const header = ref('');
const link_img = ref('');
const content = ref('');
const authors = ref([]);
const fio = ref('');

const sortBy = ref('header');
watch(sortBy, (newSortBy) => {
  storedNews.addSortToParams(newSortBy);
})
const resetParams = () => {
  sortBy.value = 'header';

  storedNews.fetchNews();
}

const createAuthor = () => {
  if (fio.value) {
    storedNews.addAuthor(fio.value);
  }
}

const createNews = () => {
  if (header.value && link_img.value && content.value && authors.value) {
    storedNews.addNews(header.value, link_img.value, content.value, authors.value);
  }
}

storedNews.fetchNews();
</script>

<template>

  <!-- Сортировка -->
  <div class="container mb-4">
    <div class="row mt-2">
      <div class="col-md-2 mb-4">
        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addNewsModal"
          data-bs-whatever="news">Добавить новость</button>
        <div class="modal fade" id="addNewsModal" tabindex="-1" aria-labelledby="addNewsModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addNewsModalLabel">Добавление новости</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="header" class="col-form-label">Заголовок:</label>
                    <input type="text" class="form-control" id="header" v-model="header">
                  </div>
                  <div class="mb-3">
                    <label for="link_img" class="col-form-label">Ссылка на постер:</label>
                    <input type="text" class="form-control" id="link_img" v-model="link_img">
                  </div>
                  <div class="mb-3">
                    <label for="content" class="col-form-label">Контент:</label>
                    <textarea class="form-control" id="content" v-model="content"></textarea>
                  </div>
                  <div class="mb-3 text-start">
                    <label class="mb-1">Авторы</label>
                    <div>
                      <div v-for="author in storedNews.authors" :key="author.id">
                        <input class="me-1" type="checkbox" :id="'author_' + author.id" :value="author.id"
                          v-model="authors">
                        <label :for="'author_' + author.id">{{ author.fio }}</label>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                  @click="createNews()">Создать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2 mb-4">
        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addAuthorModal"
          data-bs-whatever="author">Добавить автора</button>
        <div class="modal fade" id="addAuthorModal" tabindex="-1" aria-labelledby="addAuthorModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="addAuthorModalLabel">Добавление автора</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="fio" class="col-form-label">ФИО:</label>
                    <input type="text" class="form-control" id="fio" v-model="fio">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                  @click="createAuthor()">Создать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <select class="form-select" v-model="sortBy">
          <option value="header">Сортировка по заголовкам</option>
          <option value="created_at">Сортировка по дате публикации</option>
          <option value="comments">Сортировка по кол-во комментариев</option>
        </select>
      </div>
      <div class="col-md-1">
        <button class="btn btn-outline-warning" @click="resetParams">Reset</button>
      </div>

      <!-- Основная часть -->
      <div class="d-flex justify-content-center" v-if="storedNews.isLoading">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div class="col" v-for="news in storedNews.news" :key="news.id">
            <div class="card h-100">
              <div style="position: relative;">
                <div @click="$router.push('/news/' + news.id)"><img :src="news.link_img" class="card-img-top" alt="...">
                </div>
                <p class="createdAt">{{ news.created_at.split(' ')[0] }}</p>
              </div>
              <div class="card-body">
                <div @click="$router.push('/news/' + news.id)">
                  <h5 class="card-title">
                    <strong>{{ news.header }}</strong>
                  </h5>
                </div>
                <p class="card-text text-sm">Автор(-ы):
                  <template v-for="(author, index) in news.authors">
                    <span>{{ author.fio }}</span>
                    <span v-if="index !== news.authors.length - 1">, </span>
                  </template>
                </p>

              </div>
              <div class="card-footer text-center">
                <small class="text-body-secondary">
                  <a class="text-decoration-none">
                    <button @click="$router.push('/news/' + news.id)" class="btn btn-outline-primary">Подробнее</button>
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <nav aria-label="Page navigation example" class="mt-4 d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" :class="{ 'disabled': storedNews.page - 1 == 0 }" href="#" aria-label="Previous"
                @click.prevent="storedNews.changePage(storedNews.page - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in Math.ceil(storedNews.total / storedNews.size)" :key="page">
              <a class="page-link" :class="{ 'active': page == storedNews.page }" href="#"
                @click.prevent="storedNews.changePage(page)">
                {{ page }}
              </a>
            </li>
            <li class="page-item">
              <a class="page-link"
                :class="{ 'disabled': storedNews.page + 1 > Math.ceil(storedNews.total / storedNews.size) }" href="#"
                aria-label="Next" @click.prevent="storedNews.changePage(storedNews.page + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>


<style>
.createdAt {
  color: white;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #0d6efd;
  padding: 10px 10px;
  border-bottom-left-radius: 10px;
}
</style>