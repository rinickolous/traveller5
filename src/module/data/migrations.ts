import { SYSTEM_ID } from "@const";

export async function migrateWorld() {
	if (!game.user?.isActiveGM) {
		tu.Logger.debug("Not the active GM, skipping migration.");
		return;
	}

	const newVersion = game.system.version;
	const migrationVersion = game.settings.get(SYSTEM_ID, "migrationVersion");
	let updateVersion = false;

	if (!migrationVersion) {
		// New world. Change Gamemaster name to 'Referee'
		await game.users.activeGM?.update({
			name: game.i18n.localize("USER.RoleGamemaster"),
		});
		updateVersion = true;
	} else if (foundry.utils.isNewerVersion(newVersion, migrationVersion)) {
		const warning = ui.notifications!.warn(
			"TRAVELLER.Setting.MigrationVersion.WorldWarning",
			{ format: { version: newVersion }, progress: true }
		);

		// NOTE: Nothing to update yet :)
		warning.update({ pct: 1.0 });

		ui.notifications!.remove(warning);
		ui.notifications!.success(
			"TRAVELLER.Setting.MigrationVersion.WorldSuccess",
			{ format: { version: newVersion }, permanent: true }
		);
		tu.Logger.debug("Migration complete");
		updateVersion = true;
	}

	if (updateVersion)
		await game.settings.set(
			SYSTEM_ID,
			"migrationVersion",
			game.system.version
		);
}
