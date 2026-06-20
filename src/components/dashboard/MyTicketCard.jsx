import Link from "next/link";

const MyTicketCard = ({ ticket }) => {
  const {
    _id,
    title,
    image,
    from,
    to,
    transportType,
    price,
    quantity,
    departureDateTime,
    status,
  } = ticket;

  const isRejected = status === "rejected";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-gray-600">
          {from} → {to}
        </p>

        <div className="flex justify-between text-sm">
          <span className="capitalize">{transportType}</span>
          <span>${price}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Quantity: {quantity}</span>
          <span>{new Date(departureDateTime).toLocaleDateString()}</span>
        </div>

        <div className="pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "approved"
                ? "bg-green-100 text-green-700"
                : status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex gap-2 pt-3">
          {/* <Link
            href={`/dashboard/vendor/update-ticket/${_id}`}
            className={`flex-1 text-center py-2 rounded-lg ${
              isRejected
                ? "bg-gray-300 cursor-not-allowed pointer-events-none"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Update
          </Link> */}

          <button
            disabled={isRejected}
            className={`flex-1 py-2 rounded-lg ${
              isRejected
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTicketCard;
