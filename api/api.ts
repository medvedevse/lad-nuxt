export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    provide: {
      api,
    },
  };
});
