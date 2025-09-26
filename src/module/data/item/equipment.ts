import {
	ACTION_TYPES,
	PSEUDO_DOCUMENT_NAMES,
	THING_CONSTRUCTION,
	THING_DENSITY,
	THING_FUNCTION,
	THING_POWER_SUPPLY,
	THING_PROFILE,
} from "@const";
import { CollectionField, EHexField } from "@data/fields/index.ts";
import { SizeField } from "@data/fields/size-field.ts";
import { enumField, requiredInteger, stringSet } from "@data/helpers.ts";
import { BaseAction } from "@data/pseudo-documents/actions/base-action.ts";
import { localizeEnum } from "@utils/misc";
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

	static override get metadata(): BaseItemModel.Metadata {
		return {
			...super.metadata,
			embedded: {
				[PSEUDO_DOCUMENT_NAMES.ACTION]: "system.actions",
			},
		};
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
	const thingDensityChoices = Object.values(THING_DENSITY).reduce(
		(acc: Record<THING_DENSITY, string>, key: THING_DENSITY) => {
			acc[key] = tu.i18n.format(`TRAVELLER.Item.equipment.Density.${key}.Name`, {
				value: String(traveller.config.thingDensity[key].value),
			});
			return acc;
		},
		{} as Record<THING_DENSITY, string>
	);

	const thingConstructionChoices = Object.values(THING_CONSTRUCTION).reduce(
		(acc: Record<THING_CONSTRUCTION, string>, key: THING_CONSTRUCTION) => {
			acc[key] = tu.i18n.format(`TRAVELLER.Item.equipment.Density.${key}.Name`, {
				value: String(traveller.config.thingConstruction[key].value),
			});
			return acc;
		},
		{} as Record<THING_CONSTRUCTION, string>
	);

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

		// ThingMaker fields
		function: stringSet({ choices: localizeEnum(THING_FUNCTION, "TRAVELLER.Item.equipment.Function", "Name") }),
		techLevel: requiredInteger({ initial: 11 }),
		size: new SizeField(),
		profile: new fields.SchemaField({
			type: enumField({ choices: localizeEnum(THING_PROFILE, "TRAVELLER.Item.equipment.Profile", "Name") }),
			// For custom profiles
			bfp: new fields.NumberField({ required: true, nullable: true, initial: null }),
			length: new fields.NumberField({ required: true, nullable: true, initial: null }),
			width: new fields.NumberField({ required: true, nullable: true, initial: null }),
			height: new fields.NumberField({ required: true, nullable: true, initial: null }),
		}),
		density: new fields.SchemaField({
			type: enumField({ choices: thingDensityChoices }),
			value: new fields.NumberField({ required: true, nullable: true, initial: null }),
			armorValue: new fields.NumberField({ required: true, nullable: true, initial: null }),
		}),
		construction: new fields.SchemaField({
			type: enumField({ choices: thingConstructionChoices }),
			value: new fields.NumberField({ required: true, nullable: true, initial: null }),
		}),
		// NOTE: Diensions is defined under profile, so is skipped here.
		// NOTE: Volume is derived, so is skipped here.
		// NOTE: Mass is derived, so is skipped here.
		// NOTE: Protection is equal to density.armorValue, so is skipped here.

		powerSupply: enumField({
			choices: localizeEnum(THING_POWER_SUPPLY, "TRAVELLER.Item.equipment.PowerSupply", "Name"),
		}),

		actions: new CollectionField(BaseAction),
	};
};

/* ---------------------------------------- */

type EquipmentSchema = ReturnType<typeof equipmentSchema>;

export { EquipmentModel, type EquipmentSchema };
