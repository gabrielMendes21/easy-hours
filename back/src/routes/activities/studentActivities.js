import express from 'express'
import prisma from '../../lib/prisma.js'

const router = express.Router()

// ROUTE -> GET ALL STUDENT ACTIVITIES
router.get('/aluno/:studentId/atividades', async (req, res) => {
    try {
        // GET STUDENT WITH THE ID PROVIDED
        const { studentId } = req.params

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

// const storage = new Storage({
//     keyFilename: join(
//       __dirname,
//       '..',
//       '..',
//       '..',
//       'fluid-axis-402017-05332102ad29.json',
//     ),
//     projectId: 'fluid-axis-402017',
//   })
  
//   const bucket = storage.bucket('easy-hours')

// ROUTE -> SEND ACTIVITY
router.put('/aluno/:studentId/atividades/:activityId', (req, res) => {
    // GET STUDENT ID AND ACTIVITY ID
    const { studentId, activityId } = req.params

    try {
        // 

        return res.json({
            msg: "Enviar atividade"
        })
    } catch(error) {
        return res.status(500).json({
            msg: "Enviar atividade",
            error
        })
    }
})

export default router