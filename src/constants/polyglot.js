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
  all: 'Todos',
  save: 'Guardar'
}

const polyglot = new Polyglot()

polyglot.extend(ptBR)

export default polyglot
