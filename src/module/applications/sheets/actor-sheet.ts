import { T5DocumentSheeetMixin } from "@applications/api/document-sheet-mixin.ts";
import Logger from "@utils/logger";
import { DeepPartial } from "fvtt-types/utils";

import api = foundry.applications.api;
import sheets = foundry.applications.sheets;

namespace T5ActorSheet {
	export interface RenderContext extends sheets.ActorSheet.RenderContext {
		tab?: api.Application.Tab;
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
