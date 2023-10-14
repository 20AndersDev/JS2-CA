import { API_URL_base } from "./apicalls.js";

const singlePostUrl = API_URL_base + "/social/posts/";

async function getSinglePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        console.log("No ID.");
        return;
    }


    const url = `${singlePostUrl}${postId}?_author=true&_comments=true`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (response.ok) {
            const post = await response.json();
            displaySinglePost(post);
        } else {
            const errorContainer = document.getElementById("error-container");
            errorContainer.textContent = "Post not found or Deleted";
        }
    } catch (error) {
        return error;
}
}

function displaySinglePost(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "mb-4", "justify-content-center","d-flex");
    postCard.style.maxWidth = "800px";

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

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    
    // Loop through the comments and create elements for each comment
    post.comments.forEach(comment => {
        const commentCard = document.createElement("div");
        commentCard.classList.add("comment-card","p-3");
    
        // Create a container for the comment header
        const commentHeader = document.createElement("div");
        commentHeader.classList.add("comment-header", "d-flex", "justify-content-between");
    
        // Add the comment author to the header with bold text
        const commentAuthor = document.createElement("p");
        commentAuthor.textContent = `Comment by: ${comment.author.name}`;
        commentAuthor.style.fontWeight = "bold"; // Make the name bold
        commentHeader.appendChild(commentAuthor);
    
        // Add the creation time to the header with bold text
        const commentTime = document.createElement("p");
        commentTime.textContent = new Date(comment.created).toLocaleString();
        commentTime.style.fontWeight = "bold"; // Make the date bold
        commentHeader.appendChild(commentTime);
    
        commentCard.appendChild(commentHeader);
    
        const commentText = document.createElement("p");
        commentText.textContent = comment.body;
        commentCard.appendChild(commentText);
    
        // Append the comment card to the comments container
        commentsContainer.appendChild(commentCard);
    });
    


    // Append elements to their respective containers
    reactionsDiv.appendChild(likeIcon);
    reactionsDiv.appendChild(reactionsCount);

    commentsDiv.appendChild(commentIcon);
    commentsDiv.appendChild(commentCount);

    cardFooter.appendChild(reactionsDiv);
    cardFooter.appendChild(commentsDiv);

    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);
    postCard.appendChild(commentsContainer);

    // Append the postCard to the singlePostContainer element
    const container = document.getElementById("singlePostContainer");
    container.appendChild(postCard);
}

// Call the function to fetch and display the single post
getSinglePost();