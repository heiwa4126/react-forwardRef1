import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite-plus";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const cfg: UserConfig = {
    plugins: [react()],
    build: {
      rolldownOptions: {
        external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
        output: {
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
            },
          },
          manualChunks(id) {
            if (
              /[\\/]node_modules[\\/](chart\.js|react-chartjs-2|@ngneat[\\/]falso)[\\/]/.test(id)
            ) {
              return "chart-vendor";
            }
          },
        },
      },
    },
  };

  return {
    staged: {
      "*": "vp check --fix",
    },
    fmt: {},
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
    ...cfg,
  };
});
