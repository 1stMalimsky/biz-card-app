import { memo } from "react";

const SubBtnPartial = ({ subFunc, numebr }) => {
  console.log("Add - 1 Rendered");
  return <button onClick={subFunc}>Subtract -1</button>;
};

export default memo(SubBtnPartial, (a, b) => {
  if (a.number !== b.number) {
    return false;
  } else {
    return true;
  }
});
