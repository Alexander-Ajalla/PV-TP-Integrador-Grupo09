import { createSlice } from "@reduxjs/toolkit";

// Obtener el tema guardado en localStorage o usar light por defecto
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
};

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: getInitialTheme(), // light o dark
    },
    reducers: {
        toggleTheme: (state) => {  
            state.mode = state.mode === "light" ? "dark" : "light"; //se obtiene el estado de theme 
            // y se uardar en localStorage
            localStorage.setItem("theme", state.mode);  
        },
        setTheme: (state, action) => { 
            state.mode = action.payload;
            localStorage.setItem("theme", state.mode);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions; 
export default themeSlice.reducer;

