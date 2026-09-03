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

# Reference

<div class="split-grid domain-grid">

<div class="static-points">

- Consider a **traffic forecasting** scenario with multiple roadside cameras.
- Their local worlds are visibly <u>different</u>: queues, steady flow, event surges, and fast sparse traffic.
- The goal is to **merge what the cameras learn**, then reuse the resulting model wherever those patterns recur.
- Raw video remains **private, regulated, or too heavy to move**: only learning can travel.

<div class="value-strip">
  <span class="value-label">The systems question:</span>
  How can one merged model carry experience back to every junction without <u>centralizing</u> observations?
</div>

</div>

<TrafficDomain :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

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

# One global model meets several different worlds

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

# Clustered FL reuses models across compatible junctions

<ClusteredFL :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

<p class="centered-claim">Compatible junctions <strong>merge updates into one specialized model</strong>, then reuse it wherever that traffic recurs.</p>

<div class="inline-note center-note cfl-catch"><strong>The catch:</strong> how do you cluster clients when their data can never be observed?</div>

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
    <div class="card-text"><strong>Assume K is known.</strong><br>Every client evaluates all <i>K</i> full task models at every round, then joins the best one.</div>
  </div>
  <div class="comparison-card">
    <div class="card-title">Self-FL / PSFL</div>
    <div class="card-text"><strong>Let groups emerge.</strong><br>Peers exchange full task models and estimate compatibility via pairwise validation losses.</div>
  </div>
  <div class="comparison-card highlight">
    <div class="card-title">Two coupled costs</div>
    <div class="card-text"><strong>Clustering cost:</strong> discovery must repeat throughout training. <strong>Proxy cost:</strong> every similarity estimate runs on expensive full task models.</div>
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

# Discover collaborators before task training

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Novelty as a proxy</h3>
    <p>Import <strong>Random Network Distillation</strong> from reinforcement learning: a tiny model whose prediction error measures how "familiar" some data is — a cheap signal of distribution compatibility.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">02</div>
    <h3>Decoupled discovery</h3>
    <p>Exchange <strong>small auxiliary predictors once</strong> — or periodically — instead of re-evaluating the full task model at every training round.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">03</div>
    <h3>Emergent federations</h3>
    <p>Derive groups from pairwise novelty, so the <strong>number of clusters is not fixed in advance</strong>: it emerges from the observed compatibility.</p>
  </div>
</div>

<p class="centered-claim">The resulting pre-clustering phase is <strong>task-agnostic</strong> and can precede any standard FL algorithm.</p>

</div>

<!-- [Sources]
Contributions: supplied manuscript, Abstract and Introduction.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# RND asks: does this input look familiar?

<RNDMechanism />

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <h3>A fixed random target</h3>
    <p>One randomly initialized network <strong>never trains</strong>: it defines an arbitrary but fixed "representation task" on the input.</p>
  </div>
  <div class="contribution-item green-top">
    <h3>A local predictor</h3>
    <p>A small companion network is trained <strong>only on the client's own data</strong> to mimic the frozen target.</p>
  </div>
  <div class="contribution-item orange-top">
    <h3>Error = novelty</h3>
    <p>The predictor learns what its camera usually sees: <strong>low error on familiar data</strong>, <span class="u-solid-orange">high error on anything different</span>.</p>
  </div>
</div>

<p class="centered-claim">No data exchange needed: novelty is computed <strong>locally</strong>, from prediction error alone.</p>

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

# Novelty becomes a compatibility test

<div class="score-layout">
  <div class="score-definition">
    <span class="eyebrow">Client <i>i</i> evaluates predictor <i>j</i> on its own data</span>
    <div class="score-equation">Each camera runs <strong>every peer's predictor</strong> on its private frames and keeps one number per pair: the prediction error.</div>
  </div>
  <div class="compatibility-axis">
    <div class="axis-label compatible">
      <strong>error ≈ own error</strong>
      <span>predictor <i>j</i> finds client <i>i</i>'s data familiar</span>
      <b>compatible distributions → same federation</b>
    </div>
    <div class="axis-line"><span class="axis-dot" /></div>
    <div class="axis-label divergent">
      <strong>error ≫ own error</strong>
      <span>predictor <i>j</i> finds client <i>i</i>'s data novel</span>
      <b>different distributions → separate federations</b>
    </div>
  </div>
</div>

<div class="threshold-strip">
  <span class="value-label">Adaptive rule</span>
  A peer is compatible if its error stays close to the client's own error — no fixed <i>K</i>: the observed matrix decides how many federations emerge.
</div>

</div>

<!-- [Sources]
Pairwise novelty score and adaptive compatibility threshold: supplied manuscript, Novelty Driven Clustering section.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# The overall loop: discover first, then train

<FlowDiagram
  :click="$clicks"
  :stages="[
    { label: 'Exchange RND predictors', sub: 'tiny auxiliary models' },
    { label: 'Score peers locally', sub: 'novelty on private data' },
    { label: 'Build compatibility graph', sub: 'one error per pair' },
    { label: 'Extract federations', sub: 'no preset K' },
    { label: 'Train per federation', sub: 'standard FedAvg inside' },
  ]"
