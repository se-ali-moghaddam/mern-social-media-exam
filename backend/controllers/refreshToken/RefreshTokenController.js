import jwt from "jsonwebtoken";
import User from "../../models/user/User.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await User.findOne({ refresh_token: refreshToken });
        if (!user) return res.sendStatus(403);

        const userViewModel = {
            userId: user._id,
            firstname: user.firstName,
            lastName: user.lastName,
            userEmail: user.email,
            profilePhoto: user.profilePhoto,
            admin: user.isAdmin,
            isAccountVerified: user.isAccountVerified
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            const accessToken = jwt.sign(userViewModel, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15s"
            });

            res.json({accessToken});
        });

    } catch (error) {
        res.json(error);
    }
}