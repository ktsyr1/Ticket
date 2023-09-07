import mongoose from 'mongoose';

const { DB: DBname } = process.env && process.env

export const connect = async () => {
    try {
        mongoose.connect(DBname)
            .then(() => {
                console.log("Database connected!");
            })
    } catch (err) {
        console.error("Something went wrong connecting to database");
        console.error(err);
    }
}

// DBmodels

import user from "@/models/user";
export const User = user

import posts from "@/models/posts";
export const Posts = posts

import hotel from "@/models/hotel";
export const Hotel = hotel

import carWithDriver from "@/models/CarWithDriver";
export const CarWithDriver = carWithDriver

import hotelApartment from "@/models/HotelApartment";
export const HotelApartment = hotelApartment