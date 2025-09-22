import * as applications from "@applications";
import * as config from "@config";
import * as T5_CONST from "@const";
import * as data from "@data";
import * as documents from "@documents";
import * as helpers from "@helpers";
import * as utils from "@utils";

import "./traveller5.scss";

(globalThis as any).traveller = {
	data,
	documents,
	applications,
	helpers,
	utils,
	config,
	CONST: T5_CONST,
} as TravellerGame;

(globalThis as any).tu = traveller.utils;

/* ---------------------------------------- */

Hooks.once("init", () => {
	tu.Logger.info(`Initializing Traveller 5 System`);
	console.log(T5_CONST.ASCII);

	(globalThis as any).traveller = game.traveller = Object.assign(
		game.system as System,
		(globalThis as any).traveller as TravellerGame
	);

	CONFIG.TRAVELLER = config;
	helpers.TravellerSettingsHandler.registerSettings();

	// Assign document classes
	for (const documentClass of Object.values(documents)) {
		if (!foundry.utils.isSubclass(documentClass, foundry.abstract.Document)) continue;
		CONFIG[documentClass.documentName].documentClass = documentClass;
	}

	helpers.registerHandlebars();

	const templates: string[] = [].map((t) => T5_CONST.systemPath(t));

	// Assign data models
	for (const [doc, models] of Object.entries(data)) {
		// @ts-expect-error: Not detecting as valid key but that's ok. Ignore.
		if (!CONST.ALL_DOCUMENT_TYPES.includes(doc)) continue;
		for (const modelCls of Object.values(models)) {
			// @ts-expect-error: Not detecting as valid key but that's ok. Ignore.
			if (modelCls.metadata?.type) CONFIG[doc].dataModels[modelCls.metadata.type] = modelCls;
			// @ts-expect-error: Not detecting as valid key but that's ok. Ignore.
			if (modelCls.metadata?.icon) CONFIG[doc].typeIcons[modelCls.metadata.type] = modelCls.metadata.icon;

			if (modelCls.metadata?.detailsPartial) templates.push(...modelCls.metadata.detailsPartial);
		}
	}

	foundry.applications.handlebars.loadTemplates(templates);

	// Register sheet application classes
	foundry.documents.collections.Actors.registerSheet(T5_CONST.SYSTEM_ID, applications.sheets.T5CharacterSheet, {
		types: [T5_CONST.ACTOR_TYPES.CHARACTER],
		makeDefault: true,
		label: "TRAVELLER.SHEET.Labels.Character",
	});

	foundry.documents.collections.Items.registerSheet(T5_CONST.SYSTEM_ID, applications.sheets.T5EquipmentSheet, {
		types: [T5_CONST.ITEM_TYPES.ARMOR, T5_CONST.ITEM_TYPES.WEAPON],
		makeDefault: true,
		label: "TRAVELLER.SHEET.Labels.Equipment",
	});
});

/* ---------------------------------------- */

Hooks.once("ready", async () => {});
await data.migrations.migrateWorld();
