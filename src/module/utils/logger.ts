import { SYSTEM_ID } from "@const";
import { ValueOf } from "fvtt-types/utils";
import i18n from "./i18n.ts";

export default class Logger {
	static SYSTEM_ID = SYSTEM_ID;

	static LOG_LEVEL = {
		DEBUG: 0,
		LOG: 1,
		INFO: 2,
		WARN: 3,
		ERROR: 4,
	} as const;

	static log({
		msg,
		level,
		options: { force, toast, permanent, localize } = {},
	}: LogMessage): void {
		const isDebugging = BUILD_MODE === "development";
		const prefix = `[${Logger.SYSTEM_ID}] | `;

		switch (level) {
			case Logger.LOG_LEVEL.ERROR:
				console.error(prefix, localize ? i18n.localize(msg) : msg);
				if (toast)
					ui.notifications?.error(msg.toString(), {
						permanent,
						localize,
						console: false,
					});
				break;

			case Logger.LOG_LEVEL.WARN:
				console.warn(prefix, localize ? i18n.localize(msg) : msg);
				if (toast)
					ui.notifications?.warn(msg.toString(), {
						permanent,
						localize,
						console: false,
					});
				break;

			case Logger.LOG_LEVEL.INFO:
				console.info(prefix, localize ? i18n.localize(msg) : msg);
				if (toast)
					ui.notifications?.info(msg.toString(), {
						permanent,
						localize,
						console: false,
					});
				break;

			case Logger.LOG_LEVEL.DEBUG:
				if (!force && !isDebugging) break;
				console.debug(prefix, localize ? i18n.localize(msg) : msg);
				if (toast) {
					ui.notifications?.info(msg.toString(), {
						permanent,
						localize,
						console: false,
					});
				}

			case Logger.LOG_LEVEL.LOG:
			default:
				console.log(prefix, localize ? i18n.localize(msg) : msg);
				if (toast) {
					ui.notifications?.info(msg.toString(), {
						permanent,
						localize,
						console: false,
					});
				}
		}
	}

	/* ---------------------------------------- */

	static error(msg: any | string, options?: LogMessageOptions): void {
		Logger.log({
			msg,
			level: Logger.LOG_LEVEL.ERROR,
			options,
		});
	}

	/* ---------------------------------------- */

	static warn(msg: any | string, options?: LogMessageOptions): void {
		Logger.log({
			msg,
			level: Logger.LOG_LEVEL.WARN,
			options,
		});
	}

	/* ---------------------------------------- */

	static info(msg: any | string, options?: LogMessageOptions): void {
		Logger.log({
			msg,
			level: Logger.LOG_LEVEL.INFO,
			options,
		});
	}

	/* ---------------------------------------- */

	static debug(msg: any | string, options?: LogMessageOptions): void {
		Logger.log({
			msg,
			level: Logger.LOG_LEVEL.DEBUG,
			options,
		});
	}
}

/* ---------------------------------------- */

interface LogMessage {
	/** The message or data to log */
	msg: any;
	options?: LogMessageOptions;
	/** The log level @see {@link Logger.LOG_LEVEL} */
	level: ValueOf<typeof Logger.LOG_LEVEL>;
}

/* ---------------------------------------- */

interface LogMessageOptions
	extends foundry.applications.ui.Notifications.NotifyOptions {
	force?: boolean;
	toast?: boolean;
}

ui.notifications;
