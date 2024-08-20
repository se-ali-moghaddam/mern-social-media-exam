import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "This field is required !"]
    },
    category: {
        type: String,
        default: 'all',
        required: [true, "This field is required !"]
    },
    description: {
        type: String,
        required: [true, "This field is required !"]
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    dislikes: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "This field is required !"]
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/007/746/382/small/drag-and-drop-add-document-file-button-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
    }
}, {
    toJSON: true,
    toObject: true,
    timestamps: true
});

export default mongoose.model("Post", postSchema);