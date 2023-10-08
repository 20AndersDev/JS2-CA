const API_URL_base = "https://api.noroff.dev/api/v1";
const postUrl =  API_URL_base + "/social/posts?_author=true";

import { createPosts } from "./createposts.js";

const postContainer = document.getElementById("postContainer");

const queryParams = new URLSearchParams(window.location.search);
const filterByLikes = queryParams.get("_reactions") === "true";
const filterByComments = queryParams.get("_comments") === "true";


async function getPosts() {
    try {
        const getPostsData = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        const response = await fetch(postUrl,getPostsData);
        const json = await response.json();
        console.log(json);
        postContainer.innerHTML = "";

        // Filter and sort the posts
        let filteredPosts = json;

        // Sort the filtered posts based on reactions (likes) if filterByLikes is true
        if (filterByLikes) {
            filteredPosts = filteredPosts.filter(post => post._count.reactions > 0);
            filteredPosts.sort((a, b) => b._count.reactions - a._count.reactions);
        }

        if (filterByComments) {
            filteredPosts = filteredPosts.filter(post => post._count.comments > 0);
            filteredPosts.sort((a, b) => b._count.comments - a._count.comments);
        }

        // Iterate through the filtered and sorted posts and create HTML elements for each one
        filteredPosts.forEach((post) => {
            const postCard = createPosts(post);
            postContainer.appendChild(postCard);
        });
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("filter-default").addEventListener("click", () => {
    window.location.href = "/Feed/index.html";
});

document.getElementById("filter-likes").addEventListener("click", () => {
    window.location.href = "/Feed/index.html?_reactions=true";
});

document.getElementById("filter-comments").addEventListener("click", () => {
    window.location.href = "/Feed/index.html?_comments=true"
});

getPosts();





