"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../workout.css";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("workout-user");
    if (savedName) setName(savedName);
  }, []);

  function login(event: FormEvent) {
    event.preventDefault();
    const user = name.trim();
    if (!user) return;
    localStorage.setItem("workout-user", user);
    router.push("/workout");
  }

  return (
    <main className="fitness-shell login-shell">
      <Link href="/" className="fitness-back" aria-label="Back to portfolio">←</Link>
      <section className="login-card">
        <div className="login-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 2 2m-5 1 2 2"/></svg>
        </div>
        <p className="eyebrow">YOUR PRIVATE SPACE</p>
        <h1>Ready to move?</h1>
        <p className="login-copy">Enter your name to open your workout plan and continue where you left off.</p>
        <form onSubmit={login}>
          <label htmlFor="name">Your name</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Simon" autoFocus autoComplete="name" required />
          <button className="fitness-primary" type="submit">OPEN MY WORKOUT <span>→</span></button>
        </form>
        <p className="privacy-note">Progress is stored privately on this device.</p>
      </section>
    </main>
  );
}
