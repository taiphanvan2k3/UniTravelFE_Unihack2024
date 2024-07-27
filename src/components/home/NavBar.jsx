import { Link } from "react-router-dom";
import DropdownItem from "./DropdownItem";
import NavItem from "./NavItem";
import { logo } from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ROUTE_CONSTANTS } from "@/constants/routes";
import UserDropdown from "./UserDropdown";
const travelPages = [
    { title: "Home", path: ROUTE_CONSTANTS.HOME_PAGE },
    { title: "Provinces", path: ROUTE_CONSTANTS.PROVINCES_PAGE },
    { title: "Schedule", path: ROUTE_CONSTANTS.SCHEDULE_PAGE },
    { title: "Find Store", path: ROUTE_CONSTANTS.FIND_STORE_PAGE },
];
const storeOwnerPages = [
    { title: "Home", path: ROUTE_CONSTANTS.HOME_PAGE },
    { title: "Store", path: ROUTE_CONSTANTS.STORE_PAGE },
];
function NavBar() {
    const { auth } = useContext(AuthContext);
    const [pages, setPages] = useState(travelPages);
    useEffect(() => {
        if (auth?.user && auth.user.roles.includes("store-owner")) {
            setPages(storeOwnerPages);
        } else {
            setPages(travelPages);
        }
    }, [auth.user]);

    return (
        <nav className="w-full px-8 py-2 bg-white">
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
                            className="bg-primary-200 text-white px-6 py-3 rounded-2xl border-2 border-primary-200 duration-300 ease-in-out font-semibold text-lg hover:bg-white hover:text-primary-100"
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
