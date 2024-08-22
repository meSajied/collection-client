import { useState, useEffect } from 'react';
import {axiosInstance} from "./axiosInstance";

const FetchData = () => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const responseCategory = await axiosInstance.get('/collections/largest');
        setCategories(responseCategory.data);
        const responseCollection = await axiosInstance.get('/collections/latest');
        setCollections(responseCollection.data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, []);

  return {categories, collections, loading, error}
};

export {FetchData}
