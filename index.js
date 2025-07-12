import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { create } from "express-handlebars";
import AuthRoutes from "./routing/auth.js";
import ProductsRoutes from "./routing/products.js";

// Environment variables yuklaymiz
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Handlebars sozlamalari
const hbs = create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(AuthRoutes);
app.use(ProductsRoutes);

// MongoDB URI ni tekshirish
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
    console.error('MONGO_URL .env faylida topilmadi!');
    process.exit(1);
}
 
// MongoDB ga ulanish
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB ga muvaffaqiyatli ulanildi'))
    .catch(err => {
        console.error('MongoDB ulanish xatosi:', err);
        process.exit(1);
    });

// Server ishga tushirish
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
});

