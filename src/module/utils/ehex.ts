const EHEX: Record<string, number> = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
	G: 16,
	H: 17,
	J: 18,
	K: 19,
	L: 20,
	M: 21,
	N: 22,
	P: 23,
	Q: 24,
	R: 25,
	S: 26,
	T: 27,
	U: 28,
	V: 29,
	W: 30,
	X: 31,
	Y: 32,
	Z: 33,
} as const;

/* ---------------------------------------- */

export function fromNumber(value: string | number | null): string {
	if (typeof value === "number") {
		if (value < 0 || value > 33) return "?";
		return Object.keys(EHEX).find((key) => EHEX[key] === value) || "";
	} else if (typeof value === "string") {
		value = value.toUpperCase();
		return EHEX[value] !== undefined ? value : "";
	}
	return "?";
}

/* ---------------------------------------- */

export function toNumber(value: string): number | null {
	if (typeof value !== "string") return null;
	value = value.toUpperCase();
	if (value.length !== 1 || !(value in EHEX)) return null;
	return EHEX[value];
}
