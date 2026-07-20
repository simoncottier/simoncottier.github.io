"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "../workout.css";

type Exercise = { name: string; sets: number; reps?: string };
type Workout = { title: string; focus: string; duration: string; level: string; exercises: Exercise[] };
type Session = { workout: number; date: string };

const workouts: Workout[] = [
  { title: "Chest, Triceps & Abs A", focus: "Multi-joint strength focus", duration: "55–70 min", level: "Intermediate", exercises: [
    { name: "Barbell bench press", sets: 4 }, { name: "Incline dumbbell press", sets: 3 }, { name: "Weighted dip or assisted dip", sets: 3 }, { name: "Close-grip bench press", sets: 3 }, { name: "Overhead triceps extension", sets: 3 }, { name: "Weighted crunch", sets: 3, reps: "12–20" }, { name: "Reverse crunch", sets: 3, reps: "12–20" }] },
  { title: "Shoulders, Legs & Calves A", focus: "Compound lower-body focus", duration: "60–75 min", level: "Intermediate", exercises: [
    { name: "Standing shoulder press", sets: 4 }, { name: "Barbell squat", sets: 4 }, { name: "Romanian deadlift", sets: 3 }, { name: "Dumbbell lateral raise", sets: 3 }, { name: "Walking lunge", sets: 3 }, { name: "Standing calf raise", sets: 4 }, { name: "Seated calf raise", sets: 3 }] },
  { title: "Back, Traps & Arms A", focus: "Pulling strength focus", duration: "60–75 min", level: "Intermediate", exercises: [
    { name: "Deadlift", sets: 4 }, { name: "Pull-up or lat pulldown", sets: 4 }, { name: "Barbell row", sets: 3 }, { name: "Dumbbell shrug", sets: 3 }, { name: "Barbell curl", sets: 3 }, { name: "Hammer curl", sets: 3 }, { name: "Wrist curl", sets: 3 }] },
  { title: "Chest, Triceps & Abs B", focus: "Single-joint and volume focus", duration: "50–65 min", level: "Intermediate", exercises: [
    { name: "Incline barbell press", sets: 4 }, { name: "Flat dumbbell press", sets: 3 }, { name: "Cable fly", sets: 3 }, { name: "Triceps pressdown", sets: 3 }, { name: "Dumbbell kickback", sets: 3 }, { name: "Cable crunch", sets: 3, reps: "12–20" }, { name: "Plank", sets: 3, reps: "30–60 sec" }] },
  { title: "Shoulders, Legs & Calves B", focus: "Isolation and volume focus", duration: "55–70 min", level: "Intermediate", exercises: [
    { name: "Seated dumbbell press", sets: 4 }, { name: "Leg press", sets: 4 }, { name: "Leg extension", sets: 3 }, { name: "Lying leg curl", sets: 3 }, { name: "Cable lateral raise", sets: 3 }, { name: "Rear-delt fly", sets: 3 }, { name: "Calf press", sets: 4 }] },
  { title: "Back, Traps & Arms B", focus: "Isolation and volume focus", duration: "55–70 min", level: "Intermediate", exercises: [
    { name: "Close-grip pulldown", sets: 4 }, { name: "Seated cable row", sets: 4 }, { name: "Straight-arm pulldown", sets: 3 }, { name: "Cable shrug", sets: 3 }, { name: "Incline dumbbell curl", sets: 3 }, { name: "Cable curl", sets: 3 }, { name: "Reverse wrist curl", sets: 3 }] }
];

// Shortcut to Shred alternates the target range between the first and second
// half of each training week. These ranges come from the official overview.
const weeklyRepRanges = [
  ["9–11", "12–15"],
  ["6–8", "16–20"],
  ["2–5", "21–30"],
  ["9–11", "12–15"],
  ["6–8", "16–20"],
  ["2–5", "21–30"]
];

