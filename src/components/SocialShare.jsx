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
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 bg-accent-secondary hover:bg-accent-secondary/90 text-accent-foreground rounded-lg transition-colors"
        title="Share this blog"
      >
        <IoShareSocial className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>

      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors border border-border ${
          copySuccess
            ? 'bg-accent-secondary text-accent-foreground'
            : 'bg-muted hover:bg-accent-secondary text-muted-foreground hover:text-accent-foreground'
        }`}
        title="Copy link"
      >
        <IoCopy className="w-4 h-4" />
        <span className="text-sm">{copySuccess ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

export default SocialShare;
