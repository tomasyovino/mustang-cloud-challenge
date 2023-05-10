import MongoDBDAO from "../persistence/daos/MongoDBDAO.js";
import FileSystemDAO from "../persistence/daos/FileSystemDAO.js";
import config from "../utils/config.js";

const mongoDBDAO = MongoDBDAO.createInstance();
const fileSystemDAO = FileSystemDAO.createInstance(config.file_path);

export const FSCreateJSONFile = async (data) => {
    try {
        return await fileSystemDAO.createJSONFile(data);
    } catch (error) {
        console.log(error);
    };
};

export const FSGetJSONFile = async () => {
    try {
        return await fileSystemDAO.getJSONFile();
    } catch (error) {
        console.log(error);
    };
};

export const MDBAddDataAsRequired = async (data) => {
    try {
        return await mongoDBDAO.addDataAsRequired(data);
    } catch (error) {
        console.log(error);
    };
};

export const MBGetData = async () => {
    try {
        return await mongoDBDAO.getData();
    } catch (error) {
        console.log(error);
    };
};