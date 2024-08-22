import React, { useEffect, useState } from 'react';
import {axiosInstance} from "../axiosInstance";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {FetchMyCollection} from "../FetchMyCollection";

const MyCollections = () => {
  const {username} = useParams();

  const {collections, loading, error} = FetchMyCollection(username)
  console.log(collections)
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;


  return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Latest Collections</h2>
        <div>
          {collections.map((collection) => (
              <div key={collection.id} className="mb-4">
                <h3 className="text-lg font-bold">
                  <Link to={`/collection/${collection.id}`} className="text-blue-500 hover:underline">
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
  )


};
export {MyCollections};
