import NumberField = foundry.data.fields.NumberField;

export const requiredInteger = (
	{ initial, min, max, label }: { initial?: number; min?: number; max?: number; label?: string } = {
		initial: 0,
		min: 0,
	}
) => new NumberField({ initial, label, min, max, required: true, nullable: false, integer: true });
