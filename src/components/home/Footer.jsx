import { logo } from "@/assets/images";
function Footer() {
    return (
        <footer className="w-full bg-sky-300 text-white h-60 mt-10 p-12 opacity-50 grid grid-rows-2 ">
            <div className="grid grid-cols-3">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold ">Let's have a trip</h1>
                    <p>Go a trip to view more place beautiful</p>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div>
                    <div className="w-full flex justify-start items-center">
                        <img src={logo} alt="Hoi An" className="h-28" />
                    </div>
                    <div className="cols-span-2">
                        <div></div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        </footer>
    );
}

export default Footer;
