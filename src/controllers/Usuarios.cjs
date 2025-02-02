const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios.cjs");

require('dotenv').config();

// Função para realizar logout e limpar o cookie de autenticação
function sair(req, res) {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });
    res.json({ message: 'Logout realizado com sucesso!' });
}

// Função para autenticar o usuário da demonstração
async function entrarDemo(req, res) {
    try {
        // Busca o usuário
        const usuario = await Usuarios.findOne({ usuario: process.env.DEMO_USERNAME });

        if (!usuario) {
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        // Verifica se a senha fornecida é válida
        const senhaValida = await bcrypt.compare(process.env.DEMO_PASSWORD, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: "Credenciais inválidas." });
        }

        // Gera um token JWT para autenticação
        const token = jwt.sign({ id: usuario._id, usuario: usuario.usuario }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Configura o cookie de autenticação
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000, // 1 hora
        });

        // Retorna mensagem de boas-vindas e o código da organização do usuário
        res.status(200).json({ message: `Bem-vindo(a) à demonstração do Saturn Analytics!`, cnes: usuario.cd_cnes_empresa });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor." });
    }
}

// Exporta todas as funções para uso em outros módulos
module.exports = { sair, entrarDemo };
