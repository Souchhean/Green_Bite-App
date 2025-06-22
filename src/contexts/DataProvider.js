import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getAllCategories, getAllProducts } from "../services/services";
import { dataReducer, initialState } from "../reducer/dataReducer";
import { categories } from "../backend/db/categories";
import { products } from "../backend/db/products";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAllProductsData = async () => {
    try {
      const response = await getAllProducts();
      if (response.request.status === 200) {
        dispatch({
          type: "GET_ALL_PRODUCTS_FROM_API",
          payload: response.data.products,
        });
      } else {
        dispatch({
          type: "GET_ALL_PRODUCTS_FROM_API",
          payload: products,
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      dispatch({
        type: "GET_ALL_PRODUCTS_FROM_API",
        payload: products,
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await getAllCategories();
      if (response.request.status === 200) {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          payload: response.data.categories,
        });
      } else {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          payload: categories,
        });
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: categories,
      });
    }
  };

  useEffect(() => {
    getAllProductsData();
    getCategoriesData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);