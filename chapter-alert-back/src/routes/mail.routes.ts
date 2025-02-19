import { Router, Request, Response } from "express";
import pool from "../db";
const mailRoutes = Router();

mailRoutes.get("/mail", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM usermail");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log("Error : ", error);
  }
});

mailRoutes.get("/subscribedmail", async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    console.log(title);

    const result = await pool.query(
      "SELECT mail FROM usermail JOIN usermail_manga ON usermail.id = usermail_manga.usermail_id JOIN manga ON usermail_manga.manga_id = manga.id WHERE title = $1",
      [title]
    );
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log("Error : ", error);
  }
});

mailRoutes.post("/mail", async (req: Request, res: Response) => {
  try {
    let { mail } = req.body;
    const result = await pool.query("INSERT INTO usermail (mail) VALUES ($1)", [
      mail,
    ]);
    res.status(200).json({ message: "L'adresse email a bien été enregistrée" });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue" });
  }
});

mailRoutes.delete("/mail", async (req: Request, res: Response) => {
  try {
    let { mail } = req.body;
    const result = await pool.query("DELETE FROM usermail WHERE mail = ($1)", [
      mail,
    ]);
    res.status(200).json({ message: "Votre email a bien été supprimé" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Une erreur est survenue" });
  }
});

export default mailRoutes;
