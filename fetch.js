const log = console.log;

const credentials = {
  username: "myusername",
  password: "mypassword",
};

var customHeaders = {
  "Content-Type": "application/json",
  Accept: "application/vnd.listen.v4+json",
};

var myToken = "";

//Login to Listen.moe
fetch("https://listen.moe/api/login", {
  method: "POST",
  headers: customHeaders,
  body: JSON.stringify(credentials),
})
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    log(result);
    sessionStorage.setItem("myToken", JSON.stringify(result.token));
    myToken = JSON.parse(sessionStorage.getItem("myToken"));
    customHeaders.Authorization = `Bearer ${myToken}`;
    return fetch("https://listen.moe/api/songs", {
      method: "GET",
      headers: customHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        log(result);
      })
      .catch((error) => {
        log(error);
      });
  })
  .catch((error) => {
    log(`ERROR: ${error}`);
  });
