document.getElementById("signout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html"; // Adjust the path if needed
});
