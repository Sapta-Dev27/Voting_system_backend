import Candidate from '../../models/candidate.js';

const fetchCandidateByIdController = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const fetchCandidate = await Candidate.findOne({
      _id: candidateId
    })

    if (fetchCandidate) {
      return res.status(200).json({
        success: true,
        message: "Candidate fetched successfully",
        candidate: fetchCandidate
      })
    }

    return res.status(404).json({
      success: false,
      message: "Candidate not found"
    })
  }
  catch (error) {
    console.log("Error in fetch candidate by ID controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default fetchCandidateByIdController