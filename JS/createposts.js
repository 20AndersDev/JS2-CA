export function createPosts(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "mb-4", "d-flex", "justify-content-center");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "d-flex", "justify-content-between");

    const authorName = document.createElement("h5");
    authorName.id = "post-author";
    authorName.textContent = post.author.name;

    const dateCreated = document.createElement("h5");
    dateCreated.id = "date-created";
    dateCreated.textContent = new Date(post.created).toLocaleString();

    cardHeader.appendChild(authorName);
    cardHeader.appendChild(dateCreated);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("postCard");

    const postTitle = document.createElement("h5");
    postTitle.classList.add("post-Title");
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.classList.add("post-Body");
    postBody.textContent = post.body;

    const postImage = document.createElement("img");
    postImage.classList.add("post-Image", "img-fluid");
    postImage.src = post.media;

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postBody);
    postCardBody.appendChild(postImage);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-evenly");

    const reactionsCount = document.createElement("h5");
    reactionsCount.classList = "reactions-count";
    reactionsCount.textContent = post._count.reactions;

    const commentCount = document.createElement("h5");
    commentCount.classList = "comment-count";
    commentCount.textContent = post._count.comments;

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("far", "fa-heart", "fa-2x");

    const commentIcon = document.createElement("i");
    commentIcon.classList.add("far", "fa-comment", "fa-2x");

    cardFooter.appendChild(reactionsCount);
    cardFooter.appendChild(likeIcon);
    cardFooter.appendChild(commentCount);
    cardFooter.appendChild(commentIcon);

    // Create an edit button for all posts
    const editButton = createEditButton(post);
    cardHeader.appendChild(editButton);

    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);

    return postCard;
}

function createEditButton(post) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-outline-primary");

    // Create an <i> element for the edit icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pencil");

    // Add an event listener to handle the edit action
    editButton.addEventListener("click", () => {
        // Implement the edit functionality as needed
        console.log(`Edit post with ID ${post.id}`);
    });

    // Check if the logged-in user's name matches the post author's name
    if (localStorage.getItem("name") !== post.author.name) {
        editButton.style.display = "none"; // Hide the button for posts where the names don't match
    }

    // Append the <i> element to the button
    editButton.appendChild(editIcon);

    return editButton;
}
