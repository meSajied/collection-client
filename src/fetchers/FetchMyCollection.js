import { useState, useEffect } from 'react';
import {axiosInstance} from "../axiosInstance";

const FetchMyCollection = (username) => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axiosInstance.get(`/collections/user/${username}`);
        const dataArray = Array.isArray(res.data) ? res.data : [res.data];
        setCollections(prev => [...prev, ...dataArray]);
        //setCollections(res.data);
        console.log(collections)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, []);

  return {collections, loading, error}
};

export {FetchMyCollection}
