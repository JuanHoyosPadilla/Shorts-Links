import express from "express";
import { nanoid } from "nanoid";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const urlDataBase = new Map();

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const port = process.env.PORT || 3000;

app.post("/acortar", (req, res) => {
  //const urlOriginal = req.body;
  const urlOriginal = req.body.link

  
  const shortUrl = nanoid(8);

  // console.log(urlOriginal.link)

  urlDataBase.set(shortUrl, urlOriginal);

  //const extraerUrl = JSON.stringify(urlOriginal);
  //const regexUrl = /https:\/\/[^\s/]+/g;
  //const urlEncontrada = extraerUrl.match(regexUrl);

  //console.log(urlEncontrada)

 // const urlexample = `${urlEncontrada}/${shortUrl}`;
  //console.log(urlexample)
  const urlexample = `${baseUrl}/${shortUrl}`;
  res.json({ urlexample });
});

app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl)
  const urlOriginal = urlDataBase.get(shortUrl);

  console.log(urlOriginal);
  if (urlOriginal) {
    res.redirect(urlOriginal);
  } else {
    res.status(404).send("URL no encontrada");
  }
});

app.listen(port, () => {
  console.log("server perfect");
});
