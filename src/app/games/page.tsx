import Link from "next/link";

// Box art color schemes for each game
const gameColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  // PC-98 Era - CRT/FM synthesis aesthetic
  "TH01": { bg: "#1a1a2e", border: "#4a4a8a", text: "#e0e0ff", accent: "#8888cc" },
  "TH02": { bg: "#1e1e2f", border: "#5a3a7a", text: "#e8e0ff", accent: "#9966bb" },
  "TH03": { bg: "#2a1a2a", border: "#8a3a5a", text: "#ffe0f0", accent: "#cc6699" },
  "TH04": { bg: "#2a1a1e", border: "#8a4a5a", text: "#ffe0e8", accent: "#cc6677" },
  "TH05": { bg: "#1a1a2e", border: "#5a5a9a", text: "#e8e8ff", accent: "#9999dd" },
  // Early Windows Era
  "TH06": { bg: "#2a1a1a", border: "#8a2a2a", text: "#ffe8e8", accent: "#cc4444" }, // Scarlet
  "TH07": { bg: "#2a1a2a", border: "#cc99bb", text: "#fff0f8", accent: "#ffaacc" }, // Cherry blossom pink
  "TH08": { bg: "#1a1a2e", border: "#4a4a9a", text: "#e8e8ff", accent: "#6666cc" }, // Night blue
  "TH09": { bg: "#1a2a1a", border: "#6a9a6a", text: "#f0ffe8", accent: "#88cc88" }, // Flower green
  // Mid Windows Era
  "TH10": { bg: "#2e2a1a", border: "#cc8844", text: "#fff8e8", accent: "#ffaa66" }, // Autumn orange
  "TH11": { bg: "#1a0a0a", border: "#8a2a1a", text: "#ffe8e0", accent: "#cc4433" }, // Hell red/black
  "TH12": { bg: "#e8f4ff", border: "#66aadd", text: "#1a3a4a", accent: "#4499cc" }, // Spring sky blue
  "TH13": { bg: "#2a1a3a", border: "#7a5a9a", text: "#f0e8ff", accent: "#aa88cc" }, // Spirit purple
  "TH14": { bg: "#2a1a1a", border: "#aa4a4a", text: "#ffe8e8", accent: "#cc6666" }, // Traditional red
  // Late Windows Era
  "TH15": { bg: "#1a1a3a", border: "#6a4a9a", text: "#f0e8ff", accent: "#8866cc" }, // Lunar purple
  "TH16": { bg: "#1a3a2a", border: "#4a9a7a", text: "#e8fff0", accent: "#66cc99" }, // Four seasons green
  "TH17": { bg: "#3a2a1a", border: "#cc7744", text: "#fff0e8", accent: "#ff9966" }, // Beast orange
  "TH18": { bg: "#2e2a1e", border: "#aa8855", text: "#fff8f0", accent: "#ccaa77" }, // Market warm
  "TH19": { bg: "#2a2a3a", border: "#8a8aaa", text: "#f8f8ff", accent: "#aaaacc" }, // Ghost ethereal
  "TH20": { bg: "#1a1a1a", border: "#888888", text: "#f0f0f0", accent: "#aaaaaa" }, // Unknown/TBD
};

