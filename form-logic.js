/* ═══════════════════════════════════════════════════════════════
   form-logic.js  —  YourCSPath Career Finder
   Scores 6 paths out of 8. Shows top 3 only, ranked correctly.
   Rank label (#1 Best / #2 Strong / #3 Good) always matches
   the sorted order — never swapped.
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   PATH DEFINITIONS
───────────────────────────────────────────────────────────── */
const PATHS = {
    webdev: {
        name: 'Web Development',
        icon: '🌐',
        tag:  'Frontend · Backend · Full-Stack',
        url:  '../webdevelopment.html',
        grad: 'linear-gradient(135deg,#4169E1,#5b4fc6)',
        why: {
            building:        'You love building things people use — web dev delivers that from day one.',
            webapp:          'Your dream project maps directly onto full-stack web engineering.',
            faststart:       'Web dev has the fastest path from learning to first paying work.',
            'quick-earn':    'Freelancing in web dev is the fastest way to earn while you learn.',
            strong:          'Your coding strength means you can jump straight into React or Node.',
            some:            'Your existing coding base is a perfect launchpad for web frameworks.',
            collab:          'Web dev teams blend design, backend, and frontend — naturally collaborative.',
            client:          'You enjoy client work — web dev freelancing is client-facing by nature.',
            broad:           'Web skills are in demand across every industry on earth.',
            freelance:       'Web development is the most popular freelancing field globally.',
            avoid:           'Web dev has the gentlest math requirements — logic beats equations here.',
        }
    },
    appdev: {
        name: 'App Development',
        icon: '📱',
        tag:  'iOS · Android · Cross-Platform',
        url:  '../mobile-dev.html',
        grad: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
        why: {
            building:        'You want to build things people use — mobile apps reach millions of hands.',
            webapp:          'Your interest in user-facing products translates perfectly to mobile.',
            'quick-earn':    'App stores let indie developers earn from day one.',
            faststart:       'Mobile dev skills are in high demand with a clear structured path.',
            strong:          'Your coding strength means you can tackle native iOS or Android quickly.',
            some:            'Flutter and React Native are very approachable with your coding background.',
            collab:          'App dev blends design, backend, and mobile — highly collaborative.',
            freelance:       'Mobile freelancing is one of the most accessible paths to independent work.',
            broad:           'Every business wants a mobile presence — demand is truly everywhere.',
            avoid:           'Mobile dev relies more on UX intuition and logic than heavy mathematics.',
        }
    },
    cybersecurity: {
        name: 'Cybersecurity',
        icon: '🔐',
        tag:  'Offensive · Defensive · Cloud Security',
        url:  '../cybersecurity.html',
        grad: 'linear-gradient(135deg,#ef4444,#b91c1c)',
        why: {
            security:        'Protecting systems is exactly what cybersecurity professionals do every day.',
            pentest:         'Your dream project of running a pentest is a real entry-level security job.',
            solo:            'Many security roles reward deep independent research and solo focus.',
            love:            'Cybersecurity evolves fast — your love of learning is a massive advantage.',
            'prefer-stable': 'Core security fundamentals (networking, cryptography) stay stable for decades.',
            'late-high':     'OSCP holders average $130K+ — the investment in deep learning pays back big.',
            highceiling:     'Elite red teamers and CISOs regularly exceed $200K.',
            struggle:        'CompTIA Network+ and Security+ give a structured, achievable starting path.',
        }
    },
    aiml: {
        name: 'AI / ML Engineering',
        icon: '🤖',
        tag:  'Machine Learning · LLMs · MLOps',
        url:  '../AI-ML.html',
        grad: 'linear-gradient(135deg,#5b4fc6,#9650ff)',
        why: {
            intelligence:    'Teaching machines to think is the core mission of AI/ML engineering.',
            aimodel:         'Training an AI model is literally the day job of an ML engineer.',
            love:            'AI evolves faster than any other field — your curiosity is your biggest asset.',
            'late-high':     'AI/ML has the highest salary ceiling in all of tech — worth every extra year.',
            highceiling:     'Median AI/ML salary is $187K. Senior specialists exceed $300K.',
            okay:            'Math comfort is all you need to start — deep expertise builds with practice.',
            solo:            'Research-heavy ML work rewards deep, independent thinking.',
            'prefer-stable': 'Core ML math (linear algebra, calculus, probability) is timeless.',
        }
    },
    datascience: {
        name: 'Data Science',
        icon: '📊',
        tag:  'Analytics · ML · Business Intelligence',
        url:  '../data-science.html',
        grad: 'linear-gradient(135deg,#4169E1,#0ea5e9)',
        why: {
            data:            'Finding stories in data is the exact job description of a data scientist.',
            dashboard:       'Building analytics dashboards is a core data science deliverable.',
            okay:            'Being okay with math is enough — most DS roles don\'t require pure research math.',
            love:            'Data science rewards the endlessly curious — there\'s always more to uncover.',
            broad:           'Every industry from healthcare to retail desperately needs data scientists.',
            'quick-earn':    'Data analyst is one of the fastest entry points to a $65K+ first role.',
            collab:          'Data scientists regularly present findings to business teams — great for collaborators.',
            client:          'Data storytelling and executive presentations suit client-facing personalities.',
        }
    },
    cloud: {
        name: 'Cloud Computing',
        icon: '☁️',
        tag:  'AWS · Azure · GCP · DevOps',
        url:  '../cloud-computing.html',
        grad: 'linear-gradient(135deg,#0ea5e9,#16a34a)',
        why: {
            building:        'Cloud engineers build the infrastructure that powers every modern app and service.',
            'prefer-stable': 'AWS, Azure, and GCP certifications hold strong value for 5+ years.',
            faststart:       'Cloud certs can be earned in months — employers pay well from day one.',
            'quick-earn':    'AWS Solutions Architect cert alone can land an $85K+ first job quickly.',
            broad:           'Every company migrating to cloud needs cloud professionals — demand is universal.',
            collab:          'Cloud and DevOps teams collaborate across every department in an organisation.',
            balanced:        'Cloud gives a reliable mid-term ramp: cert → junior → senior in 3–4 years.',
            mixed:           'Cloud engineers alternate between solo architecture work and team deployments.',
        }
    }
};

