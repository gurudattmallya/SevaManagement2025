import express from "express";
import { Users } from "../models/tusers.model.js";

const router = express.Router();

router.get("/:entityCode", async (req, res) => {
    try {
        const { entityCode } = req.params;
        const users = await Users.getUsers(entityCode);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users.");
    }
});

router.post("/", async (req, res) => {
    try {
        const { entityId, userId, userName, password, roleId, crBy } = req.body;
        const result = await Users.addUser({ 
            entityId, 
            userId, 
            userName, 
            password, 
            roleId, 
            crBy 
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user.");
    }
});

router.put("/:entityCode/:userId", async (req, res) => {
    try {
        const { entityCode, userId } = req.params;
        const { userName, roleId, password, moBy } = req.body;
        const result = await Users.updateUser(entityCode, userId, { 
            userName, 
            roleId, 
            password, 
            moBy 
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user.");
    }
});

router.delete("/:entityCode/:userId", async (req, res) => {
    try {
        const { entityCode, userId } = req.params;
        await Users.deleteUser(entityCode, userId);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user.");
    }
});

export default router;
