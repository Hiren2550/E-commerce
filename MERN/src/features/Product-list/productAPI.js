export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilter(filter, sort) {
  // filter:{category:"Phones"}
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length > 0) {
      const lastValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async (resolve) => {
    const q = `http://localhost:8080/products?${queryString}`;
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
