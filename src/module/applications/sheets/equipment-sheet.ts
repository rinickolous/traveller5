import { ITEM_TYPES, systemPath } from "@const";
import { DeepPartial } from "fvtt-types/utils";
import { T5ItemSheet } from "./item-sheet.ts";
import api = foundry.applications.api;

/* ---------------------------------------- */

class T5EquipmentSheet extends T5ItemSheet {
	static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions = {
		classes: ["equipment"],
	};

	/* ---------------------------------------- */

	static override PARTS: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
		header: {
			template: systemPath("templates/sheets/item/equipment/header.hbs"),
		},
		tabs: {
			// Foundry-provided generic template
			template: "templates/generic/tab-navigation.hbs",
		},
		description: {
			template: systemPath("templates/sheets/item/equipment/description.hbs"),
		},
		details: {
			template: systemPath("templates/sheets/item/details.hbs"),
		},
	};

	/* ---------------------------------------- */

	static override TABS: Record<string, api.Application.TabsConfiguration> = {
		primary: {
			tabs: [
				{ id: "description", cssClass: "" },
				{ id: "details", cssClass: "" },
			],
			initial: "details",
			labelPrefix: "TRAVELLER.Item.Tabs",
		},
	};

	/* ---------------------------------------- */

	protected override async _prepareContext(
		options: DeepPartial<api.DocumentSheet.RenderOptions> & {
			isFirstRender: boolean;
		}
	): Promise<api.DocumentSheet.RenderContext<foundry.abstract.Document.Any>> {
		const context = await super._prepareContext(options);

		const qrebsFields = (["quality", "reliability", "easeOfUse", "bulk", "safety"] as const).reduce(
			(acc: Record<string, unknown>, key) => {
				acc[key] = { field: this.document.system.schema.fields[key], value: this.document.system[key] };
				return acc;
			},
			{}
		);

		Object.assign(context, {
			qrebsFields,
		});

		return context as api.DocumentSheet.RenderContext<foundry.abstract.Document.Any>;
	}
}

/* ---------------------------------------- */

interface T5EquipmentSheet {
	get document(): Item.OfType<ITEM_TYPES.ARMOR | ITEM_TYPES.WEAPON>;
}

/* ---------------------------------------- */

export { T5EquipmentSheet };
