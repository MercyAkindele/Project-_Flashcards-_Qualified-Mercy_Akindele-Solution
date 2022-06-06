import React, {useEffect, useState} from "react";
import {readDeck, createCard} from "../utils/api/index"
import{useParams, Link} from "react-router-dom";
// making a new card!!
export default function DeckItem(){
   
   const {deckId} = useParams();
   const[deck, setDeck]=useState([]);
   const initialFormState= {front:"",back:"", deckId}
   const[formData, setFormData]=useState({...initialFormState})

    const inputHandler = ({ target }) => {
      console.log("this is targt", target);
    //   console.log("what is the data before", formData);
      setFormData({ ...formData, [target.name]: target.value });
    //   console.log("what is the data after", formData);
    };
   
    const saveHandler = (e) => {
      e.preventDefault();
      async function includeCard() {
        try {
          await createCard(deckId, formData);
          console.log("initialFormState", initialFormState);
          console.log("formData", formData);
          setFormData(initialFormState);
        //   console.log("what is the data after", formData);
        } catch (error) {
          if (error.name === "AbortError") {
            // Ignore `AbortError`
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      includeCard();
    };

   useEffect(() => {
       async function loadDeck(){
           try{
            const response = await readDeck(deckId) 
            // console.log(response)
            setDeck(response)
           }catch (error){
               if(error.name === "AbortError"){
                   console.log("Aborted");
               }else{
                   throw error;
               }
           }
       } 
       loadDeck();
   },[deckId]);

   if(deck){
    return(
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <br/>
            <h4>{deck.name}: Add Card</h4>
            {/* <p>{deck.description}</p> */}
            <form onSubmit={saveHandler}>
                <div className="form-group">
                    <label htmlFor="frontTextarea">Front</label>
                    <textarea className="form-control" id="front" name="front" rows="3" 
                    placeholder="Front side of card" onChange={inputHandler} value={formData.front}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="backTextarea">Back</label>
                    <textarea className="form-control" id="back" name="back" rows="3" 
                    placeholder="Back side of card" onChange={inputHandler} value={formData.back}
                    ></textarea>
                </div>
                <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary">Done</button></Link>
                <button type="submit" className="btn btn-primary" >Save</button>
            </form>
        
        
        </>
    )
   }else{
       return <h4>Loading deck item...</h4>
   }




}