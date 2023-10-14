const API_URL_base = "https://api.noroff.dev/api/v1";
const loginUrl = API_URL_base + "/social/auth/login";
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (login) => {
  login.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  

  const userData = {
    email: email,
    password: password,
  };

  if (!email || !password) {
    // Check if email or password is missing and display an error message.
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = "Please fill out all fields.";
    return;
  }

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
    const json = await response.json();

    if (response.status === 401) {
      // Handle invalid email or password error
      const errorContainer = document.getElementById("errorContainer");
      errorContainer.innerHTML = "Invalid email or password. Make sure you typed an valid Noroff email and correct password.";
    } else if (response.status === 200) {
      const accessToken = await json.accessToken;
      const name = await json.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
      window.location.href = "/profile/index.html";
    } else {
      // Handle other errors
      console.log("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const registrationSuccess = urlParams.get("registration");

if (registrationSuccess === "success") {
  // Display the success message
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "block";
  }
}

