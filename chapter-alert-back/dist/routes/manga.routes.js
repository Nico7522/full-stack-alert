"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const mangaRoutes = (0, express_1.Router)();
mangaRoutes.get("/manga", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM manga");
        res.status(200).json({ data: result.rows });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});
mangaRoutes.post("/manga", async (req, res) => {
    try {
        const { title } = req.body;
        await db_1.default.query("INSERT INTO manga (title) VALUES ($1)", [title]);
        res.status(200).json({ message: "Le manga a bien été ajouté" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});
mangaRoutes.post("/subscribeforalert", async (req, res) => {
    try {
        const { mail, title } = req.body;
        const mailId = await db_1.default.query("SELECT id from usermail WHERE mail = $1", [
            mail,
        ]);
        const mangaId = await db_1.default.query("SELECT id FROM manga where title = $1", [
            title,
        ]);
        await db_1.default.query("INSERT INTO usermail_manga (usermail_id, manga_id) VALUES ($1, $2)", [mailId.rows[0].id, mangaId.rows[0].id]);
        res
            .status(200)
            .json({ message: "Vous serez maintenant alerté à la prochaine sortie" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});
exports.default = mangaRoutes;
