"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const mailRoutes = (0, express_1.Router)();
mailRoutes.get("/mail", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM usermail");
        res.status(200).json({ data: result.rows });
    }
    catch (error) {
        console.log("Error : ", error);
    }
});
mailRoutes.get("/subscribedmail", async (req, res) => {
    try {
        const { title } = req.query;
        console.log(title);
        const result = await db_1.default.query("SELECT mail FROM usermail JOIN usermail_manga ON usermail.id = usermail_manga.usermail_id JOIN manga ON usermail_manga.manga_id = manga.id WHERE title = $1", [title]);
        res.status(200).json({ data: result.rows });
    }
    catch (error) {
        console.log("Error : ", error);
    }
});
mailRoutes.post("/mail", async (req, res) => {
    try {
        let { mail } = req.body;
        const result = await db_1.default.query("INSERT INTO usermail (mail) VALUES ($1)", [
            mail,
        ]);
        res.status(200).json({ message: "L'adresse email a bien été enregistrée" });
    }
    catch (error) {
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});
mailRoutes.delete("/mail", async (req, res) => {
    try {
        let { mail } = req.body;
        const result = await db_1.default.query("DELETE FROM usermail WHERE mail = ($1)", [
            mail,
        ]);
        res.status(200).json({ message: "Votre email a bien été supprimé" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});
exports.default = mailRoutes;
