import { dom } from "@utils/index";
import { DeepPartial } from "fvtt-types/utils";
import api = foundry.applications.api;

type AnyElegibleDocument = Actor.Implementation | Item.Implementation;

/* ---------------------------------------- */

export const T5DocumentSheeetMixin = (Base: api.DocumentSheet.AnyConstructor) => {
	return class T5DocumentSheet extends api.HandlebarsApplicationMixin(Base) {
		static override DEFAULT_OPTIONS: api.DocumentSheet.DefaultOptions<api.DocumentSheet.Any> = {
			classes: ["traveller"],
			form: {
				submitOnChange: true,
				closeOnSubmit: false,
			},
			window: {
				resizable: true,
			},
			actions: {
				createPseudoDocument: T5DocumentSheet.#createPseudoDocument,
				deletePseudoDocument: T5DocumentSheet.#deletePseudoDocument,
				renderPseudoDocumentSheet: T5DocumentSheet.#renderPseudoDocumentSheet,
			},
		};

		/* ---------------------------------------- */

		/* Available sheet modes */
		static MODES = Object.freeze({ PLAY: 1, EDIT: 2 });

		/* ---------------------------------------- */

		/* The mode the shet is currently in */
		protected _mode: (typeof T5DocumentSheet.MODES)[keyof typeof T5DocumentSheet.MODES] =
			T5DocumentSheet.MODES.PLAY;

		/* ---------------------------------------- */

		/* Is this sheet in Play Mode? */
		get isPlayMode(): boolean {
			return this._mode === T5DocumentSheet.MODES.PLAY;
		}

		/* ---------------------------------------- */

		/* Is this sheet in Edit Mode? */
		get isEditMode(): boolean {
			return this._mode === T5DocumentSheet.MODES.EDIT;
		}

		/* ---------------------------------------- */

		protected override async _renderFrame(
			options: DeepPartial<api.DocumentSheet.RenderOptions>
		): Promise<HTMLElement> {
			const frame = await super._renderFrame(options);
			const buttons = [
				dom.constructHTMLButton({
					label: "",
					classes: ["header-control", "icon", "fa-solid", "fa-user-lock"],
					dataset: {
						action: "toggleMode",
						tooltip: "TRAVELLER.SHEET.ToggleMode",
					},
				}),
			];
			this.window.controls?.after(...buttons);

			return frame;
		}

		/* ---------------------------------------- */

		protected override async _prepareContext(
			options: DeepPartial<api.DocumentSheet.RenderOptions> & {
				isFirstRender: boolean;
			}
		): Promise<api.DocumentSheet.RenderContext<foundry.abstract.Document.Any>> {
			const context = await super._prepareContext(options);

			Object.assign(context, {
				isPlay: this.isPlayMode,
				// NOTE: may want to make this less broad in the future
				owner: (this.document as AnyElegibleDocument).isOwner,
				limited: (this.document as AnyElegibleDocument).limited,
				gm: game.user?.isGM,
				document: this.document,
				system: this.document.system,
				systemSource: (this.document.system as foundry.abstract.DataModel.Any)._source,
				systemFields: (this.document.system as foundry.abstract.DataModel.Any).schema.fields,
				flags: this.document.flags,
				config: traveller.config,
			});

			return context as api.DocumentSheet.RenderContext<foundry.abstract.Document.Any>;
		}

		/* ---------------------------------------- */

		protected _getPseudoDocument(element: HTMLElement): t5.data.pseudoDocuments.PseudoDocument {
			const documentName = dom.htmlClosest(element, "[data-pseudo-document-name]")?.dataset.pseudoDocumentName;
			const id = dom.htmlClosest(element, "[data-pseudo-id]")?.dataset.pseudoId;
			return (this.document as any).getEmbeddedDocument(
				documentName,
				id
			) as t5.data.pseudoDocuments.PseudoDocument;
		}

		/* ---------------------------------------- */

		static #createPseudoDocument(this: T5DocumentSheet, _event: PointerEvent, target: HTMLElement) {
			const documentName = dom.htmlClosest(target, "[data-pseudo-document-name]")?.dataset.pseudoDocumentName;
			if (!documentName) return;

			const type = dom.htmlClosest(target, "[data-pseudo-type]")?.dataset.pseudoType;
			const Cls = (this.document as AnyElegibleDocument).getEmbeddedPseudoDocumentCollection(
				documentName
			).documentClass;

			if (!type && foundry.utils.isSubclass(Cls, traveller.data.pseudoDocuments.TypedPseudoDocument)) {
				Cls.createDialog({}, { parent: this.document });
			} else if (type) {
				(Cls as typeof t5.data.pseudoDocuments.TypedPseudoDocument).create({ type }, { parent: this.document });
			} else {
				tu.Logger.error(`Could not determine type for new ${documentName}`);
			}
		}

		/* ---------------------------------------- */

		static #deletePseudoDocument(this: T5DocumentSheet, _event: PointerEvent, target: HTMLElement) {
			const doc = this._getPseudoDocument(target);
			doc.delete();
		}

		/* ---------------------------------------- */

		static #renderPseudoDocumentSheet(this: T5DocumentSheet, _event: PointerEvent, target: HTMLElement) {
			const doc = this._getPseudoDocument(target);
			doc.sheet?.render({ force: true });
		}
	};
};
