import { Divider } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

let intervalId;

const NestedPage1 = () => {
  const [loadedState, setLoadedState] = useState("");
  const [counterState, setCounterState] = useState(1);
  useEffect(() => {
    setLoadedState("Component Loaded");
    intervalId = setInterval(() => {
      setCounterState((newCounterState) => newCounterState + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      console.log("component terminated");
    };
  }, []);
  return (
    <Fragment>
      <h2>Nested page 1</h2>
      <Divider />
      <h4>{loadedState}</h4>
      <h3>{counterState}</h3>
    </Fragment>
  );
};
export default NestedPage1;