// Per-game audio stats from analysis
const gameStats: Record<string, { tempo: number; brightness: number; energy: number; onset: number; tracks: number }> = {
  "TH01": { tempo: 135.4, brightness: 2642, energy: 0.1225, onset: 5.91, tracks: 15 },
  "TH02": { tempo: 149.6, brightness: 2361, energy: 0.1880, onset: 5.55, tracks: 18 },
  "TH03": { tempo: 138.1, brightness: 2706, energy: 0.1796, onset: 5.54, tracks: 24 },
  "TH04": { tempo: 132.1, brightness: 2453, energy: 0.1493, onset: 5.37, tracks: 23 },
  "TH05": { tempo: 134.2, brightness: 2568, energy: 0.1790, onset: 5.72, tracks: 23 },
  "TH06": { tempo: 142.4, brightness: 2781, energy: 0.2008, onset: 3.75, tracks: 17 },
  "TH07": { tempo: 135.7, brightness: 2742, energy: 0.2346, onset: 3.45, tracks: 20 },
  "TH08": { tempo: 148.2, brightness: 2535, energy: 0.1750, onset: 3.67, tracks: 21 },
  "TH09": { tempo: 138.4, brightness: 2224, energy: 0.1795, onset: 3.36, tracks: 19 },
  "TH10": { tempo: 131.7, brightness: 2345, energy: 0.1962, onset: 3.09, tracks: 18 },
  "TH11": { tempo: 133.9, brightness: 2104, energy: 0.2146, onset: 3.31, tracks: 18 },
  "TH12": { tempo: 128.1, brightness: 2228, energy: 0.2079, onset: 2.77, tracks: 18 },
  "TH13": { tempo: 120.7, brightness: 2277, energy: 0.2083, onset: 4.47, tracks: 31 },
  "TH14": { tempo: 129.5, brightness: 2594, energy: 0.1908, onset: 2.88, tracks: 18 },
  "TH15": { tempo: 112.6, brightness: 2632, energy: 0.1834, onset: 2.87, tracks: 18 },
  "TH16": { tempo: 118.9, brightness: 2593, energy: 0.1690, onset: 2.64, tracks: 18 },
  "TH17": { tempo: 126.0, brightness: 2371, energy: 0.2039, onset: 3.17, tracks: 18 },
  "TH18": { tempo: 127.3, brightness: 2375, energy: 0.1845, onset: 4.28, tracks: 18 },
  "TH19": { tempo: 124.9, brightness: 2606, energy: 0.1515, onset: 3.01, tracks: 24 },
  "TH20": { tempo: 0, brightness: 0, energy: 0, onset: 0, tracks: 0 }, // TBD
};

interface GameEntry {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  played: "yes" | "partial" | "no" | "emulated";
  cleared: string;
  rank?: number;
  commentary: string;
  dataInsight?: string;
  standoutTracks?: string[];
}

