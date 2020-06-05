import printMe from "./imported-m";

const value = { prop: "Prop" };

const anonyFunc = () => {
  console.log("This is anony.");
};

const newValue = {
  ...value,
  newProp: "New Prop",
};

anonyFunc();
printMe(value.prop);
printMe(`${newValue.prop} and ${newValue.newProp}`);
