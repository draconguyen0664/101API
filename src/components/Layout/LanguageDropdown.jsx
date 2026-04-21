import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { LANGUAGE_OPTIONS } from "../../i18n/translations";
import { useI18n } from "../../contexts/LanguageContext";

function LanguageDropdown() {
  const { language, setLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLanguage =
    LANGUAGE_OPTIONS.find((item) => item.code === language) ||
    LANGUAGE_OPTIONS[0];

  return (
    <div className="relative w-[160px]" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-4 transition-all ${
          open
            ? "border-cyan-400 bg-slate-900 ring-2 ring-cyan-400/20"
            : "border-slate-700 bg-slate-800 hover:border-slate-600"
        } text-white`}>
        <div className="flex items-center gap-2">
          <span className="text-sm">{selectedLanguage.flag}</span>
          <span className="text-sm font-medium">{selectedLanguage.label}</span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-[80] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_16px_40px_rgba(2,6,23,0.5)]">
          <div className="py-2">
            {LANGUAGE_OPTIONS.map((item) => {
              const selected = item.code === language;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "bg-cyan-500/10 font-semibold text-cyan-300"
                      : "text-slate-200 hover:bg-slate-800"
                  }`}>
                  <div className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </div>

                  {selected && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
