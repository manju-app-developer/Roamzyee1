document.getElementById("uploadBtn").addEventListener("click", function() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", async function() {
        const file = fileInput.files[0];
        const imageUrl = await uploadImage(file);

        const post = document.createElement("div");
        post.innerHTML = `<img src="${imageUrl}" width="300"><br>
                          <button class="likeBtn">❤️ Like</button> <span class="likes">0</span>`;
        
        document.getElementById("feed").appendChild(post);

        post.querySelector(".likeBtn").addEventListener("click", function() {
            let likes = parseInt(post.querySelector(".likes").innerText);
            post.querySelector(".likes").innerText = likes + 1;
        });
    });

    fileInput.click();
});
