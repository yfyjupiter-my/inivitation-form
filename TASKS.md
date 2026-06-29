# Invitation Page — Action Tasks

## 1. Wire up real RSVP submission (line 569)

- [x] 1.1 Choose a form backend (Formspree, Netlify Forms, or custom endpoint) and obtain the submission URL
- [x] 1.2 Replace the fake `setTimeout` delay with a real `fetch()` POST to that endpoint, passing `name`, `guests`, `arrive`, `attend` as JSON or form-encoded body
- [x] 1.3 Move the DOM update block (show confirm, hide form, spawn confetti) into the `fetch` `.then()` success handler
- [x] 1.4 Add a `.catch()` handler that re-enables the button, removes the `loading` class, and shows an inline error message to the user
- [x] 1.5 Test submission end-to-end and verify data appears in the backend dashboard

## 2. Cancel in-flight submit on navigation (line 583)

- [x] 2.1 Declare `let pendingSubmit = null` at the top of the script (near the existing `slider` reference)
- [x] 2.2 In `submitRsvp`, assign `pendingSubmit = setTimeout(…)` instead of calling `setTimeout` directly
- [x] 2.3 Add `clearTimeout(pendingSubmit); pendingSubmit = null;` at the top of `editRsvp()`
- [x] 2.4 Add the same `clearTimeout` call at the top of `goToInvite()`
- [x] 2.5 Inside the timeout callback, add an early-exit guard: `if (!pendingSubmit) return;` then clear it — ensures a stale callback is a no-op even if clearTimeout races

## 3. Skip guest-count validation when declining (line 577)

- [x] 3.1 Wrap the `gNum` validation block so it only runs when `attend === 'yes'`
- [x] 3.2 Optionally hide the guest count and arrival time fields from the UI when "Regretfully declines" is selected (add a `change` listener on the radio group)
- [x] 3.3 Confirm a declining user can submit with only their name filled in

## 4. Fix animation-restart reflow loop (line 616)

- [x] 4.1 Replace the single-pass `forEach` with a two-pass approach:
  - Pass 1: set `el.style.animation = 'none'` for all matched elements
  - Single flush: read `confirmEl.offsetHeight` once
  - Pass 2: reset `el.style.animation = ''` for all matched elements
- [x] 4.2 Verify confirm-screen entrance animations play correctly on first submit and on re-submit after editing

## 5. Fix duplicate CSS custom properties (line 25)

- [x] 5.1 Change `--card-bg` to `var(--surface)`, `--card-accent` to `var(--accent)`, `--card-text` to `var(--text)`, `--card-muted` to `var(--text-muted)`
- [x] 5.2 Visually verify the card renders identically after the change
- [x] 5.3 Confirm that updating a base variable (e.g. `--accent`) now propagates to the card without a second edit

## 6. Add qrcode.png fallback (line 475)

- [x] 6.1 Add `onerror="this.style.display='none'"` to the `<img>` element so a missing file hides the broken-image icon cleanly
- [x] 6.2 (Optional) Add a visible text fallback or map link below the image that appears only when the image fails, so guests still have a way to find the location
- [x] 6.3 Test with the file present and with the file renamed/removed to confirm both states look correct

## 7. Fix radio inputs hidden with display:none — builder.html

- [x] 7.1 Replace `display: none` on `.style-opt input`, `.rsvp-attend-opt input`, and ornament picker inputs with the visually-hidden pattern already used in `index.html` (position absolute, opacity 0, width/height 1px, clip, white-space nowrap)
- [x] 7.2 Add `input:focus-visible + .style-thumb`, `input:focus-visible + .rsvp-attend-label`, and `input:focus-visible + .style-thumb` focus ring rules matching the existing pattern
- [x] 7.3 Verify all pickers are fully operable by keyboard (Tab to reach, arrow keys to change selection)

## 8. Associate editor labels with their controls — builder.html

- [x] 8.1 Add `for="tag"` to the Event type `<label>` (line 633)
- [x] 8.2 Add `for="title"` to the Title / Names `<label>` (line 638)
- [x] 8.3 Add `for="subtitle"` to the Subtitle `<label>` (line 643)
- [x] 8.4 Add `for="date"` and `for="year"` to the Date and Year `<label>` elements (lines 655–660)
- [x] 8.5 Add `for="time"` and `for="dress"` to the Time and Dress code `<label>` elements (lines 664–669)
- [x] 8.6 Add `for="venue"` and `for="address"` to the Venue name and Address `<label>` elements (lines 673–678)
- [x] 8.7 Add `for="message"` to the Personal message `<label>` (line 681)

