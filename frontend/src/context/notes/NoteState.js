import React, { useState } from 'react'
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://notepad-backend.vercel.app/"
  // const notesInitial= [
  //   {
  //     "_id": "6521307e6e728e3ad1dc8b6a1",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task2",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T10:18:38.383Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65213bf8dda63dbcf266afa02",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task1",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T11:07:36.317Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6521307e6e728e3ad1dc8b6a3",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task2",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T10:18:38.383Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65213bf8dda63dbcf266afa04",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task1",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T11:07:36.317Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6521307e6e728e3ad1dc8b6a5",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task2",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T10:18:38.383Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65213bf8dda63dbcf266afa06",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task1",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T11:07:36.317Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6521307e6e728e3ad1dc8b6a7",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task2",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T10:18:38.383Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65213bf8dda63dbcf266afa08",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task1",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T11:07:36.317Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6521307e6e728e3ad1dc8b6a9",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task2",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T10:18:38.383Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "65213bf8dda63dbcf266afa00",
  //     "user": "652128d720bf7daf10ccdef9",
  //     "title": "Task1",
  //     "description": "This is my description block",
  //     "tag": "me",
  //     "date": "2023-10-07T11:07:36.317Z",
  //     "__v": 0
  //   }
  // ]
  const [notes, setNotes] = useState([]);


  //get all note
  const getNotes = async () => {

    const response = await fetch(`${host}/v1/api/notes/fetchAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }


  //add note
  const addNote = async (title, description, tag) => {
    // TODO : API call

    const response = await fetch(`${host}/v1/api/notes/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    // console.log(note);
    setNotes(notes.concat(note));
  }

  //delete note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/v1/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);



    // console.log("deleting note with id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes);
  }
  //edit note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/v1/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);

    // important step for changes in the frontend too
    let newNotes = JSON.parse(JSON.stringify(notes));
    // console.log(newNotes)
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      // console.log(element)
      if (element._id === id) {
        //changes only in backend
        // element.title= title;
        // element.description= description;
        // element.tag=tag;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        // console.log(element)
        break;
      }

    }
    console.log(newNotes)
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
      {/* {console.log(state)} */}
    </NoteContext.Provider>
  )
}
export default NoteState
