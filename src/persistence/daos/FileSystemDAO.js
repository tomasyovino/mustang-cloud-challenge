import fs from "fs";

let instance = null;

class FileSystemDAO {
    constructor(filePath) {
        this.path = filePath;
    };

    static createInstance(filePath) {
        if (!instance) {
            instance = new FileSystemDAO(filePath);
        };
        return instance;
    };

    async getJSONFile() {
        try {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error getting JSON file: ', error);
        };
    };

    async createJSONFile(data) {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(this.path, jsonData);
            console.log('JSON file created successfully!');
        } catch (error) {
            console.error('Error creating JSON file: ', error);
        };
    };
};

export default FileSystemDAO;