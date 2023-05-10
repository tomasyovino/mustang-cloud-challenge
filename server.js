import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
import { myCron } from "./scrapping.js";
import { DBConnect } from "./src/utils/db.js";
import config from "./src/utils/config.js";
import router from "./src/routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(path.dirname(""), "./src/views"));
app.engine(
    ".hbs",
    exphbs.engine({
        defaultLayout: "index",
        layoutsDir: path.join(app.get("views"), "layouts"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
app.use("/", router);

(async () => {
    try {
        await DBConnect(config.mongo_uri);
        console.log("Connected to database");

        app.listen(config.port, () => console.log(`Server ready at http://localhost:${config.port}`));
    } catch (error) {
        console.error("Error starting the server: ", error);
    };
})();