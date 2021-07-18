import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { resolve } from "path";
import { setupImageRoutes } from "./routes/images";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config({ path: resolve(__dirname, "../.env") })
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));
app.use('/images', express.static(resolve(__dirname, '../public/uploads')));

// Routes
setupImageRoutes(app)

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
