import { TOGGLE_TYPES } from "../types/toggle"

export const toggleOn = () => ({type: TOGGLE_TYPES.SWITCH_ON})
export const toggleOff = () => ({type:TOGGLE_TYPES.SWITCH_OFF})