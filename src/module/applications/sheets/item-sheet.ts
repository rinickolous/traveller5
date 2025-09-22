import { T5DocumentSheeetMixin } from "@applications/api/document-sheet-mixin.ts";
import Logger from "@utils/logger";
import { DeepPartial } from "fvtt-types/utils";

import api = foundry.applications.api;
import sheets = foundry.applications.sheets;

namespace T5ItemSheet {
	export interface RenderContext extends sheets.ItemSheet.RenderContext {
		tab?: api.Application.Tab;
		detailsPartial?: string[] | null;
		[key: string]: unknown;
	}
}

class T5ItemSheet extends T5DocumentSheeetMixin(sheets.ItemSheet) {
	static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions = {
		classes: ["item"],
		actions: {
			toggleMode: this.#toggleMode,
		},
	};

	/* ---------------------------------------- */

	protected override _configureRenderParts(
		options: api.HandlebarsApplicationMixin.RenderOptions
	): Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> {
		const { header, tabs, details } = super._configureRenderParts(options);

		const parts: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = { header, tabs };

		const itemModel = this.document.system!.constructor as typeof t5.data.Item.BaseItemModel;

		// Don't re-render the description tab if there's an active editor
		if (this.document.limited) return parts;
		if (itemModel.metadata.detailsPartial) parts.details = details;
		return parts;
	}

	/* ---------------------------------------- */

	protected override async _preparePartContext(
		partId: string,
		context: T5ItemSheet.RenderContext,
		options: DeepPartial<api.HandlebarsApplicationMixin.RenderOptions>
	): Promise<T5ItemSheet.RenderContext> {
		await super._preparePartContext(partId, context, options);
		if (context.tabs && partId in context.tabs) context.tab = context.tabs[partId];

		switch (partId) {
			case "details":
				context.detailsPartial =
					(this.document.system.constructor as typeof t5.data.Item.BaseItemModel).metadata.detailsPartial ??
					null;
				await this.document.system.getSheetContext(context);
				break;
		}
		return context;
	}

	/* ---------------------------------------- */

	static async #toggleMode(this: T5ItemSheet, _event: PointerEvent, _target: HTMLElement) {
		if (!this.isEditable) {
			Logger.error("You can't switch to Edit mode if the sheet is uneditable");
			return;
		}
		this._mode = this.isPlayMode ? T5ItemSheet.MODES.EDIT : T5ItemSheet.MODES.PLAY;
		this.render();
	}
}

interface T5ItemSheet {
	get document(): Item.Implementation;
}

/* ---------------------------------------- */

export { T5ItemSheet };
