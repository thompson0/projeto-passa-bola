import User from "../models/User.js";
import Player from "../models/Player.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  static async register(req, res) {
    // Função para registrar, definindo que todos os campos vão ser passados pelo corpo da requisição
    const { username, email, password, role, height, age, position } = req.body;
    try {
      // Tratativa de erro para ver se o usuario já existe
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).send({ message: "User already exists" });
      // Criptografando senha da usuaria
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criando a variavel de nova usuaria, e verificando se ela é jogadora ou usuaria normal
      let newUser;
      if (role === "Player") {
        // Caso for jogadora, terá os campos das jogadoras, se não, terá os campos padrão da usuaria
        newUser = new Player({
          username,
          email,
          password: hashedPassword,
          height,
          age,
          position,
        });
      } else {
        newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
      }

      await newUser.save();
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async login(req, res) {
    // Função de login passando os campos de email e senha pelo corpo da requisição
    const { email, password } = req.body;
    try {
      // Encontrando o usuario no banco, e verificando se ele existe lá
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send({ message: "User not found" });
      // Validando senha que foi registrada com a que ele passa no login
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res
          .status(400)
          .send({ message: "The password must be the same" });

      // Criando o token jwt após fazer o login
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).send({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          position: user.position,
          height: user.height,
          age: user.age,
        },
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export default AuthController;
