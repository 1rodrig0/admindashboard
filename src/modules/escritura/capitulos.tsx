// Single-file React (no path aliases, no CSS Modules, no TS types)
// Fix: remove stray CSS outside template literal and correct ChapterCard signature.
// Keeps palette, animations, editable tags/genres, and in-browser tests.
"use client";

import React, { useMemo, useState, useEffect } from "react";
import styles from "./styles/capitulos.module.css";

// -------------------------
// Demo data (array, no DB)
// -------------------------
const stories = [
  {
    id: "h-001",
    title: "El Castillo sobre la Niebla",
    cover: "/covers/castillo.jpg",
    description:
      "Una academia militar en La Paz oculta un archivo de leyendas. A medida que los cadetes investigan, antiguos pactos despiertan.",
    author: "G. Lavadenz",
    genres: ["Fantasía", "Misterio"],
    tags: ["EMI", "La Paz", "lore andino", "castillo"],
    createdAt: "2025-10-20",
    updatedAt: "2025-11-03",
    chapters: [
      {
        id: "c-001",
        number: 1,
        title: "Niebla sobre Aranjuez",
        summary:
          "Presentación del campus y del símbolo del castillo. Aparece el primer mapa con símbolos.",
        isPublished: true,
        publishedAt: "2025-10-22",
      },
      {
        id: "c-002",
        number: 2,
        title: "El Archivo de Piedra",
        summary:
          "Un pasadizo conecta la biblioteca con una cámara sellada. Encuentran una urna con un sello quebrado.",
        isPublished: true,
        publishedAt: "2025-10-28",
      },
      {
        id: "c-003",
        number: 3,
        title: "Juramento de Sombras",
        summary:
          "La urna revela un contrato antiguo. El grupo debe decidir si romperlo o renovarlo.",
        isPublished: false,
      },
    ],
  },
  {
    id: "h-002",
    title: "Bitácora Kolla",
    description:
      "Crónicas de autores y lectores que construyen una comunidad digital con sabor paceño.",
    author: "R. Bautista",
    genres: ["Contemporáneo"],
    tags: ["comunidad", "tecnología", "lectura"],
    createdAt: "2025-10-10",
    updatedAt: "2025-11-01",
    chapters: [
      {
        id: "c-101",
        number: 1,
        title: "Primer Post",
        summary: "Presentación del proyecto y objetivos.",
        isPublished: true,
        publishedAt: "2025-10-12",
      },
      {
        id: "c-102",
        number: 2,
        title: "Diseño de la Biblioteca",
        summary: "Exploración de UI/UX, filtros y accesibilidad.",
        isPublished: false,
      },
    ],
  },
];

// ------------------------------------
// Pure helpers for filter/sort (testable)
// ------------------------------------
function normalizeStr(s) {
  return (s || "").toString().toLowerCase();
}

function filterChapters(story, query, onlyPublished, sortBy) {
  const q = (query || "").trim().toLowerCase();
  let arr = (story?.chapters || []).filter((c) => {
    const hit =
      normalizeStr(c.title).includes(q) ||
      normalizeStr(c.summary).includes(q) ||
      (q !== "" && String(c.number) === q);
    return onlyPublished ? hit && c.isPublished : hit;
  });

  switch (sortBy) {
    case "num-desc":
      arr = [...arr].sort((a, b) => b.number - a.number);
      break;
    case "title":
      arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      arr = [...arr].sort((a, b) => a.number - b.number);
  }
  return arr;
}

// -------------------------
// Chip helpers (pure)
// -------------------------
function addChip(list, value) {
  const v = (value || "").trim();
  if (!v) return list || [];
  const exists = (list || []).some((x) => x.toLowerCase() === v.toLowerCase());
  return exists ? list : [...(list || []), v];
}
function removeChip(list, value) {
  const v = (value || "").toLowerCase();
  return (list || []).filter((x) => x.toLowerCase() !== v);
}

