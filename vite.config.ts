import path from "path"
import { defineConfig } from 'vitest/config'
import tailwindcss from "@tailwindcss/vite"
import federation from '@originjs/vite-plugin-federation';
import react from "@vitejs/plugin-react-swc"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    federation({
      name: 'app',
      remotes: {},
      shared: ['react', 'react-dom', 'react-hook-form', "@tanstack/react-router"],
    }),
    {
      name: 'vite-plugin-reload-endpoint',
      configureServer(server) {
        server.middlewares.use((req: any, res, next) => {
          if (req.url === '/__fullReload') {
            server.hot.send({ type: 'full-reload' });

            res.end('Full reload triggered');
          } else {
            next();
          }
        });
      },
    },
  ],
  assetsInclude: ['**/*.lottie'],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});