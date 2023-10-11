import { API_URL_base } from "./apicalls.js";

async function deletePost(url) {
    try {
        const deletePostData = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await fetch(url, deletePostData);

        return response; 
    } catch (error) {
        console.log(error);
    }
}

const modal = document.getElementById("deletePostModal");

export function createDeleteButton(post) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");

    // Create an <i> element for the delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-can");

    // Append the delete icon to the button
    deleteButton.appendChild(deleteIcon);

    // Add an event listener to open the delete confirmation modal and set the query URL
    deleteButton.addEventListener("click", () => {
        const deletePostUrl = `${API_URL_base}/social/posts/${post.id}`;
        modal.style.display = "block";
        modal.setAttribute("data-delete-url", deletePostUrl);
    });

    document.getElementById("confirmDeleteButton").addEventListener("click", async () => {
        const modal = document.getElementById("deletePostModal");
        const deletePostUrl = modal.getAttribute("data-delete-url");
        await deletePost(deletePostUrl);
        modal.style.display = "none";
        window.location.reload(); 
    });

    const closeModal = document.getElementById("cancel-modal");

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    if (localStorage.getItem("name") !== post.author.name) {
        deleteButton.style.display = "none"; 
    }

    return deleteButton;
}
