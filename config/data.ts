import type { Project, Skill, TimelineItem } from '@/types'

// ── Centralized personal information ─────────────────────────────────────────
export const personalInfo = {
  name: 'Kartikeya Singh',
  title: 'AI/ML Engineer',
  tagline: 'Shipping ML systems to real users — not just demos.',
  email: 'kartikeyay2004@gmail.com',
  phone: '+91 82192 66919',
  location: 'India',
  locationDetail: 'Open to Remote',
  university: 'Bennett University',
  degree: 'B.Tech CS (Data Science)',
  cgpa: '8.34/10',
  graduationYear: '2027',
  currentRole: 'AI Engineer (Contract) @ Orvica Labs',
}

// ── Centralized URLs ──────────────────────────────────────────────────────────
export const socialLinks = {
  github: 'https://github.com/Kartikeya82',
  linkedin: 'https://www.linkedin.com/in/kartikeya-singh-454645304',
  email: 'kartikeyay2004@gmail.com',
  resume: '/resume.pdf',
  portfolio: 'https://kartikeyasingh.dev',
}

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  // ── 1 ─────────────────────────────────────────────────────────────────────
  {
    id: 'orvica-dental',
    title: 'Orvica Dental AI',
    subtitle: 'WhatsApp AI for dental intake — DPDP-compliant, emergency-interrupt, dentist-ready summaries',
    description:
      'A conversational AI patient intake assistant running on WhatsApp for dental clinics, built at Orvica Labs. It handles patient intake conversations, extracts structured clinical data, manages dental emergencies with interrupt logic, and delivers dentist-facing appointment summaries before each visit — all within India\'s DPDP data privacy compliance framework.',
    features: [
      'WhatsApp-native intake — no app install required for patients',
      'Emergency interrupt logic: severe pain or trauma keywords trigger priority escalation instantly',
      'Structured clinical extraction: chief complaint, history, medications, allergies',
      'Dentist-facing summary card generated before each appointment',
      'DPDP-compliant: explicit consent flows, data minimization, and retention policies at the data layer',
      'Hindi + English support for regional patient accessibility',
    ],
    tech: ['Python', 'Claude API', 'WhatsApp Business API', 'FastAPI', 'PostgreSQL', 'Redis'],
    category: 'Healthcare AI',
    color: '#7C3AED',
    accentColor: '#A855F7',
    github: 'https://github.com/Kartikeya82',
    timeline: 'Mar 2026 – Present',
    status: 'development',
    challenges:
      'Medical intake conversations are safety-critical: missing a patient describing cardiac symptoms or severe pain can directly cause harm. DPDP compliance adds a hard constraint — patient health data requires explicit consent and strict handling, and that can\'t be bolted on later.',
    solutions:
      'Emergency interrupt logic runs as a parallel classifier on every message — before the main conversation logic — so safety-critical signals are caught regardless of conversation state. DPDP compliance is implemented at the data layer: every field has an explicit retention policy and consent gate before storage.',
    lessons:
      'Healthcare AI must fail safe, not fail open. When uncertain about clinical severity, escalating to human review is always the right call. Designing the escalation path first revealed constraints that shaped the entire conversation architecture.',
  },

  // ── 2 ─────────────────────────────────────────────────────────────────────
  {
    id: 'earningsiq',
    title: 'EarningsIQ',
    subtitle: 'Ask anything about an SEC 10-K filing. Get a cited, grounded answer.',
    description:
      'A financial document Q&A system that proves generic RAG fails on numbers. EarningsIQ ingests SEC 10-K filings, chunks with financial structure awareness, indexes using BGE embeddings in ChromaDB, then applies cross-encoder reranking before Claude-powered generation with citation validation and abstention handling.',
    features: [
      'End-to-end RAG: ingestion → chunking → BGE embedding → ChromaDB indexing → two-stage retrieval → generation',
      'Cross-encoder reranking over top-20 vector candidates → Precision@5 lifted 0.57 → 0.70 (+23% relative gain)',
      'Recall@20 = 1.00 · MRR = 0.82 on a curated financial Q&A benchmark',
      'Citation validation: every factual claim is traceable to a source passage',
      'Anti-hallucination safeguards for financial figures — model abstains rather than fabricates',
      'RAGAS evaluation: faithfulness, context precision, and answer relevance scored per query',
      'CI quality gates: Ruff linting + MyPy type-checking + full pytest suite',
    ],
    tech: ['Python', 'Claude API', 'BGE Embeddings', 'sentence-transformers', 'ChromaDB', 'Cross-Encoder Reranking', 'RAGAS', 'pytest', 'Ruff', 'MyPy'],
    category: 'Financial AI',
    color: '#0891B2',
    accentColor: '#06B6D4',
    github: 'https://github.com/Kartikeya82',
    timeline: 'Sep 2024 – Dec 2024',
    status: 'live',
    challenges:
      'Financial documents are dense, long-form, and structurally complex. Standard text chunking destroys financial tables and footnote relationships. Generic RAG hallucinates numbers — a critical failure for any financial tool. And "does this feel right" isn\'t a valid evaluation method for finance.',
    solutions:
      'Hierarchical chunking preserves table rows and financial ratios as atomic units. Two-stage retrieval (broad vector recall → precision reranking) is essential: you need Recall@20 = 1.00 before reranking can do its job. The +23% Precision@5 gain came from reranking alone — not changing the LLM. RAGAS made every pipeline change measurable.',
    lessons:
      'Domain-specific retrieval engineering beats model upgrades. Evaluation-first development is the only honest way to know if your RAG is actually improving — every change should move a metric, not just feel better.',
  },

  // ── 3 ─────────────────────────────────────────────────────────────────────
  {
    id: 'lead-enrichment',
    title: 'Lead Enrichment Pipeline',
    subtitle: '150+ qualified dental clinic leads, every Monday at 6 AM, autonomously',
    description:
      'A fully autonomous lead intelligence pipeline built for a healthcare SaaS startup. It discovers dental clinics, enriches them with live booking and review data, scores by conversion intent, deduplicates against the CRM, and delivers a clean list every Monday before the sales team logs in. Contributing to 5–10 paying-client acquisitions within 2 weeks of launch.',
    features: [
      '150+ qualified leads generated every Monday at 6 AM IST — zero human intervention',
      'Clinic discovery via Google Maps API + Apify web scraping',
      'Multi-stage enrichment: Claude AI metadata extraction + live booking-platform data',
      'Rule-based scoring on operational signals: booking availability, review quality, specialty depth, website credibility',
      'Graceful degradation: pipeline continues when upstream APIs fail — no run is fully blocked',
      'Schema-safe CRM sync with deduplication — no prospect receives duplicate outreach',
      'Production-hardened: 460+ automated tests, structured logging, cost caps, failure isolation',
    ],
    tech: ['Python', 'FastAPI', 'Anthropic API', 'SQLite', 'Google Maps API', 'Google Sheets API', 'Apify', 'pytest', 'GitHub Actions'],
    category: 'Healthcare AI',
    color: '#7C3AED',
    accentColor: '#A855F7',
    github: 'https://github.com/Kartikeya82',
    timeline: 'Jan 2026 – Present',
    status: 'live',
    challenges:
      'Upstream APIs (booking platforms, Maps, review sources) are unreliable. A failed API call can\'t silently skip hundreds of leads or block the entire Monday run. Also: scoring lead quality without labeled training data — every clinic looks identical before outreach.',
    solutions:
      'Each enrichment stage is an independent module with fallback modes. If a booking API returns 503, the clinic is still scored on available data — nothing is silently dropped. Lead scoring is deliberately rule-based (not ML) because operational signals like appointment availability and review recency are interpretable and auditable. Per-stage cost caps prevent runaway Claude API spend.',
    lessons:
      'Production readiness isn\'t a feature you add at the end. The 460+ tests, failure isolation, and structured logging were designed from day one — because a Monday run that fails silently means zero leads for the sales team and zero revenue for the client.',
  },

  // ── 4 ─────────────────────────────────────────────────────────────────────
  {
    id: 'drcrop',
    title: 'DR CROP',
    subtitle: '87% accuracy across 12 crop diseases. Validated in a 50-farmer field pilot in UP.',
    description:
      'A multimodal crop disease classifier built during a Corteva Agriscience internship. Leaf image analysis alone failed at early-stage detection — adding soil health and live weather data as additional modalities boosted accuracy by 15 points. Deployed as a FastAPI service and piloted with 50 farmers in Uttar Pradesh; agronomist feedback directly drove two retraining cycles.',
    features: [
      'Multimodal architecture: leaf images + soil health data + live weather feeds → 12-class disease prediction',
      '87% macro-F1 across 12 disease classes (+15 points vs 72% image-only baseline)',
      'FastAPI inference service in Docker: <200ms median latency on live APIs from 3 Indian states',
      'Real-world pilot: 50 farmers in Uttar Pradesh — production deployment, not academic demo',
      'Two agronomist-driven retraining cycles: field feedback → +4 points minority-class recall',
      'Soil-health and pesticide-advisory modules for actionable next-step recommendations',
      'Contributed to a broader AgriTech platform serving multiple Indian states at Corteva',
    ],
    tech: ['PyTorch', 'OpenCV', 'FastAPI', 'Docker', 'scikit-learn', 'Pandas', 'NumPy'],
    category: 'AgriTech AI',
    color: '#059669',
    accentColor: '#10B981',
    github: 'https://github.com/Kartikeya82/Crops',
    timeline: 'May 2024 – Jul 2024',
    status: 'live',
    challenges:
      'Image-only models miss early-stage crop disease — when visual symptoms aren\'t obvious yet. That\'s the most costly failure mode: early-stage is when intervention is cheapest. Also: <200ms latency on commodity hardware while handling real-world phone camera image quality.',
    solutions:
      'Added soil pH, moisture, and recent weather as additional input modalities. Early-stage disease correlates strongly with environmental conditions before leaf symptoms appear — multimodal fusion delivered the +15 point jump. Kept the serving architecture lightweight, tuned Docker resource limits to hit <200ms consistently.',
    lessons:
      'Domain expert feedback is irreplaceable. The two retraining cycles driven by Corteva agronomists — not more data or larger models — were what moved minority-class recall by 4 points. Real pilots surface failure modes no benchmark covers.',
  },

  // ── 5 ─────────────────────────────────────────────────────────────────────
  {
    id: 'visionguard',
    title: 'VisionGuard',
    subtitle: 'Real-time computer vision monitoring with intelligent threat detection',
    description:
      'A computer vision pipeline for real-time object detection and security monitoring. Built with an emphasis on low-latency inference and configurable alert logic, VisionGuard processes live video streams to detect and classify objects of interest with high precision.',
    features: [
      'Real-time object detection on live video streams with configurable alert thresholds',
      'Multi-class classification for threat / non-threat objects',
      'FastAPI REST interface for integration with external monitoring dashboards',
      'Timestamped event logging with snapshot capture on detection triggers',
      'Confidence-filtered output to minimize false-positive alerts',
      'Containerized deployment for edge and cloud environments',
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'YOLOv8', 'FastAPI', 'Docker'],
    category: 'Computer Vision',
    color: '#DC2626',
    accentColor: '#EF4444',
    github: 'https://github.com/Kartikeya82/VisionGuard',
    timeline: '2024',
    status: 'archived',
    challenges:
      'Real-time inference must stay under latency budgets while handling variable-quality video input from consumer-grade cameras. False-positive rate needs to be low enough to be operationally useful.',
    solutions:
      'Used YOLOv8 with tuned confidence and NMS thresholds for the target deployment environment. Non-maximum suppression and a post-processing confidence filter reduced false alarms without sacrificing recall on true detections.',
    lessons:
      'Threshold tuning is where computer vision projects live or die in production. A model that achieves 95% mAP on a benchmark can be useless if the confidence threshold isn\'t calibrated to the actual operating environment.',
  },

  // ── 6 ─────────────────────────────────────────────────────────────────────
  {
    id: 'comic-hubstore',
    title: 'Comic HubStore',
    subtitle: 'A full-stack e-commerce platform for comic book enthusiasts',
    description:
      'A full-stack e-commerce web application tailored for comic book retail. Comic HubStore covers the complete purchase flow: browsing a catalog with search and filters, managing a cart, and a checkout experience — built with a clean, reader-focused UI.',
    features: [
      'Comic catalog with search, genre filters, and sorting',
      'Product detail pages with cover art, synopsis, and series info',
      'Shopping cart with quantity management and real-time subtotal',
      'User authentication: registration, login, and session management',
      'Order history and account management dashboard',
      'Responsive design for desktop and mobile browsing',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'CSS3'],
    category: 'Full-Stack Web',
    color: '#7C3AED',
    accentColor: '#A78BFA',
    github: 'https://github.com/Kartikeya82/comic-hubstore',
    timeline: '2023',
    status: 'archived',
    challenges:
      'Building a full purchase flow end-to-end — from catalog browsing through cart state to checkout — requires careful state management and a consistent data model across frontend and backend.',
    solutions:
      'Designed a clear REST API contract first, then built frontend components against it. Cart state is managed server-side per session, keeping the client stateless and the checkout flow consistent across page refreshes.',
    lessons:
      'Full-stack projects reveal how quickly mismatches between frontend assumptions and backend data shapes accumulate into bugs. API-first design — defining the contract before building either side — eliminates an entire class of integration problems.',
  },

  // ── 7 ─────────────────────────────────────────────────────────────────────
  {
    id: 'sentiment',
    title: 'SentimentLens',
    subtitle: '0.80 macro-F1. Reproducible. Dockerized. CI-tested. The way ML should ship.',
    description:
      'A 3-class sentiment classifier fine-tuned on 50K Amazon Reviews for a production deployment at Jyesta. Beyond 0.80 macro-F1 (6.4 points above LR and BiLSTM baselines), the project ships with complete MLOps infrastructure: MLflow experiment tracking, DVC data and model versioning, and a Dockerized FastAPI inference service with CI-integrated tests.',
    features: [
      'BERT-base fine-tuned on a balanced 50K Amazon Reviews dataset for 3-class sentiment',
      '0.80 macro-F1: +6.4 points over Logistic Regression and BiLSTM baselines',
      'Mixed-precision training (AMP) for faster iteration without GPU memory overhead',
      'MLflow experiment tracking: every run logged with metrics, hyperparameters, and model artifacts',
      'DVC data and model versioning: dataset snapshots are reproducible artifacts, not assumed constants',
      'Dockerized FastAPI inference service: single + batch endpoints, health checks, Swagger docs',
      'CI-integrated API test suite: model inference tested on every commit',
    ],
    tech: ['PyTorch', 'Hugging Face Transformers', 'FastAPI', 'Docker', 'MLflow', 'DVC', 'pytest', 'scikit-learn'],
    category: 'NLP / MLOps',
    color: '#6D28D9',
    accentColor: '#8B5CF6',
    github: 'https://github.com/Kartikeya82/bert-sentiment-analysis',
    timeline: 'Aug 2024 – Oct 2024',
    status: 'archived',
    challenges:
      'Reproducing ML experiments across team members is harder than it looks. Without versioning, you can\'t tell which dataset version produced which model checkpoint — impossible to debug regressions or roll back to a known-good model safely.',
    solutions:
      'DVC versions data separately from code: every dataset snapshot is a reproducible artifact tracked in Git-compatible metadata. MLflow ties each training run to its exact config — any experiment can be reproduced by checking out the run ID. The combination makes the train → evaluate → release workflow fully auditable.',
    lessons:
      'MLOps isn\'t overhead — it\'s the difference between an ML project that\'s "working" and one you can actually trust in production. The DVC + MLflow setup cost 2 days upfront but made every subsequent iteration 3× faster to evaluate and compare.',
  },

  // ── 8 ─────────────────────────────────────────────────────────────────────
  {
    id: 'kafka-warehouse',
    title: 'Delta Lake Architecture',
    subtitle: 'Kafka → Delta Lake. Any source. ACID guarantees. One command to run.',
    description:
      'A containerized streaming data pipeline that standardizes real-time ingestion from heterogeneous sources into a Delta Lake warehouse. Built to solve the "every data source looks different" problem at the ingestion layer, with ACID guarantees, time-travel queries, and automated retry logic for unattended production runs.',
    features: [
      'Apache Kafka as ingestion backbone: multi-topic, multi-partition, multi-source',
      'Delta Lake as the target: ACID transactions, schema enforcement, time-travel queries',
      'Batch + incremental processing: full historical backfill or streaming append per source',
      'Source schema normalization: per-source connectors map heterogeneous inputs to a canonical schema',
      'Automated retry with exponential backoff on partition failures — no silent data loss',
      'Structured logging for pipeline observability: every event logged with source, offset, and timestamp',
      'Fully containerized: Docker Compose brings up the entire stack with one command',
    ],
    tech: ['Python', 'Apache Kafka', 'Delta Lake', 'Docker', 'Docker Compose', 'Pandas', 'Bash'],
    category: 'Data Engineering',
    color: '#D97706',
    accentColor: '#F59E0B',
    github: 'https://github.com/Kartikeya82/Delta-Lake-Architecture',
    timeline: '2024',
    status: 'archived',
    challenges:
      'Heterogeneous sources produce different schemas, arrival rates, and error modes. A pipeline designed for one source breaks the moment a second source is added with a different field naming convention or timestamp format.',
    solutions:
      'Schema normalization layer at ingestion: each source gets its own connector class that maps raw fields to a canonical schema before entering Kafka. Delta Lake\'s schema enforcement acts as a contract — upstream schema drift is caught at write time, not corrupted silently downstream.',
    lessons:
      'Data pipelines need the same engineering discipline as application code: idempotency, structured logging, and graceful failure handling aren\'t optional when the pipeline runs unattended. Delta Lake time-travel turns debugging into a query: "show me what the warehouse looked like 3 hours ago."',
  },

  // ── 9 ─────────────────────────────────────────────────────────────────────
  {
    id: 'moodify',
    title: 'Moodify',
    subtitle: 'Your mood, your playlist — music recommendations that actually fit how you feel',
    description:
      'A mood-aware music recommendation system that maps emotional state to personalized playlists. Users input their current mood (via text or selection) and Moodify surfaces curated tracks using Spotify API integration and a sentiment-driven recommendation engine.',
    features: [
      'Mood detection via text sentiment analysis or direct mood selection UI',
      'Spotify API integration for real-time playlist and track retrieval',
      'Sentiment-to-genre mapping: emotional state drives genre and tempo filters',
      'Playlist generation with track preview and Spotify deep-link integration',
      'Clean, responsive UI with mood-matched visual theming',
      'User preference history for improving future recommendations',
    ],
    tech: ['Python', 'Spotify API', 'FastAPI', 'React', 'scikit-learn', 'NLP'],
    category: 'Music / ML',
    color: '#EC4899',
    accentColor: '#F472B6',
    github: 'https://github.com/Kartikeya82/moodify',
    timeline: '2024',
    status: 'archived',
    challenges:
      'Mapping abstract mood states to concrete audio features (valence, energy, tempo) requires a bridge between subjective human emotion and Spotify\'s quantitative audio feature space.',
    solutions:
      'Built a sentiment-to-audio-feature mapping layer that converts classified mood labels (happy, melancholic, energetic, calm) into Spotify API filter parameters. Tuned valence and energy thresholds empirically against test playlists.',
    lessons:
      'Recommendation systems live or die on their mapping quality. The hardest part wasn\'t the ML — it was designing the mood taxonomy and deciding which Spotify audio features best represent each emotional state.',
  },

  // ── 10 ────────────────────────────────────────────────────────────────────
  {
    id: 'weather',
    title: 'Weather Forecast',
    subtitle: 'Location-aware weather forecasting with clean visualizations',
    description:
      'A weather forecasting web application that delivers accurate, real-time weather data and multi-day forecasts via live API integration. Designed for clarity: current conditions, hourly breakdowns, and 7-day outlooks presented in a clean, responsive interface.',
    features: [
      'Real-time weather data via OpenWeatherMap API integration',
      '7-day forecast with hourly breakdowns',
      'Location detection via browser geolocation or manual city search',
      'Visual indicators for temperature, humidity, wind speed, and UV index',
      'Dynamic background and iconography that adapts to current conditions',
      'Responsive layout for mobile and desktop',
    ],
    tech: ['React', 'JavaScript', 'OpenWeatherMap API', 'CSS3', 'HTML5'],
    category: 'Web App',
    color: '#0369A1',
    accentColor: '#0EA5E9',
    github: 'https://github.com/Kartikeya82/weather-forecast',
    timeline: '2023',
    status: 'archived',
    challenges:
      'API rate limits and inconsistent data formats across weather providers make it difficult to build a reliable experience. Geolocation adds UX complexity — users need a fallback when browser permissions are denied.',
    solutions:
      'Centralized all API calls through a thin service layer with error boundaries. Implemented a city-search fallback as the primary input, with geolocation as an opt-in enhancement. Cached recent lookups in localStorage to stay within free-tier rate limits.',
    lessons:
      'Third-party API integration always has hidden edge cases. Building the fallback path (city search) before the happy path (geolocation) meant the app was usable from day one without depending on permissions.',
  },

  // ── 11 ────────────────────────────────────────────────────────────────────
  {
    id: 'fakenews',
    title: 'Fake News Detector',
    subtitle: 'NLP classifier that separates real journalism from disinformation',
    description:
      'A binary text classifier that identifies fake news articles using NLP techniques. Trained on a labeled dataset of real and fabricated news articles, the system applies TF-IDF feature extraction with classical ML classifiers and evaluates against precision, recall, and F1 across both classes.',
    features: [
      'Binary classification: real vs. fake news articles',
      'TF-IDF feature extraction with n-gram range tuning',
      'Evaluated across multiple classifiers: Logistic Regression, Naive Bayes, SVM',
      'Precision / Recall / F1 breakdown for both classes to monitor false-negative rate',
      'Text preprocessing pipeline: lowercasing, stopword removal, stemming',
      'Confusion matrix analysis for model comparison and selection',
    ],
    tech: ['Python', 'scikit-learn', 'NLTK', 'Pandas', 'NumPy', 'Jupyter'],
    category: 'NLP',
    color: '#9333EA',
    accentColor: '#A855F7',
    github: 'https://github.com/Kartikeya82/Fake-news-detector',
    timeline: '2023',
    status: 'archived',
    challenges:
      'Fake news datasets are noisy and domain-specific. A model trained on political misinformation may fail on health misinformation. Class imbalance is common, inflating accuracy while the model ignores the minority (fake) class.',
    solutions:
      'Applied class-weight balancing during training to penalize false negatives on the fake class. Used F1 over accuracy as the primary metric. Evaluated multiple classifiers to understand how each trades off precision vs. recall.',
    lessons:
      'Accuracy is a misleading metric for imbalanced NLP tasks. F1 and confusion matrix analysis are the only honest way to evaluate whether the model actually catches what it\'s supposed to catch.',
  },

  // ── 12 ────────────────────────────────────────────────────────────────────
  {
    id: 'saas',
    title: 'SAAS Platform',
    subtitle: 'A subscription-based SaaS application with billing and multi-tenant architecture',
    description:
      'A SaaS web application prototype demonstrating the core components of a subscription business: multi-tenant user management, subscription tiers, billing integration, and a dashboard for tenant administrators to manage their accounts and usage.',
    features: [
      'Multi-tenant architecture: isolated data per organization',
      'Subscription tier management: free, pro, and enterprise plans',
      'Billing integration with usage metering per tenant',
      'Admin dashboard: user management, plan details, and usage analytics',
      'Role-based access control (RBAC) within each tenant organization',
      'REST API for third-party integrations and programmatic account management',
    ],
    tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Stripe API', 'JWT'],
    category: 'SaaS / Full-Stack',
    color: '#0891B2',
    accentColor: '#22D3EE',
    github: 'https://github.com/Kartikeya82/SAAS',
    timeline: '2024',
    status: 'archived',
    challenges:
      'Multi-tenancy means every database query must be scoped to the correct tenant. A single missing tenant-ID filter in a query can expose one customer\'s data to another — a critical security failure.',
    solutions:
      'Enforced tenant scoping at the data access layer through a middleware that injects the tenant context into every query. No query reaches the database without passing through the tenant scope middleware.',
    lessons:
      'Security-critical invariants belong in infrastructure, not application code. Tenant isolation implemented as a middleware guarantee is far safer than relying on every developer to remember to add the WHERE clause.',
  },
]

