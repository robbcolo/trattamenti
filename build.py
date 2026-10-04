#!/usr/bin/env python3
"""Costruisce le schede trattamento: versione artifact (frammento) e versione GitHub Pages (documento completo)."""
import re, pathlib, sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
ART = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "artifact"
ART.mkdir(parents=True, exist_ok=True)
PAGES = ["impianto", "ponte", "post-estrattivo"]

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&display=swap">\n')

MARK = ('<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" class="f-accent"/>'
        '<path d="M8 9.5c0-2 1.6-3 3-3 1.2 0 1.9.7 3 .7s1.8-.7 3-.7c1.4 0 3 1 3 3 0 2.4-1 3.6-1.4 6-.4 2.4-.6 6-1.9 6-1.4 0-1.2-4.6-2.7-4.6S12.6 21.5 11.2 21.5c-1.3 0-1.5-3.6-1.9-6C8.9 13.1 8 11.9 8 9.5Z" class="f-surface"/></svg>')

HEADER = '''<header class="top">
  <div class="wrap top-row">
    <a class="brand" href="#cose">''' + MARK + '''<span class="long">Studio Dentistico Colombo</span><span class="short">Studio Colombo</span></a>
    <div class="tools">
      <button class="btn" id="btn-present" type="button" aria-label="Mostra le fasi a schermo intero">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M10 9.5v4l3.5-2z"/><path d="M8 21h8"/></svg>
        <span>In poltrona</span>
      </button>
      <button class="btn btn-primary" id="btn-share" type="button" aria-label="Consegna la scheda al paziente con QR o link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>
        <span>Consegna<span class="lbl-long"> al paziente</span></span>
      </button>
    </div>
  </div>
  <nav class="wrap toc" aria-label="Sezioni della scheda">
    {TOC}
  </nav>
</header>
'''

STEPPER = '''<section id="fasi">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Passo per passo</p>
          <h2>Le fasi del trattamento</h2>
          <p class="sec-intro">Usi le frecce o scorra l'immagine con il dito. Ogni fase mostra cosa succede nella bocca.</p>
        </div>
        <button class="btn" id="btn-exit" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>Chiudi</button>
      </div>
      <div class="stepper">
        <div>
          <figure class="stage" id="stage"><svg id="scene" viewBox="0 0 720 540" data-step="1" role="img" aria-labelledby="step-title"></svg></figure>
          <p class="stage-foot">{STAGEFOOT}</p>
        </div>
        <div class="step-copy" aria-live="polite">
          <p class="step-count" id="step-count">Fase 1</p>
          <h3 id="step-title"></h3>
          <ul class="chips" id="step-chips"></ul>
          <p class="step-text" id="step-text"></p>
          <div class="step-note"><span class="label">Da sapere</span><p id="step-note"></p></div>
          <div class="step-ctrl">
            <button class="btn" id="prev" type="button" aria-label="Fase precedente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Indietro</button>
            <button class="btn btn-primary" id="next" type="button" aria-label="Fase successiva"><span id="next-lbl">Avanti</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
          </div>
        </div>
      </div>
      <ol class="step-nav" id="step-nav" aria-label="Vai a una fase"></ol>
    </div>
  </section>
'''

SHARE = '''<div class="sheet" id="share" hidden>
  <div class="sheet-card" role="dialog" aria-modal="true" aria-labelledby="share-title">
    <div class="sheet-head">
      <div><p class="eyebrow">Per lo studio</p><h2 id="share-title" style="font-size:1.6rem">Consegna al paziente</h2></div>
      <button class="icon-btn" id="share-close" type="button" aria-label="Chiudi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <fieldset class="seg">
      <legend class="label">La pagina si apre su</legend>
      <label><input type="radio" name="target" id="t-all" value="" checked>Scheda completa</label>
      <label><input type="radio" name="target" id="t-dopo" value="dopo">{SHAREDOPO}</label>
      <label><input type="radio" name="target" id="t-fasi" value="fasi">Le fasi del trattamento</label>
    </fieldset>
    <div class="qr" id="qr" aria-label="Codice QR del link"></div>
    <div class="field"><label class="label" for="share-url">Link per il paziente</label><input id="share-url" type="text" readonly></div>
    <div class="sheet-actions">
      <button class="btn" id="copy-url" type="button">Copia link</button>
      <a class="btn btn-primary" id="wa-url" href="#" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <details>
      <summary>Indirizzo pubblico della pagina</summary>
      <div class="field">
        <label class="label" for="base-url">Dove è pubblicata la scheda</label>
        <input id="base-url" type="url" inputmode="url" autocomplete="off">
        <p class="fine">Il QR e il link puntano a questo indirizzo. Aggiornalo quando pubblichi la pagina su GitHub Pages o sul sito dello studio.</p>
      </div>
    </details>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
'''

