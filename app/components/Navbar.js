"use client";

import Link from "next/link";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-950"
        >
          Hi, It&apos;s Me
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-slate-700">
              Hi, {user.name}
            </p>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
