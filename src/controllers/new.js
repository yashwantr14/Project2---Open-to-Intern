
const collegemodel=require("../models/collegeModel")

const getdetailsofinterns=async function(req,res){
    const collegeName=req.query.collegeName
    if(!collegeName) return res.status(400).send({status: false, msg:"Please provide college name"})

    const college=await collegemodel.findOne({name:collegeName})
    if(!college) return res.status(404).send({status:false, msg:"College not found"})

    return res.status(200).send({status:true, msg: college})
}

module.exports.getdetailsofinterns=getdetailsofinterns