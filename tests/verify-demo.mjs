import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { statSync } from "node:fs";

const htmlPath = resolve("demo.html");
const cssPath = resolve("demo.css");
const jsPath = resolve("demo.js");
const indexPath = resolve("index.html");

const filesExist = existsSync(htmlPath) && existsSync(cssPath) && existsSync(jsPath);
const html = existsSync(htmlPath) ? readFileSync(htmlPath, "utf8") : "";
const css = existsSync(cssPath) ? readFileSync(cssPath, "utf8") : "";
const js = existsSync(jsPath) ? readFileSync(jsPath, "utf8") : "";
const indexHtml = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
const whatsappLogoSvg = existsSync(resolve("assets/figma/whatsapp-logo.svg"))
  ? readFileSync(resolve("assets/figma/whatsapp-logo.svg"), "utf8")
  : "";

const webpBudget = [
  ["banner_pic.webp", 120],
  ...Array.from({ length: 10 }, (_, index) => [`home-product-${String(index + 1).padStart(2, "0")}.webp`, 40]),
  ...Array.from({ length: 6 }, (_, index) => [`drawer-nav-${String(index + 1).padStart(2, "0")}.webp`, 10]),
  ["drawer-side-banner.webp", 30],
  ...["para-quem", "ocasioes", "produtos", "colecoes", "destaques", "gift"].map((name) => [`drawer-card-${name}.webp`, 10]),
  ...Array.from({ length: 5 }, (_, index) => [`gift-finder-${index + 1}.webp`, 20]),
  ["collection-summer.webp", 30],
  ["collection-pets.webp", 30],
  ["review-one.webp", 8],
  ["pdp-product-media.webp", 60],
  ["pdp-review-01.webp", 20],
  ["pdp-review-02.webp", 20],
  ["pdp-personalization-style-01.webp", 12],
  ...Array.from({ length: 6 }, (_, index) => [`pdp-related-${String(index + 1).padStart(2, "0")}.webp`, 40]),
];

function webpAssetIsWithinBudget(name, maxKb) {
  const file = resolve("assets/figma", name);
  return existsSync(file) && statSync(file).size <= maxKb * 1024;
}

const requiredScreens = [
  "home",
  "categoryDrawer",
  "categoryLevel2",
  "categoryFlatList",
  "listPage",
  "listPageFiltered",
  "pdpPage",
  "filterDrawer",
  "giftStep1",
  "giftStep2",
  "giftStep3",
  "giftFinderResults",
  "retentionModal",
  "searchTrending",
  "searchSuggest",
  "searchResultsHas",
  "searchResultsEmpty",
  "cartEmpty",
  "trackOrder",
];

const requiredTransitions = [
  ["home menu opens category drawer", "home", "categoryDrawer"],
  ["level 2 jumps to list page", "categoryLevel2", "listPage"],
  ["level 1 -3 item opens direct flat third-level list", "categoryDrawer", "categoryFlatList"],
  ["flat third-level list jumps to list page", "categoryFlatList", "listPage"],
  ["drawer gift finder item opens gift modal", "categoryDrawer", "giftStep1"],
  ["list category button reopens category drawer", "listPage", "categoryDrawer"],
  ["list filter opens filter drawer", "listPage", "filterDrawer"],
  ["product card opens PDP page", "listPage", "pdpPage"],
  ["filter drawer applies selected filters", "filterDrawer", "listPageFiltered"],
  ["home banner opens gift finder", "home", "giftStep1"],
  ["home search opens trending search", "home", "searchTrending"],
  ["gift step 1 advances to step 2", "giftStep1", "giftStep2"],
  ["gift step 2 advances to step 3", "giftStep2", "giftStep3"],
  ["gift step 3 opens gift finder results", "giftStep3", "giftFinderResults"],
  ["gift close opens retention modal", "giftStep3", "retentionModal"],
  ["search input shows fuzzy suggestions", "searchTrending", "searchSuggest"],
  ["search submit opens results", "searchSuggest", "searchResultsHas"],
  ["empty cart icon opens cart empty page", "home", "cartEmpty"],
  ["drawer track order opens Portuguese order tracking page", "categoryDrawer", "trackOrder"],
];

function getScreenSource(screenId) {
  const start = js.indexOf(`${screenId}: {`);
  if (start === -1) {
    return "";
  }

  const laterStarts = requiredScreens
    .filter((id) => id !== screenId)
    .map((id) => js.indexOf(`${id}: {`, start + 1))
    .filter((index) => index > start);
  const end = laterStarts.length ? Math.min(...laterStarts) : js.indexOf("};", start);
  return js.slice(start, end);
}

function getFunctionSource(functionName) {
  const start = js.indexOf(`function ${functionName}`);
  if (start === -1) {
    return "";
  }

  const end = js.indexOf("\nfunction ", start + 1);
  return js.slice(start, end === -1 ? js.length : end);
}

const renderHomeSource = getFunctionSource("renderHome");

function getCssRule(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) {
    return "";
  }

  const end = css.indexOf("\n}", start);
  return css.slice(start, end === -1 ? css.length : end + 2);
}

function getCssAtRule(name) {
  const start = css.indexOf(`@keyframes ${name}`);
  if (start === -1) {
    return "";
  }

  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    if (css[index] === "{") {
      depth += 1;
    } else if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(start, index + 1);
      }
    }
  }

  return css.slice(start);
}

