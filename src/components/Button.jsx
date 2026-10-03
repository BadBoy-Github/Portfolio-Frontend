import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";

const ButtonPrimary = ({
    href,
    target = '_self',
    label,
    icon,
    classes,
    ariaLabel,
    disabled = false,
    size = 'default',
}) => {
    const sizeClasses = {
        sm: 'h-10 px-4 text-sm',
        default: 'h-12 px-6 text-sm md:text-base',
        lg: 'h-14 px-8 text-base',
    };

    const baseClasses = `btn btn-primary ${sizeClasses[size]} ${classes || ""}`;

    const content = (
        <>
            {label}
            {icon && (
                <IoArrowForwardOutline className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={baseClasses + " group"}
                aria-label={ariaLabel || label}
                role="button"
                tabIndex={disabled ? -1 : 0}
            >
                {content}
            </a>
        );
    }
    return (
        <button
            className={baseClasses + " group"}
            aria-label={ariaLabel || label}
            disabled={disabled}
            type="button"
        >
            {content}
        </button>
    );
};

ButtonPrimary.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    classes: PropTypes.string,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'default', 'lg']),
};

const ButtonOutline = ({
    href,
    target = '_self',
    label,
    icon,
    classes,
    ariaLabel,
    disabled = false,
    size = 'default',
    onClick,
}) => {
    const sizeClasses = {
        sm: 'h-10 px-4 text-sm',
        default: 'h-12 px-6 text-sm md:text-base',
        lg: 'h-14 px-8 text-base',
    };

    const baseClasses = `btn btn-outline ${sizeClasses[size]} ${classes || ""}`;

    const content = (
        <>
            {label}
            {icon && (
                <IoArrowForwardOutline className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
        </>
    );

    if (href) {
        return (
            <Link
                to={href}
                target={target}
                className={baseClasses + " group"}
                aria-label={ariaLabel || label}
                role="button"
                tabIndex={disabled ? -1 : 0}
            >
                {content}
            </Link>
        );
    }
    return (
        <button
            className={baseClasses + " group"}
            aria-label={ariaLabel || label}
            disabled={disabled}
            type="button"
            onClick={onClick}
        >
            {content}
        </button>
    );
};

ButtonOutline.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    classes: PropTypes.string,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'default', 'lg']),
    onClick: PropTypes.func,
};

const ButtonGhost = ({ label, classes, onClick, icon: Icon }) => (
    <button
        className={`btn btn-ghost ${classes || ""}`}
        onClick={onClick}
    >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
    </button>
);

ButtonGhost.propTypes = {
    label: PropTypes.string.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.elementType,
};

const ButtonTerminal = ({ label, onClick, classes, icon: Icon, size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
    };

    return (
        <button
            className={`btn btn-terminal ${sizeClasses[size]} ${classes || ""} group`}
            onClick={onClick}
        >
            {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            {label}
        </button>
    );
};

ButtonTerminal.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classes: PropTypes.string,
    icon: PropTypes.elementType,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export {
    ButtonPrimary,
    ButtonOutline,
    ButtonGhost,
    ButtonTerminal,
};