CALL = '''<div class="contacts">
            <div class="contact"><span class="label">Telefono dello studio</span><a href="tel:+39094122749">0941 22749</a></div>
            <div class="contact"><span class="label">WhatsApp</span><a href="https://wa.me/393791523085" target="_blank" rel="noopener">+39 379 152 3085</a></div>
          </div>
          <p class="fine">Se ha difficoltà a respirare o a deglutire, o un gonfiore che si estende rapidamente, chiami subito il 118.</p>'''

STRIP = '<p class="studio-strip"><b>Studio Dentistico Colombo</b><span>Tel. 0941 22749</span><span>Lun–gio 8:30–12:30 e 16:00–20:00</span><span>Ven 8:30–12:30</span></p>'

GH_HEAD = '''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{DESC}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="{APPTITLE}">
<meta name="theme-color" content="#F2F5F4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E181B" media="(prefers-color-scheme: dark)">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' rx='8' fill='%230B6E69'/%3E%3Cpath d='M8 9.5c0-2 1.6-3 3-3 1.2 0 1.9.7 3 .7s1.8-.7 3-.7c1.4 0 3 1 3 3 0 2.4-1 3.6-1.4 6-.4 2.4-.6 6-1.9 6-1.4 0-1.2-4.6-2.7-4.6S12.6 21.5 11.2 21.5c-1.3 0-1.5-3.6-1.9-6C8.9 13.1 8 11.9 8 9.5Z' fill='white'/%3E%3C/svg%3E">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
'''

def meta(src, key):
    m = re.search(r"<!--\s*" + key + r":\s*(.*?)\s*-->", src, re.S)
    return m.group(1).strip() if m else ""

common_css = (SRC / "common.css").read_text()
common_js = (SRC / "common.js").read_text()

for name in PAGES:
    src = (SRC / f"{name}.html").read_text()
    title = meta(src, "title"); desc = meta(src, "description"); app = meta(src, "apptitle")
    toc = " ".join(f'<a href="#{k.strip()}">{v.strip()}</a>' for k, v in (x.split("=", 1) for x in meta(src, "toc").split(";")))
    page_css = re.search(r"<style>(.*?)</style>", src, re.S).group(1)
    page_js = re.search(r"<script>(.*?)</script>", src, re.S).group(1)
    main = re.search(r"<!--BODY-->(.*?)<!--/BODY-->", src, re.S).group(1)
    main = (main.replace("{STEPPER}", STEPPER.replace("{STAGEFOOT}", meta(src, "stagefoot")))
                .replace("{CALL}", CALL).replace("{STRIP}", STRIP))
    head = f"<title>{title}</title>\n" + FONTS + "<style>\n" + common_css + "\n" + page_css + "\n</style>\n"
    body = (HEADER.replace("{TOC}", toc) + main + SHARE.replace("{SHAREDOPO}", meta(src, "sharedopo")) +
            '<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"></script>\n'
            "<script>\n" + common_js + "\n</script>\n<script>\n" + page_js + "\n</script>\n")
    (ART / f"{name}.html").write_text(head + body)
    gh = GH_HEAD.replace("{DESC}", desc).replace("{APPTITLE}", app) + head + "</head>\n<body>\n" + body + "</body>\n</html>\n"
    (ROOT / f"{name}.html").write_text(gh)
    print(name, len(head + body))
