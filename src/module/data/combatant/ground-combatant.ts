import { BaseCombatantModel } from "./base.ts";
import fields = foundry.data.fields;

class GroundCombatantModel extends BaseCombatantModel<GroundCombatantSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatantModel.Metadata {
		return {
			...super.metadata,
			type: traveller.CONST.COMBATANT_TYPES.GROUND,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): GroundCombatantSchema {
		return groundCombatantSchema();
	}
}

/* ---------------------------------------- */

const groundCombatantSchema = () => {
	return {};
};

/* ---------------------------------------- */

type GroundCombatantSchema = ReturnType<typeof groundCombatantSchema>;

export { GroundCombatantModel };
