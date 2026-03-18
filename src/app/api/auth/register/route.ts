//used for registering user


import { connecttoDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import  User  from "@/models/User"
//request
// validation 
//check for db connection {done with the help of connecttoDB}then existing user check
//create user in db
//return success
export async function POST(request:NextRequest){
    try {
       const {email,password}= await request.json() //destructure the data and get thiese from the request
       if(!email || !password){
        return NextResponse.json(
            {error:"email and password are required"},
            {status:404},
        )
       }
       await connecttoDB()

       const existingUser=await User.findOne({email})
       if(existingUser){
         return NextResponse.json(
            {error:"user already exists"},
            {status:404},
        )
       }

       await User.create({
        email,password
       })

        return NextResponse.json(
            {message:"user registered created"},
            {status:404},
        )

    } catch (error) {
        console.error("Registration error",error)
        return NextResponse.json(
            {error:"failed to register user"},
            {status:404},
        )
    }
}

