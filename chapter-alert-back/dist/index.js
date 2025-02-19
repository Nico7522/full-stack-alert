"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_routes_1 = __importDefault(require("./routes/mail.routes"));
const manga_routes_1 = __importDefault(require("./routes/manga.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(mail_routes_1.default);
app.use(manga_routes_1.default);
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
