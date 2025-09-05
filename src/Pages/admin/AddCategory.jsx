import React, { useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../Redux/slices/categorySlice";
export default function AddCategory() {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, parent, active });

  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-lg font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category
            </label>
            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">None</option>
              <option value="kids">Kids</option>
              <option value="toys">Toys</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
            />
            <span className="text-sm">Active</span>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
