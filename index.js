import express from "express";
import path  from "path";
import {fileURLToPath} from "url";
import { create} from "express-handlebars"
import AuthRoutes from "./routing/auth.js"
import ProductsRoutes from "./routing/products.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const hbs = create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine); 
app.set("view engine", "hbs"); 
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))

app.use(AuthRoutes)
app.use(ProductsRoutes)





const PORT = process.env.PORT || 4100
app.listen(4100, ()=>{console.log(`Server is Running on PORT: ${PORT}`)})