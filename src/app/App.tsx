import { useState, useEffect, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  Boxes,
  ScanLine,
  Layers3,
  Building2,
  Swords,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Quote,
  FileDown,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";
import logoMark from "../imports/icon.png";
import logoFull from "../imports/Logodark.jpg";

const IMAGE_PATH = "./assets/img";

const IMAGES = {
  heroPrinter: "Main.avif",
  heroPieces: "MainLeft.avif",
  heroNozzle: "MainRight.avif",
  pieceMiniatures: "Miniatura.jpg",
  pieceCurral: "Curral.jpg",
  pieceGifts: "Personalizados.jpg",
  pieceDiceTower: "Dice-tower.jpg",
  piecePrototypes: "Prototipos-funcionais.jpg",
  pieceProduction: "Prototipos-funcionais.jpg",
  projectMP3: "Prototipos-funcionais.jpg",
} as const;

const image = (fileName: string) => `${IMAGE_PATH}/${fileName}`;
const WHATSAPP_NUMBER = "5574999857549";

const NAV = [
  ["Processo", "processo"],
  ["Serviços", "servicos"],
  ["Peças", "pecas"],
  ["Projetos", "projetos"],
  ["Clientes", "clientes"],
  ["Contato", "contato"],
] as const;

const SERVICES = [
  {
    icon: Boxes,
    code: "SVC-01",
    title: "Modelagem 3D",
    body:
      "Criamos o modelo do zero ou a partir do seu esboço. Arquivos otimizados para impressão, prontos para produzir.",
  },
  {
    icon: ScanLine,
    code: "SVC-02",
    title: "Impressão de protótipos",
    body:
      "Valide funcional e esteticamente antes da produção em escala. Tolerâncias precisas e acabamento uniforme.",
  },
  {
    icon: Building2,
    code: "SVC-03",
    title: "Maquetes",
    body:
      "Maquetes arquitetônicas e volumétricas com fidelidade de escala para apresentações e concorrências.",
  },
  {
    icon: Swords,
    code: "SVC-04",
    title: "Miniaturas",
    body:
      "Miniaturas em alta resolução para RPG, colecionáveis e board games, impressas em PLA e PETG.",
  },
  {
    icon: Layers3,
    code: "SVC-05",
    title: "Prototipagem funcional",
    body:
      "Peças de engenharia, encaixes e gabaritos em PLA e PETG conforme a aplicação.",
  },
  {
    icon: Sparkles,
    code: "SVC-06",
    title: "Personalizados",
    body:
      "Chaveiros, porta-lápis, cartões de visita, letreiros e brindes com a sua identidade.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Briefing",
    body: "Entendemos a peça, a função e o prazo. Você envia referências ou o arquivo.",
  },
  {
    n: "02",
    title: "Modelagem & fatiamento",
    body: "Modelamos ou preparamos o STL, definimos material, densidade e orientação.",
  },
  {
    n: "03",
    title: "Impressão",
    body: "Produção em FDM com filamento PLA e PETG, monitorada camada a camada para garantir qualidade.",
  },
  {
    n: "04",
    title: "Acabamento & entrega",
    body: "Pós-processamento, lixamento, pintura opcional e envio para todo o Brasil.",
  },
];

const PIECES = [
  { image: IMAGES.pieceMiniatures, label: "Miniaturas — PLA", tall: true },
  { image: IMAGES.pieceCurral, label: "Maquete — Curral" },
  { image: IMAGES.pieceGifts, label: "Letreiros personalizados" },
  { image: IMAGES.pieceDiceTower, label: "Board game — dice tower", tall: true },
  { image: IMAGES.piecePrototypes, label: "Protótipos funcionais" },
  { image: IMAGES.pieceProduction, label: "Peças em produção" },
];

const PROJECTS = [
  {
    image: IMAGES.projectMP3,
    status: "Prototipagem",
    title: "MP3 protótipo",
    desc:
      "Protótipo de um MP3 totalmente personalizável.",
    tags: ["Protótipo", "PLA", "Engenharia"],
  },
];

const REVIEWS = [
  {
    name: "Teste",
    role: "Teste",
    text:
      "Teste",
  },
];

function useActiveSection() {
  const [active, setActive] = useState("processo");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Kicker({ code, children }: { code: string; children: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
      <span>{code}</span>
      <span className="h-px w-8 bg-primary/60" />
      <span className="text-muted-foreground">{children}</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const [quote, setQuote] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0].title,
    details: "",
  });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sendQuoteByWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "*Novo orçamento — ISTUDIO*",
      "",
      `*Nome:* ${quote.name}`,
      `*Telefone:* ${quote.phone}`,
      `*E-mail:* ${quote.email}`,
      `*Serviço:* ${quote.service}`,
      `*Detalhes:* ${quote.details}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-[var(--font-body)] antialiased selection:bg-primary selection:text-primary-foreground">
      {/* ===== NAV ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 font-[var(--font-display)] text-lg font-extrabold tracking-tight"
          >
            <img
              src={logoMark}
              alt="ISTUDIO"
              className="size-9 rounded-full object-cover"
            />
            <span className="font-logo">
              ISTUDIO
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-primary ${
                  active === id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open("https://wa.me/5574999857549", "_blank")}
              className="hidden items-center gap-2 bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Orçamento <ArrowUpRight className="size-4 " />
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="flex flex-col px-5 py-3">
              {NAV.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="border-b border-border/60 py-3 text-left font-mono text-sm uppercase tracking-widest"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-10 lg:pb-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="size-2 animate-pulse bg-primary" />
              Fábrica digital · Impressão 3D sob demanda
            </div>
            <h1 className="font-[var(--font-display)] text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Transformamos
              <br />
              ideias em{" "}
              <span className="text-primary">objetos</span>
              <br />
              camada por camada.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              O <span className="font-logo">ISTUDIO</span> é um estúdio de impressão 3D. Modelagem, protótipos,
              maquetes, miniaturas e personalizados — feitos com precisão e
              acabamento de verdade.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("contato")}
                className="group flex items-center gap-2 bg-primary px-6 py-3.5 font-mono text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Pedir orçamento
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("pecas")}
                className="flex items-center gap-2 border border-border px-6 py-3.5 font-mono text-sm uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
              >
                Ver peças
              </button>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 pt-7">
              {[
                ["+480", "peças entregues"],
                ["+20", "clientes atendidos"],
                ["48h", "prazo médio"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-[var(--font-display)] text-3xl font-extrabold text-primary">
                    {v}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase leading-tight tracking-wider text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 z-10 bg-primary px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary-foreground">
              * NOVIDADES EM BREVE! *
            </div>
            <div className="aspect-[4/5] overflow-hidden border border-border bg-muted">
              <img
                src={image(IMAGES.heroPrinter)}
                alt="Impressora 3D em operação com iluminação azul"
                className="size-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] overflow-hidden border border-border bg-muted">
                <img
                  src={image(IMAGES.heroPieces)}
                  alt="Peças laranja sendo impressas"
                  className="size-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden border border-border bg-muted">
                <img
                  src={image(IMAGES.heroNozzle)}
                  alt="Detalhe do bico da impressora 3D"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESSO ===== */}
      <section id="processo" className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <Kicker code="[01]">Como trabalhamos</Kicker>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
              Um fluxo simples, do arquivo à peça na sua mão.
            </h2>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s) => (
              <div
                key={s.n}
                className="group bg-card p-7 transition-colors hover:bg-secondary"
              >
                <div className="font-[var(--font-display)] text-5xl font-black text-primary/30 transition-colors group-hover:text-primary">
                  {s.n}
                </div>
                <h3 className="mt-5 font-[var(--font-display)] text-xl font-bold">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Kicker code="[02]">Serviços prestados</Kicker>
              <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tudo que dá pra imprimir, a gente imprime.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Impressão FDM · filamento PLA e PETG · pós-processamento e pintura opcional.
            </p>
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.code} className="group relative bg-card p-8">
                <div className="flex items-start justify-between">
                  <s.icon className="size-8 text-primary" strokeWidth={1.75} />
                  <span className="font-mono text-xs text-muted-foreground">
                    {s.code}
                  </span>
                </div>
                <h3 className="mt-6 font-[var(--font-display)] text-xl font-bold">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <div className="mt-6 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PEÇAS ===== */}
      <section id="pecas" className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <Kicker code="[03]">Peças produzidas</Kicker>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
              Feitos no <span className="font-logo">ISTUDIO</span>
            </h2>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3">
            {PIECES.map((p, i) => (
              <motion.a
                key={p.image + i}
                href="https://instagram.com/ofc_istudio"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className={`group relative block overflow-hidden border border-border bg-muted ${
                  p.tall ? "row-span-2" : ""
                }`}
              >
                <img
                  src={image(p.image)}
                  alt={p.label}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent p-4 pt-10 font-mono text-xs uppercase tracking-wider">
                  <span>{p.label}</span>
                  <span className="flex items-center gap-1.5 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <Instagram className="size-4" />
                    <ArrowUpRight className="size-4" />
                  </span>
                </figcaption>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJETOS ===== */}
      <section id="projetos" className="border-t border-border bg-card py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <Kicker code="[04]">Em andamento</Kicker>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
              Projetos na bancada agora.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className="group grid items-stretch gap-0 overflow-hidden border border-border bg-background md:grid-cols-[minmax(0,340px)_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
                  <img
                    src={image(p.image)}
                    alt={p.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 bg-primary px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-primary-foreground">
                    <Clock className="size-3" /> {p.status}
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-6 p-7 lg:p-9">
                  <div>
                    <div className="mb-3 font-mono text-xs text-muted-foreground">
                      PRJ-0{i + 1}
                    </div>
                    <h3 className="font-[var(--font-display)] text-2xl font-bold lg:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group/btn flex w-fit items-center gap-2 border border-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <FileDown className="size-4" />
                    Baixar PDF do projeto
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENTES ===== */}
      <section id="clientes" className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Kicker code="[05]">Avaliações de clientes</Kicker>
              <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
                Quem imprimiu, aprovou.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                4,9 / 5 · 120+ pedidos
              </span>
            </div>
          </div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="flex flex-col bg-card p-8">
                <Quote className="size-7 text-primary" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed">
                  {r.text}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid size-10 place-items-center bg-primary/15 font-[var(--font-display)] font-extrabold text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {r.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="border-t border-border bg-card py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:px-10">
          <div>
            <Kicker code="[06]">Como nos encontrar</Kicker>
            <h2 className="mt-5 font-[var(--font-display)] text-4xl font-extrabold tracking-tight lg:text-5xl">
              Vamos imprimir a sua ideia?
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Manda o arquivo, o esboço ou só a ideia. A gente responde com
              prazo e orçamento no mesmo dia.
            </p>

            <div className="mt-10 flex flex-col divide-y divide-border border-y border-border">
              {[
                [Phone, "WhatsApp", "+55 74 99985-7549", "https://wa.me/5574999857549"],
                [Mail, "E-mail", "silas_santoss@outlook.com", "mailto:silas_santoss@outlook.com"],
                [MapPin, "Ateliê", "Uauá, BA", "https://www.google.com/maps/search/Uau%C3%A1,+BA"],
              ].map(([Icon, label, value, href]) => {
                const I = Icon as typeof Phone;
                return (
                  <a
                    key={label as string}
                    href={href as string}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 py-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center border border-border text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <I className="size-5" />
                    </span>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {label as string}
                      </div>
                      <div className="mt-0.5 text-lg transition-colors group-hover:text-primary">
                        {value as string}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Redes sociais
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  [Instagram, "@ofc_istudio", "https://instagram.com/ofc_istudio"],
                  [Youtube, "@ofc_istudio", "https://youtube.com/@ofc_istudio"],
                ].map(([Icon, label, href]) => {
                  const I = Icon as typeof Instagram;
                  return (
                    <a
                      key={href as string}
                      href={href as string}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 border border-border px-4 py-3 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      <I className="size-5" />
                      {label as string}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={sendQuoteByWhatsApp}
            className="flex flex-col gap-5 border border-border bg-background p-7 lg:p-9"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
              Solicitar orçamento
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nome"
                placeholder="Seu nome"
                value={quote.name}
                onChange={(value) => setQuote((current) => ({ ...current, name: value }))}
                required
              />
              <Field
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={quote.phone}
                onChange={(value) => setQuote((current) => ({ ...current, phone: value }))}
                required
              />
            </div>
            <Field
              label="E-mail"
              placeholder="voce@email.com"
              type="email"
              value={quote.email}
              onChange={(value) => setQuote((current) => ({ ...current, email: value }))}
              required
            />
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Tipo de serviço
              </label>
              <select
                value={quote.service}
                onChange={(event) => setQuote((current) => ({ ...current, service: event.target.value }))}
                className="w-full border border-border bg-input-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
              >
                {SERVICES.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Detalhes do projeto
              </label>
              <textarea
                rows={4}
                placeholder="Conte o que você precisa, quantidade, prazo..."
                value={quote.details}
                onChange={(event) => setQuote((current) => ({ ...current, details: event.target.value }))}
                required
                className="w-full resize-none border border-border bg-input-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <button className="group mt-1 flex items-center justify-center gap-2 bg-primary px-6 py-4 font-mono text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5">
              Enviar pelo WhatsApp
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <CheckCircle2 className="size-4 text-primary" />
              Resposta com orçamento em até 24h.
            </p>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:flex-row lg:px-10">
          <div className="flex items-center gap-2 text-foreground font-logo">
            <img src={logoMark} alt="ISTUDIO" className="size-6 rounded-full object-cover" />
            ISTUDIO
          </div>
          <span>© {new Date().getFullYear()} ISTUDIO — Impressão 3D · Uauá, BA</span>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full border border-border bg-input-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  );
}
