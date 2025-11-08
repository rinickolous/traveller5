import { ACTION_TYPES, ACTOR_TYPES, ITEM_TYPES, SKILL_TYPES, systemPath } from "@const";
import Logger from "@utils/logger";
import { DeepPartial } from "fvtt-types/utils";
import { T5ActorSheet } from "./actor-sheet.ts";
import api = foundry.applications.api;

/* ---------------------------------------- */

class T5CharacterSheet extends T5ActorSheet {
	static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions = {
		classes: ["character"],
		position: { width: 640 },
		actions: {
			addSkill: this.#addSkill,
			removeSkill: this.#removeSkill,
			editSkill: this.#editSkill,
			rollSkill: this.#rollSkill,
		},
	};

	/* ---------------------------------------- */

	static override PARTS: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
		header: {
			template: systemPath("templates/sheets/actor/character/header.hbs"),
		},
		tabs: {
			// Foundry-provided generic template
			template: "templates/generic/tab-navigation.hbs",
		},
		actions: {
			template: systemPath("templates/sheets/actor/character/actions.hbs"),
		},
		equipment: {
			template: systemPath("templates/sheets/actor/character/equipment.hbs"),
		},
	};

	/* ---------------------------------------- */

	static override TABS: Record<string, api.Application.TabsConfiguration> = {
		primary: {
			tabs: [
				{ id: "actions", cssClass: "" },
				{ id: "equipment", cssClass: "" },
			],
			initial: "equipment",
			labelPrefix: "TRAVELLER.Actor.character.Tabs",
		},
	};

	/* ---------------------------------------- */
	/*   Event Handlers                         */
	/* ---------------------------------------- */

	static async #addSkill(this: T5CharacterSheet, _event: PointerEvent, _target: HTMLElement) {
		const createData = {
			type: SKILL_TYPES.SKILL,
			name: "Skill",
		};
		traveller.data.pseudoDocuments.skills.BaseSkill.createDialog(createData, { parent: this.document });
	}

	/* ---------------------------------------- */

	static async #removeSkill(this: T5CharacterSheet, _event: PointerEvent, target: HTMLElement) {
		const skillId = tu.dom.htmlClosest(target, "[data-skill-id]")?.dataset.skillId;
		if (!skillId) {
			return Logger.warn("Could not find skill id to remove skill");
		}
		await this.document.getEmbeddedDocument("Skill", skillId, {})?.delete();
	}

	/* ---------------------------------------- */

	static async #editSkill(this: T5CharacterSheet, _event: PointerEvent, target: HTMLElement) {
		const skillId = tu.dom.htmlClosest(target, "[data-skill-id]")?.dataset.skillId;
		if (!skillId) {
			return Logger.warn("Could not find skill id to remove skill");
		}
		this.document.getEmbeddedDocument("Skill", skillId, {})?.sheet?.render({ force: true });
	}

	/* ---------------------------------------- */

	static async #rollSkill(this: T5CharacterSheet, _event: PointerEvent, _target: HTMLElement) {}

	/* ---------------------------------------- */

	protected override async _preparePartContext(
		partId: string,
		context: T5ActorSheet.RenderContext,
		options: DeepPartial<api.HandlebarsApplicationMixin.RenderOptions>
	): Promise<T5ActorSheet.RenderContext> {
		await super._preparePartContext(partId, context, options);

		switch (partId) {
			case "actions": {
				context.attacks = this.actor.itemTypes.weapon.reduce((acc, weapon) => {
					acc.push(...weapon.system.actions.getByType(ACTION_TYPES.ATTACK));
					return acc;
				}, [] as t5.data.pseudoDocuments.actions.AttackAction[]);

				break;
			}
			case "equipment": {
				context.equipment = {
					[ITEM_TYPES.ARMOR]: {
						label: "TRAVELLER.Actor.character.Equipment.Armor",
						items: this.actor.itemTypes.armor,
					},
					[ITEM_TYPES.WEAPON]: {
						label: "TRAVELLER.Actor.character.Equipment.Weapons",
						items: this.actor.itemTypes.weapon,
					},
				};
			}
		}

		return context;
	}
}

/* ---------------------------------------- */

interface T5CharacterSheet {
	get document(): Actor.OfType<ACTOR_TYPES.CHARACTER>;
}

/* ---------------------------------------- */

export { T5CharacterSheet };