/* ─────────────────────────────────────────────────────────────
   SCORING WEIGHTS
   Each question + answer awards points to specific paths.
   Scale: high-signal answers award 14 pts, medium 6–8, minor 2–4.
   This ensures a dominant answer clearly wins even when other
   questions partially favour different paths.
───────────────────────────────────────────────────────────── */
const W = {
    'i-q4': { /* math comfort */
        love:            { aiml:8,  datascience:7, cybersecurity:4, cloud:2,  webdev:1, appdev:1 },
        okay:            { aiml:5,  datascience:6, cybersecurity:4, cloud:3,  webdev:2, appdev:2 },
        struggle:        { datascience:3, cybersecurity:3, cloud:4, webdev:5, appdev:5, aiml:1  },
        avoid:           { webdev:7, appdev:7,  cloud:5, cybersecurity:2, datascience:1, aiml:0 },
    },
    'i-q5': { /* coding experience */
        strong:          { webdev:8, appdev:8,  aiml:7, datascience:5, cybersecurity:5, cloud:5 },
        some:            { webdev:6, appdev:6,  aiml:4, datascience:4, cybersecurity:4, cloud:4 },
        little:          { webdev:4, appdev:4,  cloud:5, cybersecurity:3, datascience:3, aiml:2 },
        none:            { cloud:6,  cybersecurity:4, datascience:3, webdev:2, appdev:2, aiml:1 },
    },
    'i-q6': { /* problem type — highest signal question */
        security:        { cybersecurity:14, cloud:4,  aiml:2, datascience:1, webdev:1, appdev:1 },
        intelligence:    { aiml:14, datascience:6, cloud:2, cybersecurity:1, webdev:1, appdev:1  },
        data:            { datascience:14, aiml:5, cloud:2, cybersecurity:2, webdev:1, appdev:1  },
        building:        { webdev:12, appdev:12, cloud:5, cybersecurity:2, datascience:2, aiml:3 },
    },
    'i-q7': { /* work environment */
        solo:            { cybersecurity:7, aiml:7,  datascience:4, cloud:4, webdev:3, appdev:3  },
        collab:          { webdev:7,  appdev:7, datascience:6, cloud:6, aiml:4, cybersecurity:3  },
        mixed:           { cloud:6,   datascience:5, webdev:5, appdev:5, aiml:5, cybersecurity:4 },
        client:          { webdev:8,  appdev:6, datascience:7, cloud:4, cybersecurity:2, aiml:2  },
    },
    'i-q8': { /* dream project — second highest signal */
        pentest:         { cybersecurity:14, aiml:2, datascience:1, cloud:2, webdev:1, appdev:1 },
        aimodel:         { aiml:14, datascience:5, cloud:3, cybersecurity:1, webdev:1, appdev:1 },
        dashboard:       { datascience:13, aiml:4, cloud:4, webdev:5, appdev:2, cybersecurity:1 },
        webapp:          { webdev:12, appdev:12, cloud:5, datascience:2, aiml:2, cybersecurity:1 },
    },
    'i-q9': { /* learning attitude */
        love:            { aiml:7, cybersecurity:6, cloud:5, datascience:5, webdev:4, appdev:4   },
        okay:            { cloud:5, webdev:5, appdev:5, datascience:4, cybersecurity:4, aiml:4   },
        selective:       { webdev:6, appdev:5, datascience:5, cloud:5, cybersecurity:3, aiml:3   },
        'prefer-stable': { cloud:8, cybersecurity:5, datascience:4, webdev:4, appdev:4, aiml:2   },
    },
    'i-q10': { /* salary/growth path */
        highceiling:     { aiml:8,  cybersecurity:7, cloud:5, datascience:5, webdev:3, appdev:3  },
        faststart:       { webdev:8, appdev:7, cloud:8, datascience:5, cybersecurity:4, aiml:3   },
        broad:           { datascience:7, cloud:7, webdev:6, appdev:5, cybersecurity:5, aiml:4   },
        freelance:       { webdev:10, appdev:9, cybersecurity:5, datascience:4, cloud:3, aiml:3  },
    },
    'i-q11': { /* quick vs late growth */
        'late-high':     { aiml:9,  cybersecurity:8, datascience:5, cloud:4, webdev:2, appdev:2  },
        'quick-earn':    { webdev:9, appdev:8, cloud:8, datascience:5, cybersecurity:4, aiml:3   },
        balanced:        { cloud:7,  datascience:7, webdev:5, appdev:5, cybersecurity:5, aiml:5  },
        flexible:        { webdev:5, appdev:5, cloud:5, datascience:5, cybersecurity:4, aiml:4   },
    },
};

