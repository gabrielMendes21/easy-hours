import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router()
router.use(express.json())

// ROUTE -> GET TOKEN AND AUTHENTICATE USER
router.get('/login', (req, req) => {
    try {
        const token = req.header('Authorization'); 
        // TOKEN EXAMPLE -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZha2UgdG9rZW4ifQ.trP3D1SaUqAUDYZT1JW83L-ampDJgKZKZiVld54J-Gg

        // IF THE CLIENT DOES NOT PROVIDE A TOKEN, THE AUTH WILL FAIL
        if (!token) return res.status(401).json({ msg: "authentication -> unauthorized" });
    
        // IF TOKEN WAS PROVIDED, JWT WILL VERIFY IF IT IS CORRECT AND WILL RETURN THE USER INFORMATION
        jwt.verify(token, 'DEV', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
    
        res.json(user)
        next();
        });
    } catch(error) {
        return res.status(500).json({
            msg: "authentication",
            error
        })
    }
})