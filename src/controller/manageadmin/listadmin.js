import { Router } from "express";
import initAdminModel from "../../model/admin.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("LIST ADMIN HIT");

    const adminmodel = await initAdminModel();
    const admins = await adminmodel.findAll();

    return res.json({
      message: "Success",
      data: admins,
    });
  } catch (err) {
    console.log(err);
    return send(
      res,
      setErrmsg(RESPONSE.ERROR, message)
    );
     
  }
});

export default router;
