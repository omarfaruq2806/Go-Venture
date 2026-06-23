import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold mb-3">TicketBari</h2>
          <p className="text-gray-300 text-sm">
            Book bus, train, launch & flight tickets easily
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tickets">All Tickets</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: support@ticketbari.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Facebook: fb.com/ticketbari</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3">Payment Methods</h3>
          <p className="text-gray-300 text-sm">
            We accept secure payments via Stripe
          </p>

          <div className="mt-3">
            <span className="px-3 py-1 bg-blue-600 rounded text-sm">
              Stripe
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
