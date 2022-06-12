import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";

export default function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function getTheDeckToGetCards() {
      try {
        const decksInfo = await readDeck(deckId);
        setDeck(decksInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getTheDeckToGetCards();
  }, [deckId]);

  if (deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Edit Card {cardId}
            </li>
          </ol>
        </nav>
        <br />
        <h4>Edit Card</h4>
        <CardForm
          deckId={deckId}
          deck={deck}
          eventType="edit"
          cardId={cardId}
        />
      </>
    );
  } else {
    return <h4>Loading deck item...</h4>;
  }
}