/* ─────────────────────────────────────────────────────────────
   NORMALISATION
   Compute the theoretical maximum each path can earn
   (best possible answer in every question) so the /8 rating
   is always fair and comparable across paths.
───────────────────────────────────────────────────────────── */
const MAX_RAW = (() => {
    const t = { webdev:0, appdev:0, cybersecurity:0, aiml:0, datascience:0, cloud:0 };
    Object.values(W).forEach(qmap => {
        const best = { webdev:0, appdev:0, cybersecurity:0, aiml:0, datascience:0, cloud:0 };
        Object.values(qmap).forEach(pts => {
            Object.keys(pts).forEach(p => {
                if ((pts[p] || 0) > best[p]) best[p] = pts[p] || 0;
            });
        });
        Object.keys(t).forEach(p => { t[p] += best[p]; });
    });
    return t;
})();

/* ─────────────────────────────────────────────────────────────
   SCORE CALCULATOR
   Returns array of {path, raw, outOf8, pct} sorted high→low.
   outOf8 is the display number (1 decimal, max 8.0).
───────────────────────────────────────────────────────────── */
function calculateScores(answers) {
    const raw = { webdev:0, appdev:0, cybersecurity:0, aiml:0, datascience:0, cloud:0 };

    Object.entries(W).forEach(([fieldId, qmap]) => {
        const val = answers[fieldId];
        if (val && qmap[val]) {
            Object.entries(qmap[val]).forEach(([path, pts]) => {
                raw[path] = (raw[path] || 0) + (pts || 0);
            });
        }
    });

    /* Sort first — rank is determined by raw score, not display number */
    const sorted = Object.keys(raw)
        .map(path => ({ path, raw: raw[path] }))
        .sort((a, b) => b.raw - a.raw);

    /* Attach normalised display values AFTER sorting */
    return sorted.map(item => {
        const maxP   = MAX_RAW[item.path] || 1;
        const ratio  = item.raw / maxP;
        const outOf8 = Math.round(ratio * 80) / 10;   /* 1-decimal, max 8.0 */
        const pct    = Math.round(ratio * 100);
        return { ...item, outOf8, pct };
    });
}

