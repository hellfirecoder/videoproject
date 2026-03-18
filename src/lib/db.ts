import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URI || "mongodb://localhost:27017/videoproject";

if(!MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables");
}

let cached = global.mongoose;//global is a special object in Node.js that is available in all modules.  
                                // It is used to store global variables and functions that can be accessed from anywhere in the application.
if(!cached){
    global.mongoose=cached={connection:null,promise:null};
}

export async function connecttoDB(){
    if(cached.connection){
        return cached.connection;
    }
    //if there is connection now we check if there is a promise, 
    // if there is a promise then we wait for it to resolve and return the connection, if there is no promise then we create a new promise and store it in the cache.
    if(!cached.promise){
        const opts={
            buffercommands:true,
            maxPoolSize:10
        }
        cached.promise=mongoose.connect(MONGO_URI,opts).then(()=>mongoose.connection);
    }
    try {
        cached.connection=await cached.promise
    } catch (error) {
        cached.promise=null
        throw error
    }

    return cached.connection;
}

