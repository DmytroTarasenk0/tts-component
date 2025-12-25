import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/TextToSpeech.jsx"),
      name: "TextToSpeech",
      fileName: (format) => `text-to-speech.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "mammoth", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          mammoth: "mammoth",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
