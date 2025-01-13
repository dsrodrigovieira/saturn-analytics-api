const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Importa middleware e modelo de dados
const transporter = require("../middleware/mailTransporter.cjs");
const User = require("../models/Users.cjs");

require('dotenv').config();

// Função para registrar um novo usuário
async function registerNewUser(req, res) {
    const { username, email, fullname, password } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!username || !email || !fullname || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        // Verifica se já existe um usuário com o mesmo username ou email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: "Usuário ou email já estão em uso." });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const newUser = new User({ username, email, fullname, password: hashedPassword });

        // Salva o novo usuário no banco de dados
        await newUser.save();

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

// Função para excluir um usuário
async function deleteUser(req, res) {
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!password || !email) {
        return res.status(400).json({ message: "Informe o Email e a Senha para exclusão." });
    }

    try {
        // Busca o usuário
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // Verifica se a senha fornecida é válida
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Senha incorreta." });
        }

        // Exclui o usuário do banco de dados
        await User.deleteOne({ email });

        return res.status(200).json({ message: `Usuário ${existingUser.fullname} (${existingUser.username}) excluído com sucesso` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

// Função para autenticar um usuário
async function signInUser(req, res) {
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
        // Busca o usuário
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        // Verifica se a senha fornecida é válida
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        // Gera um token JWT para autenticação
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Configura o cookie de autenticação
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000, // 1 hora
        });

        // Retorna mensagem de boas-vindas e o código da organização do usuário
        res.status(200).json({ message: `Bem-vindo(a) ${user.fullname}!`, cnes: user.organization_cnes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

// Função para solicitar redefinição de senha
async function requestResetUserPassword(req, res) {
    const { email } = req.body;

    // Verifica se o email foi fornecido
    if (!email) {
        return res.status(400).json({ message: "Email é obrigatório." });
    }

    try {
        // Busca o usuário
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Gera um token de redefinição de senha
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Salva o token e sua validade no banco de dados
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        // Envia um email com o link de redefinição de senha
        const resetURL = `http://${req.headers.host}/reset-password/${resetToken}`;

        await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Redefinição de Senha",
            html: `
                <h4>Você solicitou a redefinição de senha</h4>
                <p>Clique no link abaixo para redefinir sua senha:</p>
                <a href="${resetURL}">${resetURL}</a>
                <p>O link expira em 1 hora.</p>
            `,
        });

        res.json({ message: "Email de redefinição de senha enviado!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao processar solicitação." });
    }
}

// Função para redefinir a senha do usuário
async function resetUserPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    // Verifica se a senha foi fornecida
    if (!password) {
        return res.status(400).json({ message: "Senha é obrigatória." });
    }

    try {
        // Busca o usuário pelo token de redefinição de senha
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Verifica se o token ainda é válido
        });

        if (!user) {
            return res.status(400).json({ message: "Token inválido ou expirado." });
        }

        // Atualiza a senha do usuário e remove o token de redefinição
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Senha redefinida com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao redefinir senha." });
    }
}

// Função para buscar um usuário pelo username ou email
async function getUser(req, res) {
    const { username, email } = req.body;

    // Verifica se pelo menos um dos parâmetros foi fornecido
    if (!username && !email) {
        return res.status(400).json({ message: "Informe o Usuário ou Email." });
    }

    try {
        // Busca o usuário
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (!existingUser) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // Retorna os dados do usuário
        return res.status(200).json(existingUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

// Função para realizar logout e limpar o cookie de autenticação
function logoff(req, res) {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });
    res.json({ message: 'Logout realizado com sucesso!' });
}

// Exporta todas as funções para uso em outros módulos
module.exports = { registerNewUser, deleteUser, signInUser, requestResetUserPassword, resetUserPassword, getUser, logoff };
