import { BaseCombatModel } from "./base.ts";
import fields = foundry.data.fields;

class GroundCombatModel extends BaseCombatModel<GroundCombatSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatModel.Metadata {
		return {
			...super.metadata,
			type: traveller.CONST.COMBAT_TYPES.GROUND,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): GroundCombatSchema {
		return groundCombatSchema();
	}
}

/* ---------------------------------------- */

const groundCombatSchema = () => {
	return {};
};

/* ---------------------------------------- */

type GroundCombatSchema = ReturnType<typeof groundCombatSchema>;

export { GroundCombatModel };
