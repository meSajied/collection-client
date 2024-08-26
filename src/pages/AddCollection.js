import React, {useEffect, useState} from "react";
import { axiosInstance } from "../axiosInstance";
import {useAuth} from "../account/Authentication";

const AddCollection = () => {
  const {user} = useAuth();
  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");

  const [form, setForm] = useState({collection:{}, file: null})

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const addCategory = () => {
    if(categoryInput.trim()) {
      const nw = {name: categoryInput.trim()}
      const updatedCategories = [...categories, nw];
      setCategories(updatedCategories);

      console.log(categories)
      setCategoryInput("");
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setCollectionName(name);

  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collection = new FormData();

    collection.append("collectionName", collectionName);
    collection.append("description", description);
    collection.append("categories", categories);
    collection.append("username", user.username);

    const formData = new FormData();
    formData.append("collection", new Blob([JSON.stringify(collection)], {
      type: "application/json"
    }));
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/collections/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Collection added:", response.data);
    } catch (error) {
      console.error("Error adding collection:", error);
    }

  };

  return (
      <form onSubmit={handleSubmit} className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="collectionName">
            Collection Name
          </label>
          <input
              type="text"
              id="collectionName"
              value={collectionName}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border rounded-md"
              required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
              type="test"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border rounded-md"
              required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="categories">
            Categories
          </label>
          <div className="flex items-center">
            <input
                type="text"
                id="categories"
                value={categoryInput}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border rounded-md"
            />
            <button
                type="button"
                onClick={addCategory}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {/*
            {categories.map((category, index) => (
                <li key={index} className="bg-gray-200 inline-block px-3 py-1 rounded-full text-sm font-medium text-gray-700 mr-2 mt-1">
                  {category}
                </li>
            ))}
            */}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Add Collection
        </button>
      </form>
  );
};

export { AddCollection };
