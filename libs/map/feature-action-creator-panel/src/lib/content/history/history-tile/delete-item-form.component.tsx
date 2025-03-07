

export const DeleteConfirmation = () => {
  return (
    <div className="p-6 bg-red-50 border border-red-300 rounded-md max-w-md mx-auto">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z"
          />
        </svg>
        <span className="ml-2 text-lg font-semibold text-red-600">Warning!</span>
      </div>
      <p className="mt-4 text-sm text-red-800">
        Are you sure you want to delete this workflow? This action cannot be undone.
      </p>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          No, cancel
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Yes, delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
