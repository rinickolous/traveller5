export const SYSTEM_ID = "traveller5";

/* ---------------------------------------- */

export const systemPath = (path: string): string =>
	`systems/${SYSTEM_ID}/${path}`;

/* ---------------------------------------- */

export const ASCII = `
████████╗██████╗  █████╗ ██╗   ██╗███████╗██╗     ██╗     ███████╗██████╗  █▀▀
╚══██╔══╝██╔══██╗██╔══██╗██║   ██║██╔════╝██║     ██║     ██╔════╝██╔══██╗ ▀▀▄
   ██║   ██████╔╝███████║██║   ██║█████╗  ██║     ██║     █████╗  ██████╔╝ ▀▀
   ██║   ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║     ██║     ██╔══╝  ██╔══██╗
   ██║   ██║  ██║██║  ██║ ╚████╔╝ ███████╗███████╗███████╗███████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝`;

export enum ACTOR_TYPES {
	CHARACTER = "character",
}

/* ---------------------------------------- */

export enum CHARACTERISTICS {
	Strength = "Strength",
	Dexterity = "Dexterity",
	Agility = "Agility",
	Grace = "Grace",
	Endurance = "Endurance",
	Stamina = "Stamina",
	Vigor = "Vigor",
	Intelligence = "Intelligence",
	Education = "Education",
	Training = "Training",
	Instinct = "Instinct",
	SocialStanding = "SocialStanding",
	Charisma = "Charisma",
	Caste = "Caste",
	Sanity = "Sanity",
	Psionics = "Psionics",
}
