import fields = foundry.data.fields;
import DataModel = foundry.abstract.DataModel;
import Document = foundry.abstract.Document;
import { AnyObject } from "fvtt-types/utils";

import { api } from "@applications";
import { T5Dialog } from "@applications/api/dialog.ts";
import { systemPath } from "@const";

const pseudoDocumentSchema = () => {
	return {
		_id: new fields.DocumentIdField({
			required: true,
			nullable: false,
			initial: () => foundry.utils.randomID(),
		}),
	};
};

/* ---------------------------------------- */

declare namespace PseudoDocument {
	export interface Metadata {
		/* The document name of this pseudo-document. */
		documentName: string;
		/** The localization string for this pseudo-document */
		label: string;
		/** The font-awesome icon for this pseudo-document type */
		icon: string;
		/* Record of document names of pseudo-documents and the path to the collection. */
		embedded: Record<string, string>;
		/* The class used to render this pseudo-document. */
		sheetClass?: typeof api.PseudoDocumentSheet<any>;
	}

	export type Schema = ReturnType<typeof pseudoDocumentSchema>;
}

/* ---------------------------------------- */

class PseudoDocument<
	Schema extends PseudoDocument.Schema = PseudoDocument.Schema,
	Parent extends DataModel.Any = DataModel.Any,
