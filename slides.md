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
    <div class="cover-mini-meta">University of Bologna · Trinity College Dublin</div>
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

# Reference scenario: traffic forecasting at city scale

<div class="split-grid domain-grid">

<div class="static-points">

<ul>
  <li>
    Consider a <strong>traffic forecasting</strong> scenario: each roadside camera predicts upcoming vehicle queues and congestion.
  </li>
  <li v-click="1">
    A city contains <strong>diverse traffic regimes</strong>: e.g. congested <em>City Centre</em> vs. fast, sparse <em>Ring Road</em> flow.
  </li>
  <li v-click="2">
    At city scale, <strong>dozens of cameras</strong> run in parallel, but raw video is <strong>private, regulated, and too heavy to centralize</strong>.
  </li>
</ul>

<div v-click="2" class="value-strip">
  <span class="value-label">The systems question:</span>
  How can one merged model carry experience back to every junction without <u>centralizing</u> observations?
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

# Federated learning - the standard approach

> a distributed learning paradigm where clients train a shared model collaboratively without sharing their raw data.

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

# Federated learning struggles with non-IID data

<div class="split-grid wide-visual-grid">

<div class="static-points">

- City center, suburb, highway, and event district produce very different **feature distributions**: different cars, speeds, and flow patterns.
- Local updates then optimize **different objectives**, even though every client solves the same task.
- Averaging conflicting updates lowers accuracy and destabilizes convergence: the **non-IID problem**.
- Standard FedAvg is **known to degrade** exactly in this regime.

<div class="inline-note" :class="{ 'highlight-step': ($clicks || 0) >= 1 && ($clicks || 0) <= 2 }">
  <strong>Structure matters:</strong> clients may be IID within a region and non-IID across regions.
</div>

<div class="inline-note angle-note" :class="{ 'highlight-angle': ($clicks || 0) >= 3 }">
  <strong>Our angle:</strong> don't fight heterogeneity — find clusters that follow the data distribution.
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

# Clustered FL specializes models by client group

> Clients with similar data distributions collaborate on one shared model per cluster, instead of being forced into a single global average.

<ClusteredFL :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

<div v-click="2" class="inline-note center-note cfl-catch"><strong>The catch:</strong> how do you cluster clients when their data can never be observed?</div>

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

# The hidden cost is discovering the clusters

<div class="comparison-grid bottleneck-grid">
  <div class="comparison-card">
    <div class="card-title">IFCA</div>
    <div class="card-text"><strong>Assume <MathTex math="K" /> is known.</strong><br>Every client evaluates all <MathTex math="K" /> full task models at every round, then joins the best one.</div>
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
## Discover collaborators before task training

- Instead of evaluating the full task model at every round, we propose a **pre-clustering phase** that runs on **tiny auxiliary predictors**.

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Novelty as a proxy</h3>
    <p>Import <strong>Random Network Distillation</strong> from reinforcement learning: a tiny auxiliary model whose prediction error measures how "familiar" local data is — an ultra-cheap proxy for distribution shift.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">02</div>
    <h3>Decoupled discovery</h3>
    <p>Separate clustering from the primary learning loop: discover once at <MathTex math="r=0" /> (or periodically every <MathTex math="\tau" /> rounds) instead of evaluating full models at every training round.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">03</div>
    <h3>Emergent federations</h3>
    <p>Derive collaboration groups dynamically from observed pairwise novelty, so the <strong>number of clusters is not fixed in advance</strong>: it emerges from data compatibility.</p>
  </div>
</div>

<p class="centered-claim" style="margin-top: 1.4rem;">The resulting pre-clustering phase is <strong>task-agnostic</strong> and can precede any standard FL algorithm.</p>

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

<RNDMechanism />

<p class="centered-claim" style="margin-top: 0.55rem;">
  RND turns a tiny model's <strong>local learning residual</strong> into a distribution fingerprint — without labels, without data sharing, and without task-model training.
</p>

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

## Estimating pairwise distributional divergence without sharing data

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

# RND-based federation discovery

<RNDClusteringPipeline :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

</div>

<!-- [Sources]
Pipeline and compatibility rule: AI4AS_2026.pdf, Section IV-B and Algorithms 1–2.
-->

---
layout: default
class: code-slide
---

<div class="slide-shell algorithm-slide">

# Algorithm 1: device-side novelty estimation

```python {1|2,4|6-8|10}
predictor_i = train_rnd(local_data, shared_target)
send(predictor_i)

predictors = receive_all_predictors()

for j, predictor_j in enumerate(predictors):
    score[j] = mean_squared_error(
        predictor_j(local_data), shared_target(local_data))

send_novelty_row(score)
```

