export default function NotFound() {
  return (
    <div className="bg-gray-800 text-white text-center mt-30">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for encountered some issue. Please click on the
        link again.
      </p>
      <span>
        Go back to
        <a
          className="hover:text-blue-500 hover:underline"
          href="https://eventrr.vercel.app"
        >
          Dashboard
        </a>{" "}
        page
      </span>
    </div>
  );
}
