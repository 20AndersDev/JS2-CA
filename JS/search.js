const userData = "https://api.noroff.dev/api/v1/social/posts?_author=true"

const searchInput = document.getElementById('search-input');
const postContainer = document.getElementById('postContainer');

import { createPosts } from "./createposts.js";

let posts = [];

searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredPosts = posts.filter(post => {
        const authorName = post.author.name.toLowerCase();
        const postTitle = post.title.toLowerCase();
        return authorName.includes(searchText) || postTitle.includes(searchText);
    });
    displayFilteredPosts(filteredPosts);
});

async function getPostsData() {
    try {
        const getPostsData = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        const response = await fetch(userData, getPostsData);
        posts = await response.json();
        displayFilteredPosts(posts);
    } catch (error) {
        console.log(error);
    }
}

function displayFilteredPosts(filteredPosts) {
    postContainer.innerHTML = "";
    filteredPosts.forEach(post => {
        const postCard = createPosts(post); // Create post card using your createPost function
        postContainer.appendChild(postCard);
    });
}

// Call the function to initially fetch and display all posts
getPostsData();
