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
  endTime,
  endDate,
  ml
}) {
  const optionsObj = {
    feed: (
      <Feed
        option={option}
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
        comments={comments}
        startTime={startTime}
        startDate={startDate}
        onHandleChange={onHandleChange}
      />),
    diaper: (
      <DiaperScreen
        option={option}
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
        note={note}
        startTime={startTime}
        startDate={startDate}
        endTime={endTime}
        endDate={endDate}
      />),
    bath: (
      <BathScreen
        onHandleChange={onHandleChange}
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
