<script setup lang="ts">
import MathTex from './MathTex.vue'
</script>

<template>
  <div class="cadence-diagram-root" role="region" aria-label="Decoupled training cadence diagram">
    
    <!-- ════════ TIER 1: CONVENTIONAL CLUSTERED FL ════════ -->
    <div class="paradigm-card conventional-card">
      <div class="paradigm-header">
        <span class="badge-coupled">COUPLED BASELINE</span>
        <span class="paradigm-title">Conventional Clustered FL (e.g. IFCA, PSFL)</span>
        <span class="cost-tag cost-high">
          Cost = <MathTex math="R \times \mathcal{O}(\text{Heavy Task Model})" />
        </span>
      </div>

      <div class="timeline-track-wrapper">
        <div class="timeline-row-conventional">
          <!-- Round 0 -->
          <div class="conv-round-cell">
            <span class="round-num"><MathTex math="r=0" /></span>
            <div class="conv-block">
              <span class="op-eval">Task Eval</span>
              <span class="op-train">FL Step</span>
            </div>
          </div>
          <span class="conv-arrow">→</span>

          <!-- Round 1 -->
          <div class="conv-round-cell">
            <span class="round-num"><MathTex math="r=1" /></span>
            <div class="conv-block">
              <span class="op-eval">Task Eval</span>
              <span class="op-train">FL Step</span>
            </div>
          </div>
          <span class="conv-arrow">→</span>

          <!-- Round 2 -->
          <div class="conv-round-cell">
            <span class="round-num"><MathTex math="r=2" /></span>
            <div class="conv-block">
              <span class="op-eval">Task Eval</span>
              <span class="op-train">FL Step</span>
            </div>
          </div>
          <span class="conv-arrow">→</span>

          <!-- Ellipsis -->
          <div class="conv-ellipsis">
            <span>⋯</span>
            <small>Repeated every round</small>
          </div>
          <span class="conv-arrow">→</span>

          <!-- Round R -->
          <div class="conv-round-cell">
            <span class="round-num"><MathTex math="r=R" /></span>
            <div class="conv-block">
              <span class="op-eval">Task Eval</span>
              <span class="op-train">FL Step</span>
            </div>
          </div>
        </div>

        <div class="conv-annotation">
          <span class="warning-bullet">⚠️</span>
          <span>Every device cross-evaluates all <MathTex math="K" /> full task models at <strong>every single training round</strong>. High communication and compute overhead.</span>
        </div>
      </div>
    </div>

    <!-- ════════ TIER 2: OUR DECOUPLED RND PARADIGM ════════ -->
    <div class="paradigm-card decoupled-card">
      <div class="paradigm-header">
        <span class="badge-decoupled">OUR APPROACH</span>
        <span class="paradigm-title">RND-Based Decoupled Discovery (Algorithms 1 & 2)</span>
        <span class="cost-tag cost-low">
          Cost = <MathTex math="\frac{R}{\tau} \times \mathcal{O}(\text{Tiny RND}) + R \times \text{FedAvg}" />
        </span>
      </div>

      <div class="timeline-track-wrapper">
        <div class="timeline-row-decoupled">

          <!-- Round 0: Initial RND Discovery -->
          <div class="dec-pulse-cell pulse-teal">
            <div class="round-badge-row">
              <span class="round-tag-teal"><MathTex math="r = 0" /></span>
              <span class="pulse-label">INITIAL DISCOVERY</span>
            </div>
            <div class="pulse-body">
              <strong>RND Phase (Alg. 1 + 2)</strong>
              <span>Tiny auxiliary models <MathTex math="\hat{f}_i" /></span>
              <span class="sub-detail">Build matrix <MathTex math="S" /> → Partition <MathTex math="\mathcal{F}_q" /></span>
            </div>
          </div>

          <!-- Transition Arrow -->
          <div class="flow-connector">
            <svg viewBox="0 0 28 20" class="flow-svg">
              <path d="M 2 10 H 20" fill="none" stroke="var(--deck-teal)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 17 5 L 26 10 L 17 15 Z" fill="var(--deck-teal)" />
            </svg>
            <span class="connector-tag">Formed <MathTex math="\mathcal{F}_q" /></span>
          </div>

          <!-- Rounds 1 .. tau - 1: Fast Isolated FedAvg -->
          <div class="dec-span-cell span-green">
            <div class="span-header">
              <span class="round-range"><MathTex math="r = 1, \; 2, \; \dots, \; \tau - 1" /></span>
              <span class="zero-overhead-tag">✓ ZERO DISCOVERY OVERHEAD</span>
            </div>
            <div class="span-body">
              <strong>Isolated Task Federated Learning (FedAvg)</strong>
              <p>Each discovered federation <MathTex math="\mathcal{F}_q" /> trains independently. No cross-cluster communication, no model evaluation.</p>
            </div>
          </div>

          <!-- Transition Arrow -->
          <div class="flow-connector">
            <svg viewBox="0 0 28 20" class="flow-svg">
              <path d="M 2 10 H 20" fill="none" stroke="var(--deck-orange)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 17 5 L 26 10 L 17 15 Z" fill="var(--deck-orange)" />
            </svg>
            <span class="connector-tag">If drift</span>
          </div>

          <!-- Round tau: Optional Re-clustering -->
          <div class="dec-pulse-cell pulse-orange">
            <div class="round-badge-row">
              <span class="round-tag-orange"><MathTex math="r = \tau, \; 2\tau, \dots" /></span>
              <span class="pulse-label-orange">PERIODIC</span>
            </div>
            <div class="pulse-body">
              <strong>Re-Clustering (Alg. 1 + 2)</strong>
              <span>Triggered every <MathTex math="\tau" /> rounds</span>
              <span class="sub-detail">Re-cluster only if non-stationary</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ════════ TIER 3: THREE KEY TAKEAWAYS ════════ -->
    <div class="cadence-takeaways">
      <div class="takeaway-card">
        <span class="takeaway-icon">🎯</span>
        <div class="takeaway-text">
          <strong>Stationary Distributions (<MathTex math="\tau \to \infty" />)</strong>
          <span>One-shot discovery at round 0: all subsequent rounds operate at pure FedAvg cost with zero clustering penalty.</span>
        </div>
      </div>

      <div class="takeaway-card">
        <span class="takeaway-icon">⚡</span>
        <div class="takeaway-text">
          <strong>Non-Stationary Concept Drift</strong>
          <span>Interval <MathTex math="\tau" /> smoothly regulates tracking responsiveness without restarting task model optimization.</span>
        </div>
      </div>

      <div class="takeaway-card">
        <span class="takeaway-icon">🛡️</span>
        <div class="takeaway-text">
          <strong>Task-Agnostic Auxiliary Models</strong>
          <span>Discovery operates on lightweight 2-layer CNNs (<MathTex math="< 1\%" /> task model footprint) without labels or task weights.</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.cadence-diagram-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.35rem;
}

