import { Router } from "express";
import register from "./register.js";
import login from "./login.js";

const route = Router();


route.get("/", (req, res) => {
  console.log("ADMIN BASE HIT");
  res.send("ADMIN WORKING");
});


route.use("/register", register);


route.use("/login", login);

export default route;