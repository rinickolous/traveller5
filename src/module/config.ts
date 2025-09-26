import {
	ACTION_TYPES,
	CHARACTERISTICS,
	DAMAGE_TYPES,
	SKILL_TYPES,
	THING_CONSTRUCTION,
	THING_DENSITY,
	THING_POWER_SUPPLY,
	THING_PROFILE,
} from "@const";
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

/* ---------------------------------------- */

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

interface ThingProfileEntry {
	bfp: number | null;
	length: number | null;
	width: number | null;
	depth: number | null;
}

export const thingProfile: Record<THING_PROFILE, ThingProfileEntry> = {
	[THING_PROFILE.Cube]: { bfp: 1, length: 1, width: 1, depth: 1 },
	[THING_PROFILE.Sphere]: { bfp: 1.4, length: 1, width: 1 / 1.4, depth: 1 / 1.4 },
	[THING_PROFILE.Cylinder]: { bfp: 2, length: 1, width: 1 / 2, depth: 1 / 2 },
	[THING_PROFILE.Disk]: { bfp: 10, length: 1, width: 1 / 10, depth: 1 / 10 },
	[THING_PROFILE.Rod]: { bfp: 14, length: 1, width: 1 / 14, depth: 1 / 14 },
	[THING_PROFILE.ThickSheet]: { bfp: 20, length: 1, width: 1 / 20, depth: 1 / 20 },
	[THING_PROFILE.Slab]: { bfp: 5, length: 1, width: 1 / 5, depth: 1 / 5 },
	[THING_PROFILE.Pyramid]: { bfp: 6, length: 1, width: 1 / 6, depth: 1 / 6 },
	[THING_PROFILE.Vthick]: { bfp: 7, length: 1, width: 1 / 7, depth: 1 / 7 },
	[THING_PROFILE.Thick]: { bfp: 8, length: 1, width: 1 / 8, depth: 1 / 8 },
	[THING_PROFILE.Typical]: { bfp: 9, length: 1, width: 1 / 9, depth: 1 / 9 },
	[THING_PROFILE.Thin]: { bfp: 10, length: 1, width: 1 / 10, depth: 1 / 10 },
	[THING_PROFILE.Vthin]: { bfp: 11, length: 1, width: 1 / 11, depth: 1 / 11 },
	[THING_PROFILE.Flat]: { bfp: 12, length: 1, width: 1 / 12, depth: 1 / 12 },
	[THING_PROFILE.Vflat]: { bfp: 20, length: 1, width: 1 / 20, depth: 1 / 20 },
	[THING_PROFILE.Sheet]: { bfp: 50, length: 1, width: 1 / 50, depth: 1 / 50 },
	[THING_PROFILE.HeavyFabric]: { bfp: 100, length: 1, width: 1 / 100, depth: 1 / 100 },
	[THING_PROFILE.Fabric]: { bfp: 300, length: 1, width: 1 / 300, depth: 1 / 300 },
	[THING_PROFILE.LightFabric]: { bfp: 1000, length: 1, width: 1 / 1000, depth: 1 / 1000 },
	[THING_PROFILE.Custom]: { bfp: null, length: null, width: null, depth: null },
};

/* ---------------------------------------- */

interface ThingDensityEntry {
	value: number | null;
	armorValue: number | null;
}

