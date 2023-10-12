import { createEditButton } from "./editpost.js";
import { createDeleteButton } from "./deleteposts.js";

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

    const editButton = createEditButton(post);
    

    const deleteButton = createDeleteButton(post);
    

    cardHeader.appendChild(authorName);
    cardHeader.appendChild(editButton);
    cardHeader.appendChild(deleteButton);
    cardHeader.appendChild(dateCreated);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("postCard");
    postCardBody.addEventListener("click", () => {
    window.location.href = `/singlepost/index.html?id=${post.id}`;
    });

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
    

    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);

    return postCard;
}






