export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilter(filter, sort, pagination) {
  // filter:{category:"Phones"}
  // sort:{_sort:"price",_order:'desc'}
  // pagination:{_page:1,_limit:10}
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
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const q = `http://localhost:8080/products?${queryString}`;
    //console.log(q);
    const response = await fetch(q);
    const data = await response.json();
    resolve({ data });
  });
}
// const test = async () => {
//   const data = await fetchProductById(4);
//   console.log(data);
// };
// test();
