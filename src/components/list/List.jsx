import React from "react";
import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({ items, isRemovable, onClick, removeItem, activeItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li
            onClick={(e) => onClick(item)}
            key={item.name}
            className={
              item.className
                ? item.className
                : activeItem && item.id === activeItem.id
                ? "active"
                : ""
            }
          >
            <i>
              {item.icon ? (
                <img src={item.icon} alt="ListIcon" />
              ) : (
                <i
                  className={`badge`}
                  style={{ backgroundColor: item.color.hex }}
                ></i>
              )}
            </i>
            <span>
              {" "}
              {item.name} {item.tasks && `(${item.tasks.length})`}{" "}
            </span>
            {isRemovable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
              >
                <img src={removeSvg} alt="Remove icon" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
