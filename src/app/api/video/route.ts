import { authOptions } from "@/lib/auth";
import { connecttoDB } from "@/lib/db";
import Video, { VideoI } from "@/models/Video";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connecttoDB()
        const videos=await Video.find({}).sort({createdAt:-1}).lean()
        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    } catch (error) {
         return NextResponse.json({error:"Failed to fetch videoes"},{status:500})
    }
}

export async function POST(request:NextRequest){
    try {
        const session=await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        //connect to db
        await connecttoDB()
        const body: VideoI=await request.json()
        if(!body.title || !body.description ||!body.videoUrl ||!body.thumbnailUrl ){
            return NextResponse.json({error:"Missing requied fields"},{status:400});
        }

        const videoData= {
            ...body,
            controls: body?.controls ?? true,
            transformation:{
                 height:1920,
                 width:1080,
                 quality:body.transformations?.quality ?? 100
            },
        }
        const newVideo=await Video.create(videoData)
        return NextResponse.json(newVideo);
    } catch (error) {
         return NextResponse.json({error:"failed to create video"},{status:500});
    }
}