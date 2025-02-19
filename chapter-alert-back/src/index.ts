import express from "express";
import mailRoutes from "./routes/mail.routes";
import mangaRoutes from "./routes/manga.routes";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use(mailRoutes);
app.use(mangaRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
