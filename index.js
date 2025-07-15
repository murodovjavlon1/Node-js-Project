// import express from 'express';
import express from 'express';
import { create } from 'express-handlebars';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import varMiddleware from './middileware/var.js';
import userMiddleware from './middileware/user.js';
import hbsHelper from './utils/index.js';

// ROUTES
import AuthRoutes from './routing/auth.js';
import ProductsRoutes from './routing/products.js';

dotenv.config();

const app = express();

// Handlebars sozlamalari
const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: hbsHelper
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'Sammi',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

// Routes
app.use(AuthRoutes);
app.use(ProductsRoutes);

// Serverni ishga tushirish
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
