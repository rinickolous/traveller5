import { ACTOR_TYPES } from "@const";
import { CollectionField } from "@data/fields/collection-field.ts";
import { BaseActorModel } from "./base.ts";
import fields = foundry.data.fields;

class CharacterModel extends BaseActorModel<CharacterSchema> {
	declare senses: t5.data.models.SensesModel;
	/* ---------------------------------------- */

	static override get metadata(): BaseActorModel.Metadata {
		return {
			...super.metadata,
			type: ACTOR_TYPES.CHARACTER,
			embedded: { Skill: "system.skills" },
		};
	}

	/* ---------------------------------------- */

	static LOCALIZATION_PREFIXES = super.LOCALIZATION_PREFIXES.concat("TRAVELLER.Actor.character");

	/* ---------------------------------------- */

	static override defineSchema(): CharacterSchema {
		return characterSchema();
	}

	/* ---------------------------------------- */
	/*   Data Preparation                       */
	/* ---------------------------------------- */

	protected override async _preCreate(
		data: foundry.abstract.TypeDataModel.ParentAssignmentType<CharacterSchema, Actor.Implementation>,
		options: foundry.abstract.Document.Database.PreCreateOptions<foundry.abstract.types.DatabaseCreateOperation>,
		user: User.Implementation
	): Promise<boolean | void> {
		const allowed = await super._preCreate(data, options, user);
		if (allowed === false) return false;

		const updates: fields.SchemaField.UpdateData<Actor.Schema> = {
			prototypeToken: {
				actorLink: true,
				disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
				sight: {
					enabled: true,
				},
			},
		};

		const stats = this.parent._stats;

		if (!stats.duplicateSource && !stats.compendiumSource && !stats.exportSource) {
			const items: (Item.Implementation | null)[] = await Promise.all(
				traveller.config.character.defaultItems.map((uuid) => fromUuid<Item.Implementation>(uuid))
			);
			const existingItmes = items.filter((e) => !!e);

			// updateSource will merge the arrays for embedded collections
			updates.items = existingItmes.map((i) =>
				game.items!.fromCompendium(i, { keepId: true, clearFolder: true })
			);
		}

		this.parent.updateSource(updates);
	}

	override prepareEmbeddedData(): void {
		super.prepareEmbeddedData();

		if (this.species instanceof Item) {
			this.senses = this.species.system.senses;
		} else {
			this.senses = new traveller.data.models.SensesModel();
		}
	}

	/* ---------------------------------------- */

	/**
	 * Getting around some type assertion and circularity issues here.
	 * TODO: When fvtt-types is fixed so that `foundry.documents.BaseItem` is correctly typed, this can be removed.
	 */
	get species(): Item.OfType<t5.CONST.ITEM_TYPES.SPECIES> | null {
		return (this._species as Item.OfType<t5.CONST.ITEM_TYPES.SPECIES>) ?? null;
	}
}

/* ---------------------------------------- */

const characterSchema = () => {
	return {
		profile: new fields.SchemaField({
			title: new fields.StringField({ required: true, nullable: false }),
			gender: new fields.StringField({ required: false, nullable: false }),
			birthDate: new fields.StringField({ required: false, nullable: false }),
			birthWorld: new fields.StringField({ required: false, nullable: false }),
			homeWorld: new fields.StringField({ required: false, nullable: false }),
		}),
		characteristics: new fields.EmbeddedDataField(traveller.data.models.Characteristics, {
			required: true,
			nullable: false,
		}),
		// HACK: The type assertion here is required here to avoid a type circularity
		_species: new traveller.data.fields.LocalDocumentField(
			foundry.documents.BaseItem as foundry.abstract.Document.AnyConstructor,
			{
				required: true,
				fallback: true,
			}
		),
		skills: new CollectionField(traveller.data.pseudoDocuments.skills.BaseSkill),
	};
};

/* ---------------------------------------- */

type CharacterSchema = ReturnType<typeof characterSchema>;

export { CharacterModel };
