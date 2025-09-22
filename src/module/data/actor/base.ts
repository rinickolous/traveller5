import { T5SystemModel } from "@data/system-model.ts";
import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseActorModel {
	/** The metadata for the BaseActorModel */
	export interface Metadata extends T5SystemModel.Metadata {
		/** The registered document subtype */
		type: Actor.SubType;
	}
}

/* ---------------------------------------- */

class BaseActorModel<Schema extends fields.DataSchema = fields.DataSchema> extends T5SystemModel<
	Schema,
	Actor.Implementation
> {
	/* ---------------------------------------- */

	static override get metadata(): BaseActorModel.Metadata {
		return super.metadata as BaseActorModel.Metadata;
	}

	get metadata(): BaseActorModel.Metadata {
		return (this.constructor as typeof BaseActorModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends Actor.SubType>(...types: SubType[]): this is Actor.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as Actor.SubType);
	}

	/* ---------------------------------------- */
	/*  Data Preparation                        */
	/* ---------------------------------------- */

	/**
	 * Data preparation steps to perform after Item data has been prepared, but before Active Effects are applied.
	 */
	prepareEmbeddedData(): void {}
}

/* ---------------------------------------- */

export { BaseActorModel };
