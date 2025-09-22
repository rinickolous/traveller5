import { SimpleMerge } from "fvtt-types/utils";
import fields = foundry.data.fields;
import Document = foundry.abstract.Document;

declare namespace LocalDocumentField {
	interface Options extends fields.StringField.Options<string | Document.Any> {
		idOnly?: boolean;
		fallback?: boolean;
	}

	/* ---------------------------------------- */

	type DefaultOptions = SimpleMerge<
		fields.DocumentIdField.DefaultOptions,
		{
			nullable: true;
			readonly: false;
			idOnly: false;
		}
	>;

	/* ---------------------------------------- */

	type MergedOptions<Opts extends Options> = SimpleMerge<DefaultOptions, Opts>;

	/* ---------------------------------------- */

	type AssignmentType<
		ConcreteDocument extends Document.AnyConstructor,
		Opts extends Options,
		// eslint-disable-next-line @typescript-eslint/no-deprecated
	> = fields.DataField.DerivedAssignmentType<
		string | Document.StoredForName<ConcreteDocument["documentName"]>,
		MergedOptions<Opts>
	>;

	/* ---------------------------------------- */

	type InitializedType<
		ConcreteDocument extends Document.AnyConstructor,
		Opts extends Options,
	> = fields.DataField.DerivedInitializedType<
		Opts["idOnly"] extends true ? string : Document.StoredForName<ConcreteDocument["documentName"]>,
		MergedOptions<Opts>
	>;

	/* ---------------------------------------- */

	type PersistedType<Opts extends Options> = fields.DataField.DerivedInitializedType<string, MergedOptions<Opts>>;
}

/* ---------------------------------------- */

class LocalDocumentField<
	const DocumentType extends Document.AnyConstructor,
	const Options extends LocalDocumentField.Options = LocalDocumentField.DefaultOptions,
	const AssignmentType = LocalDocumentField.AssignmentType<DocumentType, Options>,
	const InitializedType = LocalDocumentField.InitializedType<DocumentType, Options>,
	const PersistedType extends string | null | undefined = LocalDocumentField.PersistedType<Options>,
> extends fields.DocumentIdField<Options, AssignmentType, InitializedType, PersistedType> {
	model: DocumentType;
	idOnly: boolean = false;

	/* ---------------------------------------- */

	constructor(model: DocumentType, options?: Options, context?: fields.DataField.ConstructionContext) {
		if (!foundry.utils.isSubclass(model, foundry.abstract.DataModel)) {
			throw new Error("A ForeignDocumentField must specify a DataModel subclass as its type");
		}

		super(options, context);
		this.model = model;
	}

	/* ---------------------------------------- */

	protected static override get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			nullable: true,
			readonly: false,
			idOnly: false,
			fallback: false,
		});
	}

	/* ---------------------------------------- */

	protected override _cast(value: unknown): AssignmentType {
		if (typeof value === "string") return value as AssignmentType;
		if (value instanceof this.model) return value._id as AssignmentType;
		throw new Error(`The value provided to a LocalDocumentField must be a ${this.model.name} instance.`);
	}

	/* ---------------------------------------- */

	protected override _validateType(value: InitializedType): void {
		if (!this.options.fallback) super._validateType(value);
	}

	/* ---------------------------------------- */

	protected _findCollection(
		model: foundry.abstract.DataModel.Any,
		collection: string
	): foundry.abstract.EmbeddedCollection<InstanceType<DocumentType>, Document.Any> | null {
		if (!model.parent) return null;
		try {
			return (model.parent as any).getEmbeddedCollection(collection);
		} catch (err) {
			return (model.parent as any)[collection] ?? this._findCollection(model.parent, collection);
		}
	}

	/* ---------------------------------------- */

	override initialize(
		value: PersistedType,
		model: foundry.abstract.DataModel.Any,
		_options: fields.DataField.InitializeOptions = {}
	): InitializedType | (() => InitializedType | null) {
		if (this.idOnly)
			return this.options.fallback || foundry.data.validators.isValidId(value as string)
				? (value as unknown as InitializedType)
				: () => null;

		const collection = this._findCollection(model, this.model.metadata.collection);
		return () => {
			const document = collection?.get(value ?? "");
			if (!document) return this.options.fallback ? (value as unknown as InitializedType) : null;
			if (this.options.fallback)
				Object.defineProperty(document, "toString", {
					value: () => document.name,
					configurable: true,
					enumerable: false,
				});
			return document as InitializedType;
		};
	}

	/* ---------------------------------------- */

	override toObject(value: InitializedType): PersistedType {
		// @ts-expect-error: Sometimes it's an ID, sometimes a Document
		return value?._id ?? value;
	}
}

/* ---------------------------------------- */

export { LocalDocumentField };
