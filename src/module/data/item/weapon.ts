import {
	ACTION_TYPES,
	ITEM_TYPES,
	systemPath,
	WEAPON_BURDEN,
	WEAPON_DESCRIPTION,
	WEAPON_DESCRIPTOR_ARTILLERY,
	WEAPON_DESCRIPTOR_DESIGNATOR,
	WEAPON_DESCRIPTOR_HANDGUN,
	WEAPON_DESCRIPTOR_LAUNCHER,
	WEAPON_DESCRIPTOR_LONGARM,
	WEAPON_DESCRIPTOR_MACHINEGUN,
	WEAPON_DESCRIPTOR_SHOTGUN,
	WEAPON_PORTABILITY,
	WEAPON_STAGE,
	WEAPON_TYPES,
	WEAPON_USER,
} from "@const";
import { requiredInteger } from "@data/helpers.ts";
import i18n from "@utils/i18n";
import { localizeEnum } from "@utils/misc";
import { AnyMutableObject } from "fvtt-types/utils";
import { EquipmentModel, EquipmentSchema } from "./equipment.ts";
import fields = foundry.data.fields;

class WeaponModel extends EquipmentModel<WeaponSchema> {
	/* ---------------------------------------- */

	static override defineSchema(): WeaponSchema {
		return Object.assign(super.defineSchema(), weaponSchema());
	}

	/* ---------------------------------------- */

	static LOCALIZATION_PREFIXES = super.LOCALIZATION_PREFIXES.concat("TRAVELLER.Item.weapon");

	/* ---------------------------------------- */

	static override get metadata(): t5.data.Item.BaseItemModel.Metadata {
		return {
			...super.metadata,
			type: ITEM_TYPES.WEAPON,
			detailsPartial: [
				systemPath("templates/sheets/item/partials/details-equipment.hbs"),
				systemPath("templates/sheets/item/partials/details-weapon.hbs"),
			],
		};
	}

	/* ---------------------------------------- */

	async getSheetContext(context: AnyMutableObject): Promise<void> {
		const descriptorChoiceMap: Record<WEAPON_TYPES, Record<string, string>> = {
			[WEAPON_TYPES.Gun]: WEAPON_DESCRIPTOR_ARTILLERY,
			[WEAPON_TYPES.Gatling]: WEAPON_DESCRIPTOR_ARTILLERY,
			[WEAPON_TYPES.Cannon]: WEAPON_DESCRIPTOR_ARTILLERY,
			[WEAPON_TYPES.AutoCannon]: WEAPON_DESCRIPTOR_ARTILLERY,
			[WEAPON_TYPES.Rifle]: WEAPON_DESCRIPTOR_LONGARM,
			[WEAPON_TYPES.Carbine]: WEAPON_DESCRIPTOR_LONGARM,
			[WEAPON_TYPES.Pistol]: WEAPON_DESCRIPTOR_HANDGUN,
			[WEAPON_TYPES.Revolver]: WEAPON_DESCRIPTOR_HANDGUN,
			[WEAPON_TYPES.Shotgun]: WEAPON_DESCRIPTOR_SHOTGUN,
			[WEAPON_TYPES.Machinegun]: WEAPON_DESCRIPTOR_MACHINEGUN,
			[WEAPON_TYPES.Projector]: WEAPON_DESCRIPTOR_DESIGNATOR,
			[WEAPON_TYPES.Designator]: WEAPON_DESCRIPTOR_DESIGNATOR,
			[WEAPON_TYPES.Launcher]: WEAPON_DESCRIPTOR_LAUNCHER,
			[WEAPON_TYPES.MultiLauncher]: WEAPON_DESCRIPTOR_LAUNCHER,
		};

		context.descriptorChoices = localizeEnum(
			descriptorChoiceMap[this.type as WEAPON_TYPES],
			"TRAVELLER.Item.weapon.Descriptor",
			"Name"
		);
	}

	/* ---------------------------------------- */

	get description(): string {
		const stage = i18n.localize(`TRAVELLER.Item.weapon.Stage.${this.stage}.Abbreviation`);
		const burden = i18n.localize(`TRAVELLER.Item.weapon.Burden.${this.burden}.Abbreviation`);
		const inParen = stage || burden ? `(${stage}${burden}) ` : "";

		const descriptor = i18n.localize(`TRAVELLER.Item.weapon.Descriptor.${this.descriptor}.Abbreviation`);
		const type = i18n.localize(`TRAVELLER.Item.weapon.Type.${this.type}.Abbreviation`);
		const user = i18n.localize(`TRAVELLER.Item.weapon.User.${this.user}.Abbreviation`);
		const portability = i18n.localize(`TRAVELLER.Item.weapon.Portability.${this.portability}.Abbreviation`);

		return `${inParen}${descriptor}${type}${user}${portability}-${this.techLevel}`;
	}

	/* ---------------------------------------- */

	/** Returns the Wx: Weapon Extension as per T5.10 1 p. 96 */
	get extension(): string {
		let extension = "Wx: ";
		const range = "R=" + this.range;
		const cost = this.cost > 0 ? ` Cr ${this.cost}` : "";
		const mass = this.mass > 0 ? ` ${this.mass}kg` : "";
		const burden = this.burden !== WEAPON_BURDEN.Blank ? `B=${this.burden}` : "";

		const effects = this.actions
			.getByType(ACTION_TYPES.ATTACK)
			.reduce((acc, action: t5.data.pseudoDocuments.actions.AttackAction) => {
				return (acc += action.damageText + " ");
			}, "")
			.trim();

		return `${extension}${range}${cost}${mass}${burden} ${effects}`.trim();
	}
}

/* ---------------------------------------- */

const weaponSchema = () => {
	return {
		stage: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_STAGE, "TRAVELLER.Item.weapon.Stage", "Name"),
			initial: WEAPON_STAGE.Blank,
		}),
		burden: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_BURDEN, "TRAVELLER.Item.weapon.Burden", "Name"),
			initial: WEAPON_BURDEN.Blank,
		}),
		descriptor: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_DESCRIPTION, "TRAVELLER.Item.weapon.Descriptor", "Name"),
			initial: WEAPON_DESCRIPTOR_HANDGUN.Blank,
		}),
		type: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_TYPES, "TRAVELLER.Item.weapon.Type", "Name"),
			initial: WEAPON_TYPES.Pistol,
		}),
		user: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_USER, "TRAVELLER.Item.weapon.User", "Name"),
			initial: WEAPON_USER.Blank,
		}),
		portability: new fields.StringField({
			required: true,
			nullable: false,
			choices: localizeEnum(WEAPON_PORTABILITY, "TRAVELLER.Item.weapon.Portability", "Name"),
			initial: WEAPON_PORTABILITY.Blank,
		}),

		range: requiredInteger(),
	};
};

type WeaponSchema = ReturnType<typeof weaponSchema> & EquipmentSchema;

/* ---------------------------------------- */
export { WeaponModel };