const checks = [
  ["demo source files exist", filesExist],
  ["demo html loads css", /href="\.\/demo\.css(?:\?v=[^"]+)"/.test(html)],
  ["demo html loads js", /src="\.\/demo\.js(?:\?v=[^"]+)"/.test(html)],
  ["demo has a fixed phone viewport", /class="[^"]*\bapp-viewport\b/.test(html)],
  [
    "demo preserves native 390px artboard scale instead of shrinking by height",
    !/844\s*\/\s*(?:window\.)?innerHeight/.test(js) &&
      !/(?:window\.)?innerHeight\s*\/\s*844/.test(js),
  ],
  [
    "demo frame responds to the current mobile viewport",
    /window\.visualViewport/.test(js) &&
      /--app-height/.test(js) &&
      /--app-scale/.test(js) &&
      !/Math\.max\(0\.86/.test(js) &&
      /--app-height:\s*844px/.test(css) &&
      /\.app-stage\s*{[\s\S]*height:\s*calc\(var\(--app-height\) \* var\(--app-scale\)\)/.test(css) &&
      /\.app-frame\s*{[\s\S]*height:\s*var\(--app-height\)/.test(css) &&
      /\.app-viewport\s*{[\s\S]*height:\s*var\(--app-height\)/.test(css),
  ],
  ["demo no longer renders frame screenshots", !/screenImage|hotspot|assets\/demo/i.test(html + css + js)],
  [
    "banner uses provided desktop banner image as WebP",
    /imageTag\("banner_pic\.webp"[\s\S]*loading:\s*"eager"[\s\S]*fetchpriority:\s*"high"/.test(js) &&
      existsSync(resolve("assets/figma/banner_pic.png")) &&
      existsSync(resolve("assets/figma/banner_pic.webp")),
  ],
  ["provided banner asset exists", existsSync(resolve("assets/figma/banner_pic.png"))],
  [
    "home product cards use refreshed Figma product images",
    Array.from({ length: 10 }, (_, index) => {
      const file = `home-product-${String(index + 1).padStart(2, "0")}.webp`;
      return js.includes(`image: "${file}"`) && existsSync(resolve("assets/figma", file));
    }).every(Boolean),
  ],
  ["logo uses one exported SVG asset", js.includes("./assets/figma/logo-header.svg") && !js.includes("logo-header.png")],
  ["logo SVG asset exists", existsSync(resolve("assets/figma/logo-header.svg"))],
  [
    "account entry is in the top navigation from Figma",
      js.includes("./assets/figma/icon-account.svg") &&
      existsSync(resolve("assets/figma/icon-account.svg")) &&
      /account:\s*"\.\/assets\/figma\/icon-account\.svg"/.test(js) &&
      /class="icon-button account-button"[\s\S]*aria-label="Conta"[\s\S]*icon\("account"\)/.test(js) &&
      /\.account-button\s*{[\s\S]*left:\s*298px[\s\S]*top:\s*12px/.test(css),
  ],
  ["demo only uses local Figma partial assets", !/assets\/demo|figma\.com\/api\/mcp\/asset/i.test(html + css + js)],
  ["demo uses exported SVG icons", js.includes("./assets/figma/icon-menu.svg") && js.includes("./assets/figma/icon-search.svg") && js.includes("./assets/figma/icon-filter.svg")],
  [
    "more buttons use exported arrow SVG, not text glyph arrows",
    js.includes("./assets/figma/icon-chevron-right.svg") &&
      !/Ver Mais <span>&#8250;<\/span>/.test(js) &&
      /\.collection-more\s*{[\s\S]*border-bottom:\s*1px solid var\(--navy\)[\s\S]*white-space:\s*nowrap[\s\S]*width:\s*74px/.test(css),
  ],
  ["demo uses the exported Figma close SVG", js.includes("./assets/figma/icon-close.svg") && existsSync(resolve("assets/figma/icon-close.svg"))],
  [
    "all demo screens are registered",
    requiredScreens.every((screen) => new RegExp(`${screen}\\s*:`).test(js)),
  ],
  [
    "home uses the full Figma homepage artboard structure",
    /renderHome/.test(js) &&
      [
        "recipient-section section-block",
        "trending section-block",
        "trust-badges section-block",
        "recipient-filter section-block",
        "reviews section-block",
        "footer-main",
      ].every((needle) => js.includes(needle)) &&
      js.includes('renderCollection("summer"') &&
      js.includes('renderCollection("pets"'),
  ],
  [
    "home recipient filter keeps the exact Figma static grid geometry",
    /\.recipient-filter\s*{[\s\S]*height:\s*498px[\s\S]*top:\s*4032px/.test(css) &&
      /height:\s*115px/.test(getCssRule(".filter-pills")) &&
      /left:\s*12px/.test(getCssRule(".filter-pills")) &&
      /position:\s*absolute/.test(getCssRule(".filter-pills")) &&
      /top:\s*122px/.test(getCssRule(".filter-pills")) &&
      /width:\s*366px/.test(getCssRule(".filter-pills")) &&
      !/overflow-x:\s*auto/.test(getCssRule(".filter-pills")) &&
      /height:\s*239px/.test(getCssRule(".recipient-filter .filter-products")) &&
      /left:\s*12px/.test(getCssRule(".recipient-filter .filter-products")) &&
      /position:\s*absolute/.test(getCssRule(".recipient-filter .filter-products")) &&
      /top:\s*259px/.test(getCssRule(".recipient-filter .filter-products")) &&
      /width:\s*366px/.test(getCssRule(".recipient-filter .filter-products")) &&
      !/syncHomeFilterLayout/.test(js) &&
      /if \(group === "homeFilterSelected"\)\s*{[\s\S]*state\[group\] = \[label\]/.test(js),
  ],
  [
    "home does not use simplified placeholder tiles",
    !getScreenSource("home").includes("recipient-tile") && !getScreenSource("home").includes("collection-card"),
  ],
  [
    "Figma horizontal rows have ten coded cards",
    js.includes("renderProductRow(10") && js.includes("renderReviewCards(10"),
  ],
  [
    "gift finder image strip auto loops at the Figma component size",
    /function renderGiftFinder[\s\S]*renderFinderStrip\(\)/.test(js) &&
      /const finderLoopImages = \[\.\.\.finderImages, \.\.\.finderImages, \.\.\.finderImages, \.\.\.finderImages\]/.test(js) &&
      /class="finder-track"/.test(js) &&
      /@keyframes finderLoop/.test(css) &&
      /transform:\s*translateX\(-1140px\)/.test(getCssAtRule("finderLoop")) &&
      /\.finder-strip\s*{[\s\S]*height:\s*157px[\s\S]*overflow:\s*hidden[\s\S]*width:\s*566px/.test(css) &&
      /\.finder-track\s*{[\s\S]*animation:\s*finderLoop 30s linear infinite[\s\S]*gap:\s*4px[\s\S]*height:\s*157px/.test(css) &&
      /\.finder-photo\s*{[\s\S]*border-radius:\s*10px[\s\S]*flex:\s*0 0 110px[\s\S]*height:\s*146px[\s\S]*top:\s*11px/.test(css) &&
      /\.finder-photo:nth-child\(even\)\s*{[\s\S]*top:\s*0/.test(css),
  ],
  [
    "gift finder strip follows Figma image order",
    /const finderImages = \[\s*"gift-finder-1\.webp",\s*"gift-finder-3\.webp",\s*"gift-finder-5\.webp",\s*"gift-finder-2\.webp",\s*"gift-finder-4\.webp"/.test(js),
  ],
  [
    "vertical product grids render ten cards and include pagination",
    /function renderVerticalProductGrid\(\)[\s\S]*const pageProducts[\s\S]*\.slice\(0,\s*10\)/.test(js) &&
      /function renderPagination\(\)/.test(js) &&
      /function renderListPage[\s\S]*renderVerticalProductGrid\(\)[\s\S]*renderPagination\(\)[\s\S]*renderFooter\(\)/.test(js) &&
      /function renderSearchResults[\s\S]*renderVerticalProductGrid\(\)[\s\S]*renderPagination\(\)[\s\S]*renderFooter\(\)/.test(js) &&
      /function renderSearchResultsEmpty[\s\S]*renderVerticalProductGrid\(\)[\s\S]*renderPagination\(\)[\s\S]*renderFooter\(\)/.test(js) &&
      /function renderGiftFinderResults[\s\S]*renderVerticalProductGrid\(\)[\s\S]*renderPagination\(\)[\s\S]*renderFooter\(\)/.test(js) &&
      /\.list-product-grid\s*{[\s\S]*display:\s*grid/.test(css) &&
      /\.pagination\s*{[\s\S]*display:\s*flex/.test(css) &&
      /\.list-screen > \.footer\s*{[\s\S]*top:\s*1956px/.test(css) &&
      /\.results-title ~ \.footer\s*{[\s\S]*top:\s*1810px/.test(css) &&
      /\.search-empty-screen > \.footer\s*{[\s\S]*top:\s*1852px/.test(css) &&
      /\.gift-results-screen > \.footer\s*{[\s\S]*top:\s*1758px/.test(css),
  ],
  [
    "PDP route implements the Figma PDP artboard as coded HTML",
    /pdpPage:\s*{[\s\S]*render:\s*renderPdpPage/.test(js) &&
      /function renderPdpPage\(\)[\s\S]*class="screen pdp-screen[^"]*"[\s\S]*pdp-product-media[\s\S]*Caneca personalizada Retrato Pet[\s\S]*pdp-personalization[\s\S]*pdp-add-cart[\s\S]*renderPdpCep\(\)[\s\S]*Clientes Satisfeitos[\s\S]*Itens relacionados que você pode gostar[\s\S]*renderFooter\(\)/.test(js) &&
      /\.pdp-screen\s*{[\s\S]*height:\s*calc\(4374px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-accordion-extra, 0px\)\)[\s\S]*min-height:\s*calc\(4374px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-accordion-extra, 0px\)\)/.test(css) &&
      /\.pdp-product-media\s*{[\s\S]*height:\s*366px[\s\S]*left:\s*12px[\s\S]*top:\s*149px[\s\S]*width:\s*366px/.test(css) &&
      /\.pdp-screen > \.footer\s*{[\s\S]*top:\s*calc\(3305px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-accordion-extra, 0px\)\)/.test(css),
  ],
  [
    "PDP media controls match Figma node 220:315 coordinates",
    /\.pdp-wishlist\s*{[\s\S]*right:\s*8px[\s\S]*top:\s*8px/.test(css) &&
      /\.pdp-wishlist,\s*\n\.pdp-media-button\s*{[\s\S]*height:\s*44px[\s\S]*width:\s*44px/.test(css) &&
      /\.pdp-media-button\s*{[\s\S]*top:\s*161px/.test(css) &&
      /\.pdp-media-prev\s*{[\s\S]*left:\s*8px/.test(css) &&
      /\.pdp-media-next\s*{[\s\S]*right:\s*8px/.test(css) &&
      /\.pdp-media-counter\s*{[\s\S]*bottom:\s*8px[\s\S]*height:\s*22px[\s\S]*left:\s*163px[\s\S]*width:\s*40px/.test(css) &&
      /pdpMediaPrev:\s*"\.\/assets\/figma\/icon-pdp-media-prev\.svg"/.test(js) &&
      /pdpMediaNext:\s*"\.\/assets\/figma\/icon-pdp-media-next\.svg"/.test(js) &&
      /pdp-media-prev[\s\S]*\$\{icon\("pdpMediaPrev"\)\}/.test(js) &&
      /pdp-media-next[\s\S]*\$\{icon\("pdpMediaNext"\)\}/.test(js) &&
      !/\.pdp-media-prev\s*{[^}]*transform:\s*rotate/.test(css),
  ],
  [
    "PDP marked media and product summary details stay on one line like Figma",
    /\.pdp-media-counter\s*{[\s\S]*padding:\s*0[\s\S]*white-space:\s*nowrap/.test(css) &&
      /<span class="pdp-media-counter">\$\{state\.pdpMediaIndex \+ 1\} \/9<\/span>/.test(js) &&
      /\.pdp-rating\s*{[\s\S]*align-items:\s*center[\s\S]*gap:\s*0[\s\S]*height:\s*19px[\s\S]*width:\s*88px/.test(css) &&
      /\.pdp-rating \.rating-stars\s*{[\s\S]*align-items:\s*center[\s\S]*height:\s*19px/.test(css) &&
      /\.pdp-rating b\s*{[\s\S]*align-items:\s*center[\s\S]*display:\s*flex[\s\S]*height:\s*19px[\s\S]*width:\s*25px/.test(css) &&
      /\.pdp-rating em\s*{[\s\S]*align-items:\s*center[\s\S]*display:\s*flex[\s\S]*height:\s*17px[\s\S]*margin-left:\s*2px[\s\S]*width:\s*41px/.test(css),
  ],
  [
    "PDP product and personalization blocks match Figma copy and structure",
    /Produzido sob demanda no Paraná/.test(js) &&
      /<span>Size <i class="required">\*<\/i><\/span>/.test(js) &&
      /12\*18 IN/.test(js) &&
      /16\*24 IN/.test(js) &&
      /24\*36 IN/.test(js) &&
      /Personalize sua caneca/.test(js) &&
      /Nome do pet <i class="required">\*<\/i>/.test(js) &&
      /class="pdp-photo-upload-field"/.test(js) &&
      /Envie uma foto <i class="required">\*<\/i>/.test(js) &&
      /Escolha sua foto para enviar/.test(js) &&
      /Selecionar Foto/.test(js) &&
      /Privacidade da sua foto/.test(js) &&
      /Ver detalhes/.test(js) &&
      /class="pdp-quantity-selector"/.test(js) &&
      /Ver presentes/.test(js),
  ],
  [
    "PDP size selector is state-driven and selectable",
    /pdpSelectedSize:\s*"12\*18 IN"/.test(js) &&
      /const pdpSizeOptions = \[\s*\{ label: "12\*18 IN", price: "R\$ 59,90" \},\s*\{ label: "16\*24 IN", price: "R\$ 79,90" \},\s*\{ label: "24\*36 IN", price: "R\$ 99,90" \},\s*\]/.test(js) &&
      /function currentPdpPrice\(\)/.test(js) &&
      /pdpSizeOptions\.find\(\(option\) => option\.label === state\.pdpSelectedSize\)/.test(js) &&
      /function selectPdpSize\(size\)/.test(js) &&
      /data-action="select-pdp-size"/.test(js) &&
      /data-size-label="\$\{escapeHtml\(option\.label\)\}"/.test(js) &&
      /state\.pdpSelectedSize === option\.label \? "is-selected" : ""/.test(js) &&
      /<strong>\$\{currentPdpPrice\(\)\}<\/strong>/.test(js) &&
      /action === "select-pdp-size"[\s\S]*selectPdpSize\(actionElement\.dataset\.sizeLabel\)/.test(js),
  ],
  [
    "PDP marked Figma styling is applied to Pix and personalization blocks",
    /\.pdp-pix-note\s*{[\s\S]*background:\s*transparent[\s\S]*height:\s*34px[\s\S]*width:\s*366px/.test(css) &&
      !/\.pdp-pix-note\s*{[^}]*background:\s*#e9f5f0/.test(css) &&
      /\.pdp-pix-note \.svg-icon\s*{[\s\S]*height:\s*20px[\s\S]*margin-top:\s*7px[\s\S]*width:\s*20px/.test(css) &&
      /\.pdp-personalization\s*{[\s\S]*background:\s*transparent[\s\S]*border-radius:\s*0[\s\S]*box-shadow:\s*none[\s\S]*height:\s*428px/.test(css) &&
      !/\.pdp-personalization\s*{[^}]*background:\s*#ffffff/.test(css) &&
      /\.pdp-section-title\s*{[\s\S]*background:\s*transparent/.test(css) &&
      !/\.pdp-section-title\s*{[^}]*background:\s*#fff6e9/.test(css) &&
      /\.pdp-input-shell\s*{[\s\S]*border:\s*1px solid #e5e7eb[\s\S]*overflow:\s*hidden/.test(css) &&
      /\.pdp-input-shell input\s*{[\s\S]*height:\s*48px[\s\S]*width:\s*100%/.test(css) &&
      /pdpPix:\s*"\.\/assets\/figma\/icon-pdp-pix\.svg"/.test(js) &&
      /<p class="pdp-pix-note">\$\{icon\("pdpPix"\)\}/.test(js) &&
      /personalize:\s*"\.\/assets\/figma\/icon-pdp-personalize\.svg"/.test(js) &&
      /<div class="pdp-section-title">\s*\$\{icon\("personalize"\)\}/.test(js) &&
      /pdpPreviewSearch:\s*"\.\/assets\/figma\/icon-pdp-preview-search\.svg"/.test(js) &&
      /<button class="pdp-preview-button" type="button">\$\{icon\("pdpPreviewSearch"\)\} Ver detalhes<\/button>/.test(js) &&
      !/\.pdp-preview-button \.svg-icon\s*{[^}]*filter:/.test(css),
  ],
  [
    "PDP accordions and post-purchase links are split like the Figma PDP artboard",
    /Produto e impressão/.test(js) &&
      /Caneca de cerâmica branca, 340 g, com impressão personalizada em área própria para sublimação/.test(js) &&
      /pdpOpenAccordions:\s*\["productInfo"\]/.test(js) &&
      /function renderPdpAccordionItem/.test(js) &&
      /function pdpAccordionExtra/.test(js) &&
      /const productInfoExtra = isPdpAccordionOpen\("productInfo"\) \? 0 : -100/.test(js) &&
      /const productInfoGap = 41/.test(js) &&
      /isPdpAccordionOpen\(item\.key\)\)\.length \* 66/.test(js) &&
      /--pdp-details-gap: \$\{productInfoGap\}px/.test(js) &&
      /data-action="toggle-pdp-accordion"/.test(js) &&
      /function togglePdpAccordion/.test(js) &&
      /action === "toggle-pdp-accordion"[\s\S]*togglePdpAccordion/.test(js) &&
      /class="pdp-details-accordion-list"/.test(js) &&
      /Como escolher a foto/.test(js) &&
      /Produção, entrega e trocas/.test(js) &&
      /Foto e privacidade/.test(js) &&
      !/Dúvidas\? Fale com a gente/.test(getFunctionSource("renderPdpPage")) &&
      /Compartilhar produto:/.test(js) &&
      /\.pdp-product-info-content\s*{[\s\S]*height:\s*84px/.test(css) &&
      /\.pdp-accordion-head \.svg-icon\s*{[\s\S]*height:\s*16px[\s\S]*margin-left:\s*auto[\s\S]*width:\s*16px/.test(css) &&
      /\.pdp-product-info-head\s*{[\s\S]*background:\s*transparent[\s\S]*height:\s*17px/.test(css) &&
      /\.pdp-product-info-head\.is-open\s*{[\s\S]*background:\s*transparent/.test(css) &&
      /\.pdp-details-accordion-list\s*{[\s\S]*background:\s*transparent[\s\S]*top:\s*calc\(1545px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-info-height, 117px\) \+ var\(--pdp-details-gap, 41px\)\)/.test(css) &&
      /\.pdp-details-row\s*{[\s\S]*background:\s*transparent[\s\S]*height:\s*17px/.test(css) &&
      /\.pdp-details-item\.is-open \.pdp-details-row\s*{[\s\S]*background:\s*transparent/.test(css) &&
      /\.pdp-details-content\s*{[\s\S]*background:\s*transparent[\s\S]*height:\s*66px[\s\S]*padding:\s*16px 0/.test(css) &&
      /\.pdp-share\s*{[\s\S]*top:\s*calc\(1885px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-accordion-extra, 0px\)\)/.test(css) &&
      /\.pdp-reviews-section\s*{[\s\S]*top:\s*calc\(1973px \+ var\(--pdp-extra, 0px\) \+ var\(--pdp-accordion-extra, 0px\)\)/.test(css),
  ],
  [
    "PDP marked share and reviews details match Figma sizing",
    /\.pdp-contact-service\s*{[\s\S]*display:\s*none/.test(css) &&
      /\.pdp-share span\s*{[\s\S]*font-weight:\s*400[\s\S]*line-height:\s*17px[\s\S]*white-space:\s*nowrap/.test(css) &&
      /pdpContactWhatsapp:\s*"\.\/assets\/figma\/icon-pdp-contact-whatsapp\.svg"/.test(js) &&
      /pdpContactArrow:\s*"\.\/assets\/figma\/icon-pdp-contact-arrow\.svg"/.test(js) &&
      /pdpProductInfoArrow:\s*"\.\/assets\/figma\/icon-pdp-product-info-arrow\.svg"/.test(js) &&
      /pdpDetailsArrow:\s*"\.\/assets\/figma\/icon-pdp-details-arrow\.svg"/.test(js) &&
      !/pdp-contact-service">\s*\$\{icon\("pdpContactWhatsapp"\)\}[\s\S]*\$\{icon\("pdpContactArrow"\)\}/.test(getFunctionSource("renderPdpPage")) &&
      /pdp-product-info-head[\s\S]*\$\{icon\(productInfoOpen \? "pdpProductInfoArrow" : "pdpDetailsArrow"\)\}/.test(js) &&
      /pdp-details-row[\s\S]*\$\{icon\(open \? "pdpProductInfoArrow" : "pdpDetailsArrow"\)\}/.test(js) &&
      /facebook:\s*"\.\/assets\/figma\/icon-pdp-share-facebook\.svg"/.test(js) &&
      /pdp-share-facebook/.test(js) &&
      /<span class="pdp-review-score-text"><strong>4\.8<\/strong><span>\/5<\/span><\/span>/.test(js) &&
      !/<strong>4\.8\/5<\/strong>/.test(js) &&
      /\.pdp-review-summary\s*{[\s\S]*gap:\s*0/.test(css) &&
      /\.pdp-review-summary \.rating-stars\s*{[\s\S]*flex:\s*0 0 88px[\s\S]*margin-right:\s*4px[\s\S]*width:\s*88px/.test(css) &&
      /\.pdp-review-score-text\s*{[^}]*display:\s*inline-flex[^}]*gap:\s*0[^}]*transform:\s*translateY\(1px\)/.test(css) &&
      /\.pdp-review-score-text strong\s*{[^}]*font-size:\s*16px[^}]*line-height:\s*19px/.test(css) &&
      /\.pdp-review-score-text span\s*{[^}]*font-size:\s*12px[^}]*line-height:\s*14px[^}]*transform:\s*translateY\(0\)/.test(css) &&
      /\.review-copy p\s*{[\s\S]*font-size:\s*14px[\s\S]*line-height:\s*17px[\s\S]*max-height:\s*51px/.test(css) &&
      !/\.pdp-review-card \.review-copy p\s*{[^}]*font-size:/.test(css) &&
      !/\.pdp-review-card \.review-copy p\s*{[^}]*line-height:/.test(css),
  ],
  [
    "PDP Figma colors are encoded for local production, size, style, and CEP controls",
    /\.pdp-local-production\s*{[\s\S]*background:\s*#e7f0e6[\s\S]*color:\s*#168a4a/.test(css) &&
      /\.pdp-size-options button\s*{[\s\S]*background:\s*#ffffff[\s\S]*border:\s*1px solid #e5e7eb/.test(css) &&
      /\.pdp-size-options button\.is-selected\s*{[\s\S]*background:\s*#fdf3ee[\s\S]*border-color:\s*var\(--red\)[\s\S]*color:\s*var\(--red\)/.test(css) &&
      /\.pdp-style-option\s*{[\s\S]*background:\s*#ffffff[\s\S]*border:\s*1px solid #e5e7eb/.test(css) &&
      /\.pdp-style-option\.is-selected\s*{[\s\S]*background:\s*#fdf3ee[\s\S]*border-color:\s*var\(--red\)[\s\S]*color:\s*var\(--red\)/.test(css) &&
      /pdpTruck:\s*"\.\/assets\/figma\/icon-pdp-cep-truck\.svg"/.test(js) &&
      /pdp-cep-title">\$\{icon\("pdpTruck"\)\}/.test(js) &&
      /\.pdp-cep-button\s*{[\s\S]*border-radius:\s*0 8px 8px 0[\s\S]*right:\s*0/.test(css),
  ],
  [
    "PDP uses local WebP assets exported from Figma",
    [
      "pdp-product-media.webp",
      "pdp-review-01.webp",
      "pdp-review-02.webp",
      "pdp-personalization-style-01.webp",
      ...Array.from({ length: 6 }, (_, index) => `pdp-related-${String(index + 1).padStart(2, "0")}.webp`),
    ].every((file) => existsSync(resolve("assets/figma", file))) &&
      /const pdpMediaImages = \[[\s\S]*"pdp-product-media\.webp"/.test(js) &&
      /imageTag\(mediaImage,\s*\{ className:\s*"pdp-main-image"/.test(js) &&
      /const pdpRelatedProducts = \[[\s\S]*"pdp-related-01\.webp"[\s\S]*"pdp-related-06\.webp"/.test(js) &&
      !/figma\.com\/api\/mcp\/asset/.test(js + html + css),
  ],
  [
    "product cards navigate into the PDP page",
    /function renderProductCard\(product, \{ size = "small", withReview = false \} = \{\}\)[\s\S]*data-action="navigate" data-target="pdpPage"/.test(js) &&
      /listPage:\s*{[\s\S]*target:\s*"pdpPage"/.test(js) &&
      /home:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /cartEmpty:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /listPageFiltered:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /giftFinderResults:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /searchResultsHas:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /searchResultsEmpty:\s*{[\s\S]*transitions:\s*\[[\s\S]*\{ action: "product", target: "pdpPage" \}/.test(js) &&
      /function renderHome[\s\S]*product-grid large-grid[\s\S]*renderProductCard[\s\S]*renderProductRow\(10,\s*getHomeFilterProducts\(\)\)/.test(js) &&
      /function renderCollection[\s\S]*renderProductRow\(10\)/.test(js) &&
      /function renderVerticalProductGrid\(\)[\s\S]*renderProductCard/.test(js) &&
      /function renderCartEmpty[\s\S]*cart-related-grid[\s\S]*renderProductCard/.test(js) &&
      /pdpRelatedProducts\.map\(\(product, index\) => renderProductCard/.test(js) &&
      /\.product-card\s*{[\s\S]*cursor:\s*pointer/.test(css),
  ],
  [
    "PDP CEP flow is front-end only with success and 00000000 failure states",
    /cepValue:\s*""/.test(js) &&
      /cepStatus:\s*"default"/.test(js) &&
      /cepTimer:\s*null/.test(js) &&
      /function formatCep\(value\)/.test(js) &&
      /function handleCepInput\(input\)/.test(js) &&
      /function resolveCepStatus\(digits\)/.test(js) &&
      /function syncCepInlineStatus\(status\)/.test(js) &&
      /function queueCepLookup\(digits\)/.test(js) &&
      /window\.clearTimeout\(state\.cepTimer\)/.test(js) &&
      /state\.cepStatus = "loading"[\s\S]*state\.cepTimer = window\.setTimeout/.test(js) &&
      /function handleCepInput\(input\)[\s\S]*syncCepInlineStatus\(state\.cepStatus\)[\s\S]*function calculateCep/.test(js) &&
      !/function handleCepInput\(input\)[\s\S]*render\(\{ preserveScroll: true \}\)[\s\S]*function calculateCep/.test(js) &&
      /digits === "00000000" \? "unavailable" : "success"/.test(js) &&
      /function calculateCep\(\)[\s\S]*const digits = state\.cepValue\.replace\(\/\\D\/g,\s*""\)[\s\S]*queueCepLookup\(digits\)/.test(js) &&
      /data-cep-input/.test(js) &&
      /data-action="calculate-cep"/.test(js) &&
      /action === "calculate-cep"[\s\S]*calculateCep\(\)/.test(js) &&
      /event\.target\.matches\("\[data-cep-input\]"\)[\s\S]*handleCepInput/.test(js) &&
      /\.pdp-cep\s*{[\s\S]*background:\s*#f6f6f6/.test(css) &&
      /\.pdp-cep\s*{[\s\S]*left:\s*12px[\s\S]*width:\s*366px/.test(css) &&
      /\.pdp-cep-inner\s*{[\s\S]*width:\s*342px/.test(css) &&
      /\.pdp-cep-form\s*{[\s\S]*height:\s*48px[\s\S]*width:\s*342px/.test(css) &&
      /\.pdp-cep-button\s*{[\s\S]*appearance:\s*none[\s\S]*border:\s*0[\s\S]*height:\s*48px[\s\S]*width:\s*89px/.test(css) &&
      /\.pdp-cep-button\.is-disabled\s*{[\s\S]*background:\s*#e5e7eb[\s\S]*color:\s*#9ca3af/.test(css) &&
      /\.pdp-delivery-options\s*{[\s\S]*gap:\s*4px/.test(css) &&
      /\.pdp-cep-error\s*{[\s\S]*color:\s*#f59e0b/.test(css),
  ],
  [
    "empty cart route follows Figma cart-empty page",
    /cartCount:\s*0/.test(js) &&
      /cartEmpty:\s*{[\s\S]*render:\s*renderCartEmpty/.test(js) &&
      /class="icon-button bag-button"[\s\S]*data-action="open-cart"/.test(js) &&
      /function openCart\(\)[\s\S]*state\.cartCount === 0[\s\S]*navigateTo\("cartEmpty"\)/.test(js) &&
      /function renderCartEmpty\(\)[\s\S]*Seu carrinho[\s\S]*Continue comprando[\s\S]*products\.slice\(0,\s*6\)[\s\S]*renderFooter\(\)/.test(js) &&
      /\.cart-empty-state\s*{[\s\S]*top:\s*194px/.test(css) &&
      /\.cart-related\s*{[\s\S]*top:\s*414px/.test(css) &&
      /\.cart-empty-screen > \.footer\s*{[\s\S]*top:\s*1460px/.test(css),
  ],
  [
    "cart count badge centers the zero",
    /function cartCountBadge\(\)[\s\S]*<svg class="cart-count"[\s\S]*viewBox="0 0 18 18"[\s\S]*<circle cx="9" cy="9" r="9"[\s\S]*<text x="9" y="9" text-anchor="middle" dominant-baseline="central"/.test(js) &&
      /\.cart-count\s*{[\s\S]*height:\s*18px[\s\S]*left:\s*364px[\s\S]*overflow:\s*visible[\s\S]*pointer-events:\s*none[\s\S]*top:\s*8px[\s\S]*width:\s*18px/.test(css),
  ],
  [
    "drawer track order uses Portuguese copy and opens a tracking page",
    /trackOrder:\s*"\.\/assets\/figma\/icon-track-order\.svg"/.test(js) &&
      existsSync(resolve("assets/figma/icon-track-order.svg")) &&
      /trackOrder:\s*{[\s\S]*render:\s*renderTrackOrder/.test(js) &&
      /data-action="navigate" data-target="trackOrder"[\s\S]*Acompanhar pedido/.test(js) &&
      /function renderTrackOrder\(\)[\s\S]*Acompanhe seu pedido[\s\S]*Número do pedido[\s\S]*Acompanhar pedido[\s\S]*renderFooter\(\)/.test(js) &&
      /\.drawer-track-order\s*{[\s\S]*top:\s*566px/.test(css) &&
      /\.track-order-panel\s*{[\s\S]*background:\s*var\(--soft\)[\s\S]*top:\s*194px/.test(css) &&
      /\.track-order-screen > \.footer\s*{[\s\S]*top:\s*670px/.test(css),
  ],
  [
    "footer screens end at the footer bottom without extra blank space",
    /\.home-screen\s*{[\s\S]*height:\s*5925px[\s\S]*min-height:\s*5925px/.test(css) &&
      /\.list-screen\s*{[\s\S]*min-height:\s*2992px/.test(css) &&
      /\.search-results-screen\s*{[\s\S]*min-height:\s*2846px/.test(css) &&
      /\.search-empty-screen\s*{[\s\S]*min-height:\s*2888px/.test(css) &&
      /\.gift-results-screen\s*{[\s\S]*min-height:\s*2794px/.test(css) &&
      /\.cart-empty-screen\s*{[\s\S]*height:\s*2496px[\s\S]*min-height:\s*2496px/.test(css) &&
      /\.track-order-screen\s*{[\s\S]*height:\s*1706px[\s\S]*min-height:\s*1706px/.test(css),
  ],
  [
    "newsletter form matches Figma footer node 234:772 and 234:774",
    /\.newsletter\s*{[\s\S]*background:\s*var\(--soft\)/.test(css) &&
      /\.newsletter-form\s*{[\s\S]*background:\s*#ffffff[\s\S]*height:\s*48px/.test(css) &&
      /\.newsletter-form::after\s*{[\s\S]*border:\s*1px solid #e5e7eb[\s\S]*border-radius:\s*8px[\s\S]*inset:\s*0[\s\S]*pointer-events:\s*none/.test(css) &&
      /\.newsletter-form input\s*{[\s\S]*background:\s*#ffffff[\s\S]*height:\s*48px[\s\S]*left:\s*12px[\s\S]*width:\s*200px/.test(css) &&
      /\.newsletter-form button\s*{[\s\S]*appearance:\s*none[\s\S]*border:\s*0[\s\S]*border-radius:\s*0 8px 8px 0[\s\S]*display:\s*flex[\s\S]*height:\s*48px[\s\S]*line-height:\s*1\.2[\s\S]*right:\s*0[\s\S]*top:\s*0[\s\S]*width:\s*139px[\s\S]*z-index:\s*2/.test(css) &&
      /placeholder="Digite seu e-mail"/.test(js) &&
      />Receber cupom<\/button>/.test(js),
  ],
  [
    "footer brand marks use SVG assets",
    js.includes("./assets/figma/logo.svg") &&
      js.includes("./assets/figma/trustpilot-logo-white.svg") &&
      existsSync(resolve("assets/figma/logo.svg")) &&
      existsSync(resolve("assets/figma/trustpilot-logo-white.svg")) &&
      /class="trustpilot-row"[\s\S]*class="trustpilot-logo"[\s\S]*class="trustpilot-review-link"[\s\S]*13,578 review/.test(js) &&
      /\.trustpilot-row\s*{[\s\S]*display:\s*flex[\s\S]*gap:\s*4px[\s\S]*width:\s*232px/.test(css) &&
      /\.trustpilot-logo\s*{[\s\S]*height:\s*30px[\s\S]*width:\s*120px/.test(css) &&
      /\.trustpilot-review-link\s*{[\s\S]*text-decoration:\s*underline/.test(css) &&
      !js.includes("./assets/figma/footer-logo.png") &&
      !js.includes("./assets/figma/trustpilot.png") &&
      !js.includes("./assets/figma/trustpilot-logo.svg"),
  ],
  [
    "pagination buttons are clickable and update current page",
    /paginationPage:\s*1/.test(js) &&
      /function setPaginationPage\(page\)/.test(js) &&
      /data-action="set-page"/.test(js) &&
      /data-action="step-page"/.test(js) &&
      /action === "set-page"[\s\S]*setPaginationPage/.test(js) &&
      /action === "step-page"[\s\S]*stepPagination/.test(js) &&
      /aria-current="\$\{isCurrent \? "page" : "false"\}"/.test(js),
  ],
  [
    "home trending section stays at six products without pagination",
    renderHomeSource.includes('<section class="trending section-block">') &&
      /products\.slice\(0,\s*6\)/.test(renderHomeSource) &&
      !/products\.slice\(0,\s*10\)/.test(renderHomeSource) &&
      !/renderPagination\(\)/.test(renderHomeSource) &&
      /\.trending\s*{[\s\S]*height:\s*957px[\s\S]*top:\s*1284px/.test(css) &&
      /\.more-button\s*{[\s\S]*top:\s*925px/.test(css),
  ],
  [
    "list and search result key y positions match Figma",
    /\.crumbs\s*{[\s\S]*top:\s*178px/.test(css) &&
      /\.list-intro,\s*\n\.results-title\s*{[\s\S]*top:\s*207px/.test(css) &&
      /\.list-intro,\s*\n\.results-title\s*{[\s\S]*height:\s*149px/.test(css) &&
      /\.list-toolbar\s*{[\s\S]*top:\s*372px/.test(css) &&
      /\.results-title\s*{[\s\S]*top:\s*178px/.test(css) &&
      /\.results-title \+ \.list-toolbar\s*{[\s\S]*top:\s*226px/.test(css) &&
      /\.results-title ~ \.list-product-grid\s*{[\s\S]*top:\s*278px/.test(css),
  ],
  [
    "gift finder steps use distinct Figma sheet heights",
    /class="gift-modal gift-step-\$\{step\}"/.test(js) &&
      /\.gift-modal\.gift-step-1\s*{[\s\S]*top:\s*98px[\s\S]*height:\s*746px/.test(css) &&
      /\.gift-modal\.gift-step-2\s*{[\s\S]*top:\s*434px[\s\S]*height:\s*410px/.test(css) &&
      /\.gift-modal\.gift-step-3\s*{[\s\S]*top:\s*487px[\s\S]*height:\s*357px/.test(css),
  ],
  [
    "gift finder carries previous selections through steps",
    /giftSelections:\s*{[\s\S]*recipient:\s*"Mãe"[\s\S]*occasion:\s*"Aniversário"[\s\S]*budget:\s*""/.test(js) &&
      /function giftSelectionSummary\(step\)/.test(js) &&
      /class="gift-selection-summary"/.test(js) &&
      /Para:\s*\$\{escapeHtml\(state\.giftSelections\.recipient\)\}/.test(js) &&
      /class="selection-dot"/.test(js) &&
      /data-action="choose-gift"/.test(js) &&
      /data-gift-key="\$\{config\.selectionKey\}"/.test(js) &&
      /function chooseGift\(key, value, target\)[\s\S]*state\.giftSelections\[key\] = value[\s\S]*navigateTo\(target\)/.test(js) &&
      /action === "choose-gift"[\s\S]*chooseGift/.test(js) &&
      /Quanto quer investir\?/.test(js) &&
      /choices:\s*\["Até R\$ 70", "R\$ 70 a R\$ 100", "Acima de R\$ 100"\]/.test(js) &&
      !/step === 3 \? '<div class="step-actions"/.test(js) &&
      /\.gift-selection-summary\s*{[\s\S]*top:\s*44px/.test(css) &&
      /\.gift-selection-summary \.svg-icon\s*{[\s\S]*transform:\s*rotate\(180deg\)/.test(css) &&
      /\.selection-dot\s*{[\s\S]*height:\s*2px[\s\S]*width:\s*2px/.test(css),
  ],
  [
    "gift finder result page matches Figma result layout",
    /giftFinderResults:\s*{[\s\S]*render:\s*renderGiftFinderResults/.test(js) &&
      /function renderGiftFinderResults[\s\S]*searchBar\(\{ plainButton:\s*true \}\)[\s\S]*999 ideias[\s\S]*renderVerticalProductGrid\(\)/.test(js) &&
      /\.gift-results-toolbar\s*{[\s\S]*top:\s*174px/.test(css) &&
      /\.gift-results-screen \.list-product-grid\s*{[\s\S]*top:\s*226px/.test(css) &&
      js.includes("./assets/figma/icon-search-navy.svg") &&
      existsSync(resolve("assets/figma/icon-search-navy.svg")),
  ],
  [
    "list page and filtered list page are separate Figma states",
    /listPageFiltered:\s*{[\s\S]*render:\s*\(\) => renderListPage\(\{ filtered:\s*true \}\)/.test(js) &&
      /const filterCount = getDraftFilterCount\(\);\s*\n\s*const filterLabel = filterCount > 0 \? `Filtrar \(\$\{filterCount\}\)` : "Filtrar"/.test(js) &&
      /\.sort-button\s*{[\s\S]*width:\s*122px/.test(css) &&
      /\.list-screen\.is-filtered \.filter-button\s*{[\s\S]*width:\s*109px/.test(css) &&
      /\.filter-button\s*{[\s\S]*width:\s*89px/.test(css),
  ],
  [
    "list pages remove the category filter pill strip and move content up",
    !/function renderListPage\(options = \{\}\)[\s\S]*class="category-pills"/.test(js) &&
      !/const listPills = filterOptions\.find/.test(getFunctionSource("renderListPage")) &&
      /height:\s*149px/.test(getCssRule(".list-intro,\n.results-title")) &&
      /\.list-toolbar\s*{[\s\S]*top:\s*372px/.test(css) &&
      /\.list-product-grid\s*{[\s\S]*top:\s*424px/.test(css) &&
      /\.pagination\s*{[\s\S]*top:\s*1860px/.test(css) &&
      !/const horizontalScrollSelectors = \["\.category-pills"\]/.test(js),
  ],
  [
    "filter count label stays on one line",
    /\$\{filterCount > 0 \? "has-filter-count" : ""\}/.test(js) &&
      /\.filter-button\s*{[\s\S]*white-space:\s*nowrap/.test(css) &&
      /\.list-screen\.has-filter-count \.filter-button\s*{[\s\S]*width:\s*109px/.test(css),
  ],
  [
    "list breadcrumb first two levels are clickable",
    /<nav class="crumbs" aria-label="Breadcrumb">[\s\S]*class="crumb-link"[\s\S]*data-action="home"[\s\S]*Home[\s\S]*data-action="navigate" data-target="categoryDrawer"[\s\S]*Para quem/.test(js) &&
      /\.crumb-link\s*{[\s\S]*background:\s*transparent[\s\S]*color:\s*var\(--navy\)[\s\S]*font-size:\s*14px/.test(css) &&
      /\.crumb-link:hover,\s*\n\.crumb-link:focus-visible\s*{[\s\S]*text-decoration:\s*underline/.test(css),
  ],
  [
    "selectable pills match Figma selected and unselected component states",
    js.includes("./assets/figma/icon-chip-close.svg") &&
      existsSync(resolve("assets/figma/icon-chip-close.svg")) &&
      /function renderSelectablePill/.test(js) &&
      /data-action="toggle-pill"/.test(js) &&
      /function togglePill\(group, label\)[\s\S]*group === "homeFilterSelected"[\s\S]*state\[group\] = \[label\]/.test(js) &&
      /\.filter-pills button\s*{[\s\S]*background:\s*var\(--soft-blue\)/.test(css) &&
      /\.filter-pills button\.is-selected\s*{[\s\S]*background:\s*var\(--navy\)[\s\S]*color:\s*#ffffff/.test(css) &&
      /\.filter-pills button\.is-selected \.svg-icon\s*{[\s\S]*height:\s*16px[\s\S]*width:\s*16px/.test(css) &&
      /flex-wrap:\s*wrap/.test(getCssRule(".filter-pills")) &&
      /justify-content:\s*center/.test(getCssRule(".filter-pills")) &&
      /position:\s*absolute/.test(getCssRule(".filter-pills")) &&
      /top:\s*122px/.test(getCssRule(".filter-pills")) &&
      /position:\s*absolute/.test(getCssRule(".recipient-filter .filter-products")) &&
      /top:\s*259px/.test(getCssRule(".recipient-filter .filter-products")) &&
      !/function syncHomeFilterLayout\(\)/.test(js),
  ],
  [
    "home recipient filter swaps the visible product set by selected option",
      /const homeFilterProductCatalog = {[\s\S]*"Pai\/Avô"[\s\S]*"Mãe\/Avó"[\s\S]*"Crianças\/Bebês"/.test(js) &&
      /function getHomeFilterProducts\(\)[\s\S]*state\.homeFilterSelected\[0\][\s\S]*homeFilterProductCatalog\[selectedFilter\]/.test(js) &&
      /function renderProductRow\(count, productList = products\)[\s\S]*productList\.slice\(0,\s*count\)/.test(js) &&
      /class="product-row filter-products"[\s\S]*renderProductRow\(10,\s*getHomeFilterProducts\(\)\)/.test(js) &&
      /function togglePill\(group, label\)[\s\S]*group === "homeFilterSelected"[\s\S]*state\[group\] = \[label\]/.test(js),
  ],
  [
    "home recipient pills wrap without list category pill rows",
    /flex-wrap:\s*wrap/.test(getCssRule(".filter-pills")) &&
      !/overflow-x:\s*auto/.test(getCssRule(".filter-pills")) &&
      /\.filter-pills button\s*{[\s\S]*flex:\s*0 0 auto/.test(css) &&
      !/\.category-pills/.test(css),
  ],
  [
    "list sort control expands and selects sort options",
    /sortLabel:\s*"Relevância"/.test(js) &&
      /sortOpen:\s*false/.test(js) &&
      /const sortOptions = \["Relevância", "Menor preço", "Maior preço", "Novidades"\]/.test(js) &&
      /sortChevron:\s*"\.\/assets\/figma\/icon-sort-chevron\.svg"/.test(js) &&
      existsSync(resolve("assets/figma/icon-sort-chevron.svg")) &&
      /function renderSortControl\(\)/.test(js) &&
      /data-action="toggle-sort"[\s\S]*icon\("sortChevron"\)/.test(js) &&
      /data-action="select-sort"/.test(js) &&
      /function toggleSort\(\)[\s\S]*state\.sortOpen = !state\.sortOpen/.test(js) &&
      /function selectSort\(label\)[\s\S]*state\.sortLabel = label[\s\S]*state\.sortOpen = false/.test(js) &&
      /\.list-toolbar\s*{[\s\S]*z-index:\s*6/.test(css) &&
      /\.sort-button\s*{[\s\S]*background:\s*transparent[\s\S]*border:\s*1px solid var\(--navy\)[\s\S]*transition:\s*background-color 160ms ease, color 160ms ease/.test(css) &&
      /\.sort-button:hover,\s*\n\.sort-button:focus-visible\s*{[\s\S]*background:\s*var\(--soft-blue\)/.test(css) &&
      /\.sort-control\.is-open \.sort-button\s*{[\s\S]*background:\s*var\(--navy\)[\s\S]*color:\s*#ffffff/.test(css) &&
      /\.sort-control\.is-open \.sort-button \.svg-icon\s*{[\s\S]*filter:\s*brightness\(0\) invert\(1\)[\s\S]*transform:\s*rotate\(180deg\)/.test(css) &&
      /\.filter-button\s*{[\s\S]*background:\s*var\(--soft-blue\)[\s\S]*border:\s*0/.test(css) &&
      /\.sort-menu\s*{[\s\S]*background:\s*#fefbf7[\s\S]*border:\s*1px solid #d9e4ef[\s\S]*border-radius:\s*8px[\s\S]*box-shadow:\s*0 10px 24px rgba\(19, 49, 83, 0\.14\)[\s\S]*position:\s*absolute[\s\S]*top:\s*36px/.test(css) &&
      /\.sort-menu button\s*{[\s\S]*background:\s*#fefbf7/.test(css) &&
      /\.sort-menu button\.is-selected\s*{[\s\S]*background:\s*var\(--navy\)[\s\S]*color:\s*#ffffff/.test(css) &&
      !/\.sort-menu button\.is-selected\s*{[\s\S]*background:\s*#1f7ae0/.test(css),
  ],
  [
    "sort menu options have roomy spacing",
    /\.sort-menu\s*{[\s\S]*display:\s*flex[\s\S]*flex-direction:\s*column[\s\S]*gap:\s*4px[\s\S]*padding:\s*6px/.test(css) &&
      /\.sort-menu button\s*{[\s\S]*height:\s*34px[\s\S]*padding:\s*0 10px/.test(css),
  ],
  [
    "search results use Figma query search box",
    /function renderSearchResults\(\)[\s\S]*resultSearchBar\(query\)[\s\S]*Filtrar<\/button>/.test(js) &&
      /function resultSearchBar[\s\S]*search-clear[\s\S]*icon\("searchClose"\)[\s\S]*search-submit/.test(js) &&
      /\.result-query-search \.search-clear\s*{[\s\S]*background:\s*transparent[\s\S]*height:\s*24px[\s\S]*right:\s*80px[\s\S]*width:\s*24px/.test(css) &&
      /\.result-query-search \.search-clear \.svg-icon\s*{[\s\S]*left:\s*0[\s\S]*width:\s*24px/.test(css) &&
      /\.search input::-webkit-search-cancel-button\s*{[\s\S]*display:\s*none/.test(css),
  ],
  [
    "typed search shows clear-all and Figma Search-recommend fuzzy list",
    /function searchBar\(\{ active = false[\s\S]*hasSearchValue[\s\S]*has-clear[\s\S]*data-action="clear-search"/.test(js) &&
      /function clearSearch\(\)[\s\S]*state\.searchQuery = ""[\s\S]*state\.currentScreenId = "searchTrending"[\s\S]*focusSearch: true/.test(js) &&
      /searchRecommendationCatalog\s*=\s*\[[\s\S]*"caneca"[\s\S]*"canecas personalizadas"[\s\S]*"caneca com casal"/.test(js) &&
      /class="search-layer \$\{hasQuery \? "search-recommend" : ""\}"/.test(js) &&
      /\$\{hasQuery \? "" : '<p class="search-layer-title">Pesquisas em alta<\/p>'\}/.test(js) &&
      /function suggestionItem\(term, withMeta\)[\s\S]*withMeta === "recommend"[\s\S]*class="suggestion-item recommend-item"[\s\S]*escapeHtml\(term\)/.test(js) &&
      /function getFilteredSuggestions\(\)[\s\S]*searchRecommendationCatalog\.filter[\s\S]*\.slice\(0,\s*6\)/.test(js) &&
      /\.search\.has-clear input\s*{[\s\S]*width:\s*240px/.test(css) &&
      /\.search\.is-active:not\(\.result-query-search\) \.search-clear\s*{[\s\S]*height:\s*24px[\s\S]*right:\s*72px[\s\S]*top:\s*12px[\s\S]*width:\s*24px/.test(css) &&
      /\.search-recommend \.suggestion-list\s*{[\s\S]*gap:\s*28px/.test(css) &&
      /\.search-recommend \.suggestion-item\s*{[\s\S]*line-height:\s*17px[\s\S]*width:\s*100%/.test(css),
  ],
  [
    "default search is outlined and active red search buttons share result size",
    /function searchBar\(\{ active = false[\s\S]*const searchIcon = active \? "search" : "searchNavy"/.test(js) &&
      /\.search::after\s*{[\s\S]*border:\s*1px solid var\(--line\)[\s\S]*border-radius:\s*8px[\s\S]*inset:\s*0[\s\S]*pointer-events:\s*none/.test(css) &&
      /\.search\.is-active::after\s*{[\s\S]*border-color:\s*var\(--red\)/.test(css) &&
      /background:\s*#ffffff/.test(getCssRule(".search")) &&
      /background:\s*transparent/.test(getCssRule(".search input")) &&
      /background:\s*transparent/.test(getCssRule(".search button")) &&
      /border-radius:\s*0 7px 7px 0/.test(getCssRule(".search button")) &&
      /background:\s*var\(--red\)/.test(getCssRule('.search.is-active:not(.result-query-search) button[type="submit"]')) &&
      /width:\s*56px/.test(getCssRule('.search.is-active:not(.result-query-search) button[type="submit"]')) &&
      /left:\s*16px/.test(getCssRule('.search.is-active:not(.result-query-search) button[type="submit"] .svg-icon')) &&
      /\.search:not\(\.is-active\) button\s*{[\s\S]*width:\s*56px/.test(css) &&
      /\.search:not\(\.is-active\) button \.svg-icon\s*{[\s\S]*left:\s*16px/.test(css) &&
      /background:\s*var\(--red\)/.test(getCssRule(".result-query-search .search-submit")) &&
      /width:\s*56px/.test(getCssRule(".result-query-search .search-submit")),
  ],
  [
    "empty search result page matches Figma empty-state layout",
    /searchResultsEmpty:\s*{[\s\S]*render:\s*renderSearchResultsEmpty/.test(js) &&
      /function renderSearchResultsEmpty[\s\S]*xaddas[\s\S]*renderVerticalProductGrid\(\)/.test(js) &&
      /\.search-empty-message\s*{[\s\S]*top:\s*194px/.test(css) &&
      /\.search-empty-screen \.list-toolbar\s*{[\s\S]*top:\s*268px/.test(css) &&
      /\.search-empty-screen \.list-product-grid\s*{[\s\S]*top:\s*320px/.test(css) &&
      existsSync(resolve("assets/figma/icon-search-close.svg")) &&
      existsSync(resolve("assets/figma/icon-filter.svg")),
  ],
  [
    "retention modal matches Figma confirm card size",
    /\.retention-card\s*{[\s\S]*height:\s*181px[\s\S]*left:\s*20px[\s\S]*top:\s*332px[\s\S]*width:\s*350px/.test(css),
  ],
  [
    "retention modal internals match Figma coordinates",
    js.includes("Você está quase lá!") &&
      js.includes("Continue para ver sugestões de presentes.") &&
      js.includes("Continuar escolhendo") &&
    /\.retention-card \.modal-title\s*{[\s\S]*font-size:\s*16px[\s\S]*left:\s*20px[\s\S]*top:\s*44px[\s\S]*width:\s*310px/.test(css) &&
      /\.retention-actions\s*{[\s\S]*height:\s*41px[\s\S]*left:\s*20px[\s\S]*top:\s*112px[\s\S]*width:\s*310px/.test(css) &&
      /\.retention-actions \.primary-button\s*{[\s\S]*left:\s*118px[\s\S]*width:\s*192px/.test(css),
  ],
  [
    "review copy remains Figma sized and clamps to three lines",
    /\.review-copy p\s*{[\s\S]*-webkit-line-clamp:\s*3/.test(css),
  ],
  [
    "product review stars use the provided 14px SVG",
    js.includes("./assets/figma/icon-review-star.svg") &&
      existsSync(resolve("assets/figma/icon-review-star.svg")) &&
      readFileSync(resolve("assets/figma/icon-review-star.svg"), "utf8").includes("M13.6471 6.40723") &&
      /function renderRatingStars/.test(js) &&
      !/★★★★★/.test(js) &&
      /\.rating-stars img\s*{[\s\S]*height:\s*14px[\s\S]*width:\s*14px/.test(css),
  ],
  ["phone viewport scrolls coded screens", /\.app-viewport\s*{[\s\S]*overflow-y:\s*auto/i.test(css)],
  [
    "simulated phone status bar is removed from every page",
    !getFunctionSource("header").includes("statusBar()") &&
      /\.status-bar\s*{[\s\S]*display:\s*none/.test(css) &&
      /\.header\s*{[\s\S]*top:\s*0/.test(css) &&
      /#appRoot \.header ~ \*\s*{[\s\S]*transform:\s*translateY\(-50px\)/.test(css) &&
      /#appRoot > \.screen\s*{[\s\S]*margin-bottom:\s*-50px/.test(css) &&
      /\.overlay\s*{[\s\S]*height:\s*var\(--app-height\)[\s\S]*top:\s*0/.test(css) &&
      /\.category-drawer,\s*\n\.filter-drawer\s*{[\s\S]*height:\s*var\(--app-height\)[\s\S]*top:\s*0/.test(css) &&
      /\.search-fixed-head\s*{[\s\S]*height:\s*104px/.test(css) &&
      /\.search-layer\s*{[\s\S]*top:\s*104px/.test(css),
  ],
  [
    "level 1 category drawer matches side drawer artboard 288:1850",
    /\.category-drawer/.test(css) &&
      /const drawerGridItems = \[/.test(js) &&
      ["Para quem", "Ocasiões", "Produtos", "Coleções", "Destaques", "Ache seu presente"].every((label) => js.includes(label)) &&
      existsSync(resolve("assets/figma/drawer-side-banner.webp")) &&
      ["para-quem", "ocasioes", "produtos", "colecoes", "destaques", "gift"].every((base) => existsSync(resolve("assets/figma", `drawer-card-${base}.webp`))) &&
      /drawerCloseFigma:\s*"\.\/assets\/figma\/icon-drawer-close-figma\.svg"/.test(js) &&
      /drawerServiceFigma:\s*"\.\/assets\/figma\/icon-drawer-service-figma\.svg"/.test(js) &&
      /drawerTrackOrderFigma:\s*"\.\/assets\/figma\/icon-drawer-track-order-figma\.svg"/.test(js) &&
      /drawerWishlistFigma:\s*"\.\/assets\/figma\/icon-drawer-wishlist-figma\.svg"/.test(js) &&
      /function renderFirstLevelDrawerItem/.test(js) &&
      /class="category-drawer drawer-first-level"/.test(js) &&
      /class="drawer-promo-banner"/.test(js) &&
      /class="drawer-first-list"/.test(js) &&
      /class="drawer-nav-item"/.test(js) &&
      /className:\s*"drawer-thumb"/.test(js) &&
      /class="drawer-service"/.test(js) &&
      /data-action="navigate" data-target="\$\{item\.target\}"/.test(js) &&
      /\.drawer-first-level\s*{[\s\S]*border-radius:\s*0[\s\S]*width:\s*390px/.test(css) &&
      /body\[data-current-screen="categoryDrawer"\] \.overlay,\s*\nbody\[data-current-screen="categoryLevel2"\] \.overlay,\s*\nbody\[data-current-screen="categoryFlatList"\] \.overlay\s*{[\s\S]*height:\s*var\(--app-height\)[\s\S]*top:\s*0/.test(css) &&
      !/drawer-status-layer/.test(js) &&
      /\.drawer-promo-banner\s*{[\s\S]*height:\s*120px[\s\S]*left:\s*12px[\s\S]*top:\s*64px[\s\S]*width:\s*366px/.test(css) &&
      /\.drawer-first-level \.drawer-first-list\s*{[\s\S]*gap:\s*8px[\s\S]*grid-template-columns:\s*repeat\(2, 179px\)[\s\S]*top:\s*208px/.test(css) &&
      /\.drawer-first-level \.drawer-nav-item\s*{[\s\S]*background:\s*#f6f6f6[\s\S]*height:\s*64px[\s\S]*width:\s*179px/.test(css) &&
      /\.drawer-first-level \.drawer-thumb\s*{[\s\S]*height:\s*48px[\s\S]*width:\s*48px/.test(css) &&
      /\.drawer-first-level \.drawer-service\s*{[\s\S]*top:\s*476px/.test(css) &&
      /\.drawer-first-level \.drawer-track-order\s*{[\s\S]*top:\s*524px/.test(css) &&
      /\.drawer-first-level \.drawer-wishlist-link\s*{[\s\S]*top:\s*572px/.test(css) &&
      /label:\s*"Ocasiões"[\s\S]*target:\s*"categoryFlatList"/.test(js) &&
      /label:\s*"Ache seu presente"[\s\S]*target:\s*"giftStep1"/.test(js),
  ],
  [
    "product collection and featured drawer entries open level 2 accordions",
    /label:\s*"Produtos"[\s\S]*target:\s*"categoryLevel2"[\s\S]*categoryKey:\s*"produtos"/.test(js) &&
      /label:\s*"Coleções"[\s\S]*target:\s*"categoryLevel2"[\s\S]*categoryKey:\s*"colecoes"/.test(js) &&
      /label:\s*"Destaques"[\s\S]*target:\s*"categoryLevel2"[\s\S]*categoryKey:\s*"destaques"/.test(js) &&
      /const secondLevelDrawerCatalog = {[\s\S]*produtos:\s*{[\s\S]*title:\s*"Produtos"[\s\S]*colecoes:\s*{[\s\S]*title:\s*"Coleções"[\s\S]*destaques:\s*{[\s\S]*title:\s*"Destaques"/.test(js) &&
      /function getActiveSecondLevelCategory\(\)/.test(js) &&
      /function renderCategoryLevel2\(\)[\s\S]*const category = getActiveSecondLevelCategory\(\)[\s\S]*category\.title[\s\S]*category\.groups\.map/.test(js) &&
      /data-category-key="\$\{item\.categoryKey \|\| ""\}"/.test(js) &&
      /actionElement\.dataset\.categoryKey[\s\S]*state\.activeLevel2Category = actionElement\.dataset\.categoryKey/.test(js),
  ],
  [
    "category drawer close exits the full drawer stack",
    /const drawerScreens = new Set\(\["categoryDrawer", "categoryLevel2", "categoryFlatList", "filterDrawer"\]\)/.test(js) &&
      /aria-label="Fechar" data-action="close-drawer"/.test(js) &&
      /function closeDrawer\(\)[\s\S]*findLastIndex\(\(screenId\) => !drawerScreens\.has\(screenId\)\)[\s\S]*state\.currentScreenId = returnScreen/.test(js) &&
      /action === "close-drawer"[\s\S]*closeDrawer\(\)/.test(js),
  ],
  [
    "drawer header close button is Figma 24px",
    /flex:\s*0 0 24px/.test(getCssRule(".drawer-header .icon-button")) &&
      /height:\s*24px/.test(getCssRule(".drawer-header .icon-button")) &&
      /width:\s*24px/.test(getCssRule(".drawer-header .icon-button")) &&
      /height:\s*24px/.test(getCssRule(".category-drawer .drawer-header .icon-button .svg-icon")) &&
      /width:\s*24px/.test(getCssRule(".category-drawer .drawer-header .icon-button .svg-icon")),
  ],
  [
    "category -3 drawer uses direct flat third-level list style",
    /categoryFlatList:\s*{[\s\S]*render:\s*renderCategoryFlatList/.test(js) &&
      js.includes('title: "Ocasiões"') &&
      js.includes('links: ["Aniversário", "Agradecimento", "Só porque sim", "Dia dos Namorados", "Natal", "Casamento", "Formatura", "Amigo secreto"]') &&
      /function renderCategoryFlatList/.test(js) &&
      /class="drawer-flat-list"/.test(js) &&
      /class="drawer-flat-link"/.test(js) &&
      /class="drawer-flat-link view-all"/.test(js) &&
      /data-action="navigate" data-target="listPage"/.test(js) &&
      /\.drawer-flat-list\s*{[\s\S]*gap:\s*28px[\s\S]*left:\s*12px[\s\S]*top:\s*76px/.test(css) &&
      /\.drawer-flat-link\s*{[\s\S]*font-size:\s*14px[\s\S]*line-height:\s*17px/.test(css) &&
      /\.drawer-flat-link\.view-all\s*{[\s\S]*font-weight:\s*700/.test(css) &&
      !getFunctionSource("renderCategoryFlatList").includes("drawer-level2-row"),
  ],
  [
    "all interactions use restrained basic motion",
    /@keyframes fadeIn/.test(css) &&
      /@keyframes drawerSlideIn/.test(css) &&
      /@keyframes drawerSlideInRight/.test(css) &&
      /@keyframes modalSlideIn/.test(css) &&
      /@keyframes modalSlideOut/.test(css) &&
      /transform:\s*translateX\(-8px\)/.test(css) &&
      /transform:\s*translateX\(8px\)/.test(css) &&
      /transform:\s*translateY\(16px\)/.test(css) &&
      !/opacity:/.test(getCssAtRule("drawerSlideIn")) &&
      !/opacity:/.test(getCssAtRule("drawerSlideInRight")) &&
      !/opacity:/.test(getCssAtRule("modalSlideIn")) &&
      !/opacity:/.test(getCssAtRule("modalSlideOut")) &&
      /\.overlay\s*{[\s\S]*animation:\s*fadeIn 160ms ease-out/.test(css) &&
      /\.category-drawer\s*{[\s\S]*animation:\s*drawerSlideIn 160ms ease-out/.test(css) &&
      /\.filter-drawer\s*{[\s\S]*animation:\s*drawerSlideInRight 160ms ease-out/.test(css) &&
      /\.gift-modal\s*{[\s\S]*animation:\s*modalSlideIn 180ms ease-out/.test(css) &&
      /\.gift-modal\.is-leaving\s*{[\s\S]*animation:\s*modalSlideOut 160ms ease-in forwards/.test(css) &&
      /\.retention-card\s*{[\s\S]*animation:\s*modalSlideIn 180ms ease-out/.test(css) &&
      /\.retention-card\.is-leaving\s*{[\s\S]*animation:\s*modalSlideOut 160ms ease-in forwards/.test(css) &&
      /function closeGiftModal\(target\)[\s\S]*classList\.add\("is-leaving"\)[\s\S]*setTimeout/.test(js) &&
      /data-action="close-gift"/.test(js) &&
      !/animation:/.test(getCssRule(".drawer-level2-children")) &&
      !/transform:/.test(getCssRule(".drawer-level2-children")) &&
      /\.drawer-nav-item,\s*\n\.drawer-level2-row,\s*\n\.drawer-flat-link/.test(css) &&
      /\.primary-button,\s*\n\.secondary-button\s*{[\s\S]*transition:\s*background-color 160ms ease/.test(css) &&
      !/\.product-card:hover\s*{[^}]*transform/.test(css) &&
      !/\.drawer-nav-item:hover,\s*\n\.drawer-level2-row:hover\s*{[^}]*transform/.test(css) &&
      !/\.primary-button:hover,\s*\n\.secondary-button:hover\s*{[^}]*transform/.test(css) &&
      !/\.choice-button:hover\s*{[^}]*transform/.test(css) &&
      !/\.suggestion-item:hover\s*{[^}]*transform/.test(css) &&
      /@media \(prefers-reduced-motion: reduce\)/.test(css),
  ],
  [
    "accordion toggles do not replay drawer entrance animation",
    /document\.body\.dataset\.renderMotion = options\.preserveScroll \? "static" : "enter"/.test(js) &&
      /function toggleLevel2Group\(title\)[\s\S]*render\(\{ preserveScroll: true \}\)/.test(js) &&
      /body\[data-render-motion="static"\] \.overlay,\s*\nbody\[data-render-motion="static"\] \.category-drawer,\s*\nbody\[data-render-motion="static"\] \.filter-drawer,\s*\nbody\[data-render-motion="static"\] \.search-layer\s*{[\s\S]*animation:\s*none/.test(css),
  ],
  [
    "search suggestions update without replaying the search drawer animation",
    /function pressKey\(key\)[\s\S]*state\.currentScreenId = state\.searchQuery \? "searchSuggest" : "searchTrending"[\s\S]*render\(\{ focusSearch: true, preserveScroll: true \}\)/.test(js) &&
      /function handleInput\(value\)[\s\S]*state\.currentScreenId = state\.searchQuery\.trim\(\) \? "searchSuggest" : "searchTrending"[\s\S]*render\(\{ focusSearch: true, preserveScroll: true \}\)/.test(js) &&
      /body\[data-render-motion="static"\] \.search-layer\s*{[\s\S]*animation:\s*none/.test(css),
  ],
  [
    "category level 2 drawer items expand by default and can collapse",
    /drawerLevel2OpenGroups:\s*\["Pet", "Família", "Amor e amizade"\]/.test(js) &&
      /const secondLevelDrawerItems = \[[\s\S]*title:\s*"Pet"[\s\S]*links:\s*\["Mãe de Pet", "Pai de Pet", "Amantes de Cachorros", "Amantes de Gatos"\][\s\S]*title:\s*"Família"[\s\S]*title:\s*"Amor e amizade"/.test(js) &&
      /function isLevel2GroupOpen\(title\)/.test(js) &&
      /function toggleLevel2Group\(title\)/.test(js) &&
      /function renderSecondLevelDrawerItem/.test(js) &&
      /data-action="toggle-level2-group"/.test(js) &&
      /aria-expanded="\$\{isOpen\}"/.test(js) &&
      /class="drawer-level2-list"/.test(js) &&
      /class="drawer-level2-row \$\{isOpen \? "is-open" : ""\}"/.test(js) &&
      /class="drawer-level2-children"/.test(js) &&
      /data-action="navigate" data-target="listPage"/.test(js) &&
      /action === "toggle-level2-group"[\s\S]*toggleLevel2Group/.test(js) &&
      /\.drawer-level2-list\s*{[\s\S]*gap:\s*12px[\s\S]*top:\s*72px/.test(css) &&
      /\.drawer-level2-row\s*{[\s\S]*background:\s*#f6f6f6[\s\S]*height:\s*52px/.test(css) &&
      /\.drawer-level2-row\.is-open\s*{[\s\S]*background:\s*var\(--soft-blue\)/.test(css) &&
      /\.drawer-level2-row\.is-open \.svg-icon\s*{[\s\S]*transform:\s*rotate\(-90deg\)/.test(css) &&
      /\.drawer-level2-group\.is-open\s*{[\s\S]*gap:\s*16px/.test(css) &&
      /\.drawer-level2-children\s*{[\s\S]*gap:\s*28px[\s\S]*padding:\s*0 12px 16px/.test(css) &&
      !/function renderCategoryLevel2[\s\S]*class="drawer-info-link"/.test(js),
  ],
  [
    "filter drawer matches coded Figma panel",
    /\.filter-drawer\s*{[\s\S]*border-radius:\s*8px 0 0 8px[\s\S]*right:\s*0[\s\S]*width:\s*350px/.test(css) &&
      /\.filter-drawer \.drawer-header\s*{[\s\S]*border-bottom:\s*1px solid #e5e7eb/.test(css) &&
      /\.filter-drawer \.drawer-header \.icon-button\s*{[\s\S]*height:\s*24px[\s\S]*padding:\s*0[\s\S]*width:\s*24px/.test(css) &&
      /\.filter-drawer \.drawer-header \.icon-button \.svg-icon\s*{[\s\S]*height:\s*24px[\s\S]*width:\s*24px/.test(css) &&
      /\.filter-content\s*{[\s\S]*bottom:\s*83px[\s\S]*left:\s*12px[\s\S]*overflow-x:\s*hidden[\s\S]*overflow-y:\s*auto[\s\S]*position:\s*absolute[\s\S]*top:\s*72px[\s\S]*width:\s*326px/.test(css) &&
      /\.filter-group\.is-open:not\(:last-child\)\s*{[\s\S]*margin-bottom:\s*28px/.test(css) &&
      /\.filter-group:not\(\.is-open\):not\(:last-child\)\s*{[\s\S]*margin-bottom:\s*12px/.test(css) &&
      /body\[data-current-screen="filterDrawer"\] \.app-viewport\s*{[\s\S]*overflow-y:\s*hidden/.test(css) &&
      /\.filter-group-head\s*{[\s\S]*background:\s*#f6f6f6[\s\S]*font-size:\s*16px[\s\S]*font-weight:\s*700[\s\S]*height:\s*52px/.test(css) &&
      /\.filter-group-head\.is-open\s*{[\s\S]*background:\s*var\(--soft-blue\)/.test(css) &&
      /\.filter-group-head\.is-open \.svg-icon\s*{[\s\S]*transform:\s*rotate\(-90deg\)/.test(css) &&
      /\.filter-group-head:not\(\.is-open\) \.svg-icon\s*{[\s\S]*transform:\s*rotate\(90deg\)/.test(css) &&
      /\.filter-footer\s*{[\s\S]*grid-template-columns:\s*118px 200px[\s\S]*height:\s*83px[\s\S]*left:\s*0[\s\S]*padding:\s*16px 12px/.test(css) &&
      /\.filter-footer \.primary-button\s*{[\s\S]*height:\s*51px[\s\S]*width:\s*200px/.test(css) &&
      /\.filter-footer \.secondary-button\s*{[\s\S]*background:\s*transparent[\s\S]*border:\s*1px solid var\(--navy\)[\s\S]*font-size:\s*14px[\s\S]*height:\s*51px[\s\S]*white-space:\s*nowrap[\s\S]*width:\s*118px/.test(css) &&
      />Ver presentes<\/button>/.test(js) &&
      !/Ver 8 presentes/.test(js) &&
      /function filterGroup\(title, chips, selectedIndex, isOpen = true\)/.test(js) &&
      /icon\("drawerChevron"\)/.test(js) &&
      /icon\("chipClose"\)/.test(js),
  ],
  [
    "filter drawer chips are selectable and applied count is dynamic",
    /filterSelections:\s*{[\s\S]*"Para quem":\s*\["Pai\/Avô"\][\s\S]*"Ocasião":\s*\[\]/.test(js) &&
      /filterOpenGroups:\s*\["Para quem",\s*"Ocasião"\]/.test(js) &&
      /function getDraftFilterCount\(\)/.test(js) &&
      /function isFilterSelected\(group, label\)/.test(js) &&
      /function toggleFilterChip\(group, label\)/.test(js) &&
      /function applyFilters\(\)[\s\S]*const filterCount = getDraftFilterCount\(\)[\s\S]*state\.filterCount = filterCount[\s\S]*navigateTo\(filterCount \? "listPageFiltered" : "listPage"\)/.test(js) &&
      /function clearFilters\(\)/.test(js) &&
      /data-action="toggle-filter-chip"/.test(js) &&
      /data-action="toggle-filter-group"/.test(js) &&
      /data-action="apply-filter"/.test(js) &&
      /action === "toggle-filter-chip"[\s\S]*toggleFilterChip/.test(js),
  ],
  [
    "filter drawer options use Figma checkbox selected states",
    /checkboxCheck:\s*"\.\/assets\/figma\/icon-checkbox-check\.svg"/.test(js) &&
      existsSync(resolve("assets/figma/icon-checkbox-check.svg")) &&
      /function renderFilterPill\(group, label, \{ className = "filter-chip" \} = \{\}\)[\s\S]*className === "filter-chip"[\s\S]*class="filter-option \$\{selected \? "is-selected" : ""\}"[\s\S]*class="filter-checkbox"[\s\S]*icon\("checkboxCheck"\)/.test(js) &&
      /\.filter-chip-row\s*{[\s\S]*flex-direction:\s*column[\s\S]*gap:\s*24px[\s\S]*padding:\s*0 12px/.test(css) &&
      /\.filter-option\s*{[\s\S]*background:\s*transparent[\s\S]*gap:\s*8px[\s\S]*height:\s*18px/.test(css) &&
      /\.filter-checkbox\s*{[\s\S]*border:\s*1\.125px solid var\(--navy\)[\s\S]*border-radius:\s*4\.5px[\s\S]*height:\s*18px[\s\S]*width:\s*18px/.test(css) &&
      /\.filter-option\.is-selected \.filter-checkbox\s*{[\s\S]*background:\s*var\(--navy\)[\s\S]*border-color:\s*var\(--navy\)/.test(css) &&
      /\.filter-checkbox \.svg-icon\s*{[\s\S]*height:\s*8px[\s\S]*width:\s*11px/.test(css) &&
      !/\.filter-chip\.is-selected\s*{[\s\S]*background:\s*var\(--navy\)/.test(css),
  ],
  ["gift finder uses coded modal steps", /\.gift-modal/.test(css) && /renderGiftFinder/.test(js)],
  [
    "search relies on the native mobile keyboard instead of a coded mock keyboard",
    !/\.phone-keyboard/.test(css) &&
      !/function renderKeyboard/.test(js) &&
      !/renderKeyboard\(\)/.test(js) &&
      !/class="phone-keyboard"/.test(js),
  ],
  [
    "search input focus does not let mobile browsers scroll the demo shell",
    /function focusSearchInputWithoutScroll\(\)/.test(js) &&
      /input\.focus\(\{ preventScroll:\s*true \}\)/.test(js) &&
      /function lockSearchScrollPosition\(\)/.test(js) &&
      /window\.scrollTo\(\{ left:\s*0,\s*top:\s*0/.test(js) &&
      /appViewport\.scrollTop = 0/.test(js) &&
      /body\[data-current-screen="searchTrending"\],\s*\nbody\[data-current-screen="searchSuggest"\]\s*{[\s\S]*overflow:\s*hidden/.test(css),
  ],
  [
    "default search field uses the Figma white background",
    /background:\s*#ffffff/.test(getCssRule(".search")) &&
      /background:\s*transparent/.test(getCssRule(".search input")) &&
      /background:\s*transparent/.test(getCssRule(".search button")) &&
      /appearance:\s*none/.test(getCssRule(".search button")) &&
      /border:\s*0/.test(getCssRule(".search button")) &&
      /padding:\s*0/.test(getCssRule(".search button")) &&
      /width:\s*56px/.test(getCssRule(".search button")) &&
      /\.search\.is-active:not\(\.result-query-search\) button\[type="submit"\]\s*{[\s\S]*background:\s*var\(--red\)/.test(css),
  ],
  [
    "focused search field uses white input background",
    /background:\s*#ffffff/.test(getCssRule(".search.is-active")) &&
      /background:\s*#ffffff/.test(getCssRule(".search.is-active input")) &&
      /background:\s*var\(--red\)/.test(getCssRule('.search.is-active:not(.result-query-search) button[type="submit"]')),
  ],
  [
    "WhatsApp floating logo is fixed at the lower right without behavior",
    existsSync(resolve("assets/figma/whatsapp-logo.svg")) &&
      /class="whatsapp-float"/.test(html) &&
      /src="\.\/assets\/figma\/whatsapp-logo\.svg"/.test(html) &&
      /aria-hidden="true"/.test(html) &&
      /<circle cx="30" cy="31" r="19" fill="white"\/>/.test(whatsappLogoSvg) &&
      !/whatsapp-float"[^>]*href=/.test(html) &&
      /\.whatsapp-float\s*{[\s\S]*bottom:\s*20px[\s\S]*height:\s*50px[\s\S]*pointer-events:\s*none[\s\S]*right:\s*16px[\s\S]*width:\s*50px/.test(css) &&
      /\.whatsapp-float img\s*{[\s\S]*height:\s*50px[\s\S]*width:\s*50px/.test(css),
  ],
  [
    "drawers hide the WhatsApp floating logo",
    /body\[data-current-screen="categoryDrawer"\] \.whatsapp-float,\s*\nbody\[data-current-screen="categoryLevel2"\] \.whatsapp-float,\s*\nbody\[data-current-screen="categoryFlatList"\] \.whatsapp-float,\s*\nbody\[data-current-screen="filterDrawer"\] \.whatsapp-float,\s*\nbody\[data-current-screen="searchTrending"\] \.whatsapp-float,\s*\nbody\[data-current-screen="searchSuggest"\] \.whatsapp-float\s*{[\s\S]*display:\s*none/.test(css),
  ],
  [
    "raster images are served as WebP with mobile loading hints",
    webpBudget.every(([name, maxKb]) => webpAssetIsWithinBudget(name, maxKb)) &&
      /function rasterImageSrc\(name\)/.test(js) &&
      /function imageTag\(name,/.test(js) &&
      js.includes('name.replace(/\\.(png|jpe?g)$/i, ".webp")') &&
      /rel="preload" as="image" href="\.\/assets\/figma\/banner_pic\.webp" fetchpriority="high"/.test(html) &&
      /loading="\$\{loading\}"/.test(js) &&
      /decoding="async"/.test(js) &&
      !/<img[^>]+src="\.\/assets\/figma\/[^"]+\.png/.test(js),
  ],
  ["static index raster image paths use WebP", !/<img[^>]+src="\.\/assets\/figma\/[^"]+\.png/.test(indexHtml)],
  ["search overlay starts below the search bar", /class="overlay search-overlay"/.test(js) && /\.search-overlay\s*{[\s\S]*inset:\s*104px 0 0/i.test(css)],
  ["search supports fuzzy suggestions", /searchQuery/.test(js) && /filteredSuggestions/.test(js)],
  [
    "all key prototype transitions are mapped",
    requiredTransitions.every(([, from, to]) => {
      return getScreenSource(from).includes(`target: "${to}"`);
    }),
  ],
  ["back navigation action exists", js.includes('action: "back"')],
  ["home navigation action exists", js.includes('action: "home"')],
  ["demo does not depend on temporary Figma URLs", !/figma\.com\/api\/mcp\/asset/.test(js + html + css)],
];

const failures = checks.filter(([, passed]) => !passed);

if (failures.length) {
  for (const [name] of failures) {
    console.error(`FAIL: ${name}`);
  }
  process.exit(1);
}

console.log(`PASS: ${checks.length} interactive demo checks`);
