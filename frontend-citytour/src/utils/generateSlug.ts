import slugify from "slugify";

export const generateSlug = (name: string) =>
	slugify(name, {
		lower: true,
		strict: true,
		locale: "vi",
		replacement: "-",
	});
