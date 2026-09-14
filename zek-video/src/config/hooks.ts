/**
 * ZEK Agency hook bank.
 *
 * Twenty attention structures, each adapted to the cinematic property
 * walkthrough service. The structure of the original hook is preserved; the
 * claim inside it is not invented.
 *
 * RULES BAKED INTO THIS FILE
 * --------------------------
 * 1. `evidenceRequired` is not decoration. If it is non-empty, the hook must
 *    not ship until that evidence actually exists. `status: "ready"` means
 *    everything the hook asserts is already true and stated in the brief.
 *    `status: "needs-evidence"` means do not post it yet.
 * 2. Nothing here claims a booking, a view count, a revenue figure, a
 *    timeframe, a price or a testimonial. Those were not supplied, so they are
 *    not asserted.
 * 3. `payoff` is what the video has to actually show. A hook without a payoff
 *    is bait, and bait costs more in trust than it earns in views.
 *
 * Swapping the hook on an existing reel: set `hookId` in the reel config and
 * replace the `hook` scene's lines. Everything after the hook stays identical,
 * which is the point — it makes opening lines comparable.
 */

export type HookEntry = {
  id: string;
  /** The original hook from the bank, verbatim. */
  original: string;
  /** The property-service adaptation, written to be spoken/read in ~2s. */
  adapted: string[];
  /** Optional small line above the hook. */
  kicker?: string;
  /** What the opening frame should show. */
  openingVisual: string;
  /** The claim the rest of the video must deliver. */
  payoff: string;
  /** What must be true (and provable) before this hook can be used. */
  evidenceRequired: string;
  status: "ready" | "needs-evidence";
};

