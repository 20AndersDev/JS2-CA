import { editPostUrl } from "./apicalls.mjs";

async function editPost(postId, postData) {
    try {
        const editPostData = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        };
        const url = `${editPostUrl}${postId}`;
        const response = await fetch(url, editPostData);
        const json = await response.json();
        return json;
        
    } catch (error) {
        return(error);
    }
}

/**
 * Creates an edit button for a post on the feed page. Only the creator of the post can see this 
 *  button. When clicked opens an modal form that allows the user to enter the new value inputs.
 */

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

        const editForm = document.getElementById("edit-post-form");
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const editedData = {
                title: document.getElementById("edit-post-title").value,
                body: document.getElementById("edit-post-body").value,
                media: document.getElementById("edit-post-media").value,
            };

            // Use post.id as the post ID for editing
            await editPost(post.id, editedData);
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
