import React, {useEffect, useState} from "react";
import { readDeck, updateDeck } from "../utils/api";
import {Link, useParams, useHistory} from "react-router-dom";

export default function EditDeck(){
    const {deckId}= useParams();
    const initialFormState= {name:"",description:"",}
    const[deck, setDeck] = useState({...initialFormState})
    //const[formData, setFormData]= useState({...initialFormState})


    const inputHandler = ({target}) =>{
        setDeck({...deck, [target.name]:target.value,});
    };
    const history= useHistory();
   console.log("this is the form deck",deck)
    const saveHandler = (e) => {
         e.preventDefault();
      async function addEditToDeck() {
          try{
            await updateDeck(deck);
            history.push(`/decks/${deckId}`);
          }catch(error){
              if(error.name === "AbortError"){
                  console.log("Aborted")
              }else{
                  throw error;
              }
          }
      }
      addEditToDeck();
    };

    
    useEffect(()=>{
        async function getDeck(){
            const response = await readDeck(deckId)
            setDeck(response)
        } 
        getDeck();
    },[deckId]);

    return(
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                <li className="breadcrumb-item">Edit Deck</li>
                </ol>
        </nav>
        <h4>Edit Deck</h4>
        <form onSubmit={saveHandler}>
            <div className="form-group">
            <label htmlFor="controlInput1">Name</label>
            <input type="text" className="editDeckName" name="name" id="name" 
            placeholder="Deck Name" onChange={inputHandler} value={deck.name}/>
            
        </div>
        <div className="form-group">
            <label htmlFor="textarea1">Description</label>
            <textarea className="form-control" name="description" id="description" rows="3"
            placeholder="Brief description of the deck" onChange={inputHandler} value={deck.description}></textarea>
            
        </div>
        <Link to={`/decks/${deckId}`} ><button className="btn btn-secondary" type="cancel" >Cancel</button></Link> 
        <button className="btn btn-primary" type="submit">Submit</button>
        
    </form>
        
        </>
        )
}