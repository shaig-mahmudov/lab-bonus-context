# Lab: Hi, It's YOU!

## Introduction

The team is starting a small internal app. There is a **Log
in** button in the corner, a login screen behind it, and a home page that
clearly wants to greet you by name and show your details. There is just one
catch: the app has **no idea who you are**. You log in, and nothing changes.
Actually, right now it does worse than nothing, it throws an error.

This lab is about a skill you will use constantly: **sharing one piece of state,
the logged-in user, across your whole app with React Context**. The user is the
perfect example, because "who is logged in" is not page state. The navbar needs
it (to say hi), the home page needs it (to show your email and address), and
tomorrow ten more components will need it. That is exactly the kind of state
that belongs **above** your components, not trapped inside one of them.

One important thing before you start: **this is not a real login.** There is no
password, no real authentication, no security. You type a user **ID**, and the
app fetches that person's record from **JSONPlaceholder**, the free API full
of pretend users. We are doing it this way on purpose, so you can learn the
context pattern with real data flowing through it before anyone wires it to a
real backend. When the real backend shows up later, the context you build here
barely changes. Only the "where does the user come from" part does.

## The situation

Your team lead says today:

> "Our app will have a login page, a home page, and
> the navbar has a Log in button. What's missing is the brain: the app never
> remembers who logged in. When someone logs in with their ID, I want their name
> up in the navbar saying hi, and on the home page I want to see their email and
> their address, just the street and the city, nothing else. Here's the thing
> though: the user can't live inside the login page, because the second you leave
> that page it's gone. The navbar and the home page both need to read it. Figure
> out where that lives."

The user cannot live inside the login page, and it cannot live inside the home page either.
 It has to live **above** the app, therefore, in the context.

## The API

There is no database. You will pull pretend users from JSONPlaceholder:

```
https://jsonplaceholder.typicode.com/users/{id}
```

Valid IDs run from **1 to 10**. Open this in your browser before you write any
code:

```
https://jsonplaceholder.typicode.com/users/1
```

You will get back a user shaped like this (trimmed to what you care about):

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "city": "Gwenborough"
  }
}
```

So `name` is at the top level, but `street` and `city` live nested inside
`address`. Notice the shape now, it will save you a confused minute later.

⚠️ Gotcha: ask for an ID that does not exist (say `99`) and the API does not
error in an obvious way. It returns an empty object `{}`, remember? Worth knowing if you
get to the stretch goals.

## What you will build

- A **user context** that holds the current user and a way to log in.
- A **provider** (the "context wrapper") that owns the user state, does the
  fetch, and shares the result.
- The **wiring** that wraps your whole app in that provider.
- A **navbar greeting**: "Hi, {name}" once someone is logged in.
- A **profile** on the home page showing the user's email and their street and
  city.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You will see the home page with a navbar and a
**Log in** button, and a profile card that says you are not logged in. That is
correct.

Click **Log in**, type a number like `1`, and submit. The app **throws an
error** (`login is not defined`). That is also correct, and it is the whole
point. The login form is trying to hand the ID to a context that does not exist
yet. Building that context is the lab. Resist the urge to "fix" the login page
by stuffing the fetch directly in there, read the situation again first.

## Your job

Build it in this order, smallest working thing first. You learned the context
code in the lessons, your job is to apply it here.

### 0. Fix AI styling mistakes

Yep, the styles do not look friendly, you need to fix the colors a little bit to make it readable.

### 1. Create the user context and its provider

Make a context for the user and a provider component that owns the state (who is
logged in, starting as nobody) and exposes a `login(id)` function. That `login`
is where the fetch happens: it calls
`https://jsonplaceholder.typicode.com/users/${id}`, reads the JSON, and stores
the user in state. This is the "context wrapper" the situation is talking about.
Put it somewhere sensible, for example `app/context/UserContext.js` (the
location is your call).



### 2. Wrap your whole app in the provider

A provider only shares state with what it wraps. Find the one place where
wrapping once covers the navbar **and** every page, and wrap it there. Look at
`app/layout.js`.

### 3. Wire the login form to your context

Open `app/login/page.js`. The form already collects the ID. Right now it calls a
`login()` that does not exist. Replace that with the real `login` from your
context, and once it succeeds, send the user back to the home page (the redirect
is already written for you).

### 4. Greet the user in the navbar

Open `app/components/Navbar.js`. When someone is logged in, show "Hi, {name}"
instead of (or next to) the Log in button. Reading the user means reading your
context, so remember the rule from the heads up: a component that uses a hook
has to be a Client Component.

### 5. Show the profile on the home page

Open `app/page.js`. The profile card is already there in its logged-out state.
When there is a user, show their **email** and their **address: street and city
only**. Remember `street` and `city` are nested inside `address`.

## 💡 Think about it

No code here, just the decisions that make or break this lab.

- **Where does the user state live?** If you keep it in the login page, it is
  gone the moment you navigate to the home page. The whole situation is about
  lifting it *above* the app so it survives the trip. That is the provider's
  job.
- **Where does the fetch go?** It can live in the login page, or inside the
  context's `login`. Putting it next to the state it updates (in the provider)
  keeps the login page dumb and the data flow clean. Pick one **on purpose** and
  know why.
- **What has to become a Client Component, and what can stay on the server?**
  Reading context, handling the form, and redirecting all need the browser. Be
  deliberate about which files get `'use client'` and which do not.
- **The first render problem.** Before anyone logs in, there is no user. The
  navbar and the home page render anyway. What do they show when the user is
  `null`? Guard for it, do not let it crash.
- **This is not real auth.** Refresh the page and the user vanishes, because the
  state lives in memory. That is expected for now. (See the stretch goals if it
  bothers you.)

## How to work through this

1. Re-read the Context lesson in the portal. This README will not repeat it.
2. Build the context and provider first, before you touch the navbar or the
   login form.
3. Wrap the app in `layout.js` and confirm nothing breaks.
4. Wire the login form. Prove the fetch works by logging the user to the console
   (`console.log`) before you worry about showing it anywhere.
5. Last, surface the user: the greeting in the navbar, then the email and
   address on the home page.

## Styling

Use Tailwind. The starter is already styled, you mostly just need to drop the
user's details into the spots that are waiting for them.

## Checklist before you call it done

✅ Clicking Log in goes to a page with a single user ID field.

✅ Submitting a valid ID (1 to 10) fetches that user and returns you to the home page.

✅ The navbar greets you by name, for example "Hi, Leanne Graham".

✅ The home page shows the user's email and their street and city.

✅ Before login, the app shows a sensible "not logged in" state instead of crashing.

✅ No errors in the browser console.

## If you finish early

- Add a **Log out** button that clears the user from the context.
- Persist the user in `localStorage` so a refresh keeps you logged in.
- Show a **loading** state while the fetch is in flight, and disable the submit
  button so nobody double clicks.
- Handle a **bad ID** gracefully (remember, the API returns `{}` for IDs that do
  not exist) and show a friendly message instead of a blank profile.

## Key concepts to review

- [`createContext`](https://react.dev/reference/react/createContext) and the
  Provider component.
- [`useContext`](https://react.dev/reference/react/useContext) for reading shared
  state.
- A custom **provider component** that owns state and wraps your app.
- [`useState`](https://react.dev/reference/react/useState) for holding the user.
- [`useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router)
  from `next/navigation` for the redirect after login.
- [Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
  and the `'use client'` directive.
- [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) for
  pulling the user from the API.

## Delivering the lab

Work in groups of the size your teacher set. Everyone opens a Pull Request and
shares the link in the students portal. If you deploy to Vercel, drop the live
URL in there too.
