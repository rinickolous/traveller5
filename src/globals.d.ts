import fields = foundry.data.fields;

import * as _applications from "@applications";
import * as T5_CONST from "@const";
import * as _data from "@data";
import * as _documents from "@documents";
import * as _helpers from "@helpers";
import * as _utils from "@utils";

export {};

/* ---------------------------------------- */

declare global {
	interface TravellerGame {
		applications: typeof _applications;
		data: typeof _data;
		documents: typeof _documents;
		helpers: typeof _helpers;
		utils: typeof _utils;
		CONST: typeof T5_CONST;
		CONFIG: TravellerConfig;
	}

	/* ---------------------------------------- */

	namespace t5 {
		export import applications = _applications;
		export import data = _data;
		export import documents = _documents;
		export import helpers = _helpers;
		export import utils = _utils;
		export import CONST = T5_CONST;
	}

	/* ---------------------------------------- */

	interface TravellerConfig {
		ASCII: string;
		CONST: typeof T5_CONST;
	}

	/* ---------------------------------------- */

	const traveller: TravellerGame;

	export import tu = _utils;

	/* ---------------------------------------- */

	const BUILD_MODE: "development" | "production";

	/* ---------------------------------------- */

	interface Game {
		traveller: TravellerGame;
	}

	/* ---------------------------------------- */

	interface CONFIG {
		TRAVELLER: TravellerConfig;
	}
}

/* ---------------------------------------- */

declare module "fvtt-types/configuration" {
	interface DocumentClassConfig {
		Actor: typeof _documents.T5Actor<Actor.SubType>;
		Item: typeof _documents.T5Item<Item.SubType>;
	}

	/* ---------------------------------------- */

	interface ConfiguredItem<SubType extends Item.SubType> {
		document: _documents.T5Item<SubType>;
	}

	interface ConfiguredActor<SubType extends Actor.SubType> {
		document: _documents.T5Actor<SubType>;
	}

	/* ---------------------------------------- */

	interface DataModelConfig {
		Actor: {};
	}

	/* ---------------------------------------- */

	interface FlagConfig {}

	/* ---------------------------------------- */

	interface SettingConfig {
		"traveller5.migrationVersion": fields.StringField<{ required: true }>;
	}
}
