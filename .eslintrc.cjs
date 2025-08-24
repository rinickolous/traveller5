module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended", // Enables prettier integration
	],
	rules: {
		"prettier/prettier": [
			"error",
			{
				singleQuote: false,
				useTabs: true,
				printWidth: 80,
				semi: true,
				trailingComma: "es5",
				arrowParens: "always",
				endOfLine: "lf",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
		],
		"@typescript-eslint/explicit-module-boundary-types": "off",
	},
	ignorePatterns: ["dist/", "node_modules/", ".eslintrc.cjs"],
};
