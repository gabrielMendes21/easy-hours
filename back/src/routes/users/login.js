import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import checkUserCredentials from '../../utils/checkUserCredentials.js';

dotenv.config()

const router = express.Router()
router.use(express.json())

// ROUTE -> GET TOKEN AND AUTHENTICATE USER
router.get('/login', (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1]; 
        // TOKEN EXAMPLE -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZha2UgdG9rZW4ifQ.trP3D1SaUqAUDYZT1JW83L-ampDJgKZKZiVld54J-Gg

        // IF THE CLIENT DOES NOT PROVIDE A TOKEN, THE AUTH WILL FAIL
        if (!token) return res.status(401).json({ msg: "Autenticação -> não autorizado" });
    
        // IF TOKEN WAS PROVIDED, JWT WILL VERIFY IF IT IS CORRECT AND WILL RETURN THE USER INFORMATION
        jwt.verify(token, 'DEV', (err, user) => {
            if (err) return res.status(401).json({ message: 'Token inválido' });
        
            res.json({
                msg: "Autenticação",
                user
            })
        });
    } catch(error) {
        return res.status(500).json({
            msg: "Autenticação",
            error
        })
    }
})

// ROUTE -> CREATE A LOGIN SESSION
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const correctCredentials = await checkUserCredentials(email, password)

        if (correctCredentials) {
            const token = jwt.sign(
                {
                  nome: correctCredentials.nome,
                  email: correctCredentials.email,
                  turma: correctCredentials.turma,
                  escola: correctCredentials.escolaRel,
                  tipoUsuario: correctCredentials.role,
                },
                process.env.TOKENSECRET,
                {
                  subject: correctCredentials.id.toString(),
                  expiresIn: '7 days',
                },
              )

              return res.json(token)
        } else {
            return res.status(401).json({
                msg: "Login -> Informações incorretas",
            })
        }
    } catch(error) {
        return res.status(500).json({
            msg: "Login",
            error
        })
    }
})

export default router