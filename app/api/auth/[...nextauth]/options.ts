import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// 验证码存储（实际应用中应该使用Redis或数据库）
export const verificationCodes = new Map<string, { code: string; expires: number }>();

// 定义微信 OAuth Provider
const WechatProvider = {
    id: "wechat",
    name: "WeChat",
    type: "oauth" as const,
    clientId: process.env.AUTH_WX_APPID as string,
    clientSecret: process.env.AUTH_WX_SECRET as string,
    authorization: {
        url: "https://open.weixin.qq.com/connect/qrconnect",
        params: { scope: "snsapi_login" }
    },
    token: {
        url: "https://api.weixin.qq.com/sns/oauth2/access_token",
        params: { grant_type: "authorization_code" }
    },
    userinfo: {
        url: "https://api.weixin.qq.com/sns/userinfo",
        params: { lang: "zh_CN" }
    },
    profile(profile: any): any {
        return {
            id: profile.unionid || profile.openid,
            name: profile.nickname,
            image: profile.headimgurl
        }
    }
};

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        WechatProvider,
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-cool-username" },
                password: { label: "Password", type: "password", placeholder: "your-awesome-password" },
                loginType: { label: "Login Type", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    // 验证码登录
                    if (credentials.loginType === 'code') {
                        // 这里应该验证邮箱/手机号是否存在
                        // 为了演示，我们直接返回一个模拟用户
                        return {
                            id: credentials.username, // 使用邮箱或手机号作为ID
                            name: credentials.username,
                            email: credentials.username.includes('@') ? credentials.username : undefined,
                            phone: credentials.username.includes('@') ? undefined : credentials.username
                        };
                    }
                    
                    // 用户名密码登录
                    const user = { id: "123", name: "YANG", password: "123456", username: "admin", email: "Jason@test.com" };
                    if (credentials.username === user.username && credentials.password === user.password) {
                        return user;
                    }
                    
                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async signIn({ user, account }) {
            try {
                console.log('Sign in attempt:', { provider: account?.provider, email: user.email });
                return true;
            } catch (error) {
                console.error('Sign in error:', error);
                return false;
            }
        },
        async jwt({ token, user }) {
            return token;
        },
        async session({ session, token }) {
            return session;
        }
    }
}

