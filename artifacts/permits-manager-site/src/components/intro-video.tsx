import { useEffect, useRef, useState } from 'react';
import { Play, AlertCircle, RotateCcw } from 'lucide-react';
import { trackHeroEvent } from '@/lib/hero-analytics';

const base = import.meta.env.BASE_URL;
const SRC = `${base}intro-video/pm-introduction.mp4`;
const WEBM = `${base}intro-video/pm-introduction.webm`;
const POSTER = `${base}intro-video/pm-introduction-poster.webp`;
const CAPTIONS = `${base}intro-video/pm-introduction.en.vtt`;

type Status = 'poster' | 'active' | 'error';

export function IntroVideo() {
  const [status, setStatus] = useState<Status>('poster');
  const [errMsg, setErrMsg] = useState('');
  const ref = useRef<HTMLVideoElement>(null);
  const sent = useRef({ start: false, half: false, complete: false });
  const wantPlay = useRef(false);

  const tryPlay = () => {
    const v = ref.current;
    if (!v) return;
    v.focus();
    const p = v.play();
    if (p) p.catch((e: unknown) => {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      setErrMsg('Playback was blocked by your browser. Use the button to try again, or press play on the video controls.');
      setStatus('error');
    });
  };

  useEffect(() => {
    if (status === 'active' && wantPlay.current) { wantPlay.current = false; tryPlay(); }
  }, [status]);

  const start = () => {
    setErrMsg('');
    if (status === 'error' && ref.current) {
      ref.current.load();
      setStatus('active');
      wantPlay.current = true;
      return;
    }
    wantPlay.current = true;
    setStatus('active');
  };

  return (
    <figure className="m-0" data-testid="hero-intro-video">
      <div className="relative aspect-video w-full overflow-hidden border-2 border-foreground bg-[hsl(236_55%_10%)] shadow-[8px_8px_0_0_hsl(var(--primary))]">
        {status !== 'poster' && (
          <video ref={ref} className="absolute inset-0 h-full w-full object-contain" controls playsInline preload="none" poster={POSTER}
            aria-label="Permits Manager introduction video" data-testid="video-intro"
            onPlaying={() => { if (!sent.current.start) { sent.current.start = true; trackHeroEvent('hero_video_start'); } }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              // Native played ranges exclude skipped sections and merge replayed ranges.
              let watched = 0;
              for (let i = 0; i < v.played.length; i++) watched += v.played.end(i) - v.played.start(i);
              if (!sent.current.half && v.duration > 0 && isFinite(v.duration) && watched / v.duration >= 0.5) { sent.current.half = true; trackHeroEvent('hero_video_half'); }
            }}
            onEnded={() => { if (!sent.current.complete) { sent.current.complete = true; trackHeroEvent('hero_video_complete'); } }}
            onError={() => { setErrMsg('The video could not be loaded. Check your connection and try again.'); setStatus('error'); }}>
            <source src={WEBM} type="video/webm" />
            <source src={SRC} type="video/mp4" />
            <track kind="captions" src={CAPTIONS} srcLang="en" label="English" default />
          </video>
        )}
        {status === 'poster' && (
          <button type="button" onClick={start} aria-label="Play Permits Manager introduction" data-testid="button-play-intro"
            className="group absolute inset-0 h-full w-full text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-6px] focus-visible:outline-[hsl(200_88%_62%)]">
            <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-contain" decoding="async" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-[hsl(236_55%_10%/0.82)] via-[hsl(236_55%_10%/0.25)] to-transparent" />
            <span aria-hidden className="absolute left-4 top-4 md:left-6 md:top-6 font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-[hsl(200_88%_62%)]">Introduction</span>
            <span aria-hidden className="absolute left-4 bottom-4 md:left-6 md:bottom-6 max-w-[55%] font-display text-2xl md:text-4xl font-extrabold leading-[1] text-background">Where’s the permit?</span>
            <span aria-hidden className="absolute right-4 bottom-4 md:right-6 md:bottom-6 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 md:h-8 md:w-8 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      {status === 'error' && (
        <div role="alert" className="mt-3 flex items-start gap-3 border-2 border-destructive bg-card p-3 text-sm" data-testid="status-video-error">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
          <p className="flex-1">{errMsg}</p>
          <button type="button" onClick={start} className="inline-flex items-center gap-1 font-semibold underline" data-testid="button-retry-intro"><RotateCcw className="h-4 w-4" aria-hidden />Retry</button>
        </div>
      )}
    </figure>
  );
}
