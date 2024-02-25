import Nav from "@/components/nav/Nav";
import Provider from "@/components/Provider";
import "./globals.css";

export const metadata = {
  title: "Note Star",
  description: "Your go to note taking app with a rich text editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      </head>
      <Provider>
        <body className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
          <Nav />
          <main className=" mt-20">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
