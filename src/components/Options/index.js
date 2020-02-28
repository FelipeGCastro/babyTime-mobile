import React from 'react'
import Feed from 'src/screens/CreatePin/Feed'
import SleepScreen from 'src/screens/CreatePin/Sleep'
import DiaperScreen from 'src/screens/CreatePin/Diaper'
import NoteScreen from 'src/screens/CreatePin/Note'
import BathScreen from 'src/screens/CreatePin/Bath'

// import { Container } from './styles';

export default function Options ({
  item,
  comments,
  option,
  note,
  startTime,
  onHandleChange,
  startDate,
  timer,
  endTime,
  endDate,
  ml
}) {
  const optionsObj = {
    feed: (
      <Feed
        option={option}
        timer={timer}
        onHandleChange={onHandleChange}
        ml={ml}
        comments={comments}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />),
    sleep: (
      <SleepScreen
        option={option}
        timer={timer}
        comments={comments}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
        onHandleChange={onHandleChange}
      />),
    diaper: (
      <DiaperScreen
        option={option}
        timer={timer}
        onHandleChange={onHandleChange}
        comments={comments}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />),
    note: (
      <NoteScreen
        onHandleChange={onHandleChange}
        timer={timer}
        note={note}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />),
    bath: (
      <BathScreen
        onHandleChange={onHandleChange}
        timer={timer}
        comments={comments}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />
    )
  }
  return optionsObj[item]
}
