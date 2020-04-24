import React, { useState, useEffect } from "react";
import axios from "axios";

import EditSvg from "../../assets/img/edit.svg";
import RemoveSvg from "../../assets/img/remove.svg";
import addSvg from "../../assets/img/add.svg";

import "./Tasks.scss";

export default function Tasks({ item, editItemName, addNewTask, removeTask }) {
  const [tasks, setTasks] = useState(item.tasks);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [addTaskForm, setAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(item.tasks);
  }, [item.tasks]);
  const completeTask = (task, id) => {
    axios
      .patch(`http://localhost:2000/tasks/${id}`, {
        completed: !task.completed,
      })
      .then(({ data }) =>
        setTasks(
          tasks.map((task) => {
            if (task.id === data.id) {
              return data;
            }
            return task;
          })
        )
      );
  };

  const editTask = (id, text) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.text = text;
        }
        return task;
      })
    );
  };

  const editTaskOnServer = (id, text) => {
    axios.patch(`http://localhost:2000/tasks/${id}`, {
      text: text,
    });
  };
  const editItemNameOnServer = (id, text) => {
    axios.patch(`http://localhost:2000/lists/${id}`, { name: text });
  };

  return (
    <div className="tasks">
      <h2 style={{color:item.color.hex}} className="tasks__title">
        {isEditTitle ? (
          <input style={{color:item.color.hex}}
            autoFocus
            onChange={(e) => editItemName(item.id, e.target.value)}
            onBlur={(e) => {
              editItemNameOnServer(item.id, e.target.value);
              setIsEditTitle(false);
            }}
            type="text"
            value={item.name}
          />
        ) : (
          item.name
        )}
        <img
          onClick={() => setIsEditTitle(true)}
          src={EditSvg}
          alt="Edit icon"
        />
      </h2>
      <div className="tasks__items">
        {!tasks.length && <h3>Задач нет</h3>}
        {tasks.map((task) => {
          return (
            <label key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task, task.id)}
              />
              <span>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                onChange={(e) => editTask(task.id, e.target.value)}
                onBlur={(e) => editTaskOnServer(task.id, e.target.value)}
                type="text"
                value={task.text}
              />
              <img
                className="removeBtn"
                onClick={() => removeTask(item.id, task.id)}
                src={RemoveSvg}
                alt="Remove icon"
              />
            </label>
          );
        })}
      </div>
      <div className="tasks__addNewItem">
        {!addTaskForm && (
          <div onClick={() => setAddTaskForm(true)} className="newItem-button">
            <img src={addSvg} alt="Add icon" />
            <p>Добавить задачу</p>
          </div>
        )}
        {addTaskForm && (
          <div className="newItemForm">
            <input
              onChange={(e) => setNewTask(e.target.value)}
              className="field"
              type="text"
              placeholder="Введите новую задачу"
              value={newTask}
            />
            <div className="buttons">
              <button
                onClick={() => {
                  if (newTask) 
                  {addNewTask(item.id, newTask);
                  setNewTask('')}
                }}
                className="button add-btn"
              >
                Добавить задачу
              </button>
              <button
                onClick={() => setAddTaskForm(false)}
                className="button cancel"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
