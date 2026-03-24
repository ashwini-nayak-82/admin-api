import { Router } from "express";
import initAdminModel from "../../model/admin.js";
import bcrypt from "bcrypt";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log("ADMIN REGISTER HIT");
    console.log("BODY:", req.body);

    const { name, email, password, phone, gender, address } = req.query || {};

    if (!name || !email || !password || !phone || !gender || !address) {
      return send(
        res,
        setErrmsg(RESPONSE.BAD_REQUEST, "All fields are required"),
      );
    }

    const Admin = await initAdminModel();

    const existingAdmin = await Admin.findOne({
      where: { email },
    });

    if (existingAdmin) {
      return send(res, setErrmsg(RESPONSE.ERROR, "Admin already exists"));
    }

 
    const hashedPassword = await bcrypt.hash(String(password), 10);


    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      address,
    });

    
    const adminData = newAdmin.toJSON();
    delete adminData.password;


    return send(res, RESPONSE.SUCCESS, adminData);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default router;
