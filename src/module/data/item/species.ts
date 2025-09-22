import { CHARACTERISTICS, ITEM_TYPES } from "@const";
import { BaseItemModel } from "./base.ts";
import fields = foundry.data.fields;

class SpeciesModel extends BaseItemModel<SpeciesSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseItemModel.Metadata {
		return {
			...super.metadata,
			type: ITEM_TYPES.SPECIES,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): SpeciesSchema {
		return speciesSchema();
	}
}

/* ---------------------------------------- */

const characteristicSettingSchema = ({
	choices,
	initial,
}: {
	choices: t5.CONST.CHARACTERISTICS[];
	initial: t5.CONST.CHARACTERISTICS;
}) => {
	return {
		type: new fields.StringField({ required: true, nullable: false, choices, initial }),
		// NOTE: There can be different formulas for different genders, hence the ArrayField
		formulas: new fields.ArrayField(new fields.StringField({ required: true, nullable: false, initial: "2d6" }), {
			initial: ["2d6"],
		}),
	};
};

/* ---------------------------------------- */

const speciesSchema = () => {
	return {
		senses: new fields.EmbeddedDataField(traveller.data.models.SensesModel, { required: true, nullable: false }),
		characteristics: new fields.SchemaField({
			c1: new fields.SchemaField(
				characteristicSettingSchema({ choices: [CHARACTERISTICS.Strength], initial: CHARACTERISTICS.Strength })
			),
			c2: new fields.SchemaField(
				characteristicSettingSchema({
					choices: [CHARACTERISTICS.Dexterity, CHARACTERISTICS.Agility, CHARACTERISTICS.Grace],
					initial: CHARACTERISTICS.Dexterity,
				})
			),
			c3: new fields.SchemaField(
				characteristicSettingSchema({
					choices: [CHARACTERISTICS.Endurance, CHARACTERISTICS.Stamina, CHARACTERISTICS.Vigor],
					initial: CHARACTERISTICS.Endurance,
				})
			),
			c4: new fields.SchemaField(
				characteristicSettingSchema({
					choices: [CHARACTERISTICS.Intelligence],
					initial: CHARACTERISTICS.Intelligence,
				})
			),
			c5: new fields.SchemaField(
				characteristicSettingSchema({
					choices: [CHARACTERISTICS.Education, CHARACTERISTICS.Training, CHARACTERISTICS.Instinct],
					initial: CHARACTERISTICS.Education,
				})
			),
			c6: new fields.SchemaField(
				characteristicSettingSchema({
					choices: [CHARACTERISTICS.SocialStanding, CHARACTERISTICS.Charisma, CHARACTERISTICS.Caste],
					initial: CHARACTERISTICS.SocialStanding,
				})
			),
			cs: new fields.SchemaField(
				characteristicSettingSchema({ choices: [CHARACTERISTICS.Sanity], initial: CHARACTERISTICS.Sanity })
			),
			cp: new fields.SchemaField(
				characteristicSettingSchema({ choices: [CHARACTERISTICS.Psionics], initial: CHARACTERISTICS.Psionics })
			),
		}),
		genders: new fields.ArrayField(
			new fields.SchemaField({
				percentage: new fields.NumberField({ required: true, nullable: false, min: 0, max: 100 }),
				type: new fields.StringField({ required: true, nullable: false }),
			})
		),
		physicalAgingStartAge: new fields.NumberField({ required: false, nullable: true }),
		mentalAgingStartAge: new fields.NumberField({ required: false, nullable: true }),
		symmetry: new fields.StringField({ required: false, nullable: false }),
		head: new fields.StringField({ required: false, nullable: false }),
		torso: new fields.StringField({ required: false, nullable: false }),
		limbGroup1: new fields.StringField({ required: false, nullable: false }),
		limbGroup2: new fields.StringField({ required: false, nullable: false }),
		limbGroup3: new fields.StringField({ required: false, nullable: false }),
		limbGroup4: new fields.StringField({ required: false, nullable: false }),
		tail: new fields.StringField({ required: false, nullable: false }),
		skeleton: new fields.StringField({ required: false, nullable: false }),
		skin: new fields.StringField({ required: false, nullable: false }),
		fluids: new fields.StringField({ required: false, nullable: false }),
		scent: new fields.StringField({ required: false, nullable: false }),
	};
};

/* ---------------------------------------- */

type SpeciesSchema = ReturnType<typeof speciesSchema>;

export { SpeciesModel };
