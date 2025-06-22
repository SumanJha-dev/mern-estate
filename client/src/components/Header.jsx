import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md font-semibold">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Suman</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search... "
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                key={currentUser.avatar}
                className="rounded-full h-7 w-7 object-cover border border-gray-300"
                src={
                  currentUser.avatar ||
                  "https://i.pinimg.com/736x/25/19/9d/25199d7fd3c53127dde6ad8806f44773.jpg"
                }
                alt="profile"
                onError={(e) => {
                  console.error("Avatar failed to load:", currentUser.avatar);
                  e.target.onerror = null;
                  e.target.src =
                    "https://i.pinimg.com/736x/25/19/9d/25199d7fd3c53127dde6ad8806f44773.jpg";
                }}
              />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