export default function WorkoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [counterResetAt, setCounterResetAt] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("workout-user");
    if (!user) { router.replace("/login"); return; }
    const history = JSON.parse(localStorage.getItem("workout-history") || "[]") as Session[];
    const next = history.length ? (history[history.length - 1].workout + 1) % workouts.length : 0;
    setName(user); setSessions(history); setSelected(next);
    setCounterResetAt(localStorage.getItem("workout-counter-reset"));
    setReady(true);
  }, [router]);

  const nextIndex = sessions.length ? (sessions[sessions.length - 1].workout + 1) % workouts.length : 0;
  const currentWeek = Math.floor(sessions.length / workouts.length) % 6;
  const targetReps = weeklyRepRanges[currentWeek][selected < 3 ? 0 : 1];
  const selectedWorkout = workouts[selected];
  const lastDate = useMemo(() => sessions.length ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(sessions[sessions.length - 1].date)) : "No sessions yet", [sessions]);
  const sessionsByDay = useMemo(() => {
    const grouped = new Map<string, Session[]>();
    sessions.forEach((session) => {
      const date = new Date(session.date);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      grouped.set(key, [...(grouped.get(key) || []), session]);
    });
    return grouped;
  }, [sessions]);
  const activityDays = useMemo(() => {
    const end = new Date();
    end.setHours(12, 0, 0, 0);
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date(end);
      date.setDate(end.getDate() - (13 - index));
      return date;
    });
  }, [sessions]);
  const workoutCounts = useMemo(() => workouts.map((_, workoutIndex) => sessions.filter((session) => {
    const isAfterReset = !counterResetAt || new Date(session.date).getTime() > new Date(counterResetAt).getTime();
    return session.workout === workoutIndex && isAfterReset;
  }).length), [sessions, counterResetAt]);
  const counterResetLabel = counterResetAt
    ? new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(counterResetAt))
    : "Not reset yet";
  const currentMonthSessions = sessions.filter((session) => {
    const date = new Date(session.date);
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  }).length;

  function completeWorkout() {
    const updated = [...sessions, { workout: selected, date: new Date().toISOString() }];
    localStorage.setItem("workout-history", JSON.stringify(updated));
    setSessions(updated); setSaved(true);
    setTimeout(() => { setSelected((selected + 1) % workouts.length); setSaved(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, 1200);
  }

  function logout() { localStorage.removeItem("workout-user"); router.push("/login"); }
  function clearCurrentMonth() {
    if (!currentMonthSessions) return;
    const monthName = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date());
    if (!window.confirm(`Clear all training sessions recorded in ${monthName}?`)) return;
    const now = new Date();
    const remaining = sessions.filter((session) => {
      const date = new Date(session.date);
      return date.getFullYear() !== now.getFullYear() || date.getMonth() !== now.getMonth();
    });
    localStorage.setItem("workout-history", JSON.stringify(remaining));
    setSessions(remaining);
    setSelected(remaining.length ? (remaining[remaining.length - 1].workout + 1) % workouts.length : 0);
    setSaved(false);
  }
  function resetWorkoutCounters() {
    if (!window.confirm("Reset all six workout counters to zero? Your training history will remain visible.")) return;
    const resetTime = new Date().toISOString();
    localStorage.setItem("workout-counter-reset", resetTime);
    setCounterResetAt(resetTime);
  }
  if (!ready) return <main className="fitness-shell loading">Loading your plan…</main>;

  return (
    <main className="fitness-shell workout-shell">
      <nav className="fitness-nav">
        <Link href="/" className="fitness-brand"><span>SC</span> TRAINING</Link>
        <div><span className="user-greeting">Hi, {name}</span><button onClick={logout} className="text-button">Log out</button></div>
      </nav>

      <header className="workout-header">
        <div><p className="eyebrow">SHORTCUT TO SHRED · ADAPTED</p></div>
        <div className="stats-card"><div><strong>{sessions.length}</strong><span>Sessions</span></div><div><strong>{lastDate}</strong><span>Last workout</span></div></div>
      </header>

      <section className="routine-grid" aria-label="Workout routine">
        {workouts.map((workout, index) => (
          <button key={workout.title} onClick={() => { setSelected(index); setSaved(false); }} className={`routine-card ${selected === index ? "active" : ""}`}>
            <span className="routine-number">0{index + 1}</span>
            {index === nextIndex && <span className="next-badge">UP NEXT</span>}
            <strong>{workout.title}</strong>
          </button>
        ))}
      </section>

      <section className="activity-chart" aria-labelledby="activity-title">
        <div className="activity-heading">
          <div><p className="eyebrow">LAST 14 DAYS</p><h2 id="activity-title">Training activity</h2></div>
          <div className="activity-actions">
            <strong>{sessions.length} session{sessions.length === 1 ? '' : 's'}</strong>
            <button onClick={clearCurrentMonth} disabled={!currentMonthSessions}>Clear month</button>
          </div>
        </div>
        <div className="counter-row">
          <div className="counter-label">
            <span>Since last reset</span>
            <div className="counter-reset-line">
              <button onClick={resetWorkoutCounters}>Reset counters</button>
              <time dateTime={counterResetAt || undefined}>{counterResetLabel}</time>
            </div>
          </div>
          <div className="counter-items">
            {workoutCounts.map((count, index) => <div className="counter-item" key={index} title={`Workout ${index + 1}: ${count}`}><span>{index + 1}</span><strong>{count}</strong></div>)}
          </div>
        </div>
        <div className="activity-scroll">
          <div className="activity-days">
          {activityDays.map((day) => {
            const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
            const daySessions = sessionsByDay.get(key) || [];
            const description = daySessions.map((session) => workouts[session.workout].title).join(', ');
            return (
              <div key={key} className={`activity-day ${daySessions.length ? 'trained' : ''}`} title={description || undefined}>
                <div className="activity-bar">
                  {daySessions.map((session, index) => <span key={`${session.date}-${index}`}>{session.workout + 1}</span>)}
                </div>
                <small>{new Intl.DateTimeFormat('en', { weekday: 'short' }).format(day).slice(0, 2)}</small>
                <b>{day.getDate()}</b>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      <section className="workout-detail">
        <div className="detail-intro"><p className="eyebrow">WEEK {currentWeek + 1} · WORKOUT {selected + 1} OF 6</p><h2>{selectedWorkout.title}</h2><p>{selectedWorkout.focus}</p><div className="detail-meta"><span>◷ {selectedWorkout.duration}</span><span>◇ {selectedWorkout.level}</span></div><div className="cardio-note"><strong>Cardio acceleration</strong><span>After every lifting set, perform 60 seconds of active cardio, then continue to the next set.</span></div></div>
        <div className="exercise-list">
          {selectedWorkout.exercises.map((exercise, index) => <div className="exercise" key={exercise.name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{exercise.name}</strong><small>{exercise.sets} sets × {exercise.reps || targetReps} reps</small></div>)}
        </div>
        <button onClick={completeWorkout} className={`go-button ${saved ? "saved" : ""}`} disabled={saved}><span>{saved ? "✓" : "GO"}</span><small>{saved ? "WORKOUT SAVED" : "COMPLETE THIS WORKOUT"}</small></button>
        <p className="save-help">Clicking GO saves today’s date and selects the following workout. This is an original adaptation; use the official program for the author’s complete prescription.</p>
      </section>
      <footer className="program-credit">Inspired by Jim Stoppani’s <a href="https://www.jimstoppani.com/training/shortcut-to-shred-overview" target="_blank" rel="noreferrer">Shortcut to Shred program overview ↗</a></footer>
    </main>
  );
}
