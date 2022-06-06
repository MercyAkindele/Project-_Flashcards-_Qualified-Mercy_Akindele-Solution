import React, {useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function Deck(){
    const {deckId} = useParams();
    const[deck, setDeck]=useState({})
    

    useEffect(() => {
        async function getTheDeck(){
            // console.log("start of loadDeck", deck);
            let response = await readDeck(deckId)
            console.log("response id ", response);
            setDeck(response)
             console.log("end of loadDeck", deck);
        } 
        getTheDeck();
    },[deckId])
    console.log("this is the cool deck list",deck)
    if(deck && deck.cards){
        return(
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
            </nav>

            <div>
                <h3>
                    {console.log("this is the deck in Deck.js",deck)}
                    {deck.name}
                </h3>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}/edit`}> <button type="button" className="btn btn-primary">Edit</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-primary">Study</button></Link>
                <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="btn btn-primary">Add Cards</button></Link>
                <button>Delete</button>
            </div>
            <h4>Cards</h4>
             {deck.cards.map((card) => {
            return(
                <>
                {console.log("This is the card id",card.id)}
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{card.front}</p>
                            </div>
                            <div className="card-body sm-6">
                                <p className="card-text">{card.back}</p>

                            </div>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                </>
            )
        })} 
            </>
        )
    }else{
        return(
        <>
            <p>Loading chicken...</p>
        </>
        )
    }
        
    
    

   
}