import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Muyu Liu is a graduate researcher at ShanghaiTech University working on diffusion priors, inverse problems, and efficient video generation.",
};

type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  logo: string;
  logoAlt: string;
  organizationUrl: string;
  department?: string;
  details?: string[];
  logoVariant?: "light" | "maroon";
};

const experienceGroups: { label: string; items: ExperienceItem[] }[] = [
  {
    label: "Education",
    items: [
      {
        organization: "ShanghaiTech University",
        role: "M.Sc. in Computer Science and Technology",
        period: "Sep 2024 - Jun 2027 (Expected)",
        logo: "/logos/shanghaitech-v2.svg",
        logoAlt: "ShanghaiTech University logo",
        organizationUrl: "https://www.shanghaitech.edu.cn/",
        logoVariant: "light",
      },
      {
        organization: "Shandong University",
        role: "B.Eng. in Software Engineering",
        period: "Sep 2020 - Jun 2024",
        logo: "/logos/sdu-v2.svg",
        logoAlt: "Shandong University logo",
        organizationUrl: "https://www.sdu.edu.cn/",
        logoVariant: "light",
      },
    ],
  },
  {
    label: "Internship",
    items: [
      {
        organization: "vivo",
        role: "AIGC Algorithm Intern",
        period: "May 2026 - Present",
        logo: "/logos/vivo-v2.svg",
        logoAlt: "vivo logo",
        organizationUrl: "https://www.vivo.com.cn/",
        logoVariant: "light",
      },
    ],
  },
];

const authorHomepages: Record<string, string> = {
  "Chenhe Du": "https://duchenhe.com/en/",
  "Xuanyu Tian": "https://meijitian.github.io/",
  "Qing Wu": "https://iwuqing.github.io/",
};

