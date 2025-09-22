class T5Combatant<SubType extends Combatant.SubType = Combatant.SubType> extends Combatant<SubType> {
	/* ---------------------------------------- */

	isOfType<SubType extends Combatant.SubType>(...types: SubType[]): this is Combatant.OfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.type as Combatant.SubType);
	}
}

/* ---------------------------------------- */

export { T5Combatant };
