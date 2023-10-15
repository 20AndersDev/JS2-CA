import { editPostUrl } from "./apicalls.js";

async function editPost(url, postData) {
    try {
        const editPostData = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        };
        const response = await fetch(url, editPostData);
        const json = await response.json();
        console.log(json);
        return json; 
    } catch (error) {
        console.log(error);
    }
}

export function createEditButton(post) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning");


    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pencil");


    editButton.addEventListener("click", () => {

        const closeBtn = document.querySelector(".close-button");
        closeBtn.addEventListener("click", () => {
            const modal = document.getElementById("edit-post-modal");
            modal.style.display = "none";
        });

    
        const modal = document.getElementById("edit-post-modal");
        modal.style.display = "block";

        document.getElementById("edit-post-title").value = post.title;
        document.getElementById("edit-post-body").value = post.body;
        document.getElementById("edit-post-media").value = post.media;

        const editPostUrlWithQueryParam = `${editPostUrl}?postId=${post.id}`;


        const editForm = document.getElementById("edit-post-form");
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();


            const editedData = {
                title: document.getElementById("edit-post-title").value,
                body: document.getElementById("edit-post-body").value,
                media: document.getElementById("edit-post-media").value,
            };

            await editPost(editPostUrlWithQueryParam, editedData);
            await editPost(editPostUrl, editedData);
            const modal = document.getElementById("edit-post-modal");
            modal.style.display = "none";


    window.location.reload();
});

    });

    if (localStorage.getItem("name") !== post.author.name) {
        editButton.style.display = "none"; 
    }


    editButton.appendChild(editIcon);

    return editButton;
}

