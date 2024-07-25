const url = `https://api.cloudinary.com/v1_1/dztkppttj/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app-file");
    formData.append("api_key",898327139512575)

    
        const res = await fetch(url, {
            method: "POST",
            body: formData
        });

        
        const data = await res.json();
        return data; // Return the JSON response instead of the entire response object
    
};

export default uploadFile;