/>
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" /><div v-click="4" class="click-marker" /><div v-click="5" class="click-marker" />

<div class="three-up">
  <div class="contribution-item teal-top">
    <h3>Discovery phase</h3>
    <p>Runs on the <strong>small RND predictors</strong>, completely decoupled from the task model.</p>
  </div>
  <div class="contribution-item green-top">
    <h3>Training phase</h3>
    <p>Each federation trains independently with <strong>any standard FL algorithm</strong>.</p>
  </div>
  <div class="contribution-item orange-top">
    <h3>Optional refresh</h3>
    <p>In stationary settings discover <strong>once</strong>; if the deployment drifts, re-cluster every <i>τ</i> rounds.</p>
  </div>
</div>

</div>

<!-- [Sources]
Overall methodology loop: supplied manuscript, Methodology and Novelty Driven Clustering sections.
-->

---
layout: default
class: code-slide
---

<div class="slide-shell algorithm-slide">

# On each device: train once, score every peer

```python {1-2|4|6-8|10}
predictor_i = train_rnd(B_i, shared_target)
send(predictor_i)

predictors = receive_all_predictors()

for j, predictor_j in enumerate(predictors):
    s_i[j] = mean_squared_error(
        predictor_j(B_i), shared_target(B_i))

send_novelty_row(s_i)
```

<div class="algorithm-legend">
  <span><b>1.</b> fit a compact local proxy on private data</span>
  <span><b>2.</b> exchange predictors — not samples</span>
  <span><b>3.</b> evaluate every peer on private data</span>
  <span><b>4.</b> report one score per pair</span>
</div>

</div>

<!-- [Sources]
Pseudocode adapted from Algorithm 1, Device-Side RND Novelty Estimation, in the supplied manuscript.
-->

---
layout: default
class: code-slide
---

<div class="slide-shell algorithm-slide">

# On the server: cluster, then run standard FL

```python {1-3|4-7|9|10-11}
for round in training:
    if round == 0 or round % tau == 0:
        predictors = collect_and_distribute_predictors()

        rows = collect_novelty_rows()
        S = build_novelty_matrix(rows)
        federations = extract_federations(S, epsilon)

    for federation in federations:
        run_federated_learning(federation)
```

<div class="algorithm-legend three-legend">
  <span><b>Discover</b> at round 0, before task training starts</span>
  <span><b>Refresh</b> every τ rounds only if the deployment drifts</span>
  <span><b>Train</b> independently inside each federation</span>
</div>

<div class="decoupling-callout">Clustering and task learning now run on <strong>different schedules</strong> and with <strong>different models</strong>.</div>

</div>

<!-- [Sources]
Pseudocode adapted from Algorithm 2, Server-Side RND-Based Federation Discovery, in the supplied manuscript.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# The experiment isolates clustered feature skew

<div class="three-up contribution-row">
  <div class="contribution-item teal-top">
    <div class="contribution-number">01</div>
    <h3>Decentralized setup</h3>
    <p><strong>CIFAR-10 benchmark</strong> with <i>N</i> = 12 total devices solving the same 10-class task on private local data.</p>
  </div>
  <div class="contribution-item orange-top">
    <div class="contribution-number">02</div>
    <h3>Clustered feature skew</h3>
    <p><i>k</i> = 4 latent groups (3 devices each) with <strong>distinct Gaussian noise perturbations</strong>: IID within each group, non-IID across.</p>
  </div>
  <div class="contribution-item green-top">
    <div class="contribution-number">03</div>
    <h3>Baselines & rigor</h3>
    <p>Evaluated against <strong>IFCA</strong> (full ResNet-18 task model evaluations), averaged across <strong>10 independent seeds</strong>.</p>
  </div>
</div>

<p class="centered-claim">Ground truth by construction: the 4 groups are known, allowing us to evaluate whether RND <strong>rediscovers the latent structure without ever observing labels</strong>.</p>

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

# RND exposes the four latent groups before task training

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

# RND clustering is about 10× cheaper than IFCA

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

# Collaboration structure becomes an independent system primitive

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
    <h3>No fixed <i>K</i></h3>
    <p>Federations emerge from observed compatibility instead of a predefined cluster count.</p>
  </div>
</div>

<div class="future-grid">
  <div>
    <span class="eyebrow">Current boundary</span>
    <p>Preliminary evidence on 12 CIFAR-10 clients with synthetic feature skew; centralized all-to-all evaluation scales quadratically with the number of clients.</p>
  </div>
  <div>
    <span class="eyebrow">Next</span>
    <p>Larger and real-world sensing deployments, neighborhood-only exchange, adaptive ε, and robustness to Byzantine, Sybil, and masquerade attacks.</p>
  </div>
</div>

<div class="closing-question">When distributions drift, how should the system adapt <strong>ε</strong> and <strong>τ</strong>?</div>

<p class="code-link">Code: github.com/domm99/experiments-2026-uncertainty-based-clustered-fl</p>

</div>

<!-- [Sources]
Conclusions, limitations, future work, and code repository: supplied manuscript, Discussion and Conclusions and Future Work.
-->
