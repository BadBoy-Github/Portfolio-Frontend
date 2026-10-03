import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";
import { Button } from "../Button";

/**
 * Shared loading/error presentation for data-driven sections,
 * so every collection section fails and retries the same way.
 */
const SectionState = ({ loading, error, label, onRetry, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="loader">
          <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <p className="text-ink-soft text-lg md:text-xl max-w-[46ch]">
          Couldn&apos;t load {label}. The backend may be offline - check your
          connection and try again.
        </p>

        {onRetry && (
          <Button variant="outline" size="sm" icon={RotateCcw} onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  return children;
};

SectionState.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  label: PropTypes.string,
  onRetry: PropTypes.func,
  children: PropTypes.node,
};

export default SectionState;