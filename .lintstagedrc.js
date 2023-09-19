const path = require("path")

const relativeFilenames = (filenames) => filenames.map((f) => path.relative(process.cwd(), f))

module.exports = {
	// run lint in src dir only
	"src/**/*.*": [
		(filenames) => `next lint --fix --file ${relativeFilenames(filenames).join(" --file ")}`,
	],

	// run prettier for all files
	"**/*.*": [(filenames) => `prettier --write ${relativeFilenames(filenames).join(" ")}`],
}
