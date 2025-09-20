import { Request, Response } from "express";
import User from "../../models/user.model";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
            new: true,
            runValidators: true
        }).select("-password");

        if (user) {
            res.status(200).json({
                _id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                gender: user.gender,
                profilePic: user.profilePic,
                location: user.location,
                token: req.headers.authorization?.split(" ")[1]
            });
        } else {
            res.status(400).json({ error: "Couldn't Update your Profile" });
            return;
        }
    } catch (error) {
        console.log("Error in updateProfile controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}