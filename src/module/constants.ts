export const SYSTEM_ID = "traveller5";

/* ---------------------------------------- */

export const systemPath = (path: string): string => `systems/${SYSTEM_ID}/${path}`;

/* ---------------------------------------- */

export const ASCII = `
████████╗██████╗  █████╗ ██╗   ██╗███████╗██╗     ██╗     ███████╗██████╗  █▀▀
╚══██╔══╝██╔══██╗██╔══██╗██║   ██║██╔════╝██║     ██║     ██╔════╝██╔══██╗ ▀▀▄
   ██║   ██████╔╝███████║██║   ██║█████╗  ██║     ██║     █████╗  ██████╔╝ ▀▀
   ██║   ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║     ██║     ██╔══╝  ██╔══██╗
   ██║   ██║  ██║██║  ██║ ╚████╔╝ ███████╗███████╗███████╗███████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝`;

/* ---------------------------------------- */
/*   Document Types                         */
/* ---------------------------------------- */

export enum ACTOR_TYPES {
	CHARACTER = "character",
}

export enum ITEM_TYPES {
	SPECIES = "species",
	WEAPON = "weapon",
	ARMOR = "armor",
}

export enum JOURNAL_ENTRY_PAGE_TYPES {
	PLANET = "planet",
}

export enum COMBAT_TYPES {
	GROUND = "ground",
	SPACE = "space",
}

export enum COMBATANT_TYPES {
	GROUND = "ground",
	SPACE = "space",
}

/* ---------------------------------------- */
/*   Psuedo-Document Types                  */
/* ---------------------------------------- */

export enum PSEUDO_DOCUMENT_NAMES {
	ACTION = "Action",
	SKILL = "Skill",
}

/* ---------------------------------------- */

export enum SKILL_TYPES {
	SKILL = "skill",
	TALENT = "talent",
	INTUITION = "intuition",
	KNOWLEDGE = "knowledge",
}

/* ---------------------------------------- */

