import { T5SystemModel } from "@data/system-model.ts";
import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseCombatModel {
	/** The metadata for the BaseCombatModel */
	export interface Metadata extends T5SystemModel.Metadata {
		/** The registered document subtype */
		type: Combat.SubType;
	}
}

/* ---------------------------------------- */

class BaseCombatModel<Schema extends fields.DataSchema = fields.DataSchema> extends T5SystemModel<
	Schema,
	Combat.Implementation
> {
	/* ---------------------------------------- */

	static override get metadata(): BaseCombatModel.Metadata {
		return super.metadata as BaseCombatModel.Metadata;
	}

	get metadata(): BaseCombatModel.Metadata {
		return (this.constructor as typeof BaseCombatModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends Combat.SubType>(...types: SubType[]): this is Combat.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Combat.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseCombatModel };
