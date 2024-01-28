// post-fetch.js
const createPost = async (postData) => {
  try {
    const response = await fetch("http://172.20.8.160:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error sending post data:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

const fetchPosts = async () => {
  try {
    console.log("Attempting to fetch from http://172.20.8.160:3000/posts");
    const response = await fetch("http://172.20.8.160:3000/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export { createPost, fetchPosts };
