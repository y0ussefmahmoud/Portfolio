import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WindowFrameProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function WindowFrame({
  title,
  children,
  onClose,
  className,
}: WindowFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: "backOut" }}
      className={[
        "bg-card/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-w-5xl h-[80vh] flex flex-col",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-white/10 rounded-t-xl">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>

        <div className="flex-1 text-center">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-foreground/80">
            {title}
          </span>
        </div>

        <div className="w-16 flex justify-end">
          <div className="h-1 w-10 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">{children}</div>

      <div className="flex items-center justify-between px-4 py-2 bg-secondary/20 border-t border-white/10 rounded-b-xl font-mono text-[10px] tracking-widest text-foreground/70">
        <span>READY</span>
        <span>MEM: 64KB OK</span>
      </div>
    </motion.div>
  );
}
