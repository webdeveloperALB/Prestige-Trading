import type { SessionOptions } from "iron-session";

export type SessionData = {
  isLoggedIn: boolean;
};

export const sessionOptions: SessionOptions = {
  cookieName: "tradepro-session",
  password: process.env.SESSION_SECRET as string, // 👈 ensure this exists!
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
