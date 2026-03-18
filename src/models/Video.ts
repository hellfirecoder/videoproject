import mongoose,{Schema,model,models} from "mongoose";

export const VIDEODIMENSIONS ={//fixing the video dimensions to 1080x1920, as this is the standard for vertical videos on platforms like TikTok and Instagram Reels.
    width:1080,
    height:1920,
}as const;//as const is used to make the object readonly, so that the values cannot be changed.


export interface VideoI{
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    controls?:boolean;
    _id?:mongoose.Types.ObjectId;
    transformations?:{
        height:number;
        width:number;
        quality?:number;
    };
}

const videoSchema =new Schema<VideoI>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    videoUrl:{type:String,required:true},
    thumbnailUrl:{type:String,required:true},
    controls:{type:Boolean,default:true},
    transformations:{
        height:{type:Number,default:VIDEODIMENSIONS.height},
        width:{type:Number,default:VIDEODIMENSIONS.width},
        quality:{type:Number,min:0,max:100}
    },
},
{
    timestamps:true, 
}

);

const Video =models?.Video || model<VideoI>("Video",videoSchema)//models?.Video checks if the Video model already exists in the models object, if it does, it uses that, otherwise it creates a new model using the videoSchema.

export default Video;