---
theme: default
title: 'Discovering Collaboration from Novelty'
titleTemplate: '%s'
colorSchema: light
routerMode: hash
mdc: true
selectable: true
layout: default
class: first-slide
transition: fade
defaults:
  layout: default
  transition: slide-left
---

<div class="cover-center-shell">
  <p class="cover-kicker">AI4AS 2026</p>
  <h1 class="cover-paper-title">Discovering Collaboration<br>from Novelty</h1>
  <h2 class="cover-subtitle">Random Network Distillation for Clustered Federated Learning</h2>
  <div class="cover-rule" />
  <div class="cover-meta-row">
    <div class="cover-mini-meta">Davide Domini · <strong style="color: var(--deck-orange);">Gianluca Aguzzi</strong> · Ivana Dusparic · Danilo Pianini · Mirko Viroli</div>
  </div>
  <div class="cover-affiliations">
    <BaseImg src="figures/logo-unibo.png" alt="Alma Mater Studiorum — Università di Bologna" class="affiliation-logo logo-unibo" />
    <span class="affiliation-divider" aria-hidden="true" />
    <BaseImg src="figures/logo-trinity.png" alt="Trinity College Dublin, The University of Dublin" class="affiliation-logo logo-trinity" />
  </div>
</div>

<!-- [Sources]
Title and author list: supplied manuscript, paper/paper-2026-ai4as-uncertainty-based-clustering.tex.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Reference scenario

## Traffic forecasting at city scale

<div class="split-grid domain-grid">

<div class="static-points">

<ul>
  <li>
    Consider a <strong>traffic forecasting</strong> scenario: each roadside device predicts upcoming vehicle queues from its own camera feed.
  </li>
  <li v-click="1">
    A city contains <strong>diverse traffic regimes</strong>: e.g. congested <em>City Centre</em> vs. fast, sparse <em>Ring Road</em> flow.
  </li>
  <li v-click="2">
    At city scale, <strong>dozens of devices</strong> run in parallel, but raw video is <strong>private, regulated, and too heavy to centralize</strong>.
  </li>
</ul>

<div v-click="2" class="value-strip">
  <span class="value-label">The systems question:</span>
  How can experience gathered at one junction reach the <u>other</u> junctions?
</div>

</div>

<TrafficDomain :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

</div>

</div>

<!-- [Sources]
Scenario adapted from the supplied manuscript's Motivation and Reference Scenario section and the user's outline.
-->

---
layout: default
class: stage-slide top-slide
---

<div class="slide-shell">

# Federated learning - Standard paradigm

> a distributed learning paradigm where devices train a shared model collaboratively without sharing their raw data.

<FederatedLearning :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />


<Cites refs="1" />

</div>

<!-- [Sources]
Federated learning process: supplied manuscript, Background and Related Works.
McMahan et al., Communication-Efficient Learning of Deep Networks from Decentralized Data, AISTATS 2017.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Data heterogeneity

## Federated learning struggles with non-IID data

<div class="split-grid wide-visual-grid">

<div class="static-points">

- Different zones, different **feature distributions**: cars, speeds, flow patterns.
- Local updates then optimize **different objectives**, on the very same task.
- Averaging conflicting updates degrades FedAvg: the **non-IID problem**.

<div class="inline-note angle-note" :class="{ 'highlight-angle': ($clicks || 0) >= 3 }">
  <strong>This work:</strong> average only within groups of devices whose distributions already agree.
</div>

</div>

<HeterogeneityDiagram :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

</div>

<Cites refs="2" />

</div>

<!-- [Sources]
Non-IID discussion and clustered feature skew: supplied manuscript, Background and Related Works.
Visual: supplied manuscript figure paper/figures/subregions.pdf, rasterized without content changes.
Kairouz et al., Advances and Open Problems in Federated Learning, 2021.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Clustered federated learning

## Specializing models by device group

> Devices with similar distributions share one model per cluster, instead of one global average.

<ClusteredFL :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

<div v-click="2" class="inline-note center-note cfl-catch"><strong>The catch:</strong> the groups must be inferred from the data that defines them &mdash; exactly what cannot be observed.</div>

<Cites refs="3,4" />

</div>

<!-- [Sources]
Clustered federated learning framing: supplied manuscript, Background and Related Works.
Ghosh et al., An Efficient Framework for Clustered Federated Learning, 2022.
Domini et al., Decentralized proximity-aware clustering for collective self-federated learning, 2026.
-->

