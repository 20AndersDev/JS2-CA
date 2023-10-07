const API_URL_base = "https://api.noroff.dev/api/v1";
const registerNewUserUrl = `${API_URL_base}/social/auth/register`;

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

    if (response.ok) {
      // Registration was successful
      window.location.href = "../index.html?registration=success";
    } else if (response.status === 400){
      const errorMessageElement = document.getElementById("errorMessage");
      errorMessageElement.textContent = "User already exists, please login.";
      errorMessageElement.style.display = "block";
    }
  } catch (error) {
    
  }

}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", async (register) => {
  register.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const userData = {
    name,
    email,
    password,
  };

  await registerNewUser(registerNewUserUrl, userData);
});

const urlParams = new URLSearchParams(window.location.search);
const registrationSuccess = urlParams.get("registration");

if (registrationSuccess === "success") {
  // Display the success message
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "block";
  }
}