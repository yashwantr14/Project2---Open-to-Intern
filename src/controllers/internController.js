const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const mobileValidation = /^([+]\d{2})?\d{10}$/

const createintern = async function (req, res) {
    try {
        const data = req.body;
        let { name, email, mobile, collegeName } = req.body
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, msg: "Please provide Details" })
        };
        if (!name) {
            return res.status(400).send({ status: false, msg: "Please provide name" })
        };
        if (!email) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        };
        if (!email.match(emailValidation)) {
            return res.status(400).send({ status: true, msg: "Please provide valid email" })
        }
        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Please provide mobile" })
        };
        if (!mobile.match(mobileValidation)) {
            return res.status(400).send({ status: false, msg: "Please provide Valid Mobile Number" })
        }
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please provide collegeName" })
        };
        let collegeData = await collegeModel.findOne({ name: collegeName });
        if (!collegeData)
            return res.status(404).send({ status: false, message: "No Such College Found" });

        data.collegeId = collegeData._id.toString(); // to assign collegeId in  properties of data.
        let internData = await internModel.create(data);
        return res.status(201).send({ status: true, data: internData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
module.exports.createintern = createintern