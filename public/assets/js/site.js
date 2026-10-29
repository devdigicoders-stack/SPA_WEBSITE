(() => {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    menuButton?.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(open));
    });

    const dialog = document.querySelector('[data-booking]');
    const branchStep = dialog?.querySelector('[data-booking-step="branches"]');
    const actionStep = dialog?.querySelector('[data-booking-step="actions"]');
    const branchData = JSON.parse(document.querySelector('#branch-data')?.textContent || '{}');
    const isRtl = document.documentElement.dir === 'rtl';
    const actionMeta = {
        whatsapp: { icon: 'fa-brands fa-whatsapp', en: 'WhatsApp', ar: 'واتساب' },
        call: { icon: 'fa-solid fa-phone', en: 'Call', ar: 'اتصال' },
        directions: { icon: 'fa-solid fa-location-arrow', en: 'Directions', ar: 'الاتجاهات' },
    };
    const contextEl = dialog?.querySelector('[data-booking-context]');
    let selectedService = '';
    let selectedTherapist = '';
    let preferredAction = '';

    const thankyouUrl = (slug, action) => {
        const params = new URLSearchParams({ b: slug, a: action, lang: document.documentElement.lang });
        if (selectedService) params.set('service', selectedService);
        if (selectedTherapist) params.set('therapist', selectedTherapist);
        return `/thankyou?${params.toString()}`;
    };

    const showBranches = () => {
        branchStep.hidden = false;
        actionStep.hidden = true;
    };

    const showActions = (slug) => {
        const branch = branchData[slug];
        if (!branch) return false;
        branchStep.hidden = true;
        actionStep.hidden = false;
        actionStep.querySelector('[data-selected-branch]').textContent = isRtl ? branch.name_ar : branch.name_en;
        actionStep.querySelectorAll('[data-action]').forEach((link) => {
            link.href = thankyouUrl(slug, link.dataset.action);
        });
        return true;
    };

    document.querySelectorAll('[data-book]').forEach((button) => button.addEventListener('click', () => {
        selectedService = button.dataset.service || '';
        selectedTherapist = button.dataset.therapist || '';
        preferredAction = button.dataset.preferredAction || '';
        const preselected = button.dataset.preselectBranch;
        if (preselected && branchData[preselected]) {
            if (preferredAction && actionMeta[preferredAction]) {
                window.location.assign(thankyouUrl(preselected, preferredAction));
                return;
            }
            dialog.showModal();
            showActions(preselected);
            actionStep.querySelector('[data-action]')?.focus();
            return;
        }
        const meta = actionMeta[preferredAction];
        if (contextEl) {
            contextEl.hidden = !meta;
            if (meta) {
                contextEl.querySelector('[data-context-icon]').className = meta.icon;
                contextEl.querySelector('[data-context-text]').textContent = isRtl
                    ? `سيتم المتابعة عبر ${meta.ar} — اختر الفرع`
                    : `Continue via ${meta.en} — choose your branch`;
            }
        }
        showBranches();
        dialog.showModal();
    }));

    dialog?.querySelector('[data-booking-back]')?.addEventListener('click', showBranches);

    dialog?.querySelectorAll('[data-branch]').forEach((button) => button.addEventListener('click', () => {
        const slug = button.dataset.branch;
        const branch = branchData[slug];
        if (!branch) return;
        const selectionId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        if (window.snaptr) window.snaptr('track', 'ADD_CART', { item_ids: [selectedService || 'spa-treatment'], transaction_id: selectionId });
        if (window.fbq) window.fbq('track', 'AddToCart', { content_ids: [selectedService || 'spa-treatment'], content_category: slug }, { eventID: selectionId });
        if (window.gtag) window.gtag('event', 'add_to_cart', { items: [{ item_id: selectedService || 'spa-treatment', item_category: slug }] });
        if (preferredAction && actionMeta[preferredAction]) {
            button.classList.add('selected');
            setTimeout(() => {
                dialog.close();
                window.location.assign(thankyouUrl(slug, preferredAction));
            }, 160);
            return;
        }
        if (showActions(slug)) actionStep.querySelector('[data-action]')?.focus();
    }));

    const toMinutes = (value) => {
        const [h, m] = value.split(':').map(Number);
        return h * 60 + m;
    };
    const dubaiMinutes = () => {
        const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
        return (Number(parts.find((p) => p.type === 'hour').value) % 24) * 60 + Number(parts.find((p) => p.type === 'minute').value);
    };
    const isOpenNow = (opens, closes) => {
        const current = dubaiMinutes();
        const open = toMinutes(opens);
        const close = toMinutes(closes);
        return close > open ? current >= open && current < close : current >= open || current < close;
    };
    const shortHour = (value) => {
        const [h, m] = value.split(':').map(Number);
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        if (isRtl) return `${hour12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'صباحاً' : 'مساءً'}`;
        return `${hour12}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
    };

    const refreshOpenBadges = () => {
        document.querySelectorAll('[data-open-badge]').forEach((badge) => {
            const open = isOpenNow(badge.dataset.opens, badge.dataset.closes);
            badge.classList.toggle('is-open', open);
            badge.textContent = open
                ? (isRtl ? 'مفتوح الآن' : 'Open now')
                : (isRtl ? `يفتح ${shortHour(badge.dataset.opens)}` : `Opens ${shortHour(badge.dataset.opens)}`);
        });
        document.querySelectorAll('[data-open-state]').forEach((state) => {
            const host = state.closest('[data-opens]');
            if (!host) return;
            const open = isOpenNow(host.dataset.opens, host.dataset.closes);
            state.classList.toggle('is-open', open);
            state.textContent = open ? (isRtl ? '· مفتوح' : '· Open') : (isRtl ? '· مغلق' : '· Closed');
        });
    };
    refreshOpenBadges();
    setInterval(refreshOpenBadges, 60000);

    const formatRemaining = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return isRtl ? `${h} س ${m} د` : `${h}h ${m}m`;
    };
    const refreshOfferTimers = () => {
        document.querySelectorAll('[data-offer-timer]').forEach((timer) => {
            const current = dubaiMinutes();
            const open = toMinutes(timer.dataset.opens);
            const close = toMinutes(timer.dataset.closes);
            const live = current >= open && current < close;
            timer.classList.toggle('is-live', live);
            if (live) {
                timer.textContent = isRtl ? `العرض ساري — ينتهي خلال ${formatRemaining(close - current)}` : `Offer is live — ends in ${formatRemaining(close - current)}`;
            } else {
                const until = current < open ? open - current : 1440 - current + open;
                timer.textContent = isRtl ? `يبدأ خلال ${formatRemaining(until)}` : `Starts in ${formatRemaining(until)}`;
            }
        });
    };
    refreshOfferTimers();
    setInterval(refreshOfferTimers, 60000);

    document.querySelectorAll('[data-contact-button]').forEach((button) => button.addEventListener('click', () => {
        const slug = button.dataset.contactButton;
        document.querySelectorAll('[data-contact-button]').forEach((item) => item.classList.toggle('active', item === button));
        document.querySelectorAll('[data-contact-panel]').forEach((panel) => {
            const active = panel.dataset.contactPanel === slug;
            panel.hidden = !active;
            panel.classList.toggle('active', active);
        });
        document.querySelector(`[data-contact-panel="${CSS.escape(slug)}"]`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }));

    const jumpButtons = document.querySelectorAll('[data-branch-jump]');
    jumpButtons.forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        const slug = button.dataset.branchJump;
        jumpButtons.forEach((item) => item.classList.toggle('active', item === button));
        document.querySelector(`[data-branch-slug="${CSS.escape(slug)}"]`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }));

    const branchCards = document.querySelectorAll('[data-branch-card]');
    if (jumpButtons.length && branchCards.length && 'IntersectionObserver' in window) {
        const setActive = (slug) => jumpButtons.forEach((item) => item.classList.toggle('active', item.dataset.branchJump === slug));
        const jumpObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.dataset.branchSlug);
            });
        }, { rootMargin: '-38% 0px -55% 0px' });
        branchCards.forEach((card) => jumpObserver.observe(card));
    }

    const sortButton = document.querySelector('[data-sort-branches]');
    sortButton?.addEventListener('click', () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const toRad = (value) => value * Math.PI / 180;
            const distance = (card) => {
                const lat = Number(card.dataset.lat);
                const lng = Number(card.dataset.lng);
                const dLat = toRad(lat - coords.latitude);
                const dLng = toRad(lng - coords.longitude);
                const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(coords.latitude)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
                return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            };
            [...document.querySelectorAll('[data-branch-card]')].map((card) => ({ card, km: distance(card) })).sort((a, b) => a.km - b.km).forEach(({ card, km }, index) => {
                const closest = index === 0;
                card.classList.toggle('closest-branch', closest);
                card.setAttribute('aria-label', closest ? 'Closest Laguna Global branch' : 'Laguna Global branch');
                card.querySelector('[data-branch-distance]').textContent = `${km.toFixed(1)} km${closest ? ' · Closest' : ''}`;
                const label = card.querySelector('[data-closest-label]');
                if (label) label.hidden = !closest;
                card.parentElement.append(card);
            });
            document.querySelector('[data-branch-card]')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        }, () => {}, { timeout: 8000, maximumAge: 300000 });
    });

    dialog?.querySelector('[data-locate]')?.addEventListener('click', () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const toRad = (value) => value * Math.PI / 180;
            const distance = (lat, lng) => {
                const dLat = toRad(lat - coords.latitude);
                const dLng = toRad(lng - coords.longitude);
                const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(coords.latitude)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
                return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            };
            const cards = [...dialog.querySelectorAll('[data-branch]')].map((card) => ({ card, km: distance(Number(card.dataset.lat), Number(card.dataset.lng)) })).sort((a, b) => a.km - b.km);
            cards.forEach(({ card, km }, index) => {
                const closest = index === 0;
                card.classList.toggle('recommended', closest);
                card.classList.toggle('closest-choice', closest);
                card.setAttribute('aria-label', closest ? 'Closest recommended branch' : 'Branch option');
                card.querySelector('[data-distance]').textContent = `${km.toFixed(1)} km${closest ? ' · Closest' : ''}`;
                card.parentElement.append(card);
            });
        }, () => {}, { timeout: 8000, maximumAge: 300000 });
    });
})();

// Treatment Finder — interactive body-map quiz
(() => {
    const root = document.querySelector('[data-finder]');
    const dataEl = document.querySelector('[data-finder-data]');
    if (!root || !dataEl) return;

    const data = JSON.parse(dataEl.textContent);
    const isRtl = document.documentElement.dir === 'rtl';
    const selected = { zones: new Set(), goal: '', pressure: '' };
    let tracked = false;

    const resultWrap = root.querySelector('[data-finder-result]');
    const emptyEl = root.querySelector('[data-finder-empty]');
    const altWrap = root.querySelector('[data-finder-alt]');

    const toggleZone = (zone) => {
        const on = !selected.zones.has(zone);
        if (on) { selected.zones.add(zone); } else { selected.zones.delete(zone); }
        root.querySelectorAll(`[data-zone="${CSS.escape(zone)}"]`).forEach((n) => n.classList.toggle('active', on));
        update();
    };

    root.querySelectorAll('[data-zone]').forEach((el) => {
        el.addEventListener('click', () => toggleZone(el.dataset.zone));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleZone(el.dataset.zone); }
        });
    });

    root.querySelectorAll('[data-goal]').forEach((el) => el.addEventListener('click', () => {
        const active = el.classList.contains('active');
        root.querySelectorAll('[data-goal]').forEach((b) => b.classList.remove('active'));
        selected.goal = active ? '' : el.dataset.goal;
        if (!active) el.classList.add('active');
        update();
    }));

    root.querySelectorAll('[data-pressure]').forEach((el) => el.addEventListener('click', () => {
        const active = el.classList.contains('active');
        root.querySelectorAll('[data-pressure]').forEach((b) => b.classList.remove('active'));
        selected.pressure = active ? '' : el.dataset.pressure;
        if (!active) el.classList.add('active');
        update();
    }));

    function update() {
        const selEl = root.querySelector('[data-finder-selection]');
        if (selEl) {
            const names = [...selected.zones].map((z) => data.zones[z]?.[isRtl ? 'ar' : 'en']).filter(Boolean);
            selEl.hidden = !names.length;
            selEl.textContent = names.join(' + ');
        }
        if (!selected.zones.size && !selected.goal && !selected.pressure) {
            resultWrap.hidden = true;
            emptyEl.hidden = false;
            return;
        }
        const scores = {};
        const add = (services) => Object.entries(services).forEach(([id, w]) => { scores[id] = (scores[id] || 0) + w; });
        selected.zones.forEach((z) => data.zones[z] && add(data.zones[z].services));
        if (selected.goal) add(data.goals[selected.goal].services);
        if (selected.pressure) add(data.pressure[selected.pressure].services);
        const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => id).filter((id) => data.services[id]);
        if (!ranked.length) return;

        const [primary, alt] = ranked;
        const svc = data.services[primary];
        const reasons = [
            ...[...selected.zones].map((z) => (data.zones[z][isRtl ? 'ar' : 'en']).toLowerCase()),
            ...(selected.goal ? [data.goals[selected.goal][isRtl ? 'ar' : 'en'].toLowerCase()] : []),
            ...(selected.pressure ? [`${data.pressure[selected.pressure][isRtl ? 'ar' : 'en'].toLowerCase()} ${isRtl ? 'ضغط' : 'pressure'}`] : []),
        ];

        resultWrap.querySelector('[data-result-label]').textContent = data.labels.recommendation;
        resultWrap.querySelector('[data-result-name]').textContent = svc.name;
        resultWrap.querySelector('[data-result-desc]').textContent = svc.desc;
        resultWrap.querySelector('[data-result-duration]').textContent = svc.duration;
        resultWrap.querySelector('[data-result-duration]').hidden = !svc.duration;
        resultWrap.querySelector('[data-result-reason]').textContent = reasons.join(' · ');
        const img = resultWrap.querySelector('[data-result-image]');
        img.src = svc.image;
        img.alt = svc.name;
        resultWrap.querySelector('[data-result-book]').dataset.service = primary;
        resultWrap.querySelector('[data-result-link]').href = svc.url;

        if (alt && data.services[alt]) {
            const altSvc = data.services[alt];
            altWrap.hidden = false;
            altWrap.querySelector('[data-alt-book]').textContent = altSvc.name;
            altWrap.querySelector('[data-alt-book]').dataset.service = alt;
            altWrap.querySelector('[data-alt-link]').href = altSvc.url;
        } else {
            altWrap.hidden = true;
        }

        emptyEl.hidden = true;
        resultWrap.hidden = false;
        resultWrap.classList.remove('reveal');
        void resultWrap.offsetWidth;
        resultWrap.classList.add('reveal');

        if (!tracked && typeof window.gtag === 'function') {
            tracked = true;
            window.gtag('event', 'treatment_finder_result', { service_id: primary, zones: [...selected.zones].join(','), goal: selected.goal, pressure: selected.pressure });
        }
    }

    altWrap?.querySelector('[data-alt-book]')?.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.service;
        const svc = data.services[id];
        if (!svc) return;
        selected.zones.clear();
        root.querySelectorAll('[data-zone]').forEach((z) => z.classList.remove('active'));
        resultWrap.querySelector('[data-result-name]').textContent = svc.name;
        resultWrap.querySelector('[data-result-desc]').textContent = svc.desc;
        resultWrap.querySelector('[data-result-duration]').textContent = svc.duration;
        const img = resultWrap.querySelector('[data-result-image]');
        img.src = svc.image;
        img.alt = svc.name;
        resultWrap.querySelector('[data-result-book]').dataset.service = id;
        resultWrap.querySelector('[data-result-link]').href = svc.url;
        altWrap.hidden = true;
    });
})();

// Therapist photos — deter casual image saving (right-click / long-press / drag)
document.querySelectorAll('.therapist-photo, .therapist-card img').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
});
