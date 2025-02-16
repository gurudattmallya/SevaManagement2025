import express from "express";
import { Roles } from "../models/roles.model.js";

const router = express.Router();

router.get("/:entityCode", async (req, res) => {
    try {
        const { entityCode } = req.params;
        const roles = await Roles.getRoles(entityCode);
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching roles.");
    }
});

router.post("/", async (req, res) => {
    try {
        const { entityId, roleName, description, permissions, crBy } = req.body;
        const result = await Roles.addRole({ entityId, roleName, description, permissions, crBy });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating role.");
    }
});

router.put("/:entityCode/:roleId", async (req, res) => {
    try {
        const { entityCode, roleId } = req.params;
        const { roleName, description, permissions, moBy } = req.body;
        const result = await Roles.updateRole(entityCode, roleId, { roleName, description, permissions, moBy });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating role.");
    }
});

export default router;
