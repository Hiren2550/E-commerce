export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilter(filter) {
  // filter:{category:"Phones"}
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    const q = `http://localhost:8080/products?${queryString}`;
    console.log(q);
    const response = await fetch(q);
    const data = await response.json();
    resolve({ data });
  });
}
// const test = async () => {
//   const data = await fetchAllProductsByFilter({
//     category: "men",
//     brand: "Snitch",
//   });
//   console.log(data);
// };
// test();
