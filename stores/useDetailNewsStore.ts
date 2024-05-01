// useDetailNewsStore.ts
import { defineStore } from 'pinia'
import { api } from '~/api';

export const useDetailNewsStore = defineStore('detail', () => {
  const news = ref(null);
  const storedNews = useNewsStore();

  async function fetchNews(id: number) {
    const response = await api.get('/news/' + id);
    console.log(response.data.news.comments)
    news.value = response.data.news;
  }

  async function addLike(id: number) {
    const response = await api.post('/news/' + id + '/like');
    fetchNews(id);
  }

  async function addComment(id: number, username: string, content: string) {
    const response = await api.post('/news/' + id + '/comment', {
      username: username,
      content: content,
      news_id: id,
    });
    fetchNews(id);
  }

  async function removeNews(id: number) {
    const response = await api.delete('/news/' + id);
    storedNews.fetchNews();    
  }

  async function removeComment(id: number, commentId: number) {
    const response = await api.delete('/news/' + id + '/comment/' + commentId);
    fetchNews(id);  
  }

  return {
    news,
    fetchNews,
    addLike,
    addComment,
    removeNews,
    removeComment,
  };
});
