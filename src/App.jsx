import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Heart,
  PiggyBank,
  RotateCcw,
  ShieldPlus,
  Sparkles,
  Star,
  Users,
  WandSparkles,
} from "lucide-react";

const MBTI_TYPES = [
  { type: "ISTJ", title: "세상의 소금형", desc: "책임감 있게 오늘의 약속을 지키는 사람" },
  { type: "ISFJ", title: "임금 뒷편의 권력형", desc: "섬세하게 주변을 살피는 사람" },
  { type: "INFJ", title: "예언자형", desc: "사람과 의미를 깊게 연결하는 사람" },
  { type: "INTJ", title: "과학자형", desc: "큰 그림을 세우고 차분히 완성하는 사람" },
  { type: "ISTP", title: "백과사전형", desc: "필요한 순간에 해결책을 찾는 사람" },
  { type: "ISFP", title: "성인군자형", desc: "따뜻한 감성으로 균형을 잡는 사람" },
  { type: "INFP", title: "잔 다르크형", desc: "진심과 가능성을 믿는 사람" },
  { type: "INTP", title: "아이디어 뱅크형", desc: "새로운 관점으로 문제를 푸는 사람" },
  { type: "ESTP", title: "수완좋은 활동가형", desc: "현장에서 빠르게 기회를 잡는 사람" },
  { type: "ESFP", title: "사교적인 유형", desc: "분위기를 밝히고 사람을 모으는 사람" },
  { type: "ENFP", title: "스파크형", desc: "열정으로 새 흐름을 만드는 사람" },
  { type: "ENTP", title: "발명가형", desc: "도전 속에서 재미를 찾는 사람" },
  { type: "ESTJ", title: "사업가형", desc: "계획을 현실로 밀어붙이는 사람" },
  { type: "ESFJ", title: "친선도모형", desc: "공동체의 온도를 챙기는 사람" },
  { type: "ENFJ", title: "언변능숙형", desc: "사람의 성장을 돕는 사람" },
  { type: "ENTJ", title: "지도자형", desc: "목표를 향해 구조를 만드는 사람" },
];

const BLOOD_TYPES = ["A", "B", "O", "AB"];

const ZODIACS = [
  { name: "염소자리", start: [12, 22], end: [1, 19], trait: "꾸준함" },
  { name: "물병자리", start: [1, 20], end: [2, 18], trait: "새로운 관점" },
  { name: "물고기자리", start: [2, 19], end: [3, 20], trait: "공감력" },
  { name: "양자리", start: [3, 21], end: [4, 19], trait: "추진력" },
  { name: "황소자리", start: [4, 20], end: [5, 20], trait: "안정감" },
  { name: "쌍둥이자리", start: [5, 21], end: [6, 21], trait: "소통력" },
  { name: "게자리", start: [6, 22], end: [7, 22], trait: "보살핌" },
  { name: "사자자리", start: [7, 23], end: [8, 22], trait: "자신감" },
  { name: "처녀자리", start: [8, 23], end: [9, 22], trait: "정리력" },
  { name: "천칭자리", start: [9, 23], end: [10, 22], trait: "균형감" },
  { name: "전갈자리", start: [10, 23], end: [11, 22], trait: "집중력" },
  { name: "사수자리", start: [11, 23], end: [12, 21], trait: "확장성" },
];

const FORTUNE_ITEMS = [
  { key: "money", label: "금전운", icon: PiggyBank },
  { key: "love", label: "연애운", icon: Heart },
  { key: "relation", label: "관계운", icon: Users },
  { key: "health", label: "건강운", icon: ShieldPlus },
  { key: "surprise", label: "깜짝운", icon: Sparkles },
];

const STEP_TITLES = ["이름", "MBTI", "혈액형", "생일", "마법 계산", "오늘의 운세"];

