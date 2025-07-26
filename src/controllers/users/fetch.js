import Candidate from '../../models/candidate.js';

const fetchCandidatesController = async (req, res) => {
  try {
    const fetchCandidates = await Candidate.find();
    if (fetchCandidates.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Candidates fetched successfully",
        candidates: fetchCandidates
      })
    }
    return res.status(404).json({
      success: false,
      message: "No candidates found"
    })
  }
  catch (error) {
    console.log("Error in fetch candidates controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default fetchCandidatesController;