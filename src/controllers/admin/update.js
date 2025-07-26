import Candidate from "../../models/candidate.js";

const updateCandidateController = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const { candidatename, candidateparty } = req.body;
    if (candidatename == undefined || candidateparty == undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields"
      })
    }
    const checkCandidate = await Candidate.findById(candidateId);
    if (!checkCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate Not Found"
      })
    }

    const updateCandidate = await Candidate.findByIdAndUpdate(candidateId, {
      candidateName: candidatename,
      candidateParty: candidateparty
    })

    if (updateCandidate) {
      return res.status(200).json({
        success: true,
        message: "Candidate updated successfully",
        updated_candidate: updateCandidate
      })
    }

    return res.status(400).json({
      success: false,
      messsage: "Update of candidate failed"
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default updateCandidateController;