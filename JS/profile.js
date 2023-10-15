const API_URL_base = "https://api.noroff.dev/api/v1";


const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("author");


const getUserUrl = `${API_URL_base}/social/profiles/${encodeURIComponent(profileName)}?_following=true&_followers=true&_posts=true`;

async function getUserProfile() {
    try {
        // Fetch the user's profile information
        const fetchProfile = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await fetch(getUserUrl, fetchProfile);
        if (!response.ok) {
            console.error("Failed to fetch user profile.");
            return;
        }
        const userProfile = await response.json();
        console.log(userProfile);
        console.log(userProfile.following);
        console.log(userProfile.posts);

        // Fetch the user's posts
        const fetchPosts = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const postsResponse = await fetch(getUserUrl, fetchPosts);
        if (!postsResponse.ok) {
            console.error("Failed to fetch user posts.");
            return;
        }
        const userPosts = await postsResponse.json();

        if (typeof userPosts !== "object" || !Array.isArray(userPosts)) {
            console.error("Failed to fetch user posts.");
            return;
          }

        // Display user information and posts
        displayUserProfile(userProfile);
        displayUserPosts(userPosts);
    } catch (error) {
        console.error("An error occurred while fetching the user profile:", error);
    }
}


function displayUserPosts(userPosts) {
    const postContainer = document.getElementById("profilePostContainer");
    userPosts.forEach((post) => {
        const postCard = createPostCard(post);
        postContainer.appendChild(postCard);
    });
}


function createPostCard(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "mb-4", "d-flex", "justify-content-center", "max-width-form");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "d-flex", "justify-content-between");

    const authorName = document.createElement("h5");
    authorName.id = "post-author";
    authorName.textContent = post.name;

    const dateCreated = document.createElement("h5");
    dateCreated.id = "date-created";
    dateCreated.textContent = new Date(post.created).toLocaleString();

    cardHeader.appendChild(authorName);
    cardHeader.appendChild(dateCreated);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("postCard");
    postCard.style.maxWidth = "800px";
    postCardBody.style.cursor = "pointer";

    // Create and append elements for post title and body
    const postTitle = document.createElement("h4");
    postTitle.classList.add("post-Title", "p-5");
    postTitle.style.fontWeight = "bold";
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.classList.add("post-Body", "p-5");
    postBody.textContent = post.body;

    // Create and append an element for the post image (if available)
    if (post.media) {
        const postImage = document.createElement("img");
        postImage.classList.add("post-Image", "img-fluid");
        postCardBody.style.textAlign = "center";
        postImage.style.margin = "0 auto";
        postImage.src = post.media;
        postCardBody.appendChild(postImage);
    }

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postBody);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-evenly", "mt-3");

    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);

    return postCard;
}




function displayUserProfile(userProfile) {
    // Update the user's name and other information in the profile section
    const userNameElement = document.querySelector(".div-bio h1");
    userNameElement.textContent = userProfile.name;
    // You can update other profile information here
}



getUserProfile();
