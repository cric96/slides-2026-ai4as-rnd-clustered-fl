<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  click?: number
}>()

const currentStep = computed(() => Math.min(Math.max(0, props.click ?? 0), 3))
</script>

<template>
  <div
    class="het-wrapper"
    :data-step="currentStep"
    role="img"
    aria-label="Incremental diagram of heterogeneous client network showing IID within clusters and Non-IID across clusters"
  >
    <div class="het-canvas">
      <img
        src="/figures/heterogeneity.png"
        alt="Network of clients grouped into 4 latent clusters"
        class="het-base-img"
      />

      <!-- Overlay backdrop for dimming during spotlights -->
      <div class="het-dimmer" aria-hidden="true" />

      <!-- Step 0: Initial overview tag -->
      <div class="het-pill pill-overview" :class="{ 'is-active': currentStep === 0 }">
        <span class="pill-dot" />
        <span>4 latent regions · Non-IID deployment</span>
      </div>

      <!-- Step 1: IID within cluster highlight -->
      <div class="spotlight-box spot-iid" :class="{ 'is-active': currentStep === 1 }">
        <span class="spot-label">IID</span>
      </div>
      <div class="callout-card card-iid" :class="{ 'is-active': currentStep === 1 }">
        <div class="card-tag tag-green">
          <span class="tag-icon">✔</span>
          <strong>IID within region</strong>
        </div>
        <p>Clients share data distributions — local updates align and reinforce each other.</p>
      </div>

      <!-- Step 2: Non-IID across clusters highlight -->
      <div class="spotlight-box spot-non-iid" :class="{ 'is-active': currentStep === 2 }">
        <span class="spot-label label-orange">Non-IID</span>
      </div>
      <div class="callout-card card-non-iid" :class="{ 'is-active': currentStep === 2 }">
        <div class="card-tag tag-orange">
          <span class="tag-icon">✖</span>
          <strong>Non-IID across regions</strong>
        </div>
        <p>Distributions diverge — averaging conflicting updates degrades standard FedAvg.</p>
      </div>

      <!-- Step 3: Four latent clusters revealed -->
      <div class="cluster-badge badge-purple" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 1</span>
      </div>
      <div class="cluster-badge badge-green" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 2</span>
      </div>
      <div class="cluster-badge badge-orange" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 3</span>
      </div>
      <div class="cluster-badge badge-blue" :class="{ 'is-active': currentStep === 3 }">
        <span>Cluster 4</span>
      </div>

      <div class="takeaway-pill" :class="{ 'is-active': currentStep === 3 }">
        <span class="takeaway-spark">★</span>
        <span>Goal: discover the 4 latent clusters unsupervised</span>
      </div>
    </div>

    <!-- Stepper bar below the visual -->
    <div class="het-stepper" aria-hidden="true">
      <div class="step-indicator" :class="{ current: currentStep === 0, past: currentStep > 0 }">
        <span class="step-num">1</span>
        <span class="step-txt">Network</span>
      </div>
      <span class="step-sep">→</span>
      <div class="step-indicator" :class="{ current: currentStep === 1, past: currentStep > 1 }">
        <span class="step-num">2</span>
        <span class="step-txt">IID (local)</span>
      </div>
      <span class="step-sep">→</span>
      <div class="step-indicator" :class="{ current: currentStep === 2, past: currentStep > 2 }">
        <span class="step-num">3</span>
        <span class="step-txt">Non-IID (cross)</span>
      </div>
      <span class="step-sep">→</span>
      <div class="step-indicator" :class="{ current: currentStep === 3 }">
        <span class="step-num">4</span>
        <span class="step-txt">Clusters</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.het-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
}

.het-canvas {
  position: relative;
  width: 100%;
  border: 1px solid var(--deck-line);
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.05);
}

.het-base-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: filter var(--deck-dur-long) var(--deck-ease-out);
}

/* Subtle dimmer when spotlighting */
.het-dimmer {
  position: absolute;
  inset: 0;
  background: rgba(16, 32, 43, 0.32);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out);
}

.het-wrapper[data-step="1"] .het-dimmer,
.het-wrapper[data-step="2"] .het-dimmer {
  opacity: 1;
}

/* Overview pill (Step 0) */
.pill-overview {
  position: absolute;
  top: 0.45rem;
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--deck-line);
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(16, 32, 43, 0.08);
  font-family: var(--deck-font-mono);
  font-size: 0.52rem !important;
  color: var(--deck-ink);
  white-space: nowrap;
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
}

.pill-overview.is-active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.pill-dot {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: var(--deck-teal);
}

/* Spotlight boxes */
.spotlight-box {
  position: absolute;
  border-radius: 8px;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.25rem 0.35rem;
}

.spot-label {
  font-family: var(--deck-font-mono);
  font-size: 0.5rem !important;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  background: var(--deck-green);
  color: #fff;
  letter-spacing: 0.05em;
}

.spot-label.label-orange {
  background: var(--deck-orange);
}

