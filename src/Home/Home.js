import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {listDecks, deleteDeck} from "../utils/api/index";



export default function Home() {
    const deckId = useParams().deckId;
    const [decks, setDecks] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        async function fetchDecks(){ 
          const data = await listDecks();
          setDecks(data);
          
        }
        fetchDecks(); 
    }, []);
    
    const deleteWarnHandler = async (deckId) => {
      const wantToDelete = window.confirm(
        `Delete deck ID ${deckId}? You will not be able to recover it.`
      );
      if (wantToDelete) {

        async function deleteTheDeck() {
          console.log("deckID",deckId)
          try {
          //  console.log(deckId)
            await deleteDeck(deckId);
          const getRidOfDeletedDeck = decks.filter((deck)=>{
            return deck.id !== deckId
          });
          setDecks(getRidOfDeletedDeck)
            //history.push("/");
          } catch (error) {
            if (error.name === "AbortError") {
              // Ignore `AbortError`
              console.log("Aborted");
            } else {
              throw error;
            }
          }
        }
        deleteTheDeck();
      }
    };
if(decks){
    return (
        <>
            <div>
                <Link to="/decks/new"><i className="fa-duotone fa-plus-large"></i><button type="button" className="btn btn-secondary"> Create Deck</button></Link> 
            </div>
            <div>
                <ul>
                    {decks.map(deck =>
                    
                        <div className="card-body" key={deck.id}>
                            <h4 className="card-title">{deck.name}</h4>
                            <p className="">{deck.description}</p>
                            <p>{deck.cards.length}cards</p>
                            <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-primary"> Study</button></Link>
                            <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary"> View</button></Link>
                            <button type="button" className="btn btn-secondary" onClick={() =>deleteWarnHandler(deck.id)}> Delete</button>
                    
                        </div>
                    
                        )}
                </ul>
            </div>
        </>

    )
}else{
    return null;
}
    
}