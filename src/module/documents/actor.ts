export default class T5Actor<
	SubType extends Actor.SubType = Actor.SubType,
> extends Actor<SubType> {
	/* ---------------------------------------- */

	isOfType<SubType extends Actor.SubType>(
		...types: SubType[]
	): this is Actor.OfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.type as Actor.SubType);
	}

	/* ---------------------------------------- */

	getEmbeddedPseudoDocumentCollection(
		embeddedName: string
	): t5.utils.ModelCollection<t5.data.pseudoDocuments.PseudoDocument> {
		const collectionPath = (this.system?.constructor as any).metadata
			.embedded?.[embeddedName];
		if (!collectionPath) {
			throw new Error(
				`${embeddedName} is not a valid embedded Pseudo-Document within the [${"type" in this ? this.type : "base"}] ${this.documentName} subtype!`
			);
		}
		return foundry.utils.getProperty(
			this,
			collectionPath
		) as tu.ModelCollection<t5.data.pseudoDocuments.PseudoDocument>;
	}
}