const games: GameEntry[] = [
  // PC-98 Era
  {
    id: "TH01",
    title: "Highly Responsive to Prayers",
    subtitle: "The Arkanoid one",
    year: 1996,
    played: "no",
    cleared: "Not played",
    commentary: "The origin point. A breakout-style game that doesn't play like the rest of the series, but you can already hear ZUN's compositional voice forming. The PC-98 FM synthesis gives everything this raw, crunchy energy.",
    dataInsight: "Highest onset rate in the series at 5.91 notes/sec. The FM chip was working overtime.",
  },
  {
    id: "TH02",
    title: "Story of Eastern Wonderland",
    subtitle: "First true shmup",
    year: 1997,
    played: "no",
    cleared: "Not played",
    commentary: "Where the danmaku formula begins. Marisa's debut. The music has this frantic, almost aggressive energy that the Windows games rarely match.",
    dataInsight: "Fastest average tempo in the entire series at 149.6 BPM. ZUN was in a hurry.",
  },
  {
    id: "TH03",
    title: "Phantasmagoria of Dim. Dream",
    subtitle: "First versus game",
    year: 1997,
    played: "no",
    cleared: "Not played",
    commentary: "The first experiment with versus mechanics. Interesting to see ZUN trying different formats this early.",
    dataInsight: "Brightest PC-98 soundtrack (2706 Hz centroid). The competitive energy shows in the timbre.",
  },
  {
    id: "TH04",
    title: "Lotus Land Story",
    subtitle: "Formula crystallizes",
    year: 1998,
    played: "no",
    cleared: "Not played",
    commentary: "The template for modern Touhou solidifies here. The music starts showing more melodic sophistication while keeping that FM crunch.",
    dataInsight: "Slightly lower onset rate (5.37/s) as ZUN gives tracks more room to breathe.",
  },
  {
    id: "TH05",
    title: "Mystic Square",
    subtitle: "PC-98 peak",
    year: 1998,
    played: "emulated",
    cleared: "Emulated, partial",
    commentary: "The PC-98 era finale and arguably its peak. Would love to track down an actual PC-98 in Japan someday to experience the authentic FM synthesis. The hardware limitation became an aesthetic.",
    dataInsight: "Second-highest onset rate (5.72/s) and solid brightness.ZUN pushing the hardware to its limits.",
    standoutTracks: ["Romantic Children", "The Grimoire of Alice (Judas Kiss)", "Alice in Wonderland"],
  },
  // Early Windows Era
  {
    id: "TH06",
    title: "Embodiment of Scarlet Devil",
    subtitle: "The Western gateway",
    year: 2002,
    played: "yes",
    cleared: "1cc'd Normal",
    rank: 3,
    commentary: "My first Touhou and first 1cc. The game that hooked me and countless others. Iconic OST, iconic characters, iconic stages. It's slightly older than me which feels surreal. This game has been shaping internet culture since before I could read.",
    dataInsight: "Third-highest tempo (142.4 BPM) and brightest Windows-era soundtrack (2781 Hz). The gothic energy is measurable.",
    standoutTracks: ["Septette for the Dead Princess", "U.N. Owen Was Her?", "Flowering Night"],
  },
  {
    id: "TH07",
    title: "Perfect Cherry Blossom",
    subtitle: "Peak cozy",
    year: 2003,
    played: "yes",
    cleared: "1cc'd",
    rank: 4,
    commentary: "The feeling of winter, the sakura petals, the melancholy. This is where ZUN's trumpets really shine. Every early Windows game has this cozy quality that's hard to describe, but PCB captures it best. The death/rebirth spring theme resonates.",
    dataInsight: "Highest RMS energy in the series (0.2346). The 'powerful' feeling isn't just vibes, it's measurably the loudest soundtrack.",
    standoutTracks: ["Border of Life", "Phantom Ensemble", "Bloom Nobly, Ink-Black Cherry Blossom"],
  },
  {
    id: "TH08",
    title: "Imperishable Night",
    subtitle: "THE GOAT",
    year: 2004,
    played: "yes",
    cleared: "Multiple 1cc's + Extra Boss",
    rank: 1,
    commentary: "The peak. Best replay value in the series. The intertwining of old and new characters, the urgency of the eternal night, the 'double dash' team mechanics. Everything about this game represents what Touhou does best. This is my desert island pick, no contest.",
    dataInsight: "Second-highest tempo (148.2 BPM) explains the urgency you feel. The night isn't ending, and the music won't let you forget it.",
    standoutTracks: ["Love-Colored Master Spark", "Reach for the Moon, Immortal Smoke", "Flight in the Bamboo Cutter"],
  },
  {
    id: "TH09",
    title: "Phantasmagoria of Flower View",
    subtitle: "The experimental one",
    year: 2005,
    played: "no",
    cleared: "Not played",
    commentary: "The black sheep with its versus system. Respect to ZUN for taking creative risks in the dusk of the early Windows era, even if it's not for everyone. Sometimes you need to experiment.",
    dataInsight: "Darkest early-Windows soundtrack (2224 Hz centroid). The flower viewing has an unexpectedly somber undertone.",
  },
  // Mid Windows Era
  {
    id: "TH10",
    title: "Mountain of Faith",
    subtitle: "The soft reboot",
    year: 2007,
    played: "yes",
    cleared: "1cc'd",
    commentary: "The soft reboot. Mountainous Shinto aesthetics, the feeling of autumn, the sense of ascending toward something divine. Clean mechanical reset after TH09. The return to focused single-player danmaku felt necessary.",
    dataInsight: "Lower tempo (131.7 BPM) and onset rate (3.09/s); the contemplative mountain climb is reflected in the pacing.",
    standoutTracks: ["Faith is for the Transient People", "Native Faith", "Fall of Fall"],
  },
  {
    id: "TH11",
    title: "Subterranean Animism",
    subtitle: "The descent",
    year: 2008,
    played: "yes",
    cleared: "No 1cc yet (working on it)",
    rank: 5,
    commentary: "The fanbase isn't joking: this is systemically the hardest game. But that motivates me to keep trying. Compositionally unique as you descend to the center of the earth. The journey to Blazing Hell has some of ZUN's best work.",
    dataInsight: "Darkest soundtrack in the entire series (2104 Hz centroid). The oppressive underground atmosphere isn't just theming; the spectral data proves it.",
    standoutTracks: ["Solar Sect of Mystic Wisdom ~ Nuclear Fusion", "Satori Maiden ~ 3rd Eye", "Hartmann's Youkai Girl"],
  },
  {
    id: "TH12",
    title: "Undefined Fantastic Object",
    subtitle: "My comfort game",
    year: 2009,
    played: "yes",
    cleared: "Working on 1cc",
    rank: 2,
    commentary: "Lowkey my personal favorite if you exclude IN. Might actually be as hard as SA with those UFO mechanics and aggressive spellcards. But the springtime music and bouncy feeling always motivates me. This is my go-to when I need uplifting energy.",
    dataInsight: "Third-darkest centroid (2228 Hz) despite the bright box art, an interesting contrast. The Buddhist temple theme adds depth beneath the cheerful surface.",
    standoutTracks: ["Emotional Skyscraper ~ Cosmic Mind", "Fires of Hokkai", "Sky Ruin"],
  },
  {
    id: "TH13",
    title: "Ten Desires",
    subtitle: "The painful one",
    year: 2011,
    played: "yes",
    cleared: "Struggled",
    commentary: "NGL, this is the most painful to play. Unorthodox staging, weird story pacing. The trance system feels half-baked. But Desire Drive carries HARD. That one track saves the entire soundtrack.",
    dataInsight: "Lowest tempo in the series (120.7 BPM) but high onset rate (4.47/s): restless energy at slow speed. The 'desire' feeling is this tension between urgency and languor.",
    standoutTracks: ["Desire Drive", "Spirit of Avarice"],
  },
  {
    id: "TH14",
    title: "Double Dealing Character",
    subtitle: "The IN rehash",
    year: 2013,
    played: "no",
    cleared: "Not played",
    commentary: "The IN rehash in staging and nostalgic callbacks are valid. Sometimes looking back is the right move. Tsukumogami (tool spirits) is a fun theme.",
    dataInsight: "Brighter centroid (2594 Hz) returns to early-Windows energy. The nostalgia isn't just narrative; the sonic palette recalls TH06-08.",
    standoutTracks: ["Reverse Ideology", "Magical Storm"],
  },
  // Late Windows Era
  {
    id: "TH15",
    title: "Legacy of Lunatic Kingdom",
    subtitle: "The brutal one",
    year: 2015,
    played: "partial",
    cleared: "Played a few hours",
    commentary: "Rough, but the clean art style, refined music, and Pointdevice mechanics really stand out. ZUN peaked in technical polish here. The lunatic vibes are immaculate; this game wants you to suffer beautifully.",
    dataInsight: "Second-lowest tempo (112.6 BPM). The slow, deliberate pacing matches the precision required. Every bullet matters.",
    standoutTracks: ["The Pierrot of the Star-Spangled Banner", "Pure Furies ~ Whereabouts of the Heart"],
  },
  {
    id: "TH16",
    title: "Hidden Star in Four Seasons",
    subtitle: "Cirno's return",
    year: 2017,
    played: "no",
    cleared: "Not played",
    commentary: "Cirno is in it. Seasonality is a cute aesthetic. That's all I need to know. The four-season gimmick seems fun.",
    dataInsight: "Lowest onset rate (2.64/s); the seasons change slowly, and so does the music.",
  },
  {
    id: "TH17",
    title: "Wily Beast and Weakest Creature",
    subtitle: "Animal hell",
    year: 2019,
    played: "yes",
    cleared: "Played through",
    commentary: "Bombastic and rabid OST.I love it. The new setting with animal spirits and lore expansion into beast hell really carried this one. Fresh energy in the late era.",
    dataInsight: "Lower brightness (2371 Hz) returns to mid-Windows darkness. The beast realm has weight.",
    standoutTracks: ["Joutounin of Ceramics", "Entrusting this World to Idols ~ Idolatrize World"],
  },
  {
    id: "TH18",
    title: "Unconnected Marketeers",
    subtitle: "Roguelike elements",
    year: 2021,
    played: "yes",
    cleared: "Played on release",
    commentary: "Really enjoyed this one. The roguelike card mechanics are great and add fresh replayability. Glad Sakuya makes a return as a playable character.",
    dataInsight: "High onset rate (4.28/s).second only to TD in the Windows era. The market bustle is audible.",
    standoutTracks: ["The Princess Who Slays Dragon Kings", "Smoking Dragon"],
  },
  {
    id: "TH19",
    title: "Unfinished Dream of All Living Ghost",
    subtitle: "Versus returns",
    year: 2023,
    played: "no",
    cleared: "Not played",
    commentary: "Card mechanics and roguelike emphasis continuing.appealing to modern gameplay sensibilities. Bringing back versus after TH09 is interesting. Some tracks stand out.",
    dataInsight: "Brighter centroid (2606 Hz) and low energy (0.1515 RMS).subdued but clear. The ghost theme manifests as clarity without power.",
  },
  {
    id: "TH20",
    title: "東方剛欲異聞",
    subtitle: "The milestone",
    year: 2025,
    played: "no",
    cleared: "Not played yet",
    commentary: "I need to add this to my analysis dataset. Sadly could be ZUN's last mainline game.reaching TH20 is a milestone few game series achieve. The hype felt dead on arrival which is bittersweet. Planning to play and form opinions soon.",
    dataInsight: "Data pending.need to extract and analyze.",
  },
];

