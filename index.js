import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL_random = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const API_URL_all = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
const API_URL_ID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", async (req, res) => {
    try {
        const letter = req.query.letter ? req.query.letter : "a";
        if (letter.match(/^[a-zA-Z]$/)) {
            const result = await axios.get(API_URL_all + letter);
            res.render("index", {
                content: result.data
            });
        } else {
            res.render("index", {
                content: { drinks: [] }
            });
        }
    } catch (error) {
        console.log(error);
        res.render("index", {
            content: { drinks: [] }
        });
    }
});

app.get("/random-drink" , async (req, res) => {
    try {
        const result = await axios.get(API_URL_random);
        res.render("random", {
            content : result.data
        });
    } catch (error) {
        console.log(error);
        res.render("drink", {
            content: {}
        });
    }
});

app.get("/drink/:idDrink", async (req, res) => {
    try {
        const { idDrink } = req.params;
        const result = await axios.get(API_URL_ID + idDrink);
        res.render("drink", {
            content: result.data
        });
    } catch (error) {
        console.log(error);
        res.render("drink", {
            content: {}
        });
    }
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});