---
layout: default
class: stage-slide top-slide
---

<div class="slide-shell">

# The bottleneck

## Discovering the clusters is the hidden cost

<div class="comparison-grid bottleneck-grid">
  <div class="comparison-card">
    <div class="card-title">IFCA</div>
    <div class="card-text"><strong>Assume <MathTex math="K" /> is known.</strong><br>Every device evaluates all <MathTex math="K" /> full task models at every round, then joins the best one.</div>
  </div>
  <div class="comparison-card">
    <div class="card-title">Self-FL / PSFL</div>
    <div class="card-text"><strong>Let groups emerge.</strong><br>Peers exchange full task models and estimate compatibility via pairwise validation losses.</div>
  </div>
  <div class="comparison-card highlight">
    <div class="card-title">Two coupled costs</div>
    <div class="card-text">
    <ul>
      <li><strong>Clustering cost:</strong> discovery must repeat throughout training.</li>
      <li><strong>Proxy cost:</strong> every similarity estimate runs on expensive full task models.</li>
    </ul>
    </div>
  </div>
</div>

<div class="research-question">
  Can clustered FL remain <span class="mark-teal">effective</span> while making federation discovery <span class="mark-orange">lightweight</span>?
</div>

<Cites refs="3,4" />

</div>

<!-- [Sources]
IFCA and PSFL limitations, clustering and proxy costs: supplied manuscript, Introduction and Motivation sections.
Ghosh et al., 2022; Domini et al., 2026.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Contribution

## Decouple federation discovery from task learning

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Lightweight signal</h3>
    <p>Use compact <strong>RND predictors</strong> as a task-agnostic proxy for distributional compatibility.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">02</div>
    <h3>Decoupled discovery</h3>
    <p>Run discovery <strong>before task learning</strong>, then only periodically when distributions may change.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">03</div>
    <h3>Emergent federations</h3>
    <p>Infer both group membership and the <strong>number of federations</strong> from pairwise novelty.</p>
  </div>
</div>

<p class="centered-claim" style="margin-top: 1.25rem;">A modular pre-clustering phase that can precede <strong>any standard FL algorithm</strong>.</p>

</div>

<!-- [Sources]
Contributions: supplied manuscript, Abstract and Introduction.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Random Network Distillation

## Prediction error as a novelty signal

<RNDMechanism :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

<Cites refs="5" />

</div>

<!-- [Sources]
RND mechanism: supplied manuscript, Random Network Distillation section.
Burda et al., Exploration by Random Network Distillation, ICLR 2019.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# From novelty to compatibility

## Estimating pairwise distributional divergence from cross-evaluated predictors

<CompatibilityRule />

</div>

<!-- [Sources]
Pairwise novelty score and adaptive compatibility threshold: supplied manuscript, Novelty Driven Clustering section.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Federation discovery

## Inside one RND phase, end to end

<RNDClusteringPipeline :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

</div>

<!-- [Sources]
Pipeline and compatibility rule: AI4AS_2026.pdf, Section IV-B and Algorithms 1–2.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Discovery is decoupled from task learning

## Cluster once — or every τ rounds — then train as usual

<CadenceDiagram :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

</div>

<!-- [Sources]
End-to-end flow and decoupling principle: supplied manuscript, Abstract and Introduction.
Re-clustering cadence: supplied manuscript, Clustering Frequency paragraph and Algorithm 2.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Experimental setup

## CIFAR-10 under clustered feature skew

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Decentralized setup</h3>
    <p><strong>CIFAR-10 benchmark</strong> with <MathTex math="N = 12" /> devices solving the same 10-class task on local data <MathTex math="\mathcal{B}_i" />.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">02</div>
    <h3>Clustered feature skew</h3>
    <p><MathTex math="k = 4" /> latent groups (3 devices each): identical <MathTex math="P_i(y)" />, but a <strong>different Gaussian noise</strong> per group shifts <MathTex math="P_i(x|y)" />.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">03</div>
    <h3>Baseline</h3>
    <p>Evaluated against <strong>IFCA</strong> (full ResNet-18 task model evaluations), averaged across <strong>10 independent seeds</strong>.</p>
  </div>
</div>

<p class="centered-claim">The <MathTex math="k = 4" /> groups are fixed by construction, so the recovered partition can be scored <strong>directly against ground truth</strong>.</p>

<Cites refs="6,7,8" />

</div>