<AlgorithmLegend1 :click="$clicks" />

</div>

<!-- [Sources]
Pseudocode adapted from Algorithm 1, Device-Side RND Novelty Estimation, in the supplied manuscript.
-->

---
layout: default
class: code-slide
---

<div class="slide-shell algorithm-slide">

# Algorithm 2: server-side federation discovery

```python {1-3|5-7|9-10}
for round in training:
    if round == 0 or round % tau == 0:
        predictors = collect_and_distribute_predictors()

        rows = collect_novelty_rows()
        S = build_novelty_matrix(rows)
        federations = extract_federations(S, epsilon)

    for federation in federations:
        run_federated_learning(federation)
```

<AlgorithmLegend2 :click="$clicks" />

</div>

<!-- [Sources]
Pseudocode adapted from Algorithm 2, Server-Side RND-Based Federation Discovery, in the supplied manuscript.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Experimental setup: CIFAR-10 under clustered feature skew

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Decentralized setup</h3>
    <p><strong>CIFAR-10 benchmark</strong> with <MathTex math="N = 12" /> devices solving the same 10-class task on private local data <MathTex math="\mathcal{B}_i" />.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">02</div>
    <h3>Clustered feature skew</h3>
    <p><MathTex math="k = 4" /> latent groups (3 devices each): identical <MathTex math="P_i(y)" />, but distinct feature distributions <MathTex math="P_i(x|y)" /> across groups.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">03</div>
    <h3>Baselines & rigor</h3>
    <p>Evaluated against <strong>IFCA</strong> (full ResNet-18 task model evaluations), averaged across <strong>10 independent seeds</strong>.</p>
  </div>
</div>

<p class="centered-claim">Ground truth by construction (<MathTex math="k=4" /> groups known): allows verifying whether RND <strong>recovers the latent partition without ever observing labels</strong>.</p>

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

# Novelty matrix recovers the latent group structure

<div class="result-pair">
  <div class="paper-figure-shell result-figure">
    <BaseImg src="figures/uncertainty_difference_heatmap.png" alt="Heatmap of self versus cross novelty across twelve devices" class="paper-figure contain" />
  </div>
  <div class="paper-figure-shell result-figure bar-figure">
    <BaseImg src="figures/diagonal_vs_offdiagonal_barplot.png" alt="Mean novelty for own device, same group, and different group" class="paper-figure contain" />
  </div>
</div>

<div class="result-takeaway"><strong>Near-zero blocks on the diagonal</strong> identify compatible devices; novelty rises sharply across group boundaries — the latent partition emerges from pairwise scores alone, with no label and no task training.</div>

</div>

<!-- [Sources]
Visuals and result interpretation: supplied manuscript figures paper/figures/uncertainty_difference_heatmap.png and paper/figures/diagonal_vs_offdiagonal_barplot.png; Discussion section.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell result-slide">

# Clustering overhead: RND vs. IFCA

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
class: end-slide top-slide
transition: fade
---

<div class="slide-shell conclusion-slide">

# Conclusions and future work

<div class="three-up conclusion-row">
  <div class="conclusion-item teal-top">
    <h3>Effective signal</h3>
    <p>RND residuals reveal the latent groups created by clustered feature skew — before any task training happens.</p>
  </div>
  <div class="conclusion-item green-top">
    <h3>Lightweight discovery</h3>
    <p>Small predictors and a separate schedule cut clustering overhead by about an order of magnitude.</p>
  </div>
  <div class="conclusion-item orange-top">
    <h3>Private by design</h3>
    <p>Raw observations stay local; collaboration relies on compact auxiliary predictors and novelty scores.</p>
  </div>
</div>

<div class="future-grid">
  <div>
    <span class="eyebrow">Current boundary</span>
    <p>Preliminary evidence on 12 CIFAR-10 clients with synthetic feature skew; centralized all-to-all evaluation scales quadratically with the number of clients (<MathTex math="\mathcal{O}(N^2)" />).</p>
  </div>
  <div>
    <span class="eyebrow">Next</span>
    <p>Larger and real-world sensing deployments, neighborhood-only exchange, adaptive <MathTex math="\epsilon" />, and robustness to Byzantine, Sybil, and masquerade attacks.</p>
  </div>
</div>

<div style="display: flex; justify-content: center; margin-top: 0.2rem;">
  <QrCard title="Code & Experiments" url="https://github.com/domm99/experiments-2026-uncertainty-based-clustered-fl" :size="3.2" />
</div>

</div>

<!-- [Sources]
Conclusions, limitations, future work, and code repository: supplied manuscript, Discussion and Conclusions and Future Work.
-->
