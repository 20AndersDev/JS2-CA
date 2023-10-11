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
        const response = await fetch(url, editPostData); // Use the 'url' parameter here
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

    // Create an <i> element for the edit icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pencil");

    // Add an event listener to handle the edit action
    editButton.addEventListener("click", () => {
        // Store the post ID in local storage
        localStorage.setItem("editPostId", post.id);

        // Open the modal here
        const modal = document.getElementById("edit-post-modal");
        modal.style.display = "block";

        // Populate the modal fields with the post data
        document.getElementById("edit-post-title").value = post.title;
        document.getElementById("edit-post-body").value = post.body;
        document.getElementById("edit-post-media").value = post.media;

        // Handle the form submission to send the updated data to the API
        const editForm = document.getElementById("edit-post-form");
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Retrieve edited data from the form
            const editedData = {
                title: document.getElementById("edit-post-title").value,
                body: document.getElementById("edit-post-body").value,
                media: document.getElementById("edit-post-media").value,
            };

            // Construct the URL for the specific post using local storage;

            // Send a PUT request to update the post with the edited data
            await editPost(editPostUrl, editedData); // Use the constructed URL

            // Close the modal after updating the post
            const modal = document.getElementById("edit-post-modal");
            modal.style.display = "none";

    // Implement the logic to handle post update success or error
    window.location.reload();
});

    });

    // Check if the logged-in user's name matches the post author's name
    if (localStorage.getItem("name") !== post.author.name) {
        editButton.style.display = "none"; // Hide the button for posts where the names don't match
    }

    // Append the <i> element to the button
    editButton.appendChild(editIcon);

    return editButton;
}

