import { faCalendarDays, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bana } from "@/assets/images";
function Hero() {
    return (
        <div className="w-full h-[700px] flex justify-center items-center p-10 ">
            <div className="p-10 w-full h-full bg-white rounded-2xl shadow-2xl grid grid-cols-2">
                <div className="col-span-1 flex flex-col ml-10">
                    <div className="">
                        <p className="text-lg font-bold">
                            Savor life's richness, explore widely{" "}
                            <span className="text-slate-400 font-semibold">
                                {" "}
                                - finding identity and purpose through exhilarating travel adventures
                            </span>
                        </p>
                    </div>
                    <h1 className="text-6xl font-bold mt-12 text-sky-400">Explore the world</h1>
                    <div className="h-28 w-[700px] bg-sky-400 mt-10 rounded-full grid grid-cols-9 p-6">
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="font-bold text-white">Where</h3>
                            <p className="text-white font-semibold">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                Bana Hill, Danang city
                            </p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <div className="h-full w-0.5 bg-white"></div>
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                            <h3 className="font-bold text-white">Date</h3>
                            <p className="text-white font-semibold">
                                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                                03, July 2024
                            </p>
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                            <div className="size-16 rounded-full bg-white flex items-center justify-center">
                                <FontAwesomeIcon icon={faSearch} className="text-sky-400 size-7" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 flex  justify-center">
                    <div className="h-full w-full flex justify-center items-start">
                        <img
                            src={Bana}
                            alt="hero"
                            className="object-cover h-[500px] w-96 rounded-2xl hover:scale-105 duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
