import { SKILL_TYPES } from "@const";
import { BaseSkill } from "./base-skill.ts";

/* ---------------------------------------- */

class Intuition extends BaseSkill<BaseSkill.Schema> {
	static get TYPE(): string {
		return SKILL_TYPES.INTUITION;
	}
}

/* ---------------------------------------- */

export { Intuition };
