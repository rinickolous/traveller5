import { SYSTEM_ID } from "@const";
import { CollectionField } from "@data/fields/collection-field.ts";

const fields = foundry.data.fields;

export default class TravellerSettingsHandler {
	static get systemSettings(): Record<string, ClientSettings.RegisterData<ClientSettings.Type, "traveller5", any>> {
		return {
			migrationVersion: {
				name: "TRAVELLER.Setting.MigrationVersion.Name",
				hint: "TRAVELLER.Setting.MigrationVersion.Hint",
				type: new fields.StringField({ required: true }),
				default: "",
				scope: "world",
			},
			skillList: {
				name: "TRAVELLER.Setting.SkillList.Name",
				hint: "TRAVELLER.Setting.SkillList.Hint",
				type: new CollectionField(traveller.data.pseudoDocuments.skills.Skill),
				config: false,
				scope: "world",
			},
		};
	}

	/* ---------------------------------------- */

	static get systemSettingMenus(): Record<string, ClientSettings.RegisterSubmenu> {
		return {
			skillList: {
				name: "TRAVELLER.Setting.SkillList.Name",
				hint: "TRAVELLER.Settings.SkillList.Hint",
				label: "",
				icon: "",
				type: traveller.applications.apps.SkillManager,
				restricted: true,
			},
		};
	}

	/* ---------------------------------------- */

	static registerSettings() {
		for (const [key, value] of Object.entries(this.systemSettings)) {
			game.settings?.register(SYSTEM_ID, key, value);
		}

		for (const [key, value] of Object.entries(this.systemSettingMenus)) {
			game.settings?.registerMenu(SYSTEM_ID, key, value);
		}
	}
}
