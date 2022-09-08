export const order = (param: string) => {
  switch (param) {
    case "Urgent":
      return 1;
    case "Regular":
      return 2;
    case "Trivial":
      return 3;
    default:
      return 0;
  }
};
