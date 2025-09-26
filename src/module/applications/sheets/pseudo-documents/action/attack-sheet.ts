import { PseudoDocumentSheet } from "@applications/api/pseudo-document-sheet.ts";
import { systemPath } from "@const";
import { DeepPartial } from "fvtt-types/utils";
import api = foundry.applications.api;

class AttackSheet extends PseudoDocumentSheet<t5.data.pseudoDocuments.actions.AttackAction> {
	static override DEFAULT_OPTIONS: DeepPartial<api.Application.Configuration> & object = {
		classes: ["attack"],
		window: {
			resizable: true,
		},
	};

	/* ---------------------------------------- */

	static override PARTS: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
		header: {
			template: systemPath("templates/sheets/pseudo-documents/action/header.hbs"),
		},
		details: {
			template: systemPath("templates/sheets/pseudo-documents/action/details-attack.hbs"),
		},
	};
}

/* ---------------------------------------- */

export { AttackSheet };
