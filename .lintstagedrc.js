const path = require("path")

// blacklist files from being linted
const blacklist = [".env.template"]

/** @param filenames {string[]} */
const relativeFilenames = (filenames) =>
	filenames
		.map((f) => path.relative(process.cwd(), f))
		.filter((value) => !blacklist.includes(value))

module.exports = {
	// run lint in src dir only
	"src/**/*.*": [
		(filenames) => `next lint --fix --file ${relativeFilenames(filenames).join(" --file ")}`,
	],

	// run prettier for all files
	"**/*.*": [(filenames) => `prettier --write ${relativeFilenames(filenames).join(" ")}`],
}
