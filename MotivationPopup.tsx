import { useEffect, useState } from "react";
import motivationImage from "@/assets/motivation.png";

interface MotivationPopupProps {
  message: string;
  userName: string;
}

const MotivationPopup = ({ message, userName }: MotivationPopupProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-card border-2 border-accent rounded-2xl p-6 shadow-[var(--shadow-primary)] animate-scale-in pointer-events-auto max-w-sm">
        <div className="flex items-center gap-4">
          <img 
            src={motivationImage} 
            alt="Motivation" 
            className="w-16 h-16 animate-float"
          />
          <div>
            <p className="text-lg font-bold text-foreground mb-1">
              Hey {userName}! 👋
            </p>
            <p className="text-accent font-semibold">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationPopup;