const today = new Date();

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    mbti: "",
    blood: "",
    birthday: "",
  });

  const zodiac = useMemo(() => getZodiac(form.birthday), [form.birthday]);
  const fortune = useMemo(() => {
    if (!form.name || !form.mbti || !form.blood || !zodiac) return null;
    return buildFortune(form, zodiac);
  }, [form, zodiac]);

  const canContinue =
    (step === 0 && form.name.trim().length > 0) ||
    (step === 1 && form.mbti) ||
    (step === 2 && form.blood) ||
    (step === 3 && zodiac) ||
    step === 4;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function next() {
    if (step < STEP_TITLES.length - 1 && canContinue) setStep((current) => current + 1);
  }

  function previous() {
    if (step > 0) setStep((current) => current - 1);
  }

  function reset() {
    setStep(0);
    setForm({ name: "", mbti: "", blood: "", birthday: "" });
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="brand-strip">
          <img src="/assets/ps1-logo.jpg" alt="PS1 로고" />
          <div>
            <span>MBTI × 혈액형 × 별자리</span>
            <h1>PS1 사회복지학 운세 마법사</h1>
          </div>
          <img src="/assets/social-welfare-logo.png" alt="사회복지학 로고" />
        </div>
      </section>

      <section className="wizard">
        <aside className="steps" aria-label="진행 단계">
          {STEP_TITLES.map((title, index) => (
            <button
              key={title}
              type="button"
              className={index === step ? "active" : index < step ? "done" : ""}
              onClick={() => index <= step && setStep(index)}
              disabled={index > step}
            >
              <span>{index + 1}</span>
              {title}
            </button>
          ))}
        </aside>

        <div className="stage">
          {step === 0 && <NameStep name={form.name} onChange={(value) => update("name", value)} />}
          {step === 1 && <MbtiStep value={form.mbti} onChange={(value) => update("mbti", value)} />}
          {step === 2 && <BloodStep value={form.blood} onChange={(value) => update("blood", value)} />}
          {step === 3 && <BirthdayStep value={form.birthday} zodiac={zodiac} onChange={(value) => update("birthday", value)} />}
          {step === 4 && <MagicStep form={form} zodiac={zodiac} />}
          {step === 5 && fortune && <ResultStep form={form} zodiac={zodiac} fortune={fortune} onReset={reset} />}

          <div className="nav-row">
            <button type="button" className="ghost" onClick={previous} disabled={step === 0}>
              <ChevronLeft size={18} />
              이전
            </button>
            {step < 5 ? (
              <button type="button" className="primary" onClick={next} disabled={!canContinue}>
                {step === 4 ? "운세 보기" : "다음"}
                <ChevronRight size={18} />
              </button>
            ) : (
              <button type="button" className="ghost" onClick={reset}>
                <RotateCcw size={18} />
                다시 하기
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function NameStep({ name, onChange }) {
  return (
    <section className="panel intro-panel">
      <div>
        <span className="eyebrow"><WandSparkles size={16} /> 1단계</span>
        <h2>운세를 받을 이름을 알려주세요</h2>
        <p>결과 화면에서 오늘 날짜와 함께 이름을 넣어 운세를 보여드립니다.</p>
      </div>
      <label className="text-field">
        이름
        <input value={name} maxLength={12} onChange={(event) => onChange(event.target.value)} placeholder="예: 영삼" autoFocus />
      </label>
    </section>
  );
}

function MbtiStep({ value, onChange }) {
  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <span className="eyebrow"><Star size={16} /> 2단계</span>
          <h2>MBTI를 선택하세요</h2>
        </div>
        <img className="reference-image" src="/assets/mbti-reference.png" alt="MBTI 참고표" />
      </div>
      <div className="mbti-grid">
        {MBTI_TYPES.map((item) => (
          <button key={item.type} type="button" className={value === item.type ? "selected" : ""} onClick={() => onChange(item.type)}>
            <strong>{item.type}</strong>
            <span>{item.title}</span>
            <em>{item.desc}</em>
          </button>
        ))}
      </div>
    </section>
  );
}

function BloodStep({ value, onChange }) {
  return (
    <section className="panel">
      <span className="eyebrow"><Sparkles size={16} /> 3단계</span>
      <h2>혈액형을 선택하세요</h2>
      <div className="blood-grid">
        {BLOOD_TYPES.map((type) => (
          <button key={type} type="button" className={value === type ? "selected" : ""} onClick={() => onChange(type)}>
            <strong>{type}</strong>
            <span>{bloodLabel(type)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function BirthdayStep({ value, zodiac, onChange }) {
  const birthday = getBirthdayParts(value);
  const currentYear = today.getFullYear();
  const selectedYear = birthday.year || 2000;

  function changeYear(nextYear) {
    const safeYear = clamp(Number(nextYear) || 2000, 1900, currentYear);
    onChange(makeBirthdayValue(safeYear, birthday.month || 1, birthday.day || 1));
  }

  return (
    <section className="panel birthday-panel">
      <div>
        <span className="eyebrow"><CalendarDays size={16} /> 4단계</span>
        <h2>생일을 입력하세요</h2>
        <p>년도는 크게 맞추고, 아래 생일 칸에서 월과 일을 편하게 고르세요.</p>
      </div>
      <div className="year-picker" aria-label="생일 년도 선택">
        <span>출생년도</span>
        <div className="year-controls">
          <button type="button" onClick={() => changeYear(selectedYear - 10)} aria-label="10년 전">
            -10
          </button>
          <button type="button" onClick={() => changeYear(selectedYear - 1)} aria-label="1년 전">
            -1
          </button>
          <input
            type="number"
            inputMode="numeric"
            min="1900"
            max={currentYear}
            value={selectedYear}
            onChange={(event) => changeYear(event.target.value)}
            aria-label="출생년도 직접 입력"
          />
          <button type="button" onClick={() => changeYear(selectedYear + 1)} aria-label="1년 후">
            +1
          </button>
          <button type="button" onClick={() => changeYear(selectedYear + 10)} aria-label="10년 후">
            +10
          </button>
        </div>
      </div>
      <label className="text-field">
        월과 일
        <input
          type="date"
          min="1900-01-01"
          max={`${currentYear}-12-31`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onInput={(event) => onChange(event.target.value)}
        />
      </label>
      <div className={zodiac ? "zodiac-card active" : "zodiac-card"}>
        <Star size={28} />
        <div>
          <span>나의 별자리</span>
          <strong>{zodiac ? zodiac.name : "생일을 입력하면 표시됩니다"}</strong>
          {zodiac && <p>{zodiac.trait} 에너지가 오늘의 운세 계산에 반영됩니다.</p>}
        </div>
      </div>
    </section>
  );
}

function getBirthdayParts(dateValue) {
  if (!dateValue) return {};
  const [yearText, monthText, dayText] = dateValue.split("-");
  return {
    year: Number(yearText),
    month: Number(monthText),
    day: Number(dayText),
  };
}

function makeBirthdayValue(year, month, day) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function MagicStep({ form, zodiac }) {
  return (
    <section className="panel magic-panel">
      <div className="magic-copy">
        <span className="eyebrow"><WandSparkles size={16} /> 5단계</span>
        <h2>사회복지학전공 운세 마법사가 당신의 운세를 알려드립니다.</h2>
        <p>{form.mbti} × {form.blood}형 × {zodiac?.name} 조합을 오늘의 날짜와 섞고 있습니다.</p>
      </div>
      <div className="magic-orbit" aria-hidden="true">
        <span className="token mbti">{form.mbti}</span>
        <span className="token blood">{form.blood}형</span>
        <span className="token zodiac">{zodiac?.name}</span>
        <div className="crystal">
          <WandSparkles size={54} />
        </div>
      </div>
    </section>
  );
}

function ResultStep({ form, zodiac, fortune, onReset }) {
  return (
    <section className="panel result-panel">
      <div className="result-head">
        <span className="eyebrow"><Sparkles size={16} /> 6단계</span>
        <h2>{form.name.trim()}님의 오늘({formatKoreanDate(today)})의 운세입니다.</h2>
        <p>{form.mbti} · {form.blood}형 · {zodiac.name}</p>
      </div>

      <div className="score-grid">
        {FORTUNE_ITEMS.map((item) => {
          const Icon = item.icon;
          const score = fortune.scores[item.key];
          return (
            <article key={item.key} className={score >= 8 ? "great" : score <= 4 ? "care" : ""}>
              <Icon size={24} />
              <span>{item.label}</span>
              <strong>{score}<small>/10</small></strong>
            </article>
          );
        })}
      </div>

      <article className="summary-card">
        <h3>총평</h3>
        <p>{fortune.summary}</p>
      </article>

      <button type="button" className="primary wide" onClick={onReset}>
        <RotateCcw size={18} />
        새 운세 보기
      </button>
    </section>
  );
}

function getZodiac(dateValue) {
  if (!dateValue) return null;
  const [, monthText, dayText] = dateValue.split("-");
  const month = Number(monthText);
  const day = Number(dayText);
  if (!month || !day) return null;
  return ZODIACS.find((zodiac) => isInZodiacRange(month, day, zodiac)) || null;
}

function isInZodiacRange(month, day, zodiac) {
  const value = month * 100 + day;
  const start = zodiac.start[0] * 100 + zodiac.start[1];
  const end = zodiac.end[0] * 100 + zodiac.end[1];
  if (start > end) return value >= start || value <= end;
  return value >= start && value <= end;
}

function buildFortune(form, zodiac) {
  const dateKey = today.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });
  const seed = hash(`${dateKey}|${form.name.trim()}|${form.mbti}|${form.blood}|${zodiac.name}`);
  const profile = profileVector(form.mbti, form.blood, zodiac);
  const scores = {};

  FORTUNE_ITEMS.forEach((item, index) => {
    const base = 5 + seededWave(seed + index * 173);
    const interaction = profile[item.key] || 0;
    scores[item.key] = clamp(Math.round(base + interaction), 1, 10);
  });

  const sorted = FORTUNE_ITEMS.map((item) => ({ ...item, score: scores[item.key] })).sort((a, b) => b.score - a.score);
  const best = sorted[0];
  const weak = sorted[sorted.length - 1];

  return {
    scores,
    summary: makeSummary(form, zodiac, best, weak),
  };
}

function profileVector(mbti, blood, zodiac) {
  const extrovert = mbti.includes("E") ? 1 : -1;
  const intuitive = mbti.includes("N") ? 1 : -1;
  const feeling = mbti.includes("F") ? 1 : -1;
  const judging = mbti.includes("J") ? 1 : -1;
  const bloodBias = {
    A: { money: 1, love: 0, relation: 1, health: 1, surprise: -1 },
    B: { money: 0, love: 1, relation: 0, health: -1, surprise: 2 },
    O: { money: 1, love: 1, relation: 2, health: 0, surprise: 0 },
    AB: { money: -1, love: 1, relation: -1, health: 1, surprise: 2 },
  }[blood];
  const zodiacPulse = (hash(zodiac.name) % 5) - 2;

  return {
    money: judging + bloodBias.money + Math.max(0, -feeling),
    love: feeling + bloodBias.love + Math.max(0, intuitive),
    relation: extrovert + bloodBias.relation + feeling,
    health: judging + bloodBias.health - Math.max(0, extrovert - intuitive),
    surprise: intuitive + bloodBias.surprise + zodiacPulse,
  };
}

function makeSummary(form, zodiac, best, weak) {
  const tone =
    best.score >= 8
      ? `${best.label}이 강하게 열려 있어 작은 시도도 크게 돌아올 수 있습니다.`
      : `${best.label}이 오늘의 중심축이라 우선순위를 그쪽에 두면 좋습니다.`;
  const caution =
    weak.score <= 4
      ? `${weak.label}은 다소 낮으니 무리한 약속이나 즉흥 결정을 줄이세요.`
      : `${weak.label}은 평범한 흐름이라 기본 루틴을 지키면 충분합니다.`;
  return `${form.mbti}의 판단 방식, ${form.blood}형의 리듬, ${zodiac.name}의 ${zodiac.trait} 에너지가 섞여 오늘은 ${tone} 특히 사람을 돕거나 조율하는 장면에서 장점이 살아납니다. 다만 ${caution} 오늘의 행운 포인트는 먼저 인사하기, 짧게 정리하기, 필요한 도움을 정중히 요청하기입니다.`;
}

function seededWave(value) {
  const x = Math.sin(value) * 10000;
  return Math.floor((x - Math.floor(x)) * 7) - 3;
}

function hash(text) {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function bloodLabel(type) {
  return {
    A: "차분한 준비력",
    B: "자유로운 발상",
    O: "따뜻한 추진력",
    AB: "독특한 균형감",
  }[type];
}

function formatKoreanDate(date) {
  return date.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}
