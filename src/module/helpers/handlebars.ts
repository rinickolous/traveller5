function print(input: string) {
	console.log(input);
}

/* ---------------------------------------- */

function ehex(input: number): string {
	return tu.eHex.fromNumber(input);
}

/* ---------------------------------------- */

export function registerHandlebars() {
	Handlebars.registerHelper("print", print);
	Handlebars.registerHelper("ehex", ehex);
}
