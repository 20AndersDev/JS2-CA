import { createEditButton } from "./editpost.js";
import { createDeleteButton } from "./deleteposts.js";

export function createPosts(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "mb-4", "d-flex", "justify-content-center", "max-width-form");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "d-flex", "justify-content-between");

    // Create an anchor element for the author's name
    const authorLink = document.createElement("a");
    authorLink.href = `/profile/index.html?author=${encodeURIComponent(post.author.name)}`;
    authorLink.style.textDecoration = "none";
    authorLink.style.color = "white";
    authorLink.textContent = post.author.name;
    authorLink.id = "post-author";

    const dateCreated = document.createElement("h5");
    dateCreated.id = "date-created";
    dateCreated.textContent = new Date(post.created).toLocaleString();

    const editButton = createEditButton(post);
    const deleteButton = createDeleteButton(post);

    cardHeader.appendChild(authorLink);
    cardHeader.appendChild(editButton);
    cardHeader.appendChild(deleteButton);
    cardHeader.appendChild(dateCreated);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("postCard");
    postCard.style.maxWidth = "800px";
    postCardBody.style.cursor = "pointer";
    postCardBody.addEventListener("click", () => {
        window.location.href = `/singlepost/index.html?id=${post.id}`;
    });

    const postTitle = document.createElement("h4");
    postTitle.classList.add("post-Title", "p-5");
    postTitle.style.fontWeight = "bold";
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.classList.add("post-Body", "p-5");
    postBody.textContent = post.body;

    const postImage = document.createElement("img");
    postImage.classList.add("post-Image", "img-fluid");
    postCardBody.style.textAlign = "center";
    postImage.style.margin = "0 auto";
    postImage.src = post.media;

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postBody);
    postCardBody.appendChild(postImage);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-evenly", "mt-3");

    // Create a div for reactions
    const reactionsDiv = document.createElement("div");
    reactionsDiv.classList.add("reactions-div", "justify-content-center");

    const reactionsCount = document.createElement("h5");
    reactionsCount.classList = "reactions-count, d-flex, p-2";
    reactionsCount.textContent = post._count.reactions;

    const likeIcon = document.createElement("i");
    likeIcon.classList.add("far", "fa-heart", "fa-2x");

    // Create a div for comments
    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("comments-div");

    const commentCount = document.createElement("h5");
    commentCount.classList = "comment-count, d-flex, p-2";
    commentCount.textContent = post._count.comments;

    const commentIcon = document.createElement("i");
    commentIcon.classList.add("far", "fa-comment", "fa-2x");

    reactionsDiv.appendChild(likeIcon);
    reactionsDiv.appendChild(reactionsCount);

    commentsDiv.appendChild(commentIcon);
    commentsDiv.appendChild(commentCount);

    cardFooter.appendChild(reactionsDiv);
    cardFooter.appendChild(commentsDiv);

    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);

    return postCard;
}
