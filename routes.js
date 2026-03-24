import adminHandler from "./src/controller/manageadmin/apihandler.js";

const router = (app) => {
  console.log("ROUTES WORKING");
  app.use("/admin", adminHandler);
};

export default router;
