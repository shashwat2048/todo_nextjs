"use client";
import { useState, useEffect } from "react";
import { Plus, X, Pencil } from "lucide-react";
import EditTaskModal from "./components/modal/EditTaskModal";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const initialTask: Task = {
  id: -1,
  title: "",
  description: "",
  completed: false,
};

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [inputTask, setInputTask] = useState<Task>(initialTask);
  const [isEditing, setEditStatus] = useState({
    editing: false,
    id: -1,
  });

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodoTask(e: React.FormEvent) {
    e.preventDefault();
    if (!inputTask.title.trim()) return;
    setTodos((prev) => [...prev, { ...inputTask, id: Date.now() }]);
    setInputTask(initialTask);
  }

  return (
    <>
      {isEditing.editing && (
        <EditTaskModal
          setEditStatus={setEditStatus}
          isEditing={isEditing}
          todos={todos}
          setTodos={setTodos}
        />
      )}

      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 text-black">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Your To‑Do List
          </h1>

          {/* Add Form */}
          <form
            className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row gap-4 sm:items-end"
            onSubmit={addTodoTask}
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={inputTask.title}
                  onChange={(e) =>
                    setInputTask({ ...inputTask, title: e.target.value })
                  }
                  placeholder="What do you need to do?"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={inputTask.description}
                  onChange={(e) =>
                    setInputTask({ ...inputTask, description: e.target.value })
                  }
                  placeholder="Describe it..."
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex-none inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition"
            >
              <Plus className="mr-2" />
              Add Task
            </button>
          </form>

          {/* Tasks List */}
          <ul className="mt-10 space-y-4">
            {todos.map((task) => (
              <li
                key={task.id}
                className={`
                  bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center
                  justify-between transition transform hover:scale-[1.01]
                  ${task.completed ? "opacity-50" : ""}
                `}
              >
                <div className="flex items-center mb-4 sm:mb-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      setTodos((prev) =>
                        prev.map((t) =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      )
                    }
                    className="h-6 w-6 text-indigo-600 border-gray-300 rounded transition"
                  />
                  <div className="ml-4">
                    <h3
                      className={`text-lg font-medium text-gray-800 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`text-gray-600 ${
                        task.completed ? "line-through" : ""
                      }`}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditStatus((s) => ({
                        editing: true,
                        id: task.id,
                      }))
                    }
                    className="p-2 text-gray-400 hover:text-indigo-600 transition"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setTodos((prev) => prev.filter((t) => t.id !== task.id))
                    }
                    className="p-2 text-gray-400 hover:text-red-500 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
