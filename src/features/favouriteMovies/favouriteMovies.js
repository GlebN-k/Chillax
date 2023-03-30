

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { onSnapshot, doc } from "firebase/firestore";
// import { db } from "../../firebase";
// import { UserAuth } from "../../Context/AuthContext";

const initialState = []

// const {user} = UserAuth()


// export const fetchMovies = createAsyncThunk("favouriteMovies/fetchMovies", async() => {
//     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
//         return doc.data().savedShows
//     })
// })

const favouriteMovies = createSlice ({
    name: "favouriteMovies",
    initialState,
    reducers: {
        addFavouriteMovie: (state, action) => {
            state.push(action.payload)
        },
        deleteFavouriteMovie: (state, action) => {
            state.filter(movie => movie.id !== action.payload.id)
        },
        addMoviesFromFirestore: (state, action) => {
            state.push(...action.payload)
        }
    },
    // extraReducers: {
    //     [fetchMovies.fulfilled]: (state, action) => {
    //         state = action.payload
    //     }
    // }
})

export const {addFavouriteMovie, deleteFavouriteMovie, addMoviesFromFirestore } = favouriteMovies.actions

export default favouriteMovies.reducer


// import { createSlice } from "@reduxjs/toolkit";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../../firebase"; // імпортуємо ініціалізований об'єкт firebase db з іншого модуля

// const favouriteMovies = createSlice({
//   name: "favouriteMovies",
//   initialState: [], // Початковий стан відображає порожній список улюблених фільмів.
//   reducers: {
//     addFavouriteMovie: (state, action) => {
//       state.push(action.payload);
//     },
//     deleteFavouriteMovie: (state, action) => {
//       state.filter((movie) => movie.id !== action.payload.id);
//     },
//   },
// });

// export const { addFavouriteMovie, deleteFavouriteMovie } = favouriteMovies.actions;

// // Тепер наш reducer повертає стан, отриманий з Firestore, замість початкового порожнього списку.
// export default favouriteMovies.reducer = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   const movies = querySnapshot.docs.map((doc) => doc.data().movies);
//   return movies;
// };