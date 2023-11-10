/* eslint-disable accessor-pairs */
export default class Escola {
  constructor(codEscola, nomeEscola) {
    this.codEscola = codEscola
    this.nomeEscola = nomeEscola
  }

  set setCodEscola(newValue) {
    this.codEscola = newValue
  }

  get getCodEscola() {
    return this.codEscola
  }

  set setNomeEscola(newValue) {
    this.nomeEscola = newValue
  }

  get getNomeEscola() {
    return this.nomeEscola
  }
}
