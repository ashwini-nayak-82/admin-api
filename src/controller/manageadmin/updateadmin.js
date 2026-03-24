import { send, setErrmsg } from "../../helper/responsehelper.js";
import { RESPONSE } from "../../config/global.js";
import { Router } from "express";
import initadminmodel from "../../model/admin.js";

const route = Router();

route.put("/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return send(res, setErrmsg(RESPONSE.ERROR, "Request body is missing"));
  }

  const { name } = req.body;

  try {
    const admin = await initadminmodel();

    const [updated] = await admin.update({ name: name }, { where: { id: id } });

    if (updated) {
      return send(
        res,
        setErrmsg(RESPONSE.SUCCESS, "Admin updated successfully"),
      );
    } else {
      return send(res, setErrmsg(RESPONSE.ERROR, "Admin not found"));
    }
  } catch (error) {
    return send(res, setErrmsg(RESPONSE.ERROR, error.message));
  }
});

export default route;
