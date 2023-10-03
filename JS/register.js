const API_URL_base = "https://api.noroff.dev/api/v1";

const registerNewUserUrl = API_URL_base + "/social/auth/register";

async function registerNewUser(url, userData) {
  try {
    const registerPostData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, registerPostData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async (register) => {
  register.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const userData = {
    name: name,
    email: email,
    password: password,
  };

  await registerNewUser(registerNewUserUrl, userData);
});
