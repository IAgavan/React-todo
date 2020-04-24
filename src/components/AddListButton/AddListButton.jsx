import React, { useState } from "react";
import List from "../list/List";

import addSvg from "../../assets/img/add.svg";
import removeSvg from "../../assets/img/remove.svg";

import "./AddListButton.scss";

export default function AddListButton({ colors, addList }) {
  const [popup, setPopup] = useState(false);
  const [color, setColor] = useState(1);
  const [name, setName] = useState("");

  return (
    <div className="add-list">
      <List
        onClick={() => {
          setPopup(true);
        }}
        items={[
          {
            className: "grey",
            icon: addSvg,
            name: "Добавить список",
          },
        ]}
      />
      {popup && (
        <div className="add-list__popup">
          <button
            onClick={() => {
              setPopup(false);
              setName("");
            }}
            className="close-button"
          >
            <img src={removeSvg} alt="Remove icon" />
          </button>
          <input
            onInput={(e) => setName(e.target.value)}
            className="field"
            type="text"
            name=""
            id=""
            placeholder="Название списка"
          />
          <div className="colors">
            {colors.map((color) => (
              <div key={color.id}>
                <label htmlFor={color.name}>
                  <input
                    onInput={(e) => setColor(+e.target.value)}
                    name="color"
                    type="radio"
                    id={color.name}
                    value={color.id}
                  />
                  <span style={{ backgroundColor: color.hex }}></span>
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              if (name) {
                addList(color, name);
                setPopup(false);
                setName("");
              }
            }}
            className="button"
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}