export const skills: Skill[] = [
  // Languages
  { name: 'Python', icon: '🐍', category: 'Languages', xp: 960, maxXp: 1000, level: 96, rarity: 'legendary', description: 'Primary language across all projects. Expert in async patterns, ML pipelines, API development, and scientific computing. 4+ years daily use.', projects: ['Orvica', 'EarningsIQ', 'DR CROP', 'SentimentLens'], color: '#3B82F6' },
  { name: 'SQL', icon: '🗃️', category: 'Languages', xp: 700, maxXp: 1000, level: 70, rarity: 'rare', description: 'Advanced querying, CTEs, window functions, and query optimization for ML feature stores and analytics.', projects: ['Orvica', 'EarningsIQ', 'DR CROP'], color: '#0891B2' },
  { name: 'Bash', icon: '⚙️', category: 'Languages', xp: 580, maxXp: 1000, level: 58, rarity: 'common', description: 'Shell scripting for automation, CI/CD hooks, Docker entrypoints, and environment setup.', projects: ['All projects'], color: '#94A3B8' },

  // AI & ML
  { name: 'PyTorch', icon: '🔥', category: 'AI & ML', xp: 820, maxXp: 1000, level: 82, rarity: 'epic', description: 'Custom training loops, mixed-precision (AMP), multimodal architectures, and BERT fine-tuning. Core of DR CROP and SentimentLens.', projects: ['DR CROP', 'SentimentLens'], color: '#EF4444' },
  { name: 'Hugging Face', icon: '🤗', category: 'AI & ML', xp: 800, maxXp: 1000, level: 80, rarity: 'epic', description: 'BERT fine-tuning, tokenizers, model hub, sentence-transformers, and cross-encoder reranking models.', projects: ['SentimentLens', 'EarningsIQ'], color: '#FBBF24' },
  { name: 'Anthropic API', icon: '🤖', category: 'AI & ML', xp: 900, maxXp: 1000, level: 90, rarity: 'legendary', description: 'Production Claude integration in two live systems. Structured outputs, tool use, cost-controlled agentic workflows, and metadata extraction at scale.', projects: ['Orvica', 'EarningsIQ'], color: '#7C3AED' },
  { name: 'scikit-learn', icon: '📊', category: 'AI & ML', xp: 720, maxXp: 1000, level: 72, rarity: 'rare', description: 'Classical ML, evaluation pipelines (macro-F1, P/R), baseline models, and feature engineering for tabular data.', projects: ['SentimentLens', 'DR CROP'], color: '#F97316' },
  { name: 'RAGAS', icon: '📏', category: 'AI & ML', xp: 650, maxXp: 1000, level: 65, rarity: 'rare', description: 'RAG evaluation framework: faithfulness, context precision, answer relevance. Used to measure EarningsIQ improvements quantitatively.', projects: ['EarningsIQ'], color: '#10B981' },

  // RAG & LLM
  { name: 'RAG Systems', icon: '🔍', category: 'RAG & LLM', xp: 880, maxXp: 1000, level: 88, rarity: 'legendary', description: 'End-to-end RAG: chunking strategy, embedding selection, vector store design, two-stage retrieval (recall → reranking), citation validation, and RAGAS evaluation.', projects: ['EarningsIQ', 'Orvica'], color: '#0891B2' },
  { name: 'ChromaDB', icon: '🗄️', category: 'RAG & LLM', xp: 700, maxXp: 1000, level: 70, rarity: 'rare', description: 'Persistent vector indexing, metadata filtering, and similarity search for production RAG pipelines.', projects: ['EarningsIQ'], color: '#A855F7' },
  { name: 'BGE Reranking', icon: '🎯', category: 'RAG & LLM', xp: 720, maxXp: 1000, level: 72, rarity: 'rare', description: 'Cross-encoder reranking over vector retrieval candidates. Delivered +23% Precision@5 in EarningsIQ over vector search alone.', projects: ['EarningsIQ'], color: '#06B6D4' },
  { name: 'LangChain', icon: '🔗', category: 'RAG & LLM', xp: 660, maxXp: 1000, level: 66, rarity: 'rare', description: 'Document loaders, retrievers, chains, and LLM integration abstractions for rapid prototyping.', projects: ['Research & Experiments'], color: '#16A34A' },

  // MLOps & Serving
  { name: 'FastAPI', icon: '⚡', category: 'MLOps', xp: 920, maxXp: 1000, level: 92, rarity: 'legendary', description: 'Primary API framework. Expert in async endpoints, dependency injection, Pydantic models, and OpenAPI. 4+ production inference services shipped across internships.', projects: ['Orvica', 'EarningsIQ', 'DR CROP', 'SentimentLens'], color: '#059669' },
  { name: 'Docker', icon: '🐳', category: 'MLOps', xp: 800, maxXp: 1000, level: 80, rarity: 'epic', description: 'Multi-stage builds, Compose orchestration, and containerized ML serving. Every project in this portfolio ships in a container.', projects: ['All projects'], color: '#2563EB' },
  { name: 'MLflow', icon: '📈', category: 'MLOps', xp: 700, maxXp: 1000, level: 70, rarity: 'rare', description: 'Experiment tracking, artifact storage, and model registry for reproducible ML workflows.', projects: ['SentimentLens'], color: '#0891B2' },
  { name: 'DVC', icon: '🔄', category: 'MLOps', xp: 670, maxXp: 1000, level: 67, rarity: 'rare', description: 'Data and model versioning alongside Git. Makes ML experiments reproducible: every dataset snapshot is a tracked artifact, not an assumed constant.', projects: ['SentimentLens'], color: '#945DD6' },
  { name: 'pytest', icon: '✅', category: 'MLOps', xp: 780, maxXp: 1000, level: 78, rarity: 'rare', description: '460+ tests written for Orvica production pipeline. CI-integrated test suites across all projects. TDD for production ML services.', projects: ['Orvica', 'EarningsIQ', 'SentimentLens'], color: '#4ADE80' },

  // Data Engineering
  { name: 'Pandas / NumPy', icon: '🐼', category: 'Data', xp: 820, maxXp: 1000, level: 82, rarity: 'epic', description: 'Data manipulation, feature engineering, vectorized operations, and ETL pipelines. Core to every ML project.', projects: ['All ML projects'], color: '#0891B2' },
  { name: 'Apache Kafka', icon: '📨', category: 'Data', xp: 650, maxXp: 1000, level: 65, rarity: 'rare', description: 'Stream processing, topic management, and partition-aware consumer design for real-time data pipelines.', projects: ['Kafka Warehouse'], color: '#D97706' },
  { name: 'Delta Lake', icon: '🏔️', category: 'Data', xp: 620, maxXp: 1000, level: 62, rarity: 'rare', description: 'ACID-compliant data lake storage with schema enforcement and time-travel query capability.', projects: ['Kafka Warehouse'], color: '#4ADE80' },

  // Tools
  { name: 'Git', icon: '🌿', category: 'Tools', xp: 880, maxXp: 1000, level: 88, rarity: 'epic', description: 'Branching strategies, CI/CD integration, and collaborative workflows. Used daily across every project.', projects: ['All projects'], color: '#F97316' },
  { name: 'GitHub Actions', icon: '🔁', category: 'Tools', xp: 700, maxXp: 1000, level: 70, rarity: 'rare', description: 'CI/CD pipelines: automated testing, Ruff/MyPy linting, Docker builds, and ML quality gates.', projects: ['EarningsIQ', 'Orvica'], color: '#A855F7' },

  // Frontend (portfolio)
  { name: 'TypeScript', icon: '🔷', category: 'Frontend', xp: 640, maxXp: 1000, level: 64, rarity: 'rare', description: 'Type-safe JavaScript with strict mode. Used to build this portfolio in Next.js App Router.', projects: ['Portfolio'], color: '#2563EB' },
  { name: 'React / Next.js', icon: '⚛️', category: 'Frontend', xp: 600, maxXp: 1000, level: 60, rarity: 'common', description: 'Component-based UIs and server-side rendering. App Router, Framer Motion, Tailwind CSS.', projects: ['Portfolio'], color: '#06B6D4' },
]

