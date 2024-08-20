export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCartByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    //console.log(data);
    resolve({ data });
  });
}

export function updateCart(updateItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/cart/" + updateItem.id,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateItem),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(itemId),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId(userId);
    const items = response.data;
    for (let item of items) {
      const response = await deleteItem(item.id);
      resolve(true);
    }
    resolve({ status: "successfully reset cart" });
  });
}
