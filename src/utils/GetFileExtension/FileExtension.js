export const FileExtension = filename => {
	return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};
