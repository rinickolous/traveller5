import { BaseCombatModel } from "./base.ts";
import fields = foundry.data.fields;

class SpaceCombatModel extends BaseCombatModel<SpaceCombatSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatModel.Metadata {
		return {
			...super.metadata,
			type: traveller.CONST.COMBAT_TYPES.SPACE,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): SpaceCombatSchema {
		return spaceCombatSchema();
	}

	/* ---------------------------------------- */

	getPairKey(id1: string, id2: string): string {
		return [id1, id2].sort().join("-");
	}

	/* ---------------------------------------- */

	getRangesFor(combatantId: string): Record<string, number> {
		return Object.entries(this.ranges).reduce((acc: Record<string, number>, [key, value]) => {
			if (!key.includes(combatantId)) return acc;
			const newKey = key.replace(combatantId, "").replace("-", "");
			acc[newKey] = value;
			return acc;
		}, {});
	}
}

/* ---------------------------------------- */

const spaceCombatSchema = () => {
	return {
		// A Record<string, number> mapping relations between combatants to their relative range.
		// Range is expressed in Space Combat Range Bands (T5.10 2 p. 200).
		// Value "0" means "Boarding" (S= B, R= 5), while "-1" means Range 0 (S= 0, R= 0).
		ranges: new fields.TypedObjectField(
			new fields.NumberField({ required: true, nullable: false, default: 1, min: -1, max: 13, integer: true })
		),
	};
};

/* ---------------------------------------- */

type SpaceCombatSchema = ReturnType<typeof spaceCombatSchema>;

export { SpaceCombatModel };
