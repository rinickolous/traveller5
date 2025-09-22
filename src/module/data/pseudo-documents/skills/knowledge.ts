import { SKILL_TYPES } from "@const";
import { BaseSkill } from "./base-skill.ts";

/* ---------------------------------------- */

class Knowledge extends BaseSkill<BaseSkill.Schema> {
	static get TYPE(): string {
		return SKILL_TYPES.KNOWLEDGE;
	}
}

/* ---------------------------------------- */

export { Knowledge };
