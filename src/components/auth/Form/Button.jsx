// eslint-disable-next-line react/prop-types
function Button({ children, type, styles }) {
    return (
        <button
            type={type}
            style={styles}
            className={`w-full bg-primary-100 text-white p-2 rounded-md font-bold hover:bg-transparent hover:text-primary-100 border-2 border-primary-100 duration-300 ease-in-out`}
        >
            {children}
        </button>
    );
}

export default Button;
