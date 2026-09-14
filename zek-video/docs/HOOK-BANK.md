# ZEK Agency — the 20-hook bank

Twenty attention structures adapted to the cinematic property walkthrough
service. The machine-readable version, which the code actually uses, is
`src/config/hooks.ts`.

**How to read the status column.**
`READY` — everything the hook asserts is already true and supported by the
service as briefed. Safe to shoot.
`NEEDS EVIDENCE` — the hook's structure implies a fact (an experiment that
happened, a result that was achieved, a change of mind, finished client work on
screen) that has not been supplied. `withHook()` in
`src/config/hook-variants.ts` throws if you try to build a reel on one of
these. Fill in the evidence, flip the status, then use it.

**The rule the whole bank is built on:** the hook has to pay off inside the
video. Curiosity that goes nowhere costs more in trust than it earns in views.
Every row below therefore carries the supporting point the video must actually
deliver.

---

### 1. "Nobody talks about this…" — `h01-nobody-talks` — **READY**
- **Adapted:** *"Nobody talks about the photos you already have."*
- **Opening visual:** White frame, a single still photograph resting slightly off-square.
- **Must deliver:** The photo library a host already owns is the raw material for a film.
- **Evidence required:** None — restates how the service works.

### 2. "For 30 days I tried…" — `h02-30-days` — **NEEDS EVIDENCE**
- **Adapted:** *"For 30 days I only edited photos clients already had."*
- **Opening visual:** A calendar grid of photo thumbnails filling in.
- **Must deliver:** A stated period of working photo-only, and what it showed about pacing.
- **Evidence required:** Connor must actually have run this for 30 days and be able to describe it. Do not use until he confirms the period and the result.

### 3. "Most people are doing [niche] completely wrong…" — `h03-doing-wrong` — **READY**
- **Adapted:** *"Most property videos open on the wrong shot."*
- **Opening visual:** A dull opening frame (a hallway) held one beat too long.
- **Must deliver:** An editorial argument about opening frames, presented as Connor's opinion.
- **Evidence required:** Keep it framed as an opinion about craft. Do **not** assert that most owners are losing bookings — there is no data for that.

### 4. "This feels illegal to know…" — `h04-feels-illegal` — **READY** — *used in Reel 01*
- **Adapted:** *"This feels illegal to know."*
- **Opening visual:** Hard white frame, huge black type, a still sliding in underneath.
- **Must deliver:** A cinematic property film can be made from photos the owner already has — no shoot day.
- **Evidence required:** None. Must be clear it is a figure of speech: nothing unlawful is involved, and the video says plainly that it is simply editing.

### 5. "Here is exactly how I got [result]…" — `h05-exactly-how` — **READY**
- **Adapted:** *"Here is exactly how a photo becomes a film."*
- **Opening visual:** A still with a blue progress line crossing it.
- **Must deliver:** The actual working method, step by step.
- **Evidence required:** Describes process only. Do not swap in a performance result without real figures.

### 6. "You might not agree with this, but…" — `h06-might-not-agree` — **READY** — *used in Reel 02*
- **Adapted:** *"You might not agree with this."*
- **Opening visual:** White frame, type only, then a stack of photographs fanning open.
- **Must deliver:** Your property may not need another photo shoot.
- **Evidence required:** None — framed as opinion and hedged with "may". Must not harden into "you never need a shoot again".

### 7. "If you want more [result], stop doing [action]…" — `h07-stop-doing` — **READY**
- **Adapted:** *"If you want better property content, stop reshooting."*
- **Opening visual:** A camera icon crossed out in blue, then photos filling the frame.
- **Must deliver:** Editing the existing library first is cheaper than commissioning new capture.
- **Evidence required:** Keep the promise at "better content", not "more bookings".

### 8. "Have you ever noticed how…" — `h08-ever-noticed` — **READY** — *used in Reel 03*
- **Adapted:** *"Have you ever noticed how it opens?"*
- **Opening visual:** Two opening frames of the same property, back to back.
- **Must deliver:** The opening shot sets the feeling of the whole property video.
- **Evidence required:** None — an editorial demonstration. Must not claim the opening shot increases bookings.

### 9. "I wish someone told me this earlier…" — `h09-wish-someone-told` — **NEEDS EVIDENCE**
- **Adapted:** *"I wish someone had told me this about property video."*
- **Opening visual:** A single still held, then pushed into slowly.
- **Must deliver:** A specific craft lesson Connor can stand behind in his own voice.
- **Evidence required:** Connor must supply the actual lesson. Placeholder copy must not ship.

