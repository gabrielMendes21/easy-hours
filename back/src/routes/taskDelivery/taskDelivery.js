import express from 'express'
import prisma from '../../lib/prisma.js'

const router = express.Router()

// ROUTE -> GET TASK DELIVERY
router.get('/entrega/:taskDeliveryId', async (req, res) => {
    try {
        // GET TASK DELIVERY ID FROM PARAMS
        const { taskDeliveryId } = req.params 

        // FIND TASK DELIVERY IN DATABASE
        const taskDelivery = await prisma.entrega.findFirst({
            where: {
                id: Number(taskDeliveryId),
            },
            include: {
                aluno: true,
                atividade: true,
                Correcao: true,
            },
        })
        
        return res.json({
            msg: "Listar entrega de tarefa",
            atividadeEntregue: taskDelivery
        })
    } catch(error) {
        return res.status(500).json({
            msg: "Listar entrega de tarefa",
            error
        })
    }
})

export default router