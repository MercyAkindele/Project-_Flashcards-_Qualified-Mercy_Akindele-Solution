import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

export default function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  

  useEffect(() => {
    async function getTheDeck() {
      let response = await readDeck(deckId);

      setDeck(response);
    }
    getTheDeck();
  }, [deckId]);

  const history = useHistory();

  const deleteWarnHandler = async (deckId) => {
    const wantToDelete = window.confirm(
      `Delete deck ID ${deckId}? You will not be able to recover it.`
    );
    if (wantToDelete) {
      async function deleteTheDeck() {
        try {
          await deleteDeck(deckId);
          setDeck(null);
          history.push("/");
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
  const deleteCardHandler = async (cardId) => {
    const wantToDeleteCard = window.confirm(
      `Delete this card? You will not be able to recover it.`
    );
    if (wantToDeleteCard) {
      async function putInInfoToDelete() {
        await deleteCard(cardId);
        const getDeletedCardOut = deck.cards.filter((card) => {
          return card.id !== cardId;
        });

        setDeck({ ...deck, cards: getDeletedCardOut });
      }
      putInInfoToDelete();
      //   need new filtered cards array
      // update state with new filtered cards
      // replace deck.cards with the new filtered cards
    }
  };

  if (deck && deck.cards) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa-solid fa-house"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>

        <div>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <Link to={`/decks/${deck.id}/edit`}>
            {" "}
            <button type="button" className="btn btn-primary mr-2">
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary mr-2">
              <i className="fa fa-book" aria-hidden="true"></i> Study
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary mr-2">
              <i className="fa fa-plus" aria-hidden="true"></i> Add Cards
            </button>
          </Link>
          <button
            className="btn btn-danger ml-5"
            onClick={() => deleteWarnHandler(deck.id)}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <h4>Cards</h4>
        {deck.cards.map((card) => {
          return (
            <div className="card mt-2">
              <div className="card-body" key={card.id}>
                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-2">
                    <p className="card-text">{card.front}</p>
                  </div>
                  <div className="col-sm-9 col-md-9 col-lg-10">
                    <p className="card-text">{card.back}</p>
                  </div>
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary ml-3 mr-2">
                      <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => deleteCardHandler(card.id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return null;
  }
}
