import { Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 inline-end-5 z-40 flex flex-col gap-3" style={{ insetInlineEnd: "1.25rem" }}>
      <a
        href="https://wa.me/201505663520"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="size-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-elegant hover:scale-110 transition-transform"
      >
        <MessageCircle className="size-7 text-white" />
      </a>
      <a
        href="tel:01550516177"
        aria-label="Call"
        className="size-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
      >
        <Phone className="size-6 text-onyx" />
      </a>
    </div>
  );
}
