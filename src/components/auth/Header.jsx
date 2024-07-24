import PropTypes from "prop-types";
function Header({ title, description }) {
    return (
        <div>
            <p className="text-3xl font-bold text-primary-200 mb-3">{title}</p>
            <p className="text-base  text-gray-500 whitespace-nowrap">{description}</p>
        </div>
    );
}
Header.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};
export default Header;
