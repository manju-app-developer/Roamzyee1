document.getElementById("uploadBtn").addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", async function () {
        const file = fileInput.files[0];
        if (!file) return;

        const imageUrl = await uploadImage(file);

        // Ask user for a caption
        const caption = prompt("Add a caption for your photo:");

        // Create post
        const post = document.createElement("div");
        post.classList.add("post");
        post.innerHTML = `
            <img src="${imageUrl}" class="post-image">
            <p class="post-caption">${caption || "📍 A beautiful place!"}</p>
            <div class="post-actions">
                <button class="likeBtn"><i class="fas fa-heart"></i></button> 
                <span class="likes">0</span>
                <button class="commentBtn"><i class="fas fa-comment"></i></button>
                <span class="comments-count">0</span>
            </div>
            <div class="comments-section">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <button class="submit-comment">Post</button>
                <div class="comments-list"></div>
            </div>
        `;

        document.getElementById("feed").prepend(post); // Add post to the top

        // Like Button Functionality
        const likeBtn = post.querySelector(".likeBtn");
        const likeCount = post.querySelector(".likes");
        likeBtn.addEventListener("click", function () {
            let likes = parseInt(likeCount.innerText);
            likeCount.innerText = likes + 1;
            likeBtn.classList.toggle("liked");
        });

        // Comment System
        const commentInput = post.querySelector(".comment-input");
        const submitComment = post.querySelector(".submit-comment");
        const commentsList = post.querySelector(".comments-list");
        const commentsCount = post.querySelector(".comments-count");

        submitComment.addEventListener("click", function () {
            const commentText = commentInput.value.trim();
            if (commentText === "") return;

            const comment = document.createElement("p");
            comment.classList.add("comment");
            comment.innerHTML = `<strong>User:</strong> ${commentText}`;
            commentsList.appendChild(comment);
            commentInput.value = "";

            let count = parseInt(commentsCount.innerText);
            commentsCount.innerText = count + 1;
        });
    });

    fileInput.click();
});