export const timeline: TimelineItem[] = [
  {
    id: '1',
    year: '2023',
    title: 'Started B.Tech at Bennett University',
    subtitle: 'CS (Data Science) · CGPA 8.34/10',
    description: 'Enrolled in Computer Science with a Data Science specialization. Spent the first year building foundations: Python, statistics, data structures, and classical ML. The moment a decision tree correctly predicted something for the first time felt like magic.',
    type: 'education',
    icon: '🎓',
    color: '#7C3AED',
  },
  {
    id: '2',
    year: '2024 Q2',
    title: 'Data Science Intern — Corteva Agriscience',
    subtitle: 'Multimodal crop classifier · 87% macro-F1 · 50-farmer pilot in UP',
    description: 'First real internship. Built a multimodal crop disease classifier for a pilot with 50 farmers in Uttar Pradesh. The image-only model wasn\'t cutting it for early-stage detection — adding soil and weather data jumped accuracy by 15 points. Agronomists reviewed predictions, I\'d retrain and redeploy. That feedback loop taught me more about production ML than any course.',
    type: 'project',
    icon: '🌱',
    color: '#059669',
  },
  {
    id: '3',
    year: '2024 Q3',
    title: 'Data Science Intern — Jyesta',
    subtitle: 'BERT fine-tuning · MLflow + DVC · Dockerized FastAPI serving',
    description: 'Fine-tuned BERT on 50K Amazon reviews, hit 0.80 macro-F1. More importantly: learned how to build ML systems you can actually trust. Set up MLflow and DVC — the first time I had a fully auditable train → evaluate → release workflow. Shipped a Dockerized FastAPI inference service with CI-tested endpoints.',
    type: 'project',
    icon: '🔬',
    color: '#6D28D9',
  },
  {
    id: '4',
    year: '2024 Q4',
    title: 'Built EarningsIQ',
    subtitle: 'SEC filing RAG · +23% Precision@5 · RAGAS evaluation framework',
    description: 'Went deep on RAG after realizing most tutorials skip the hard parts: chunking strategy, evaluation, and reranking. Built EarningsIQ over SEC 10-K filings. Cross-encoder reranking took Precision@5 from 0.57 → 0.70 — a 23% relative gain from one engineering decision, not a bigger model. RAGAS made every pipeline iteration measurable.',
    type: 'achievement',
    icon: '📈',
    color: '#0891B2',
  },
  {
    id: '5',
    year: '2026 Q1',
    title: 'AI Engineer (Contract) — Orvica Labs',
    subtitle: '150+ leads/week · 5–10 paying clients in 2 weeks · 460+ tests',
    description: 'First production role. Built a fully autonomous lead intelligence pipeline for a healthcare SaaS startup. 150+ qualified dental clinic leads generated every Monday at 6 AM without human intervention. The pipeline contributed to 5–10 paying-client acquisitions in the first 2 weeks. 460+ automated tests, cost caps, and failure isolation — built to run unattended indefinitely.',
    type: 'project',
    icon: '🏥',
    color: '#7C3AED',
  },
  {
    id: '6',
    year: '2026',
    title: 'Building WhatsApp Dental Intake AI',
    subtitle: 'DPDP-compliant · Emergency-interrupt logic · Dentist-facing summaries',
    description: 'Still at Orvica. Now building the clinic-side product: a WhatsApp AI that handles patient intake, structures clinical information, manages emergencies with interrupt logic, and generates dentist-facing summary cards before appointments. India\'s DPDP data privacy compliance is a first-class requirement.',
    type: 'focus',
    icon: '💬',
    color: '#A855F7',
  },
  {
    id: '7',
    year: 'Now',
    title: 'Open to AI/ML Roles & Internships',
    subtitle: 'SWE · AI/ML · Research · Healthcare AI · Startups',
    description: 'Looking for the next challenge: a role where I can keep shipping production AI systems. Healthcare AI long-term, but excited by anything at the intersection of LLMs and real-world impact. Available for remote, hybrid, or relocation for the right opportunity.',
    type: 'focus',
    icon: '🚀',
    color: '#F59E0B',
  },
]

