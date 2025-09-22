export function constructHTMLButton({
	label = "",
	dataset = {},
	classes = [],
	icon = "",
	img = "",
	type = "button",
	disabled = false,
}: {
	label?: string;
	dataset?: Record<string, string>;
	classes?: string[];
	icon?: string;
	img?: string;
	type?: HTMLButtonElement["type"];
	disabled?: boolean;
}): HTMLButtonElement {
	const button = document.createElement("button");
	button.type = type;

	for (const [key, value] of Object.entries(dataset)) {
		button.dataset[key] = value;
	}
	button.classList.add(...classes);
	let image = "";
	if (img) image = `<img src="${img}" alt="${label}"/>`;
	else if (icon) image = `<i class="${icon}"></i>`;
	if (disabled) button.disabled = true;
	button.innerHTML = `${image}${label}`.trim();

	return button;
}

/* ---------------------------------------- */

export function htmlClosest(
	element: Element | HTMLElement,
	selector: string
): HTMLElement | null {
	if (!element) return null;
	return element.closest(selector);
}

/* ---------------------------------------- */

export function htmlQuerySelector(
	element: Element | HTMLElement,
	selector: string
): HTMLElement | null {
	if (!element) return null;
	return element.querySelector(selector);
}

/* ---------------------------------------- */

export function hmlQuerySelectorAll(
	element: Element | HTMLElement,
	selector: string
): NodeListOf<HTMLElement> | null {
	if (!element) return null;
	return element.querySelectorAll(selector);
}
