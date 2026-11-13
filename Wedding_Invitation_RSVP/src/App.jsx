import React from 'react';

// PERSONALIZE your wedding below.
// To receive RSVP notification emails, replace PASTE_YOUR_FORMSPREE_ID in RSVP_FORM_ID
// with the form ID from https://formspree.io (example: 'xyzwabcd').
// IMPORTANT: Until a real form ID is configured, no email will be sent.
const RSVP_FORM_ID = 'myewkeqo';
const RSVP_READY = /^[a-z0-9]{6,20}$/i.test(RSVP_FORM_ID);
const RSVP_ENDPOINT = `https://formspree.io/f/${RSVP_FORM_ID}`;

// Personalize the WEDDING object below. All interaction is implemented in React.
const WEDDING = {
  nameOne: 'Sahil',
  nameTwo: 'Afreen',
  dateLong: '25 November 2026',
  dateShort: '25 · 11 · 2026',
  day: 'Wednesday',
  time: '7:00 PM onwards',
  venue: 'Sai Garden',
  address: 'Ganga Darshan Colony, Saket Puri Colony / Sabri Nai Dasami, Mirzapur, Uttar Pradesh 231001, India',
  respondBy: '23 November 2026',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sai%20Garden%2C%20Ganga%20Darshan%20Colony%2C%20Saket%20Puri%20Colony%20%2F%20Sabri%20Nai%20Dasami%2C%20Mirzapur%2C%20Uttar%20Pradesh%20231001%2C%20India',
};

const PAGES = [
  { id: 'envelope', label: 'Open', duration: 9000 },
  { id: 'couple', label: 'Our story', duration: 7800 },
  { id: 'ceremony', label: 'The wedding', duration: 9000 },
  { id: 'rsvp', label: 'RSVP', duration: 11500 },
  { id: 'venue', label: 'Venue', duration: 10000 },
  { id: 'thanks', label: 'Thank you', duration: 11000 },
];

