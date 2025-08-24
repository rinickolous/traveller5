import { CHARACTERISTICS } from "@const";
import fields = foundry.data.fields;

/* ---------------------------------------- */

class Characteristics extends foundry.abstract
	.DataModel<CharacteristicsSchema> {
	static override defineSchema(): CharacteristicsSchema {
		return characteristicsSchema();
	}

	/* ---------------------------------------- */

	get(type: CHARACTERISTICS): Characteristic | null {
		switch (type) {
			case CHARACTERISTICS.Strength:
				return this.c1;
			case CHARACTERISTICS.Dexterity:
				return this.c2;
			case CHARACTERISTICS.Agility:
				return this.c2;
			case CHARACTERISTICS.Grace:
				return this.c2;
			case CHARACTERISTICS.Endurance:
				return this.c3;
			case CHARACTERISTICS.Stamina:
				return this.c3;
			case CHARACTERISTICS.Vigor:
				return this.c3;
			case CHARACTERISTICS.Intelligence:
				return this.c4;
			case CHARACTERISTICS.Education:
				return this.c5;
			case CHARACTERISTICS.Training:
				return this.c5;
			case CHARACTERISTICS.Instinct:
				return this.c5;
			case CHARACTERISTICS.SocialStanding:
				return this.c6;
			case CHARACTERISTICS.Charisma:
				return this.c6;
			case CHARACTERISTICS.Caste:
				return this.c6;
			case CHARACTERISTICS.Sanity:
				return this.cs;
			case CHARACTERISTICS.Psionics:
				return this.cp;
			default:
				tu.Logger.warn("Unknown characteristic type:" + type);
				return null;
		}
	}

	get upp(): string {
		return `${this.c1.toString()}${this.c2.toString()}${this.c3.toString()}${this.c4.toString()}${this.c5.toString()}${this.c6.toString()}`;
	}
}

/* ---------------------------------------- */

const characteristicsSchema = () => {
	return {
		c1: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Strength },
		}),
		c2: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Dexterity },
		}),
		c3: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Endurance },
		}),
		c4: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Intelligence },
		}),
		c5: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Education },
		}),
		c6: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.SocialStanding },
		}),
		cs: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Sanity },
		}),
		cp: new fields.EmbeddedDataField(Characteristic, {
			initial: { type: CHARACTERISTICS.Psionics },
		}),
	};
};

type CharacteristicsSchema = ReturnType<typeof characteristicsSchema>;

/* ---------------------------------------- */

class Characteristic extends foundry.abstract.DataModel<CharacteristicSchema> {
	static override defineSchema(): CharacteristicSchema {
		return characteristicSchema();
	}

	/* ---------------------------------------- */

	get isGenetic(): boolean {
		return [
			CHARACTERISTICS.Strength,
			CHARACTERISTICS.Dexterity,
			CHARACTERISTICS.Agility,
			CHARACTERISTICS.Grace,
			CHARACTERISTICS.Endurance,
			CHARACTERISTICS.Vigor,
			CHARACTERISTICS.Stamina,
			CHARACTERISTICS.Intelligence,
		].includes(this.type as CHARACTERISTICS);
	}

	/* ---------------------------------------- */

	get isPhysical(): boolean {
		return [
			CHARACTERISTICS.Strength,
			CHARACTERISTICS.Dexterity,
			CHARACTERISTICS.Agility,
			CHARACTERISTICS.Grace,
			CHARACTERISTICS.Endurance,
			CHARACTERISTICS.Vigor,
			CHARACTERISTICS.Stamina,
		].includes(this.type as CHARACTERISTICS);
	}

	/* ---------------------------------------- */

	get symbol(): string {
		switch (this.type) {
			case CHARACTERISTICS.Strength:
				return "S";
			case CHARACTERISTICS.Dexterity:
				return "D";
			case CHARACTERISTICS.Agility:
				return "A";
			case CHARACTERISTICS.Grace:
				return "G";
			case CHARACTERISTICS.Endurance:
				return "E";
			case CHARACTERISTICS.Stamina:
				return "S";
			case CHARACTERISTICS.Vigor:
				return "V";
			case CHARACTERISTICS.Intelligence:
				return "I";
			case CHARACTERISTICS.Education:
				return "E";
			case CHARACTERISTICS.Training:
				return "T";
			case CHARACTERISTICS.Instinct:
				return "I";
			case CHARACTERISTICS.SocialStanding:
				return "S";
			case CHARACTERISTICS.Charisma:
				return "C";
			case CHARACTERISTICS.Caste:
				return "C";
			case CHARACTERISTICS.Sanity:
				return "S";
			case CHARACTERISTICS.Psionics:
				return "P";
			default:
				tu.Logger.warn("Unknown characteristic type: " + this.type);
				return "?";
		}
	}

	/* ---------------------------------------- */

	toString(): string {
		if (!this.isGenerated) return "?";
		if (this.isKnown || game.user?.isGM)
			return traveller.utils.eHex.fromNumber(this.max);
		return "?";
	}

	current(): number {
		if (!this.isGenerated) return 0;
		if (!(this.isKnown || game.user?.isGM)) return 0;
		if (!this.isPhysical) return this.max ?? 0;

		return (this.max ?? 0) - (this.damage ?? 0);
	}
}

/* ---------------------------------------- */

const characteristicSchema = () => {
	return {
		type: new fields.StringField({
			required: true,
			nullable: false,
			choices: CHARACTERISTICS,
		}),
		formula: new fields.StringField({
			required: true,
			nullable: false,
			initial: "2d6",
		}),
		genetic: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		original: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		max: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		damage: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		isGenerated: new fields.BooleanField({
			required: true,
			nullable: false,
			initial: false,
		}),
		isKnown: new fields.BooleanField({
			required: true,
			nullable: false,
			initial: true,
		}),
	};
};

type CharacteristicSchema = ReturnType<typeof characteristicSchema>;

/* ---------------------------------------- */

export { Characteristic, Characteristics };
