import { defineStore } from 'pinia'
import { api } from '~/api';

export const useNewsStore = defineStore('news', () => {
  const news = ref([]);
  const authors = ref([]);
  const page = ref(1);
  const total = ref(0);
  const size = 8;
  const isLoading = ref(true);
  const params: {
    sortBy:string,
    sortDir:string,
    size:number,
    page:number
  } = {
    sortBy: 'header',
    sortDir: 'desc',
    page: 1,
    size
  };

  function addSortToParams(sortBy:string) {
    params.sortBy = sortBy;
    params.sortDir = 'desc';
    fetchNews();
  }
  

  function changePage(pages:number) {
    page.value = pages;
    params.page = pages;
    fetchNews();
  }

  async function fetchNews() {
    const response = await api.get('/news', {params});
    isLoading.value = false;
    news.value = response.data.news;
    total.value = response.data.total;
  }

  async function fetchAuthors() {
    const response = await api.get('/authors');
    authors.value = response.data.authors;
  }

  async function addNews(header:string, link_img:string, content:string, authors:any) {
    const response = await api.post('/news', {
      header: header,
      link_img: link_img,
      content: content,
      authors: authors,
    });
    fetchNews();
  }

  async function addAuthor(fio:string) {
    const response = await api.post('/news/author', {
      fio: fio,
    });
    fetchAuthors();
  }

  fetchAuthors();

  return {
    news, 
    authors,
    fetchNews,
    addSortToParams,
    total,
    size,
    page,
    changePage,
    isLoading,
    fetchAuthors,
    addNews,
    addAuthor,
  }
})
