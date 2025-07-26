import Candidate from '../../models/candidate.js';

const deleteCandidateController = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const checkCandidate = await Candidate.findById(candidateId);
    if (!checkCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate Not Found"
      })
    }
    const deleteCandidate = await Candidate.findByIdAndDelete(candidateId);
    if (deleteCandidate) {
      return res.status(200).json({
        success: true,
        message: "Candidate deleted successfully",
        deleted_candidate: deleteCandidate
      })
    }
    return res.status(400).json({
      success: false,
      message: "Deletion of candidate failed"
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

export default deleteCandidateController;