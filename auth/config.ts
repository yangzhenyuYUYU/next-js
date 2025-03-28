import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Provider } from "next-auth/providers/index";

let providers: Provider[] = [];

// Google One Tap Auth
if (
  process.env.AUTH_GOOGLE_ONE_TAP_ENABLED === "true" &&
  process.env.AUTH_GOOGLE_ID
) {
  providers.push(
    CredentialsProvider({
      id: "google-one-tap",
      name: "google-one-tap",

      credentials: {
        credential: { type: "text" },
      },

      async authorize(credentials, req) {
        const googleClientId = process.env.AUTH_GOOGLE_ID;
        if (!googleClientId) {
          console.log("invalid google auth config");
          return null;
        }

        const token = credentials!.credential;

        const response = await fetch(
          "https://oauth2.googleapis.com/tokeninfo?id_token=" + token
        );
        if (!response.ok) {
          console.log("Failed to verify token");
          return null;
        }

        const payload = await response.json();
        if (!payload) {
          console.log("invalid payload from token");
          return null;
        }

        const {
          email,
          sub,
          given_name,
          family_name,
          email_verified,
          picture: image,
        } = payload;
        if (!email) {
          console.log("invalid email in payload");
          return null;
        }

        const user = {
          id: sub,
          name: [given_name, family_name].join(" "),
          email,
          image,
          emailVerified: email_verified ? new Date() : null,
        };

        return user;
      },
    })
  );
}

// Google Auth
if (
  process.env.AUTH_GOOGLE_ENABLED === "true" &&
  process.env.AUTH_GOOGLE_ID &&
  process.env.AUTH_GOOGLE_SECRET
) {
  providers.push(
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  );
}

// Github Auth
if (
  process.env.AUTH_GITHUB_ENABLED === "true" &&
  process.env.AUTH_GITHUB_ID &&
  process.env.AUTH_GITHUB_SECRET
) {
  providers.push(
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = (provider as () => { id: string; name: string })();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "google-one-tap");

export const authOptions = {
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {

  },
};
