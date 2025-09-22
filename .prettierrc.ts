import type { Config } from "prettier";

const config: Config = {
	singleQuote: false, // Use double quotes
	useTabs: true, // Use tabs instead of spaces
	tabWidth: 4, // This is ignored when useTabs = true
	printWidth: 120, // 120 character line width
	semi: true, // Always add semicolons
	trailingComma: "es5", // Consistent trailing commas where valid in ES5
	arrowParens: "always", // Always wrap arrow function params
	endOfLine: "lf", // Normalize to LF
	plugins: [
		"@trivago/prettier-plugin-sort-imports",
		"prettier-plugin-packagejson",
		"prettier-plugin-organize-imports",
	],
	importOrder: [
		"^@foundry/.*$", // Foundry-specific packages (if you have any namespaced)
		"^@?\\w", // External packages
		"^\\.\\.(?!/?$)", // Parent imports
		"^\\./(?!/?$)", // Same-folder imports
		"^\\./?$", // Index file
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};

export default config;
