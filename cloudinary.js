const cloudName = "YOUR_CLOUDINARY_CLOUD_NAME";
const uploadPreset = "YOUR_UPLOAD_PRESET";

// 🚀 Advanced Image Upload Function
async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "roamzyee_uploads"); // Organizing images in Cloudinary

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);

        // 🔥 Progress Bar for Image Upload
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                console.log(`Uploading... ${percentComplete}%`);
            }
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response.secure_url); // ✅ Return Cloudinary image URL
            } else {
                reject("Upload failed. Please try again.");
            }
        };

        xhr.onerror = function () {
            reject("Error uploading image. Check your internet connection.");
        };

        xhr.send(formData);
    });
}
