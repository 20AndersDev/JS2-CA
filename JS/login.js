const API_URL_base = "https://api.noroff.dev/api/v1";

const loginUrl = API_URL_base + "/auth/login";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (login) => {
    login.preventDefault();
  
    const userName = document.getElementById("loginUsername").value; 
    const password = document.getElementById("loginPassword").value; 
  
    const userData = {
      userName: userName,
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
        username: userData.userName, // Add the "username" field
      }),
    };
    const response = await fetch(url, loginPostData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const token = json.accessToken;
    console.log(token);
  } catch (error) {
    console.log(error);
  }
}


