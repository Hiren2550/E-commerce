export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart", {
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
    // console.log(userId);
    const response = await fetch("/api/cart?user=" + userId);
    const data = await response.json();
    //console.log(data);
    resolve({ data });
  });
}

export function updateCart(updateItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/" + updateItem.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateItem),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteItem(itemId) {
  return new Promise(async (resolve) => {
    // console.log(itemId);
    const response = await fetch("/api/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId(userId);
    const items = response.data;
    // console.log(items);
    for (let item of items) {
      const response = await deleteItem(item.id);
      resolve(true);
    }
    resolve({ status: "successfully reset cart" });
  });
}
