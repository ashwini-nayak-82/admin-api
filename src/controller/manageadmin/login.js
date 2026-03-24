import { Router } from "express";
import initAdminModel from "../../model/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return send(
        res,
        setErrmsg(RESPONSE.REQUIRED, "Email and Password are required")
      );
    }

    const Admin = await initAdminModel();

    const admin = await Admin.findOne({
      where: { email },
    });

    if (!admin) {
      return send(
        res,
        setErrmsg(RESPONSE.ERROR, "Admin not found")
      );
    }

    const isMatch = await bcrypt.compare(
      String(password),
      admin.password
    );

    if (!isMatch) {
      return send(
        res,
        setErrmsg(RESPONSE.ERROR, "Invalid password")
      );
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    return send(res, RESPONSE.SUCCESS, { token });
  } catch (error) {
    return send(
      res,
      setErrmsg(RESPONSE.ERROR, error.message)
    );
  }
});

export default router;