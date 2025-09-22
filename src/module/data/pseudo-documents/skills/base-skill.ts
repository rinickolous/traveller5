import { PSEUDO_DOCUMENT_NAMES } from "@const";
import { Merge } from "fvtt-types/utils";
import { PseudoDocument } from "../pseudo-document.ts";
import { TypedPseudoDocument } from "../typed-pseudo-document.ts";
import fields = foundry.data.fields;

const baseSkillSchema = () => {
	return {
		name: new fields.StringField({ required: true, default: "New Skill" }),
		// baseSkill: new fields.StringField({ required: false, nullable: true }),
		level: new fields.NumberField({ required: true, nullable: false, min: 0, initial: 0 }),
		tags: new fields.ArrayField(new fields.StringField({ required: true }), {
			required: true,
			nullable: false,
			initial: [],
		}),
	};
};

/* ---------------------------------------- */

namespace BaseSkill {
	type Name = PSEUDO_DOCUMENT_NAMES.SKILL;

	export type Schema = Merge<TypedPseudoDocument.Schema, ReturnType<typeof baseSkillSchema>>;

	export type SubType = TypedPseudoDocument.SubTypesOf<Name>;

	export type OfType<_SubType extends SubType> = TypedPseudoDocument.OfType<Name, SubType>;
}

/* ---------------------------------------- */

class BaseSkill<Schema extends BaseSkill.Schema = BaseSkill.Schema> extends TypedPseudoDocument<
	Schema,
	t5.data.Item.BaseItemModel
> {
	static override defineSchema() {
		return Object.assign(super.defineSchema(), baseSkillSchema());
	}

	/* ---------------------------------------- */

	static override LOCALIZATION_PREFIXES: string[] = super.LOCALIZATION_PREFIXES.concat("TRAVELLER.SKILL");

	/* ---------------------------------------- */

	static override get metadata(): PseudoDocument.Metadata {
		return {
			documentName: PSEUDO_DOCUMENT_NAMES.SKILL,
			label: "",
			icon: "",
			embedded: {},
			sheetClass: traveller.applications.sheets.pseudoDocuments.SkillSheet,
		};
	}

	/* ---------------------------------------- */

	get item(): t5.data.Item.BaseItemModel {
		return this.parent;
	}
}

/* ---------------------------------------- */

export { BaseSkill };
