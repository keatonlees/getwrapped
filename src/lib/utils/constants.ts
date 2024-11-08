export const baseURL = (
  process.env.NODE_ENV === "production"
    ? "https://getwrapped.vercel.app"
    : "http://localhost:3000"
) as string;
