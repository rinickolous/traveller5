import fields = foundry.data.fields;

export const requiredInteger = (
	{ initial, min, max, label }: { initial?: number; min?: number; max?: number; label?: string } = {
		initial: 0,
		min: 0,
	}
) => new fields.NumberField({ initial, label, min, max, required: true, nullable: false, integer: true });

/* ---------------------------------------- */

export const enumField = (
	{
		choices,
		initial,
		required,
		nullable,
	}: {
		choices: fields.StringField.Choices;
		initial?: string | null;
		required?: boolean;
		nullable?: boolean;
	} = { choices: [], required: true, nullable: true, initial: null }
) => new fields.StringField({ required, nullable, choices, initial });

/* ---------------------------------------- */

export const stringSet = ({ choices }: { choices: fields.StringField.Choices }) =>
	new fields.SetField(new fields.StringField({ choices }));
