import { Router, Request, Response } from "express";
import pool from "../db";

const mangaRoutes = Router();
mangaRoutes.get("/manga", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM manga");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Une erreur est survenue" });
  }
});

mangaRoutes.post("/manga", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    await pool.query("INSERT INTO manga (title) VALUES ($1)", [title]);
    res.status(200).json({ message: "Le manga a bien été ajouté" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Une erreur est survenue" });
  }
});

mangaRoutes.post("/subscribeforalert", async (req: Request, res: Response) => {
  try {
    const { mail, title } = req.body;
    const mailId = await pool.query("SELECT id from usermail WHERE mail = $1", [
      mail,
    ]);
    const mangaId = await pool.query("SELECT id FROM manga where title = $1", [
      title,
    ]);
    await pool.query(
      "INSERT INTO usermail_manga (usermail_id, manga_id) VALUES ($1, $2)",
      [mailId.rows[0].id, mangaId.rows[0].id]
    );
    res
      .status(200)
      .json({ message: "Vous serez maintenant alerté à la prochaine sortie" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Une erreur est survenue" });
  }
});

export default mangaRoutes;
