import React from "react";

export default function Listheader({ icon, onClick, activeItem }) {
  return (
    <div className="list">
      <ul>
        <li onClick={onClick} className={(activeItem && activeItem.id === "All")? "active": null}>
          <i>
            <img src={icon} alt="ListIcon" />
          </i>
          <span>"Все задачи"</span>
        </li>
      </ul>
    </div>
  );
}
