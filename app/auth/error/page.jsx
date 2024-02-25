import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="w-full grid place-content-center text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <Link href="/">Go home</Link>
    </div>
  );
};

export default ErrorPage;
