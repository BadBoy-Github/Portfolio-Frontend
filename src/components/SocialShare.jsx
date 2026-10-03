import PropTypes from "prop-types";
import { useState } from "react";
import { IoShareSocial, IoCopy } from "react-icons/io5";

const SocialShare = ({ title, url }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch {
        // share cancelled or unavailable
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-ink/10">
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 bg-paper hover:bg-paper/80 text-ink shadow-hard rounded-xl transition-colors"
        title="Share this blog"
      >
        <IoShareSocial className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
          copySuccess
            ? "bg-marker text-ink"
            : "bg-paper hover:bg-paper/80 text-ink shadow-hard"
        }`}
        title="Copy link"
      >
        <IoCopy className="w-4 h-4" />
        <span className="text-sm">{copySuccess ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

SocialShare.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default SocialShare;
