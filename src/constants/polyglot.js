import Polyglot from 'node-polyglot'
const ptBR = {
  left: 'Esquerdo',
  right: 'Direito',
  formula: 'Fórmula',
  matern: 'Materno',
  papa: 'Papinha',
  feed: 'Alimentação',
  sleep: 'Sono',
  diaper: 'Fralda',
  note: 'Anotação',
  bath: 'Banho',
  begining: 'Início',
  end: 'Fim',
  hour: 'Hora',
  date: 'Data',
  conclude: 'Concluir',
  baby: 'Bebê',
  mom: 'Mãe',
  poop: 'Cocô',
  pee: 'Xixi',
  pooAndPee: 'Cocô/Xixi',
  editing: 'Editando',
  all: 'Todos',
  save: 'Guardar',
  finish: 'Finalizar',
  deletePinAlertTitle: 'Excluir Pin',
  deletePinAlertMsg: 'Tem certeza que deseja excluir o Pin?',
  cancel: 'Cancelar',
  confirmDelete: 'Sim',
  reset: 'Zerar'
}

const polyglot = new Polyglot()

polyglot.extend(ptBR)

export default polyglot
