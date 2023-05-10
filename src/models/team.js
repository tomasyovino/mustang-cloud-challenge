import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
    position: { type: String, required: true},
    imgUrl: { type: String, required: true},
    name: { type: String, required: true},
    playedMatches: { type: String, required: true},
    wins: { type: String, required: true},
    draws: { type: String, required: true},
    loses: { type: String, required: true},
    goalsFor: { type: String, required: true},
    goalsAgainst: { type: String, required: true},
    goalDifference: { type: String, required: true},
    points: { type: String, required: true}
}, { timestamps: true });

export const TeamModel = mongoose.model("Team", teamSchema);