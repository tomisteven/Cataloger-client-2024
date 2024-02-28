export class Auth {
  url = `http://localhost:8080/`;

  //funcion para loguear al usuario
  async login(user) {
    const response = await fetch(`${this.url}auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }

  async register(user) {
    const response = await fetch(`${this.url}auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        repeatPassword: user.repeatPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }


  async updateUser(user, accessToken) {
    const response = await fetch(`${this.url}update/user`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    const result = await response.json();
    return result;
  }

  //funcion para refrescar el token
  async refreshToken(refreshToken) {
    const response = await fetch(`${this.url}refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }

  async setAccessToken(accessToken) {
    localStorage.setItem("accessTokenV2", accessToken);
  }

  //funcion para obtener el token de acceso
  getAccessToken() {
    const accessToken = localStorage.getItem("accessTokenV2");
    if (!accessToken || accessToken === "undefined") return null;
    return accessToken;
  }
  //funcion para obtener el token de refresco
  getRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || refreshToken === "undefined") return null;
    return refreshToken;
  }

  //funcion para guardar el token de refresco
  setRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  //funcion para cerrar sesion
  removeTokens() {
    localStorage.removeItem("accessTokenV2");
    localStorage.removeItem("refreshToken");
  }
}
