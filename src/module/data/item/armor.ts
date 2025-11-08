import {
	ARMOR_BURDEN,
	ARMOR_DESCRIPTOR,
	ARMOR_DESCRIPTOR_SUIT,
	ARMOR_TYPES,
	ARMOR_USER,
	EQUIPMENT_STAGE,
	ITEM_TYPES,
} from "@const";
import { requiredInteger } from "@data/helpers.ts";
import { EquipmentModel, EquipmentSchema } from "./equipment.ts";
import fields = foundry.data.fields;

class ArmorModel extends EquipmentModel<ArmorSchema> {
	/* ---------------------------------------- */

	static override get metadata(): t5.data.Item.BaseItemModel.Metadata {
		return {
			...super.metadata,
			type: ITEM_TYPES.ARMOR,
		};
	}

	/* ---------------------------------------- */

	get description(): string {
		const stage = this.stage !== EQUIPMENT_STAGE.Blank ? this.stage : "";
		const burden = this.burden !== ARMOR_BURDEN.Blank ? this.burden : "";
		const inParen = stage || burden ? `(${stage}${burden}) ` : "";

		return `${inParen}${this.descriptor}${this.type}-${this.techLevel}`;
	}

	/* ---------------------------------------- */

	/** Returns the AX: Armor Extension (omitting cost, mass, and Ax: prefix
	 *  as per example in T5.10 1 p.116) */
	get extension(): string {
		let extension = "";
		for (const [key, value] of Object.entries(this.protection)) {
			if (value > 0) extension += ` ${key}=${value}`;
		}
		return extension.trim();
	}
}

/* ---------------------------------------- */

const armorSchema = () => {
	return {
		stage: new fields.StringField({
			required: true,
			nullable: false,
			choices: EQUIPMENT_STAGE,
			initial: EQUIPMENT_STAGE.Blank,
		}),
		burden: new fields.StringField({
			required: true,
			nullable: false,
			choices: ARMOR_BURDEN,
			initial: ARMOR_BURDEN.Blank,
		}),
		descriptor: new fields.StringField({
			required: true,
			nullable: false,
			choices: ARMOR_DESCRIPTOR,
			initial: ARMOR_DESCRIPTOR_SUIT.Vacc,
		}),
		type: new fields.StringField({
			required: true,
			nullable: false,
			choices: ARMOR_TYPES,
			initial: ARMOR_TYPES.Suit,
		}),
		user: new fields.StringField({
			required: false,
			nullable: false,
			choices: ARMOR_USER,
			initial: ARMOR_USER.Blank,
		}),
		techLevel: new fields.NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 11 }),

		protection: new fields.SchemaField({
			armor: requiredInteger(),
			cage: requiredInteger(),
			flashProof: requiredInteger(),
			radProof: requiredInteger(),
			soundProof: requiredInteger(),
			psiShield: requiredInteger(),
			insulated: requiredInteger(),
			sealed: requiredInteger(),
		}),
	};
};

type ArmorSchema = ReturnType<typeof armorSchema> & EquipmentSchema;

/* ---------------------------------------- */

export { ArmorModel };