<!-- [Sources]
Experimental setup: supplied manuscript, Experimental Evaluation.
Visual: supplied manuscript figure paper/figures/heterogeneity.png.
CIFAR-10: Krizhevsky and Hinton, 2009. ProFed: Domini et al., 2026. ResNet-18: He et al., 2016.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell result-slide">

# Results

## Novelty matrix recovers the latent group structure

<div class="result-pair">
  <div class="paper-figure-shell result-figure">
    <BaseImg src="figures/uncertainty_difference_heatmap.png" alt="Heatmap of self versus cross novelty across twelve devices" class="paper-figure contain" />
  </div>
  <div class="paper-figure-shell result-figure bar-figure">
    <BaseImg src="figures/diagonal_vs_offdiagonal_barplot.png" alt="Mean novelty for own device, same group, and different group" class="paper-figure contain" />
  </div>
</div>

<div class="result-takeaway"><strong>Near-zero blocks on the diagonal</strong> mark devices from the same group; novelty rises sharply at every group boundary, reproducing the <MathTex math="k = 4" /> partition used to build the benchmark.</div>

</div>

<!-- [Sources]
Visuals and result interpretation: supplied manuscript figures paper/figures/uncertainty_difference_heatmap.png and paper/figures/diagonal_vs_offdiagonal_barplot.png; Discussion section.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell result-slide">

# Results

## Clustering overhead: RND vs. IFCA

<div class="split-grid timing-grid">
  <div class="paper-figure-shell timing-figure">
    <BaseImg src="figures/cumulative_time.png" alt="Cumulative clustering time for RND schedules and IFCA" class="paper-figure contain" />
  </div>
  <div class="timing-readout">
    <div class="timing-point"><strong>Small proxy</strong><span>RND uses a two-layer CNN rather than the full ResNet-18 task model.</span></div>
    <div class="timing-point"><strong>Different cadence</strong><span>Stationary settings cluster once; changing settings re-cluster periodically.</span></div>
    <div class="timing-point accent"><strong>Conservative case</strong><span>Even RND at every round remains roughly 10× cheaper than IFCA here.</span></div>
    <p class="method-qualifier">Machine-time on Intel i7-8700K, 64 GB RAM, NVIDIA RTX 4070; 10 seeds.</p>
  </div>
</div>

</div>

<!-- [Sources]
Visual and hardware details: supplied manuscript figure paper/figures/cumulative_time.pdf and Experimental Evaluation section.
Claim wording follows the manuscript: "about one order of magnitude lower" in the every-round comparison.
-->

---
layout: default
class: end-slide
transition: fade
---

<div class="slide-shell conclusion-slide">

# Conclusions

## Clustered FL stays effective while discovery becomes cheap

<div class="closing-claims">
  <div class="conclusion-item teal-top">
    <span class="eyebrow">Effective</span>
    <h3>Novelty recovers the latent groups</h3>
    <p>RND residuals reproduce the <MathTex math="k = 4" /> partition from feature skew alone — and the number of federations <strong>emerges</strong> instead of being fixed a priori.</p>
  </div>
  <div class="conclusion-item green-top">
    <span class="eyebrow">Lightweight</span>
    <h3>An order of magnitude below IFCA</h3>
    <p>A 2-layer predictor plus a decoupled cadence. Only predictor weights and novelty rows are exchanged — <strong>never the local samples</strong>.</p>
  </div>
</div>

<div class="open-grid">
  <div>
    <span class="eyebrow">Scale</span>
    <p>All-to-all evaluation is <MathTex math="\mathcal{O}(N^2)" />; a decentralized version restricts exchange to neighborhoods.</p>
  </div>
  <div>
    <span class="eyebrow">Realism</span>
    <p>Beyond 12 devices and synthetic skew: larger, real-world sensing deployments.</p>
  </div>
  <div>
    <span class="eyebrow">Robustness</span>
    <p>Self-adaptive <MathTex math="\epsilon" />, and Byzantine, Sybil, and masquerade attacks.</p>
  </div>
</div>

<div class="closing-cta">
  <QrCard title="Code & Experiments" url="https://github.com/domm99/experiments-2026-uncertainty-based-clustered-fl" :size="3.2" />
  <p>Discovery is a <strong>modular pre-clustering phase</strong>: it can precede any standard FL algorithm.</p>
</div>

</div>

<!-- [Sources]
Conclusions, limitations, future work, and code repository: supplied manuscript, Discussion and Conclusions and Future Work.
-->
