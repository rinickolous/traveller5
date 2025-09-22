import fields = foundry.data.fields;

import * as _applications from "@applications";
import * as _config from "@config";
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
		config: typeof _config;
		data: typeof _data;
		documents: typeof _documents;
		helpers: typeof _helpers;
		utils: typeof _utils;
		CONST: typeof T5_CONST;
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

	type TravellerConfig = typeof _config;

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

	/* ---------------------------------------- */
	/*   Misc. Utility Types                    */
	/* ---------------------------------------- */

	type CharacteristicKey = `c${1 | 2 | 3 | 4 | 5 | 6 | "s" | "p"}`;
}

/* ---------------------------------------- */

declare module "fvtt-types/configuration" {
	interface DocumentClassConfig {
		Actor: typeof _documents.T5Actor<Actor.SubType>;
		Item: typeof _documents.T5Item<Item.SubType>;
		JournalEntryPage: typeof _documents.T5JournalEntryPage<JournalEntryPage.SubType>;
	}

	/* ---------------------------------------- */

	interface ConfiguredItem<SubType extends Item.SubType> {
		document: _documents.T5Item<SubType>;
	}

	interface ConfiguredActor<SubType extends Actor.SubType> {
		document: _documents.T5Actor<SubType>;
	}

	interface ConfiguredJournalEntryPage<SubType extends JournalEntryPage.SubType> {
		document: _documents.T5JournalEntryPage<SubType>;
	}

	/* ---------------------------------------- */

	interface DataModelConfig {
		Actor: {
			[T5_CONST.ACTOR_TYPES.CHARACTER]: typeof _data.Actor.CharacterModel;
		};
		Item: {
			[T5_CONST.ITEM_TYPES.ARMOR]: typeof _data.Item.ArmorModel;
			[T5_CONST.ITEM_TYPES.SPECIES]: typeof _data.Item.SpeciesModel;
			[T5_CONST.ITEM_TYPES.WEAPON]: typeof _data.Item.WeaponModel;
		};
		JournalEntryPage: {
			[T5_CONST.JOURNAL_ENTRY_PAGE_TYPES.PLANET]: typeof _data.JournalEntryPage.PlanetModel;
		};
		Combat: {
			[T5_CONST.COMBAT_TYPES.GROUND]: typeof _data.Combat.GroundCombatModel;
			[T5_CONST.COMBAT_TYPES.SPACE]: typeof _data.Combat.SpaceCombatModel;
		};
		Combatant: {
			[T5_CONST.COMBATANT_TYPES.GROUND]: typeof _data.Combatant.GroundCombatantModel;
			[T5_CONST.COMBATANT_TYPES.SPACE]: typeof _data.Combatant.SpaceCombatantModel;
		};
	}

	/* ---------------------------------------- */

	interface FlagConfig {}

	/* ---------------------------------------- */

	interface SettingConfig {
		"traveller5.migrationVersion": fields.StringField<{ required: true }>;
		"traveller5.skillList": t5.data.fields.CollectionField<typeof t5.data.pseudoDocuments.skills.Skill>;
	}
}
