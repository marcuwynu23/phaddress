const HOME = (req, res) => {
	return res.render('index.html', {});
}

// route controller for regions
const REGIONS = (req, res) => {
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refregion.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else {
		return res.json(require("./json/refregion.json")["RECORDS"]);
	}
}
// route controller for provinces
const PROVINCES = (req, res) => {
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refprovince.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refprovince.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else {
		return res.json(require("./json/refprovince.json")["RECORDS"]);
	}
}
// route controller for citymuns
const CITYMUNS = (req, res) => {
	if (req.query.provCode && req.query.regCode) {
		console.log(req.query.regCode, " : ", req.query.provCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.regDesc == req.query.regCode && item.provCode == req.query.provCode));
	}
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refcitymun.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else {
		return res.json(require("./json/refcitymun.json")["RECORDS"]);
	}
}
// route controller for barangays
const BARANGAYS = (req, res) => {
	if (req.query.provCode && req.query.citymunCode) {
		console.log(req.query.citymunCode, " : ", req.query.provCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode && item.provCode == req.query.provCode));
	}
	if (req.query.regCode) {
		console.log(req.query.regCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.regCode == req.query.regCode));
	} else if (req.query.provCode) {
		console.log(req.query.provCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.provCode == req.query.provCode));
	} else if (req.query.citymunCode) {
		console.log(req.query.citymunCode);
		return res.json(require("./json/refbrgy.json")["RECORDS"].filter((item) => item.citymunCode == req.query.citymunCode));
	}
	else {
		return res.json(require("./json/refbrgy.json")["RECORDS"]);
	}
}


// export route controllers
module.exports.HOME = HOME
module.exports.REGIONS = REGIONS
module.exports.PROVINCES = PROVINCES
module.exports.CITYMUNS = CITYMUNS
module.exports.BARANGAYS = BARANGAYS
