import React from 'react';
import {Link} from 'react-router-dom';
import {FetchData} from '../fetchers/FetchData';
import {useAuth} from "../account/Authentication";
import {Navigate} from "react-router";
import {Navbar} from "../Navbar";

const Dashboard = () => {
  const { categories, collections, loading, error } = FetchData();

  console.log(collections
  )
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="p-4">
        <div>
          <Navbar />
        </div>
        <div className="p-3">
          <h2 className="text-xl font-bold mb-4">Largest Categories</h2>
          <ul className="flex items-start">
            {categories.map((category) => (
                <li key={category.id} className="m-2 border border-gray-200 rounded p-2 font-semibold">
                  <Link to={`/category/${category.id}`} className="text-blue-500 hover:underline">
                    {category.name}
                  </Link>
                </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Latest Collections</h2>
          <div>
            {collections.map((collection) => (
                <div key={collection.id} className="mb-4">
                  <h3 className="text-lg font-bold">
                    <Link to={`/collection/id/${collection.id}`} className="text-blue-500 hover:underline">
                      {collection.name}
                    </Link>
                  </h3>
                  <p>Author: {collection.username}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {collection.categories.map((category) => (
                        <span
                            key={category.id}
                            className="bg-gray-200 px-2 py-1 rounded text-sm">
                          {category.name}
                        </span>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export {Dashboard};
