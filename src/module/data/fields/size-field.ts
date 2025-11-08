import { SimpleMerge } from "fvtt-types/utils";
import fields = foundry.data.fields;

namespace SizeField {
	export interface Options extends fields.StringField.Options {
		initial: tu.size.validSize;
	}

	export type DefaultOptions = fields.StringField.DefaultOptions & {
		required: true;
		nullable: false;
		initial: "1";
	};
}

class SizeField extends fields.StringField {
	protected static get _defaults(): fields.StringField.Options<unknown> {
		return {
			...super._defaults,
			required: true,
			nullable: false,
			initial: "1",
		};
	}

	/* ---------------------------------------- */

	protected override _validateType(
		value: fields.DataField.DerivedInitializedType<
			string,
			SimpleMerge<
				SimpleMerge<
					fields.StringField.DefaultOptions,
					fields.StringField.MergedOptions<fields.StringField.DefaultOptions>
				>,
				{ initial: undefined }
			>
		>,
		options?: fields.DataField.ValidateOptions<this> | undefined
	): boolean | foundry.data.validation.DataModelValidationFailure | void {
		if (!value) return super._validateType(value, options);

		const normalizedValue = value.toString().trim().toUpperCase();

		if (["R", "T"].includes(normalizedValue)) return true;
		if (/^[RT0-9](\.[0.9])?$/.test(normalizedValue)) return true;

		throw new foundry.data.validation.DataModelValidationFailure({
			invalidValue: value,
			message: "Size must be 0-9.9, R, T, or R.[0.9].",
		});
	}
}

/* ---------------------------------------- */

export { SizeField };
