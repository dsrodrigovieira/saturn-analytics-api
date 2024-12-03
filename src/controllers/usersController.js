import { getTodosUsuarios, getUsuario } from "../models/saturnModel.js";

export async function registerNewUser(req, res) {
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
}



/**
 * Rota para listar todos os usuários.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function listarTodosusuarios(req, res) {
    try {
        const resultados = await getTodosUsuarios();
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};

/**
 * Rota para buscar um usuário.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 */
export async function buscaUsuario(req, res) {
    try {
        // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
        const id = req.params.id;
        const resultados = await getUsuario(id);
        res.status(200).json(resultados);
    } catch(erro) {
        // Caso ocorra algum erro durante o processo , loga o erro no console e retorna
        // uma resposta HTTP 500 com uma mensagem genérica de erro.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
};