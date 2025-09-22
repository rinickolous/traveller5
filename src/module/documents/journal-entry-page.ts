import { PseudoDocument } from "@data/pseudo-documents/pseudo-document.ts";
import { T5SystemModel } from "@data/system-model.ts";
import ModelCollection from "@utils/model-collection";

import Document = foundry.abstract.Document;

class T5JournalEntryPage<
	SubType extends JournalEntryPage.SubType = JournalEntryPage.SubType,
> extends JournalEntryPage<SubType> {
	/* ---------------------------------------- */

	isOfType<SubType extends JournalEntryPage.SubType>(...types: SubType[]): this is JournalEntryPage.OfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.type as JournalEntryPage.SubType);
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

	// TODO: Refine the type from string to something more specific to JournalEntryPage.
	override getEmbeddedDocument<EmbeddedName extends string | never>(
		embeddedName: EmbeddedName,
		id: string,
		{ invalid = false, strict = false }: Document.GetEmbeddedDocumentOptions
	): EmbeddedName extends string ? PseudoDocument | undefined : Document.Any | undefined {
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
}

/* ---------------------------------------- */

export default T5JournalEntryPage;
