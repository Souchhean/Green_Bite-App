export const initialState = {
  allProductsFromApi: [],
  allCategories: [],
  inputSearch: "",
  filters: {
    rating: "",
    categories: [],
    price: [],
    sort: "",
  },
};


export const dataReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_FROM_API":
      return { ...state, allProductsFromApi: action.payload };

    case "GET_ALL_CATEGORIES":
      return { ...state, allCategories: action.payload };

    case "SEARCH":
      return { ...state, inputSearch: action.payload };

    case "ADD_RATINGS":
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };
      case "REMOVE_CATEGORY":
  return {
    ...state,
    filters: {
      ...state.filters,
      categories: state.filters.categories.filter(id => id !== action.payload),
    },
  };

    case "ADD_CATEGORIES": {
      const categories = state.filters.categories.includes(action.payload)
        ? state.filters.categories.filter((category) => category !== action.payload) // Remove if already present
        : [...state.filters.categories, action.payload]; // Add if not present

      return {
        ...state,
        filters: {
          ...state.filters,
          categories,
        },
      };
    }

    case "ADD_SORT":
      return {
        ...state,
        filters: { ...state.filters, sort: action.payload },
      };

    case "ADD_PRICE": {
      const priceExists = state.filters.price.some(
        (price) => price.min === action.payload.min && price.max === action.payload.max
      );

      const price = priceExists
        ? state.filters.price.filter((price) => price.min !== action.payload.min || price.max !== action.payload.max) // Remove if already present
        : [...state.filters.price, action.payload]; // Add if not present

      return {
        ...state,
        filters: {
          ...state.filters,
          price,
        },
      };
    }

    case "ADD_CATEGORIES_FROM_HOME":
      return {
        ...state,
        filters: { ...state.filters, categories: [action.payload] }, // Replace categories with the new one
      };

    case "CLEAR_FILTERS":
    case "RESET":
      return {
        ...state,
        inputSearch: "",
        filters: {
          rating: "",
          categories: [],
          price: [],
          sort: "",
        },
      };

    default:
      return state;
  }
};