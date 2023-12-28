import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// ROUTE -> GET ALL SUPPORT REQUESTS
// ONLY AMS COORDINATOR CAN ACCESS THIS ROUTE, BECAUSE HE CAN SEE ALL SUPPORT REQUESTS
router.get('/solicitacoes-de-suporte', async (req, res) => {
    try {
        // GET ALL SUPPORT REQUESTS FROM DATABASE
        const supportRequests = await prisma.solicitacaoSuporte.findMany({
            include: {
                Resposta: true
            }
        })

        return res.json({
            msg: "Listar solicitações de suporte",
            supportRequests
        })
    } catch(error) {
        return res.status(500).json({
            msg: "Listar solicitações de suporte",
            error
        })
    }
})

// ROUTE - GET SUPPORT REQUESTS FROM A SPECIFIC STUDENT
router.get('/aluno/:studentId/solicitacoes-de-suporte', async (req, res) => {
    try {
        // GET STUDENT ID
        const { studentId } = req.params

        // GET ONLY SUPPORT REQUESTS WHOSE CREATOR IS THE STUDENT WHO HAS THE ID PROVIDED
        const studentSupportRequests = await prisma.solicitacaoSuporte.findMany({
            where: {
              codAluno: Number(studentId),
            },
            include: {
              Resposta: true,
            },
          })

          return res.json({
            msg: "Listar solicitações de suporte do aluno",
            studentSupportRequests
          })
    } catch(error) {
        return res.status(500).json({
            msg: "Listar solicitações de suporte do aluno",
            error
        })
    }
})

export default router