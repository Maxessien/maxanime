type AsyncCallback<T> = () => Promise<T | null | undefined>;

export const noNullFn = async <T>(
	callback: AsyncCallback<T>,
	emptyRep: T,
): Promise<T> => {
	try {
		const result = await callback();
		if (result === null || result === undefined) return emptyRep;
		return result;
	} catch {
		return emptyRep;
	}
};
