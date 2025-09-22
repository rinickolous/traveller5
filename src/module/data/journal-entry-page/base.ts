import { T5SystemModel } from "@data/system-model.ts";
import fields = foundry.data.fields;

/* ---------------------------------------- */

namespace BaseJournalEntryPageModel {
	/** The metadata for the BaseJournalEntryPageModel */
	export interface Metadata extends T5SystemModel.Metadata {
		/** The registered document subtype */
		type: JournalEntryPage.SubType;
	}
}

/* ---------------------------------------- */

class BaseJournalEntryPageModel<Schema extends fields.DataSchema = fields.DataSchema> extends T5SystemModel<
	Schema,
	JournalEntryPage.Implementation
> {
	/* ---------------------------------------- */

	static override get metadata(): BaseJournalEntryPageModel.Metadata {
		return super.metadata as BaseJournalEntryPageModel.Metadata;
	}

	get metadata(): BaseJournalEntryPageModel.Metadata {
		return (this.constructor as typeof BaseJournalEntryPageModel).metadata;
	}

	/* ---------------------------------------- */

	isOfType<SubType extends JournalEntryPage.SubType>(
		...types: SubType[]
	): this is JournalEntryPage.SystemOfType<SubType>;
	isOfType(...types: string[]): boolean {
		return types.includes(this.parent.type as JournalEntryPage.SubType);
	}

	/* ---------------------------------------- */
}

/* ---------------------------------------- */

export { BaseJournalEntryPageModel };