function Icon({ name, size = 20 }) {
  const attrs = { width: size, height: size, viewBox: '0 0 24 24', stroke: 'currentColor', fill: 'none', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  switch (name) {
    case 'arrow': return <svg {...attrs}><path d="M12 4v16m0 0 6-6m-6 6-6-6" /></svg>;
    case 'up': return <svg {...attrs}><path d="m6 15 6-6 6 6" /></svg>;
    case 'down': return <svg {...attrs}><path d="m6 9 6 6 6-6" /></svg>;
    case 'play': return <svg {...attrs}><path d="m9 5 11 7-11 7V5Z" fill="currentColor" stroke="none" /></svg>;
    case 'pause': return <svg {...attrs}><path d="M8 5v14m8-14v14" strokeWidth="3" /></svg>;
    case 'calendar': return <svg {...attrs}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></svg>;
    case 'clock': return <svg {...attrs}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'pin': return <svg {...attrs}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'check': return <svg {...attrs}><path d="m5 12 5 5L20 7"/></svg>;
    case 'cross': return <svg {...attrs}><path d="M6 6 18 18M18 6 6 18"/></svg>;
    case 'map': return <svg {...attrs}><path d="m3 5 6-2 6 3 6-3v16l-6 2-6-3-6 3zM9 3v15m6-12v15"/></svg>;
    case 'share': return <svg {...attrs}><path d="M12 16V3m0 0L7 8m5-5 5 5"/><path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>;
    case 'replay': return <svg {...attrs}><path d="M3 12a9 9 0 1 0 3-7M3 4v6h6"/></svg>;
    default: return null;
  }
}

function Ornament({ short = false }) {
  return <div className={`ornament ${short ? 'ornament-short' : ''}`} aria-hidden="true"><span /><i>✦</i><span /></div>;
}

function Heading({ children }) {
  return <p className="arabic" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ{children}</p>;
}

function Botanical({ side }) {
  return <div className={`botanical botanical-${side}`} aria-hidden="true" />;
}

function HeartDivider() {
  return <div className="heart-divider" aria-hidden="true"><i /><span>♥</span><i /></div>;
}

function MapDrawing() {
  return (
    <div className="map-art" aria-hidden="true">
      <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#f5ead8" strokeWidth="13" opacity=".82">
          <path d="M-20 66 150 112 286 12 502 88M-15 206 158 146 330 264 505 190M99-15 170 264M300-20 344 265M-20 18 513 225"/>
        </g>
        <g fill="none" stroke="#bc9f76" strokeWidth="1.4" strokeDasharray="4 9" opacity=".65">
          <path d="M-20 66 150 112 286 12 502 88M-15 206 158 146 330 264 505 190M99-15 170 264M300-20 344 265"/>
        </g>
        <g fill="#ba9e76" opacity=".65"><circle cx="75" cy="38" r="4"/><circle cx="360" cy="72" r="4"/><circle cx="407" cy="224" r="5"/><circle cx="62" cy="193" r="4"/></g>
      </svg>
      <div className="map-pin"><Icon name="pin" size={48} /></div>
    </div>
  );
}

function getSavedRsvp() {
  try {
    const saved = JSON.parse(localStorage.getItem('wedding-rsvp-confirmed-v2') || 'null');
    return saved && saved.sent ? saved : null;
  } catch { return null; }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    const savedRsvp = getSavedRsvp();
    this.state = {
      page: 0, opened: false, opening: false, auto: true, progress: 0,
      guestName: savedRsvp?.name || '',
      response: savedRsvp?.attendance || '',
      guestCount: savedRsvp?.guests || '1',
      message: '',
      sending: false,
      rsvpSent: Boolean(savedRsvp),
      rsvpError: '',
      notice: '',
    };
    this.currentPage = 0;
    this.opened = false;
    this.opening = false;
    this.lockUntil = 0;
    this.wheelTotal = 0;
    this.gesture = null;
    this.autoFrame = null;
    this.autoStart = 0;
    this.autoElapsed = 0;
    this.lastUpdate = 0;
    this.wheelReset = null;
    this.openTimer = null;
    this.noticeTimer = null;
    this.openEnvelope = this.openEnvelope.bind(this);
    this.navigate = this.navigate.bind(this);
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
    this.restart = this.restart.bind(this);
    this.share = this.share.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onKey = this.onKey.bind(this);
    this.onPointerStart = this.onPointerStart.bind(this);
    this.onPointerEnd = this.onPointerEnd.bind(this);
    this.submitRsvp = this.submitRsvp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('wheel', this.onWheel, {passive: false});
    window.addEventListener('keydown', this.onKey);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.auto !== this.state.auto ||
        prevState.opened !== this.state.opened ||
        prevState.opening !== this.state.opening) this.startAutoClock();
  }
  componentWillUnmount() {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKey);
    window.clearTimeout(this.wheelReset);
    window.clearTimeout(this.openTimer);
    window.clearTimeout(this.noticeTimer);
    cancelAnimationFrame(this.autoFrame);
  }

  notify(message) {
    this.setState({ notice: message });
    clearTimeout(this.noticeTimer);
    this.noticeTimer = setTimeout(() => this.setState({ notice: '' }), 3200);
  }

  openEnvelope() {
    if (this.opened || this.opening) return;
    this.opening = true;
    this.lockUntil = Date.now() + 2100;
    this.setState({ opening: true, progress: 0 });
    clearTimeout(this.openTimer);
    this.openTimer = setTimeout(() => {
      this.opened = true;
      this.opening = false;
      this.currentPage = 1;
      this.lockUntil = Date.now() + 500;
      this.setState({ opened: true, opening: false, page: 1, progress: 0 });
    }, 1950);
  }

  navigate(next, override = false) {
    if (!this.opened) { this.openEnvelope(); return; }
    if (this.opening || (!override && Date.now() < this.lockUntil)) return;
    const target = Math.min(PAGES.length - 1, Math.max(1, next));
    if (target === this.currentPage) return;
    this.currentPage = target;
    this.lockUntil = Date.now() + 820;
    this.setState({ page: target, progress: 0 });
  }
  forward() {
    if (!this.opened) { this.openEnvelope(); return; }
    if (this.currentPage < PAGES.length - 1) this.navigate(this.currentPage + 1);
  }
  back() {
    if (this.opened) this.navigate(Math.max(1, this.currentPage - 1));
  }
  restart() {
    clearTimeout(this.openTimer);
    this.opened = false;
    this.opening = false;
    this.currentPage = 0;
    this.lockUntil = 0;
    this.setState({ opened: false, opening: false, page: 0, progress: 0 });
  }
  selectResponse(choice) {
    this.setState({ response: choice, rsvpSent: false, rsvpError: '' });
  }

  async submitRsvp(event) {
    event.preventDefault();
    if (this.state.sending) return;
    const name = this.state.guestName.trim();
    const attendance = this.state.response;
    if (name.length < 2 || !['yes', 'no'].includes(attendance)) {
      this.setState({ rsvpError: 'Enter your name and choose Yes or No.' });
      return;
    }
    if (!RSVP_READY) {
      this.setState({ rsvpError: 'Email delivery is not connected yet. The invitation owner must add the Formspree form ID in App.jsx.' });
      return;
    }
    this.setState({ sending: true, rsvpError: '' });
    try {
      const count = attendance === 'yes' ? Math.min(20, Math.max(1, Number(this.state.guestCount) || 1)) : 0;
      const payload = {
        name,
        attendance: attendance === 'yes' ? 'YES — attending' : 'NO — cannot attend',
        guests: count,
        note: this.state.message.trim() || '(none)',
        wedding: `${WEDDING.nameOne} & ${WEDDING.nameTwo}`,
        venue: `${WEDDING.venue}, Mirzapur`,
        submitted_at: new Date().toISOString(),
        _subject: `New wedding RSVP from ${name}: ${attendance === 'yes' ? 'Attending' : 'Not attending'}`,
      };
      const result = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      let data = {};
      try { data = await result.json(); } catch (_) { /* server sometimes returns no JSON */ }
      if (!result.ok || data.ok === false) {
        const detail = Array.isArray(data.errors) ? data.errors.map(x => x.message).join(' ') : '';
        throw new Error(detail || 'The response could not be sent. Please retry.');
      }
      try {
        localStorage.setItem('wedding-rsvp-confirmed-v2', JSON.stringify({ name, attendance, guests: String(count), sent: true }));
      } catch (_) { /* storage not essential */ }
      this.setState({ sending: false, rsvpSent: true, rsvpError: '' });
      this.notify('RSVP submitted successfully! Thank you.');
    } catch (error) {
      this.setState({ sending: false, rsvpError: error?.message || 'Network error. Please check internet and try again.' });
    }
  }
  async share() {
    try {
      if (navigator.share) {
        await navigator.share({title:'Sahil & Afreen — Wedding Invitation', text:'You are invited!', url:location.href});
      } else if (navigator.clipboard && location.protocol !== 'file:') {
        await navigator.clipboard.writeText(location.href);
        this.notify('Invitation link copied.');
      } else {
        this.notify('Once hosted online, you can share the invitation link.');
      }
    } catch (e) { if (e.name !== 'AbortError') this.notify('Share the link from your browser.'); }
  }
  onWheel(e) {
    // Allow the RSVP card to scroll on short screens instead of changing pages.
    const panel = e.target.closest?.('.rsvp-panel');
    if (panel && panel.scrollHeight > panel.clientHeight + 3) {
      const canScroll = e.deltaY > 0
        ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2
        : panel.scrollTop > 2;
      if (canScroll) return;
    }
    e.preventDefault();
    this.wheelTotal += e.deltaY;
    clearTimeout(this.wheelReset);
    this.wheelReset = setTimeout(() => { this.wheelTotal = 0; }, 200);
    if (Math.abs(this.wheelTotal) < 65) return;
    const dir = Math.sign(this.wheelTotal);
    this.wheelTotal = 0;
    if (dir > 0) this.forward(); else this.back();
  }
  onKey(e) {
    if (e.target && e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (['ArrowDown','PageDown',' ','ArrowUp','PageUp'].includes(e.key)) {
      e.preventDefault();
      if (['ArrowDown','PageDown',' '].includes(e.key)) this.forward(); else this.back();
    }
    if (e.key === 'Home') { e.preventDefault(); this.restart(); }
    if (e.key === 'End' && this.opened) { e.preventDefault(); this.navigate(PAGES.length - 1); }
  }
  onPointerStart(e) {
    if (e.target.closest && e.target.closest('button,a,input,textarea,select')) return;
    this.gesture = {x: e.clientX, y: e.clientY};
  }
  onPointerEnd(e) {
    if (!this.gesture) return;
    const dy = e.clientY - this.gesture.y;
    const dx = e.clientX - this.gesture.x;
    this.gesture = null;
    if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * 1.15) {
      if (dy < 0) this.forward(); else this.back();
    }
  }
  startAutoClock() {
    cancelAnimationFrame(this.autoFrame);
    const { auto, opened, opening, page } = this.state;
    // Never auto-advance while guests are filling the RSVP form.
    if (!auto || !opened || opening || page === 3 || page === PAGES.length - 1) return;
    const duration = PAGES[page]?.duration || 9000;
    this.autoStart = performance.now();
    this.autoElapsed = 0;
    this.lastUpdate = 0;
    const step = (time) => {
      if (!document.hidden) this.autoElapsed += Math.min(time - this.autoStart, 80);
      this.autoStart = time;
      if (time - this.lastUpdate > 110) {
        this.lastUpdate = time;
        this.setState({progress: Math.min(100, this.autoElapsed / duration * 100)});
      }
      if (this.autoElapsed >= duration) {
        this.navigate(page + 1, true);
      } else this.autoFrame = requestAnimationFrame(step);
    };
    this.autoFrame = requestAnimationFrame(step);
  }

  render() {
    const {page, opened, opening, auto, progress, response, notice,
      guestName, guestCount, message, sending, rsvpSent, rsvpError} = this.state;
    const {openEnvelope, navigate, forward, back, restart, share} = this;
    const selectResponse = (value) => this.selectResponse(value);
    return (
    <div className="website" onPointerDown={this.onPointerStart} onPointerUp={this.onPointerEnd} onPointerCancel={() => { this.gesture = null; }}>
      <div className="grain" aria-hidden="true" />
      <header className="site-bar">
        <button className="brand" type="button" onClick={restart} aria-label="Go back to start"><span>S <em>&</em> A</span><small>THE WEDDING</small></button>
        <span className="site-bar-center">A CELEBRATION OF LOVE <b>✦</b> {WEDDING.dateShort}</span>
        <button className="share-button" onClick={share} type="button"><Icon name="share" size={16} /><span>Share invitation</span></button>
      </header>

      <main className="scene-deck" aria-label="Interactive wedding invitation">
        {PAGES.map((item, index) => {
          const active = page === index;
          return (
            <section
              key={item.id}
              className={`scene scene-${item.id} ${active ? 'scene-active' : index < page ? 'scene-above' : 'scene-below'} ${index === 0 && opening ? 'opening' : ''}`}
              aria-label={item.label}
              aria-hidden={!active}
              inert={!active}
            >
              <Botanical side="left" />
              <Botanical side="right" />
              {index === 0 && <div className="cover-content">
                <div className="cover-heading reveal"><Heading /><Ornament /><p className="pretitle">A SPECIAL INVITATION FOR YOU</p></div>
                <button className={`envelope ${opening ? 'envelope-open' : ''}`} type="button" onClick={openEnvelope} disabled={opening} aria-label="Open the wedding invitation">
                  <div className="env-shadow" />
                  <div className="env-back" />
                  <div className="env-letter"><span className="env-letter-glyph">✧</span><span className="env-letter-name">{WEDDING.nameOne} <em>&</em> {WEDDING.nameTwo}</span><span className="env-letter-date">{WEDDING.dateShort}</span></div>
                  <div className="env-left" /><div className="env-right" /><div className="env-bottom" />
                  <div className="env-flap" />
                  <div className="env-seal">✾</div>
                </button>
                <div className="open-invite reveal"><button type="button" onClick={openEnvelope} disabled={opening}>{opening ? 'OPENING YOUR INVITATION…' : 'TAP THE ENVELOPE TO OPEN'}</button><Ornament short /></div>
              </div>}

              {index === 1 && <div className="names-composition content-appear">
                <p className="super-title">THE WEDDING CELEBRATION OF</p>
                <div className="name-paper">
                  <span className="paper-corner tl"/><span className="paper-corner tr"/><span className="paper-corner bl"/><span className="paper-corner br"/>
                  <Heading /><Ornament short />
                  <p className="small-overline">TOGETHER WITH THEIR FAMILIES</p>
                  <h1><span>{WEDDING.nameOne}</span><small>&</small><span>{WEDDING.nameTwo}</span></h1>
                  <HeartDivider />
                  <p className="names-message">joyfully invite you to celebrate their wedding</p>
                  <p className="names-date">{WEDDING.dateShort}</p>
                  <p className="names-caption">We’re getting married!</p>
                </div>
              </div>}

              {index === 2 && <div className="ceremony-composition content-appear">
                <div className="ceremony-arch">
                  <div className="arch-inside">
                    <Heading /><p className="small-overline">TOGETHER WITH OUR FAMILIES</p>
                    <h2>You're invited<br /><em>to our wedding</em></h2>
                    <HeartDivider />
                    <div className="event-items">
                      <div className="event-item"><Icon name="calendar" size={25}/><p><strong>{WEDDING.dateLong}</strong><span>{WEDDING.day}</span></p></div>
                      <div className="event-item"><Icon name="clock" size={25}/><p><strong>{WEDDING.time}</strong><span>Come celebrate with us</span></p></div>
                      <div className="event-item"><Icon name="pin" size={25}/><p><strong>{WEDDING.venue}</strong><span>Mirzapur, Uttar Pradesh</span></p></div>
                    </div>
                  </div>
                </div>
              </div>}

              {index === 3 && <div className="rsvp-composition content-appear">
                <div className="rsvp-panel">
                  <Heading /><Ornament short />
                  <p className="small-overline">YOUR PRESENCE IS A GIFT</p>
                  <h2>Kindly<br /><em>Respond</em></h2>
                  <HeartDivider />
                  <p className="rsvp-lede">We would love to celebrate this beautiful moment with you.</p>
                  <form className="rsvp-form" onSubmit={this.submitRsvp}>
                    <label className="rsvp-field-label" htmlFor="rsvp-name">YOUR NAME</label>
                    <input id="rsvp-name" className="rsvp-name" type="text" autoComplete="name" maxLength={90} value={guestName} placeholder="Your full name" required minLength={2} disabled={sending} onChange={e => this.setState({guestName:e.target.value, rsvpSent:false, rsvpError:''})} />
                    <div className="rsvp-buttons" role="group" aria-label="Will you attend the wedding?">
                      <button type="button" disabled={sending} className={`rsvp-choice ${response === 'yes' ? 'chosen' : ''}`} aria-pressed={response === 'yes'} onClick={() => selectResponse('yes')}><span>Yes, I'll be there</span><span className="choice-icon"><Icon name="check" size={20}/></span></button>
                      <button type="button" disabled={sending} className={`rsvp-choice ${response === 'no' ? 'chosen' : ''}`} aria-pressed={response === 'no'} onClick={() => selectResponse('no')}><span>Sadly, can't make it</span><span className="choice-icon"><Icon name="cross" size={18}/></span></button>
                    </div>
                    {response === 'yes' && <label className="rsvp-count-row" htmlFor="rsvp-guests"><span>Number of people attending</span><select id="rsvp-guests" disabled={sending} value={guestCount} onChange={e => this.setState({guestCount:e.target.value, rsvpSent:false})}>{Array.from({length:20},(_,i)=><option key={i+1} value={String(i+1)}>{i+1}</option>)}</select></label>}
                    <label className="rsvp-field-label rsvp-note-label" htmlFor="rsvp-note">MESSAGE (OPTIONAL)</label>
                    <input id="rsvp-note" className="rsvp-name" type="text" placeholder="A wish for the couple" maxLength={200} disabled={sending} value={message} onChange={e => this.setState({message:e.target.value, rsvpSent:false})} />
                    {rsvpError && <p className="rsvp-error" role="alert">{rsvpError}</p>}
                    {rsvpSent ? <p className="response-confirm" role="status"><Icon name="check" size={18}/> RSVP sent — thank you! <button type="button" onClick={() => this.setState({rsvpSent:false})}>Update response</button></p> : <button type="submit" className="rsvp-submit" disabled={sending || !response}>{sending ? 'SENDING YOUR RSVP…' : 'SEND RSVP'}</button>}
                    <p className="rsvp-disclosure">Your reply is shared with the wedding host.</p>
                  </form>
                  <p className="respond-by">PLEASE RESPOND BY <strong>{WEDDING.respondBy}</strong></p>
                </div>
              </div>}

              {index === 4 && <div className="venue-composition content-appear">
                <div className="venue-panel">
                  <Heading /><p className="small-overline">WHERE WE SAY I DO</p>
                  <h2>Our <em>Venue</em></h2><HeartDivider />
                  <MapDrawing />
                  <h3>{WEDDING.venue}</h3><p className="venue-address">{WEDDING.address}</p>
                  <a className="map-link" href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="map" size={20}/> Open in Maps</a>
                </div>
              </div>}

              {index === 5 && <div className="thanks-composition content-appear">
                <div className="thanks-arch">
                  <span className="crescent" aria-hidden="true">☾</span>
                  <h2>Jazakumullahu<br /><em>Khair</em></h2>
                  <HeartDivider />
                  <p>Thank you for your love,<br />duas and blessings.</p>
                  <p>We can’t wait to celebrate<br />this beautiful day with you.</p>
                  <p>May Allah bless you always.</p>
                  <span className="with-love">With love,</span><strong>{WEDDING.nameOne} & {WEDDING.nameTwo}</strong>
                  <button type="button" className="replay-btn" onClick={restart}><Icon name="replay" size={17} /> Replay invitation</button>
                </div>
              </div>}
            </section>
          );
        })}
      </main>

      <div className="scene-ui" aria-label="Invitation controls">
        <div className="scene-indicator"><span>{String(page + 1).padStart(2, '0')}</span><div className="indicator-line" /><span>{String(PAGES.length).padStart(2, '0')}</span></div>
        <nav className="page-dots" aria-label="Go to a wedding invitation section">{PAGES.map((item, index) => <button key={item.id} type="button" className={index === page ? 'dot-active' : ''} onClick={() => index === 0 ? restart() : navigate(index)} title={item.label} aria-label={`Go to ${item.label}`} aria-current={index === page ? 'step' : undefined}><i /></button>)}</nav>
        <div className="nav-buttons"><button type="button" onClick={back} aria-label="Previous section" disabled={!opened || page <= 1}><Icon name="up" /></button><button type="button" onClick={forward} aria-label="Next section"><Icon name="down" /></button></div>
      </div>
      <footer className="bottom-bar">
        <div className="swipe-tip"><Icon name="arrow" size={16}/><span>{!opened ? 'OPEN TO BEGIN' : 'SWIPE OR SCROLL TO EXPLORE'}</span></div>
        <div className="playback"><button type="button" className="autoplay" onClick={() => this.setState(({auto}) => ({ auto: !auto, progress: 0 }))} aria-pressed={auto} title={auto ? 'Pause auto scroll' : 'Enable auto scroll'}><Icon name={auto ? 'pause' : 'play'} size={16}/><span>{auto && page === 3 ? 'AUTO PAUSED FOR RSVP' : auto ? 'AUTO SCROLL ON' : 'AUTO SCROLL OFF'}</span></button></div>
      </footer>
      {opened && auto && page !== 3 && <div className="playback-progress" role="progressbar" aria-label="Time remaining on section" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{ width: `${progress}%` }} /></div>}
      {notice && <div className="notice" role="status">{notice}</div>}


    </div>
    );
  }
}
export default App;
