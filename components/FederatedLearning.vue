<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ click?: number }>()
const phase = computed(() => Math.min((props.click ?? 0) + 1, 4))

const clients = [
  { x: 16, y: 20 },
  { x: 84, y: 20 },
  { x: 16, y: 78 },
  { x: 84, y: 78 },
]
const server = { x: 50, y: 47 }
</script>

<template>
  <div class="fl-explainer">
    <div class="fl-scene" :data-phase="phase">
      <svg class="fl-links" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          v-for="(c, i) in clients"
          :key="i"
          :x1="server.x" :y1="server.y" :x2="c.x" :y2="c.y"
        />
      </svg>

      <span
        v-for="(c, i) in clients"
        :key="`out-${i}`"
        v-show="phase === 1 || phase === 4"
        class="packet out"
        :class="{ repeat: phase === 4 }"
        :style="{
          '--cx': `${c.x}%`,
          '--cy': `${c.y}%`,
          animationDelay: `${(phase === 4 ? 0.75 : 0) + i * 0.16}s`,
        }"
      >ωG</span>
      <span
        v-for="(c, i) in clients"
        :key="`in-${i}`"
        v-show="phase === 3"
        class="packet inn"
        :style="{ '--cx': `${c.x}%`, '--cy': `${c.y}%`, animationDelay: `${i * 0.16}s` }"
      >Δ{{ i + 1 }}</span>

      <div
        v-for="(c, i) in clients"
        :key="`client-${i}`"
        class="fl-client"
        :style="{ left: `${c.x}%`, top: `${c.y}%`, '--receive-delay': `${2.3 + i * 0.16}s` }"
      >
        <span class="client-dot">d{{ i + 1 }}</span>
        <span class="client-sub">private data</span>
        <span class="train-badge">training…</span>
      </div>

      <div class="fl-server" :style="{ left: `${server.x}%`, top: `${server.y}%` }">
        <span class="server-box">SERVER</span>
        <span class="server-sub">{{ phase === 4 ? 'new global model ready' : 'only sees model updates' }}</span>
        <span class="agg-badge">FedAvg → new ωG</span>
      </div>
    </div>

    <div class="fl-steps">
      <div v-for="n in 4" :key="n" class="fl-step" :class="{ active: phase === n, done: phase > n }">
        <span class="num">{{ n }}</span>
        <span v-if="n === 1"><strong>Broadcast</strong><small>server sends the global model to every camera</small></span>
        <span v-else-if="n === 2"><strong>Train locally</strong><small>a few epochs on private frames — data stays put</small></span>
        <span v-else-if="n === 3"><strong>Upload updates</strong><small>only weights/gradients cross the boundary</small></span>
        <span v-else><strong>Aggregate &amp; repeat</strong><small>FedAvg creates a new global model and sends it back to every camera</small></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fl-explainer { display: grid; grid-template-columns: 1.12fr .88fr; gap: 1.25rem; align-items: center; }

.fl-scene {
  position: relative; height: 17rem; overflow: hidden;
  border: 1px solid rgba(16, 32, 43, .12);
  background: linear-gradient(135deg, #f3f8f9, #ffffff);
}
.fl-links { position: absolute; inset: 0; width: 100%; height: 100%; }
.fl-links line { stroke: rgba(15, 76, 92, .25); stroke-width: 1.5; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; }

.fl-client {
  position: absolute; transform: translate(-50%, -50%);
  display: grid; justify-items: center; gap: .18rem; z-index: 2;
}
.client-dot {
  position: relative;
  width: 2.5rem; height: 2.5rem; display: grid; place-items: center;
  border-radius: 50%; border: 2px solid var(--deck-teal); background: #fff;
  color: var(--deck-teal); font-family: 'IBM Plex Mono', monospace;
  font-size: .72rem !important; font-weight: 700; transition: .3s ease;
}
.client-dot::after {
  content: 'ωG';
  position: absolute; right: -.42rem; bottom: -.18rem;
  display: grid; place-items: center; width: 1.18rem; height: .82rem;
  border: 2px solid #fff; border-radius: .22rem;
  background: var(--deck-green); color: #fff;
  font-family: 'IBM Plex Mono', monospace; font-size: .48rem !important;
  opacity: 0;
}
.client-sub { font-size: .58rem !important; color: var(--deck-muted); font-family: 'IBM Plex Mono', monospace; }
.train-badge {
  position: absolute; top: -1.15rem; padding: .1rem .4rem; white-space: nowrap;
  background: var(--deck-orange); color: #fff; font-size: .55rem !important;
  font-family: 'IBM Plex Mono', monospace; font-weight: 600;
  opacity: 0; transform: translateY(4px); transition: .3s ease;
}

.fl-server {
  position: absolute; transform: translate(-50%, -50%);
  display: grid; justify-items: center; gap: .22rem; z-index: 2;
}
.server-box {
  padding: .6rem 1.05rem; background: var(--deck-teal); color: #fff;
  font-weight: 700; font-size: .82rem !important; letter-spacing: .06em;
  transition: .3s ease;
}
.server-sub { font-size: .58rem !important; color: var(--deck-muted); font-family: 'IBM Plex Mono', monospace; text-align: center; }
.agg-badge {
  position: absolute; top: -1.3rem; padding: .12rem .5rem; white-space: nowrap;
  background: var(--deck-green); color: #fff; font-size: .6rem !important;
  font-family: 'IBM Plex Mono', monospace; font-weight: 600;
  opacity: 0; transform: translateY(4px); transition: .3s ease;
}

.packet {
  position: absolute; width: 1.34rem; height: .86rem; border-radius: .22rem;
  display: grid; place-items: center;
  border: 2px solid #fff; box-shadow: 0 1px 5px rgba(16, 32, 43, .18);
  color: #fff; font-family: 'IBM Plex Mono', monospace;
  font-size: .46rem !important; font-weight: 700;
  transform: translate(-50%, -50%); z-index: 3;
}
.packet.out { background: var(--deck-teal); animation: fly-out 1.55s ease-in-out 1 both; }
.packet.out.repeat { background: var(--deck-green); animation-name: fly-out-repeat; }
.packet.inn { background: var(--deck-orange); animation: fly-in 1.55s ease-in-out 1 both; }
@keyframes fly-out {
  0% { left: 50%; top: 47%; opacity: 0; }
  12% { opacity: 1; }
  85% { opacity: 1; }
  100% { left: var(--cx); top: var(--cy); opacity: 0; }
}
@keyframes fly-out-repeat {
  0% { left: 50%; top: 47%; opacity: 0; transform: translate(-50%, -50%) scale(.72); }
  14% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  84% { opacity: 1; }
  100% { left: var(--cx); top: var(--cy); opacity: 0; transform: translate(-50%, -50%) scale(.86); }
}
@keyframes fly-in {
  0% { left: var(--cx); top: var(--cy); opacity: 0; }
  12% { opacity: 1; }
  85% { opacity: 1; }
  100% { left: 50%; top: 47%; opacity: 0; }
}

.fl-scene[data-phase="2"] .client-dot { animation: client-pulse 1.4s ease-in-out infinite; border-color: var(--deck-orange); color: #9a5302; }
.fl-scene[data-phase="2"] .train-badge { opacity: 1; transform: translateY(0); }
@keyframes client-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, .4); }
  55% { box-shadow: 0 0 0 .6rem rgba(217, 119, 6, 0); }
}

.fl-scene[data-phase="4"] .server-box { background: var(--deck-green); animation: server-glow .9s ease-out 1 both; }
.fl-scene[data-phase="4"] .agg-badge { opacity: 1; transform: translateY(0); }
.fl-scene[data-phase="4"] .client-dot {
  border-color: var(--deck-green);
  animation: client-receives .36s var(--receive-delay) ease-out 1 both;
}
.fl-scene[data-phase="4"] .client-dot::after { animation: model-received .36s var(--receive-delay) ease-out 1 both; }
@keyframes server-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(47, 107, 91, .4); }
  55% { box-shadow: 0 0 0 .75rem rgba(47, 107, 91, 0); }
}
@keyframes client-receives {
  from { box-shadow: 0 0 0 0 rgba(47, 107, 91, .32); }
  to { box-shadow: 0 0 0 .28rem rgba(47, 107, 91, .16); }
}
@keyframes model-received {
  from { opacity: 0; transform: translateY(3px) scale(.75); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.fl-steps { display: grid; gap: .48rem; }
.fl-step {
  display: grid; grid-template-columns: 2rem 1fr; gap: .55rem; align-items: center;
  padding: .52rem .65rem; border-left: 4px solid #cbd7dc; background: rgba(255, 255, 255, .72);
  color: var(--deck-muted); transition: .3s ease; opacity: .62;
}
.fl-step .num { display: grid; place-items: center; width: 1.55rem; height: 1.55rem; border-radius: 50%; background: #dbe4e8; font-weight: 700; font-size: .72rem !important; }
.fl-step strong { display: block; color: inherit; }
.fl-step small { display: block; font-size: .66rem; margin-top: .05rem; line-height: 1.25; }
.fl-step.active { opacity: 1; transform: translateX(-.25rem); border-left-color: var(--deck-orange); color: #9a5302; background: var(--deck-orange-soft); }
.fl-step.active .num { background: var(--deck-orange); color: white; }
.fl-step.done { opacity: .9; border-left-color: var(--deck-teal); color: var(--deck-teal); }
.fl-step.done .num { background: var(--deck-teal); color: white; }
</style>
