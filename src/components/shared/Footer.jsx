import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer Container */}
      <div className="footer max-w-7xl mx-auto p-10 md:grid-cols-4">
        {/* Column 1 */}
        <aside>
          <h2 className="footer-title text-lg font-bold text-white opacity-100">
            Go Venture
          </h2>
          <p className="max-w-xs text-neutral-content/80">
            Book bus, train, launch & flight tickets easily
          </p>
        </aside>

        {/* Column 2 */}
        <nav>
          <h6 className="footer-title text-white opacity-90">Quick Links</h6>
          <Link
            href="/"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/tickets"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            All Tickets
          </Link>
          <Link
            href="/contact"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="link link-hover text-neutral-content/80 hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Column 3 */}
        <nav>
          <h6 className="footer-title text-white opacity-90">Contact Info</h6>
          <span className="text-neutral-content/80">
            Email: support@ticketbari.com
          </span>
          <span className="text-neutral-content/80">
            Phone: +880 1234 567890
          </span>
          <span className="text-neutral-content/80">
            Facebook: fb.com/ticketbari
          </span>
        </nav>

        {/* Column 4 */}
        <nav>
          <h6 className="footer-title text-white opacity-90">
            Payment Methods
          </h6>
          <p className="text-neutral-content/80 mb-2">
            We accept secure payments via Stripe
          </p>
          <span className="badge badge-primary font-semibold p-3 text-white">
            Stripe
          </span>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="footer footer-center p-4bg-neutral text-neutral-content text-sm border-t border-base-content/10">
        <aside>
          <p>&copy; {new Date().getFullYear()} TicketBari. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
