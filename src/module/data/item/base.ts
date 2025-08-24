import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseItemModel {
	/** The metadata for the BaseItemModel */
	export interface MetaData {
		/** The expected 'type' value for this model */
		type: Item.SubType;
		/** Actor types that this item cannot be placed on */
		invalidActorTypes: string[];
		/** Record of document names of pseudo-documents and the path to the collection. */
		embedded: Record<string, string>;
	}
}

/* ---------------------------------------- */

class BaseItemModel<
	Schema extends fields.DataSchema = fields.DataSchema,
> extends foundry.abstract.TypeDataModel<Schema, Item.Implementation> {
	/* ---------------------------------------- */

	static metadata: BaseItemModel.MetaData = {
		type: "base",
		invalidActorTypes: [],
		embedded: {},
	};

	get metadata(): BaseItemModel.MetaData {
		return (this.constructor as typeof BaseItemModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends Item.SubType>(
		...types: SubType[]
	): this is Item.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Item.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseItemModel };
