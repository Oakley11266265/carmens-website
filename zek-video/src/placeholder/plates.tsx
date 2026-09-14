/**
 * Code-built graphic plates.
 *
 * WHY THESE EXIST
 * ---------------
 * No property photography or footage could be obtained in this environment:
 * zekagency.com and every stock/asset host tried are denied by the egress
 * proxy, and generated images land on a CDN that is denied too. The brief's
 * stated fallback is "code-built typography or graphic compositions", so each
 * media slot in the three reels is filled by one of these.
 *
 * They are deliberately drawn as line art. They are not photographs, they are
 * not renders of a real address, and nothing here should ever be presented as
 * a client property or a client result. Swap them for real footage via the
 * reel configs — see README.
 *
 * Each plate is a stack of layers with a `z` parallax factor. Layer z=0 is
 * pinned to the frame; higher z moves more under a camera push, which is what
 * gives these stills a sense of depth when the camera moves.
 */
import React from "react";
import { COLORS } from "../brand/tokens";

export type PlateLayer = {
  /** Parallax strength. 0 = locked to frame, 1 = full camera travel. */
  z: number;
  children: React.ReactNode;
};

export type Plate = {
  id: string;
  /** Human label used in the manifest and QC. */
  label: string;
  /** Which fictional demo property this belongs to. */
  property: "Ridgeline" | "Shoreline";
  room: string;
  mood: "light" | "dusk";
  layers: PlateLayer[];
};

const W = 1080;
const H = 1920;

const LINE = COLORS.ink;
const ACCENT = COLORS.blue;

/* ---------------------------------------------------------------- helpers */

const Sky: React.FC<{ from: string; to: string; id: string }> = ({ from, to, id }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
    <rect x={-200} y={-200} width={W + 400} height={H + 400} fill={`url(#${id})`} />
  </>
);

const Sun: React.FC<{ cx: number; cy: number; r: number; fill?: string }> = ({
  cx,
  cy,
  r,
  fill = "#FFE9B8",
}) => <circle cx={cx} cy={cy} r={r} fill={fill} />;

/** A run of horizontal ruled lines — reads as water, dune grass or shadow. */
const Ruled: React.FC<{
  x: number;
  y: number;
  w: number;
  rows: number;
  gap: number;
  color?: string;
  widthScale?: number;
}> = ({ x, y, w, rows, gap, color = LINE, widthScale = 1 }) => (
  <g stroke={color} strokeWidth={2 * widthScale} opacity={0.5}>
    {Array.from({ length: rows }).map((_, i) => (
      <line
        key={i}
        x1={x + (i % 2 === 0 ? 0 : w * 0.12)}
        y1={y + i * gap}
        x2={x + w - (i % 3 === 0 ? w * 0.18 : 0)}
        y2={y + i * gap}
      />
    ))}
  </g>
);

const Hills: React.FC<{ y: number; fill: string; seed?: number }> = ({ y, fill, seed = 0 }) => {
  const p =
    seed === 0
      ? `M-120 ${y + 190} C 100 ${y - 40}, 260 ${y + 120}, 430 ${y + 30} S 760 ${y - 80}, 1200 ${y + 120} L1200 ${H} L-120 ${H} Z`
      : `M-120 ${y + 150} C 180 ${y + 20}, 340 ${y + 170}, 560 ${y + 60} S 900 ${y - 30}, 1200 ${y + 90} L1200 ${H} L-120 ${H} Z`;
  return <path d={p} fill={fill} />;
};

/* ----------------------------------------------------------------- plates */

const ridgelineLiving: Plate = {
  id: "ridgeline-living",
  label: "Ridgeline — living room, glass wall to the valley",
  property: "Ridgeline",
  room: "Living room",
  mood: "light",
  layers: [
    {
      z: 0.08,
      children: (
        <>
          <Sky id="rl-sky" from="#EAF1FF" to="#FFF6E8" />
          <Sun cx={760} cy={560} r={92} />
        </>
      ),
    },
    {
      z: 0.28,
      children: (
        <>
          <Hills y={700} fill="#D7DEEA" seed={0} />
          <Hills y={860} fill="#C3CDDD" seed={1} />
        </>
      ),
    },
    {
      z: 0.5,
      children: (
        <>
          {/* valley floor */}
          <path d={`M-120 1080 C 240 1010, 600 1120, 1200 1030 L1200 ${H} L-120 ${H} Z`} fill="#EFF2F6" />
          <Ruled x={120} y={1120} w={860} rows={5} gap={26} color="#9AA6B8" />
        </>
      ),
    },
    {
      z: 0.72,
      children: (
        <>
          {/* glass wall: mullions */}
          <g stroke={LINE} strokeWidth={9} fill="none">
            <rect x={96} y={330} width={888} height={1090} />
            <line x1={392} y1={330} x2={392} y2={1420} />
            <line x1={688} y1={330} x2={688} y2={1420} />
            <line x1={96} y1={900} x2={984} y2={900} />
          </g>
          <rect x={96} y={330} width={888} height={1090} fill="#FFFFFF" opacity={0.07} />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          {/* floor line + sofa + vase, drawn as clean silhouettes */}
          <line x1={-60} y1={1420} x2={1140} y2={1420} stroke={LINE} strokeWidth={9} />
          <g fill="#0B0B0C">
            <rect x={150} y={1452} width={560} height={118} rx={26} />
            <rect x={150} y={1400} width={80} height={72} rx={18} />
            <rect x={630} y={1400} width={80} height={72} rx={18} />
            <rect x={196} y={1570} width={22} height={64} rx={8} />
            <rect x={642} y={1570} width={22} height={64} rx={8} />
          </g>
          {/* low table */}
          <g fill="none" stroke={LINE} strokeWidth={8}>
            <rect x={766} y={1486} width={200} height={16} rx={8} fill={LINE} />
            <line x1={790} y1={1502} x2={790} y2={1596} />
            <line x1={942} y1={1502} x2={942} y2={1596} />
          </g>
          <path d="M852 1420 q22 -54 0 -96 q-22 42 0 96 Z" fill={ACCENT} />
        </>
      ),
    },
  ],
};

const ridgelineKitchen: Plate = {
  id: "ridgeline-kitchen",
  label: "Ridgeline — kitchen island, morning light",
  property: "Ridgeline",
  room: "Kitchen",
  mood: "light",
  layers: [
    { z: 0.08, children: <Sky id="rk-sky" from="#FFFFFF" to="#F0F3F8" /> },
    {
      z: 0.3,
      children: (
        <>
          {/* window with morning wash */}
          <rect x={132} y={300} width={430} height={640} fill="#EAF1FF" />
          <g stroke={LINE} strokeWidth={9} fill="none">
            <rect x={132} y={300} width={430} height={640} />
            <line x1={347} y1={300} x2={347} y2={940} />
          </g>
          <Sun cx={250} cy={470} r={54} fill="#FFF0CE" />
        </>
      ),
    },
    {
      z: 0.52,
      children: (
        <>
          {/* open shelf + two bowls */}
          <line x1={650} y1={620} x2={1000} y2={620} stroke={LINE} strokeWidth={10} />
          <path d="M700 620 a44 44 0 0 0 88 0 Z" fill={LINE} />
          <path d="M840 620 a36 36 0 0 0 72 0 Z" fill="none" stroke={LINE} strokeWidth={8} />
          {/* light pool on the back wall */}
          <rect
            x={150}
            y={960}
            width={330}
            height={190}
            fill="#F6F1E4"
            opacity={0.7}
            transform="skewX(-14)"
          />
        </>
      ),
    },
    {
      z: 0.8,
      children: (
        <>
          {/* the island */}
          <rect x={96} y={1120} width={904} height={40} rx={10} fill={LINE} />
          <rect x={126} y={1160} width={844} height={340} fill="#FFFFFF" stroke={LINE} strokeWidth={9} />
          <line x1={548} y1={1160} x2={548} y2={1500} stroke={LINE} strokeWidth={6} opacity={0.3} />
          {/* tap */}
          <path
            d="M700 1120 v-176 q0 -46 46 -46 h72"
            fill="none"
            stroke={LINE}
            strokeWidth={12}
            strokeLinecap="round"
          />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          <line x1={-60} y1={1500} x2={1140} y2={1500} stroke={LINE} strokeWidth={9} />
          {/* two stools */}
          <g stroke={LINE} strokeWidth={9} fill="none">
            <ellipse cx={320} cy={1548} rx={74} ry={20} fill={LINE} />
            <line x1={296} y1={1564} x2={286} y2={1688} />
            <line x1={344} y1={1564} x2={354} y2={1688} />
            <ellipse cx={640} cy={1548} rx={74} ry={20} fill={LINE} />
            <line x1={616} y1={1564} x2={606} y2={1688} />
            <line x1={664} y1={1564} x2={674} y2={1688} />
          </g>
          <rect x={860} y={1020} width={14} height={90} fill={ACCENT} />
        </>
      ),
    },
  ],
};

const ridgelineTerrace: Plate = {
  id: "ridgeline-terrace",
  label: "Ridgeline — terrace and lap pool at dusk",
  property: "Ridgeline",
  room: "Terrace",
  mood: "dusk",
  layers: [
    {
      z: 0.08,
      children: (
        <>
          <Sky id="rt-sky" from="#10203F" to="#3E4E74" />
          <circle cx={300} cy={430} r={7} fill="#FFFFFF" opacity={0.8} />
          <circle cx={520} cy={330} r={5} fill="#FFFFFF" opacity={0.6} />
          <circle cx={820} cy={470} r={6} fill="#FFFFFF" opacity={0.7} />
        </>
      ),
    },
    {
      z: 0.3,
      children: (
        <path
          d={`M-120 860 C 160 720, 380 900, 620 800 S 980 700, 1200 820 L1200 1100 L-120 1100 Z`}
          fill="#0B1428"
        />
      ),
    },
    {
      z: 0.56,
      children: (
        <>
          {/* the house, lit from within */}
          <rect x={620} y={640} width={420} height={270} fill="#0B1428" />
          <rect x={666} y={700} width={150} height={160} fill="#FFD9A0" />
          <rect x={856} y={700} width={140} height={160} fill="#FFC77A" />
          <rect x={620} y={630} width={420} height={16} fill={LINE} />
        </>
      ),
    },
    {
      z: 0.82,
      children: (
        <>
          {/* lap pool */}
          <rect x={60} y={1060} width={960} height={520} rx={12} fill="#16294A" />
          <rect
            x={60}
            y={1060}
            width={960}
            height={520}
            rx={12}
            fill="none"
            stroke="#5E79AE"
            strokeWidth={5}
            opacity={0.45}
          />
          <Ruled x={110} y={1150} w={860} rows={7} gap={44} color="#8FA6D6" widthScale={1.6} />
          {/* reflected window light */}
          <rect x={690} y={1120} width={110} height={400} fill="#FFD9A0" opacity={0.22} />
          <rect x={870} y={1120} width={100} height={400} fill="#FFC77A" opacity={0.18} />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          <rect x={-60} y={1580} width={1200} height={400} fill="#070C18" />
          {/* two loungers */}
          <g fill="#FFFFFF" opacity={0.92}>
            <rect x={140} y={1642} width={300} height={26} rx={12} />
            <rect x={140} y={1600} width={90} height={46} rx={12} transform="rotate(-16 185 1623)" />
            <rect x={560} y={1642} width={300} height={26} rx={12} />
            <rect x={560} y={1600} width={90} height={46} rx={12} transform="rotate(-16 605 1623)" />
          </g>
          <rect x={930} y={1470} width={12} height={96} fill={ACCENT} />
        </>
      ),
    },
  ],
};

const shorelineBedroom: Plate = {
  id: "shoreline-bedroom",
  label: "Shoreline — bedroom, open window to the sea",
  property: "Shoreline",
  room: "Bedroom",
  mood: "light",
  layers: [
    { z: 0.08, children: <Sky id="sb-sky" from="#EFF7FF" to="#FFFFFF" /> },
    {
      z: 0.26,
      children: (
        <>
          <rect x={300} y={300} width={520} height={560} fill="#DCEBF8" />
          <rect x={300} y={690} width={520} height={170} fill="#9FC4DE" />
          <Ruled x={330} y={720} w={460} rows={4} gap={34} color="#FFFFFF" widthScale={1.4} />
        </>
      ),
    },
    {
      z: 0.48,
      children: (
        <>
          <g stroke={LINE} strokeWidth={10} fill="none">
            <rect x={300} y={300} width={520} height={560} />
            <line x1={560} y1={300} x2={560} y2={860} />
          </g>
          {/* sheer curtain drifting in */}
          <path
            d="M820 300 q80 220 -18 560 q-62 -286 18 -560 Z"
            fill="#FFFFFF"
            opacity={0.85}
            stroke="#DADFE8"
            strokeWidth={4}
          />
          {/* pendant */}
          <line x1={196} y1={300} x2={196} y2={520} stroke={LINE} strokeWidth={7} />
          <path d="M126 520 h140 l-30 96 h-80 Z" fill="none" stroke={LINE} strokeWidth={9} />
        </>
      ),
    },
    {
      z: 0.82,
      children: (
        <>
          {/* bed */}
          <rect x={130} y={1180} width={820} height={64} rx={16} fill={LINE} />
          <rect x={130} y={1244} width={820} height={300} fill="#FFFFFF" stroke={LINE} strokeWidth={9} />
          {/* folded throw across the foot of the bed */}
          <rect x={130} y={1396} width={820} height={96} fill="#DDE4EE" stroke={LINE} strokeWidth={7} />
          <line x1={130} y1={1444} x2={950} y2={1444} stroke={LINE} strokeWidth={4} opacity={0.4} />
          {/* base shadow */}
          <rect x={168} y={1544} width={744} height={26} rx={13} fill="#C6CEDA" opacity={0.75} />
          {/* pillows */}
          <rect x={196} y={1212} width={230} height={90} rx={26} fill="#FFFFFF" stroke={LINE} strokeWidth={8} />
          <rect x={470} y={1212} width={230} height={90} rx={26} fill="#FFFFFF" stroke={LINE} strokeWidth={8} />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          <line x1={-60} y1={1544} x2={1140} y2={1544} stroke={LINE} strokeWidth={9} />
          <Ruled x={80} y={1600} w={920} rows={3} gap={40} color="#C8CFDA" widthScale={2} />
          <rect x={900} y={1080} width={12} height={92} fill={ACCENT} />
        </>
      ),
    },
  ],
};

const shorelineBath: Plate = {
  id: "shoreline-bath",
  label: "Shoreline — bathroom, freestanding tub under the window",
  property: "Shoreline",
  room: "Bathroom",
  mood: "light",
  layers: [
    { z: 0.08, children: <Sky id="sba-sky" from="#FFFFFF" to="#F2F4F3" /> },
    {
      z: 0.28,
      children: (
        <>
          <rect x={250} y={360} width={580} height={620} fill="#E4EFE8" />
          <path
            d={`M250 860 q60 -70 120 -6 q60 -64 120 0 q60 -64 120 0 q60 -64 120 0 L830 980 L250 980 Z`}
            fill="#B9CFBF"
          />
          <Sun cx={640} cy={520} r={62} fill="#FFFBEA" />
        </>
      ),
    },
    {
      z: 0.5,
      children: (
        <g stroke={LINE} strokeWidth={10} fill="none">
          <rect x={250} y={360} width={580} height={620} />
          <line x1={540} y1={360} x2={540} y2={980} />
        </g>
      ),
    },
    {
      z: 0.84,
      children: (
        <>
          {/* freestanding tub */}
          <path
            d="M230 1260 q0 -52 56 -52 h508 q56 0 56 52 v150 q0 130 -130 130 H360 q-130 0 -130 -130 Z"
            fill="#FFFFFF"
            stroke={LINE}
            strokeWidth={11}
          />
          <path d="M280 1300 h520" stroke="#CFD8DD" strokeWidth={8} />
          <path
            d="M186 1208 v-180 q0 -40 40 -40 h50"
            fill="none"
            stroke={LINE}
            strokeWidth={12}
            strokeLinecap="round"
          />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          <line x1={-60} y1={1540} x2={1140} y2={1540} stroke={LINE} strokeWidth={9} />
          {/* timber stool + folded towel */}
          <g stroke={LINE} strokeWidth={9} fill="none">
            <rect x={840} y={1400} width={170} height={16} fill={LINE} />
            <line x1={866} y1={1416} x2={856} y2={1540} />
            <line x1={984} y1={1416} x2={994} y2={1540} />
          </g>
          <rect x={862} y={1340} width={126} height={58} rx={10} fill="#E9EEF5" stroke={LINE} strokeWidth={6} />
          <rect x={110} y={1444} width={12} height={92} fill={ACCENT} />
        </>
      ),
    },
  ],
};

