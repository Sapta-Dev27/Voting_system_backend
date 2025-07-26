import User from '../../models/user.js';
import Candidate from '../../models/candidate.js';

const voteController = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const userrole = req.userInfo.userRole_from_access_token;
    if (userrole === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admins are not allowed to vote"
      })
    }

    const userId = req.userInfo.userId;
    const checkUser = await User.findById(userId);
    const votingStatus = checkUser.votingStatus;
    if (votingStatus === 'true') {
      return res.status(403).json({
        success: false,
        message: "You have already voted"
      })
    }
    const findCandidate = await Candidate.findOne({
      _id: candidateId
    })

    if (!findCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      })
    }
     findCandidate.candidateVoteCount +=1;
     await findCandidate.save();

     const user = await User.findOne({
      _id : userId
     })
     
     user.votingStatus = "true";
     await user.save();

     return res.status(200).json({
      success : true ,
      message : ' Vote casted successfully',
      candidate : findCandidate,
      user : {    
        userId: user._id,
        userName: user.userName,
        userRole: user.userRole,
        votingStatus: user.votingStatus
      }
     })


  }
  catch (error) {
    console.log("Error in vote controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

export default voteController