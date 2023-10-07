const API_URL_base = "https://api.noroff.dev/api/v1";
const postsUrl = API_URL_base + "/social/posts";


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
        console.log(json);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}


getPosts(postsUrl);