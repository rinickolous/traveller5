import { BaseItemModel } from "@data/item/base.ts";
import { PseudoDocument } from "@data/pseudo-documents/pseudo-document.ts";
import { T5SystemModel } from "@data/system-model.ts";
import Logger from "@utils/logger";
import ModelCollection from "@utils/model-collection";

import Document = foundry.abstract.Document;

class T5Item<SubType extends Item.SubType = Item.SubType> extends Item<SubType> {
	/* ---------------------------------------- */

	isOfType<SubType extends Item.SubType>(...types: SubType[]): this is Item.OfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.type as Item.SubType);
	}

	/* ---------------------------------------- */

	getEmbeddedPseudoDocumentCollection(embeddedName: string): ModelCollection<PseudoDocument> {
		const collectionPath = (this.system?.constructor as typeof T5SystemModel)?.metadata.embedded?.[embeddedName];

		if (!collectionPath) {
			throw new Error(
				`${embeddedName} is not a valid embedded Pseudo-Document within the [${(this as any).type}] ${this.documentName} subtype!`
			);
		}
		return foundry.utils.getProperty(this, collectionPath) as ModelCollection<PseudoDocument>;
	}

	/* ---------------------------------------- */

	// TODO: Refine the type from string to something more specific to Item.
	override getEmbeddedDocument<EmbeddedName extends Item.Embedded.CollectionName | string>(
		embeddedName: EmbeddedName,
		id: string,
		{ invalid, strict }: Document.GetEmbeddedDocumentOptions = { invalid: false, strict: false }
	): EmbeddedName extends Item.Embedded.CollectionName
		? Item.Embedded.DocumentFor<EmbeddedName> | undefined
		: PseudoDocument | undefined {
		const systemEmbeds = (this.system?.constructor as typeof T5SystemModel).metadata.embedded ?? {};
		if (embeddedName in systemEmbeds) {
			const path = systemEmbeds[embeddedName];
			// @ts-expect-error: TODO: Come back to and try to make this a bit tighter.
			return (foundry.utils.getProperty(this, path) as ModelCollection<PseudoDocument>)?.get(id, {
				invalid,
				strict,
			}) as PseudoDocument | undefined;
		}

		// @ts-expect-error: We're extending this to support PseudoDocuments. Ignore.
		return super.getEmbeddedDocument(embeddedName, id, { invalid, strict });
	}

	/* ---------------------------------------- */

	prepareBaseData() {
		super.prepareBaseData();
		const metadata = (this.system?.constructor as typeof BaseItemModel).metadata;
		if (!metadata) {
			Logger.error(`prepareBaseData: metadata not found for item with id "${this.id}" of type ${this.type}.`);
			return;
		}

		const documentNames = Object.keys(metadata.embedded);
		for (const documentName of documentNames) {
			for (const pseudoDocument of this.getEmbeddedPseudoDocumentCollection(documentName)) {
				pseudoDocument.prepareBaseData();
			}
		}
	}

	/* ---------------------------------------- */

	prepareDerivedData() {
		super.prepareDerivedData();
		const metadata = (this.system?.constructor as typeof BaseItemModel).metadata;
		if (!metadata) {
			Logger.error(`prepareDerivedData: metadata not found for item with id "${this.id}" of type ${this.type}.`);
			return;
		}

		const documentNames = Object.keys(metadata.embedded);
		for (const documentName of documentNames) {
			for (const pseudoDocument of this.getEmbeddedPseudoDocumentCollection(documentName)) {
				pseudoDocument.prepareDerivedData();
			}
		}
	}
}

/* ---------------------------------------- */

export default T5Item;
