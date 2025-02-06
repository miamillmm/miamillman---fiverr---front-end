import { Link, useLocation } from "react-router";
import Translate from "../../utils/Translate";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="p-4">
      <div className="flex items-center gap-6">
        {["/addlisting", "/dashboard", "/messages", "/settings"].map(
          (path, index) => {
            const labels = [
              <Translate key={1} text="Add New" />,
              <Translate key={2} text={"My Listing"} />,
              <Translate key={3} text={"Messages"} />,
            ];
            const isActive = location.pathname === path;

            return (
              <Link
                key={index}
                to={path}
                className={`relative text-gray-800 text-lg font-medium pb-1 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-orange-500"
                    : "hover:border-b-2 hover:border-orange-400"
                }`}
              >
                {labels[index]}
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
};

export default Navbar;
