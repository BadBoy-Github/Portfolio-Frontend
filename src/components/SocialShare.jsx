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
    <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-zinc-700">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
        title="Share this blog"
      >
        <IoShareSocial className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
        title="Copy link"
      >
        <IoCopy className="w-4 h-4" />
        <span className="text-sm">{copySuccess ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

export default SocialShare;