.spot-iid {
  left: 38%;
  top: 62%;
  width: 34%;
  height: 34%;
  border: 2px solid var(--deck-green);
  background: color-mix(in oklch, var(--deck-green) 14%, transparent);
  box-shadow: 0 0 16px color-mix(in oklch, var(--deck-green) 50%, transparent);
}

.spot-non-iid {
  left: 68%;
  top: 62%;
  width: 30%;
  height: 34%;
  border: 2px solid var(--deck-orange);
  background: color-mix(in oklch, var(--deck-orange) 14%, transparent);
  box-shadow: 0 0 16px color-mix(in oklch, var(--deck-orange) 50%, transparent);
}

.spotlight-box.is-active {
  opacity: 1;
}

/* Callout Cards */
.callout-card {
  position: absolute;
  z-index: 3;
  width: 12.5rem;
  padding: 0.45rem 0.6rem;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(16, 32, 43, 0.16);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
}

.card-iid {
  left: 0.6rem;
  top: 0.6rem;
  border-left: 3px solid var(--deck-green);
}

.card-non-iid {
  right: 0.6rem;
  top: 0.6rem;
  border-left: 3px solid var(--deck-orange);
}

.callout-card.is-active {
  opacity: 1;
  transform: translateY(0);
}

.card-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.18rem;
  font-size: 0.62rem !important;
  letter-spacing: 0.02em;
}

.tag-green strong { color: var(--deck-green); }
.tag-orange strong { color: var(--deck-orange); }

.tag-icon {
  display: grid;
  place-items: center;
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 50%;
  color: #fff;
  font-size: 0.5rem !important;
  font-weight: 700;
}

.tag-green .tag-icon { background: var(--deck-green); }
.tag-orange .tag-icon { background: var(--deck-orange); }

.callout-card p {
  margin: 0;
  color: var(--deck-muted);
  font-size: 0.57rem !important;
  line-height: 1.3;
}

/* Step 3: Cluster Badges */
.cluster-badge {
  position: absolute;
  z-index: 3;
  padding: 0.18rem 0.45rem;
  border-radius: 14px;
  font-family: var(--deck-font-mono);
  font-size: 0.54rem !important;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.14);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
}

.cluster-badge.is-active {
  opacity: 1;
  transform: scale(1);
}

.badge-purple {
  left: 28%;
  top: 14%;
  color: #5a189a;
  background: #f5edfd;
  border: 1.5px solid #7b2cbf;
}

.badge-green {
  left: 17%;
  top: 50%;
  color: #1d4e41;
  background: #edf7f4;
  border: 1.5px solid #2f6b5b;
}

.badge-orange {
  left: 48%;
  top: 68%;
  color: #9a5302;
  background: #fef6eb;
  border: 1.5px solid #d97706;
}

.badge-blue {
  left: 70%;
  top: 24%;
  color: #0a343f;
  background: #edf5f7;
  border: 1.5px solid #0f4c5c;
}

/* Step 3: Takeaway pill */
.takeaway-pill {
  position: absolute;
  bottom: 0.45rem;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.65rem;
  background: color-mix(in oklch, var(--deck-teal) 95%, #ffffff);
  color: #ffffff;
  border-radius: 20px;
  font-size: 0.54rem !important;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(15, 76, 92, 0.28);
  opacity: 0;
  transition: opacity var(--deck-dur-long) var(--deck-ease-out), transform var(--deck-dur-long) var(--deck-ease-out);
  pointer-events: none;
  z-index: 4;
}

.takeaway-pill.is-active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.takeaway-spark {
  color: var(--deck-orange);
  font-size: 0.72rem !important;
}

/* Stepper bar */
.het-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.28rem 0.55rem;
  background: rgba(16, 32, 43, 0.04);
  border: 1px solid var(--deck-line);
  border-radius: 4px;
}

.step-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  opacity: 0.45;
  transition: opacity 0.25s ease, color 0.25s ease;
}

.step-indicator.past {
  opacity: 0.75;
}

.step-indicator.current {
  opacity: 1;
}

.step-num {
  display: grid;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--deck-line);
  color: var(--deck-ink);
  font-family: var(--deck-font-mono);
  font-size: 0.52rem !important;
  font-weight: 700;
  transition: background 0.25s ease, color 0.25s ease;
}

.step-indicator.current .step-num {
  background: var(--deck-teal);
  color: #ffffff;
}

.step-indicator.past .step-num {
  background: color-mix(in oklch, var(--deck-teal) 30%, var(--deck-line));
  color: var(--deck-teal);
}

.step-txt {
  font-family: var(--deck-font-mono);
  font-size: 0.52rem !important;
  color: var(--deck-muted);
}

.step-indicator.current .step-txt {
  color: var(--deck-ink);
  font-weight: 600;
}

.step-sep {
  color: var(--deck-muted);
  font-size: 0.58rem;
  opacity: 0.4;
}
</style>
