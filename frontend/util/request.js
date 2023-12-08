const baseurl = "http://192.168.15.6:8080/"
const headers = {
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    "Content-Type": "application/json"
  };

export function post(url,body) {
    return fetch(`${baseurl}${url}`,{
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
}

export function get(url, body) {
    return fetch(`${baseurl}${url}`,{
        method: "GET",
        headers: headers,
        body: JSON.stringify(body)
      });
}