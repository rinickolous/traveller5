type sizeInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "R" | "T";
type sizeDecimal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type validSize = `${sizeInteger}.${sizeDecimal}`;

type FixedNumberArraySize10 = [number, number, number, number, number, number, number, number, number, number];

const mm = 0.001;

/* ---------------------------------------- */

const baseValues: Record<sizeInteger, number> = {
	0: 0,
	R: 0.001,
	T: 0.002,
	1: 0.007,
	2: 0.075,
	3: 0.2,
	4: 0.75,
	5: 1.5,
	6: 7.5,
	7: 75,
	8: 750,
	9: 7500,
};

const meterConversions: Record<sizeInteger, FixedNumberArraySize10> = {
	0: [0, 0.1 * mm, 0.2 * mm, 0.3 * mm, 0.4 * mm, 0.5 * mm, 0.6 * mm, 0.7 * mm, 0.8 * mm, 0.9 * mm],
	R: [1 * mm, 1.1 * mm, 1.2 * mm, 1.3 * mm, 1.4 * mm, 1.5 * mm, 1.6 * mm, 1.7 * mm, 1.8 * mm, 1.9 * mm],
	T: [2 * mm, 2.5 * mm, 3 * mm, 3.5 * mm, 4 * mm, 4.5 * mm, 5 * mm, 5.5 * mm, 6 * mm, 6.5 * mm],
	1: [7 * mm, 15 * mm, 20 * mm, 30 * mm, 35 * mm, 40 * mm, 50 * mm, 55 * mm, 60 * mm, 70 * mm],
	2: [0.075, 0.09, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.18, 0.19],
	3: [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7],
	4: [0.75, 0.8, 0.9, 1, 1.05, 1.1, 1.2, 1.3, 1.35, 1.4],
	5: [1.5, 1.6, 1.7, 1.8, 1.9, 2, 5, 5.5, 6, 6.5],
	6: [7.5, 15, 20, 30, 35, 40, 50, 55, 60, 70],
	7: [75, 150, 200, 300, 350, 400, 500, 550, 600, 700],
	8: [750, 1500, 2000, 3000, 3500, 4000, 5000, 5500, 6000, 7000],
	9: [7500, 15000, 20000, 30000, 35000, 40000, 50000, 55000, 60000, 70000],
};

/* ---------------------------------------- */

export function toMeters(value: validSize): number {
	if (!/^[0-9RT](\.[0.9])?$/.test(value)) {
		throw Error(`Not a valid size: ${value} `);
	}
	const integerValue = value[0] as sizeInteger;
	const decimalValue: sizeDecimal = value.length === 3 ? (parseInt(value[2]) as sizeDecimal) : 0;
	return meterConversions[integerValue][decimalValue];
}

/* ---------------------------------------- */

export function fromMeters(value: number): validSize {
	if (value < 0) {
		throw Error(`Negative sizes are not valid. Size provided (meters): ${value}`);
	}
	const baseValuesEntries = Object.entries(baseValues);
	const baseIndex = baseValuesEntries[baseValuesEntries.findIndex(([_, v]) => v > value) - 1]?.[0] as
		| sizeInteger
		| undefined;
	if (!baseIndex) {
		throw Error(`Size provided is invalid. Size provided (meters): ${value}`);
	}
	const decimalRange = meterConversions[baseIndex];
	let index = 0;
	let minDifference = Math.abs(value - decimalRange[index]);

	for (; index < decimalRange.length; index++) {
		const currentDifference = Math.abs(value - decimalRange[index]);

		if (currentDifference < minDifference) {
			minDifference = currentDifference;
		} else if (decimalRange[index] > value && value >= decimalRange[index - 1]) {
			break;
		}
	}
	return `${baseIndex}.${index as sizeDecimal}`;
}
