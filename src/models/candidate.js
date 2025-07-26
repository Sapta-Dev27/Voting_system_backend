import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  candidateName : {
    type : String ,
    required : true 
  } ,
  candidateParty : {
    type : String ,
    required : true 
  },
  candidateVoteCount : {
    type : Number ,
    default : 0
  }
})

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
