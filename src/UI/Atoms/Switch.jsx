import * as React from "react";
import Switch from "@mui/material/Switch";
import { useSelector, useDispatch } from "react-redux";
import { toggleOff, toggleOn } from "../../store/actions/toggle";
import { TOGGLE_TYPES } from "../../store/types/toggle";

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const dispatch = useDispatch();
  const { isSwitchedOn } = useSelector((state) => state.toggle);

  // console.log(isSwitchedOn);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        onClick={() =>
          isSwitchedOn
            ? dispatch(toggleOff())
            : dispatch(toggleOn())
        }
      />
    </div>
  );
}
