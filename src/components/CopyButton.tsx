import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
  successMessage: string;
};

const copyWithFallback = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};

export function CopyButton({ value, label, successMessage }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleCopy = async () => {
    await copyWithFallback(value);
    setIsCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground/65 transition-colors hover:border-festival-purple hover:text-festival-purple"
        aria-label={label}
        title={label}
      >
        {isCopied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      </button>

      {isCopied && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-xl"
        >
          {successMessage}
        </div>
      )}
    </>
  );
}
