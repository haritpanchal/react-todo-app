import React, { useState, useEffect } from 'react'
import './style.css';

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

export default function Todo() {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputData){
            alert("Please add value")
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((current) => {
                    if(current.id === isEditItem){
                        return { ...current, name: inputData }
                    }
                    return current;
                })
            )
            setToggleButton(false)
            setIsEditItem(null)
            setInputData("")
        }
        else{
            const myInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myInputData]);
            setInputData("")
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((current) => {
            return current.id !== index
        });
        setItems(updatedItems);
    }

    const editItem = (index) => {
        const item_todo_edited = items.find((current) => {
            return current.id === index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true)
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])
    

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <h2 className='main-title'>Create your TODO List</h2>
                <div className='addItems'>
                    <input type="text" 
                        placeholder='Add Items'
                        className='form-control'
                        value= {inputData}
                        onChange= {(event)=> setInputData(event.target.value)}
                    />
                    {
                        toggleButton 
                            ? <i className="fas fa-edit add-btn" onClick={addItem}></i> 
                            : <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    }
                </div>
                {/* {show items} */}
                <div className='showItems'>
                    {items.map(( current, index )=> {
                        return(
                            <div className='eachItem' key={current.id}>
                                <h3>{current.name}</h3>
                                <div className='todo-btn'>
                                    <i className="fas fa-edit add-btn" onClick={()=> editItem(current.id)}></i>
                                    {/* <i className="far fa-trash-alt add-btn"></i> */}
                                    <i className="fas fa-trash-alt" onClick={()=> deleteItem(current.id)}></i>
                                </div>
                            </div>
                        )
                    })}
                   
                </div>
                {/* {check all button} */}
                <div className='showItems'>
                    <button className='btn' onClick={removeAll}>
                        <span>Check List</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}