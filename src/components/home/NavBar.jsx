import { Link } from "react-router-dom";
import DropdownItem from "./DropdownItem";
import NavItem from "./NavItem";
import { logo } from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import UserDropdown from "./UserDropdown";

function NavBar() {
    console.log("Navbar re-render");
    const { auth } = useContext(AuthContext);
    const pages = [
        { title: "Home", path: ROUTE_CONSTANTS.HOME_PAGE },
        { title: "Bookings", path: ROUTE_CONSTANTS.BOOKING_PAGE },
        { title: "Reviews", path: ROUTE_CONSTANTS.REVIEWS_PAGE },
        {
            title: "Supports",
            children: [
                { title: "Schedule", path: "/schedule" },
                { title: "Find Partners", path: "/find-partners" },
            ],
        },
    ];

    return (
        <nav className="w-full px-8 py-2">
            <div className="flex justify-around items-center">
                <Link to={ROUTE_CONSTANTS.HOME_PAGE}>
                    <img src={logo} alt="" className="h-28" />
                </Link>
                <div className="flex gap-12 justify-between">
                    {pages.map((page, index) => {
                        if (page.children) {
                            return (
                                <DropdownItem key={index} title={page.title}>
                                    {page.children.map((child, index) => (
                                        <NavItem key={index} title={child.title} to={child.path} />
                                    ))}
                                </DropdownItem>
                            );
                        } else {
                            return <NavItem key={index} title={page.title} to={page.path} />;
                        }
                    })}
                </div>
                <div>
                    {auth.isAuthenticated ? (
                        <UserDropdown userInfo={auth.user} />
                    ) : (
                        <Link
                            to="/auth/sign-in"
                            className="bg-black text-white px-6 py-3 rounded-2xl border-2 border-black duration-300 ease-in-out font-semibold text-lg hover:bg-white hover:text-black"
                        >
                            Sign In
                            <FontAwesomeIcon className="ml-2" icon={faUser} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
