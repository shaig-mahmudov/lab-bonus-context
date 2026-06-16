"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const [id, setId] = useState("");
  const router = useRouter();
  const { login, isLoading, error } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();

    const didLogin = await login(id);

    // Once login actually works, send them back to the home page so the navbar
    // and the profile card can show who they are.
    if (didLogin) {
      router.push("/");
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Log in
        </h1>
        <p className="text-sm text-slate-600">
          Enter a user ID (try a number from 1 to 10) and we will pull up that
          account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          User ID
          <input
            type="number"
            min="1"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. 1"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none focus:border-emerald-700"
            required
          />
        </label>

        {error && <p className="text-sm font-medium text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
