export function localizeEnum<T extends Record<string, string | number>>(
	enumObj: T,
	prefix: string,
	suffix?: string
): Record<string | number, string> {
	const result: Record<string | number, string> = {};
	for (const [_, value] of Object.entries(enumObj)) {
		if (typeof value === "string" || typeof value === "number") {
			result[value] = `${prefix}.${value}${suffix ? "." + suffix : ""}`;
		}
	}
	return result;
}