export const thingDensity: Record<THING_DENSITY, ThingDensityEntry> = {
	[THING_DENSITY.Specials]: { value: 0.3, armorValue: null },
	[THING_DENSITY.Wood]: { value: 0.6, armorValue: null },
	[THING_DENSITY.Silanes]: { value: 0.7, armorValue: null },
	[THING_DENSITY.Hydrocarbons]: { value: 0.8, armorValue: null },
	[THING_DENSITY.Light]: { value: 0.9, armorValue: null },
	[THING_DENSITY.Standard]: { value: 1, armorValue: null },
	[THING_DENSITY.Dense]: { value: 1.1, armorValue: null },
	[THING_DENSITY.Vdense]: { value: 1.5, armorValue: null },
	[THING_DENSITY.Magnesium]: { value: 1.7, armorValue: null },
	[THING_DENSITY.Dirt]: { value: 2, armorValue: null },
	[THING_DENSITY.Brick]: { value: 2.5, armorValue: 6 },
	[THING_DENSITY.Aluminium]: { value: 3, armorValue: 9 },
	[THING_DENSITY.Titanium]: { value: 4, armorValue: 12 },
	[THING_DENSITY.Lanthanum]: { value: 6, armorValue: 14 },
	[THING_DENSITY.Steel]: { value: 8, armorValue: 16 },
	[THING_DENSITY.Silver]: { value: 10.5, armorValue: 20 },
	[THING_DENSITY.Lead]: { value: 11, armorValue: 25 },
	[THING_DENSITY.Gold]: { value: 19.3, armorValue: 40 },
	[THING_DENSITY.Iridium]: { value: 22.5, armorValue: null },
	[THING_DENSITY.Starstuff]: { value: 10 ^ 7, armorValue: null },
	[THING_DENSITY.Neutronium]: { value: 10 ^ 15, armorValue: null },
	[THING_DENSITY.Custom]: { value: null, armorValue: null },
};

/* ---------------------------------------- */

interface ThingConstructionEntry {
	value: number | null;
}

export const thingConstruction: Record<THING_CONSTRUCTION, ThingConstructionEntry> = {
	[THING_CONSTRUCTION.Flimsy]: { value: 0.1 },
	[THING_CONSTRUCTION.Container]: { value: 0.2 },
	[THING_CONSTRUCTION.Textilfe]: { value: 0.3 },
	[THING_CONSTRUCTION.Foamed]: { value: 0.4 },
	[THING_CONSTRUCTION.Hollow]: { value: 0.5 },
	[THING_CONSTRUCTION.PointSix]: { value: 0.6 },
	[THING_CONSTRUCTION.Lightened]: { value: 0.7 },
	[THING_CONSTRUCTION.InternalMechanism]: { value: 0.8 },
	[THING_CONSTRUCTION.PointNine]: { value: 0.9 },
	[THING_CONSTRUCTION.Solid]: { value: 1 },
	[THING_CONSTRUCTION.Custom]: { value: null },
};

/* ---------------------------------------- */

interface ThingPowersupplyEntry {
	profile?: THING_PROFILE | undefined;
	density?: number | undefined;
	construction?: number | undefined;
	duration?: number | "fuel" | undefined;
	fuel?: string | undefined;
	minimumSize?: number | undefined;
	comment?: string | undefined;
}

export const thingPowerSupply: Record<THING_POWER_SUPPLY, ThingPowersupplyEntry> = {
	[THING_POWER_SUPPLY.PowerCells]: {
		profile: THING_PROFILE.Slab,
		density: 10,
		construction: 1,
		duration: 5,
		minimumSize: 1,
		comment: "Recharge at Plug In",
	},
	[THING_POWER_SUPPLY.AmbientPanel]: {
		profile: THING_PROFILE.Sheet,
		density: 1,
		construction: 1,
		duration: 2,
		fuel: "light",
		minimumSize: 2,
		comment: "Specify Light Wavelength",
	},
	[THING_POWER_SUPPLY.FuelCell]: {
		profile: THING_PROFILE.Thin,
		density: 2,
		construction: 1,
		duration: "fuel",
		fuel: "H2",
		minimumSize: 3,
		comment: "Requires Atm 3-9",
	},
	[THING_POWER_SUPPLY.FusionPlus]: {
		profile: THING_PROFILE.Cylinder,
		density: 2,
		construction: 0.5,
		duration: "fuel",
		fuel: "Water",
		minimumSize: 3.5,
		comment: "Standard Size",
	},
	[THING_POWER_SUPPLY.Generator]: {
		profile: THING_PROFILE.Thin,
		density: 8,
		construction: 0.5,
		duration: "fuel",
		fuel: "H2",
		minimumSize: 3,
		comment: "Requires Atm 3-9",
	},
	[THING_POWER_SUPPLY.PlugIn]: {},
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
