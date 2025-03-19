const cloudName = "YOUR_CLOUDINARY_CLOUD_NAME";
const uploadPreset = "YOUR_UPLOAD_PRESET";

async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    return data.secure_url; // Return Cloudinary image URL
}
