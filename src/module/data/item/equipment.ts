import { ACTION_TYPES } from "@const";
import { CollectionField, EHexField } from "@data/fields/index.ts";
import { requiredInteger } from "@data/helpers.ts";
import { BaseAction } from "@data/pseudo-documents/actions/base-action.ts";
import { BaseItemModel } from "./base.ts";
import fields = foundry.data.fields;

const qrebsField = () =>
	new fields.NumberField({
		required: true,
		nullable: false,
		initial: 0,
		integer: true,
		min: -5,
		max: 5,
	});

class EquipmentModel<Schema extends EquipmentSchema = EquipmentSchema> extends BaseItemModel<Schema> {
	/* ---------------------------------------- */

	static override defineSchema(): EquipmentSchema {
		return equipmentSchema();
	}

	/* ---------------------------------------- */

	static LOCALIZATION_PREFIXES = super.LOCALIZATION_PREFIXES.concat("TRAVELLER.Item.equipment");

	/* ---------------------------------------- */

	testFunc() {
		this.actions.forEach((action) => {
			action;
		});

		this.actions.getByType(ACTION_TYPES.ATTACK).forEach((action) => {
			action;
		});
	}
}

/* ---------------------------------------- */

/* ---------------------------------------- */

const equipmentSchema = () => {
	return {
		// QREBS
		quality: new EHexField({ initial: 5, max: 12 }),
		reliability: qrebsField(),
		easeOfUse: qrebsField(),
		bulk: qrebsField(),
		safety: qrebsField(),

		// Shared Fields
		cost: requiredInteger(),
		mass: new fields.NumberField({ required: true, nullable: false, initial: 0, min: 0 }),
		notes: new fields.StringField({ required: true, nullable: false, initial: "" }),

		actions: new CollectionField(BaseAction),
	};
};

/* ---------------------------------------- */

type EquipmentSchema = ReturnType<typeof equipmentSchema>;

export { EquipmentModel, type EquipmentSchema };
