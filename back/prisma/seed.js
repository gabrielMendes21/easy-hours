/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  await prisma.tipoUsuario.createMany({
    data: [
      {
        tipoUsuario: 'Aluno',
      },
      {
        tipoUsuario: 'Coordenador ETEC',
      },
      {
        tipoUsuario: 'Coordenador IBM',
      },
      {
        tipoUsuario: 'ReportManager',
      },
    ],
  })

  await prisma.tipoAtividade.createMany({
    data: [
      {
        tipoAtividade: 'Sessão',
      },
      {
        tipoAtividade: 'Horas flexíveis',
      },
      {
        tipoAtividade: 'Palestra',
      },
    ],
  })

  // Coordinator password
  const hashedPassword1 = await bcrypt.hash('111111', 10)
  await prisma.usuario.create({
    data: {
      email: 'guilherme@email.com',
      senha: hashedPassword1,
      nome: 'Guilherme',
      codTipoUsuario: 3,
    },
  })

  const hashedPassword2 = await bcrypt.hash('123456', 10)
  const hashedPassword3 = await bcrypt.hash('654321', 10)
  const hashedPassword4 = await bcrypt.hash('987654', 10)
  
  await prisma.escola.create({
    data: {
      nomeEscola: 'ETEC Zona Leste',
      Turma: {
        create: {
          ano: 2023,
          nomeTurma: '3º DS AMS',
          Usuario: {
            create: [
              {
                email: 'gabriel.mendes88@etec.sp.gov.br',
                senha: hashedPassword2,
                nome: 'Gabriel da Silva Mendes',
                rm: 22302,
                codTipoUsuario: 1,
              },
              {
                email: 'danilo.rodrigues108@etec.sp.gov.br',
                senha: hashedPassword3,
                nome: 'Danilo Costa Rodrigues',
                rm: 22388,
                codTipoUsuario: 1,
              },
            ],
          },
        },
      },
      Usuario: {
        create: {
          email: 'rogerio.costa3@etec.sp.gov.br',
          senha: hashedPassword4,
          nome: 'Rogério Bezerra Costa',
          codTipoUsuario: 2,
        },
      },
    },
  })

  await prisma.atividade.createMany({
    data: [
      {
        titulo: 'Design Thinking',
        descricao:
          'Fale sobre o que você aprendeu na última sessão de Design Thinking',
        horasAtividade: 2,
        prazoEntrega: '2023-11-10T10:00:00.000Z',
        codTipoAtividade: 1,
      },
      {
        titulo: 'Horas flexíveis',
        descricao: 'Anexe as horas flexíveis',
        horasAtividade: 20,
        prazoEntrega: '2023-10-18T10:00:00.000Z',
        codTipoAtividade: 2,
      },
      {
        titulo: 'Sessão',
        descricao: 'Fale sobre o que você aprendeu na última sessão',
        horasAtividade: 2,
        prazoEntrega: '2023-09-05T10:00:00.000Z',
        codTipoAtividade: 1,
      },
      {
        titulo: 'IBM Skills Build',
        descricao:
          'Anexe os prints dos seus cursos na plataforma IBM Skills Build',
        horasAtividade: 40,
        prazoEntrega: '2023-10-07T10:00:00.000Z',
        codTipoAtividade: 2,
      },
    ],
  })

  await prisma.entrega.createMany({
    data: [
      {
        dataEntrega: '2023-11-02T04:00:00.000Z',
        conteudo: {
          conhecimento: 'Aprendi bastante coisa',
          anexos: '',
        },
        entregue: true,
        codAluno: 2,
        codAtividade: 1,
      },
      {
        entregue: false,
        codAluno: 2,
        codAtividade: 3,
      },
      {
        entregue: false,
        codAluno: 2,
        codAtividade: 2,
      },
      {
        entregue: false,
        codAluno: 3,
        codAtividade: 1,
      },
      {
        dataEntrega: '2023-10-09T09:00:00.000Z',
        conteudo: {
          conhecimento: 'Nenhum',
          anexos: '',
        },
        entregue: true,
        codAluno: 3,
        codAtividade: 2,
      },
    ],
  })

  await prisma.correcao.createMany({
    data: [
      {
        entregaAprovada: true,
        codCoordenador: 1,
        codEntrega: 1,
        conteudo: 'Meus parabéns.',
      },
    ],
  })

  await prisma.solicitacaoSuporte.createMany({
    data: [
      {
        titulo: 'Contabilização de horas',
        conteudo:
          'Boa tarde. Minhas horas não foram contabilizadas, mas eu realizei todas as atividades propostas, tanto que eu não possuo nenhuma atividade pendente.',
        codAluno: 2,
      },
      {
        titulo: 'Problema com entrega de atividade',
        conteudo:
          'Bom dia. Não estou conseguindo entregar a minha atividade, e eu tenho apenas 2 hroas até o fechamento da mesma.',
        codAluno: 3,
      },
      {
        titulo: 'Problema com skills build',
        conteudo: 'Bom dia. acessar o skills build.',
        codAluno: 2,
      },
    ],
  })

  await prisma.resposta.createMany({
    data: [
      {
        codCoordenador: 1,
        codSolicitacao: 1,
        resposta:
          'Entendo. Estou providenciando a contabilizaçao das suas horas. Tenha uma boa tarde.',
      },
      {
        codCoordenador: 4,
        codSolicitacao: 2,
        resposta:
          'Desculpe a demora. O seu problema ja foi resolvido. Espero que tenha conseguido entregar a sua atividade!',
      },
    ],
  })

  await prisma.horas.createMany({
    data: [
      { horasAnuais: 120, horasConcluidas: 69, codAluno: 3, ano: 2023 },
      { horasAnuais: 120, horasConcluidas: 50, codAluno: 2, ano: 2023 },
      { horasAnuais: 40, horasConcluidas: 43, codAluno: 2, ano: 2022 },
      { horasAnuais: 40, horasConcluidas: 49, codAluno: 3, ano: 2022 },
    ],
  })

  const hashedPassword5 = await bcrypt.hash('123456789', 10)
  await prisma.usuario.create({
    data: {
      nome: 'Report manager',
      email: 'root@root.com',
      senha: hashedPassword5,
      codTipoUsuario: 4,
    },
  })
}

seed()