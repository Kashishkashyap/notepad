import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  
  const a= useContext(NoteContext);
  return (
    <div>{a.name}</div>
  )
}

export default About