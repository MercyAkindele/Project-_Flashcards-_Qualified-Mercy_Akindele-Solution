import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateCard, createCard, readCard } from "../utils/api/index";

export default function CardForm({ deckId, deck, eventType, cardId }) {
  const initialFormState = { front: "", back: "" };
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  useEffect(() => {
    async function readCardInfo() {
      try {
        const cardInfo = await readCard(cardId);
        setFormData(cardInfo);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    cardId && readCardInfo();
  }, [cardId]);

  const inputHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const createFunc = async () => {
    await createCard(deckId, formData);
    setFormData(initialFormState);
  };

  const editFunc = async () => {
    await updateCard(formData);
    history.push(`/decks/${deckId}`);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    async function includeCard() {
      try {
        if (eventType === "create") {
          await createFunc();
        } else if (eventType === "edit") {
          await editFunc();
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    includeCard();
  };

  return (
    <form onSubmit={saveHandler}>
      <div className="form-group w-75">
        <label htmlFor="frontTextarea">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          rows="3"
          placeholder="Front side of card"
          onChange={inputHandler}
          value={formData.front}
        ></textarea>
      </div>
      <div className="form-group w-75">
        <label htmlFor="backTextarea">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          placeholder="Back side of card"
          onChange={inputHandler}
          value={formData.back}
        ></textarea>
      </div>
      <Link to={`/decks/${deck.id}`}>
        <button type="button" className="btn btn-secondary mr-2">
          Done
        </button>
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
