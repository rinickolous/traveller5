import { PSEUDO_DOCUMENT_NAMES } from "@const";
import { Merge } from "fvtt-types/utils";
import { PseudoDocument } from "../pseudo-document.ts";
import { TypedPseudoDocument } from "../typed-pseudo-document.ts";
import fields = foundry.data.fields;

const baseActionSchema = () => {
	return {
		name: new fields.StringField({ required: true, default: "New Action" }),
	};
};

/* ---------------------------------------- */

namespace BaseAction {
	type Name = PSEUDO_DOCUMENT_NAMES.ACTION;

	export type Schema = Merge<TypedPseudoDocument.Schema, ReturnType<typeof baseActionSchema>>;

	export type SubType = TypedPseudoDocument.SubTypesOf<Name>;

	export type OfType<_SubType extends SubType> = TypedPseudoDocument.OfType<Name, SubType>;
}

/* ---------------------------------------- */

class BaseAction<Schema extends BaseAction.Schema = BaseAction.Schema> extends TypedPseudoDocument<
	Schema,
	t5.data.Item.BaseItemModel
> {
	static override defineSchema() {
		return Object.assign(super.defineSchema(), baseActionSchema());
	}

	/* ---------------------------------------- */

	static override get metadata(): PseudoDocument.Metadata {
		return {
			documentName: PSEUDO_DOCUMENT_NAMES.ACTION,
			label: "",
			icon: "",
			embedded: {},
		};
	}

	/* ---------------------------------------- */

	get item(): t5.data.Item.BaseItemModel {
		return this.parent;
	}
}

/* ---------------------------------------- */

export { BaseAction };
