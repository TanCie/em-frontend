export default function NotFound() {
  return (
    <div className="w-2/3 p-20 bg-gray-800 text-white text-center mt-30">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have encountered some issue. Please
        click on the dashboard link below, refresh and click on manage events
        again.
      </p>
      <span>
        Go back to{" "}
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
