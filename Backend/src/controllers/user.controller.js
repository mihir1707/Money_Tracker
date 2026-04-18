import APIerror from "../utils/APIerrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import APIresponse from "../utils/APIresponse.js";
import {createUser, findUserByEmail, findUserById, updateUser, updatePassword, deactivateUser, } from '../models/user.model.js';
import {hashPassword, comparePassword, generateAccessToken, generateRefreshToken, } from '../utils/auth.js';


const registerUser = asyncHandler( async(req, res) => {
    const {email, password, name, phone} = req.body;

    if(!email) throw new APIerror(400, 'Email is required');
    if(!password) throw new APIerror(400, 'Password is required');
    if(!name) throw new APIerror(400, 'Name is required');
    if(!phone) throw new APIerror(400, 'Phone is required');

    const existingUser = await findUserByEmail(email);
    
    if(existingUser) throw new APIerror(400, 'User already exists');

    const hashed_password = await hashPassword(password);

    const user = await createUser({
        name,
        email,
        phone,
        password: hashed_password,
    });

    res.status(201).json(
        new APIresponse(
            201,
            user,
            'User registered successfully',
        )
    )
})

const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body

    if(!email) throw new APIerror(400, 'Email is required');
    if(!password) throw new APIerror(400, 'Password is required');

    const user = await findUserByEmail(email);
    
    if(!user) throw new APIerror(404, 'User not found');

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid) throw new APIerror(401, 'Invalid password');

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json(
        new APIresponse(
            200,
            {
                user,
                accessToken,
                refreshToken,
            },
            'User logged in successfully',
        )
    )
})

const getProfile = asyncHandler( async(req, res) => {
    const user = await findUserById(req.user.id);
    
    if(!user) throw new APIerror(404, 'User not found');

    res.status(200).json(
        new APIresponse(
            200,
            user,
            'User profile fetched successfully',
        )
    )
})

const updateProfile = asyncHandler( async(req, res) => {
    const {email, name, phone, currency} = req.body;

    const user = await updateUser(req.user.id, {email, name, phone, currency});
    
    if(!user) throw new APIerror(404, 'User not found');

    res.status(200).json(
        new APIresponse(
            200,
            user,
            'User profile updated successfully',
        )
    )
})

const logoutUser = asyncHandler( async(req, res) => {
    res.clearCookie("accessToken").clearCookie("refreshToken").json(
        new APIresponse(
            200,
            {},
            'User logged out successfully',
        )
    )
})

const deleteUser = asyncHandler( async(req, res) => {
    const user = await deactivateUser(req.user.id);
    
    if(!user) throw new APIerror(404, 'User not found');

    res.status(200).json(
        new APIresponse(
            200,
            user,
            'User deleted successfully',
        )
    )
})

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    logoutUser,
    deleteUser,
}