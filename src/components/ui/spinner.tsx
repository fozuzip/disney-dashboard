export const Spinner = () => (
  <div role="status">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 fill-foreground animate-ping"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 720 625.5"
      xmlSpace="preserve"
    >
      <path d="M575.607 2.97c-76.907 0-139.25 58.897-139.25 131.552 0 8.423.921 16.637 2.524 24.623a237.946 237.946 0 00-78.88-13.423 237.916 237.916 0 00-78.88 13.423c1.6-7.986 2.524-16.2 2.524-24.623 0-72.656-62.346-131.552-139.25-131.552S5.145 61.867 5.145 134.522s62.344 131.552 139.25 131.552c2.958 0 5.849-.249 8.759-.418-20.036 34.909-31.551 75.333-31.551 118.471 0 131.666 106.736 238.402 238.397 238.402 131.666 0 238.402-106.739 238.402-238.402 0-43.141-11.515-83.562-31.554-118.471 2.913.169 5.804.418 8.762.418 76.904 0 139.25-58.899 139.25-131.552C714.857 61.867 652.513 2.97 575.607 2.97z"></path>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
