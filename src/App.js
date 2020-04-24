import React, { useState, useEffect } from "react";
import { Route, Link, useHistory, Router } from "react-router-dom";
import axios from "axios";

import {
  List,
  Tasks,
  AddListButton,
  ListHeader,
} from "./components/components";

import listSvg from "./assets/img/list.svg";

function App() {
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeItem, setActiveItem] = useState();
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:2000/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setItems(data);
      });

    axios.get("http://localhost:2000/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  useEffect(() => {
    const itemId = history.location.pathname.split("/").pop();
    if (items) {
      const item = items.find(item => item.id === +itemId);
      
      setActiveItem(item);
    }
  }, [history.location.pathname, items]);

  const removeList = (id) => {
    axios.delete("http://localhost:2000/lists/" + id);
    setItems(items.filter((item) => item.id !== id));
  };

  const addList = (id, name) => {
    const newItem = {
      colorId: id,
      name,
    };
    axios.post("http://localhost:2000/lists", newItem).then(({ data }) => {
      setItems([
        ...items,
        { ...data, color: colors.filter((color) => color.id === id)[0] },
      ]);
    });
  };

  const editListName = (id, text) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          item.name = text;
        }
        return item;
      })
    );
  };

  const removeTask = (listId, taskId) => {
    axios.delete("http://localhost:2000/tasks/" + taskId);
    setItems(
      items.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      })
    );
  };

  const addNewTask = (id, text) => {
    const newTask = {
      listId: id,
      text: text,
      completed: false,
    };
    axios.post("http://localhost:2000/tasks", newTask).then(({ data }) => {
      setItems(
        items.map((item) => {
          if (item.id === id) {
            item.tasks = [...item.tasks, data];
          }
          return item;
        })
      );
    });
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <ListHeader
          onClick={() => {
            setActiveItem("header");
            history.push("/");
          }}
          icon={listSvg}
          activeItem={activeItem}
        />
        {items && (
          <List
            items={items}
            removeItem={removeList}
            onClick={(item) => {
              history.push(`/lists/${item.id}`);
            }}
            activeItem={activeItem}
            isRemovable
          />
        )}
        <AddListButton colors={colors} addList={addList} />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {items &&
            items.map((item) => {
              return (
                <Tasks
                  key={item.id}
                  item={item}
                  editItemName={editListName}
                  addNewTask={addNewTask}
                  removeTask={removeTask}
                />
              );
            })}
        </Route>
        {activeItem && activeItem !== "header" && (
          <Tasks
            item={activeItem}
            editItemName={editListName}
            addNewTask={addNewTask}
            removeTask={removeTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
