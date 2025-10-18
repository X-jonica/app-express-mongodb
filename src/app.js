const express = require("express");
const { openConnection } = require("./config/db");
const routesUser = require("./routes/user.route");

const port = process.env.PORT || 4000;
const app = express();

/**
 * Analyse les données envoyées par un formulaire HTML (application/x-www-form-urlencoded)
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", routesUser)

app.get("/", (req, res) => {
    res.send("Hello les looser!");
});

app.listen(port, () => {
    openConnection("mongodb://127.0.0.1:27017/", (error) => {
        if (error) {
            console.log("Connection database error !", error);
            process.exit(-1);
        } else {
            console.log("Connection database successful !");
        }
    });
    console.log(`Application demarer sous : http://localhost:${port}`);
});
