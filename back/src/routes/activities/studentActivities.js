import express from 'express'
import prisma from '../../lib/prisma.js'

const router = express.Router()

// ROUTE -> GET ALL STUDENT ACTIVITIES
router.get('/student/:id/activities', async (req, res) => {
    try {
        // GET STUDENT WITH THE ID PROVIDED
        const { id: studentId } = req.params

        const student = await prisma.usuario.findUnique({
            where: {
                id: Number(studentId),
                AND: {
                    role: 'STUDENT'
                }
            }
        })

        // VERIFY IF STUDENT EXISTS
        if (student) {
            // GET ALL ACTIVITIES WITH THE ID
            const activities = await prisma.entrega.findMany({
                where: {
                    codAluno: Number(studentId)
                },

                include: {
                    atividade: {
                      include: {
                        tipoAtividade: true,
                      },
                    },
                  },
            })

            return res.json({
                msg: "Listar atividades do aluno",
                activities
            })
        } else {
            return res.status(404).json("Aluno não existe")
        }
    } catch(error) {
        return res.status(500).json({
            msg: "Listar atividades do aluno",
            error
        })
    }
})

export default router