/* ─── Cards Base ─── */
.paradigm-card {
  border-radius: 7px;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  padding: 0.55rem 0.8rem;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.04);
}

.conventional-card {
  background: #fafbfc;
  border-color: rgba(16, 32, 43, 0.14);
}

.decoupled-card {
  background: #ffffff;
  border-color: rgba(15, 76, 92, 0.4);
  box-shadow: 0 3px 12px rgba(15, 76, 92, 0.08);
}

.paradigm-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
}

.badge-coupled {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: rgba(16, 32, 43, 0.1);
  color: var(--deck-ink);
}

.badge-decoupled {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: var(--deck-teal);
  color: #ffffff;
}

.paradigm-title {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--deck-ink);
  flex: 1;
}

.cost-tag {
  font-size: 0.64rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.cost-high {
  background: rgba(194, 65, 12, 0.08);
  color: #c2410c;
  border: 1px solid rgba(194, 65, 12, 0.2);
}

.cost-low {
  background: rgba(15, 76, 92, 0.08);
  color: var(--deck-teal);
  border: 1px solid rgba(15, 76, 92, 0.25);
  font-weight: 700;
}

/* ─── Tier 1: Conventional Timeline ─── */
.timeline-row-conventional {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.conv-round-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  flex: 1;
}

.round-num {
  font-size: 0.64rem;
  font-weight: 700;
  color: var(--deck-muted);
}

.conv-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.5px solid rgba(194, 65, 12, 0.35);
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
}

