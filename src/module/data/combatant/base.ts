import { T5SystemModel } from "@data/system-model.ts";
import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseCombatantModel {
	/** The metadata for the BaseCombatantModel */
	export interface Metadata extends T5SystemModel.Metadata {
		/** The registered document subtype */
		type: Combatant.SubType;
	}
}

/* ---------------------------------------- */

class BaseCombatantModel<Schema extends fields.DataSchema = fields.DataSchema> extends T5SystemModel<
	Schema,
	Combatant.Implementation
> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatantModel.Metadata {
		return super.metadata as BaseCombatantModel.Metadata;
	}

	get metadata(): BaseCombatantModel.Metadata {
		return (this.constructor as typeof BaseCombatantModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends Combatant.SubType>(...types: SubType[]): this is Combatant.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Combatant.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseCombatantModel };
