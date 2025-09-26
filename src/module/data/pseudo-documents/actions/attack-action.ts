import { ACTION_TYPES, DAMAGE_TYPES } from "@const";
import { localizeEnum } from "@utils/misc";
import { PseudoDocument } from "../pseudo-document.ts";
import { BaseAction } from "./base-action.ts";
import fields = foundry.data.fields;

const attackActionSchema = () => {
	return {
		damage: new fields.NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 0 }),
		damageType: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(DAMAGE_TYPES, "TRAVELLER.DAMAGE.Type", "Name"),
			initial: DAMAGE_TYPES.Pen,
		}),
	};
};

type AttackActionSchema = BaseAction.Schema & ReturnType<typeof attackActionSchema>;

/* ---------------------------------------- */

class AttackAction extends BaseAction<AttackActionSchema> {
	/* ---------------------------------------- */

	static override defineSchema() {
		return Object.assign(super.defineSchema(), attackActionSchema());
	}

	/* ---------------------------------------- */

	static override get metadata(): PseudoDocument.Metadata {
		return {
			...super.metadata,
			sheetClass: traveller.applications.sheets.pseudoDocuments.action.AttackSheet,
		};
	}

	/* ---------------------------------------- */

	static override LOCALIZATION_PREFIXES = super.LOCALIZATION_PREFIXES.concat("TRAVELLER.ACTION.attack");

	/* ---------------------------------------- */

	static get TYPE(): string {
		return ACTION_TYPES.ATTACK;
	}

	/* ---------------------------------------- */

	get damageText(): string {
		return `${this.damageType}-${this.damage}`;
	}
}

/* ---------------------------------------- */

export { AttackAction };
