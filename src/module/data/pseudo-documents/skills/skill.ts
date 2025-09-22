import { SKILL_TYPES } from "@const";
import { BaseSkill } from "./base-skill.ts";

/* ---------------------------------------- */

class Skill extends BaseSkill<BaseSkill.Schema> {
	static get TYPE(): string {
		return SKILL_TYPES.SKILL;
	}
}

/* ---------------------------------------- */

export { Skill };
