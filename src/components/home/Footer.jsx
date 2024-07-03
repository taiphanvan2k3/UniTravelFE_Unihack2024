import { logo_1 } from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
function Footer() {
    const navItems = ["Home", "Bookings", "Reviews", "Supports"];
    return (
        <footer className="w-full bg-black text-white mt-10 p-12 grid grid-cols-4 ">
            <div className={"col-span-1"}>
                <div className={"flex flex-col gap-6 items-center justify-center"}>
                    <div>
                        <h1 className="text-2xl font-bold">Let's have a trip</h1>
                        <p className="text-md text-slate-400">Welcome to out website</p>
                    </div>
                    <img src={logo_1} alt="logo" className="size-28 rounded-full" />
                    <div className="flex gap-4">
                        <FontAwesomeIcon className="size-6" icon={faFacebook} />
                        <FontAwesomeIcon className="size-6" icon={faGoogle} />
                        <FontAwesomeIcon className="size-6" icon={faLinkedin} />
                    </div>
                </div>
            </div>
            <div className="col-span-3 flex justify-evenly ">
                <div className="flex flex-col  gap-4">
                    <h1>Company</h1>
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, index) => (
                            <p className="text-gray-400" key={index}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col  gap-4">
                    <h1>Company</h1>
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, index) => (
                            <p className="text-gray-400" key={index}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col  gap-4">
                    <h1>Contact</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center ">
                            <FontAwesomeIcon icon={faPhone} />
                            <p className="text-gray-400">0941295687</p>
                        </div>
                        <div className={"flex gap-2 items-center"}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className="text-gray-400">hoangnguyen241003@gmail.com</p>
                        </div>
                        <div className={"flex gap-2 items-center"}>
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <p className="text-gray-400">54 Nguyen Luong Bang</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
