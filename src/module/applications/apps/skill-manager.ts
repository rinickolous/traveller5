import { T5Application } from "@applications/api/application.ts";
import { systemPath } from "@const";
import { DeepPartial } from "fvtt-types/utils";
import api = foundry.applications.api;

class SkillManager extends T5Application {
	static PARTS: Record<string, api.HandlebarsApplicationMixin.HandlebarsTemplatePart> = {
		tabs: {
			// Foundry-provided generic template
			template: "templates/generic/tab-navigation.hbs",
		},
		skills: { template: systemPath("templates/apps/skill-manager/skills.hbs") },
		knowledges: { template: systemPath("templates/apps/skill-manager/knowledges.hbs") },
		talents: { template: systemPath("templates/apps/skill-manager/talents.hbs") },
	};

	/* ---------------------------------------- */

	protected override async _preparePartContext(
		partId: string,
		context: T5Application.RenderContext,
		options: DeepPartial<api.HandlebarsApplicationMixin.RenderOptions>
	): Promise<T5Application.RenderContext> {
		await super._preparePartContext(partId, context, options);
		if (context.tabs && partId in context.tabs) context.tab = context.tabs[partId];
		return context;
	}

	/* ---------------------------------------- */

	static TABS: Record<string, api.Application.TabsConfiguration> = {
		primary: {
			tabs: [
				{ id: "skills", cssClass: "" },
				{ id: "knowledges", cssClass: "" },
				{ id: "talents", cssClass: "" },
			],
			initial: "skills",
		},
	};
}

/* ---------------------------------------- */

export { SkillManager };