export default function GamesPage() {
  return (
    <div className="page-wrapper">
      <header className="site-header">
        <h1>Personal Touhou Journey</h1>
        <p className="last-updated">Data-backed opinions on 20 years of danmaku</p>
      </header>

      <div className="marquee">
        <span>IN is the GOAT (148.2 BPM of urgency) ★ SA is the darkest (2104 Hz) ★ UFO is my comfort pick ★ PC-98 onset rates are unmatched ★</span>
      </div>

      <div className="main-container">
        <nav className="sidebar">
          <div className="nav-section">
            <h3>Navigation</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/explorer">Track Explorer</Link></li>
              <li><Link href="/classifier">Circle Classifier</Link></li>
              <li><Link href="/games" className="active">Game Opinions</Link></li>
            </ul>
          </div>
          <div className="nav-section" style={{ marginTop: "15px" }}>
            <h3>My Top 5</h3>
            <ul style={{ fontSize: "11px" }}>
              <li>1. TH08 (IN)</li>
              <li>2. TH12 (UFO)</li>
              <li>3. TH06 (EoSD)</li>
              <li>4. TH07 (PCB)</li>
              <li>5. TH11 (SA)</li>
            </ul>
          </div>
          <div className="nav-section" style={{ marginTop: "15px" }}>
            <h3>Jump to Era</h3>
            <ul style={{ fontSize: "11px" }}>
              <li><a href="#pc98">PC-98 (TH01-05)</a></li>
              <li><a href="#early">Early Win (TH06-09)</a></li>
              <li><a href="#mid">Mid Win (TH10-14)</a></li>
              <li><a href="#late">Late Win (TH15-20)</a></li>
            </ul>
          </div>
        </nav>

        <main className="content">
          <div className="content-box">
            <div className="content-box-header">♦ About This Page ♦</div>
            <div className="content-box-body" style={{ fontSize: "12px" }}>
              <p style={{ margin: 0 }}>
                Personal opinions on every mainline Touhou game, backed by data from my
                <Link href="/"> compositional analysis</Link>. Each game is color-coded by its box art palette.
                Audio metrics (tempo, brightness, onset rate) come from analyzing {games.reduce((sum, g) => sum + (gameStats[g.id]?.tracks || 0), 0)} tracks.
              </p>
              <p style={{ margin: "8px 0 0 0", color: "#666" }}>
                <strong>Brightness</strong> = spectral centroid (Hz). Lower = darker/heavier.
                <br />
                <strong>Onset rate</strong> = note events per second. Higher = busier/denser.
              </p>
            </div>
          </div>

          {/* Rankings */}
          <div className="content-box">
            <div className="content-box-header">♦ My Rankings ♦</div>
            <div className="content-box-body">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Game</th>
                    <th>Why It Hits</th>
                    <th>Key Stat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: "linear-gradient(90deg, #FFD700 0%, #FFF8DC 100%)" }}>
                    <td><strong>1st</strong></td>
                    <td>TH08 (IN)</td>
                    <td>Peak urgency, replay value, character interplay</td>
                    <td>148.2 BPM</td>
                  </tr>
                  <tr style={{ background: "linear-gradient(90deg, #C0C0C0 0%, #F5F5F5 100%)" }}>
                    <td><strong>2nd</strong></td>
                    <td>TH12 (UFO)</td>
                    <td>Comfort game, springtime energy despite difficulty</td>
                    <td>2228 Hz (dark)</td>
                  </tr>
                  <tr style={{ background: "linear-gradient(90deg, #CD7F32 0%, #FAEBD7 100%)" }}>
                    <td><strong>3rd</strong></td>
                    <td>TH06 (EoSD)</td>
                    <td>First 1cc, iconic everything, gateway drug</td>
                    <td>2781 Hz (bright)</td>
                  </tr>
                  <tr>
                    <td>4th</td>
                    <td>TH07 (PCB)</td>
                    <td>Cozy winter vibes, ZUN's trumpets peak here</td>
                    <td>0.235 RMS (loud)</td>
                  </tr>
                  <tr>
                    <td>5th</td>
                    <td>TH11 (SA)</td>
                    <td>Best OST, hardest game, the descent</td>
                    <td>2104 Hz (darkest)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PC-98 Era */}
          <div id="pc98" className="spellcard-header" style={{ marginTop: "20px" }}>
            PC-98 Era (1996-1998)
          </div>

          <div className="content-box" style={{ marginBottom: "10px" }}>
            <div className="content-box-body" style={{ fontSize: "11px", background: "#1a1a2e", color: "#e0e0ff", padding: "10px" }}>
              <strong>Era signature:</strong> FM synthesis crunch, highest onset rates in the series (5.37-5.91/s),
              raw energy that Windows games rarely match. The hardware limitation became the aesthetic.
            </div>
          </div>

          {games.filter(g => ["TH01", "TH02", "TH03", "TH04", "TH05"].includes(g.id)).map(game => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* Early Windows Era */}
          <div id="early" className="spellcard-header" style={{ marginTop: "20px" }}>
            Early Windows Era (2002-2005)
          </div>

          <div className="content-box" style={{ marginBottom: "10px" }}>
            <div className="content-box-body" style={{ fontSize: "11px", background: "#2a1a2a", color: "#ffe0f0", padding: "10px" }}>
              <strong>Era signature:</strong> The 'cozy' era. Highest brightness/energy readings.
              TH06-08 are the holy trinity: iconic characters, iconic music, peak Touhou cultural impact.
              Onset rates drop from PC-98 levels as compositions gain sophistication.
            </div>
          </div>

          {games.filter(g => ["TH06", "TH07", "TH08", "TH09"].includes(g.id)).map(game => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* Mid Windows Era */}
          <div id="mid" className="spellcard-header" style={{ marginTop: "20px" }}>
            Mid Windows Era (2007-2013)
          </div>

          <div className="content-box" style={{ marginBottom: "10px" }}>
            <div className="content-box-body" style={{ fontSize: "11px", background: "#2e2a1a", color: "#fff8e8", padding: "10px" }}>
              <strong>Era signature:</strong> Darker, more mature. TH11 has the lowest centroid in the series.
              Tempos start declining. ZUN's compositions gain depth at the cost of some early-era brightness.
              The journey underground and to the skies.
            </div>
          </div>

          {games.filter(g => ["TH10", "TH11", "TH12", "TH13", "TH14"].includes(g.id)).map(game => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* Late Windows Era */}
          <div id="late" className="spellcard-header" style={{ marginTop: "20px" }}>
            Late Windows Era (2015-2025)
          </div>

          <div className="content-box" style={{ marginBottom: "10px" }}>
            <div className="content-box-body" style={{ fontSize: "11px", background: "#1a1a3a", color: "#f0e8ff", padding: "10px" }}>
              <strong>Era signature:</strong> Slowest tempos (112-127 BPM), refined production, melancholic drift.
              ZUN has gotten older and it shows.in a good way. Technical polish peaks.
              The series experiments with roguelike/card mechanics.
            </div>
          </div>

          {games.filter(g => ["TH15", "TH16", "TH17", "TH18", "TH19", "TH20"].includes(g.id)).map(game => (
            <GameCard key={game.id} game={game} />
          ))}

          {/* TL;DR */}
          <div className="content-box" style={{ marginTop: "20px" }}>
            <div className="content-box-header">♦ TL;DR ♦</div>
            <div className="content-box-body" style={{ fontSize: "12px", textAlign: "center" }}>
              <p style={{ margin: 0 }}>
                <strong>IN</strong> is the GOAT (the data agrees: 148.2 BPM urgency).
                <br />
                <strong>UFO</strong> is my comfort pick (dark undertones beneath the spring cheer).
                <br />
                <strong>SA</strong> has the darkest OST (2104 Hz centroid) and will humble you.
                <br />
                Early Windows era is cozy. Late Windows era is melancholic.
                <br />
                PC-98 onset rates (5.5+/s) are unmatched. That FM chip was working.
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer className="site-footer">
        <div className="button-bar">
          <div className="button-88x31">Python 3.11</div>
          <div className="button-88x31">librosa</div>
          <div className="button-88x31">NumPy</div>
          <div className="button-88x31">Next.js</div>
        </div>
        <p className="copyright">© 2026 Amadeus Wu | Best viewed in 800x600</p>
      </footer>
    </div>
  );
}

function GameCard({ game }: { game: GameEntry }) {
  const colors = gameColors[game.id] || gameColors["TH20"];
  const stats = gameStats[game.id];

  const playedBadge = {
    yes: { text: "PLAYED", color: "#4CAF50" },
    partial: { text: "PARTIAL", color: "#FF9800" },
    emulated: { text: "EMULATED", color: "#9C27B0" },
    no: { text: "OST ONLY", color: "#607D8B" },
  }[game.played];

  return (
    <div
      className="content-box"
      style={{
        marginBottom: "15px",
        background: colors.bg,
        borderColor: colors.border,
      }}
    >
      <div
        className="content-box-header"
        style={{
          background: colors.border,
          color: colors.text,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          {game.rank && <span style={{ marginRight: "8px" }}>#{game.rank}</span>}
          {game.id}: {game.title}
        </span>
        <span style={{ fontSize: "10px", opacity: 0.8 }}>{game.year}</span>
      </div>
      <div className="content-box-body" style={{ color: colors.text, fontSize: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontStyle: "italic", color: colors.accent }}>{game.subtitle}</span>
          <span
            style={{
              fontSize: "10px",
              padding: "2px 6px",
              background: playedBadge.color,
              color: "#fff",
              borderRadius: "3px",
            }}
          >
            {playedBadge.text}
          </span>
        </div>

        <p style={{ margin: "0 0 8px 0" }}>{game.commentary}</p>

        {game.dataInsight && (
          <p style={{ margin: "0 0 8px 0", padding: "6px", background: "rgba(255,255,255,0.1)", borderLeft: `3px solid ${colors.accent}`, fontSize: "11px" }}>
            <strong>Data insight:</strong> {game.dataInsight}
          </p>
        )}

        {game.standoutTracks && game.standoutTracks.length > 0 && (
          <p style={{ margin: "0 0 8px 0", fontSize: "11px", color: colors.accent }}>
            <strong>Standout tracks:</strong> {game.standoutTracks.join(" • ")}
          </p>
        )}

        {stats && stats.tracks > 0 && (
          <div style={{ display: "flex", gap: "15px", fontSize: "10px", color: colors.accent, borderTop: `1px solid ${colors.border}`, paddingTop: "8px", marginTop: "8px" }}>
            <span>Tempo: {stats.tempo.toFixed(0)} BPM</span>
            <span>Brightness: {stats.brightness.toFixed(0)} Hz</span>
            <span>Onset: {stats.onset.toFixed(2)}/s</span>
            <span>Tracks: {stats.tracks}</span>
          </div>
        )}

        <div style={{ fontSize: "10px", color: colors.accent, marginTop: "4px" }}>
          {game.cleared}
        </div>
      </div>
    </div>
  );
}
