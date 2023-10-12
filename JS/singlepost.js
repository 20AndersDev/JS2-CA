import { API_URL_base } from "./apicalls.js";

const singlePostUrl = API_URL_base + "/social/posts/";

async function getSinglePost() {
    // Get the postId from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        console.log("No postId found in the query parameter.");
        return;
    }

    // Build the URL for the single post based on the postId
    const url = `${singlePostUrl}${postId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (response.ok) {
            const post = await response.json();
            console.log("Single post data:", post);

            // Now, you can use the "post" object to create and display the single post on your page.
            displaySinglePost(post);
        } else {
            console.error("Failed to fetch single post.");
        }
    } catch (error) {
        console.error("An error occurred while fetching the single post:", error);
    }
}

function displaySinglePost(post) {
    const postContainer = document.getElementById("post-container");

    // Create and append elements to display the single post
    const postTitleElement = document.createElement("h1");
    postTitleElement.textContent = post.title;
    postContainer.appendChild(postTitleElement);

    const postBodyElement = document.createElement("p");
    postBodyElement.textContent = post.body;
    postContainer.appendChild(postBodyElement);

    const postMediaElement = document.createElement("img");
    postMediaElement.src = post.media;
    postMediaElement.classList.add("post-media"); // Add appropriate CSS class
    postContainer.appendChild(postMediaElement);

    const postCreatedElement = document.createElement("p");
    postCreatedElement.textContent = new Date(post.created).toLocaleString();
    postContainer.appendChild(postCreatedElement);
}

// Call the function to fetch and display the single post
getSinglePost();