## 9. Make color swatches keyboard accessible — builder.html

- [x] 9.1 Add `role="button"`, `tabindex="0"`, and `title` already present is sufficient as label — confirm it reads correctly in VoiceOver/NVDA
- [x] 9.2 Add `onkeydown` handler to each swatch: call `setScheme(...)` when `Enter` or `Space` is pressed
- [x] 9.3 Optionally refactor swatches to `<button>` elements to get keyboard support for free and remove the manual role/tabindex/keydown

## 10. Fix RSVP error not announced to screen readers — index.html

- [x] 10.1 Add `role="alert"` to `#rsvp-error` (line 534) so it is announced by screen readers when shown
- [x] 10.2 Confirm the error message is also visible and announced on the first failed fetch attempt

## 11. Move focus to success state after RSVP submit — both files

- [x] 11.1 In `index.html` `submitRsvp()`, after showing `#rsvp-confirm`, call `document.getElementById('success-title').focus()` (add `tabindex="-1"` to `#success-title`)
- [x] 11.2 Apply the same fix in `builder.html` `submitRsvp()`
- [x] 11.3 Verify with keyboard-only navigation: after submit, focus lands on the success heading without needing Tab presses

## 12. Hide decorative elements from screen readers — both files

- [x] 12.1 Add `aria-hidden="true"` to every `.ornament-icon` `<span>` in both files (♡, ✦, etc.)
- [x] 12.2 Add `aria-hidden="true"` to `#confetti-wrap` in both files
- [x] 12.3 Add `aria-hidden="true"` to `#success-icon` SVG in both files (the adjacent text already conveys the result)
- [x] 12.4 Add `aria-hidden="true"` to `.cards-connector` in builder.html (already present — confirm it's correct)

## 13. Respect prefers-reduced-motion — both files

- [x] 13.1 Add a `@media (prefers-reduced-motion: reduce)` block in both files that sets `transition: none` and `animation: none` on `.slider`, `.card-rsvp-btn`, `.rsvp-submit`, `.success-icon`, `.rsvp-confirm > *`, `.confetti-wrap span`, and `.step-dot`
- [x] 13.2 Test by enabling "Reduce motion" in OS accessibility settings and confirming the slide, confetti, and fade-up animations are suppressed

## 14. Wrap RSVP fields in a form element — index.html

- [x] 14.1 Wrap the RSVP field group and submit button in `<form onsubmit="submitRsvp(); return false;">`
- [x] 14.2 Change `<button class="rsvp-submit" onclick="submitRsvp()">` to `<button type="submit" class="rsvp-submit">` and remove the `onclick`
- [x] 14.3 Verify pressing Enter inside any RSVP input now triggers submission

## 15. Add ARIA step indicators to the progress stepper — index.html

- [x] 15.1 Add `role="list"` to `.stepper` and `role="listitem"` to each `.step`
- [x] 15.2 Add `aria-current="step"` to the active `.step` element on page load
- [x] 15.3 Update `setStep()` to toggle `aria-current="step"` as the active step changes
- [x] 15.4 Add an `aria-label="Progress"` or visually hidden heading above the stepper to give the landmark a name

## 16. Promote main event title to a heading — both files

- [x] 16.1 In `index.html`, change `<div class="card-title">Sarah &amp; James</div>` to `<h1 class="card-title">` and update the CSS selector if needed
- [x] 16.2 In `builder.html`, change `<div id="card-title" class="card-title">` to `<h1 id="card-title" class="card-title">`
- [x] 16.3 Confirm heading hierarchy: `h1` for the names, then `h2` for "Will you be joining us?" in the RSVP card (change `.rsvp-card-title` div to `<h2>`)

## 17. Fix Attendance radio group structure — builder.html RSVP preview

- [x] 17.1 Replace `<div class="rsvp-field"><label class="rsvp-label">Attendance</label>` (line 811) with `<fieldset class="rsvp-field" style="border:none;padding:0;min-width:0"><legend class="rsvp-label">Attendance</legend>` to match the corrected structure in `index.html`
- [x] 17.2 Verify screen readers announce the group label when focusing the radio buttons
