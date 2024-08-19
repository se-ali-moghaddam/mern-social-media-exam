import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const cloudinaryUploadImage = async (file) => {
    try {
        const data = await cloudinary.uploader.upload(file, {
            resource_type: 'auto'
        });

        return {
            url: data.secure_url
        };
    } catch (error) {
        return error;
    }
}