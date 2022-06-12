import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link } from "react-router-dom";
import CardForm from "../Cards/CardForm";
// making a new card!!
export default function DeckItem() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await readDeck(deckId);

        setDeck(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDeck();
  }, [deckId]);

  if (deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa-solid fa-house"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>
        <br />
        <h4>{deck.name}: Add Card</h4>
        <CardForm deckId={deckId} deck={deck} eventType="create" />
      </>
    );
  } else {
    return <h4>Loading deck item...</h4>;
  }
}
