import * as applications from "@applications";
import { TRAVELLER } from "@config";
import * as T5_CONST from "@const";
import * as data from "@data";
import * as documents from "@documents";
import * as helpers from "@helpers";
import * as utils from "@utils";

import "./traveller5.scss";

const travellerAPI: TravellerGame = {
	data,
	documents,
	applications,
	helpers,
	utils,
	CONST: T5_CONST,
	CONFIG: TRAVELLER,
};

(globalThis as any).traveller = travellerAPI;

(globalThis as any).tu = travellerAPI.utils;

/* ---------------------------------------- */

Hooks.once("init", () => {
	tu.Logger.info(`Initializing Traveller 5 System`);
	tu.Logger.info(TRAVELLER.ASCII);

	CONFIG.TRAVELLER = TRAVELLER;
	helpers.TravellerSettingsHandler.registerSettings();

	foundry.utils.deepFreeze(CONFIG.TRAVELLER.CONST);
	(game as Game).traveller = travellerAPI;

	// Register Document classes
	CONFIG.Actor.documentClass = documents.T5Actor;
	CONFIG.Item.documentClass = documents.T5Item;
});

/* ---------------------------------------- */

Hooks.once("ready", async () => {
	await data.migrations.migrateWorld();
});
