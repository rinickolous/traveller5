# Notes

SkillModel. How should we manage this? We can either use string lookup against a name which
makes things a bit easier and avoids the downside of characters which can't be transferred between
worlds (think debugging, sharing chars between sessions, idk) and ties the Actors necessarily
to specific worlds.
So we use an ArrayField of SkillModels, but the only thing this changes is the selection of Skills
available to the Character. We'd need to warn the player that a Skill they have is not recognised
in the world settings if this is the case (maybe we can prompt the GM to add it automatically if so?).
Let's automatically sort the Skill List alphabetically by name.
Let's sluggify skills for a pseudo-ID? That should help with lookup, just need to have a system
which faultlessly distinguishes between skills and knowledges. Look up sluggifying standards.

Should Knowledges be set by settings? They are unlimited and may be very unique, so not sure if we
should even bother.
For that matter, should Skills even be configurable? (Yes, we want to allow tables to customise even the default skill list if need be. Not that 90% of them would, but could be useful).

"Turrets" is a default skill despite actually being a knowledge. Query?