// -------------------------
// Main Story Detail component
// -------------------------
function StoryDetail({ story }) {
  // local editable copy to allow in-memory edits
  const [local, setLocal] = useState(() => ({ ...story }));

  const [query, setQuery] = useState("");
  const [onlyPublished, setOnlyPublished] = useState(false);
  const [sortBy, setSortBy] = useState("num-asc"); // "num-asc" | "num-desc" | "title"

  const stats = useMemo(() => {
    const total = local?.chapters?.length || 0;
    const published = (local?.chapters || []).filter((c) => c.isPublished).length;
    const pct = total ? Math.round((published / total) * 100) : 0;
    return { total, published, pct };
  }, [local]);

  const filtered = useMemo(
    () => filterChapters(local, query, onlyPublished, sortBy),
    [local, query, onlyPublished, sortBy]
  );

  function handleAddTag(val) {
    setLocal((s) => ({ ...s, tags: addChip(s.tags, val), updatedAt: new Date().toISOString() }));
  }
  function handleRemoveTag(val) {
    setLocal((s) => ({ ...s, tags: removeChip(s.tags, val), updatedAt: new Date().toISOString() }));
  }
  function handleAddGenre(val) {
    setLocal((s) => ({ ...s, genres: addChip(s.genres, val), updatedAt: new Date().toISOString() }));
  }
  function handleRemoveGenre(val) {
    setLocal((s) => ({ ...s, genres: removeChip(s.genres, val), updatedAt: new Date().toISOString() }));
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{local.title}</h1>
          <p className={styles.subtitle}>
            por <strong>{local.author}</strong>
          </p>
          <div className={styles.badges} aria-label="Géneros y etiquetas">
            {(local.genres || []).map((g) => (
              <span key={g} className={styles.badgeGenre}>
                {g}
              </span>
            ))}
            {(local.tags || []).map((t) => (
              <span key={t} className={styles.badgeTag}>
                #{t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.meta}>
        <article className={styles.card}>
          <h2>Descripción</h2>
          <p>{local.description}</p>
          <ul className={styles.metaList}>
            <li>
              <span>Creado:</span> {new Date(local.createdAt).toLocaleDateString()}
            </li>
            <li>
              <span>Actualizado:</span> {new Date(local.updatedAt).toLocaleDateString()}
            </li>
            <li>
              <span>Capítulos:</span> {stats.total}
            </li>
          </ul>

          {/* Editable: Géneros */}
          <div className={styles.editRow}>
            <h3 className={styles.editTitle}>Géneros</h3>
            <ChipEditor
              items={local.genres}
              placeholder="Añadir género y Enter"
              onAdd={handleAddGenre}
              onRemove={handleRemoveGenre}
              badgeClass={styles.genreChip}
              ariaLabel="Editor de géneros"
            />
          </div>

          {/* Editable: Etiquetas */}
          <div className={styles.editRow}>
            <h3 className={styles.editTitle}>Etiquetas</h3>
            <ChipEditor
              items={local.tags}
              placeholder="Añadir etiqueta y Enter"
              onAdd={handleAddTag}
              onRemove={handleRemoveTag}
              badgeClass={styles.tagChip}
              ariaLabel="Editor de etiquetas"
            />
          </div>

          <p className={styles.note}>Puedes modificar <strong>géneros</strong> y <strong>etiquetas</strong> incluso si hay capítulos publicados. Estos cambios no afectan el estado de publicación de los capítulos.</p>
        </article>

        <article className={styles.card}>
          <h2>Publicación</h2>
          <div className={styles.progressBar} aria-label="Progreso de publicación">
            <div className={styles.progressFill} style={{ width: `${stats.pct}%` }} />
          </div>
          <p className={styles.progressText}>
            {stats.published} publicados de {stats.total} ({stats.pct}%)
          </p>
        </article>
      </section>

      <section className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input
            className={styles.input}
            placeholder="Buscar por número, título o resumen..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className={styles.searchIcon} aria-hidden>
            ⌕
          </span>
        </div>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={onlyPublished}
            onChange={(e) => setOnlyPublished(e.target.checked)}
          />
          <span>Solo publicados</span>
        </label>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Ordenar capítulos"
        >
          <option value="num-asc">Número ↑</option>
          <option value="num-desc">Número ↓</option>
          <option value="title">Título A–Z</option>
        </select>
      </section>

      <section className={styles.chapterGrid}>
        {filtered.map((c) => (
          <ChapterCard key={c.id} chapter={c} />
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>Sin resultados para "{query}"</div>
        )}
      </section>


    </main>
  );
}

function ChapterCard({ chapter }) {
  return (
    <article
      className={styles.chapterCard}
      data-published={chapter.isPublished}
      tabIndex={0}
      aria-label={`Capítulo ${chapter.number}: ${chapter.title}`}
    >
      <div className={styles.chapterHeader}>
        <span className={styles.chNumber}>#{chapter.number}</span>
        <h3 className={styles.chTitle}>{chapter.title}</h3>
        <span
          className={chapter.isPublished ? styles.badgeOk : styles.badgeDraft}
          title={chapter.isPublished ? "Publicado" : "Borrador"}
        >
          {chapter.isPublished ? "Publicado" : "Borrador"}
        </span>
      </div>
      <p className={styles.chSummary}>{chapter.summary}</p>
      <footer className={styles.chFooter}>
        {chapter.isPublished ? (
          <time className={styles.date} dateTime={chapter.publishedAt}>
            Publicado el {chapter.publishedAt && new Date(chapter.publishedAt).toLocaleDateString()}
          </time>
        ) : (
          <em className={styles.pending}>Pendiente de publicación</em>
        )}
        <button className={styles.btnGhost}>Editar</button>
      </footer>
    </article>
  );
}

// -------------------------------------
// Demo wrapper + test story selector
// -------------------------------------
export default function Capitulos() {
  // If this file runs without Next.js routing, allow switching stories
  const [storyId, setStoryId] = useState(stories[0].id);
  const story = stories.find((s) => s.id === storyId) || stories[0];

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div>
      <div className={styles.topBar}>
        <label className={styles.topLabel}>Historia:</label>
        <select className={styles.topSelect} value={storyId} onChange={(e) => setStoryId(e.target.value)}>
          {stories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <StoryDetail story={story} />
    </div>
  );
}

// -------------------------
// Minimal CSS (embedded)


// -------------------------
// Tiny test suite (console)
// -------------------------
function assertEq(label, a, b) {
  const ok = JSON.stringify(a) === JSON.stringify(b);
  // eslint-disable-next-line no-console
  console[ok ? "log" : "error"](`${ok ? "✅" : "❌"} ${label}:`, a, "===", b);
  return ok;
}

export function runTests() {
  const s = stories[0];
  // 1) By number match
  const r1 = filterChapters(s, "1", false, "num-asc").map((c) => c.number);
  assertEq("match number=1", r1, [1]);

  // 2) Only published
  const r2 = filterChapters(s, "", true, "num-asc").every((c) => c.isPublished === true);
  assertEq("onlyPublished=true filters drafts", r2, true);

  // 3) Sort desc
  const r3 = filterChapters(s, "", false, "num-desc").map((c) => c.number);
  const sortedDesc = [...(s.chapters || [])].sort((a, b) => b.number - a.number).map((c) => c.number);
  assertEq("sort num-desc", r3, sortedDesc);

  // 4) Title sort A–Z
  const r4 = filterChapters(s, "", false, "title").map((c) => c.title);
  const titleAZ = [...(s.chapters || [])].sort((a, b) => a.title.localeCompare(b.title)).map((c) => c.title);
  assertEq("sort title A–Z", r4, titleAZ);

  // 5) Query by substring in summary
  const r5 = filterChapters(s, "campus", false, "num-asc").map((c) => c.id);
  assertEq("query substring 'campus'", r5, ["c-001"]);

  // 6) addChip avoids duplicates (case-insensitive)
  const chips1 = addChip(["Aventura"], "aventura");
  assertEq("addChip no dup", chips1, ["Aventura"]);

  // 7) removeChip removes by case-insensitive match
  const chips2 = removeChip(["EMI", "La Paz"], "emi");
  assertEq("removeChip case-insensitive", chips2, ["La Paz"]);

  // 8) Editing allowed when chapters published
  const hasPublished = s.chapters.some((c) => c.isPublished);
  const afterEdit = addChip(s.tags, "prueba");
  assertEq("can edit tags even with published", hasPublished && afterEdit.includes("prueba"), true);
}

// -------------------------
// Chip editor component (UI only)
// -------------------------
function ChipEditor({ items = [], placeholder, onAdd, onRemove, badgeClass = "", ariaLabel = "" }) {
  const [value, setValue] = useState("");

  function onKeyDown(e) {
    if (e.key === "Enter") {
      const v = value.trim();
      if (v) {
        onAdd(v);
        setValue("");
      }
    }
  }

  return (
    <div aria-label={ariaLabel}>
      <div className={styles.chips}>
        {items.map((it) => (
          <span key={it} className={`${styles.chip} ${badgeClass}`}>
            {it}
            <button className={styles.chipRemove} title={`Eliminar ${it}`} onClick={() => onRemove(it)} aria-label={`Eliminar ${it}`}>×</button>
          </span>
        ))}
      </div>
      <input
        className={styles.chipInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