const publications = [
  {
    title:
      "Resolving Blind Inverse Problems under Dynamic Range Compression via Structured Forward Operator Modeling",
    authors: [
      { name: "Muyu Liu", isMe: true },
      { name: "Xuanyu Tian" },
      { name: "Chenhe Du" },
      { name: "Qing Wu" },
      { name: "Hongjiang Wei" },
      { name: "Yuyao Zhang" },
    ],
    venue: "International Conference on Machine Learning (ICML), 2026",
    paperUrl: "https://arxiv.org/abs/2603.01890",
    codeUrl: "https://github.com/brucelmy02/CaMBDiff",
    image: "/publications/cambdiff.png",
    imageAlt: "Illustration of unknown dynamic range compression in CaMB-Diff",
  },
  {
    title:
      "Plug-and-Play Diffusion Meets ADMM: Dual-Variable Coupling for Robust Medical Image Reconstruction",
    authors: [
      { name: "Chenhe Du" },
      { name: "Xuanyu Tian" },
      { name: "Qing Wu" },
      { name: "Muyu Liu", isMe: true },
      { name: "Jingyi Yu" },
      { name: "Hongjiang Wei" },
      { name: "Yuyao Zhang" },
    ],
    venue: "International Conference on Machine Learning (ICML), 2026",
    paperUrl: "https://arxiv.org/abs/2602.23214",
    codeUrl: "https://github.com/duchenhe/DC-PnPDP",
    image: "/publications/dc-pnpdp.png",
    imageAlt: "CT reconstruction comparisons from DC-PnPDP",
  },
  {
    title:
      "Zero-shot Low-Field MRI Enhancement via Diffusion-Based Adaptive Contrast Transport",
    authors: [
      { name: "Muyu Liu", isMe: true },
      { name: "Chenhe Du" },
      { name: "Xuanyu Tian" },
      { name: "Qing Wu" },
      { name: "Xiao Wang" },
      { name: "Haonan Zhang" },
      { name: "Hongjiang Wei" },
      { name: "Yuyao Zhang" },
    ],
    venue: "arXiv preprint, 2026",
    paperUrl: "https://arxiv.org/abs/2603.01913",
    codeUrl: null,
    image: "/publications/dact.png",
    imageAlt: "Overview of the DACT low-field MRI enhancement pipeline",
  },
  {
    title:
      "vEMINR: Ultra-Fast Isotropic Reconstruction for Volume Electron Microscopy with Implicit Neural Representation",
    authors: [
      { name: "Jibin Yang", equalContribution: true },
      { name: "Jie Huo", equalContribution: true },
      { name: "Muyu Liu", isMe: true, equalContribution: true },
      { name: "Chenjie Feng" },
      { name: "Yan Zhang" },
      { name: "Gang Pan" },
      { name: "Wenjia Meng" },
      { name: "Renmin Han" },
    ],
    venue: "Advanced Science, 2026",
    paperUrl: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202511922",
    codeUrl: "https://github.com/KysonYang001/vEMINR",
    equalContributionNote: true,
    image: "/publications/veminr.jpg",
    imageAlt: "Workflow of the vEMINR reconstruction method",
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

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.55-3.9-1.55-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.4-1.27.72-1.56-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.16 1.18a10.93 10.93 0 0 1 5.76 0c2.18-1.49 3.15-1.18 3.15-1.18.64 1.59.24 2.77.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.41-2.7 5.4-5.28 5.68.42.36.78 1.07.78 2.16v3.2c0 .32.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M2.5 8.6 12 3l9.5 5.6L12 14.2 2.5 8.6Z" fill="currentColor" />
      <path
        d="M6.2 11.4v4.8c1.55 1.45 3.53 2.18 5.8 2.18s4.25-.73 5.8-2.18v-4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M21.5 8.8v6.1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SignatureCurve() {
  return (
    <svg className="signature-curve" aria-hidden="true" viewBox="0 0 120 28" fill="none">
      <path
        d="M2 24C20 24 29 23 42 18C54 13 61 8 74 5C88 2 103 2 118 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="2" cy="24" r="2" fill="currentColor" />
      <circle cx="74" cy="5" r="2" fill="currentColor" />
      <circle cx="118" cy="2.5" r="2" fill="currentColor" />
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
            <SignatureCurve />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#publications">Publications</a>
          </nav>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span /> Generative AI · Inverse Problems</div>
          <h1 id="hero-title">
            <span>Muyu Liu</span>
            <small>柳沐雨</small>
          </h1>
          <div className="hero-actions">
            <a className="button button-primary" href="#publications">
              Selected work <ArrowIcon />
            </a>
            <a className="button button-ghost" href="mailto:liumy2024@shanghaitech.edu.cn">
              <MailIcon /> Get in touch
            </a>
          </div>
        </div>

        <a className="scroll-cue" href="#about" aria-label="Scroll to About">
          <span>Scroll</span><i />
        </a>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <div className="section-index" aria-hidden="true">01</div>
        <div className="section-heading section-heading-simple">
          <h2 id="about-title">About</h2>
          <SignatureCurve />
        </div>
        <div className="about-grid">
          <figure className="portrait-frame">
            <div className="portrait-wrap">
              <img src="/portrait.png" alt="Portrait of Muyu Liu" />
            </div>
            <figcaption>
              <span>Muyu Liu</span>
            </figcaption>
            <div className="profile-links" aria-label="Profile links">
              <a
                href="https://github.com/brucelmy02"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="https://scholar.google.com/citations?hl=zh-CN&user=IE-DDTEAAAAJ"
                target="_blank"
                rel="noreferrer"
                aria-label="Google Scholar"
                title="Google Scholar"
              >
                <ScholarIcon />
              </a>
              <a
                href="mailto:liumy2024@shanghaitech.edu.cn"
                aria-label="Email Muyu Liu"
                title="Email"
              >
                <MailIcon />
              </a>
            </div>
          </figure>

          <div className="about-copy">
            <p className="lead">
              My name is Muyu Liu (柳沐雨 in Chinese). I am currently pursuing an M.S.
              degree in Computer Science and Technology at{" "}
              <a href="https://www.shanghaitech.edu.cn/" target="_blank" rel="noreferrer">
                ShanghaiTech University
              </a>{" "}
              in Shanghai, China. Before that, I received my B.E. degree in Software
              Engineering from{" "}
              <a href="https://www.sdu.edu.cn/" target="_blank" rel="noreferrer">
                Shandong University
              </a>{" "}
              in Jinan, China, in 2024.
            </p>

            <div className="research-focus" aria-label="Research interests">
              <p>Research interests</p>
              <div className="research-interest-groups">
                <div className="research-interest-group">
                  <h3>Diffusion Models</h3>
                  <ul>
                    <li>Diffusion Models for Inverse Problems</li>
                    <li>Diffusion Bridges</li>
                  </ul>
                </div>
                <div className="research-interest-group">
                  <h3>Autoregressive Video Generation</h3>
                  <ul>
                    <li>Long-Form Video Generation</li>
                    <li>KV Cache Compression</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="about-links">
              <a href="mailto:liumy2024@shanghaitech.edu.cn">
                Email <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="experience" id="experience" aria-labelledby="experience-title">
        <div className="section-shell experience-inner">
          <div className="section-index" aria-hidden="true">02</div>
          <div className="section-heading section-heading-simple experience-heading">
            <h2 id="experience-title">Experience</h2>
            <SignatureCurve />
          </div>

          <div className="experience-body">
            {experienceGroups.map((group) => (
              <div className="experience-group" key={group.label}>
                <div className="experience-group-heading">
                  <h3>{group.label}</h3>
                  <span>{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <div className="experience-list">
                  {group.items.map((item) => (
                    <article
                      className="experience-entry"
                      key={group.label + "-" + item.organization}
                    >
                      <time>{item.period}</time>
                      <a
                        className={
                          "experience-logo experience-logo--" +
                          (item.logoVariant ?? "light")
                        }
                        href={item.organizationUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={"Visit " + item.organization}
                      >
                        <img src={item.logo} alt={item.logoAlt} loading="lazy" />
                      </a>
                      <div className="experience-copy">
                        <h4>
                          <a href={item.organizationUrl} target="_blank" rel="noreferrer">
                            {item.organization}
                          </a>
                        </h4>
                        {item.department && (
                          <p className="experience-department">{item.department}</p>
                        )}
                        <p className="experience-role">{item.role}</p>
                        {item.details && (
                          <ul>
                            {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="publications" id="publications" aria-labelledby="publications-title">
        <div className="section-shell publications-inner">
          <div className="section-index" aria-hidden="true">03</div>
          <div className="section-heading section-heading-simple publications-heading">
            <h2 id="publications-title">Publications</h2>
            <SignatureCurve />
          </div>

          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication" key={publication.title}>
                <div className="pub-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <a
                  className="publication-media"
                  href={publication.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View paper: ${publication.title}`}
                >
                  <img src={publication.image} alt={publication.imageAlt} loading="lazy" />
                </a>
                <div className="pub-main">
                  <h3>{publication.title}</h3>
                  <p className="pub-authors">
                    {publication.authors.map((author, authorIndex) => {
                      const homepage = authorHomepages[author.name];

                      return (
                        <span key={author.name}>
                          <span className={author.isMe ? "author-self" : undefined}>
                            {homepage ? (
                              <a
                                className="author-link"
                                href={homepage}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {author.name}
                              </a>
                            ) : (
                              author.name
                            )}
                          </span>
                          {author.equalContribution && <sup>†</sup>}
                          {authorIndex < publication.authors.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {publication.equalContributionNote && (
                      <span className="equal-note">† Equal contribution</span>
                    )}
                  </p>
                  <p className="pub-venue">{publication.venue}</p>
                  <div className="publication-links" aria-label={`Links for ${publication.title}`}>
                    <a href={publication.paperUrl} target="_blank" rel="noreferrer">
                      Paper <span aria-hidden="true">↗</span>
                    </a>
                    {publication.codeUrl && (
                      <a href={publication.codeUrl} target="_blank" rel="noreferrer">
                        Code <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
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
          </div>
          <a href="mailto:liumy2024@shanghaitech.edu.cn">liumy2024@shanghaitech.edu.cn</a>
          <p className="copyright">© 2026 Muyu Liu</p>
        </div>
      </footer>
    </main>
  );
}
