import Nav from "@/components/nav/Nav";
import Provider from "@/components/Provider";
import "./globals.css";
import { SearchProvider } from "./context/SearchContext";
import Themes from "@/components/nav/Themes";

export const metadata = {
  title: "Note Star: Take Notes and Shine Bright",
  description:
    "Organize your thoughts, capture ideas, and unleash your creativity with Note Star, a powerful and user-friendly note-taking app. Start today and shine bright!",
  keywords: [
    "note-taking app",
    "notes",
    "organization",
    "creativity",
    "ideas",
    "productivity",
  ],
  metadataBase: new URL("https://note-star.vercel.app"),
  openGraph: {
    title: "Note Star: Notes that Empower You",
    description:
      "Capture your thoughts, spark ideas, and achieve your goals with Note Star. The perfect app for students, professionals, and everyone in between.", // A tailored description for social media sharing
    images: [
      {
        url: "/icons/SGN_02_24_2024_1708808302589.png",
        width: 1920,
        height: 1920,
      },
    ],
    url: "https://note-star.vercel.app",
    siteName: "Note Star",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      </head>
      <Provider>
        <body className=" bg-blue-200 dark:bg-black min-h-screen text-black dark:text-white relative">
          <SearchProvider>
            <Nav />
            <main className=" mt-20">{children}</main>
            <div className="fixed bottom-0 left-0">
              <Themes />
            </div>
          </SearchProvider>
        </body>
      </Provider>
    </html>
  );
}
