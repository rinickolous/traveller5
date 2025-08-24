import fields = foundry.data.fields;
import DataModel = foundry.abstract.DataModel;
import Document = foundry.abstract.Document;

import { PseudoDocument } from "./pseudo-document.ts";

const typedPseudoDocumentSchema = (self: DataModel.AnyConstructor) => {
	return {
		// @ts-expect-error: types are too strict to allow "this"
		type: new fields.DocumentTypeField(self, {
			required: true,
			nullable: false,
		}),
	};
};

/* ---------------------------------------- */

namespace TypedPseudoDocument {
	export type Schema = ReturnType<typeof PseudoDocument.defineSchema> &
		ReturnType<typeof typedPseudoDocumentSchema>;
}

/* ---------------------------------------- */

class TypedPseudoDocument<
	Schema extends TypedPseudoDocument.Schema = TypedPseudoDocument.Schema,
	Parent extends DataModel.Any = DataModel.Any,
> extends PseudoDocument<Schema, Parent> {
	static override defineSchema() {
		return Object.assign(
			super.defineSchema(),
			typedPseudoDocumentSchema(this)
		);
	}

	/* ---------------------------------------- */

	/**
	 * The type of this pseudo-document subclass.
	 * @abstract
	 */
	static get TYPE(): string {
		return "";
	}

	/* ---------------------------------------- */

	/**
	 * The subtypes of this pseudo-document.
	 */
	static get TYPES(): Record<string, typeof TypedPseudoDocument> {
		return Object.values(
			(traveller.CONFIG as any)[this.metadata.documentName] as Record<
				string,
				{ documentClass: typeof TypedPseudoDocument }
			>
		).reduce(
			(
				acc: Record<string, typeof TypedPseudoDocument>,
				{ documentClass }
			) => {
				if (documentClass.TYPE) acc[documentClass.TYPE] = documentClass;
				return acc;
			},
			{}
		);
	}

	/* ---------------------------------------- */

	/**
	 * The localized label for this typed pseudodocument's type.
	 */
	get typeLabel(): string {
		return (traveller.CONFIG as any)[this.metadata.documentName][this.type]
			.label;
	}

	/* ---------------------------------------- */

	static override async create<
		Schema extends TypedPseudoDocument.Schema = TypedPseudoDocument.Schema,
	>(
		data: DataModel.CreateData<Schema>,
		{
			parent,
			...operation
		}: Partial<foundry.abstract.types.DatabaseCreateOperation>
	): Promise<Document.Any | undefined> {
		data = foundry.utils.deepClone(data);
		// @ts-expect-error: Types currently broken
		if (!data.type) data.type = Object.keys(this.TYPES)[0];
		// @ts-expect-error: Types currently broken
		if (!data.type || !(data.type in this.TYPES)) {
			throw new Error(
				// @ts-expect-error: Types currently broken
				`The '${data.type}' type is not a valid type for a '${this.metadata.documentName}' pseudo-document!`
			);
		}
		return super.create(data, { parent, ...operation });
	}
}

export { TypedPseudoDocument };
