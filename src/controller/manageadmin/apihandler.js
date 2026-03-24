import { Router } from "express";
import register from "./register.js";
import login from "./login.js";
import list from "./listadmin.js";
import update from "./updateadmin.js";
import filter from "./filteradmin.js";
import deleteAdmin from "./deleteadmin.js";

const route = Router();

route.get("/", (req, res) => {
  console.log("ADMIN BASE HIT");
  res.send("ADMIN WORKING");
});

route.use("/register", register);

route.use("/login", login);

route.use("/list", list);

route.use("/update", update);

route.use("/filter", filter);

route.use("/delete", deleteAdmin);
export default route;
