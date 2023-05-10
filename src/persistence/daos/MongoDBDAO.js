import mongoose from "mongoose";
import { TeamModel } from "../../models/team.js";

let instance = null;

class MongoDBDAO {

    static createInstance() {
        if (!instance) {
            instance = new MongoDBDAO();
        };
        return instance;
    };

    async addDataAsRequired(data) {
        await mongoose.connection.db.dropDatabase();
        TeamModel.insertMany(data);
    };

    async getData() {
        const data = await TeamModel.find().lean();
        return data;
    };
};

export default MongoDBDAO;