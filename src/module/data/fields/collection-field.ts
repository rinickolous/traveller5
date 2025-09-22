import { PseudoDocument } from "@data/pseudo-documents/pseudo-document.ts";
import ModelCollection from "@utils/model-collection";
import { AnyObject } from "fvtt-types/utils";
import { LazyTypedSchemaField } from "./lazy-typed-schema-field.ts";
import fields = foundry.data.fields;

declare abstract class AnyPseudoDocument extends PseudoDocument<any, any> {
	constructor(...args: never);
}

namespace CollectionField {
	export type Model = typeof AnyPseudoDocument;

	/* ---------------------------------------- */

	export type Element<_Model extends CollectionField.Model> =
		_Model extends t5.data.pseudoDocuments.TypedPseudoDocument
			? LazyTypedSchemaField<Record<string, typeof t5.data.pseudoDocuments.TypedPseudoDocument>>
			: fields.EmbeddedDataField<_Model>;

	/* ---------------------------------------- */

	export type Options = fields.TypedObjectField.Options<AnyObject>;

	export type DefaultOptions = fields.TypedObjectField.DefaultOptions;

	/* ---------------------------------------- */

	export type AssignmentType<
		_Model extends CollectionField.Model,
		_Options extends CollectionField.Options,
	> = fields.TypedObjectField.AssignmentType<Element<_Model>, _Options>;

	/* ---------------------------------------- */

	export type InitializedType<
		_Model extends foundry.abstract.DataModel.AnyConstructor,
		_Options extends Options,
	> = fields.DataField.DerivedInitializedType<
		ModelCollection<InstanceType<_Model>>,
		fields.TypedObjectField.MergedOptions<_Options>
	>;
}

/* ---------------------------------------- */

class CollectionField<
	const Model extends CollectionField.Model,
	const Element extends CollectionField.Element<Model> = CollectionField.Element<Model>,
	const Options extends CollectionField.Options = CollectionField.DefaultOptions,
	const AssignmentType extends CollectionField.AssignmentType<Model, Options> = CollectionField.AssignmentType<
		Model,
		Options
	>,
	const InitializedType extends CollectionField.InitializedType<Model, Options> = CollectionField.InitializedType<
		Model,
		Options
	>,
	const PersistedType extends AnyObject | null | undefined = fields.TypedObjectField.InitializedType<
		Element,
		Options
	>,
> extends fields.TypedObjectField<Element, Options, AssignmentType, InitializedType, PersistedType> {
	#documentClass: Model;

	get documentClass(): Model {
		return this.#documentClass;
	}

	/* ---------------------------------------- */

	constructor(
		model: Model,
		options: fields.TypedObjectField.Options<Element> = {},
		context: fields.DataField.ConstructionContext = {}
	) {
		let field = foundry.utils.isSubclass(model, traveller.data.pseudoDocuments.TypedPseudoDocument)
			? new LazyTypedSchemaField(model.TYPES)
			: new fields.EmbeddedDataField(model);
		options.validateKey ||= (key: string) => foundry.data.validators.isValidId(key);

		// @ts-expect-error: This is fine.
		super(field, options, context);
		this.#documentClass = model;
	}

	/* ---------------------------------------- */

	override initialize(
		value: PersistedType,
		model: InstanceType<Model>,
		options: fields.DataField.InitializeOptions = {}
	): InitializedType | (() => InitializedType | null) {
		const collection = new ModelCollection();
		(options as any).collection = collection;
		const init = super.initialize(value, model, options);

		for (const [id, model] of Object.entries(init as Record<string, InstanceType<Model> | object>)) {
			if (model instanceof traveller.data.pseudoDocuments.PseudoDocument) {
				collection.set(id, model);
			} else {
				collection.setInvalid(model as object);
			}
		}
		collection.documentClass = this.documentClass as unknown as typeof PseudoDocument;
		return collection as InitializedType;
	}
}

/* ---------------------------------------- */

export { CollectionField };
