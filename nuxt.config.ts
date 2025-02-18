// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "@nuxt/image",
    "dayjs-nuxt",
    "nuxt-typed-router",
    "nuxt-file-storage",
    "@prisma/nuxt",
  ],
  css: ["~/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
						@use "~/assets/scss/_vars.scss" as *;
						@use "~/assets/scss/_mixins.scss" as *;
						`,
        },
      },
    },
  },
  fonts: {
    families: [{ name: "montserrat", provider: "google" }],
  },
  prisma: {
    autoSetupPrisma: true,
  },
  experimental: {
    componentIslands: true,
  },
});
