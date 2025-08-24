import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseActorModel {
	/** The metadata for the BaseActorModel */
	export interface MetaData {
		/** The expected 'type' value for this model */
		type: Actor.SubType;
	}
}

/* ---------------------------------------- */

class BaseActorModel<
	Schema extends fields.DataSchema = fields.DataSchema,
> extends foundry.abstract.TypeDataModel<Schema, Actor.Implementation> {
	/* ---------------------------------------- */

	static metadata: BaseActorModel.MetaData = {
		type: "base",
	};

	get metadata(): BaseActorModel.MetaData {
		return (this.constructor as typeof BaseActorModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends Actor.SubType>(
		...types: SubType[]
	): this is Actor.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Actor.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseActorModel };
