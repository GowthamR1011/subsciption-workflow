import User from "../models/users.models.js";

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select("-password");

        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ message: "User found", user: user });
    }
    catch(error){
        next(error);
    }
};
