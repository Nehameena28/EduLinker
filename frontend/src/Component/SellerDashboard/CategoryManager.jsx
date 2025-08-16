import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = localStorage.getItem("email");

  // Default categories
  const defaultCategories = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", 
    "Python", "Java", "C++", "Data Science"
  ];

  useEffect(() => {
    fetchUserCategories();
  }, []);

  const fetchUserCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/seller/categories?email=${userEmail}`, {
        withCredentials: true,
      });
      setCategories(response.data.categories || defaultCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories(defaultCategories);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim() || categories.includes(newCategory.trim())) {
      alert("Category already exists or is empty");
      return;
    }

    setIsLoading(true);
    try {
      const updatedCategories = [...categories, newCategory.trim()];
      await axios.post("http://localhost:7000/api/seller/categories", {
        email: userEmail,
        categories: updatedCategories
      }, { withCredentials: true });
      
      setCategories(updatedCategories);
      setNewCategory("");
      alert("Category added successfully!");
    } catch (error) {
      console.error("Failed to add category:", error);
      alert("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const removeCategory = async (categoryToRemove) => {
    if (categories.length <= 1) {
      alert("You must have at least one category");
      return;
    }

    setIsLoading(true);
    try {
      const updatedCategories = categories.filter(cat => cat !== categoryToRemove);
      await axios.post("http://localhost:7000/api/seller/categories", {
        email: userEmail,
        categories: updatedCategories
      }, { withCredentials: true });
      
      setCategories(updatedCategories);
      alert("Category removed successfully!");
    } catch (error) {
      console.error("Failed to remove category:", error);
      alert("Failed to remove category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-[rgb(221,167,123)]/20">
      <h3 className="font-semibold text-[rgb(31,91,120)] text-base mb-4">
        Manage Categories
      </h3>
      
      {/* Add Category */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:border-[rgb(148,93,94)] focus:outline-none text-sm"
          onKeyPress={(e) => e.key === 'Enter' && addCategory()}
        />
        <button
          onClick={addCategory}
          disabled={isLoading || !newCategory.trim()}
          className="px-4 py-2 bg-[rgb(148,93,94)] text-white rounded-md hover:bg-[rgb(148,93,94)]/90 disabled:bg-gray-400 text-sm transition"
        >
          Add
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600 mb-2">Your Categories ({categories.length}):</p>
        <div className="max-h-48 overflow-y-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition"
            >
              <span className="text-sm text-[rgb(31,91,120)]">{category}</span>
              <button
                onClick={() => removeCategory(category)}
                disabled={isLoading || categories.length <= 1}
                className="text-red-500 hover:text-red-700 disabled:text-gray-400 text-sm px-2 py-1 rounded transition"
                title={categories.length <= 1 ? "Must have at least one category" : "Remove category"}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="mt-2 text-sm text-gray-500">
          Updating categories...
        </div>
      )}
    </div>
  );
};

export default CategoryManager;