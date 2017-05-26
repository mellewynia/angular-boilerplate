let uniqueActionCache: { [label: string]: boolean } = {};
export function uniqueAction(label: string): string {
	if (uniqueActionCache[label]) {
		throw new Error(`Action '${label}' already exists and is thus not unique, pick a new one.`);
	}

	uniqueActionCache[label] = true;

	return label;
}

export function copy<T>(obj: T): T {
	return Object.assign({}, obj);
}
