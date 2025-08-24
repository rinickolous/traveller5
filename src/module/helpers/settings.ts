import { SYSTEM_ID } from "@const";

const fields = foundry.data.fields;

export default class TravellerSettingsHandler {
	static get systemSettings(): Record<
		string,
		ClientSettings.RegisterData<ClientSettings.Type, "traveller5", any>
	> {
		return {
			migrationVersion: {
				name: "TRAVELLER.Setting.MigrationVersion.Name",
				hint: "TRAVELLER.Setting.MigrationVersion.Hint",
				type: new fields.StringField({ required: true }),
				default: "",
				scope: "world",
			},
		};
	}

	/* ---------------------------------------- */

	static registerSettings() {
		for (const [key, value] of Object.entries(this.systemSettings)) {
			game.settings?.register(SYSTEM_ID, key, value);
		}
	}
}
