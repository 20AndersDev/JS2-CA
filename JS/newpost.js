import { newPostUrl } from "./apicalls.js";

const newPostForm = document.getElementById("newPostForm");

async function createNewPost(url, postData) {
    try {
        const newPostData = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        };
        const response = await fetch(url, newPostData);
        const json = await response.json();
        console.log(json);
        return json; 
    } catch (error) {
        console.log(error);
    }
}

newPostForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const newPostTitle = document.getElementById("post-form-title").value;

    const newPostBody = document.getElementById("post-form-body").value || "";
    const newPostMedia = document.getElementById("post-form-media").value || "";

    const postData = {
        title: newPostTitle,
        body: newPostBody,
        media: newPostMedia,
    };

    const response = await createNewPost(newPostUrl, postData);
    
    if (response && response.id) {
        formSuccess();
        window.location.reload();
    }
});

function formSuccess() {
    const successMessage = document.getElementById("post-success");
    successMessage.style.display = "block";

    document.getElementById("post-form-title").value = "";
    document.getElementById("post-form-body").value = "";
    document.getElementById("post-form-media").value = "";
}
