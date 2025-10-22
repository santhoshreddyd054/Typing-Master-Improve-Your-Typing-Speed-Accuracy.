import { useEffect, useState } from "react";

interface CountdownTimerProps {
  onComplete: () => void;
}

const CountdownTimer = ({ onComplete }: CountdownTimerProps) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="text-9xl font-bold bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] bg-clip-text text-transparent animate-pulse-glow">
          {count}
        </div>
        <p className="text-2xl text-muted-foreground mt-4">
          Get ready to type!
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
