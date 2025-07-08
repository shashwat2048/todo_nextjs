//@ts-nocheck
import { useState } from "react";

export default function EditTaskModal({
  setEditStatus,
  isEditing,
  todos,
  setTodos,
}) {
  // Grab the task being edited
  const [editTask, setEditTask] = useState(
    todos.find((t) => t.id === isEditing.id) || { title: "", description: "" }
  );

  const updateTodo = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === isEditing.id
          ? { ...todo, title: editTask.title, description: editTask.description }
          : todo
      )
    );
    setEditStatus({ editing: false, id: -1 });
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/10 backdrop-blur-sm text-black
      "
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Task</h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="
                w-full border-b-2 border-gray-300 pb-2
                focus:outline-none focus:border-indigo-500 transition
              "
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              rows={3}
              className="
                w-full border-b-2 border-gray-300 pb-2
                focus:outline-none focus:border-indigo-500 transition
                resize-none
              "
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setEditStatus({ editing: false, id: -1 })}
            className="
              px-4 py-2 rounded-md text-gray-600
              hover:bg-gray-100 transition
            "
          >
            Cancel
          </button>
          <button
            onClick={updateTodo}
            className="
              px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md
              hover:bg-indigo-700 transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
