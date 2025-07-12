import { Router } from "express";
import User from "../model/user.js";
import bcryot from "bcrypt"

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register"
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exisUser = await User.findOne({ email });
    if (!exisUser) {
      console.log("Foydalanuvchi yo‘q");
      return res.status(400).send("Email topilmadi");
    }

    const isPassEqual = await bcrypt.compare(password, exisUser.password);
    if (!isPassEqual) {
      console.log("Noto‘g‘ri parol");
      return res.status(400).send("Parol noto‘g‘ri");
    }

    console.log("Login muvaffaqiyatli:", exisUser.email);
    return res.redirect("/");
  } catch (err) {
    console.error("Login xatolik:", err);
    return res.status(500).send("Serverda xatolik");
  }
});


router.post("/register", async (req, res)=>{
  const hashedPassword = await bcryot.hash(req.body.password, 10)
  console.log(req.body)
  const userData ={
    firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
  }
  const user = await User.create(userData)
  res.redirect("/")

})

export default router;
