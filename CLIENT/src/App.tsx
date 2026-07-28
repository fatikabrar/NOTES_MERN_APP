import axios from 'axios';
import './App.css';
import   './App';
import { useEffect, useState } from 'react';
import Note from './components/note/note';
import inote from './interfaces/note.interface';
import { createnote, deletenote,getNotes, updatenote } from './Services/Note_services';
import {Button , FloatingLabel, Modal,Form} from "react-bootstrap";



function App() {
const[noteslist,setnoteslist]=useState<Array<inote>>([]);
const [ShowAddNoteModal, SetShowAddNoteModal] = useState(false);
const [newnote, Setnewnote] = useState<Partial<inote>>({
 link : "" ,
  text : "",
});

  const handleCloseAddModal = () => {
  Setnewnote({
    link: "",
    text: "",
  });
  SetShowAddNoteModal(false);
};


  const handleShowAddModal = () => SetShowAddNoteModal(true);


//if we want only one time that react renders 
//this implemented  when the app reneders first time 
 useEffect(()=>{
    getnotesfromserver();
 },[])


const getnotesfromserver = async () => {
  const notes = await getNotes();
  console.log("Fetched notes:", notes);
  setnoteslist(notes); // ✅ update state so notes render
};

   console.log("rerendering"); 
   console.log(noteslist);

   const UpdateNoteItem=async(UpdatedNote : inote)=>
   {
    const notefromserver =await updatenote(UpdatedNote)

    //temporary variable
      const UpdatedList = noteslist.map((noteitem : inote) =>
      {
      if (noteitem._id === notefromserver._id)
        {
          return notefromserver;
        }
        return noteitem;
      });
      setnoteslist(UpdatedList)//updating the state of notes list

   };

const deleteNoteitem = async (DeletedNoteId: string) => {
  try {
    const deletednote = await deletenote(DeletedNoteId);
    console.log("Deleted note:", deletednote);

    // ✅ filter by _id
    setnoteslist(noteslist.filter(note => note._id !== DeletedNoteId));
  } catch (err) {
    console.error("Error deleting note:", err);
  }
};




const addnote = async () => {
  const savednote = await createnote(newnote);
  if (savednote && savednote.text) {
    setnoteslist([savednote, ...noteslist]); // ✅ only add valid notes
  } else {
    console.error("Invalid note returned:", savednote);
  }
  handleCloseAddModal();
};

   
  return (
    <div className="App">

      <Button variant="dark" className="addbutton"
      onClick={handleShowAddModal}>
   <div className="add-button-text">+</div>
      </Button>

      <Modal show={ShowAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NOTE</Modal.Title>
        </Modal.Header>
        <FloatingLabel controlId="floatingtextarea2" label="Text">
  <Form.Control
  onChange={(event)=>{
    const newvalue = event.currentTarget.value;
    Setnewnote({
      ...newnote,
      text: newvalue
    });
  }}
    as="textarea"
    placeholder="Enter note text here"
    style={{ height: '100px' }}
  />
</FloatingLabel>    
<FloatingLabel 
              controlId="floatingtextarea" 
               label="Link"
               className ="mb-3 note-link"
        >
  <Form.Control  
  onChange={(event)=>{
{
    const newvalue = event.currentTarget.value;
    Setnewnote({
      ...newnote,
      link: newvalue
    })
  }}} 
     type ="url"
    placeholder="Enter note's URL here"
  />
</FloatingLabel>    
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addnote}>
           Create
          </Button>
        </Modal.Footer>
      </Modal>

    <div className="notes-list">
    {
      noteslist.map((noteitem,index)=>{
            return(
            <Note note={noteitem} OnNoteUpdate={ UpdateNoteItem} OnNoteDelete={deleteNoteitem} key={index} />
            );
       } )}
       </div>
     </div>
      );
    }
   
export default App;

   