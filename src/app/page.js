"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiTrash } from "react-icons/fi";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (taskInput.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        content: taskInput,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTaskInput("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task Added!");
    }
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // toast.success("Task Completed!");
  };

  const handleTaskRemoval = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task Removed!");
  };

  const title = "TaskTrackrr | Homepage";

  return (
    <div>
      <title>{title}</title>
      <div>
        <Toaster />
      </div>

      <div className="backgroundBlack">
        <Image
          src="/logo.png"
          alt=""
          className="imgLogo"
          width={230}
          height={123}
        />
        <div className="upperContent">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Add a New Task"
              className="addTaskInput"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <button type="submit" className="addTaskButton">
              <div className="flex">
                <p>Add Task</p>
                <img src="/plus.svg" />
              </div>
            </button>
          </form>
        </div>
      </div>

      <div className="content">
        <div className="flex2 sp">
          <div className="flex2">
            <p className="taskCreatedP">All Tasks</p>
            <p className="counter">{tasks.length}</p>
          </div>
          <div className="flex2">
            <p className="taskCompletedP">Completed</p>
            <p className="counter">
              {tasks.filter((task) => task.completed).length}
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="noTasks">
            <img src="/clipboard.svg" />
            <div className="nothingParagraph">
              <p>You do not have any task</p>
              <p>Add tasks and organize them</p>
            </div>
          </div>
        ) : (
          <div className="tasksContainer">
            {tasks.map((task) => (
              <div key={task.id} className="task">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletion(task.id)}
                  className="taskCheckbox"
                />
                <p
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#808080" : "inherit",
                  }}
                  className="taskContent"
                >
                  {task.content}
                </p>
                <button
                  onClick={() => handleTaskRemoval(task.id)}
                  className="taskRemove"
                >
                  {/* <img src="/trash.svg" /> */}
                  <FiTrash className="trashIcon" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
