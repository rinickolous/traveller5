import fields = foundry.data.fields;
import DataModel = foundry.abstract.DataModel;

abstract class SenseModel<Schema extends SenseSchema> extends DataModel<Schema> {
	static override defineSchema(): SenseSchema {
		return senseSchema(0);
	}

	/* ---------------------------------------- */

	toString(): string {
		return "";
	}
}

const senseSchema = (initial: number) => {
	return {
		constant: new fields.NumberField({ required: true, nullable: false, initial }),
	};
};

type SenseSchema = ReturnType<typeof senseSchema>;

/* ---------------------------------------- */

class VisionModel extends SenseModel<VisionSchema> {
	static override defineSchema(): VisionSchema {
		return {
			...senseSchema(16),
			...visionSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `V-${this.constant.toString().padStart(2, "0")}-${this.band1}${this.band2}${this.band3}`;
	}
}

const visionSchema = () => {
	return {
		band1: new fields.StringField({ required: true, nullable: false, length: 1, initial: "R" }),
		band2: new fields.StringField({ required: true, nullable: false, length: 1, initial: "G" }),
		band3: new fields.StringField({ required: true, nullable: false, length: 1, initial: "B" }),
	};
};

type VisionSchema = SenseSchema & ReturnType<typeof visionSchema>;

/* ---------------------------------------- */

class HearingModel extends SenseModel<HearingSchema> {
	static override defineSchema(): HearingSchema {
		return {
			...senseSchema(16),
			...hearingSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `H-${this.constant.toString().padStart(2, "0")}-${this.frequency}${this.span}${this.voice}${this.range}`;
	}
}

const hearingSchema = () => {
	return {
		frequency: new fields.NumberField({ required: true, nullable: false, initial: 9 }),
		span: new fields.NumberField({ required: true, nullable: false, initial: 3 }),
		voice: new fields.NumberField({ required: true, nullable: false, initial: 8 }),
		range: new fields.NumberField({ required: true, nullable: false, initial: 2 }),
	};
};

type HearingSchema = SenseSchema & ReturnType<typeof hearingSchema>;

/* ---------------------------------------- */

class TouchModel extends SenseModel<TouchSchema> {
	static override defineSchema(): TouchSchema {
		return {
			...senseSchema(6),
			...touchSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `T-${this.constant.toString().padStart(2, "0")}-${this.frequency}${this.span}${this.voice}${this.range}`;
	}
}

const touchSchema = () => {
	return {
		frequency: new fields.NumberField({ required: true, nullable: false, initial: 9 }),
		span: new fields.NumberField({ required: true, nullable: false, initial: 3 }),
		voice: new fields.NumberField({ required: true, nullable: false, initial: 8 }),
		range: new fields.NumberField({ required: true, nullable: false, initial: 2 }),
	};
};

type TouchSchema = SenseSchema & ReturnType<typeof touchSchema>;

/* ---------------------------------------- */

class SmellModel extends SenseModel<SmellSchema> {
	static override defineSchema(): SmellSchema {
		return {
			...senseSchema(10),
			...smellSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `S-${this.constant.toString().padStart(2, "0")}-${this.sharpness}`;
	}
}

const smellSchema = () => {
	return {
		sharpness: new fields.NumberField({ required: true, nullable: false, initial: 2 }),
	};
};

type SmellSchema = SenseSchema & ReturnType<typeof smellSchema>;

/* ---------------------------------------- */

class AwarenessModel extends SenseModel<AwarenessSchema> {
	static override defineSchema(): AwarenessSchema {
		return {
			...senseSchema(0),
			...awarenessSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `A-${this.constant.toString().padStart(2, "0")}-${this.acuity}`;
	}
}

const awarenessSchema = () => {
	return {
		acuity: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	};
};

type AwarenessSchema = SenseSchema & ReturnType<typeof awarenessSchema>;

/* ---------------------------------------- */

class PerceptionModel extends SenseModel<PerceptionSchema> {
	static override defineSchema(): PerceptionSchema {
		return {
			...senseSchema(0),
			...perceptionSchema(),
		};
	}

	/* ---------------------------------------- */

	override toString(): string {
		return `P-${this.constant.toString().padStart(2, "0")}-${this.tone}${this.poitce}`;
	}
}

const perceptionSchema = () => {
	return {
		tone: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
		poitce: new fields.NumberField({ required: true, nullable: false, initial: 0 }),
	};
};

type PerceptionSchema = SenseSchema & ReturnType<typeof perceptionSchema>;

/* ---------------------------------------- */

class SensesModel extends DataModel<SensesSchema> {
	static override defineSchema(): SensesSchema {
		return sensesSchema();
	}

	/** A shorthand string representing the character's senses */
	get toString(): string {
		const vision = this.vision !== null ? "V" : "";
		const hearing = this.hearing !== null ? "H" : "";
		const smell = this.smell !== null ? "S" : "";
		const touch = this.touch !== null ? "T" : "";
		const awareness = this.awareness !== null ? "A" : "";
		const perception = this.perceptionm !== null ? "P" : "";

		return vision + hearing + smell + touch + awareness + perception;
	}
}

const sensesSchema = () => {
	return {
		vision: new fields.EmbeddedDataField(traveller.data.models.VisionModel, { required: true, nullable: true }),
		hearing: new fields.EmbeddedDataField(traveller.data.models.HearingModel, {
			required: true,
			nullable: true,
		}),
		touch: new fields.EmbeddedDataField(traveller.data.models.TouchModel, { required: true, nullable: true }),
		smell: new fields.EmbeddedDataField(traveller.data.models.SmellModel, { required: true, nullable: true }),
		awareness: new fields.EmbeddedDataField(traveller.data.models.AwarenessModel, {
			required: true,
			nullable: true,
		}),
		perceptionm: new fields.EmbeddedDataField(traveller.data.models.PerceptionModel, {
			required: true,
			nullable: true,
		}),
	};
};

type SensesSchema = ReturnType<typeof sensesSchema>;

export { AwarenessModel, HearingModel, PerceptionModel, SensesModel, SmellModel, TouchModel, VisionModel };
