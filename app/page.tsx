"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const boxesData = [
    "💌 أنا بعشقك وبحبك من كل قلبي 🥹",
    "🌹 دي لك، أهديلك قلبي كمان 😘",
    "🎶 خليك جمبي ونسمع مع بعض أغنيتنا ❤️",
  ];

  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [love, setLove] = useState(0);
  const [showNote, setShowNote] = useState(false);

  // القلوب: تولد مرة واحدة
  const [hearts] = useState(
    [...Array(30)].map(() => ({
      // eslint-disable-next-line react-hooks/purity
      left: Math.random() * 100 + "%",
      // eslint-disable-next-line react-hooks/purity
      size: 16 + Math.random() * 20 + "px",
      // eslint-disable-next-line react-hooks/purity
      delay: Math.random() * 6 + "s",
    }))
  );

  // الموسيقى
  const [audio] = useState(
    typeof Audio !== "undefined" ? new Audio("/song.mp3") : null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [hasInteracted, setHasInteracted] = useState(false);

const handleUserInteraction = () => {
  if (!hasInteracted) {
    setHasInteracted(true);
    if (audio) {
      audio.currentTime = 570; // ضبط البداية على الدقيقة 9
      audio.play().catch(() => console.log("Autoplay blocked"));
      setIsPlaying(true);
    }
  }
};

useEffect(() => {
  if (!audio) return;
  audio.loop = false;
  audio.volume = volume;

  const setAudioDuration = () => setDuration(audio.duration || 0);
  audio.addEventListener("loadedmetadata", setAudioDuration);

  const updateTime = () => setCurrentTime(audio.currentTime);
  audio.addEventListener("timeupdate", updateTime);

  return () => {
    audio.removeEventListener("loadedmetadata", setAudioDuration);
    audio.removeEventListener("timeupdate", updateTime);
  };
}, [audio, volume]);



  const handleBoxClick = (index: number) => {
      handleUserInteraction(); // تسجيل التفاعل
    if (activeBox === index) setActiveBox(null);
    else setActiveBox(index);

    if (audio && !isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
      handleUserInteraction(); // تسجيل التفاعل
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const restartAudio = () => {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audio) audio.volume = val;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audio) audio.currentTime = val;
    setCurrentTime(val);
  };

  // دلوقتي بدل popup نستخدم alert
  const handleLoveRelease = () => {
    if (love < 50) {
      alert("😅 لأ لسه أقل من النص، زودي الحب شوية!");
    } else if(love === 50){
      alert("ايه خمسين في المية دي؟ انا كنت حاسس انك بتلعبي بيا! 🥹");
    }else if (love < 100) {
      alert("زود يا نونو بطل بخل😒");
    } else {
      alert("كنت عارف عمتا انا بحبك اكتر كدا كدا");
    }
  };

  const openNote = () => setShowNote(true);

  const formatTime = (sec:number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="page">
      {/* القلوب */}
      <div className="hearts">
        {hearts.map((h, i) => (
          <span
            key={i}
            style={{
              left: h.left,
              fontSize: h.size,
              animationDelay: h.delay,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* هيرو */}
      <section className="section hero">
        <h1>أنا بحبك ❤️</h1>
        <p>ومش بحب حد زيك في الدنيا 🥹</p>
      </section>

      {/* البوكسات */}
      <section className="section boxes">
        <h2>اختاري بوكس 🫣</h2>
        <div className="boxContainer">
          {boxesData.map((msg, i) => (
            <div
              key={i}
              className={`box ${activeBox === i ? "active" : ""}`}
              onClick={() => handleBoxClick(i)}
            >
              {activeBox === i ? msg : "❓"}
            </div>
          ))}
        </div>
      </section>

      {/* تحكم الموسيقى */}
      <section className="section audioControl">
        <h2>🎵 الموسيقى الرومانسية</h2>
        <button onClick={toggleAudio}>
          {isPlaying ? "⏸️ وقف الأغنية" : "▶️ شغل الأغنية"}
        </button>
        <button onClick={restartAudio} style={{ marginLeft: "10px" }}>
          🔄 إعادة التشغيل
        </button>
        <div style={{ marginTop: "10px" }}>
          <label>الصوت: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            style={{ width: "200px", margin: "0 10px" }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </section>

      {/* range input */}
      <section className="section sliderSection">
        <h2>قولي بقى 😏</h2>
        <p>بتحبيني قد إيه؟</p>

        <div className="sliderWrapper">
          <input
            type="range"
            min="0"
            max="100"
            value={love}
            onChange={(e) => setLove(Number(e.target.value))}
            onMouseUp={handleLoveRelease}
            onTouchEnd={handleLoveRelease}
          />
          <span className="loveCounter">{love}%</span>
        </div>

        {love >= 100 && (
          <button className="noteBtn" onClick={openNote}>
            أفتح النوت النهائي 💌
          </button>
        )}
      </section>

      {/* النوت النهائي */}
      {showNote && (
        <section className="section note">
          <p>دا بدل النوت حبيبك خطه يعييييييي يا نونو 😂😘</p>
        </section>
      )}

      <style jsx>{`
        .page {
          min-height: 350vh;
          background: linear-gradient(180deg, #ff4d6d, #ff9a9e, #ffd1dc);
          color: white;
          text-align: center;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 100px;
        }

        .section {
          padding: 80px 20px;
          max-width: 600px;
          margin: auto;
        }

        .hero h1 {
          font-size: 3.5rem;
          animation: pulse 1.5s infinite;
        }

        .hero p {
          font-size: 1.4rem;
          margin-top: 10px;
        }

        .hearts {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hearts span {
          position: absolute;
          bottom: -40px;
          animation: float 7s linear infinite;
          opacity: 0.9;
        }
        .sliderWrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 20px 0;
        }

        .loveCounter {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .boxes .boxContainer {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .boxes .box {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.8rem;
          cursor: pointer;
          transition: all 0.5s ease;
          padding: 10px;
        }

        .boxes .box.active {
          transform: rotateY(360deg);
          background: rgba(255, 255, 255, 0.6);
          font-size: 1.2rem;
        }

        .sliderSection input {
          width: 280px;
          margin: 20px 0;
        }

        .numbers {
          display: flex;
          justify-content: space-between;
          max-width: 280px;
          margin: auto;
          font-weight: bold;
        }

        .noteBtn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #fff;
          color: #ff4d6d;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
        }

        .audioControl button {
          margin-top: 10px;
          padding: 8px 20px;
          font-size: 1rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          color: #ff4d6d;
          background: #fff;
        }

        .audioControl input[type="range"] {
          width: 150px;
          margin-top: 10px;
        }

        .note {
          background: white;
          color: #ff4d6d;
          border-radius: 25px;
          animation: pop 0.6s ease;
          padding: 20px;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes pop {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
