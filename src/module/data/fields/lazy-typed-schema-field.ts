import TypedSchemaField = foundry.data.fields.TypedSchemaField;

class LazyTypedSchemaField<
	const Types extends TypedSchemaField.Types,
	const Options extends TypedSchemaField.Options<Types> = TypedSchemaField.DefaultOptions,
> extends TypedSchemaField<Types, Options> {
	_validateSpecial(value: TypedSchemaField.AssignmentType<Types, Options>) {
		if (!value || (value as any).type in this.types) return super._validateSpecial(value);
		return true;
	}
}

/* ---------------------------------------- */

export { LazyTypedSchemaField };
