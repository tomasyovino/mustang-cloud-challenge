import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mongo_uri: process.env.MONGO_URI,
    url_to_parse: process.env.URL_TO_PARSE,
    file_path: process.env.FILE_PATH,
    cron_time: process.env.CRON_TIME
};

export default config;