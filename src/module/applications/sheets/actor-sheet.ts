import { T5DocumentSheeetMixin } from "@applications/api/document-sheet-mixin.ts";
import Logger from "@utils/logger";
import { DeepPartial } from "fvtt-types/utils";
import { T5ItemSheet } from "./item-sheet.ts";

import api = foundry.applications.api;
import sheets = foundry.applications.sheets;

namespace T5ActorSheet {
	export interface RenderContext extends sheets.ActorSheet.RenderContext {
		tab?: api.Application.Tab;
		[key: string]: unknown;
	}
}

class T5ActorSheet extends T5DocumentSheeetMixin(sheets.ActorSheet) {
	static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions = {
		classes: ["actor"],
		actions: {
			toggleMode: this.#toggleMode,
		},
	};

	/* ---------------------------------------- */

	get actor(): Actor.Implementation {
		return this.document as Actor.Implementation;
	}

	/* ---------------------------------------- */

	protected override async _onFirstRender(
		context: DeepPartial<T5ActorSheet.RenderContext>,
		options: DeepPartial<api.HandlebarsApplicationMixin.RenderOptions>
	): Promise<void> {
		await super._onFirstRender(context, options);

		this._createContextMenu(
			this._getDocumentListContextOptions,
			"[data-document-class][data-item-id], [data-document-class][data-effect-id]",
			{
				hookName: "getDocumentListContextOptions",
				parentClassHooks: false,
				fixed: true,
				jQuery: false,
			}
		);
	}

	/* ---------------------------------------- */

	protected _getDocumentListContextOptions(): foundry.applications.ux.ContextMenu.Entry<HTMLElement>[] {
		return [
			{
				name: "TRAVELLER.SHEET.View",
				icon: '<i class="fa-solid fa-fw fa-eye"></i>',
				condition: () => this.isPlayMode,
				callback: async (target: HTMLElement) => {
					const document = this._getEmbeddedDocument(target);
					await (document?.sheet as api.Application.Any).render({
						force: true,
						mode: T5ItemSheet.MODES.PLAY,
					});
				},
			},
		];
	}

	/* ---------------------------------------- */

	_getEmbeddedDocument(target: HTMLElement): Item.Implementation | ActiveEffect.Implementation | null {
		const docRow = tu.dom.htmlClosest(target, "[data-document-class]");
		if (!docRow) {
			console.warn("Could not find document row element");
			return null;
		}

		console.log(docRow);

		if (docRow.dataset.documentClass === "Item") {
			return this.actor.items.get(docRow.dataset.itemId!) || null;
		} else if (docRow.dataset.documentClass === "ActiveEffect") {
			const parent =
				docRow.dataset.parentId === this.actor.id
					? this.actor
					: this.actor.items.get(docRow?.dataset.parentId!);
			if (!parent) {
				console.warn("Could not find parent Document");
				return null;
			}

			return parent.effects.get(docRow?.dataset.effectId!) || null;
		} else {
			console.warn("Could not find document class");
			return null;
		}
	}

	/* ---------------------------------------- */

	protected override async _preparePartContext(
		partId: string,
		context: T5ActorSheet.RenderContext,
		options: DeepPartial<api.HandlebarsApplicationMixin.RenderOptions>
	): Promise<T5ActorSheet.RenderContext> {
		await super._preparePartContext(partId, context, options);

		if (context.tabs && partId in context.tabs) context.tab = context.tabs[partId];
		return context;
	}

	/* ---------------------------------------- */

	static async #toggleMode(this: T5ActorSheet, _event: PointerEvent, _target: HTMLElement) {
		if (!this.isEditable) {
			Logger.error("You can't switch to Edit mode if the sheet is uneditable");
			return;
		}
		this._mode = this.isPlayMode ? T5ActorSheet.MODES.EDIT : T5ActorSheet.MODES.PLAY;
		this.render();
	}
}

/* ---------------------------------------- */

export { T5ActorSheet };
