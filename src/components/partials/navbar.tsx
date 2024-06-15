import { getLoggedInUser } from "@/lib/server/appwrite";
import AuthBlock from '../shared/auth-block';

const Navbar = async () => {

  const user = await getLoggedInUser();

  if (!user) console.log('No user');

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3000/api/auth/signout', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Logged out');
    } else {
      console.error('Failed to log out');
    }
  };

  return (
    <nav className="w-full mb-8">
      <div className="container flex">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <h1 className="title is-4">My Blog</h1>
          </a>
        </div>
        <div className="ml-auto flex flex-row gap-4 justify-between items-center">
          <div className="flex flex-row gap-4">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/about" className="navbar-item">
              About
            </a>
            <a href="/contact" className="navbar-item">
              Contact
            </a>
          </div>
          <AuthBlock user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;