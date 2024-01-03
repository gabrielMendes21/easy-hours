// IMPORTS
import bcrypt from 'bcrypt'
import express from 'express'
import prisma from '../../lib/prisma.js'

// ROUTER CONFIG
const router = express.Router()
router.use(express.json())

// ROUTE -> GET STUDENTS
router.get('/alunos', async (req, res) => {
  try {
    // GET ID OF STUDENT CLASS
    const { classId } = req.query
  
    let students = []
  
    // VERIFY IF CLASS ID EXISTS
    // IF IT EXISTS, GET ONLY STUDENTS FROM THIS CLASS
    // ELSE, JUST GET ALL STUDENTS
    if (classId) {
      students = await prisma.usuario.findMany({
        where: {
          codTurma: Number(classId),
        },
        include: {
          Entrega: true,
        },
        orderBy: {
          nome: 'asc',
        },
      })
    } else {
      students = await prisma.usuario.findMany({
        where: {
          role: 'STUDENT'
        },
      })
    }
  
      return res.json({
          msg: "List students",
          students
      })
  } catch(error) {
    return res.status(500).json({
      msg: "List students",
      error
    })
  }
})

// ROUTE -> ADD STUDENTS TO THE SYSTEM
/*
    REQUEST BODY EXAMPLE
    [
      {
        "EMAIL": "gabriel@gmail.com",
        "RM": 22316,
        "NOME": "Gabriel Mendes",
        "HORAS ANUAIS": 85,
        "HORAS CONCLUÍDAS": 1
      },
      {
        "EMAIL": "miguel@gmail.com",
        "RM": 22210,
        "NOME": "Miguel Oliveira",
        "HORAS ANUAIS": 50,
        "HORAS CONCLUÍDAS": 1
      },
    ]
*/
router.post('/alunos', async (req, res) => {
    try {
      // GET SCHOOL AND CLASS ID  
      const schoolId = req.query.school
      const classId = req.query.class

      const students = req.body
      
      // PASS FOR EACH STUDENT OF THE ARRAY, AND ADD THE DATA TO DATABASE
      for (let i = 0; i < students.length; i++) {
        // VERIFY IF STUDENT ALREADY EXISTS
        const studentResponse = await prisma.usuario.findFirst({
          where: {
            rm: Number(students[i].RM),
          },
        })
    
        const password = students[i].RM + students[i].NOME.slice(0, 2)
        const hashedPassowrd = await bcrypt.hash(password, 10)
    
        if (studentResponse === null) {
          // ADD STUDENT TO DATABASE
          await prisma.usuario.create({
            data: {
              email: students[i].EMAIL,
              rm: Number(students[i].RM),
              nome: students[i].NOME,
              senha: hashedPassowrd, // PASSWORD = STUDENT RM + FIRST TWO LETTERS OF STUDENT'S NAME -> (RM = 22164, NAME = GABRIEL) = 22164GA
              codEscola: Number(schoolId),
              role: 'STUDENT',
              codTurma: Number(classId),
    
              Horas: {
                create: {
                  horasAnuais: Number(students[i]['HORAS ANUAIS']),
                  horasConcluidas: Number(students[i]['HORAS CONCLUÍDAS']),
                  ano: new Date().getFullYear(),
                },
              },
            },
          })
        }
      }

      return res.status(201).json({
          msg: "Adicionar alunos",
          students
      })
    } catch(error) {
      return res.status(500).json({
        msg: "List student",
        error
      })
    }
})

// ROUTE -> GET STUDENT
router.get('/alunos/:id', async (req, res) => {
  try {
    // GET STUDENT ID, SENT BY ROUTE PARAMS
    const { id } = req.params
    
    // FIND STUDENT WITH THE PROVIDED ID
    const student = await prisma.usuario.findFirst({
      where: {
        id: Number(id),
        AND: {
          role: 'STUDENT'
        }
      },
      include: {
        Horas: {
          where: {
            ano: new Date().getFullYear(),
          },
        },
        Entrega: true,
      },
    })
  
    return res.json({
      msg: "List student",
      student
    })
  } catch(error) {
    return res.status(500).json({
      msg: "List student",
      error
    })
  }
})


// ROUTE -> UPDATE STUDENT
/*
    REQUEST BODY EXAMPLE
    {
      "nome": "John Doe",
      "email": "johndoe@domain.com",
      "rm": 54679
    }
*/
router.put('/alunos/:id', async (req, res) => {
  // GET ID
  const { id } = req.params

  try {

    // UPDATE STUDENT BY ID
    const student = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        nome: req.body.nome,
        email: req.body.email,
        rm: Number(req.body.rm),
      },
    })

    return res.json({
      msg: "Update student",
      student
    })

  } catch (error) {
    return res.status(500).json({
      msg: "Update student",
      error
    })
  }

})

// ROUTE -> DELETE STUDENT
router.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params

  try {
    // REMOVE STUDENT TASKS
    const studentTasks = await prisma.entrega.findMany({
      where: {
        codAluno: Number(id),
      },
      include: {
        Correcao: true,
      },
    })
    
    // DELETE EACH TASK OF THE ARRAY
    if (studentTasks) {
      for (const task of studentTasks) {
        if (task.Correcao) {
          await prisma.correcao.delete({
            where: {
              codEntrega: task.id,
            },
          })
        }

        await prisma.entrega.delete({
          where: {
            id: task.id,
          },
        })
      }
    }

    // REMOVE STUDENT SUPPORT REQUESTS
    const supportRequests = await prisma.solicitacaoSuporte.findMany({
      where: {
        codAluno: Number(id),
      },
      include: {
        Resposta: true,
      },
    })

    // DELETE EACH SUPPORT REQUEST OF THE ARRAY
    if (supportRequests) {
      for (const supportRequest of supportRequests) {
        if (supportRequest.Resposta) {
          await prisma.resposta.delete({
            where: {
              codSolicitacao: supportRequest.id,
            },
          })
        }

        await prisma.solicitacaoSuporte.delete({
          where: {
            id: supportRequest.id,
          },
        })
      }
    }

    // REMOVE STUDENT HOURS
    const studentHours = await prisma.horas.findMany({
      where: {
        codAluno: Number(id),
      },
    })

    // DELETE EACH STUDENT HOURS OF THE ARRAY
    if (studentHours) {
      for (const hours of studentHours) {
        await prisma.horas.delete({
          where: {
            id: hours.id,
          },
        })
      }
    }

    // FINALLY, REMOVE THE STUDENT
    const deletedStudent = await prisma.usuario.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(204).json({
      msg: "Delete student",
      deletedStudent
    })
  } catch(error) {
    return res.status(500).json({
      msg: "Delete student",
      error
    })
  }
})

export default router