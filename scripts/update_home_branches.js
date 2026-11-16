const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

const target = `<div className="branch-grid">
            {/* Jouri Hotel Branch (Flagship) */}
            <article className="branch-card">
              <img
                src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                alt="Jouri a Murwab Hotel — Just Relax Spa Doha"
              />
              <div>
                <span className="rating-row">
                  <a
                    className="rating"
                    href="https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ 4.96 (2.2K)
                  </a>
                  <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                    Open now
                  </span>
                </span>
                <h3>Jouri, a Murwab Hotel</h3>
                <p>Al Muthaf St, Street 137, Zone 18, Old Salata / Corniche, Doha</p>
                <p className="branch-card-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM · Tel: +974 4004 1000
                </p>
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => openModal(undefined, "jouri-hotel")}
                >
                  Book This Branch
                </button>
              </div>
            </article>

            {/* Retaj Salwa Branch */}
            <article className="branch-card">
              <img
                src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                alt="Retaj Salwa Resort & Spa — Just Relax Spa Doha"
              />
              <div>
                <span className="rating-row">
                  <a
                    className="rating"
                    href="https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ★ 4.95
                  </a>
                  <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                    Open now
                  </span>
                </span>
                <h3>Retaj Salwa Resort &amp; Spa</h3>
                <p>Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar</p>
                <p className="branch-card-hours">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM · Tel: +974 4429 8888
                </p>
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => openModal(undefined, "retaj-salwa")}
                >
                  Book This Branch
                </button>
              </div>
            </article>


          </div>`;

const replacement = `<div className="branch-grid">
            {/* Jouri Hotel Branch (Flagship) */}
            <article className="branch-card">
              <div className="branch-card-media">
                <img
                  src="/assets/just-relax/branches/jouri-hotel/jouri-hotel-hero.jpg"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  alt="Jouri a Murwab Hotel — Just Relax Spa Doha"
                />
              </div>
              <div className="branch-card-content">
                <div>
                  <div className="rating-row">
                    <a
                      className="rating"
                      href="https://maps.app.goo.gl/JbsB9BgUa1nxUPYeA?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ★ 4.96 (2.2K)
                    </a>
                    <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                      Open now
                    </span>
                    <span className="license-badge" title="Official Qatar Municipality License Number">
                      <i className="fa-solid fa-award" aria-hidden="true"></i>
                      L.n : 316057
                    </span>
                  </div>
                  <h3>Jouri, a Murwab Hotel</h3>
                  <p className="branch-card-address">Al Muthaf St, Street 137, Zone 18, Old Salata / Corniche, Doha</p>
                  <p className="branch-card-hours">
                    <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM · Tel: +974 4004 1000
                  </p>
                </div>
                <div className="branch-card-actions">
                  <button
                    className="button button-small"
                    type="button"
                    onClick={() => openModal(undefined, "jouri-hotel")}
                  >
                    Book This Branch
                  </button>
                  <button
                    className="button button-small button-ghost-gold"
                    type="button"
                    onClick={() => setWhatsAppModalOpen(true)}
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
                  </button>
                </div>
              </div>
            </article>

            {/* Retaj Salwa Branch */}
            <article className="branch-card">
              <div className="branch-card-media">
                <img
                  src="/assets/just-relax/branches/west-bay/west-bay-hero.jpg"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  alt="Retaj Salwa Resort & Spa — Just Relax Spa Doha"
                />
              </div>
              <div className="branch-card-content">
                <div>
                  <div className="rating-row">
                    <a
                      className="rating"
                      href="https://maps.app.goo.gl/2y2YLqXKL9fuEeXg9?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ★ 4.95
                    </a>
                    <span className="open-badge is-open" data-opens="10:00" data-closes="03:00">
                      Open now
                    </span>
                    <span className="license-badge" title="Official Qatar Municipality License Number">
                      <i className="fa-solid fa-award" aria-hidden="true"></i>
                      L.n : 288593
                    </span>
                  </div>
                  <h3>Retaj Salwa Resort &amp; Spa</h3>
                  <p className="branch-card-address">Salwa Road, Exit 29 / 31, Abu Nakhlah, Doha, Qatar</p>
                  <p className="branch-card-hours">
                    <i className="fa-regular fa-clock" aria-hidden="true"></i>Daily 10:00 AM – 3:00 AM · Tel: +974 4429 8888
                  </p>
                </div>
                <div className="branch-card-actions">
                  <button
                    className="button button-small"
                    type="button"
                    onClick={() => openModal(undefined, "retaj-salwa")}
                  >
                    Book This Branch
                  </button>
                  <button
                    className="button button-small button-ghost-gold"
                    type="button"
                    onClick={() => setWhatsAppModalOpen(true)}
                  >
                    <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp
                  </button>
                </div>
              </div>
            </article>
          </div>`;

// Normalize \r\n to match
const normalizedTarget = target.replace(/\r\n/g, '\n');
const normalizedPage = page.replace(/\r\n/g, '\n');
if (normalizedPage.includes(normalizedTarget)) {
  const isCRLF = page.includes('\r\n');
  const finalReplacement = isCRLF ? replacement.replace(/\n/g, '\r\n') : replacement;
  const finalTarget = isCRLF ? target.replace(/\n/g, '\r\n') : target.replace(/\r\n/g, '\n');
  page = page.replace(finalTarget, finalReplacement);
  fs.writeFileSync('src/app/page.tsx', page, 'utf8');
  console.log('Successfully updated branch cards in src/app/page.tsx');
} else {
  console.log('Target not found in src/app/page.tsx');
}