export const HOOK_BANK: HookEntry[] = [
  {
    id: "h01-nobody-talks",
    original: "Nobody talks about this…",
    adapted: ["Nobody talks", "about the", "photos you", "already have."],
    kicker: "Property marketing",
    openingVisual: "White frame, a single still photograph resting slightly off-square.",
    payoff: "The photo library a host already owns is the raw material for a film.",
    evidenceRequired: "None — this restates how the service works.",
    status: "ready",
  },
  {
    id: "h02-30-days",
    original: "For 30 days I tried [experiment in your niche]…",
    adapted: ["For 30 days", "I only edited", "photos clients", "already had."],
    openingVisual: "A calendar grid of photo thumbnails filling in.",
    payoff: "A stated period of working photo-only, and what it showed about pacing.",
    evidenceRequired:
      "Connor must actually have run this for 30 days and be able to describe it. Do not use until he confirms the period and the result.",
    status: "needs-evidence",
  },
  {
    id: "h03-doing-wrong",
    original: "Most people are doing [niche] completely wrong…",
    adapted: ["Most property", "videos open", "on the wrong", "shot."],
    kicker: "An editing opinion",
    openingVisual: "A dull opening frame (a hallway) held one beat too long.",
    payoff:
      "An editorial argument about opening frames, presented as Connor's opinion rather than a measured fact.",
    evidenceRequired:
      "Keep it framed as an opinion about craft. Do not assert that most owners are losing bookings — there is no data for that.",
    status: "ready",
  },
  {
    id: "h04-feels-illegal",
    original: "This feels illegal to know…",
    adapted: ["This feels", "illegal", "to know."],
    kicker: "Property owners",
    openingVisual:
      "Hard white frame, huge black type, one still photograph sliding in underneath.",
    payoff:
      "A cinematic property film can be made from photos the owner already has — no shoot day.",
    evidenceRequired:
      "None. Must be clear it is a figure of speech: nothing unlawful is involved, and the video should say plainly that it is simply editing.",
    status: "ready",
  },
  {
    id: "h05-exactly-how",
    original: "Here is exactly how I got [result]…",
    adapted: ["Here is exactly", "how a photo", "becomes a", "film."],
    openingVisual: "A still photograph with a blue progress line crossing it.",
    payoff: "The actual working method, step by step.",
    evidenceRequired:
      "Describes process only. Do not swap in a performance result (views, bookings, enquiries) without real figures.",
    status: "ready",
  },
  {
    id: "h06-might-not-agree",
    original: "You might not agree with this, but…",
    adapted: ["You might not", "agree with", "this."],
    kicker: "Hosts and agents",
    openingVisual: "White frame, type only, then a stack of photographs fanning open.",
    payoff: "Your property may not need another photo shoot.",
    evidenceRequired:
      "None, because it is framed as an opinion and hedged with 'may'. Must not harden into 'you never need a shoot again'.",
    status: "ready",
  },
  {
    id: "h07-stop-doing",
    original: "If you want more [result], stop doing [action]…",
    adapted: ["If you want", "better property", "content, stop", "reshooting."],
    openingVisual: "A camera icon crossed out in blue, then photos filling the frame.",
    payoff: "Editing the existing library first is cheaper than commissioning new capture.",
    evidenceRequired:
      "Keep the promise at 'better content', not 'more bookings'. A bookings claim needs client data that does not exist yet.",
    status: "ready",
  },
  {
    id: "h08-ever-noticed",
    original: "Have you ever noticed how…",
    adapted: ["Have you", "ever noticed", "how a video", "starts?"],
    kicker: "The opening shot",
    openingVisual: "Two opening frames of the same property shown back to back.",
    payoff: "The opening shot sets the feeling of the whole property video.",
    evidenceRequired:
      "None — this is an editorial demonstration. Must not claim the opening shot increases bookings.",
    status: "ready",
  },
  {
    id: "h09-wish-someone-told",
    original: "I wish someone told me this earlier…",
    adapted: ["I wish someone", "had told me", "this about", "property video."],
    openingVisual: "A single still held, then pushed into slowly.",
    payoff: "A specific craft lesson Connor can stand behind in his own voice.",
    evidenceRequired:
      "Connor must supply the actual lesson and be willing to own it as his experience. Placeholder copy must not ship.",
    status: "needs-evidence",
  },
  {
    id: "h10-keeping-secret",
    original: "I've been keeping a secret from you guys…",
    adapted: ["I've been", "keeping this", "quiet."],
    openingVisual: "Black frame that wipes to white revealing a property still.",
    payoff: "An actual announcement — a new service, format or capability.",
    evidenceRequired:
      "There must be a real thing being announced. Do not use as a pure curiosity gap.",
    status: "needs-evidence",
  },
  {
    id: "h11-not-to-flex",
    original: "Not to flex, but I'm pretty good at [niche]…",
    adapted: ["Not to flex,", "but this is", "what I do", "all day."],
    openingVisual: "A fast cut montage of property moments, each one beat long.",
    payoff: "A demonstration reel that earns the line by simply being good.",
    evidenceRequired:
      "Needs finished ZEK work on screen. Do not run this hook over placeholder or stock imagery.",
    status: "needs-evidence",
  },
  {
    id: "h12-was-wrong",
    original: "I was wrong about…",
    adapted: ["I was wrong", "about what", "makes a property", "film work."],
    openingVisual: "A frame that starts on the wrong subject, then corrects.",
    payoff: "A genuine change of mind Connor has actually had about the craft.",
    evidenceRequired:
      "Connor must supply the real reversal. A fabricated change of mind is a fabricated personal history.",
    status: "needs-evidence",
  },
  {
    id: "h13-instantly-improve",
    original: "How to instantly improve your…",
    adapted: ["How to improve", "your property", "listing without", "a new shoot."],
    openingVisual: "A listing-style photo grid, one tile lifting out.",
    payoff: "A concrete editing change the viewer can see applied.",
    evidenceRequired: "None — it shows a technique. 'Instantly' softened to avoid implying a result.",
    status: "ready",
  },
  {
    id: "h14-why-not-working",
    original: "This is why your [thing] isn't working…",
    adapted: ["This is why", "your property", "video feels", "flat."],
    openingVisual: "A static still held motionless for a beat, then given motion.",
    payoff: "A diagnosis about motion and pacing, shown on screen.",
    evidenceRequired:
      "Frame as a craft diagnosis, not an accusation about the viewer's results. No claim their bookings are suffering.",
    status: "ready",
  },
  {
    id: "h15-five-mistakes",
    original: "Five mistakes that are costing you…",
    adapted: ["Five things", "that make", "property video", "forgettable."],
    openingVisual: "A counter from five down to one, each with a frame.",
    payoff: "Five named, demonstrable craft mistakes.",
    evidenceRequired:
      "'Costing you' was removed deliberately: a financial-loss claim needs evidence. Do not restore it.",
    status: "ready",
  },
  {
    id: "h16-three-must-have",
    original: "Three must-have items for better [niche]…",
    adapted: ["Three shots", "every property", "film needs."],
    openingVisual: "Three empty frames that fill one at a time.",
    payoff: "Three specific shot types, each shown.",
    evidenceRequired: "None — a craft list.",
    status: "ready",
  },
  {
    id: "h17-so-you-dont",
    original: "I tried [thing] so you don't have to…",
    adapted: ["I tried every", "opening shot", "so you", "don't have to."],
    openingVisual: "Rapid cycling through candidate opening frames.",
    payoff: "A comparison of opening options and a reasoned pick.",
    evidenceRequired:
      "Connor must actually have tested the variants being shown. Otherwise use h08 instead.",
    status: "needs-evidence",
  },
  {
    id: "h18-steal-my",
    original: "Steal my favorite…",
    adapted: ["Steal my", "favourite", "property", "opening."],
    openingVisual: "One strong opening frame, held, with a blue underline drawing in.",
    payoff: "The opening handed over in enough detail to copy.",
    evidenceRequired: "None — it gives a technique away.",
    status: "ready",
  },
  {
    id: "h19-need-to-talk",
    original: "We need to talk about…",
    adapted: ["We need to", "talk about", "your camera", "roll."],
    kicker: "Hosts and managers",
    openingVisual: "A dense grid of photo thumbnails, slowly scrolling.",
    payoff: "The unused library is the asset; here is what to do with it.",
    evidenceRequired: "None.",
    status: "ready",
  },
  {
    id: "h20-this-vs-that",
    original: "This is what [X] looks like, and this is what [Y] looks like.",
    adapted: ["This is the", "photo.", "This is the", "film."],
    openingVisual: "A split frame: a static still on one side, the same scene moving on the other.",
    payoff: "A matched before/after on the same property and the same scene.",
    evidenceRequired:
      "Requires a real photo and the real finished clip of the SAME scene. Never pair unrelated imagery.",
    status: "ready",
  },
];

export const getHook = (id: string): HookEntry => {
  const hook = HOOK_BANK.find((h) => h.id === id);
  if (!hook) throw new Error(`Unknown hook id "${id}"`);
  return hook;
};
