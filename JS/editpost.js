import { editPostUrl } from "./apicalls.js";

async function editPost(url, postData) {
    try {
        const editPostData = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        };
        const response = await fetch(editPostUrl, editPostData);
        const json = await response.json();
        console.log(json);
        return json; 
    } catch (error) {
        console.log(error);
    }
}