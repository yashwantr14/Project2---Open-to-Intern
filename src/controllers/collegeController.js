const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');


const createcollege = async function (req, res) {
    try {
        let { name, fullName, logoLink } = req.body;
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, msg: "Please provide Details" })
        };
        if (!name) {
            return res.status(400).send({ status: false, msg: "Please provide name" })
        };
        let duplicateName = await collegeModel.findOne({ name: name });
        if (duplicateName) {
          return res.status(400).send({ status: false, message: "College name already existed" });
        };
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "Please provide fullName" })
        };
        let duplicatefullName = await collegeModel.findOne({ fullName: fullName }); // inDB //req.body
        if (duplicatefullName) {
            return res.status(400).send({ status: false, message: "College fullName already existed" });
          };
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "Please provide logolink" })
        }
        let savedData =await collegeModel.create(req.body)
        return res.status(201).send({status:true, data:savedData})
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getdetailsofinterns= async function(req, res){
     try{
         let {collegeName}=req.query;
      if(!collegeName){
        return res.status(400).send({status: false, msg: "Please provide collegeName"})};
      let collegeId= await collegeModel.find({name:collegeName}).select({_id:1})
      if (collegeId.length == 0) {
        return res.status(404).send({status: false,message: "Please enter a valid name abbreviation in lowercase"});
      }
      let interns= await internModel.find({collegeId:collegeId}).select({_id:1,name:1,email:1,mobile:1})
      if (interns.length == 0) {
        var x = `no interns of ${collegeName} college`;
      } else {
        var x = interns;
      }
      const result = await collegeModel.findOne({ name: collegeName }).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
      result._doc.interns=x  //On mongoose find query execution, response data as multiple objects, the real data is in _doc property or field, its only occurs in some scenario. I can handle the data by getting Obj._doc.something.
      return res.status(200).send({status: true, data:result})
}catch(error){
    res.status(500).send({status: false, msg:error.message})
}}

module.exports.createcollege=createcollege
module.exports.getdetailsofinterns=getdetailsofinterns