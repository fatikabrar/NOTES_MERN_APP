import { FC,FocusEvent, useState } from "react";
import inote from "../../interfaces/note.interface";
import "./Note.css";

type Props = {
  note: inote;
  OnNoteUpdate : (note :inote) =>void;
  OnNoteDelete : (noteid : string) => void;
};


const Note: FC<Props> = ({ note , OnNoteUpdate, OnNoteDelete }) => {
  const [isFocused,setIsFocused] = useState(false);
    const NoteTextUpdated = (event : FocusEvent)=>
{
   setIsFocused(false);
   const NewTextValue=event.currentTarget.textContent;
   if(NewTextValue === note.text)
   {
    return;
   }
   console.log("Notes text is changed ");
    const UpdatedNoteObject : inote ={
        ...note,
        text : NewTextValue || " "
    }
   OnNoteUpdate(UpdatedNoteObject)
}


return (
    <div className={`note ${isFocused ? "note--focused" : "note"}`}>  
    <button
  onClick={() => {
    OnNoteDelete(note._id);
  }}
  type="button"
  className="btn-close"
  aria-label="Close"
></button>

      <div
      onBlur={NoteTextUpdated}
      onFocus={() =>
       setIsFocused(true)
      }
       contentEditable={true} 
       suppressContentEditableWarning={true} 
       className="note__text">
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note.link} </a>
      </div>
    </div>
  );
};

export default Note;