/* ─────────────────────────────────────────────────────────────
   PICK WHY TEXT
   Matches the first answer value that has a registered
   reason string for this path. Falls back to generic text.
───────────────────────────────────────────────────────────── */
function pickWhy(pathId, answers) {
    const why = PATHS[pathId].why;
    for (const val of Object.values(answers)) {
        if (why[val]) return why[val];
    }
    return `Your answers show solid alignment with ${PATHS[pathId].name}.`;
}

/* ─────────────────────────────────────────────────────────────
   FORM FIELD DEFINITIONS (for validation)
───────────────────────────────────────────────────────────── */
const FIELDS = [
    { id: 'i-name',  wrap: 'fw-name',  check: v => v.length > 0 },
    { id: 'i-age',   wrap: 'fw-age',   check: v => { const n = +v; return !isNaN(n) && n >= 13 && n <= 65; } },
    { id: 'i-level', wrap: 'fw-level', check: v => v !== '' },
    { id: 'i-q4',    wrap: 'fw-q4',    check: v => v !== '' },
    { id: 'i-q5',    wrap: 'fw-q5',    check: v => v !== '' },
    { id: 'i-q6',    wrap: 'fw-q6',    check: v => v !== '' },
    { id: 'i-q7',    wrap: 'fw-q7',    check: v => v !== '' },
    { id: 'i-q8',    wrap: 'fw-q8',    check: v => v !== '' },
    { id: 'i-q9',    wrap: 'fw-q9',    check: v => v !== '' },
    { id: 'i-q10',   wrap: 'fw-q10',   check: v => v !== '' },
    { id: 'i-q11',   wrap: 'fw-q11',   check: v => v !== '' },
];

/* ─────────────────────────────────────────────────────────────
   VALIDATION
───────────────────────────────────────────────────────────── */
function validateForm() {
    let valid = true;
    FIELDS.forEach(f => {
        const el   = document.getElementById(f.id);
        const wrap = document.getElementById(f.wrap);
        wrap.classList.remove('err');
        if (!f.check(el.value.trim())) {
            wrap.classList.add('err');
            valid = false;
        }
    });
    return valid;
}

/* Live clear errors as user fixes them */
document.querySelectorAll('select').forEach(s => {
    s.addEventListener('change', function () {
        this.classList.remove('ph');
        this.closest('.field').classList.remove('err');
    });
});
document.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', function () {
        this.closest('.field').classList.remove('err');
    });
});

