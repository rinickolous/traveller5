import { SimpleMerge } from "fvtt-types/utils";
import fields = foundry.data.fields;

declare namespace EHexField {
	type DefaultOptions = SimpleMerge<
		fields.DataField.DefaultOptions,
		{
			nullable: false;
			min: 0;
			max: 33;
			step: undefined;
			integer: true;
			positive: true;
			choices: undefined;
		}
	>;
}

/* ---------------------------------------- */

class EHexField<
	const Options extends fields.NumberField.Options = EHexField.DefaultOptions,
	const AssignmentType = fields.NumberField.AssignmentType<Options>,
	const InitializedType = fields.NumberField.InitializedType<Options>,
	const PersistedType extends number | null | undefined = fields.NumberField.InitializedType<Options>,
> extends fields.NumberField<Options, AssignmentType, InitializedType, PersistedType> {
	protected static override get _defaults(): fields.NumberField.Options {
		return {
			nullable: false,
			min: 0,
			max: 33,
			step: undefined,
			integer: true,
			positive: false,
		};
	}
	/* ---------------------------------------- */

	get validEHexChars(): string[] {
		return "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ".split("");
	}

	/* ---------------------------------------- */

	protected override _toInput(
		config:
			| fields.NumberField.ToInputConfig<InitializedType, Options["choices"]>
			| fields.NumberField.ToInputConfigWithOptions<InitializedType>
	): HTMLElement | HTMLCollection;
	protected override _toInput(
		config: fields.NumberField.ToInputConfigWithChoices<InitializedType, Options["choices"]>
	): HTMLElement | HTMLCollection {
		config.min ??= this.min;
		config.max ??= this.max;
		config.step ??= this.step;
		if (config.value === undefined) config.value = this.getInitialValue({});
		if (Number.isNumeric(config.value)) config.value = Math.round(config.value as number) as InitializedType;

		const value = tu.eHex.fromNumber(config.value as number);

		const input = document.createElement("input");
		input.type = "text";
		input.classList.add("ehex");
		input.name = config.name ?? "";
		input.maxLength = 1;
		input.pattern = "[0-9A-HJ-NP-Za-hj-np-z]";
		input.setAttribute("value", value);
		foundry.applications.fields.setInputAttributes(input, config);

		return input;
	}

	/* ---------------------------------------- */

	clean(value: AssignmentType, options?: fields.DataField.CleanOptions): InitializedType {
		if (typeof value === "string") value = tu.eHex.toNumber(value) as AssignmentType;
		value = value ?? ((this.nullable ? null : 0) as AssignmentType);

		return super.clean(value, options);
	}
}

/* ---------------------------------------- */

export { EHexField };
