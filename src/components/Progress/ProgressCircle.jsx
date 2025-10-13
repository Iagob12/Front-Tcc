import { useEffect, useState } from "react";
import "../../styles/Progress/ProgressCircle.css";

export default function ProgressCircle({ value = 0, label = "", size = 150 }) {
   const [progress, setProgress] = useState(0);   // para o círculo
  const [count, setCount] = useState(0);         // para o número

  const strokeWidth = 12;
  const radius = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // anima o círculo até 100%
    setTimeout(() => {
      setProgress(100);
    }, 100);

    // anima o contador
    let start = 0;
    const duration = 4000; // tempo total da animação (2s)
    const stepTime = Math.max(Math.floor(duration / value), 20);

    const counter = setInterval(() => {
      start++;
      if (start <= value) {
        setCount(start);
      } else {
        clearInterval(counter);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [value]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-container">
      <div className="progress-circle" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* círculo de fundo */}
          <circle
            className="progress-background"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          {/* círculo de progresso */}
          <circle
            className="progress-bar"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="progress-text">{count}+</div>
      </div>
      <p className="progress-label">{label}</p>
    </div>
  );
}
