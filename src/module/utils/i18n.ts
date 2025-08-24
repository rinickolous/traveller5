export default class i18n {
	static localize(stringId: string): string {
		if (!game.i18n) {
			console.warn(
				`i18n.localize | No i18n system found, returning stringId: ${stringId}`
			);
			return stringId;
		}
		return game.i18n.localize(stringId);
	}

	/* ---------------------------------------- */

	static format(stringId: string, data?: Record<string, string>): string {
		if (!game.i18n) {
			console.warn(
				`i18n.format | No i18n system found, returning stringId: ${stringId}`
			);
			return stringId;
		}
		return game.i18n.format(stringId, data);
	}

	/* ---------------------------------------- */

	static exists(key: string): boolean {
		if (!game.i18n) {
			return false;
		}
		return game.i18n.has(key);
	}
}
