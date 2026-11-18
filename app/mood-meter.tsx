'use client';

import { useId, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';

type Feeling = { name: string; meaning: string };
const quadrants = [
  { color: 'red', name: 'Red', energy: 'Higher energy', pleasantness: 'Less pleasant', feelings: [
    { name: 'Angry', meaning: 'Upset about something unfair' },
    { name: 'Frustrated', meaning: 'Blocked from what you want' },
    { name: 'Anxious', meaning: 'Uneasy about what might happen' },
    { name: 'Overwhelmed', meaning: 'Too much to take in' },
    { name: 'Tense', meaning: 'On edge; hard to relax' },
    { name: 'Worried', meaning: 'Troubled by a possible problem' },
  ] },
  { color: 'yellow', name: 'Yellow', energy: 'Higher energy', pleasantness: 'More pleasant', feelings: [
    { name: 'Excited', meaning: 'Eager for what is coming' },
    { name: 'Joyful', meaning: 'Full of happiness' },
    { name: 'Enthusiastic', meaning: 'Interested and ready to engage' },
    { name: 'Inspired', meaning: 'Moved to create or act' },
    { name: 'Hopeful', meaning: 'Looking toward a good possibility' },
    { name: 'Proud', meaning: 'Pleased with something you did' },
  ] },
  { color: 'blue', name: 'Blue', energy: 'Lower energy', pleasantness: 'Less pleasant', feelings: [
    { name: 'Sad', meaning: 'Feeling low or unhappy' },
    { name: 'Lonely', meaning: 'Missing a sense of connection' },
    { name: 'Disappointed', meaning: 'Things fell short of hopes' },
    { name: 'Discouraged', meaning: 'Finding it hard to keep going' },
    { name: 'Drained', meaning: 'With little energy left' },
    { name: 'Bored', meaning: 'Uninterested in what is happening' },
  ] },
  { color: 'green', name: 'Green', energy: 'Lower energy', pleasantness: 'More pleasant', feelings: [
    { name: 'Calm', meaning: 'Settled and at ease' },
    { name: 'Relaxed', meaning: 'Free from tension' },
    { name: 'Content', meaning: 'Satisfied with this moment' },
    { name: 'Peaceful', meaning: 'Quiet and untroubled inside' },
    { name: 'Grateful', meaning: 'Appreciating something in your life' },
    { name: 'Secure', meaning: 'Safe and supported' },
  ] },
] as const;
const typicalFeelings: readonly Feeling[] = quadrants.flatMap<Feeling>(q => q.feelings);
const limit = 15;

export default function MoodMeter({ value, onChange }: { value: string[]; onChange: (feelings: string[]) => void }) {
  const id = useId();
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [custom, setCustom] = useState('');
  const [message, setMessage] = useState('');
  const activeName = hovered ?? focused ?? pinned;
  const active = typicalFeelings.find(f => f.name === activeName);
  const descriptionId = `${id}-meaning`;
  const isSelected = (name: string) => value.some(v => v.toLocaleLowerCase() === name.toLocaleLowerCase());

  function toggle(name: string) {
    setPinned(name);
    setMessage('');
    if (isSelected(name)) {
      onChange(value.filter(v => v.toLocaleLowerCase() !== name.toLocaleLowerCase()));
    } else if (value.length < limit) {
      onChange([...value, name]);
    } else {
      setMessage('You can keep up to 15 feelings in one note. Remove one to make room.');
    }
  }

  function addCustom() {
    const word = custom.trim();
    if (!word) return;
    const name = typicalFeelings.find(f => f.name.toLocaleLowerCase() === word.toLocaleLowerCase())?.name ?? word;
    if (isSelected(name)) {
      setCustom('');
      setPinned(name);
      setMessage('That feeling is already in your note.');
      return;
    }
    if (value.length >= limit) {
      setMessage('You can keep up to 15 feelings in one note. Remove one to make room.');
      return;
    }
    onChange([...value, name]);
    setPinned(name);
    setCustom('');
    setMessage('');
  }

  return (
    <fieldset className="mood-meter">
      <legend>How are you feeling?</legend>
      <p className="mood-guidance">Every quadrant belongs here. Choose a few, or leave this open.</p>
      <div className="mood-top-axis" aria-hidden="true">↑ Higher energy</div>
      <div className="mood-quadrants" aria-label="Four quadrants of energy and pleasantness">
        {quadrants.map(q => (
          <section className={`mood-quadrant mood-${q.color}`} key={q.color} aria-labelledby={`${id}-${q.color}`}>
            <h3 id={`${id}-${q.color}`}><span className="mood-color-dot" />{q.name}</h3>
            <p className="mood-quadrant-axis">{q.energy}<span>{q.pleasantness}</span></p>
            <div className="mood-feelings">
              {q.feelings.map(f => (
                <button
                  type="button"
                  key={f.name}
                  className={`mood-feeling ${isSelected(f.name) ? 'is-selected' : ''}`}
                  aria-pressed={isSelected(f.name)}
                  aria-describedby={descriptionId}
                  onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(f.name); }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  onClick={() => toggle(f.name)}
                >
                  {isSelected(f.name) && <Check className="mood-check" size={10} strokeWidth={2.2} />}
                  {f.name}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mood-bottom-axis" aria-hidden="true"><span>← Less pleasant</span><span>↓ Lower energy</span><span>More pleasant →</span></div>
      <div className="mood-meaning" id={descriptionId} role="status" aria-live="polite" aria-atomic="true">
        {activeName ? <><strong>{activeName}</strong><span>{active?.meaning ?? 'A feeling in your own words'}</span></> : <><strong>A word that fits, even a little.</strong><span>Hover, focus, or tap a feeling for a few words about it.</span></>}
      </div>
      <div className="mood-your-feelings">
        <p className="mood-small-label">{value.length ? 'IN YOUR NOTE' : 'YOUR FEELINGS CAN BE MIXED'}</p>
        {value.length > 0 && <div className="mood-selected-list">{value.map(name => <button type="button" key={name} className="mood-selected-tag" aria-label={`Remove ${name}`} onClick={() => { onChange(value.filter(v => v !== name)); setMessage(''); }}><span>{name}</span><X size={12} /></button>)}</div>}
      </div>
      <label className="mood-custom-label" htmlFor={`${id}-custom`}>Or add your own feeling</label>
      <div className="mood-custom-row">
        <input id={`${id}-custom`} type="text" placeholder="A word that feels like you…" maxLength={40} value={custom} onChange={e => { setCustom(e.target.value); setMessage(''); }} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); addCustom(); } }} aria-describedby={`${id}-custom-hint`} />
        <button type="button" className="secondary" disabled={!custom.trim()} onClick={addCustom}><Plus size={14} />Add</button>
      </div>
      <p className="mood-custom-hint" id={`${id}-custom-hint`}>Add your word here, then save it with your note.</p>
      {message && <p className="mood-message" role="status">{message}</p>}
      <a className="mood-source" href="https://www.rulerapproach.org/wp-content/uploads/2023/03/Mood-Meter-Tip-Sheet.pdf" target="_blank" rel="noopener noreferrer">Four-quadrant layout inspired by the Mood Meter ↗</a>
    </fieldset>
  );
}
