import { T5SystemModel } from "@data/system-model.ts";
import { AnyMutableObject } from "fvtt-types/utils";
import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseItemModel {
	/** The metadata for the BaseActorModel */
	export interface Metadata extends T5SystemModel.Metadata {
		/** The registered document subtype */
		type: Item.SubType;
		/** Actor types that this item cannot be placed on */
		invalidActorTypes: string[];
		/** Is this item type limited to one instance per actor? */
		singleton: boolean;
		/** Are there any partials to fill in the Details tab of the item? */
		detailsPartial?: string[];
	}
}

/* ---------------------------------------- */

class BaseItemModel<Schema extends fields.DataSchema = fields.DataSchema> extends T5SystemModel<
	Schema,
	Item.Implementation
> {
	/* ---------------------------------------- */

	static override get metadata(): BaseItemModel.Metadata {
		return {
			type: "base",
			invalidActorTypes: [],
			embedded: {},
			singleton: false,
		};
	}

	/* ---------------------------------------- */

	get metadata(): BaseItemModel.Metadata {
		return (this.constructor as typeof BaseItemModel).metadata;
	}

	/* ---------------------------------------- */

	async getSheetContext(_context: AnyMutableObject): Promise<void> {}

	/* ---------------------------------------- */

	isOfType<SubType extends Item.SubType>(...types: SubType[]): this is Item.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Item.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseItemModel };
