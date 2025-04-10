import adapter from '@sveltejs/adapter-auto'; // Make sure this is the only adapter imported/used
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // Or '@sveltejs/kit/vite' depending on setup

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(), // Or your specific preprocessor

  kit: {
    adapter: adapter(),
    // If you had paths: { base: '...' } keep it if needed
  }
};

export default config;
