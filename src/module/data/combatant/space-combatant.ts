import { BaseCombatantModel } from "./base.ts";
import fields = foundry.data.fields;

class SpaceCombatantModel extends BaseCombatantModel<SpaceCombatantSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatantModel.Metadata {
		return {
			...super.metadata,
			type: traveller.CONST.COMBATANT_TYPES.SPACE,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): SpaceCombatantSchema {
		return spaceCombatantSchema();
	}
}

/* ---------------------------------------- */

const spaceCombatantSchema = () => {
	return {
		// A Record<string, boolean> mapping other combatant IDs to whether they are visible to this combatant
		visibility: new fields.TypedObjectField(
			new fields.BooleanField({ required: true, nullable: false, default: false })
		),
	};
};

/* ---------------------------------------- */

type SpaceCombatantSchema = ReturnType<typeof spaceCombatantSchema>;

export { SpaceCombatantModel };
