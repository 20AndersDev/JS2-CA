const API_URL_base = "https://api.noroff.dev/api/v1";

const loginUrl = API_URL_base + "/auth/login";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (login) => {
    login.preventDefault();
  
    const userName = document.getElementById("loginUsername").value;
    const email = document.getElementById("loginEmail").value; 
    const password = document.getElementById("loginPassword").value; 
  
    const userData = {
      username: userName,
      email: email,
      password: password,
    };
  
    await loginUser(loginUrl, userData);
  });

async function loginUser(url, userData) {
  try {
    const loginPostData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData, 
        name: userData.username,
        email: userData.email,
        password: userData.password,

      }),
    };
    const response = await fetch(url, loginPostData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const token = json.accessToken;
    console.log(token);
  }  catch (error) {
    console.log(error);
  }

  

}


