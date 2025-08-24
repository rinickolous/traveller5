import { Characteristics } from "@data/models/characteristic.ts";
import { BaseActorModel } from "./base.ts";
import fields = foundry.data.fields;

class CharacterModel extends BaseActorModel<CharacterSchema> {
	static override metadata: BaseActorModel.MetaData = {
		type: traveller.CONST.ACTOR_TYPES.CHARACTER,
	};

	/* ---------------------------------------- */

	static override defineSchema(): CharacterSchema {
		return characterSchema();
	}
}

/* ---------------------------------------- */

const characterSchema = () => {
	return {
		characteristics: new fields.EmbeddedDataField(Characteristics, {
			required: true,
			nullable: false,
		}),
	};
};

/* ---------------------------------------- */

type CharacterSchema = ReturnType<typeof characterSchema>;

export { CharacterModel };
