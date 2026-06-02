import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      color: "hover:bg-green-500 hover:text-white",
    },
    {
      icon: <FaFacebook className="w-5 h-5" />,
      label: "Facebook",
      href: `https://facebook.com/sharer/sharer.php?u=${encoded}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      icon: <FaTelegram className="w-5 h-5" />,
      label: "Telegram",
      href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
      color: "hover:bg-sky-400 hover:text-white",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://instagram.com",
      color: "hover:bg-pink-600 hover:text-white",
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      label: "YouTube",
      href: "https://youtube.com",
      color: "hover:bg-red-600 hover:text-white",
    },
    {
      icon: <FaPinterest className="w-5 h-5" />,
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encoded}&description=${encodedTitle}`,
      color: "hover:bg-red-700 hover:text-white",
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share:</span>
      </div>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className={`w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-smooth ${link.color}`}
          data-ocid={`social.${link.label.toLowerCase()}_button`}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-smooth"
        data-ocid="social.copy_link_button"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