> extends DataModel<Schema, Parent> {
	/* ---------------------------------------- */

	static get metadata(): PseudoDocument.Metadata {
		return {
			// @ts-expect-error: This is always overridden
			documentName: null,
			label: "",
			icon: "",
			embedded: {},
		};
	}

	/* ---------------------------------------- */

	get metadata() {
		return (this.constructor as typeof PseudoDocument).metadata;
	}

	/* ---------------------------------------- */

	static override defineSchema(): PseudoDocument.Schema {
		return pseudoDocumentSchema();
	}

	/* ---------------------------------------- */

	static override LOCALIZATION_PREFIXES: string[] = ["TRAVELLER.PSEUDO"];

	/* ---------------------------------------- */

	static CREATE_TEMPLATE = systemPath("templates/sheets/pseudo-documents/base-create-dialog.hbs");

	/* ---------------------------------------- */

	/**
	 * The id of this pseudo-document.
	 */
	get id(): string {
		return this._id;
	}

	/* ---------------------------------------- */

	/**
	 * The document name of this pseudo document.
	 */
	get documentName(): string | null {
		return this.metadata.documentName;
	}

	/* ---------------------------------------- */

	/**
	 * The uuid of this document.
	 */
	get uuid(): string {
		let parent = this.parent;
		while (!(parent instanceof PseudoDocument) && !(parent instanceof Document)) parent = parent.parent;
		return [parent.uuid, this.documentName, this.id].join(".");
	}

	/* ---------------------------------------- */

	/**
	 * The parent document of this pseudo-document.
	 */
	get document(): Document.Any {
		let parent: DataModel.Any = this;
		while (!(parent instanceof Document)) parent = parent.parent;
		return parent;
	}

	/* ---------------------------------------- */

	get fieldPath(): string {
		const fp = this.schema.fieldPath;
		let path = fp.slice(0, fp.lastIndexOf("element") - 1);

		if (this.parent instanceof PseudoDocument) {
			path = [this.parent.fieldPath, this.parent.id, path].join(".");
		}

		return path;
	}

	/* ---------------------------------------- */

	/**
	 * Reference to the sheet of this pseudo-document, registered in a static map.
	 * A pseudo-document is temporary, unlike regular documents, so the relation here
	 * is not one-to-one.
	 * @type {api.PseudoDocumentSheet | null}
	 */
	get sheet() {
		return api.PseudoDocumentSheet.getSheet(this as PseudoDocument) || null;
	}

	/* ---------------------------------------- */
	/*   Data preparation                       */
	/* ---------------------------------------- */

	/**
	 * Prepare base data. This method is not called automatically; it is the responsibility
	 * of the parent document to ensure pseudo-documents prepare base and derived data.
	 */
	prepareBaseData() {}

	/* ---------------------------------------- */

	/**
	 * Prepare derived data. This method is not called automatically; it is the responsibility
	 * of the parent document to ensure pseudo-documents prepare base and derived data.
	 */
	prepareDerivedData() {}

	/* ---------------------------------------- */
	/*   Instance Methods                       */
	/* ---------------------------------------- */

	/**
	 * Retrieve an embedded pseudo-document.
	 */
	getEmbeddedDocument(
		embeddedName: string,
		id: string,
		{ invalid = false, strict = false }: { invalid?: boolean; strict?: boolean } = {}
	): PseudoDocument | null {
		const embeds = this.metadata.embedded ?? {};
		if (embeddedName in embeds) {
			const path = embeds[embeddedName];
			return (
				(foundry.utils.getProperty(this, path) as t5.utils.ModelCollection<PseudoDocument>).get(id, {
					invalid,
					strict,
				}) ?? null
			);
		}
		return null;
	}

	/* ---------------------------------------- */

	/**
	 * Obtain the embedded collection of a given pseudo-document type.
	 */
	getEmbeddedPseudoDocumentCollection(embeddedName: string): tu.ModelCollection {
		const collectionPath = this.metadata.embedded[embeddedName];
		if (!collectionPath) {
			throw new Error(
				`${embeddedName} is not a valid embedded Pseudo-Document within the [${"type" in this ? this.type : "base"}] ${this.documentName} subtype!`
			);
		}
		return foundry.utils.getProperty(this, collectionPath) as tu.ModelCollection;
	}

	/* ---------------------------------------- */

	/**
	 * Create drag data for storing on initiated drag events.
	 */
	toDragData() {
		return {
			type: this.documentName,
			uuid: this.uuid,
		};
	}

	/* ---------------------------------------- */
	/*   CRUD Handlers                          */
	/* ---------------------------------------- */

	/**
	 * Does this pseudo-document exist in the document's source?
	 */
	get isSource() {
		const docName = this.documentName;
		// @ts-expect-error: TODO: revise parent types
		const fieldPath = this.parent.constructor.metadata.embedded[docName];
		const parent = this.parent instanceof foundry.abstract.TypeDataModel ? this.parent.parent : this.parent;
		const source = foundry.utils.getProperty(parent._source, fieldPath) as AnyObject;
		if (foundry.utils.getType(source) !== "Object") {
			throw new Error("Source is not an object!");
		}
		return this.id in source;
	}

	/* ---------------------------------------- */

	/**
	 * Create a new instance of this pseudo-document.
	 * @returns a promise that resolves to the updated document.
	 */
	static async create(
		data: fields.SchemaField.CreateData<PseudoDocument.Schema>,
		{ parent, ...operation }: Partial<foundry.abstract.types.DatabaseCreateOperation>
	): Promise<Document.Any | undefined> {
		if (!parent) {
			throw new Error("A parent document must be specified for the creation of a pseudo-document!");
		}
		const id =
			operation.keepId && foundry.data.validators.isValidId((data._id as string | undefined) ?? "")
				? data._id
				: foundry.utils.randomID();

		const fieldPath = (parent.system!.constructor as typeof traveller.data.Item.BaseItemModel).metadata.embedded?.[
			this.metadata.documentName
		];
		if (!fieldPath) {
			const type = "type" in parent ? parent.type : "base";
			throw new Error(
				`A ${parent.documentName} of type '${type}' does not support ${this.metadata.documentName}!`
			);
		}

		const update = { [`${fieldPath}.${id}`]: { ...data, _id: id } };
		this._configureUpdates("create", parent, update, operation);
		// @ts-expect-error: TODO: define the Document types better so this doesn't resolve to "never"
		return parent.update(update, operation);
	}

	/* ---------------------------------------- */

	/**
	 * Prompt for creating this pseudo-document.
	 */
	static async createDialog(
		data: AnyObject = {},
		{ parent, ...operation }: { parent?: foundry.abstract.Document.Any } = {}
	): Promise<PseudoDocument | null> {
		const content = await foundry.applications.handlebars.renderTemplate(
			this.CREATE_TEMPLATE,
			this._prepareCreateDialogContext(parent)
		);

		const result = await T5Dialog.input<foundry.applications.api.Dialog.InputConfig>({
			content,
			window: {
				title: tu.i18n.format("DOCUMENT.New", {
					type: tu.i18n.localize(`DOCUMENT.${this.metadata.documentName}`),
				}),
				icon: this.metadata.icon,
			},
			render: (event, dialog) => this._createDialogRenderCallback(event, dialog),
		});

		if (!result) return null;
		// @ts-expect-error: The result should be an object type
		return this.create({ ...data, ...result }, { parent, ...operation });
	}

	/* ---------------------------------------- */

	/**
	 * Prepares context for use with {@link CREATE_TEMPLATE}.
	 */
	protected static _prepareCreateDialogContext(_parent: foundry.abstract.Document.Any | undefined) {
		return {
			fields: this.schema.fields,
		};
	}

	/* ---------------------------------------- */

	/**
	 * Render callback for dynamic handling on the .
	 */
	protected static _createDialogRenderCallback(_event: Event, _dialog: foundry.applications.api.Dialog) {}

	/* ---------------------------------------- */

	/**
	 * Delete this pseudo-document.
	 * @returns a promise that resolves to the updated document.
	 */
	async delete(
		operation: Document.Database.DeleteOperation<foundry.abstract.types.DatabaseDeleteOperation<Document.Any>> = {}
	): Promise<Document.Any | undefined> {
		if (!this.isSource) throw new Error("You cannot delete a non-source pseudo-document!");

		Object.assign(operation, {
			pseudo: {
				operation: "delete",
				type: this.documentName,
				uuid: this.uuid,
			},
		});
		const update = { [`${this.fieldPath}.-=${this.id}`]: null };

		(this.constructor as typeof PseudoDocument)._configureUpdates("delete", this.document, update, operation);

		// @ts-expect-error: TODO: define the Document types better so this doesn't resolve to "never"
		return this.document.update(update, operation);
	}

	/* ---------------------------------------- */

	/**
	 * Duplicate this pseudo-document.
	 * @returns {Promise<Document>}    A promise that resolves to the updated document.
	 */
	async duplicate(): Promise<Document.Any | undefined> {
		if (!this.isSource) throw new Error("You cannot duplicate a non-source pseudo-document!");
		const activityData = foundry.utils.mergeObject(this.toObject(), {
			name: game.i18n?.format("DOCUMENT.CopyOf", {
				name: "name" in this ? (this.name as string) : "",
			}),
		});
		return (this.constructor as typeof PseudoDocument).create(activityData, { parent: this.document });
	}

	/* ---------------------------------------- */

	/**
	 * Update this pseudo-document.
	 * @param {object} [change]                         The change to perform.
	 * @param {object} [operation]                      The context of the operation.
	 * @returns {Promise<Document>}    A promise that resolves to the updated document.
	 */
	async update(
		change: AnyObject = {},
		operation: Document.Database.UpdateOperation<foundry.abstract.types.DatabaseUpdateOperation> = {}
	): Promise<Parent> {
		if (!this.isSource) throw new Error("You cannot update a non-source pseudo-document!");
		const path = [this.fieldPath, this.id].join(".");
		const update = { [path]: change };
		(this.constructor as typeof PseudoDocument)._configureUpdates("update", this.document, update, operation);
		// @ts-expect-error: TODO: define the Document types better so this doesn't resolve to "never"
		return this.document.update(update, operation);
	}

	/* ---------------------------------------- */

	/**
	 * Allow for subclasses to configure the CRUD workflow.
	 * @param {"create"|"update"|"delete"} _action     The operation.
	 * @param {Document.Any} _document    The parent document.
	 * @param {object} _update                         The data used for the update.
	 * @param {object} _operation                      The context of the operation.
	 */
	static _configureUpdates(
		_action: "create" | "update" | "delete",
		_document: Document.Any,
		_update: object,
		_operation: object
	) {}
}

/* ---------------------------------------- */

export { PseudoDocument };
