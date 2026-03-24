import express from "express";
import router from "./routes.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send("Server running");
});

router(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});