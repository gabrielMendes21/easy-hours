/* eslint-disable accessor-pairs */
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export default class Usuario {
  constructor() {
    this.codUsuario = null
    this.email = null
    this.senha = null
    this.nome = null
    this.turma = null
    this.rm = null
    this.horasConcluidas = null
    this.horasAnuais = null
    this.escola = null
    this.tipoUsuario = null
  }

  // Getters and setters
  set setCodUsuario(newValue) {
    this.codUsuario = newValue
  }

  get getCodUsuario() {
    return this.codUsuario
  }

  set setEmail(newValue) {
    this.email = newValue
  }

  get getEmail() {
    return this.email
  }

  set setSenha(newValue) {
    this.senha = newValue
  }

  get getSenha() {
    return this.senha
  }

  set setNome(newValue) {
    this.nome = newValue
  }

  get getNome() {
    return this.nome
  }

  set setTurma(newValue) {
    this.turma = newValue
  }

  get getTurma() {
    return this.turma
  }

  set setRm(newValue) {
    this.rm = newValue
  }

  get getRm() {
    return this.rm
  }

  set setHorasConcluidas(newValue) {
    this.horasConcluidas = newValue
  }

  get setHorasConcluidas() {
    return this.horasConcluidas
  }

  set setHorasAnuais(newValue) {
    this.horasAnuais = newValue
  }

  get getHorasAnuais() {
    return this.horasAnuais
  }

  set setEscola(newValue) {
    this.escola = newValue
  }

  get getEscola() {
    return this.escola
  }

  set setTipoUsuario(newValue) {
    this.tipoUsuario = newValue
  }

  get getTipoUsuario() {
    return this.tipoUsuario
  }

  // Methods
  async fazerLogin(email, password) {
    // Get the params and search the user in database
    const user = await prisma.usuario.findFirst({
      where: {
        email,
      },
      include: {
        escolaRel: true,
        tipoUsuario: true,
        turma: true,
      },
    })

    console.log(user)

    // Verify if the params are correct
    if (user) {
      const passwordIsCorrect = await bcrypt.compare(password, user.senha)
      if (passwordIsCorrect) {
        // Fill class data with user information
        const horas = await prisma.horas.findFirst({
          where: {
            codAluno: user.id,
            AND: {
              ano: new Date().getFullYear(),
            },
          },
        })

        this.setCodUsuario = user.id
        this.setEmail = user.email
        this.setSenha = user.senha
        this.setNome = user.nome
        this.setTurma = user.turma?.nomeTurma
        this.setRm = user.rm
        this.setHorasConcluidas = horas?.horasConcluidas
        this.setHorasAnuais = horas?.horasAnuais
        this.setEscola = user.codEscola || user.turma?.codEscola || null
        this.setTipoUsuario = user.tipoUsuario.tipoUsuario

        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
