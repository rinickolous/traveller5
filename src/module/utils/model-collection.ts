import { PseudoDocument } from "@data/pseudo-documents/pseudo-document.ts";
import { TypedPseudoDocument } from "@data/pseudo-documents/typed-pseudo-document.ts";

/* ---------------------------------------- */

export default class ModelCollection<Model extends PseudoDocument = PseudoDocument> extends foundry.utils
	.Collection<Model> {
	/* ---------------------------------------- */
	/*  Properties                              */
	/* ---------------------------------------- */

	/**
	 * Pseudo-document base model.
	 */
	declare documentClass: typeof PseudoDocument;

	/**
	 * Pre-organized arrays of data models by type.
	 */
	#types: Map<string, Set<string>> = new Map();

	/* ---------------------------------------- */

	/**
	 * The data models that originate from this parent document.
	 */
	get sourceContents(): Model[] {
		// TODO: check if this can be refined
		return this.filter((model) => (model as any).isSource);
	}

	/* ---------------------------------------- */

	/**
	 * A set of the un-initialized pseudo-documents.
	 * Stored safely for debugging purposes.
	 */
	#invalid: Set<object> = new Set();

	/* ---------------------------------------- */
	/*  Methods                                 */
	/* ---------------------------------------- */

	/**
	 * Fetch an array of data models of a certain type.
	 */
	getByType<DocumentName extends t5.CONST.PSEUDO_DOCUMENT_NAMES, Type extends string>(
		type: Type
	): TypedPseudoDocument.OfType<DocumentName, Type>[] {
		return Array.from(this.#types.get(type) ?? []).map((key) => this.get(key)) as TypedPseudoDocument.OfType<
			DocumentName,
			Type
		>[];
	}

	/* ---------------------------------------- */

	override set(key: string, value: Model) {
		const type = "type" in value && typeof value.type === "string" ? value.type : "base";

		if (!this.#types.has(type)) this.#types.set(type, new Set());
		this.#types.get(type)!.add(key);
		return super.set(key, value);
	}

	/* ---------------------------------------- */

	/**
	 * Store invalid pseudo-documents.
	 */
	setInvalid(value: object) {
		this.#invalid.add(value);
	}

	/* ---------------------------------------- */

	override delete(key: string) {
		const value = this.get(key);
		if (value) {
			const typeKey = "type" in value && typeof value.type === "string" ? value.type : "base";
			if (typeKey) this.#types.get(typeKey)?.delete(key);
		}
		return super.delete(key);
	}

	/* ---------------------------------------- */

	/**
	 * Test the given predicate against every entry in the Collection.
	 */
	every(predicate: (arg0: any, arg1: number, arg2: ModelCollection) => boolean): boolean {
		return this.reduce((pass, v, i) => pass && predicate(v, i, this as unknown as ModelCollection), true);
	}

	/* ---------------------------------------- */

	/**
	 * Convert the ModelCollection to an array of simple objects.
	 */
	toObject(): object[] {
		return this.map((doc) => doc.toObject(true));
	}
}
