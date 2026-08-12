import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generative AI Researcher",
  description:
    "Muyu Liu is a graduate researcher at ShanghaiTech University working on diffusion priors, inverse problems, and efficient video generation.",
};

const publications = [
  {
    year: "2026",
    venue: "ICML 2026",
    status: "First author",
    title:
      "Resolving Blind Inverse Problems under Dynamic Range Compression via Structured Forward Operator Modeling",
    summary:
      "A unified formulation for nonlinear dynamic-range degradation, using cascaded monotonic Bernstein operators and pretrained diffusion priors for training-free operator estimation and image reconstruction.",
    tags: ["Diffusion prior", "Blind inverse problems", "Structured operators"],
  },
  {
    year: "2026",
    venue: "arXiv",
    status: "First author",
    title:
      "Zero-shot Low-Field MRI Enhancement via Diffusion-Based Adaptive Contrast Transport",
    summary:
      "A zero-shot enhancement framework that couples differentiable Sinkhorn transport with diffusion sampling to correct nonlinear domain shift while preserving anatomical detail.",
    tags: ["Optimal transport", "Medical imaging", "Zero-shot enhancement"],
  },
  {
    year: "2024",
    venue: "Advanced Science",
    status: "Co-first author",
    title:
      "vEMINR: Ultra-Fast Isotropic Reconstruction for Volume Electron Microscopy with Implicit Neural Representation",
    summary:
      "A self-supervised implicit neural representation framework for arbitrary-scale isotropic reconstruction of anisotropic volume electron microscopy data.",
    tags: ["Implicit neural representation", "Electron microscopy", "3D reconstruction"],
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3 5.5h14v9H3v-9Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m3.5 6 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" />
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Muyu Liu, home">
            <span>ML</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#publications">Publications</a>
          </nav>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span /> Generative AI · Inverse Problems</div>
          <h1 id="hero-title">
            <span>Muyu Liu</span>
            <small>柳沐雨</small>
          </h1>
          <p>
            I study how generative models can be steered at inference time—
            building reliable, efficient systems that recover what the world has hidden.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#publications">
              Selected work <ArrowIcon />
            </a>
            <a className="button button-ghost" href="mailto:liumy2024@shanghaitech.edu.cn">
              <MailIcon /> Get in touch
            </a>
          </div>
        </div>

        <div className="hero-meta" aria-label="Affiliation">
          <span>Graduate Researcher</span>
          <span>ShanghaiTech University</span>
          <span>Shanghai, China</span>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to About">
          <span>Scroll</span><i />
        </a>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <div className="section-index" aria-hidden="true">01</div>
        <div className="section-heading">
          <p className="section-kicker">About</p>
          <h2 id="about-title">Making generative priors work under real-world constraints.</h2>
        </div>
        <div className="about-grid">
          <figure className="portrait-frame">
            <div className="portrait-wrap">
              <img src="/portrait.png" alt="Portrait of Muyu Liu" />
            </div>
            <figcaption>
              <span>Muyu Liu</span>
              <span>M.Sc. candidate, Computer Science</span>
            </figcaption>
          </figure>

          <div className="about-copy">
            <p className="lead">
              I am a master&apos;s student in Computer Science and Technology at
              <strong> ShanghaiTech University</strong>. My research focuses on
              controlling and optimizing generative models at inference time.
            </p>
            <p>
              Rather than retraining a model for every new task, I introduce structured
              operator constraints directly into diffusion sampling. This lets pretrained
              generative priors solve nonlinear inverse problems—including low-light
              enhancement, HDR overexposure recovery, and low-field MRI enhancement—while
              respecting physical consistency and limiting hallucination.
            </p>
            <p>
              I also work on efficient autoregressive video generation, with an emphasis on
              sparse attention, KV-cache compression, and temporal consistency for long-form
              generation.
            </p>

            <div className="research-focus" aria-label="Research interests">
              <p>Research interests</p>
              <ul>
                <li>Diffusion priors &amp; sampling control</li>
                <li>Optimal transport</li>
                <li>Implicit neural representations</li>
                <li>Autoregressive video generation</li>
              </ul>
            </div>

            <div className="about-links">
              <a href="mailto:liumy2024@shanghaitech.edu.cn">
                Email <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="publications" id="publications" aria-labelledby="publications-title">
        <div className="section-shell publications-inner">
          <div className="section-index" aria-hidden="true">02</div>
          <div className="section-heading publications-heading">
            <div>
              <p className="section-kicker">Publications</p>
              <h2 id="publications-title">Selected research</h2>
            </div>
            <p>Work spanning generative priors, computational imaging, and 3D reconstruction.</p>
          </div>

          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication" key={publication.title}>
                <div className="pub-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="pub-main">
                  <div className="pub-meta">
                    <span className="venue">{publication.venue}</span>
                    <span>{publication.status}</span>
                    <span>{publication.year}</span>
                  </div>
                  <h3>{publication.title}</h3>
                  <p>{publication.summary}</p>
                  <ul className="tags" aria-label="Topics">
                    {publication.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div>
            <p className="footer-name">Muyu Liu <span>柳沐雨</span></p>
            <p>Generative models, structured inference, and visual computing.</p>
          </div>
          <a href="mailto:liumy2024@shanghaitech.edu.cn">liumy2024@shanghaitech.edu.cn</a>
          <p className="copyright">© 2026 Muyu Liu</p>
        </div>
      </footer>
    </main>
  );
}
