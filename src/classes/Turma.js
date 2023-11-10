/* eslint-disable accessor-pairs */
export default class Turma {
  constructor() {
    this.codTurma = null
    this.ano = null
    this.escola = null
    this.nomeTurma = null
  }

  // Getters and Setters
  set setCodTurma(newValue) {
    this.codTurma = newValue
  }

  get getCodTurma() {
    return this.codTurma
  }

  set setAno(newValue) {
    this.ano = newValue
  }

  get getAno() {
    return this.ano
  }

  set setEscola(newValue) {
    this.escola = newValue
  }

  get getEscola() {
    return this.escola
  }

  set setNomeTurma(newValue) {
    this.nomeTurma = newValue
  }

  get getNomeTurma() {
    return this.nomeTurma
  }

  // Methods
  setTurma(turma) {
    return true
  }

  getTurma() {
    return { ...this }
  }

  updateTurma(turma) {
    return true
  }

  deleteTurma() {
    return true
  }
}
