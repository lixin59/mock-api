import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "/@/styles/variables.scss";'
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [pathResolve('src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: [
      // 配置模块的路径别名
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  }
});
