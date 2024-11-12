// src/App.js
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import './index.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ description: '', date: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    // Add a new task
    const addTask = () => {
        if (newTask.description.trim() && newTask.date) {
            setTasks([
                ...tasks,
                { ...newTask, id: Date.now(), completed: false }
            ]);
            setNewTask({ description: '', date: '' });
        }
    };

    // Edit a task
    const editTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setNewTask({ description: taskToEdit.description, date: taskToEdit.date });
        setIsEditing(true);
        setCurrentTaskId(id);
    };

    // Save edited task
    const saveTask = () => {
        setTasks(
            tasks.map((task) =>
                task.id === currentTaskId ? { ...task, ...newTask } : task
            )
        );
        setNewTask({ description: '', date: '' });
        setIsEditing(false);
        setCurrentTaskId(null);
    };

    // Delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle completion of a task
    const toggleCompletion = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="task-app">
            <h1>Task Manager</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
                {isEditing ? (
                    <button onClick={saveTask}>Save Task</button>
                ) : (
                    <button onClick={addTask}>Add Task</button>
                )}
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span>
                            <strong>{task.description}</strong> - {task.date}
                        </span>
                        <div className="task-actions">
                            <FaCheck
                                className="icon check"
                                onClick={() => toggleCompletion(task.id)}
                                title="Mark as Done"
                            />
                            <FaEdit
                                className="icon edit"
                                onClick={() => editTask(task.id)}
                                title="Edit Task"
                            />
                            <FaTrash
                                className="icon delete"
                                onClick={() => deleteTask(task.id)}
                                title="Delete Task"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
