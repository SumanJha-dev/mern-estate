import { useState, useEffect } from "react";

const Avatar = ({ src, alt, className, onClick }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const defaultAvatar =
    "https://i.pinimg.com/736x/25/19/9d/25199d7fd3c53127dde6ad8806f44773.jpg";

  // Alternative avatar sources to try
  const generateFallbackAvatars = (originalSrc) => {
    const fallbacks = [];

    // If it's a Google avatar, try different size formats
    if (originalSrc && originalSrc.includes("googleusercontent.com")) {
      const baseUrl = originalSrc.split("=")[0];
      fallbacks.push(
        baseUrl + "=s96-c",
        baseUrl + "=s128-c",
        baseUrl + "=s200-c",
        baseUrl,
        baseUrl.replace("=s400-c", "=s200-c")
      );
    }

    // Add generic fallbacks
    fallbacks.push(
      "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(alt || "User") +
        "&background=64748b&color=ffffff&size=200",
      "https://api.dicebear.com/7.x/initials/svg?seed=" +
        encodeURIComponent(alt || "User"),
      defaultAvatar
    );

    return fallbacks;
  };

  const handleError = () => {
    const fallbacks = generateFallbackAvatars(src);
    const nextIndex = fallbackIndex + 1;

    if (nextIndex < fallbacks.length) {
      console.log(
        `Avatar failed to load: ${currentSrc}, trying fallback ${nextIndex}: ${fallbacks[nextIndex]}`
      );
      setCurrentSrc(fallbacks[nextIndex]);
      setFallbackIndex(nextIndex);
    } else {
      console.log(
        `All avatar fallbacks failed, using default: ${defaultAvatar}`
      );
      setCurrentSrc(defaultAvatar);
    }
  };

  // If the original src changes, reset the error state
  useEffect(() => {
    if (src && src !== currentSrc) {
      setCurrentSrc(src);
      setFallbackIndex(0);
    }
  }, [src, currentSrc]);

  return (
    <img
      src={currentSrc || defaultAvatar}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};

export default Avatar;
