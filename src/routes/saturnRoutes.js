import express from "express";
import moment from "moment-timezone";
import { listarTodosKPIs, buscaKPI } from "../controllers/kpisController.js";
import { buscaUsuario, listarTodosusuarios } from "../controllers/usersController.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Configurações para o CORS (Cross-Origin Resource Sharing) - Habilita requisições de outras origens.
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// Limite de requisições (anti-brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições
  message: "Muitas requisições, tente novamente mais tarde.",
});


/**
 * Rota raiz da aplicação.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export function index(req, res) {
  res.status(200).send("Raíz da rota");
};

// Função para definir as rotas da aplicação.
const routes = (app) => {
  // Middleware de segurança e parse de JSON
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(limiter);

  // Configuração JWT
  const SECRET_KEY = process.env.JWT_SECRET || "minha_chave_secreta";

  // Habilita o CORS com as configurações definidas em corsOptions.
  //app.use(cors(corsOptions));

  // Rota raiz ("/")
  app.get("/", (req, res) => res.send(`Bem-vindo. Acesso em ${moment.tz(process.env.TIMEZONE).toDate()}`));

  // Rota de Registro
  app.post("/register", async (req, res) => {
    const { username, email, fullname, password } = req.body;

    if (!username || !email|| !fullname || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ $or: [{ nome:username }, { email:email }] });

      if (existingUser) {
        return res.status(400).json({ message: "Usuário ou email já estão em uso." });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário
      const newUser = new User({ username, email, fullname, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }
  });

  // Rota de Login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Credenciais inválidas." });
      }

      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Credenciais inválidas." });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ message: "Login bem-sucedido!", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor." });
    }
  });









  // Rota para listar todos os KPIs ("/kpis") - Chama a função `listarTodosKPIs` do controlador de KPIs.
  app.get("/kpis", listarTodosKPIs);

  // Rota para recuperar um KPI existente ("/kpis/:id") - 
  // - O ":id" define um parâmetro dinâmico na URL.
  // - Chama a função `buscaKPI` do controlador de KPIs.
  app.get("/kpis/:id", buscaKPI);

  // Rota para listar todos os usuários ("/users") - Chama a função `listarTodosUsuarios` do controlador de usuários.
  app.get("/users", listarTodosusuarios);

  // Rota para recuperar um usuário existente ("/users/:id") - 
  // - O ":id" define um parâmetro dinâmico na URL.
  // - Chama a função `buscaUsuario` do controlador de usuários.
  app.get("/users/:id", buscaUsuario);
};

export default routes;