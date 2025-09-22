namespace T5SystemModel {
	export interface Metadata {
		/** The registered document subtype */
		type: string;
		/** Record of document names of pseudo-documents and the path to their respective collections */
		embedded: Record<string, string>;
	}
}

/* ---------------------------------------- */

class T5SystemModel<
	Schema extends foundry.data.fields.DataSchema,
	Parent extends foundry.abstract.Document.Any,
> extends foundry.abstract.TypeDataModel<Schema, Parent> {
	/**
	 * Metadta for this document subtype.
	 */
	static get metadata(): T5SystemModel.Metadata {
		return {
			embedded: {},
		} as unknown as T5SystemModel.Metadata;
	}

	get metadata(): T5SystemModel.Metadata {
		return (this.constructor as typeof T5SystemModel).metadata;
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { T5SystemModel };
