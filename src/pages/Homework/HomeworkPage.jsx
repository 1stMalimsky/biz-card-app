import { Fragment, useCallback } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import AddBtnPartial from "./AddButtonPartial";
import SubBtnPartial from "./SubtractButtonpartial";

const HomeworkPage = () => {
  const [inputState, setInputState] = useState(1);
  const handleAddOne = () => {
    let newInputAdd = JSON.parse(JSON.stringify(inputState));
    newInputAdd = newInputAdd + 1;
    setInputState(newInputAdd);
  };

  const handleSubOne = () => {
    let newInputSub = JSON.parse(JSON.stringify(inputState));
    newInputSub = newInputSub - 1;
    setInputState(newInputSub);
  };

  /* const handleSubOne = useCallback(() => {
    let newInputSub = JSON.parse(JSON.stringify(inputState));
    newInputSub = newInputSub - 1;
    setInputState(newInputSub);
  }, [inputState]); */
  return (
    <Fragment>
      <h1>Hello</h1>
      <br />
      <h2>{inputState}</h2>
      <AddBtnPartial addFunc={handleAddOne} />
      <SubBtnPartial subFunc={handleSubOne} number={inputState} />
    </Fragment>
  );
};

export default HomeworkPage;
