import { JOURNAL_ENTRY_PAGE_TYPES } from "@const";
import { BaseJournalEntryPageModel } from "./base.ts";
import fields = foundry.data.fields;

class PlanetModel extends BaseJournalEntryPageModel<PlanetSchema> {
	/* ---------------------------------------- */

	static override get metadata(): BaseJournalEntryPageModel.Metadata {
		return {
			...super.metadata,
			type: JOURNAL_ENTRY_PAGE_TYPES.PLANET,
		};
	}

	/* ---------------------------------------- */

	static override defineSchema(): PlanetSchema {
		return planetSchema();
	}
}

/* ---------------------------------------- */

const planetSchema = () => {
	return {};
};

/* ---------------------------------------- */

type PlanetSchema = ReturnType<typeof planetSchema>;

export { PlanetModel };
