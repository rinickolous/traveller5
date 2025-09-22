import { ACTION_TYPES, DAMAGE_TYPES } from "@const";
import { BaseAction } from "./base-action.ts";
import fields = foundry.data.fields;

const attackActionSchema = () => {
	return {
		name: new fields.StringField({ required: true, nullable: false }),
		damage: new fields.NumberField({ required: true, nullable: false, integer: true, min: 0, initial: 0 }),
		damageType: new fields.StringField({ required: true, nullable: false, choices: DAMAGE_TYPES }),
	};
};

type AttackActionSchema = BaseAction.Schema & ReturnType<typeof attackActionSchema>;

/* ---------------------------------------- */

/* ---------------------------------------- */

class AttackAction extends BaseAction<AttackActionSchema> {
	static override defineSchema() {
		return Object.assign(super.defineSchema(), attackActionSchema());
	}

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
