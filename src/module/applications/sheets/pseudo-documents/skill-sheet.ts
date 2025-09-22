import { PseudoDocumentSheet } from "@applications/api/pseudo-document-sheet.ts";
import { systemPath } from "@const";
import api = foundry.applications.api;

class SkillSheet extends PseudoDocumentSheet<t5.data.pseudoDocuments.skills.BaseSkill> {
	static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions = {
		classes: ["skill"],
	};

	/* ---------------------------------------- */

	static override PARTS: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
		details: {
			template: systemPath("templates/sheets/pseudo-documents/skill/details.hbs"),
		},
	};
}

/* ---------------------------------------- */

export { SkillSheet };
