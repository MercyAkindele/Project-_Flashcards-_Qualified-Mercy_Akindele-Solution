import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

export default function CreateDeck() {
  const initialFormState = { name: "", description: "" };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { deckId } = useParams();
  const history = useHistory();

  const createDeckHandler = (e) => {
    e.preventDefault();
    async function addDeckToList() {
      try {
        const response = await createDeck(formData);
        history.push(`/decks/${response.id}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    addDeckToList();
  };

  const inputHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

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
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={createDeckHandler}>
        <h1>Create Deck</h1>
        <div className="form-group">
          <label htmlFor="controlInput1">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            value={formData.name}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="textarea1">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            value={formData.description}
            onChange={inputHandler}
          ></textarea>
        </div>
        <Link to="/">
          <button className="btn btn-secondary" type="cancel">
            Cancel
          </button>
        </Link>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
