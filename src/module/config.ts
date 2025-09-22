import { ACTION_TYPES, CHARACTERISTICS, DAMAGE_TYPES, SKILL_TYPES } from "@const";
import { pseudoDocuments } from "@data";

/* ---------------------------------------- */
/*   Pseudo-Documents                       */
/* ---------------------------------------- */

export const Action = {
	base: {
		documentClass: pseudoDocuments.actions.BaseAction,
	},
	[ACTION_TYPES.ATTACK]: {
		documentClass: pseudoDocuments.actions.AttackAction,
	},
};

export const Skill = {
	base: {
		documentClass: pseudoDocuments.skills.BaseSkill,
	},
	[SKILL_TYPES.INTUITION]: { documentClass: pseudoDocuments.skills.Intuition },
	[SKILL_TYPES.KNOWLEDGE]: { documentClass: pseudoDocuments.skills.Knowledge },
	[SKILL_TYPES.SKILL]: { documentClass: pseudoDocuments.skills.Skill },
	[SKILL_TYPES.TALENT]: { documentClass: pseudoDocuments.skills.Talent },
};

/* ---------------------------------------- */
/*   Actors                                 */
/* ---------------------------------------- */

export const character = {
	defaultItems: new Set(["Compendium.traveller5.species.Item.q9Y0OXYvBa4DcbTo"]),
};

/* ---------------------------------------- */

interface CharacteristicConfigEntry {
	genetic: boolean;
	physical: boolean;
	canTakeDamage: boolean;
	// Is this the default characteristic for this position
	default: boolean;
	position: CharacteristicKey;
}

export const characteristicTypes: Record<t5.CONST.CHARACTERISTICS, CharacteristicConfigEntry> = {
	[CHARACTERISTICS.Strength]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: true,
		position: "c1",
	},
	[CHARACTERISTICS.Dexterity]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: true,
		position: "c2",
	},
	[CHARACTERISTICS.Agility]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: false,
		position: "c2",
	},
	[CHARACTERISTICS.Grace]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: false,
		position: "c2",
	},
	[CHARACTERISTICS.Endurance]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: true,
		position: "c3",
	},
	[CHARACTERISTICS.Stamina]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: false,
		position: "c3",
	},
	[CHARACTERISTICS.Vigor]: {
		genetic: true,
		physical: true,
		canTakeDamage: true,
		default: false,
		position: "c3",
	},
	[CHARACTERISTICS.Intelligence]: {
		genetic: true,
		physical: false,
		canTakeDamage: false,
		default: true,
		position: "c4",
	},
	[CHARACTERISTICS.Education]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: true,
		position: "c5",
	},
	[CHARACTERISTICS.Training]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: false,
		position: "c5",
	},
	[CHARACTERISTICS.Instinct]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: false,
		position: "c5",
	},
	[CHARACTERISTICS.SocialStanding]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: true,
		position: "c6",
	},
	[CHARACTERISTICS.Charisma]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: false,
		position: "c6",
	},
	[CHARACTERISTICS.Caste]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: false,
		position: "c6",
	},
	[CHARACTERISTICS.Sanity]: {
		genetic: false,
		physical: false,
		// TODO: check on this
		canTakeDamage: true,
		default: true,
		position: "cs",
	},
	[CHARACTERISTICS.Psionics]: {
		genetic: false,
		physical: false,
		canTakeDamage: false,
		default: true,
		position: "cp",
	},
};

/* ---------------------------------------- */

interface DamageConfigEntry {
	spray?: boolean;
	special?: "kd" | "area" | "senses";
	damageToObjects: boolean;
	type: "hit" | "cut" | "fry" | "suff" | "heat" | "stun" | "freeze" | "blind";
	// stoppedBy: TODO: Implement later
	damageToBeings:
		| {
				type: "characteristic";
				target: CharacteristicKey[];
				perRound: boolean;
		  }
		| {
				type: "sense";
				target: "vision" | "hearing" | "smell" | "touch" | "awareness" | "perception";
				value: number;
		  }
		| {
				type: "special";
				target: "unconscious";
				value: number;
		  };
}