/* ─────────────────────────────────────────────────────────────
   RENDER RESULTS
───────────────────────────────────────────────────────────── */
function renderResults(answers, ranked) {
    /* swap sections */
    document.getElementById('formSection').style.display    = 'none';
    document.getElementById('resultsSection').style.display = 'block';

    /* greeting */
    document.getElementById('rName').textContent = answers['i-name'] || 'there';

    /* user pills */
    const lvlMap = {
        highschool: 'High School Student',
        undergrad:  'Undergraduate',
        grad:       'Graduate Student',
        selflearner:'Self-taught Learner',
        professional:'Working Professional',
        bootcamp:   'Bootcamp Student',
    };
    const pills = [
        lvlMap[answers['i-level']] || '',
        answers['i-age'] ? `Age ${answers['i-age']}` : '',
    ].filter(Boolean);
    document.getElementById('rPills').innerHTML =
        pills.map(p => `<span class="upill">${p}</span>`).join('');

    /* sub text */
    const topPath = PATHS[ranked[0].path];
    document.getElementById('rSub').textContent =
        `Your answers point most strongly toward ${topPath.name}. ` +
        `The top 3 paths are ranked below by match score — click any card to explore the full roadmap, certifications, and career timeline.`;

    /* ── TOP 3 CARDS ──
       Rank labels are assigned strictly by sort position (i),
       never by the score number — so #1 is always the highest
       raw score regardless of how normalised values look. */
    const rankLabels = ['#1 Best Match', '#2 Strong Match', '#3 Good Match'];
    const rankClasses = ['rr1', 'rr2', 'rr3'];

    const top3El = document.getElementById('top3');
    top3El.innerHTML = '';

    ranked.slice(0, 3).forEach((item, i) => {
        const p   = PATHS[item.path];
        const why = pickWhy(item.path, answers);

        const card = document.createElement('a');
        card.className = 'prc';
        card.href      = p.url;

        card.innerHTML = `
            <div class="prc-bar" style="background:${p.grad};"></div>
            <div class="prc-inner">
                <div class="prc-left">
                    <span class="prc-rank ${rankClasses[i]}">${rankLabels[i]}</span>
                    <span class="prc-icon">${p.icon}</span>
                </div>
                <div class="prc-content">
                    <div class="prc-name">${p.name}</div>
                    <div class="prc-tag">${p.tag}</div>
                    <div class="prc-why">${why}</div>
                </div>
                <div class="prc-score">
                    <div class="score-display">
                        <span class="score-num">${item.outOf8.toFixed(1)}</span>
                        <span class="score-den">/8</span>
                    </div>
                    <div class="sbar-track">
                        <div class="sbar-fill"
                             data-pct="${item.pct}"
                             style="background:${p.grad};"></div>
                    </div>
                </div>
            </div>
            <div class="prc-footer">
                View Full Roadmap
                <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12"/>
                </svg>
            </div>
        `;

        top3El.appendChild(card);
    });

    /* animate score bars after paint */
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll('.sbar-fill').forEach(bar => {
                bar.style.width = bar.dataset.pct + '%';
            });
        }, 140);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────────────────────
   COLLECT ANSWERS
───────────────────────────────────────────────────────────── */
function collectAnswers() {
    const a = {};
    FIELDS.forEach(f => {
        a[f.id] = document.getElementById(f.id).value.trim();
    });
    return a;
}

/* ─────────────────────────────────────────────────────────────
   FORM SUBMIT
───────────────────────────────────────────────────────────── */
document.getElementById('pathForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        const firstErr = document.querySelector('.field.err');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const answers = collectAnswers();
    const ranked  = calculateScores(answers);
    renderResults(answers, ranked);
});

/* ─────────────────────────────────────────────────────────────
   RETAKE
───────────────────────────────────────────────────────────── */
document.getElementById('btnRetake').addEventListener('click', () => {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('formSection').style.display    = 'block';

    document.getElementById('pathForm').reset();
    document.querySelectorAll('select').forEach(s => s.classList.add('ph'));
    document.querySelectorAll('.field.err').forEach(f => f.classList.remove('err'));

    window.scrollTo({ top: 0, behavior: 'smooth' });
});
