 import React, {useEffect, useState} from "react";
 import {readDeck} from "../utils/api/index"
import{useParams, Link} from "react-router-dom";
// making a new card!!
export default function DeckItem(){
    
    const deckId = useParams().deckId;
    console.log(deckId)
    const[deck, setDeck]=useState({});
    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId) 
            console.log(response)
            setDeck(response)
        } 
        loadDeck();
    },[deckId])
    return(
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">{deck.name} / Add Card</a></li>
            </ol>
        </nav>
        
            <h4>{deck.name}: Add Card</h4>
            <p>{deck.description}</p>
            <form>
                <div class="form-group">
                    <label for="frontTextarea">Front</label>
                    <textarea class="form-control" id="frontTextarea" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="backTextarea">Back</label>
                    <textarea class="form-control" id="backTextarea" rows="3"></textarea>
                </div>
                <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary">Done</button></Link>
                <button type="button" className="btn btn-primary">Save</button>
            </form>
        
        
        </>
    )
}