export const damageTypes: Record<t5.CONST.DAMAGE_TYPES, DamageConfigEntry> = {
	[DAMAGE_TYPES.Corrode]: {
		spray: true,
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Bullet]: {
		special: "kd",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Slash]: {
		damageToObjects: true,
		type: "cut",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: true,
		},
	},
	[DAMAGE_TYPES.Blast]: {
		special: "kd",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Blow]: {
		special: "kd",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.EMP]: {
		special: "area",
		damageToObjects: true,
		type: "fry",
		damageToBeings: {
			target: "awareness",
			type: "sense",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Frag]: {
		special: "kd",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Gas]: {
		spray: true,
		special: "area",
		damageToObjects: false,
		type: "suff",
		damageToBeings: {
			type: "characteristic",
			target: ["c3", "c4", "c5"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Hot]: {
		special: "area",
		damageToObjects: true,
		type: "heat",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3", "c4"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Infection]: {
		damageToObjects: false,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Psi]: {
		special: "area",
		damageToObjects: false,
		type: "stun",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Burn]: {
		spray: true,
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Elec]: {
		damageToObjects: true,
		type: "fry",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Magnetic]: {
		special: "area",
		damageToObjects: true,
		type: "stun",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Stench]: {
		spray: true,
		special: "senses",
		damageToObjects: false,
		type: "stun",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Pain]: {
		damageToObjects: false,
		type: "stun",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Cold]: {
		special: "area",
		damageToObjects: true,
		type: "freeze",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3", "c4", "c5"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Rad]: {
		special: "area",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Sound]: {
		special: "area",
		damageToObjects: false,
		type: "stun",
		damageToBeings: {
			target: "hearing",
			type: "sense",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Poison]: {
		damageToObjects: false,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Flash]: {
		spray: true,
		special: "senses",
		damageToObjects: false,
		type: "blind",
		damageToBeings: {
			type: "sense",
			target: "vision",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Vacc]: {
		damageToObjects: false,
		type: "suff",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
	[DAMAGE_TYPES.Wound]: {
		damageToObjects: false,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Pen]: {
		special: "kd",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Grav]: {
		special: "area",
		damageToObjects: true,
		type: "hit",
		damageToBeings: {
			type: "characteristic",
			target: ["c1", "c2", "c3"],
			perRound: false,
		},
	},
	[DAMAGE_TYPES.Tranq]: {
		damageToObjects: false,
		type: "stun",
		damageToBeings: {
			type: "special",
			target: "unconscious",
			value: 1,
		},
	},
};

/* ---------------------------------------- */
/*   SKILLS                                 */
/* ---------------------------------------- */

interface SkillConfiguration {
	name: string;
	tags: string[];
	default?: boolean;
}

// TODO: Figure out how to localize this.
export const Skills: SkillConfiguration[] = [
	{ name: "Admin", tags: ["Skills"] },
	{ name: "Advocate", tags: ["Skills"] },
	{ name: "Animals", tags: ["Skills"] },
	{ name: "Athlete", tags: ["Skills"], default: true },
	{ name: "Broker", tags: ["Skills"] },
	{ name: "Bureaucrat", tags: ["Skills"] },
	{ name: "Comms", tags: ["Skills"], default: true },
	{ name: "Computer", tags: ["Skills"], default: true },
	{ name: "Counsellor", tags: ["Skills"] },
	{ name: "Designer", tags: ["Skills"] },
	{ name: "Diplomat", tags: ["Skills"] },
	{ name: "Driver", tags: ["Skills"], default: true },
	{ name: "Explosives", tags: ["Skills"] },
	{ name: "Fleet Tactics", tags: ["Skills"] },
	{ name: "Flyer", tags: ["Skills"] },
	{ name: "Forensics", tags: ["Skills"] },
	{ name: "Gambler", tags: ["Skills"] },
	{ name: "High-G", tags: ["Skills"] },
	{ name: "Hostile Environ", tags: ["Skills"] },
	{ name: "JOT", tags: ["Skills"] },
	// TODO: check if this is a single skill or a set.
	{ name: "Language", tags: ["Skills"] },
	{ name: "Leader", tags: ["Skills"] },
	{ name: "Liaison", tags: ["Skills"] },
	{ name: "Naval Architect", tags: ["Skills"] },
	{ name: "Seafarer", tags: ["Skills"] },
	{ name: "Stealth", tags: ["Skills"] },
	{ name: "Strategy", tags: ["Skills"] },
	{ name: "Streetwise", tags: ["Skills"] },
	{ name: "Survey", tags: ["Skills"] },
	{ name: "Survival", tags: ["Skills"] },
	{ name: "Tactics", tags: ["Skills"] },
	{ name: "Teacher", tags: ["Skills"] },
	{ name: "Trader", tags: ["Skills"] },
	{ name: "Vacc Suit", tags: ["Skills"], default: true },
	{ name: "Zero-G", tags: ["Skills"] },
	{ name: "Astrogator", tags: ["Skills", "Starship Skills"] },
	{ name: "Engineer", tags: ["Skills", "Starship Skills"] },
	{ name: "Gunner", tags: ["Skills", "Starship Skills"] },
	{ name: "Medic", tags: ["Skills", "Starship Skills"] },
	{ name: "Pilot", tags: ["Skills", "Starship Skills"] },
	{ name: "Sensors", tags: ["Skills", "Starship Skills"] },
	{ name: "Steward", tags: ["Skills", "Starship Skills"], default: true },
	{ name: "Biologics", tags: ["Skills", "Trades"] },
	{ name: "Craftsman", tags: ["Skills", "Trades"] },
	{ name: "Electronics", tags: ["Skills", "Trades"] },
	{ name: "Fluidics", tags: ["Skills", "Trades"] },
	{ name: "Gravitics", tags: ["Skills", "Trades"] },
	{ name: "Magnetics", tags: ["Skills", "Trades"] },
	{ name: "Mechanic", tags: ["Skills", "Trades"], default: true },
	{ name: "Photonics", tags: ["Skills", "Trades"] },
	{ name: "Polymers", tags: ["Skills", "Trades"] },
	{ name: "Programmer", tags: ["Skills", "Trades"] },
	{ name: "Actor", tags: ["Skills", "Arts"], default: true },
	{ name: "Artist", tags: ["Skills", "Arts"], default: true },
	{ name: "Author", tags: ["Skills", "Arts"], default: true },
	{ name: "Chef", tags: ["Skills", "Arts"] },
	{ name: "Dancer", tags: ["Skills", "Arts"] },
	{ name: "Musician", tags: ["Skills", "Arts"] },
	{ name: "Fighter", tags: ["Skills"], default: true },
	{ name: "Forward Observer", tags: ["Skills", "Soldier Skills"] },
	{ name: "Heavy Weapons", tags: ["Skills", "Soldier Skills"] },
	{ name: "Navigator", tags: ["Skills", "Soldier Skills"] },
	{ name: "Recon", tags: ["Skills", "Soldier Skills"] },
	{ name: "Sapper", tags: ["Skills", "Soldier Skills"] },
];
