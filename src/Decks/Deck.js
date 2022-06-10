import React, {useEffect, useState} from "react"
import { Link, useParams,useHistory } from "react-router-dom";
import { readDeck, deleteDeck,deleteCard } from "../utils/api";

export default function Deck(){
    const {deckId} = useParams();
    const[deck, setDeck]=useState({})

    // deck = { cards: [1,2,3] }
    // delete card 2
    // 

    

    useEffect(() => {
        async function getTheDeck(){
            // console.log("start of loadDeck", deck);
            let response = await readDeck(deckId)
            console.log("response id ", response);
            setDeck(response)
            //  console.log("end of loadDeck", deck);
        } 
        getTheDeck();
    },[deckId])
    
    const history = useHistory();
    console.log("this is the cool deck list",deck)
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
            setDeck(null)
            history.push("/");
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
      const deleteCardHandler = async(cardId) =>{
          const wantToDeleteCard = window.confirm(`Delete this card? You will not be able to recover it.`)
          if(wantToDeleteCard){
              async function putInInfoToDelete(){
                await deleteCard(cardId)
                const getDeletedCardOut= deck.cards.filter((card)=>{
                    return card !== cardId
                })
                console.log("deck.cards is", deck.cards);
                console.log("getDeletedCardOut is", getDeletedCardOut);
                console.log("calling setDeck with", {...deck, cards: getDeletedCardOut});
                setDeck({...deck, cards: getDeletedCardOut})
              } 
              putInInfoToDelete();
            //   need new filtered cards array
            // update state with new filtered cards
            // replace deck.cards with the new filtered cards

          }
      }

    if(deck && deck.cards){
        return(
            <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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
                <button onClick={() => deleteWarnHandler(deck.id)}>Delete</button>
            </div>
            <h4>Cards</h4>
             {deck.cards.map((card) => {
            return(
                <div className="row" key={card.id}>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">{card.front}</p>
                            </div>
                            <div className="card-body sm-6">
                                <p className="card-text">{card.back}</p>

                            </div>
                            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                            <button className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })} 
            </>
        )
    }else{
        return null;
    }
        
    
    

   
}