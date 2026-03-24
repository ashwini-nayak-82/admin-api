import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
import { Router } from "express";
import initAdminModel from "../../model/admin.js";

const route = Router();

route.delete("/:id", async (req, res) => {
  try {
    const Admin = await initAdminModel();
    const { id } = req.params;

    const deleted = await Admin.destroy({
      where: { id },
    });

    if (!deleted) {
      return send(
        res,
        setErrmsg(RESPONSE.ERROR, "Admin not found")
      );
    }

    return send(res, RESPONSE.SUCCESS, "Admin deleted successfully");
  } catch (error) {
    return send(
      res,
      setErrmsg(RESPONSE.ERROR, error.message)
    );
  }
});

export default route;