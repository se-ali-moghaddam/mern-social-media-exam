import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "This filed is required !"]
    },
    lastName: {
        type: String,
        required: [true, "This filed is required !"]
    },
    email: {
        type: String,
        required: [true, "This filed is required !"]
    },
    password: {
        type: String,
        required: [true, "This filed is required !"]
    },
    bio: String,
    profilePhoto: {
        type: String,
        default: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isFollowing: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    viewdBy: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,

                ref: "User"
            }
        ]
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    refresh_token: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

userSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id'
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.methods.isPasswordMatched = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

userSchema.methods.createAccountVerificationToken = async function () {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    this.accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
    this.accountVerificationTokenExpires = Date.now() + (30 * 60 * 1000);

    return verificationToken;
}

userSchema.methods.createResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + (30 * 60 * 1000);

    return resetToken;
}

export default mongoose.model("User", userSchema);