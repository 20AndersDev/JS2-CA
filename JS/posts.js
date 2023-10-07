const API_URL_base = "https://api.noroff.dev/api/v1";
const postsUrl = API_URL_base + "/social/posts?_author=true";

const postContainer = document.getElementById("postContainer");

async function getPosts(url) {
    try{
        const getPostsData = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            
        };
        const response = await fetch(url, getPostsData);
        const json = await response.json();

        postContainer.innerHTML = "";

        // Iterate through the posts and create HTML elements for each one
        json.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.classList.add("card", "mb-4", "d-flex", "justify-content-center");
            postCard.innerHTML = `
                <div class="card-header d-flex justify-content-between">
                    <h5 id="post-author">${post.author.name}</h5>
                    <h5 id="date-created">${new Date(post.created).toLocaleString()}</h5>
                </div>
                <div class="postCard"> 
                    <h5 class="post-Title">${post.title}</h5>
                    <p class="post-Body">${post.body}</p>
                    <img class="post-Image img-fluid" src="${post.media}"> 
                </div>
                <div class="card-footer d-flex justify-content-evenly">
                    <i class="far fa-heart fa-2x "></i>
                    <i class="far fa-comment fa-2x"></i>
                </div>
            `;
            postContainer.appendChild(postCard);
        });

    } catch (error) {
        console.log(error);
    }
}


getPosts(postsUrl);