export enum ACTION_TYPES {
	ATTACK = "attack",
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

/* ---------------------------------------- */
/*   ITEMS                                  */
/* ---------------------------------------- */

/* ---------------------------------------- */
/*   Equipment                              */
/* ---------------------------------------- */

export enum THING_FUNCTION {
	Enhancer = "Enhancer",
	Protector = "Protector",
	Enabler = "Enabler",
	Resolver = "Resolver",
	Entangler = "Entangler",
	Cultural = "Cultural",
	Value = "Value",
	Analog = "Analog",
}

/* ---------------------------------------- */

export enum THING_PROFILE {
	Cube = "Cube",
	Sphere = "Sphere",
	Cylinder = "Cylinder",
	Disk = "Disk",
	Rod = "Rod",
	ThickSheet = "ThickSheet",
	Slab = "Slab",
	Pyramid = "Pyramid",
	Vthick = "Vthick",
	Thick = "Thick",
	Typical = "Typical",
	Thin = "Thin",
	Vthin = "Vthin",
	Flat = "Flat",
	Vflat = "Vflat",
	Sheet = "Sheet",
	HeavyFabric = "HeavyFabric",
	Fabric = "Fabric",
	LightFabric = "LightFabric",
	Custom = "Custom",
}

/* ---------------------------------------- */

export enum THING_DENSITY {
	Specials = "Specials",
	Wood = "Wood",
	Silanes = "Silanes",
	Hydrocarbons = "Hydrocarbons",
	Light = "Light",
	Standard = "Standard",
	Dense = "Dense",
	Vdense = "Vdense",
	Magnesium = "Magnesium",
	Dirt = "Dirt",
	Brick = "Brick",
	Aluminium = "Aluminium",
	Titanium = "Titanium",
	Lanthanum = "Lanthanum",
	Steel = "Steel",
	Silver = "Silver",
	Lead = "Lead",
	Gold = "Gold",
	Iridium = "Iridium",
	Starstuff = "Starstuff",
	Neutronium = "Neutronium",
	Custom = "Custom",
}

/* ---------------------------------------- */

export enum THING_CONSTRUCTION {
	Flimsy = "Flimsy",
	Container = "Container",
	Textilfe = "Textilfe",
	Foamed = "Foamed",
	Hollow = "Hollow",
	PointSix = "PointSix",
	Lightened = "Lightened",
	InternalMechanism = "InternalMechanism",
	PointNine = "PointNine",
	Solid = "Solid",
	Custom = "Custom",
}

/* ---------------------------------------- */

export enum THING_POWER_SUPPLY {
	PowerCells = "PowerCells",
	AmbientPanel = "AmbientPanel",
	FuelCell = "FuelCell",
	FusionPlus = "FusionPlus",
	Generator = "Generator",
	PlugIn = "PlugIn",
}

/* ---------------------------------------- */
/*   Weapon                                 */
/* ---------------------------------------- */

export enum WEAPON_TYPES {
	Gun = "Gun",
	Gatling = "Gatling",
	Cannon = "Cannon",
	AutoCannon = "AutoCannon",
	Rifle = "Rifle",
	Carbine = "Carbine",
	Pistol = "Pistol",
	Revolver = "Revolver",
	Shotgun = "Shotgun",
	Machinegun = "Machinegun",
	Projector = "Projector",
	Designator = "Designator",
	Launcher = "Launcher",
	MultiLauncher = "MultiLauncher",
}

/* ---------------------------------------- */

export enum WEAPON_USER {
	Blank = "Blank",
	// Users
	Man = "Man",
	Vargr = "Vargr",
	Aslan = "Aslan",
	Kkree = "Kkree",
	Hiver = "Hiver",
	Droyne = "Droyne",
	Vegan = "Vegan",
	// Manipulators
	Hand = "Hand",
	Paw = "Paw",
	Grasper = "Grasper",
	Gripper = "Gripper",
	Tentacle = "Tentacle",
	Socket = "Socket",
	Universal = "Universal",
}

/* ---------------------------------------- */

export enum WEAPON_PORTABILITY {
	Blank = "Blank",
	Personal = "Personal",
	Crewed = "Crewed",
	Fixed = "Fixed",
	Portable = "Portable",
	VehicleMount = "VehicleMount",
	Turret = "Turret",
}

/* ---------------------------------------- */

export enum WEAPON_STAGE {
	Experimental = "Experimental",
	Prototype = "Prototype",
	Early = "Early",
	Basic = "Basic",
	Blank = "Blank",
	Standard = "Standard",
	Improved = "Improved",
	Modified = "Modified",
	Advanced = "Advanced",
	Obsolete = "Obsolete",
	Precision = "Precision",
	Remote = "Remote",
	Sniper = "Sniper",
	Target = "Target",
	Ultimate = "Ultimate",
}

/* ---------------------------------------- */

export enum WEAPON_BURDEN {
	Body = "Body",
	Vlight = "Vlight",
	Light = "Light",
	Snub = "Snub",
	Blank = "Blank",
	Medium = "Medium",
	Magnum = "Magnum",
	Heavy = "Heavy",
	Vheavy = "Vheavy",
	VRF = "VRF",
	Recoilless = "Recoilless",
	Disposable = "Disposable",
}

/* ---------------------------------------- */

export enum WEAPON_DESCRIPTOR_DESIGNATOR {
	Acid = "Acid",
	EMP = "EMP",
	Freeze = "Freeze",
	Flash = "Flash",
	Fire = "Fire",
	Stench = "Stench",
	Gas = "Gas",
	Grav = "Grav",
	Mag = "Mag",
	Rad = "Rad",
	Shock = "Shock",
	Sonic = "Sonic",
	Laser = "Laser",
	PsiAmp = "PsiAmp",
}

export enum WEAPON_DESCRIPTOR_ARTILLERY {
	AntiFlyer = "AntiFlyer",
	AntiTank = "AntiTank",
	Assault = "Assault",
	Fusion = "Fusion",
	Plasma = "Plasma",
	Gauss = "Gauss",
}

export enum WEAPON_DESCRIPTOR_MACHINEGUN {
	Blank = "Blank",
	AntiFlyer = "AntiFlyer",
	Assault = "Assault",
	Sub = "Sub",
}

export enum WEAPON_DESCRIPTOR_LONGARM {
	Acceleractor = "Acceleractor",
	Assault = "Assault",
	Battle = "Battle",
	Combat = "Combat",
	Dart = "Dart",
	Gauss = "Gauss",
	Laser = "Laser",
	Splat = "Splat",
	Survival = "Survival",
	Hunting = "Hunting",
	Blank = "Blank",
}

export enum WEAPON_DESCRIPTOR_HANDGUN {
	Blank = "Blank",
	Machine = "Machine",
	Acceleractor = "Acceleractor",
	Laser = "Laser",
}

export enum WEAPON_DESCRIPTOR_LAUNCHER {
	AntiFlyer = "AntiFlyer",
	AntiTank = "AntiTank",
	Missile = "Missile",
	Rocket = "Rocket",
	Grenade = "Grenade",
	RAM = "RAM",
	Plasma = "Plasma",
	Fusion = "Fusion",
}

export enum WEAPON_DESCRIPTOR_SHOTGUN {
	Blank = "Blank",
	Hunting = "Hunting",
	Assault = "Assault",
}

export const WEAPON_DESCRIPTION = {
	...WEAPON_DESCRIPTOR_DESIGNATOR,
	...WEAPON_DESCRIPTOR_ARTILLERY,
	...WEAPON_DESCRIPTOR_MACHINEGUN,
	...WEAPON_DESCRIPTOR_LONGARM,
	...WEAPON_DESCRIPTOR_HANDGUN,
	...WEAPON_DESCRIPTOR_LAUNCHER,
	...WEAPON_DESCRIPTOR_SHOTGUN,
};

/* ---------------------------------------- */
/*   Armor                                  */
/* ---------------------------------------- */

export enum ARMOR_STAGE {
	Experimental = "Experimental",
	Prototype = "Prototype",
	Early = "Early",
	Basic = "Basic",
	Blank = "Blank",
	Standard = "Standard",
	Improved = "Improved",
	Modified = "Modified",
	Advanced = "Advanced",
	Obsolete = "Obsolete",
	Alternate = "Alternate",
}

/* ---------------------------------------- */

export enum ARMOR_BURDEN {
	Vlight = "Vlight",
	Light = "Light",
	Blank = "Blank",
	Medium = "Medium",
	Heavy = "Heavy",
	Disposable = "Disposable",
	Oversize = "Oversize",
	Titan = "Titan",
}

/* ---------------------------------------- */

export enum ARMOR_DESCRIPTOR_DRESS {
	Assault = "Assault",
	Battle = "Battle",
	Combat = "Combat",
	Drop = "Drop",
	Borading = "Borading",
	Police = "Police",
}

/* ---------------------------------------- */

export enum ARMOR_DESCRIPTOR_ARMOR {
	Assault = "Assault",
	Battle = "Battle",
	Combat = "Combat",
	Drop = "Drop",
	Boarding = "Boarding",
	Police = "Police",
	Protected = "Protected",
	HostileEnviron = "HostileEnviron",
	Hazmat = "Hazmat",
	Sapper = "Sapper",
}

/* ---------------------------------------- */

export enum ARMOR_DESCRIPTOR_SUIT {
	Assault = "Assault",
	Battle = "Battle",
	Combat = "Combat",
	Drop = "Drop",
	Boarding = "Boarding",
	Police = "Police",
	Protected = "Protected",
	HostileEnviron = "HostileEnviron",
	Hazmat = "Hazmat",
	Environ = "Environ",
	Vacc = "Vacc",
	Hot = "Hot",
	Cold = "Cold",
	Exploration = "Exploration",
	Prospector = "Prospector",
	Labor = "Labor",
	Sapper = "Sapper",
}

/* ---------------------------------------- */

export enum ARMOR_DESCRIPTOR_UNIT {
	Assault = "Assault",
	Battle = "Battle",
	Combat = "Combat",
	Drop = "Drop",
	Boarding = "Boarding",
	Police = "Police",
	Protected = "Protected",
	HostileEnviron = "HostileEnviron",
	Hazmat = "Hazmat",
	Environ = "Environ",
	Vacc = "Vacc",
	Hot = "Hot",
	Cold = "Cold",
	Exploration = "Exploration",
	Prospector = "Prospector",
	Labor = "Labor",
	WeaponCarrier = "WeaponCarrier",
	Sapper = "Sapper",
}

/* ---------------------------------------- */

export const ARMOR_DESCRIPTOR = [
	...new Set([
		...Object.values(ARMOR_DESCRIPTOR_DRESS),
		...Object.values(ARMOR_DESCRIPTOR_ARMOR),
		...Object.values(ARMOR_DESCRIPTOR_SUIT),
		...Object.values(ARMOR_DESCRIPTOR_UNIT),
	]),
] as const;

/* ---------------------------------------- */

export enum ARMOR_TYPES {
	Dress = "Dress",
	Armor = "Armor",
	Suit = "Suit",
	Unit = "Unit",
}

/* ---------------------------------------- */

export enum ARMOR_USER {
	Blank = "Blank",
	// Users
	Man = "Man",
	Vargr = "Vargr",
	Aslan = "Aslan",
	Kkree = "Kkree",
	Hiver = "Hiver",
	Droyne = "Droyne",
	Vegan = "Vegan",
	// Manipulators
	Hand = "Hand",
	Paw = "Paw",
	Grasper = "Grasper",
	Gripper = "Gripper",
	Tentacle = "Tentacle",
	Socket = "Socket",
	Universal = "Universal",
}

/* ---------------------------------------- */
/*   Actions                                */
/* ---------------------------------------- */

export enum DAMAGE_TYPES {
	Corrode = "Corrode",
	Bullet = "Bullet",
	Slash = "Slash",
	Blast = "Blast",
	Blow = "Blow",
	EMP = "EMP",
	Frag = "Frag",
	Gas = "Gas",
	Hot = "Hot",
	Infection = "Infection",
	Psi = "Psi",
	Burn = "Burn",
	Elec = "Elec",
	Magnetic = "Magnetic",
	Stench = "Stench",
	Pain = "Pain",
	Cold = "Cold",
	Rad = "Rad",
	Sound = "Sound",
	Poison = "Poison",
	Flash = "Flash",
	Vacc = "Vacc",
	Wound = "Wound",
	Pen = "Pen",
	Grav = "Grav",
	Tranq = "Tranq",
}
