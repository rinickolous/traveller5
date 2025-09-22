import { CHARACTERISTICS } from "@const";
import { AnyObject } from "fvtt-types/utils";
import fields = foundry.data.fields;

/* ---------------------------------------- */

class Characteristics extends foundry.abstract.DataModel<CharacteristicsSchema, t5.data.Actor.CharacterModel> {
	static override defineSchema(): CharacteristicsSchema {
		return characteristicsSchema();
	}

	/* ---------------------------------------- */

	get actor(): t5.data.Actor.CharacterModel | null {
		return this.parent;
	}

	/* ---------------------------------------- */
	/*   Data Preparation                       */
	/* ---------------------------------------- */

	protected static _defaultTypeForFieldName(fieldName: keyof CharacteristicsSchema): CHARACTERISTICS {
		return Object.entries(traveller.config.characteristicTypes).find(
			([, value]) => value.position === fieldName && value.default
		)![0] as CHARACTERISTICS;
	}

	/* ---------------------------------------- */

	protected override _initialize(options?: foundry.abstract.DataModel.InitializeOptions & AnyObject): void {
		super._initialize(options);
		this._initializeType();
	}

	/* ---------------------------------------- */

	protected _initializeType(): void {
		const schema = (this.constructor as typeof Characteristics).schema;
		const species = this.actor?.species;
		if (!species) {
			tu.Logger.warn(
				`Characteristic has no parent actor or actor has no species. Falling back to default Characteristic types.`
			);
			for (const fieldName of Object.keys(schema.fields) as (keyof CharacteristicsSchema)[]) {
				this[fieldName].type = Characteristics._defaultTypeForFieldName(fieldName);
			}
			return;
		}

		for (const fieldName of Object.keys(schema.fields) as (keyof CharacteristicsSchema)[]) {
			this[fieldName].type = species.system.characteristics[fieldName]?.type as CHARACTERISTICS;
		}
	}

	/* ---------------------------------------- */

	get(type: CHARACTERISTICS): Characteristic | null {
		const key = traveller.config.characteristicTypes[type];
		return this[key.position];
	}

	get upp(): string {
		return `${this.c1.toString()}${this.c2.toString()}${this.c3.toString()}${this.c4.toString()}${this.c5.toString()}${this.c6.toString()}`;
	}
}

/* ---------------------------------------- */

const characteristicsSchema = () => {
	return {
		c1: new fields.EmbeddedDataField(Characteristic),
		c2: new fields.EmbeddedDataField(Characteristic),
		c3: new fields.EmbeddedDataField(Characteristic),
		c4: new fields.EmbeddedDataField(Characteristic),
		c5: new fields.EmbeddedDataField(Characteristic),
		c6: new fields.EmbeddedDataField(Characteristic),
		cs: new fields.EmbeddedDataField(Characteristic),
		cp: new fields.EmbeddedDataField(Characteristic),
	};
};

type CharacteristicsSchema = ReturnType<typeof characteristicsSchema>;

/* ---------------------------------------- */

class Characteristic extends foundry.abstract.DataModel<CharacteristicSchema, Characteristics> {
	declare type: CHARACTERISTICS;

	static override defineSchema(): CharacteristicSchema {
		return characteristicSchema();
	}

	/* ---------------------------------------- */

	get actor(): t5.data.Actor.CharacterModel | null {
		return this.parent?.parent;
	}

	/* ---------------------------------------- */

	/* ---------------------------------------- */

	get isGenetic(): boolean {
		return traveller.config.characteristicTypes[this.type]?.genetic ?? false;
	}

	/* ---------------------------------------- */

	get isPhysical(): boolean {
		return traveller.config.characteristicTypes[this.type]?.physical ?? false;
	}

	/* ---------------------------------------- */

	get name(): string {
		return tu.i18n.localize(`TRAVELLER.CHARACTERISTICS.${this.type}.Name`);
	}

	/* ---------------------------------------- */

	get abbreviation(): string {
		return tu.i18n.localize(`TRAVELLER.CHARACTERISTICS.${this.type}.Abbreviation`);
	}

	/* ---------------------------------------- */

	get symbol(): string {
		return tu.i18n.localize(`TRAVELLER.CHARACTERISTICS.${this.type}.Symbol`);
	}

	/* ---------------------------------------- */

	toString(): string {
		return traveller.utils.eHex.fromNumber(this.value);
	}

	current(): number {
		if (!this.isPhysical) return this.value ?? 0;

		return (this.value ?? 0) - (this.damage ?? 0);
	}
}

/* ---------------------------------------- */

const characteristicSchema = () => {
	return {
		// type: new fields.StringField({ required: true, nullable: false }),
		geneticValue: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		originalValue: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
		value: new traveller.data.fields.EHexField({
			required: true,
			nullable: true,
			initial: 7,
		}),
		damage: new fields.NumberField({
			required: true,
			nullable: true,
			initial: null,
		}),
	};
};

type CharacteristicSchema = ReturnType<typeof characteristicSchema>;

/* ---------------------------------------- */

export { Characteristic, Characteristics };
