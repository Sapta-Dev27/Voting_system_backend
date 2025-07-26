import Candidate from '../../models/candidate.js';

const addCandidateController = async(req , res) => {
  try {
     const { candidatename, candidateparty } = req.body;

     if( candidatename === undefined || candidateparty === undefined) {
      return res.status(400).json({
        success : false ,
        message : "Please provide all the required fields"
      })
     }

     const addCandidate = await Candidate.create({
      candidateName : candidatename,
      candidateParty : candidateparty,
     })

     if(addCandidate) {
      return res.status(201).json({
        success : true ,
        message : "Candidate added successfully",
        data : addCandidate
      })
     }

     return res.status(400).json({
      success : false ,
      message : "Failed to add candidate"
     })
  }
  catch(error) {
    console.log("Error in add candidate controller: ", error);
    return res.status(500).json({
      success : false ,
      message : "Internal Server Error"
    })
  }
}

export default addCandidateController