import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

export default function Home() {
  const deckId = useParams().deckId;
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchDecks() {
      try{
        const data = await listDecks();
        setDecks(data);
      }catch(error){
        if(error.name === "AbortError"){
          console.log("Aborted")
        }else{
          throw error;
        }
      }
    }
    fetchDecks();
  }, []);

  const deleteWarnHandler = async (deckId) => {
    const wantToDelete = window.confirm(
      `Delete deck ID ${deckId}? You will not be able to recover it.`
    );
    if (wantToDelete) {
      async function deleteTheDeck() {
        try {
          await deleteDeck(deckId);
          const getRidOfDeletedDeck = decks.filter((deck) => {
            return deck.id !== deckId;
          });
          setDecks(getRidOfDeletedDeck);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted")
          } else {
            throw error;
          }
        }
      }
      deleteTheDeck();
    }
  };
  if (decks) {
    return (
      <>
        <div>
          <Link to="/decks/new">
            <button type="button" className="btn btn-secondary ml-5">
              <i className="fa fa-plus" aria-hidden="true"></i> Create Deck
            </button>
          </Link>
        </div>
        <div>
          <ul>
            {decks.map((deck) => (
              <div className="card w-75 mt-2 ml-2" key={deck.id}>
                <div className="card-body ">
                  <h4 className="card-title">{deck.name}</h4>
                  <p className="">{deck.description}</p>
                  <p>{deck.cards.length} cards</p>
                  <Link to={`/decks/${deck.id}/study`}>
                    <button type="button" className="btn btn-primary mr-2">
                      <i className="fa fa-book" aria-hidden="true"></i> Study
                    </button>
                  </Link>
                  <Link to={`/decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary mr-2">
                      {" "}
                      <i className="fa fa-eye" aria-hidden="true"></i> View
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger ml-5"
                    onClick={() => deleteWarnHandler(deck.id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </>
    );
  } else {
    return null;
  }
}
