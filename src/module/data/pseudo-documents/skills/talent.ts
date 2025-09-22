import { SKILL_TYPES } from "@const";
import { BaseSkill } from "./base-skill.ts";

/* ---------------------------------------- */

class Talent extends BaseSkill<BaseSkill.Schema> {
	static get TYPE(): string {
		return SKILL_TYPES.TALENT;
	}
}

/* ---------------------------------------- */

export { Talent };
