export const salesPointType = "Camisas";
export const name = "Deportivas";
export const categories = [
  { id: 1, name: "Fútbol" },
  { id: 2, name: "NBA" },
  { id: 3, name: "F1" },
];
export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
