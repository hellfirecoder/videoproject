import { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connecttoDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions={
    providers: [
       CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email:{label:"Email",type:"text"},
          password:{label:"Password",type:"text"}
        },
        async authorize(credentials, req) {
          if(!credentials?.email || !credentials?.password){
            throw new Error("Missing credentials")
          }
          try {
            await connecttoDB()
            const user=await User.findOne({email:credentials.email})
            if(!user){
              throw new Error("no user found")
            }

            const Valid=await bcrypt.compare(
              credentials.password,user.password
            )
            if(!Valid){
              throw new Error("incorrect password")
            }

            return {
              id:user._id.toString(),
              email:user.email

            }

          } catch (error) {
            throw error   
          }

        }
      })
  //   GitHubProvider({
  //   clientId: process.env.GITHUB_ID!,
  //   clientSecret: process.env.GITHUB_SECRET!
  // }),
  // GoogleProvider({
  //   clientId: process.env.GOOGLE_CLIENT_ID!,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  // })
],

  callbacks:{
    async jwt({token,user}){
      if(user){
        token.id=user.id
      }
      return token;
    },
     async session({session,token}){
      if(session){
        session.user.id=token.id as string
      }
      return session;
    }
  },
  pages:{
    signIn:"/login",
    error:"/login",
  },
  session:{
    strategy: "jwt",
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret:process.env.NEXTAUTH_SECRET
};