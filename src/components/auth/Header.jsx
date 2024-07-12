function Header({ title, description }) {
    return (
        <div>
            <p className="text-3xl font-bold text-black mb-3">{title}</p>
            <p className="text-base  text-gray-500 whitespace-nowrap">{description}</p>
        </div>
    );
}

export default Header;
