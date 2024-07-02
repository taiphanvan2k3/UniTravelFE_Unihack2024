import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function NavItem({ title, to }) {
    return (
        <Link
            to={to}
            className="text-black font-bold text-xl hover:text-blue-400 duration-500 ease-in-out  relative group"
        >
            {title}
            <div className="w-0 absolute -bottom-1 h-0.5 bg-blue-400 group-hover:w-full transition-width duration-500 ease-in-out"></div>
        </Link>
    );
}

export default NavItem;
