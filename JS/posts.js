import { postUrl } from "./apicalls.mjs";
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
        postContainer.innerHTML = "";

        let filteredPosts = json;

        if (filterByLikes) {
            filteredPosts = filteredPosts.filter(post => post._count.reactions > 0);
            filteredPosts.sort((a, b) => b._count.reactions - a._count.reactions);
        }

        if (filterByComments) {
            filteredPosts = filteredPosts.filter(post => post._count.comments > 0);
            filteredPosts.sort((a, b) => b._count.comments - a._count.comments);
        }

        filteredPosts.forEach((post) => {
            const postCard = createPosts(post);
            postContainer.appendChild(postCard);
        });



    } catch (error) {
        return(error);
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


// Get the profile link element
const profileLink = document.getElementById("profile-link");

// Add an event listener to handle the click
profileLink.addEventListener("click", () => {
    const profileName = localStorage.getItem("name");
    if (profileName) {
        // Set the href attribute with the author's name in the query
        profileLink.href = `/profile/index.html?author=${encodeURIComponent(profileName)}`;
    } else {
        return("No profile name found");
    }
});



getPosts();





