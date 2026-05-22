import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate('/');
  }

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Digital Signature Webapp
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-200 transition text-sm">
            Home
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="/about" className="hover:text-blue-200 transition text-sm">
            About Us
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="/location" className="hover:text-blue-200 transition text-sm">
            Location
          </Link>
          <span className="text-blue-300">|</span>
          <Link to="/contact" className="hover:text-blue-200 transition text-sm">
            Contact Us
          </Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200 transition text-sm">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