const shorelineLiving: Plate = {
  id: "shoreline-living",
  label: "Shoreline — living room, fire lit, doorway to the sea",
  property: "Shoreline",
  room: "Living room",
  mood: "light",
  layers: [
    { z: 0.08, children: <Sky id="sl-sky" from="#FBFAF7" to="#EFF0EC" /> },
    {
      z: 0.3,
      children: (
        <>
          {/* doorway through to the sea */}
          <rect x={700} y={420} width={300} height={1080} fill="#DCEBF8" />
          <rect x={700} y={1140} width={300} height={140} fill="#9FC4DE" />
          <Ruled x={716} y={1170} w={268} rows={3} gap={34} color="#FFFFFF" widthScale={1.4} />
          <g stroke={LINE} strokeWidth={11} fill="none">
            <rect x={700} y={420} width={300} height={1080} />
          </g>
        </>
      ),
    },
    {
      z: 0.52,
      children: (
        <>
          {/* plaster chimney breast, running to the floor */}
          <path d="M96 560 h470 v940 h-470 Z" fill="#F4F1EA" stroke={LINE} strokeWidth={11} />
          {/* mantel */}
          <rect x={72} y={900} width={518} height={22} rx={6} fill={LINE} />
          <line x1={96} y1={560} x2={566} y2={560} stroke={LINE} strokeWidth={16} />
          {/* firebox, low and wide, with a lit fire */}
          <rect x={186} y={1080} width={290} height={300} rx={14} fill="#161616" />
          <path
            d="M300 1356 q-26 -86 34 -140 q-8 62 40 34 q52 56 -6 106 Z"
            fill="#FF9A3C"
          />
          <path d="M318 1356 q-12 -44 20 -72 q-4 32 22 16 q26 30 -4 56 Z" fill="#FFD48A" />
          {/* two objects on the mantel */}
          <rect x={150} y={840} width={34} height={60} fill={LINE} />
          <circle cx={264} cy={874} r={26} fill="none" stroke={LINE} strokeWidth={9} />
        </>
      ),
    },
    {
      z: 0.82,
      children: (
        <>
          {/* sofa, angled into the room across the bottom third */}
          <rect x={590} y={1332} width={470} height={132} rx={28} fill="#0B0B0C" />
          <rect x={556} y={1276} width={86} height={80} rx={20} fill="#0B0B0C" />
          <rect x={1006} y={1276} width={86} height={80} rx={20} fill="#0B0B0C" />
          <rect x={676} y={1270} width={104} height={76} rx={16} fill="#E9EEF5" stroke={LINE} strokeWidth={6} />
          <rect x={800} y={1270} width={104} height={76} rx={16} fill="#E9EEF5" stroke={LINE} strokeWidth={6} />
        </>
      ),
    },
    {
      z: 1,
      children: (
        <>
          <line x1={-60} y1={1500} x2={1140} y2={1500} stroke={LINE} strokeWidth={9} />
          {/* jute rug + driftwood table */}
          <ellipse cx={560} cy={1690} rx={440} ry={112} fill="#F0EBDF" stroke={LINE} strokeWidth={6} />
          <rect x={430} y={1606} width={280} height={18} rx={9} fill={LINE} />
          <line x1={464} y1={1624} x2={454} y2={1694} stroke={LINE} strokeWidth={9} />
          <line x1={676} y1={1624} x2={686} y2={1694} stroke={LINE} strokeWidth={9} />
          <rect x={92} y={1548} width={92} height={12} fill={ACCENT} />
        </>
      ),
    },
  ],
};

export const PLATES: Record<string, Plate> = {
  [ridgelineLiving.id]: ridgelineLiving,
  [ridgelineKitchen.id]: ridgelineKitchen,
  [ridgelineTerrace.id]: ridgelineTerrace,
  [shorelineBedroom.id]: shorelineBedroom,
  [shorelineBath.id]: shorelineBath,
  [shorelineLiving.id]: shorelineLiving,
};

export const getPlate = (id: string): Plate => {
  const plate = PLATES[id];
  if (!plate) {
    throw new Error(
      `Unknown plate "${id}". Available: ${Object.keys(PLATES).join(", ")}`,
    );
  }
  return plate;
};

export const PLATE_VIEWBOX = { W, H };
