
// Node modules
import PropTypes from "prop-types"
import { Link } from "react-router-dom";

// Primary Button


const ButtonPrimary = ({
    href,
    target = '_self',
    label,
    icon,
    classes,
    ariaLabel,
    disabled = false
}) => {

    if (href) {
        return (
          <a
            href={href}
            target={target}
            className={"btn btn-primary " + classes}
            aria-label={ariaLabel || label}
            role="button"
            tabIndex={disabled ? -1 : 0}
          >
            {label}

            {icon ? (
              <span
                className="material-symbols-rounded"
                aria-hidden="true"
              >
                {icon}
              </span>
            ) : undefined}
          </a>
        );
    } else {
        return (
            <button
              className={"btn btn-primary " + classes}
              aria-label={ariaLabel || label}
              disabled={disabled}
              type="button"
            >
                {label}

                {icon ?
                    <span className="material-symbols-rounded"
                        aria-hidden="true">
                        {icon}
                    </span>
                    : undefined
                }
            </button>
        )
    }

}

ButtonPrimary.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
    classes: PropTypes.string,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool
}

// Outline Button


const ButtonOutline = ({
    href,
    target = '_self',
    label,
    icon,
    classes,
    ariaLabel,
    disabled = false
}) => {

    if (href) {
        return (
            <Link
                to={href}
                target={target}
                className={"btn btn-outline " + classes}
                aria-label={ariaLabel || label}
                role="button"
                tabIndex={disabled ? -1 : 0}
            >
                {label}

                {icon ?
                    <span className="material-symbols-rounded"
                        aria-hidden="true">
                        {icon}
                    </span>
                    : undefined
                }
            </Link>
        )
    } else {
        return (
            <button
              className={"btn btn-outline " + classes}
              aria-label={ariaLabel || label}
              disabled={disabled}
              type="button"
            >
                {label}

                {icon ?
                    <span className="material-symbols-rounded"
                        aria-hidden="true">
                        {icon}
                    </span>
                    : undefined
                }
            </button>
        )
    }

}

ButtonOutline.propTypes = {
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
    classes: PropTypes.string,
    ariaLabel: PropTypes.string,
    disabled: PropTypes.bool
}

export {
    ButtonPrimary,
    ButtonOutline
}