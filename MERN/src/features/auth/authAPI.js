export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        let error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function authUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/checkAuth");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        let data = await response.json();
        const error = { message: "unAuthorized" };
        reject(error);
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(email),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        let data = await response.json();
        const error = { message: "mail not sent" };
        reject(error);
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        let data = await response.json();
        const error = { message: "reset is not complete" };
        reject(error);
      }
    } catch (error) {
      reject({ error });
    }
  });
}
