import api = foundry.applications.api;

namespace T5Application {
	export interface RenderContext extends api.Application.RenderContext {
		tab?: api.Application.Tab;
	}
}

class T5Application extends api.HandlebarsApplicationMixin(api.Application) {
	static override DEFAULT_OPTIONS: api.Application.DefaultOptions = {
		classes: ["traveller"],
	};
}

/* ---------------------------------------- */

export { T5Application };
