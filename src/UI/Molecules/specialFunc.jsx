import React, {useEffect} from 'react'
import { UserAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addMoviesFromFirestore } from "../../features/favouriteMovies/favouriteMovies";

 const SpecialFunc = ({movies}) => {
  
    const dispatch = useDispatch();

  
if (movies.length < 1) {return} else {

    dispatch(addMoviesFromFirestore(movies))
}
  

  
    return (
    <></>
  )
}

export default React.memo(SpecialFunc)
