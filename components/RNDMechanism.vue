<template>
  <div class="rnd-mechanism">
    <div class="input-set">
      <span class="sample familiar">local x</span>
      <span class="sample novel">novel x′</span>
    </div>
    <div class="arrow">→</div>
    <div class="networks">
      <div class="network target"><span>f</span><small>random target<br><b>frozen</b></small></div>
      <div class="network predictor"><span>f̂</span><small>predictor<br><b>trained locally</b></small></div>
    </div>
    <div class="arrow">→</div>
    <div class="errors">
      <div class="error low"><strong>low error</strong><small>familiar distribution</small></div>
      <div class="error high"><strong>high error</strong><small>different distribution</small></div>
    </div>
  </div>
</template>

<style scoped>
.rnd-mechanism { display: grid; grid-template-columns: .75fr auto 1.35fr auto 1fr; gap: .8rem; align-items: center; }
.input-set, .errors, .networks { display: grid; gap: .6rem; }
.sample, .error, .network { background: #fff; border: 1px solid rgba(16,32,43,.13); padding: .65rem .75rem; }
.sample { text-align: center; font-family: 'IBM Plex Mono', monospace; font-size: .78rem !important; font-weight: 600; }
.familiar { border-left: 4px solid var(--deck-teal); color: var(--deck-teal); }
.novel { border-left: 4px solid var(--deck-orange); color: #9a5302; }
.networks { grid-template-columns: 1fr 1fr; }
.network { min-height: 5.5rem; display: grid; place-items: center; text-align: center; }
.network span { width: 2rem; height: 2rem; display: grid; place-items: center; border-radius: 50%; font-family: serif; font-size: 1.1rem !important; font-weight: 700; color: white; }
.target span { background: var(--deck-muted); }
.predictor span { background: var(--deck-teal); }
.network small, .error small { display: block; color: var(--deck-muted); font-size: .65rem; line-height: 1.2; }
.network b { color: var(--deck-ink); }
.error strong { display: block; margin-bottom: .2rem; }
.low { border-left: 4px solid var(--deck-green); }
.low strong { color: var(--deck-green); }
.high { border-left: 4px solid var(--deck-orange); }
.high strong { color: #9a5302; }
.arrow { color: var(--deck-orange); font-size: 1.4rem !important; font-weight: 600; }
</style>
