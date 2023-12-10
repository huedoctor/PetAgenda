import userData from "./userData";

const baseurl = "http://192.168.0.102:8080/"
const defaultHeaders = {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    "Content-Type": "application/json"
  };

const headersWithUser = async () => {
  const user = await userData.getuser();
  if (user) {
    return {
      ...defaultHeaders,
      ...user,
    };
  }
  return defaultHeaders;
};

export async function post(url,body) {
  const headers = await headersWithUser();
    return fetch(`${baseurl}${url}`,{
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
}

export async function get(url) {
  const headers = await headersWithUser();
    return fetch(`${baseurl}${url}`,{
        method: "GET",
        headers: headers,
      });
}