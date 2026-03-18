import NextAuth,{DefaultSession} from "next-auth"
//DefaultSession["user"] is used to keep 
// NextAuth’s built-in user fields (like name, email, image) while adding your custom fields (like id).
declare module "next-auth" {
 
  interface Session {
    user: {
        id:string
        
    } & DefaultSession["user"]
  }
}