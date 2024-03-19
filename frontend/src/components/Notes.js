import React , {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useHistory } from 'react-router-dom';

const Notes = () => {
  const history= useHistory();
  const context= useContext(NoteContext);
  const {notes, getNotes, editNote}= context;

  const isAuthenticated = !!localStorage.getItem('token')
  // console.log(localStorage.getItem('token'));
  useEffect(() => {
    if (isAuthenticated) {
      getNotes();
    } else {
      history.push('/login');
    }
  }, [isAuthenticated, history]);


  const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
  }
  const ref= useRef(null);
  const refClose= useRef(null);
  const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""})
  
  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); 
  }
  return isAuthenticated ? (
    <>  
        <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
                    </div>
                    <button disabled={note.etitle<3 || note.edescription<10}  type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </form>
            </div>
            <div className="modal-footer d-none">
                <button type="button"   ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        {/* <AddNote/> */}
        <div className="row my-3">
            <h2 ><strong>Notes</strong></h2> 
            {/* syntax same as conditional but no colon part */}
            {(notes.length === 0) && "Add Your First Note"}
            {
                notes.map((note)=>{
                    return <NoteItem key={note._id} updateNote={updateNote} note= {note}/>;
                })
            }
        </div>
    </>
  ): null
}

export default Notes