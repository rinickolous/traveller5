import fields = foundry.data.fields;
import DataModel = foundry.abstract.DataModel;
import Document = foundry.abstract.Document;

import { PSEUDO_DOCUMENT_NAMES, systemPath } from "@const";
import { GetKey } from "fvtt-types/utils";
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
	export type Schema = ReturnType<typeof PseudoDocument.defineSchema> & ReturnType<typeof typedPseudoDocumentSchema>;

	/* ---------------------------------------- */

	export type Name = PSEUDO_DOCUMENT_NAMES;

	/* ---------------------------------------- */

	export type SubTypesOf<_Name extends Name> = string & keyof TravellerConfig[_Name];

	/* ---------------------------------------- */

	export type OfType<_Name extends Name, SubType extends string> =
		GetKey<TravellerConfig, _Name, {}> extends Record<string, { documentClass: new (...args: any) => infer Model }>
			? SubType extends keyof GetKey<TravellerConfig, _Name, {}>
				? Model
				: never
			: never;
}

/* ---------------------------------------- */

class TypedPseudoDocument<
	Schema extends TypedPseudoDocument.Schema = TypedPseudoDocument.Schema,
	Parent extends DataModel.Any = DataModel.Any,
> extends PseudoDocument<Schema, Parent> {
	static override defineSchema() {
		return Object.assign(super.defineSchema(), typedPseudoDocumentSchema(this));
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
			(traveller.config as any)[this.metadata.documentName] as Record<
				string,
				{ documentClass: typeof TypedPseudoDocument }
			>
		).reduce((acc: Record<string, typeof TypedPseudoDocument>, { documentClass }) => {
			if (documentClass.TYPE) acc[documentClass.TYPE] = documentClass;
			return acc;
		}, {});
	}

	/* ---------------------------------------- */

	static override CREATE_TEMPLATE = systemPath("templates/sheets/pseudo-documents/typed-create-dialog.hbs");

	/* ---------------------------------------- */

	/**
	 * The localized label for this typed pseudodocument's type.
	 */
	get typeLabel(): string {
		return (traveller.config as any)[this.metadata.documentName][this.type].label;
	}

	/* ---------------------------------------- */

	static override async create<Schema extends TypedPseudoDocument.Schema = TypedPseudoDocument.Schema>(
		data: DataModel.CreateData<Schema>,
		{ parent, ...operation }: Partial<foundry.abstract.types.DatabaseCreateOperation>
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

	/* ---------------------------------------- */

	protected static override _prepareCreateDialogContext(_parent: foundry.abstract.Document.Any | undefined) {
		const typeOptions = Object.entries(traveller.config[this.metadata.documentName as PSEUDO_DOCUMENT_NAMES]).map(
			([value, { label }]) => ({ value, label })
		);

		return {
			typeOptions,
			fields: this.schema.fields,
		};
	}
}

export { TypedPseudoDocument };
