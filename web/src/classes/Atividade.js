/* eslint-disable accessor-pairs */
export default class Atividade {
  constructor() {
    this.codAtividade = 0
    this.titulo = ''
    this.descricao = ''
    this.tipoAtividade = ''
    this.anexos = ''
    this.horasAtividade = 0
    this.dataCriacao = ''
    this.prazoEntrega = ''
  }

  set setCodAtividade(newValue) {
    this.codAtividade = newValue
  }

  get getCodAtividade() {
    return this.codAtividade
  }

  set setTitulo(newValue) {
    this.titulo = newValue
  }

  get getTitulo() {
    return this.titulo
  }

  set setDescricao(newValue) {
    this.descricao = newValue
  }

  get getDescricao() {
    return this.descricao
  }

  set setTipoAtividade(newValue) {
    this.tipoAtividade = newValue
  }

  get getTipoAtividade() {
    return this.tipoAtividade
  }

  set setAnexos(newValue) {
    this.anexos = newValue
  }

  get getAnexos() {
    return this.anexos
  }

  set setHorasAtividade(newValue) {
    this.horasAtividade = newValue
  }

  get getHorasAtividade() {
    return this.horasAtividade
  }

  set setDataCriacao(newValue) {
    this.dataCriacao = newValue
  }

  get getDataCriacao() {
    return this.dataCriacao
  }

  set setPrazoEntrega(newValue) {
    this.prazoEntrega = newValue
  }

  get getPrazoEntrega() {
    return this.prazoEntrega
  }

  createAtividade(atividade) {
    return true
  }

  readAtividade() {
    return { ...this }
  }

  updateAtividade(atividade) {
    return true
  }

  deleteAtividade() {
    return true
  }
}
