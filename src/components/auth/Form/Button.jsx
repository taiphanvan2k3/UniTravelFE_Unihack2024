// eslint-disable-next-line react/prop-types
function Button({ children, type }) {
    return (
        <button
            type={type}
            className="w-full bg-black text-white p-2 rounded-md font-bold hover:bg-transparent hover:text-black border-2 border-black duration-300 ease-in-out"
        >
            {children}
        </button>
    );
}

export default Button;
