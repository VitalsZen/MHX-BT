import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.css';

function ToDoList() {
  const [tasks, setTasks] = useState([{ title: "task 1", description: "description 1" }, { title: "task 2", description: "description 2" }, { title: "task 3", description: "description 3" }]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: "", description: "" });

  const toggleModal = () => {
    setModal(!modal);
  };

  function handleTaskChange(e) {
    setNewTask(e.target.value);
  }

  function handleDescriptionChange(e) {
    setNewDescription(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "" && newDescription.trim() !== "") {
      setTasks(tasks => [...tasks, { title: newTask, description: newDescription }]);
      setNewTask("");
      setNewDescription("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function openTask(index) {
    setCurrentTask(tasks[index]);
    toggleModal();
  }

  return (
    <div className='Main'>
      <div className="to-do-list">
        <h1>To Do List</h1>

        <div>
          <input
            type="text"
            placeholder='Enter a task...'
            value={newTask}
            onChange={handleTaskChange}
          />
          <input
            type="text"
            placeholder='Enter a task description...'
            value={newDescription}
            onChange={handleDescriptionChange}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
        <div>
          <ol>
            {tasks.map((task, index) =>
              <li key={index}>
                <span
                  className="text"
                  onClick={() => openTask(index)}>
                  {task.title}
                </span>
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask(index)}>
                  ❌
                </button>
              </li>
            )}
          </ol>
        </div>

        {modal && <Modal currentTask={currentTask} toggleModal={toggleModal} />}
      </div>
    </div>
  );
}

export default ToDoList;
