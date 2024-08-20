export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchOrderById(orderId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + orderId);
    const data = await response.json();
    //console.log(data);
    resolve({ data });
  });
}
