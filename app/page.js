"use client";

import Link from "next/link";
import { useUser } from "./context/UserContext";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          {user ? `Welcome back, ${user.name}` : "Welcome back"}
        </h1>
        <p className="max-w-md text-base text-slate-600">
          {user
            ? "Your profile details are ready below."
            : "This little app wants to greet you by name and show your details. Log in with a user ID to get started."}
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-slate-950">Your profile</h2>
        {user ? (
          <dl className="mt-4 grid gap-4 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-950">{user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Address</dt>
              <dd className="mt-1 text-slate-950">
                {user.address.street}, {user.address.city}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-sm text-slate-600">
            You are not logged in.{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-700 underline"
            >
              Log in
            </Link>{" "}
            to see your details here.
          </p>
        )}
      </section>
    </main>
  );
}