.op-eval {
  background: rgba(194, 65, 12, 0.12);
  color: #c2410c;
  font-size: 0.56rem;
  font-weight: 700;
  padding: 0.15rem;
  text-align: center;
  border-bottom: 1px dashed rgba(194, 65, 12, 0.3);
}

.op-train {
  background: #ffffff;
  color: var(--deck-ink);
  font-size: 0.54rem;
  padding: 0.15rem;
  text-align: center;
}

.conv-arrow {
  color: var(--deck-muted);
  font-weight: 700;
  font-size: 0.8rem;
}

.conv-ellipsis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.8;
  color: var(--deck-muted);
}

.conv-ellipsis span {
  font-size: 1rem;
  letter-spacing: 0.1em;
  line-height: 1;
}

.conv-ellipsis small {
  font-size: 0.52rem;
  white-space: nowrap;
}

.conv-annotation {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.4rem;
  font-size: 0.62rem;
  color: var(--deck-muted);
  background: rgba(194, 65, 12, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border-left: 3px solid #c2410c;
}

.warning-bullet {
  font-size: 0.75rem;
}

/* ─── Tier 2: Decoupled Timeline ─── */
.timeline-row-decoupled {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.dec-pulse-cell {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1.5px solid;
  padding: 0.4rem 0.6rem;
  flex: 1.25;
}

.pulse-teal {
  border-color: var(--deck-teal);
  background: color-mix(in oklch, var(--deck-teal) 4%, #ffffff);
}

.pulse-orange {
  border-color: var(--deck-orange);
  background: color-mix(in oklch, var(--deck-orange) 4%, #ffffff);
}

.round-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  gap: 0.35rem;
}

.round-tag-teal {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--deck-teal);
  white-space: nowrap;
}

.round-tag-orange {
  font-size: 0.72rem;
  font-weight: 700;
  color: #9a5302;
  white-space: nowrap;
}

.pulse-label {
  font-size: 0.52rem;
  font-weight: 700;
  color: var(--deck-teal);
  letter-spacing: 0.05em;
  background: var(--deck-teal-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.pulse-label-orange {
  font-size: 0.52rem;
  font-weight: 700;
  color: #9a5302;
  letter-spacing: 0.05em;
  background: var(--deck-orange-soft);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.pulse-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.pulse-body strong {
  font-size: 0.72rem;
  color: var(--deck-ink);
}

.pulse-body span {
  font-size: 0.6rem;
  color: var(--deck-muted);
}

.sub-detail {
  font-size: 0.56rem !important;
  font-weight: 600;
  color: var(--deck-ink) !important;
  margin-top: 0.1rem;
}

.flow-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  flex-shrink: 0;
  gap: 0.15rem;
}

.flow-svg {
  width: 2.2rem;
  height: 1.1rem;
  overflow: visible;
}

.connector-tag {
  font-size: 0.52rem;
  font-weight: 600;
  color: var(--deck-muted);
  white-space: nowrap;
}

.dec-span-cell {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1.5px solid var(--deck-green);
  background: color-mix(in oklch, var(--deck-green) 4%, #ffffff);
  padding: 0.4rem 0.75rem;
  flex: 2.2;
}

.span-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.round-range {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--deck-green);
}

.zero-overhead-tag {
  font-size: 0.54rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #1b6840;
  background: rgba(47, 107, 91, 0.14);
  padding: 0.12rem 0.4rem;
  border-radius: 3px;
}

.span-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.span-body strong {
  font-size: 0.74rem;
  color: var(--deck-ink);
}

.span-body p {
  margin: 0;
  font-size: 0.62rem;
  color: var(--deck-muted);
  line-height: 1.3;
}

/* ─── Tier 3: Bottom Takeaways ─── */
.cadence-takeaways {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.takeaway-card {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  background: #ffffff;
  border: 1.5px solid var(--deck-line);
  border-radius: 6px;
  padding: 0.4rem 0.55rem;
  box-shadow: 0 2px 6px rgba(16, 32, 43, 0.03);
}

.takeaway-icon {
  font-size: 0.95rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

.takeaway-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.takeaway-text strong {
  font-size: 0.66rem;
  color: var(--deck-ink);
}

.takeaway-text span {
  font-size: 0.58rem;
  color: var(--deck-muted);
  line-height: 1.28;
}
</style>
