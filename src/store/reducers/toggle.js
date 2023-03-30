import { TOGGLE_TYPES } from "../types/toggle"

const initialState = {
    isSwitchedOn: false
}

export const toggleReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_TYPES.SWITCH_ON: 
         return {...state, isSwitchedOn:true}

        case TOGGLE_TYPES.SWITCH_OFF:
            return {...state, isSwitchedOn:false} 
        default:
            return state
    }
}