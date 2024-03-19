import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const getRandomColorClass = () => {
        const colors = ['bg-success','bg-warning','bg-info', 'bg-danger' ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };
    return (
        <>
            {/* <button type="button" class="btn btn-primary position-relative">
                Inbox
                
            </button> */}
            <div className="col-md-3 my-3">
                <div className={`card ${getRandomColorClass()}`} style={{'--bs-bg-opacity': '0.5', border: "none"}}>
                    <div className="card-body">
                        <span className="card-title"><strong>{note.title}</strong></span><span><i className="fa-solid fa-pencil mx-3" onClick={() => updateNote(note)}></i></span>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text"><small className="text-body-secondary">{note.tag}</small></p>
                        
                    </div>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill ">
                        
                    <i className="fa-solid fa-trash mx-3 " style={{borderRadius: "10px", padding: "5px", backgroundColor:"red", cursor:"pointer"}} onClick={() => deleteNote(note._id)}></i>
                </span>
                </div>
            </div>
        </>
    )
}

export default NoteItem