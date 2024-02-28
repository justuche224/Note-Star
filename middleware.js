export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/create-note", "/update-note", "/note/:id*"],
};