export const terminalResponses: Record<string, string | string[]> = {
  whoami: [
    '┌──────────────────────────────────────────────────┐',
    '│              Kartikeya Singh                     │',
    '│   AI/ML Engineer · LLM Systems · MLOps          │',
    '│   CS (Data Science) · Bennett University        │',
    '└──────────────────────────────────────────────────┘',
    '',
    'Ships ML systems to real users — not just demos.',
    'Currently: AI Engineer @ Orvica Labs (contract).',
    'Stack: Python · FastAPI · Claude API · PyTorch · RAG.',
    'CGPA: 8.34/10 · Graduating: 2027',
  ],
  experience: [
    '┌─── WORK EXPERIENCE ──────────────────────────────┐',
    '│ 🏥 AI Engineer (Contract) · Orvica Labs          │',
    '│    Jan 2026 – Present                            │',
    '│    150+ leads/week · 460+ tests · 5-10 clients   │',
    '│                                                  │',
    '│ 🌱 Data Science Intern · Corteva Agriscience     │',
    '│    May–Jul 2024                                  │',
    '│    87% macro-F1 · 50-farmer pilot · <200ms       │',
    '│                                                  │',
    '│ 🔬 Data Science Intern · Jyesta                  │',
    '│    Aug–Oct 2024                                  │',
    '│    0.80 macro-F1 · MLflow+DVC · Dockerized API   │',
    '└──────────────────────────────────────────────────┘',
  ],
  achievements: [
    '┌─── KEY METRICS ───────────────────────────────────┐',
    '│ 🎯 EarningsIQ  : Precision@5 +23% (0.57 → 0.70) │',
    '│ 🌾 DR CROP     : 87% macro-F1 (+15 over baseline) │',
    '│ 💬 SentimentLens: 0.80 F1 (+6.4 over BiLSTM)     │',
    '│ 🏥 Orvica      : 150+ leads/week, 5–10 clients   │',
    '│ ✅ Tests        : 460+ (Orvica production CI)     │',
    '│ ⚡ Latency      : <200ms (DR CROP FastAPI/Docker) │',
    '└───────────────────────────────────────────────────┘',
  ],
  skills: [
    '┌─── TECH STACK ────────────────────────────────────┐',
    '│ 🐍 Languages  → Python · SQL · Bash               │',
    '│ 🤖 AI/ML      → PyTorch · HuggingFace · Claude    │',
    '│ 🔍 RAG & LLM  → ChromaDB · BGE · RAGAS           │',
    '│ ⚡ Serving    → FastAPI · Docker · REST APIs      │',
    '│ 📈 MLOps      → MLflow · DVC · pytest · CI/CD    │',
    '│ 📨 Data Eng   → Kafka · Delta Lake · Pandas       │',
    '└───────────────────────────────────────────────────┘',
  ],
  projects: [
    '┌─── PROJECTS ──────────────────────────────────────┐',
    '│ 🦷 Orvica Dental AI      → Dev · WhatsApp+Claude  │',
    '│ 📈 EarningsIQ            → RAG · SEC filings      │',
    '│ 🏥 Lead Enrichment       → Production · AI+APIs   │',
    '│ 🌱 DR CROP               → Multimodal · AgriTech  │',
    '│ 👁️  VisionGuard           → Computer Vision        │',
    '│ 📚 Comic HubStore        → E-Commerce · Full-Stack│',
    '│ 💬 SentimentLens         → BERT · MLOps           │',
    '│ 📨 Delta Lake Pipeline    → Streaming · Kafka      │',
    '│ 🎵 Moodify               → Music · NLP            │',
    '│ 🌤️  Weather Forecast      → APIs · Web App         │',
    '│ 📰 Fake News Detector     → NLP · Classification  │',
    '│ ☁️  SAAS Platform         → Multi-tenant · Billing │',
    '└───────────────────────────────────────────────────┘',
    '',
    'All projects are production-grade, not tutorials.',
    'Type "project <name>" for details, e.g. "project orvica"',
  ],
  education: [
    'B.Tech, Computer Science Engineering (Data Science)',
    'Bennett University · Greater Noida, India',
    'CGPA: 8.34 / 10.0',
    'Graduating: 2027',
    '',
    'Relevant coursework:',
    '  · Machine Learning & Deep Learning',
    '  · Natural Language Processing',
    '  · Data Structures & Algorithms',
    '  · Statistics & Probability',
    '  · Database Management Systems',
  ],
  contact: [
    '┌─── CONTACT ───────────────────────────────────────┐',
    '│ 📧 Email    → kartikeyay2004@gmail.com            │',
    '│ 🐙 GitHub   → github.com/Kartikeya82             │',
    '│ 💼 LinkedIn → linkedin.com/in/kartikeya-singh-   │',
    '│              454645304                            │',
    '│ 📱 Phone    → +91 82192 66919                    │',
    '└───────────────────────────────────────────────────┘',
    '',
    'Responding within 24 hours. Chai optional.',
  ],
  resume: [
    'Fetching resume... 📄',
    '',
    'Direct link: /resume.pdf',
    'LinkedIn: linkedin.com/in/kartikeya-singh-454645304',
    '',
    'AI/ML Engineer · LLM Systems · MLOps · Healthcare AI',
  ],
  github: ['→ github.com/Kartikeya82', 'Opening GitHub... 🐙'],
  linkedin: ['→ linkedin.com/in/kartikeya-singh-454645304', 'Opening LinkedIn... 💼'],
  email: ['→ kartikeyay2004@gmail.com', 'Opening email client... 📧'],
  clear: '__CLEAR__',
  help: [
    '┌─── AVAILABLE COMMANDS ────────────────────────────┐',
    '│ whoami       → About me                           │',
    '│ experience   → Work history & internships         │',
    '│ achievements → Key metrics & results              │',
    '│ skills       → Technical stack                   │',
    '│ projects     → My projects                       │',
    '│ education    → Academic background                │',
    '│ contact      → Get in touch                      │',
    '│ resume       → Download resume                   │',
    '│ github       → My GitHub profile                 │',
    '│ linkedin     → My LinkedIn profile                │',
    '│ email        → Send me an email                  │',
    '│ clear        → Clear terminal                    │',
    '│ help         → Show this help                    │',
    '└───────────────────────────────────────────────────┘',
  ],
}
