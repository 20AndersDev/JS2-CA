const API_URL_base = "https://api.noroff.dev/api/v1";

const loginUrl = API_URL_base + "/social/auth/login";

const loginForm = document.getElementById("loginForm");

 export const registerSuccess =  document.getElementById("successMessage");

loginForm.addEventListener("submit", async (login) => {
    login.preventDefault();
  
    const email = document.getElementById("loginEmail").value; 
    const password = document.getElementById("loginPassword").value; 
  
    const userData = {
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
        email: userData.email,
        password: userData.password,

      }),
    };
    const response = await fetch(url, loginPostData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    if (response.ok === false) {
      console.log("Invalid email or password");
    }
    
    } catch (error) {  
     
    console.log(error);
  }
}


