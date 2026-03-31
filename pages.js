/* ═══════════════════════════════════════════
   SHARED JAVASCRIPT — pages.js
   Link this in every career path page
═══════════════════════════════════════════ */

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── FADE-IN ON SCROLL ── */
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('on'), i * 70);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade').forEach(el => fadeObserver.observe(el));

/* ── DARK / LIGHT MODE TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const saved = localStorage.getItem('theme') || 'light';

    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const dark = document.body.classList.contains('dark-mode');
        if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => { themeToggle.style.transform = ''; }, 300);
    });
}

/* ── MODAL SYSTEM ── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

/* close modal when clicking outside the box */
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

/* close modal on Escape key */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open')
            .forEach(m => closeModal(m.id));
    }
});

/* ── FEEDBACK FORM ── */
function setType(btn) {
    document.querySelectorAll('.fb-type')
        .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function submitFeedback() {
    const emailEl = document.getElementById('fbEmail');
    const textEl  = document.getElementById('fbText');
    if (!emailEl || !textEl) return;

    const email = emailEl.value.trim();
    const text  = textEl.value.trim();
    let valid = true;

    if (!email) {
        emailEl.style.borderColor = '#ef4444';
        valid = false;
    } else {
        emailEl.style.borderColor = '';
    }
    if (!text) {
        textEl.style.borderColor = '#ef4444';
        valid = false;
    } else {
        textEl.style.borderColor = '';
    }
    if (!valid) return;

    closeModal('feedbackModal');
    emailEl.value = '';
    textEl.value  = '';

    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}

/* ── INJECT SHARED FOOTER HTML ── */
/* 
   Call injectFooter() at the bottom of any page 
   after the <script src="pages.js"> tag.
   Pass the path prefix if the page is in a subfolder.
   Example: injectFooter('../') for pages one folder deep.
   Example: injectFooter('')    for pages in root folder.
*/
function injectFooter(pathPrefix) {
    if (pathPrefix === undefined) pathPrefix = '';

    const footerHTML = `
    <!-- MODALS -->
    <div class="modal-overlay" id="tosModal">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">Terms of Service</div>
                <button class="modal-close" onclick="closeModal('tosModal')">✕</button>
            </div>
            <div class="modal-body">
                <div class="modal-notice">
                    <span class="modal-notice-icon">⚠️</span>
                    <p>The information provided on YourCSPath is based on independent research, community knowledge, and publicly available data. While we strive for accuracy, errors may occur. Please verify critical details — especially certification costs, salary figures, and course availability — from official sources before making career or financial decisions.</p>
                </div>
                <div class="modal-section">
                    <div class="modal-section-title">Content Accuracy</div>
                    <p>All roadmaps, timelines, salary ranges, and certification details are compiled from publicly available sources and community research. They are intended as general guidance only. YourCSPath does not guarantee that all information is current, complete, or error-free.</p>
                </div>
                <div class="modal-section">
                    <div class="modal-section-title">No Professional Advice</div>
                    <p>Nothing on this platform constitutes professional career, financial, or legal advice. Career outcomes depend on individual effort, market conditions, and many other factors outside our control. Use this content as a starting point, not a guarantee.</p>
                </div>
                <div class="modal-section">
                    <div class="modal-section-title">External Links</div>
                    <p>YourCSPath links to third-party platforms including Coursera, TryHackMe, TCM Security, and job boards. We are not affiliated with or responsible for the content, pricing, or availability of those external services.</p>
                </div>
                <div class="modal-section">
                    <div class="modal-section-title">Updates</div>
                    <p>This platform is actively maintained and updated. Information may change without notice. If you notice outdated or incorrect information, please use the Feedback option to let us know.</p>
                </div>
            </div>
            <div class="modal-footer-row">
                <button class="modal-btn" onclick="closeModal('tosModal')">I Understand</button>
            </div>
        </div>
    </div>

    <div class="modal-overlay" id="feedbackModal">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">Send Feedback</div>
                <button class="modal-close" onclick="closeModal('feedbackModal')">✕</button>
            </div>
            <div class="modal-body">
                <p style="font-size:.88rem;color:var(--muted,#5f6c7b);font-family:'Epilogue',sans-serif;margin-bottom:1.4rem;line-height:1.6;">Found an error, have a suggestion, or want to share your experience? We read every message and use your feedback to improve the platform.</p>
                <div class="fb-field">
                    <label class="fb-label">Your Email</label>
                    <input type="email" class="fb-input" id="fbEmail" placeholder="yourname@email.com">
                </div>
                <div class="fb-field">
                    <label class="fb-label">Your Feedback</label>
                    <textarea class="fb-textarea" id="fbText" placeholder="Tell us what you found helpful, what could be improved, or report any errors..."></textarea>
                </div>
                <div class="fb-type-row">
                    <span class="fb-type-label">Type:</span>
                    <button class="fb-type active" onclick="setType(this)">💡 Suggestion</button>
                    <button class="fb-type" onclick="setType(this)">🐛 Error Report</button>
                    <button class="fb-type" onclick="setType(this)">⭐ General</button>
                </div>
            </div>
            <div class="modal-footer-row">
                <button class="modal-btn-outline" onclick="closeModal('feedbackModal')">Cancel</button>
                <button class="modal-btn" onclick="submitFeedback()">Submit Feedback</button>
            </div>
        </div>
    </div>

    <div class="toast" id="toast">✓ Feedback submitted — thank you!</div>

    <!-- FOOTER -->
<footer class="cy-footer" id="about">

        <!-- Top brand + nav row -->
        <div class="cy-footer-top">
            <div class="cy-footer-brand">
                <img src="${pathPrefix}logo3.png" alt="YourCSPath">
                <p>Empowering Computer Science students to make confident career decisions through personalised roadmaps, certifications, salary data, and remote job boards — all in one place.</p>
                
            </div>

            <div class="cy-footer-nav-cols">
                <div class="cy-footer-col">
                    <div class="cy-footer-col-title">Career Paths</div>
                    <a href="${pathPrefix}webdevelopment.html">Web Development</a>
                    <a href="${pathPrefix}AI-ML.html">AI / ML Engineering</a>
                    <a href="${pathPrefix}mobile-dev.html">Mobile Development</a>
                    <a href="${pathPrefix}data-science.html">Data Science</a>
                    <a href="${pathPrefix}cybersecurity.html">Cybersecurity</a>
                    <a href="${pathPrefix}cloud-computing.html">Cloud Computing</a>
                </div>
                <div class="cy-footer-col">
                    <div class="cy-footer-col-title">Platform</div>
                    <a href="${pathPrefix}index.html#how-it-works">How It Works</a>
                    <a href="${pathPrefix}index.html#features">Features</a>
                    <a href="${pathPrefix}quiz.html">Take the Quiz</a>
                    <a href="#" onclick="openModal('tosModal');return false;">Terms of Service</a>
                    <a href="#" onclick="openModal('feedbackModal');return false;">Send Feedback</a>
                </div>
                <div class="cy-footer-col">
                    <div class="cy-footer-col-title">Quick Stats</div>
                    <div class="cy-footer-stat">
                        <span class="cy-stat-val">6+</span>
                        <span class="cy-stat-lbl">Career Paths</span>
                    </div>
                    <div class="cy-footer-stat">
                        <span class="cy-stat-val">9</span>
                        <span class="cy-stat-lbl">Phases per Roadmap</span>
                    </div>
                    <div class="cy-footer-stat">
                        <span class="cy-stat-val">100%</span>
                        <span class="cy-stat-lbl">Free Forever</span>
                    </div>
                    <div class="cy-footer-stat">
                        <span class="cy-stat-val">2 min</span>
                        <span class="cy-stat-lbl">Quiz to Results</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Divider -->
        <div class="cy-footer-divider"></div>

        <!-- Bottom bar -->
        <div class="cy-footer-bottom">
            <div class="cy-footer-made">
                <span class="cy-made-label">Crafted with ❤️ by</span>
                <div class="cy-made-devs">
                    <a href="https://www.linkedin.com/in/sohail-logics" target="_blank" class="cy-dev-pill">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Sohail Ahmad
                    </a>
                    <span class="cy-made-amp">&</span>
                    <a href="https://www.linkedin.com/in/zeeshan-builds" target="_blank" class="cy-dev-pill">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Zeeshan Ahmad
                    </a>
                </div>
            </div>
            <div class="cy-footer-copy">
                &copy; 2025 YourCSPath. All rights reserved.
            </div>
        </div>

    </footer>
    `;

    /* insert just before closing body tag */
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    /* re-attach modal close listeners for dynamically injected modals */
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });
}


/* ── MOBILE DRAWER ── */
(function() {
    const drawer = document.getElementById('mobileDrawer');
    const btn    = document.getElementById('hamburgerBtn');
    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            drawer.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !btn.contains(e.target)) {
            drawer.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();