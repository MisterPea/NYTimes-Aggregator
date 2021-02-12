const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8090;

app.use(cors());

const nyt_api = require("./routes/nyt_api");
app.use("/", nyt_api);

app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`)
});