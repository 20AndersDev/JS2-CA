
const API_URL_base = "https://api.noroff.dev/api/v1";

const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("author");


const getUserUrl = `${API_URL_base}/social/profiles/${encodeURIComponent(profileName)}?_following=true&_followers=true&_posts=true`;

async function getUserProfile() {
    try {
        const fetchProfile = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await fetch(getUserUrl, fetchProfile);
        const userProfile = await response.json();
        
        displayUserProfile(userProfile);
        displayUserPosts(userProfile.posts);
        displayFollowingAndFollowers(userProfile)
    } catch (error) {
        console.error("An error occurred while fetching the user profile:", error);
    }
}


function displayUserPosts(userPosts) {
    const postContainer = document.getElementById("profilePostContainer");
    postContainer.innerHTML = ""; 

    userPosts.sort((a, b) => new Date(b.created) - new Date(a.created));

    if (userPosts.length === 0) {
        const noPostsMessage = document.createElement("p");
        noPostsMessage.textContent = "This user has no posts yet.";
        noPostsMessage.style.textAlign = "center"; 
        noPostsMessage.style.fontSize = "24px"; 
        noPostsMessage.style.marginTop = "20px"; 

        postContainer.appendChild(noPostsMessage);
    } else {
        userPosts.forEach((post) => {
            const postCard = createPostCard(post);
            postContainer.appendChild(postCard);

            if (window.innerWidth < 576) {
                postCard.style.width = "100%";
            }
        });
    }
}


function createPostCard(post) {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "mb-4", "d-flex", "justify-content-center", "max-width-form","p-0","mt-4","flex-column");
    postCard.style.maxWidth = "800px";


    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "d-flex", "justify-content-between","p-2");

    const authorName = document.createElement("h5");
    authorName.id = "post-author";
    authorName.textContent = post.owner;


    const dateCreated = document.createElement("h5");
    dateCreated.id = "date-created";
    dateCreated.textContent = new Date(post.created).toLocaleString();

    cardHeader.appendChild(authorName);
    cardHeader.appendChild(dateCreated);

    const postCardBody = document.createElement("div");
    postCardBody.classList.add("postCard");

    const postTitle = document.createElement("h4");
    postTitle.classList.add("post-Title", "p-2","d-flex","justify-content-center");
    postTitle.style.fontWeight = "bold";
    postTitle.textContent = post.title;

    const postBody = document.createElement("p");
    postBody.classList.add("post-Body", "d-flex", "justify-content-center", "p-3");
    postBody.textContent = post.body;

    postBody.addEventListener("click", () => {
        const postId = post.id; 
        window.location.href = `/singlepost/index.html?id=${postId}`;
    });

    postCardBody.appendChild(postTitle);
    postCardBody.appendChild(postBody);

    if (post.media) {
        const postImage = document.createElement("img");
        postImage.classList.add("post-Image", "img-fluid");
        postCardBody.style.textAlign = "center";
        postImage.style.margin = "0 auto";
        postImage.src = post.media;
        postCardBody.appendChild(postImage);
    }

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "d-flex", "justify-content-evenly", "mt-3","p-3");


    postCard.appendChild(cardHeader);
    postCard.appendChild(postCardBody);
    postCard.appendChild(cardFooter);

    return postCard;
}




function displayFollowingAndFollowers(userProfile) {
    const followingListElement = document.getElementById("followingList");
    const followersListElement = document.getElementById("followersList");
    const followingCountElement = document.getElementById("followingCount");
    const followersCountElement = document.getElementById("followersCount");

    const followingUsers = userProfile.following;
    followingCountElement.textContent = followingUsers.length > 0 ? `Following: ${followingUsers.length} ` : "Not Following anyone yet";

    if (followingUsers.length > 0) {
        followingUsers.forEach((user) => {
            const followingUserDiv = document.createElement("div");
            followingUserDiv.classList.add("user-item");
            const userName = document.createElement("p");
            userName.textContent = user.name;
            followingUserDiv.appendChild(userName);
            followingListElement.appendChild(followingUserDiv);
        });
    }

    const followerUsers = userProfile.followers;
    followersCountElement.textContent = followerUsers.length > 0 ? `Followers: ${followerUsers.length}` : "No Followers yet";


    if (followerUsers.length > 0) {
        followerUsers.forEach((user) => {
            const followerUserDiv = document.createElement("div");
            followerUserDiv.classList.add("user-item");
            const userName = document.createElement("p");
            userName.textContent = user.name;
            followerUserDiv.appendChild(userName);
            followersListElement.appendChild(followerUserDiv);
        });
    }
}


function displayUserProfile(userProfile) {
    const userNameElement = document.querySelector(".div-bio h1");
    userNameElement.textContent = userProfile.name;
}


getUserProfile();
