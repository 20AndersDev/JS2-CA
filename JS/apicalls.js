const API_URL_base = "https://api.noroff.dev/api/v1";
const loginUrl = API_URL_base + "/social/auth/login";
const registerNewUserUrl = API_URL_base + "/social/auth/register";

export const editPostUrl = API_URL_base + "/social/posts/" + localStorage.getItem("editPostId");


export const newPostUrl = API_URL_base + "/social/posts";


