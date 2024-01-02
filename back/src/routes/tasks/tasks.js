import express from 'express'
import prisma from '../../lib/prisma.js'

const router = express.Router()

// ROUTE -> GET A SPECIFIC TASK
router.get('/atividades/:id', async (req, res) => {
    // GET TASK ID, PROVIDED BY QUERY PARAMS
    const { id: taskId } = req.params
    
    // SEARCH THE TASK IN THE DATABASE BY ITS ID
    const task = await prisma.atividade.findUnique({
        where: {
            id: Number(taskId)
        },
        include: {
            tipoAtividade: true
        }
    })

    return res.json({
        msg: "Listar atividades",
        task
    })
})

// ROUTE -> CREATE A TASK
router.post('/atividades', async (req, res) => {
    // GET TASK DATA FROM BODY REQUEST
    const data = req.body

    // ADD TASK TO DATABASE
    const newTask = await prisma.atividade.create({
        data: {
          titulo: data.taskName,
          descricao: data.taskDetails,
          prazoEntrega: new Date(data.taskDueDate),
          horasAtividade: Number(data.taskHours),
          codTipoAtividade: Number(data.taskType),
        },
    })
    
    // FIND THE CLASS WHOSE TASK WILL BE ASSIGNED
    const schoolClass = await prisma.turma.findFirst({
        where: {
            nomeTurma: {
                contains: data.className,
            },
            AND: {
                ano: new Date().getFullYear(),
            },
        },
    })
    
    // GET ALL STUDENT IN THE CLASS
    const students = await prisma.usuario.findMany({
        where: {
            codTurma: schoolClass.id,
        },
    })

    // IF STUDENTS ARRAY IS NOT NULL, ASSIGN THE TASK TO EACH STUDENT IN THE CLASS
    if (students) {
        for (const student of students) {
            await prisma.entrega.create({
                data: {
                    codAluno: student.id,
                    codAtividade: newTask.id,
                },
            })
        }
    }

    return res.json({
        msg: "Criar atividade",
        data
    })
})

export default router