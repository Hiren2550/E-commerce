export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders?user.id=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchUserInfo(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/users/" + updateData.id,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + userId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ message: "sign out done" });
  });
}
