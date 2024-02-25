"use client";
import { signIn, getProviders, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams, redirect } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl"); // Get callbackUrl from query params
  const error = searchParams.get("error"); // Get error message (if any)
  const { data: session } = useSession(); // Check if user is already signed in
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [redirecting, setRedirecting] = useState(false); // Track redirect state

  useEffect(() => {
    // Fetch providers asynchronously to avoid blocking render
    async function fetchProviders() {
      const response = await getProviders();
      setProviders(response);
      setLoadingProviders(false);
    }
    fetchProviders();
  }, []);

  useEffect(() => {
    // Handle redirection:
    if (session && !redirecting) {
      // User is signed in and not already redirecting
      if (callbackUrl) {
        // Check if a callbackUrl exists
        if (isSameOrigin(callbackUrl)) {
          // Ensure it's from the same origin (security)
          setRedirecting(true); // Prevent multiple redirects
          redirect(callbackUrl);
        } else {
          // If callbackUrl is not allowed, redirect to "/" (customizable)
          console.warn("Invalid callbackUrl. Redirecting to homepage:", "/"); // Log warning
          redirect("/");
        }
      } else {
        // No callbackUrl, redirect to "/"
        console.log("No callbackUrl. Redirecting to homepage:", "/");
        redirect("/");
      }
    }
  }, [session, callbackUrl, redirecting]);

  return (
    <div className="flex justify-center items-center">
      {redirecting ? (
        <p className="text-lg text-gray-600">Redirecting...</p>
      ) : (
        <div className="w-full max-w-xs">
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              <span className="text-black font-bold">Error:</span> {error}
              <br />
              <p className="text-black italic">Please try again</p>
            </div>
          )}
          {loadingProviders ? (
            <p className="mb-4 text-gray-600">Loading providers...</p>
          ) : providers && !session ? (
            <div>
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function isSameOrigin(url) {
  try {
    // Handle potential errors or invalid input gracefully
    const parsedUrl = new URL(url);
    return parsedUrl.origin === window.location.origin;
  } catch (error) {
    console.error("Error checking origin:", error);
    return false; // Treat invalid or error cases as insecure
  }
}
