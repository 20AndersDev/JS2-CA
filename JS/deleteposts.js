import { API_URL_base } from "./apicalls.mjs";

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
        return(error);
    }
}

const modal = document.getElementById("deletePostModal");

/**
 * Creates a delete button for a posts on the feed page. Only the creator of the post can see this * button. When clicked opens an modal that asks the user to confirm the deletion of the post.
 */

export function createDeleteButton(post) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-can");

    deleteButton.appendChild(deleteIcon);

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
