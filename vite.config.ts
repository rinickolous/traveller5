import path from "path";
import * as Vite from "vite";
import checker from "vite-plugin-checker";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tsconfigPaths from "vite-tsconfig-paths";

const config = Vite.defineConfig(({ mode }): Vite.UserConfig => {
	const buildMode = mode === "production" ? "production" : "development";

	return {
		root: ".",
		base: "",
		define: {
			BUILD_MODE: JSON.stringify(buildMode),
		},
		build: {
			outDir: "dist",
			emptyOutDir: true,
			rollupOptions: {
				input: {
					traveller5: path.resolve(__dirname, "src/traveller5.ts"),
				},
				output: {
					entryFileNames: "[name].js",
					assetFileNames: "[name].[ext]",
					format: "es",
				},
			},
			sourcemap: true,
		},
		server: {
			fs: {
				allow: ["src/templates", "src/lang", "src/assets"], // serve these folders
			},
		},
		plugins: [
			checker({ typescript: true }),
			viteStaticCopy({
				targets: [
					{ src: "src/system.json", dest: "." },
					{ src: "src/lang", dest: "." },
					{ src: "src/templates", dest: "." },
					{ src: "src/assets", dest: "." },
				],
			}),
			tsconfigPaths({ loose: true }),
		],
	};
});

export default config;
