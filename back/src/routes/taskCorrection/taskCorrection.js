import express from 'express'
import prisma from '../../lib/prisma.js'

const router = express.Router()

// ROUTE -> CREATE A CORRECTION FOR A DELIVERED TASK
/*
    REQUEST BODY EXAMPLE
    {
        "assessment": "Great job",
        "isTaskApproved": true
    }
*/
router.post('/correcao', async (req, res) => {
    try {
        // GET DATA FROM REQUEST BODY
        const data = req.body

        // GET TASK DELIVERY ID AND COORDINTAOR ID FROM QUERY PARAMS
        const { taskDeliveryId, coordinatorId } = req.query

        // CREATE A CORRECTION IN DATABASE
        await prisma.correcao.create({
            data: {
                codEntrega: Number(taskDeliveryId),
                conteudo: data.assessment,
                codCoordenador: Number(coordinatorId),
                entregaAprovada: data.isTaskApproved,
            },
        })

        // FIND TASK DELIVERY
        const taskDelivery = await prisma.entrega.findFirst({
            where: {
                id: Number(taskDeliveryId),
            },
            include: {
                atividade: true,
                aluno: {
                    include: {
                        Horas: true,
                    },
                },
            },
        })

        // ADD HOURS TO STUDENT IF TASK WAS APPROVED BY THE COORDINATOR
        if (data.isTaskApproved) {
            // GET STUDENT HOURS OF THE CURRENT YEAR
            const hours = taskDelivery.aluno.Horas.find((hours) => {
                return hours.ano === new Date().getFullYear()
            })

            // STUDENT COMPLETED HOURS
            const completedHours = hours.horasConcluidas

            // ADD TASK HOURS TO STUDNET COMPLETED HOURS
            await prisma.horas.update({
                data: {
                    horasConcluidas: completedHours + taskDelivery.atividade.horasAtividade,
                },
                where: {
                    id: hours.id,
                },
            })
        }

        const responseData = {
            correcaoDaAtividade: data.isTaskApproved ? "Atividade aprovada" : "Atividade reprovada",
            horasDaAtividade: taskDelivery.atividade.horasAtividade
        }

        return res.json({
            msg: "Correção da atividade",
            dadosDaCorrecao: responseData
        })
    } catch(error) {
        return res.status(500).json({
            msg: "Correção de atividade",
            error
        })
    }
})

export default router