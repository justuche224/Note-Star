import Link from "next/link";

const page = () => {
  return (
    <div className=" w-full text-center font-serif text-7xl p-2">
      <h1>this feature is coming soon. stay tuned!</h1>
      <Link
        role="button"
        aria-label="go home"
        href="/"
        className="px-3 py-1 bg-blue-600 text-white hover:opacity-85 text-lg rounded-lg"
      >
        Go home
      </Link>
    </div>
  );
};

export default page;
