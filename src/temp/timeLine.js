import { colors } from '../constants'
import Breast from 'src/assets/breast.png'
import Sleep from 'src/assets/sleep.png'
import Diaper from 'src/assets/diaper.png'
import Note from 'src/assets/note.png'
import Bath from 'src/assets/duck.png'
import Poo from 'src/assets/poop.png'
import Pee from 'src/assets/pee.png'
import PooAndPee from 'src/assets/poo-and-pee.png'

const timeLine = [
  {
    id: 1,
    type: 'diaper',
    category: 'yellow',
    title: 'Fralda',
    color: colors.diaperColor,
    icon: Diaper,
    description: 'poo',
    time: { start: '14:23', duration: '12 min' }
  },
  {
    id: 2,
    type: 'bath',
    category: 'yellow',
    color: colors.bathColor,
    icon: Bath,
    title: 'Amamentação',
    description: 'poo',
    time: { start: '14:25', duration: '12 min' }
  },
  {
    id: 3,
    type: 'note',
    category: 'yellow',
    color: colors.noteColor,
    icon: Note,
    title: 'Bebe estava sentindo algum tipo de dor pois não estava querendo dormir',
    description: 'poo',
    time: { start: '15:00', duration: '12 min' }
  },
  {
    id: 4,
    type: 'sleep',
    category: 'yellow',
    title: 'Fralda',
    color: colors.sleepColor,
    icon: Sleep,
    description: 'poo',
    time: { start: '16:00', duration: '12 min' }
  },
  {
    id: 5,
    type: 'meal',
    category: 'yellow',
    color: colors.feedColor,
    icon: Breast,
    title: 'Fralda',
    description: 'poo',
    time: { start: '14:23', duration: '12 min' }
  },
  {
    id: 6,
    type: 'diaper',
    category: 'yellow',
    title: 'Fralda',
    color: colors.diaperColor,
    icon: Poo,
    description: 'poo',
    time: { start: '14:25', duration: '12 min' }
  },
  {
    id: 7,
    type: 'diaper',
    category: 'yellow',
    title: 'Fralda',
    color: colors.diaperColor,
    icon: Pee,
    description: 'poo',
    time: { start: '15:00', duration: '12 min' }
  },
  {
    id: 8,
    type: 'diaper',
    category: 'yellow',
    title: 'Fralda',
    color: colors.diaperColor,
    icon: PooAndPee,
    description: 'poo',
    time: { start: '16:00', duration: '12 min' }
  }
]

export default timeLine
