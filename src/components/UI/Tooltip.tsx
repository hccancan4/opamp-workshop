import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Tooltip.css';

interface TooltipProps {
  term: string;
  definition: string;
  chapterSlug?: string;
  children?: React.ReactNode;
}

export default function Tooltip({ term, definition, chapterSlug, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => { clearTimeout(timer.current); setVisible(true); };
  const hide = () => { timer.current = setTimeout(() => setVisible(false), 200); };

  return (
    <span
      className="tooltip-wrap"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      <span className="tooltip-trigger">{children ?? term}</span>
      {visible && (
        <span className="tooltip-box" role="tooltip">
          <span className="tooltip-term">{term}</span>
          <span className="tooltip-def">{definition}</span>
          {chapterSlug && (
            <Link to={`/theory/${chapterSlug}`} className="tooltip-more">→ Read more</Link>
          )}
        </span>
      )}
    </span>
  );
}
