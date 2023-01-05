import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

export default function Todo() {
  var visualMode = localStorage.getItem("darkMode");
  var current_lightmode = ( visualMode === 'true' ? true : false);
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [lightMode, setLightMode] = useState(current_lightmode);
  const addItem = () => {
    if (!inputData) {
      alert("Please add value");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((current) => {
          if (current.id === isEditItem) {
            return { ...current, name: inputData };
          }
          return current;
        })
      );
      setToggleButton(false);
      setIsEditItem(null);
      setInputData("");
    } else {
      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((current) => {
      return current.id !== index;
    });
    setItems(updatedItems);
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((current) => {
      return current.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  const toggleHandler = () => {

    if (lightMode) {
      setLightMode(false);
      localStorage.setItem("darkMode", "false");
    }
    else{
      console.log('here');
      setLightMode(true);
      localStorage.setItem("darkMode", "true");
    }
  };


  var isChecked = visualMode === "true" ? "checked" : "";

  return (
    <>
      <div className={`main-div ${visualMode === "true" ? "dark" : ""}`}>
        <div className="child-div">
          <div className="dark-light-nav">
            <input
              type="checkbox"
              class="checkbox"
              id="checkbox"
              onChange={toggleHandler}
              checked={isChecked}
            />
            <label for="checkbox" class="label">
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
              <div class="ball" />
            </label>
          </div>
          <h2 className="main-title">Add Items</h2>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fas fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* {show items} */}
          <div className="showItems">
            {items.map((current, index) => {
              return (
                <div className="eachItem" key={current.id}>
                  <h3>{current.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fas fa-edit add-btn"
                      onClick={() => editItem(current.id)}
                    ></i>
                    {/* <i className="far fa-trash-alt add-btn"></i> */}
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => deleteItem(current.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* {check all button} */}
          <div className="showItems">
            <button className="btn" onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
          <div>
            <p className="bio">by Harit Panchal</p>
            <p className="bio">v1.3</p>
          </div>
        </div>
      </div>
    </>
  );
}
