// vite.config.js
import {resolve} from "path";
import dts from 'vite-plugin-dts'
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from "url";

export default defineConfig({
    root: "./playground",
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: {
                main: resolve(__dirname, "src/components/index.ts"),
            },
            name: "MGoogleMapVue3",
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                dir: resolve(__dirname, "dist"),
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});