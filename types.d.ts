import { Connection } from "mongoose";
//“It avoids opening multiple MongoDB connections 
// by caching both the connection and the connection promise globally in Next.js.”
declare global {
    var mongoose:{
        connection:Connection | null;//connection is the actual connection object that will be used to interact with the MongoDB database. It is initialized as null, indicating that there is no active connection at the start.
        promise:Promise<Connection> | null;//promise is a Promise that resolves to a Connection object. It is used to handle the asynchronous nature of establishing a connection to the MongoDB database. Like connection, it is also initialized as null, indicating that there is no ongoing connection attempt at the start.
    }
}
//Next.js prevents multiple connections, while normal Node just connects once and stays connected.
export {};