export const trColor = (param: string) => {
  switch (param) {
    case "Urgent":
      return "red";
    case "Regular":
      return "yellow";
    case "Trivial":
      return "lightGreen";
    default:
      return "white";
  }
};
