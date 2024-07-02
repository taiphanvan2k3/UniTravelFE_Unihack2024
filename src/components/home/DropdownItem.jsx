// eslint-disable-next-line react/prop-types
function DropdownItem({ children, title }) {
    return (
        <div className="relative group/dropdown cursor-pointer">
            <p className="text-xl font-bold ">{title}</p>
            <div className="w-40 p-3 absolute bg-white left-12 hidden group-hover/dropdown:flex group-hover/dropdown:flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

export default DropdownItem;
