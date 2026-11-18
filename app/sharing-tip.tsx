'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sharingTipForDate, type SharingTip } from './sharing-tips';

type Props = { onKeep: (tip: SharingTip) => void; disabled: boolean };

export default function DailySharingTip({ onKeep, disabled }: Props) {
  const [tip, setTip] = useState<SharingTip | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function refresh() {
      const now = new Date();
      setTip(sharingTipForDate(now));
      clearTimeout(timer);
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = setTimeout(refresh, tomorrow.getTime() - now.getTime() + 100);
    }
    refresh();
    // Refresh after a sleeping device or backgrounded tab returns, too.
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return (
    <section className="daily-sharing-tip" aria-labelledby="sharing-tip-heading">
      <div className="sharing-tip-header">
        <span className="sharing-tip-icon"><Sparkles size={20} strokeWidth={1.4} /></span>
        <div>
          <div className="eyebrow">ONE SMALL IDEA FOR TODAY</div>
          <h2 id="sharing-tip-heading">A little sharing tip</h2>
        </div>
        <span className="sharing-tip-cadence">A fresh idea each day</span>
      </div>
      {tip ? (
        <>
          <h3 className="sharing-tip-title">{tip.title}</h3>
          <p className="sharing-tip-idea">{tip.idea}</p>
          <div className="sharing-tip-examples">
            <div>
              <p className="sharing-tip-label">HOW IT MIGHT SOUND</p>
              <blockquote>“{tip.example}”</blockquote>
            </div>
            <div>
              <p className="sharing-tip-label">SOMETHING TO EXPLORE</p>
              <p className="sharing-tip-topic">{tip.topic}</p>
            </div>
          </div>
          <div className="sharing-tip-footer">
            <p>Borrow a line, change it, or simply let it pass.</p>
            <button className="text-btn" disabled={disabled} onClick={() => onKeep(tip)}>
              Make it my own <ArrowRight size={15} />
            </button>
          </div>
        </>
      ) : <p className="sharing-tip-idea">Finding today’s small idea…</p>}
    </section>
  );
}
