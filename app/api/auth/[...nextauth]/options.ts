import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-cool-username" },
                password: { label: "Password", type: "password", placeholder: "your-awesome-password" },
            },
            async authorize(credentials) {
                console.log('credentials', credentials);
                
                const user = { id: "42", name: "J Smith", password: "123456", username: "jsmith", email: "jsmith@example.com" };
                if (credentials?.username === user.username && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
}

