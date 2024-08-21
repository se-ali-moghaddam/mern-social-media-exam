import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "This field is required !"]
    },
    description: {
        type: String,
        required: [true, "This field is required !"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "This field is required !"]
    }
});

export default mongoose.model("Comment", commentSchema);