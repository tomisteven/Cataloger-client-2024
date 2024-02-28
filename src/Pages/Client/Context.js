import { createContext, useReducer } from "react";



export const themeContext = createContext();


const initialState = { darkMode: false };

/* const getUser = async() => {
  const id = localStorage.getItem("idcatalogo") ? localStorage.getItem("idcatalogo") : null;
  if (id) {
    const user = await fetch(`http://localhost:8080/c/${id}`);
    console.log(user);
    return user;
  }
};



export const userContext = createContext(getUser()); */



//export const userContext = createContext(getUser());




const themeReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
        return { darkMode: !state.darkMode };
      default:
        return state;
  }
};

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <themeContext.Provider value={{state, dispatch}}>{props.children}</themeContext.Provider>
  );
};
