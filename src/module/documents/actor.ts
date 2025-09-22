import { PseudoDocument } from "@data/pseudo-documents/pseudo-document.ts";
import { T5SystemModel } from "@data/system-model.ts";
import ModelCollection from "@utils/model-collection";

import Document = foundry.abstract.Document;

class T5Actor<SubType extends Actor.SubType = Actor.SubType> extends Actor<SubType> {
	/* ---------------------------------------- */

	isOfType<SubType extends Actor.SubType>(...types: SubType[]): this is Actor.OfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.type as Actor.SubType);
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

	// TODO: Refine the type from string to something more specific to Actor.
	// @ts-expect-error: We're extending this to support PseudoDocuments. Ignore.
	override getEmbeddedDocument<EmbeddedName extends Actor.Embedded.CollectionName | string>(
		embeddedName: EmbeddedName,
		id: string,
		{ invalid = false, strict = false }: Document.GetEmbeddedDocumentOptions
	): EmbeddedName extends Actor.Embedded.CollectionName
		? Actor.Embedded.DocumentFor<EmbeddedName> | undefined
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
		const documentNames = Object.keys((this.system?.constructor as typeof T5SystemModel).metadata.embedded ?? {});
		for (const documentName of documentNames) {
			for (const pseudoDocument of this.getEmbeddedPseudoDocumentCollection(documentName)) {
				pseudoDocument.prepareBaseData();
			}
		}
	}

	/* ---------------------------------------- */

	prepareDerivedData() {
		super.prepareDerivedData();
		const documentNames = Object.keys((this.system?.constructor as typeof T5SystemModel).metadata.embedded ?? {});
		for (const documentName of documentNames) {
			for (const pseudoDocument of this.getEmbeddedPseudoDocumentCollection(documentName)) {
				pseudoDocument.prepareDerivedData();
			}
		}
	}

	/* ---------------------------------------- */

	applyActiveEffects() {
		this.system.prepareEmbeddedData();
		super.applyActiveEffects();
	}
}

/* ---------------------------------------- */

export default T5Actor;
