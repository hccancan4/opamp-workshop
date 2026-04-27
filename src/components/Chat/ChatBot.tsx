import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LanguageContext';
import { matchIntent, INITIAL_CHIPS, WELCOME, type BotResponse } from '../../lib/chatKnowledge';
import './ChatBot.css';

interface Message {
  role: 'bot' | 'user';
  text: string;
  link?: { to: string; label: string };
}

// Icon for the floating button
function BotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="8"  cy="12" r="1.4" fill="currentColor"/>
      <circle cx="14" cy="12" r="1.4" fill="currentColor"/>
      <path d="M11 6V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="11" cy="2.5" r="1" fill="currentColor"/>
      <path d="M7 18v2M15 18v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="chat-typing">
      <span/><span/><span/>
    </div>
  );
}

export default function ChatBot() {
  const { lang } = useLang();
  const [open,    setOpen]    = useState(false);
  const [opened,  setOpened]  = useState(false); // first open flag
  const [msgs,    setMsgs]    = useState<Message[]>([]);
  const [chips,   setChips]   = useState<string[]>([]);
  const [input,   setInput]   = useState('');
  const [typing,  setTyping]  = useState(false);
  const [unread,  setUnread]  = useState(false);

  const endRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pickText = useCallback((r: BotResponse) => lang === 'tr' ? r.text_tr : r.text_en, [lang]);
  const pickChips = useCallback((r: BotResponse) =>
    lang === 'tr' ? (r.chips_tr ?? []) : (r.chips_en ?? []), [lang]);
  const pickLink = useCallback((r: BotResponse) => r.link
    ? { to: r.link.to, label: lang === 'tr' ? r.link.label_tr : r.link.label_en }
    : undefined, [lang]);

  const pushBot = useCallback((response: BotResponse) => {
    const msg: Message = {
      role: 'bot',
      text: pickText(response),
      link: pickLink(response),
    };
    setMsgs(m => [...m, msg]);
    setChips(pickChips(response));
  }, [pickText, pickLink, pickChips]);

  // First open → show welcome message
  const handleOpen = () => {
    setOpen(true);
    setUnread(false);
    if (!opened) {
      setOpened(true);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        pushBot(WELCOME);
        setChips(lang === 'tr' ? INITIAL_CHIPS.tr : INITIAL_CHIPS.en);
      }, 700);
    }
  };

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    setInput('');
    setChips([]);

    // User message
    setMsgs(m => [...m, { role: 'user', text: text.trim() }]);

    // Bot thinks...
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const response = matchIntent(text);
      pushBot(response);
    }, 500 + Math.random() * 300);
  }, [pushBot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChip = (chip: string) => {
    sendMessage(chip);
  };

  return (
    <>
      {/* ── Panel ───────────────────────────────────────────────────────── */}
      <div className={`chatbot-panel${open ? ' open' : ''}`} role="dialog" aria-label="Op-Amp Assistant">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <BotIcon />
            <div>
              <div className="chatbot-title">
                {lang === 'tr' ? 'Atölye Asistanı' : 'Workshop Assistant'}
              </div>
              <div className="chatbot-subtitle mono">
                {lang === 'tr' ? 'Op-amp · Teori · Devre' : 'Op-amp · Theory · Circuit'}
              </div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              <div className="chat-bubble">
                {/* Preserve newlines */}
                {m.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br/>}</span>
                ))}
                {m.link && (
                  <Link to={m.link.to} className="chat-link" onClick={() => setOpen(false)}>
                    {m.link.label}
                  </Link>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--bot">
              <div className="chat-bubble"><TypingDots /></div>
            </div>
          )}

          {/* Quick reply chips — below last bot message */}
          {!typing && chips.length > 0 && (
            <div className="chat-chips">
              {chips.map((c, i) => (
                <button key={i} className="chat-chip" onClick={() => handleChip(c)}>
                  {c}
                </button>
              ))}
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <form className="chatbot-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={lang === 'tr' ? 'Bir şey sor…' : 'Ask something…'}
            autoComplete="off"
          />
          <button
            type="submit"
            className="chatbot-send"
            disabled={!input.trim() || typing}
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h10M9 4l5 4-5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      {/* ── Floating button ──────────────────────────────────────────────── */}
      <button
        className={`chatbot-fab${open ? ' active' : ''}${unread ? ' unread' : ''}`}
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label={lang === 'tr' ? 'Asistanı aç' : 'Open assistant'}
      >
        <span className={`chatbot-fab-icon${open ? ' rotated' : ''}`}>
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <BotIcon />
          )}
        </span>
        {unread && <span className="chatbot-badge"/>}
      </button>
    </>
  );
}
