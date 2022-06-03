import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {listDecks} from "../utils/api/index";
import Deck from "../Decks/DeckItem";


export default function Home() {
    const deckId = useParams().deckId;
    const [decks, setDecks] = useState([]);
    // const createHandler=(e) => {
    //     e.preventDefault();
    //    <CreateDeck /> 
    // }
    useEffect(() => {
        async function fetchDecks(){ 
          const data = await listDecks(deckId);
          setDecks(data);
          
        }
        fetchDecks(); 
    }, [deckId]);
    

    return (
        <>
            <div>
                <Link to="/decks/new"><i className="fa-duotone fa-plus-large"></i><button type="button" className="btn btn-secondary"> Create Deck</button></Link> 
            </div>
            <div>
                <ul>
                    {decks.map(deck =>
                    
                        <div className="card-body">
                            <h4 className="card-title">{deck.name}</h4>
                            <p className="">{deck.description}</p>
                            <p>{deck.cards.length}cards</p>
                            <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-primary"> Study</button></Link>
                            <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary"> View</button></Link>
                            <button type="button" className="btn btn-secondary"> Delete</button>
                    
                        </div>
                    
                        )}
                </ul>
            </div>
        </>

    )
}