### 10. "I've been keeping a secret from you guys…" — `h10-keeping-secret` — **NEEDS EVIDENCE**
- **Adapted:** *"I've been keeping this quiet."*
- **Opening visual:** Black frame wiping to white, revealing a property still.
- **Must deliver:** An actual announcement — a new service, format or capability.
- **Evidence required:** There must be a real thing being announced. Not a pure curiosity gap.

### 11. "Not to flex, but I'm pretty good at [niche]…" — `h11-not-to-flex` — **NEEDS EVIDENCE**
- **Adapted:** *"Not to flex, but this is what I do all day."*
- **Opening visual:** A fast montage of property moments, one beat each.
- **Must deliver:** A demonstration reel that earns the line by being good.
- **Evidence required:** Needs finished ZEK work on screen. Do not run this over placeholder or stock imagery.

### 12. "I was wrong about…" — `h12-was-wrong` — **NEEDS EVIDENCE**
- **Adapted:** *"I was wrong about what makes a property film work."*
- **Opening visual:** A frame that starts on the wrong subject, then corrects.
- **Must deliver:** A genuine change of mind Connor has actually had.
- **Evidence required:** A fabricated reversal is a fabricated personal history.

### 13. "How to instantly improve your…" — `h13-instantly-improve` — **READY**
- **Adapted:** *"How to improve your property listing without a new shoot."*
- **Opening visual:** A listing-style photo grid, one tile lifting out.
- **Must deliver:** A concrete editing change the viewer can see applied.
- **Evidence required:** None. "Instantly" softened to avoid implying a result.

### 14. "This is why your [thing] isn't working…" — `h14-why-not-working` — **READY**
- **Adapted:** *"This is why your property video feels flat."*
- **Opening visual:** A static still held motionless for a beat, then given motion.
- **Must deliver:** A diagnosis about motion and pacing, shown on screen.
- **Evidence required:** Frame as a craft diagnosis, not a claim about the viewer's results.

### 15. "Five mistakes that are costing you…" — `h15-five-mistakes` — **READY**
- **Adapted:** *"Five things that make property video forgettable."*
- **Opening visual:** A counter from five down to one, each with a frame.
- **Must deliver:** Five named, demonstrable craft mistakes.
- **Evidence required:** "Costing you" was removed deliberately — a financial-loss claim needs evidence. Do not restore it.

### 16. "Three must-have items for better [niche]…" — `h16-three-must-have` — **READY**
- **Adapted:** *"Three shots every property film needs."*
- **Opening visual:** Three empty frames filling one at a time.
- **Must deliver:** Three specific shot types, each shown.
- **Evidence required:** None — a craft list.

### 17. "I tried [thing] so you don't have to…" — `h17-so-you-dont` — **NEEDS EVIDENCE**
- **Adapted:** *"I tried every opening shot so you don't have to."*
- **Opening visual:** Rapid cycling through candidate opening frames.
- **Must deliver:** A comparison of opening options and a reasoned pick.
- **Evidence required:** Connor must actually have tested the variants shown. Otherwise use hook 8 instead.

### 18. "Steal my favorite…" — `h18-steal-my` — **READY**
- **Adapted:** *"Steal my favourite property opening."*
- **Opening visual:** One strong opening frame, held, with a blue underline drawing in.
- **Must deliver:** The opening handed over in enough detail to copy.
- **Evidence required:** None — it gives a technique away.

### 19. "We need to talk about…" — `h19-need-to-talk` — **READY** — *built as Reel 01 hook variant C*
- **Adapted:** *"We need to talk about your camera roll."*
- **Opening visual:** A dense grid of photo thumbnails, slowly scrolling.
- **Must deliver:** The unused library is the asset; here is what to do with it.
- **Evidence required:** None.

### 20. "This is what [X] looks like, and this is what [Y] looks like." — `h20-this-vs-that` — **READY** — *built as Reel 01 hook variant B*
- **Adapted:** *"This is the photo. This is the film."*
- **Opening visual:** A split frame — a static still one side, the same scene moving on the other.
- **Must deliver:** A matched before/after on the same property and the same scene.
- **Evidence required:** Requires a real photo and the real finished clip of the **same** scene. Never pair unrelated imagery.

---

## Summary

- **13 ready to use** — 1, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 18, 19, 20
- **6 need evidence first** — 2, 9, 10, 11, 12, 17

The six blocked hooks all fail on the same thing: they assert an experiment, a
history, a reversal, an announcement, or finished work on screen. None of that
was supplied, and none of it was invented to fill the slot.
