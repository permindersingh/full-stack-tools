const printMe = (value = "No Value") => {
  console.log(`This is the value required to be printed: ${value}`);
};

export default printMe;

// Remember: Do not do export default printMe = () => {}. This is wrong.