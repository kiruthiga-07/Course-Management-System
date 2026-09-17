# EduTrack — React Conversion (Task 6)

This is your existing static `FrontEnd` project (HTML + `app.css` + `app.js`
+ `js/`) converted into a Vite + React app, with the presentation layer
moved to React while every bit of existing JavaScript logic and localStorage
data keeps working unchanged.

## How this differs from the Task 6 document you were given

The doc was written against a different project layout (snake_case file
names like `add_course.html`, `course_details.html`, one CSS file per page,
one JS file per page). Your actual project is EduTrack: kebab-case file
names, a single shared `app.css` and `app.js`, plus a `js/` folder with
`api.js`, `state.js`, `validation.js`, `ui.js`, `auth.js` and three
page-specific modules under `js/pages/`. Everything below was adapted to
match your real files — nothing was renamed or restructured on your end.

## What's in here

```
react-frontend/
├── public/
│   ├── css/app.css                  ← your original stylesheet, untouched
│   └── legacy/js/                   ← all your original .js files, untouched
│       ├── app.js, api.js, state.js, validation.js, ui.js, auth.js
│       └── pages/student-login.js, student-register.js, reset-password.js
├── src/
│   ├── auth/AuthContext.jsx         ← see note below
│   ├── components/
│   │   ├── Navbar.jsx               ← 6 variants: home/courses/course/admin/student/notifications
│   │   ├── Footer.jsx               ← identical on every page, so fully shared
│   │   ├── PageCss.jsx              ← injects <link> for app.css
│   │   ├── LegacyScript.jsx         ← loads legacy scripts in order, then fires
│   │   │                              DOMContentLoaded/load once (see below)
│   │   └── CourseCard.jsx           ← reusable card matching app.js's own markup
│   ├── pages/                       ← 15 pages, one per original .html file
│   ├── App.jsx                      ← routes (see note below)
│   └── main.jsx
├── make_react_pages.py              ← the converter that generated src/pages/
│                                        (kept here for reference/re-runs)
├── package.json
└── vite.config.js
```

Your original `FrontEnd` folder is untouched — this is a new, separate
project alongside it.

## Running it

```
cd react-frontend
npm install
npm run dev
```

Vite will print a local address (usually `http://localhost:5173/`). I also
ran `npm install` and `npm run build` here already to confirm the whole
project compiles cleanly with no errors.

## Notes on the trickier adaptations

**Routing matches `app.js`'s own page-detection logic.** Your `app.js`
figures out which page it's on like this (near the top of the file):

```js
EduTrack.currentPage = (function () {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file.replace(/\.html$/i, '') || 'index';
})();
```

That's purely based on the URL's last path segment, so every route is
registered twice in `App.jsx` — once clean (`/courses`) and once with the
original filename (`/courses.html`) — so `EduTrack.pages['courses']` etc.
still get picked correctly no matter which form the current URL takes
(relative redirects like `window.location.href = "student-login.html"`
resolve to `/student-login.html` from any single-segment route, since none
of your pages are nested).

**`LegacyScript` loads multiple scripts in order.** Most pages only need
`app.js`, but `student-login.html`, `student-register.html` and
`reset-password.html` load six scripts in a specific order
(`api.js → state.js → validation.js → ui.js → auth.js → pages/<page>.js`).
`LegacyScript` accepts a `srcs` array and loads them sequentially, firing
`DOMContentLoaded`/`load` only once, after the last one — so the legacy
code's `document.addEventListener('DOMContentLoaded', ...)` pattern still
works exactly once per page.

**`AuthContext` mirrors your real storage keys, it doesn't replace them.**
Your session state already lives in localStorage (`edutrack_current_student`
written by `js/api.js`, `isAdminVerified` written by `app.js`). I wired
`AuthContext`/`useAuth()` to read those same keys rather than inventing new
ones — logging in/out is still entirely handled by your existing
`auth.js`/`api.js`. This context is available for any new React UI that
wants to know "is someone logged in", without creating a second, competing
source of truth.

**`CourseCard` isn't wired into the Courses page.** Your real course list
(search, admin-added/edited courses, per-field grids) is rendered by
`EduTrack.pages['courses']` in `app.js`, reading from `EduTrackData` /
localStorage — that's where the actual functionality lives. `CourseCard.jsx`
mirrors the exact markup `app.js` builds via `courseCardHTML()`, so it's a
ready-made reusable component if/when course rendering itself moves into
React state — but I didn't force it into `Courses.jsx` today, because that
would have silently dropped search/edit/admin functionality that only
exists in the legacy JS.

**One known limitation: the `edit-course.html` admin gate.** In the
original site, `app.js` includes this check, which runs synchronously the
moment the script executes, before the rest of the page paints:

```js
if (EduTrack.currentPage === 'edit-course') {
    if (localStorage.getItem('isAdminVerified') !== 'true') {
        window.location.replace('admin-schema-login.html');
    }
}
```

In the React version, `app.js` is loaded via `LegacyScript` after the
`EditCourse` component has already mounted and rendered, so there can be a
brief flash of the (empty) edit form before the redirect fires — instead of
being blocked before any content paints, like in the static site. The
redirect still happens and the page is still protected; it's just no longer
instantaneous. If you want this fully synchronous again, the fix is to add
a small route guard in `App.jsx` that checks `isAdminVerified` before
rendering `<EditCourse />`, but I left the legacy behavior as-is per "don't
change the existing JS logic."

**Two small, safe fixes made during conversion** (not functional changes,
just things that would otherwise fail to compile or render correctly):
- `viewBox` and a few other camelCase-only SVG attributes get lowercased by
  HTML parsing; the converter restores the correct casing so icons render.
- `student-dashboard.html` had a duplicate `display` key in one inline
  `style` attribute (harmless in HTML/CSS, but illegal in a JS object
  literal) — deduplicated, keeping the last value, same as CSS would.

## `make_react_pages.py`

This is the converter I used to turn your 15 original `.html` files into
`src/pages/*.jsx`, adapted from the one in the Task 6 doc but pointed at
your actual file names, your shared `app.css`, and the correct per-page
script lists. It's included in case you add a new page later and want to
regenerate rather than hand-write the JSX (note: re-running it will
overwrite `src/pages/`, so the Navbar/Footer wiring done by hand in
`Home.jsx`, `Courses.jsx`, `CourseDetails.jsx`, `AdminDashboard.jsx`,
`StudentDashboard.jsx` and `Notifications.jsx` would need to be redone).
