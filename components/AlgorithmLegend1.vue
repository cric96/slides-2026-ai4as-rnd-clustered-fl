<script setup lang="ts">
import { computed } from 'vue'
import MathTex from './MathTex.vue'

const props = defineProps<{ click?: number }>()
const currentClick = computed(() => props.click ?? 0)

function getStepClass(index: number) {
  // If user clicked past all 4 steps (e.g. click >= 4), keep all active
  if (currentClick.value >= 4) {
    return 'is-active is-all-done'
  }
  if (currentClick.value === index) {
    return 'is-active'
  }
  if (currentClick.value > index) {
    return 'is-past'
  }
  return 'is-future'
}
</script>

<template>
  <div class="alg-legend-container" role="region" aria-label="Algorithm 1 execution steps">
    <div class="alg-legend-grid">

      <!-- Step 1 -->
      <div class="step-card card-teal" :class="getStepClass(0)">
        <div class="step-header">
          <span class="step-badge badge-teal">1</span>
          <span class="step-title">Local Training</span>
        </div>
        <p class="step-desc">
          Train local RND predictor <MathTex math="\hat{f}_i" /> on private data <MathTex math="\mathcal{B}_i" />
        </p>
      </div>

      <!-- Step 2 -->
      <div class="step-card card-green" :class="getStepClass(1)">
        <div class="step-header">
          <span class="step-badge badge-green">2</span>
          <span class="step-title">Broadcast</span>
        </div>
        <p class="step-desc">
          Exchange predictor weights <MathTex math="\hat{f}_i" /> — never raw data samples
        </p>
      </div>

      <!-- Step 3 -->
      <div class="step-card card-orange" :class="getStepClass(2)">
        <div class="step-header">
          <span class="step-badge badge-orange">3</span>
          <span class="step-title">Cross-Novelty</span>
        </div>
        <p class="step-desc">
          Compute cross-novelty <MathTex math="s_{ij} = \mathrm{MSE}(\hat{f}_j, f)" /> locally on private data
        </p>
      </div>

      <!-- Step 4 -->
      <div class="step-card card-teal" :class="getStepClass(3)">
        <div class="step-header">
          <span class="step-badge badge-teal">4</span>
          <span class="step-title">Novelty Row</span>
        </div>
        <p class="step-desc">
          Send novelty vector <MathTex math="s_i = (s_{i1}, \dots, s_{iN})" /> to server
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.alg-legend-container {
  width: 100%;
  margin-top: 0.65rem;
}

.alg-legend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
}

.step-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  padding: 0.45rem 0.6rem;
  transition: all 280ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(16, 32, 43, 0.04);
}

.card-teal { border-top: 3px solid var(--deck-teal); }
.card-green { border-top: 3px solid var(--deck-green); }
.card-orange { border-top: 3px solid var(--deck-orange); }

.step-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}

.step-badge {
  display: grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.72rem;
  flex-shrink: 0;
  transition: transform 250ms ease;
}

.badge-teal { background: var(--deck-teal); }
.badge-green { background: var(--deck-green); }
.badge-orange { background: var(--deck-orange); }

.step-title {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--deck-ink);
  letter-spacing: 0.02em;
}

.step-desc {
  margin: 0;
  font-size: 0.64rem !important;
  color: var(--deck-muted);
  line-height: 1.28;
}

/* ─── Spotlight States ─── */
.step-card.is-future {
  opacity: 0.32;
  filter: grayscale(40%);
  border-top-color: var(--deck-line);
}

.step-card.is-past {
  opacity: 0.75;
  filter: grayscale(10%);
}

.step-card.is-active {
  opacity: 1;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(16, 32, 43, 0.1);
}

.step-card.card-teal.is-active {
  background: color-mix(in oklch, var(--deck-teal) 4%, #ffffff);
  border-color: rgba(15, 76, 92, 0.4);
  border-top-color: var(--deck-teal);
}

.step-card.card-green.is-active {
  background: color-mix(in oklch, var(--deck-green) 4%, #ffffff);
  border-color: rgba(47, 107, 91, 0.4);
  border-top-color: var(--deck-green);
}

.step-card.card-orange.is-active {
  background: color-mix(in oklch, var(--deck-orange) 4%, #ffffff);
  border-color: rgba(217, 119, 6, 0.45);
  border-top-color: var(--deck-orange);
}

.step-card.is-active .step-badge {
  transform: scale(1.1);
}
</style>
