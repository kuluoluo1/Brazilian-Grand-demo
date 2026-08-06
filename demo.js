const state = {
  currentScreenId: "home",
  history: [],
  searchQuery: "",
  lastGiftStep: "giftStep1",
  giftSelections: {
    recipient: "Mãe",
    occasion: "Aniversário",
    budget: "",
  },
  filterCount: 1,
  sortLabel: "Relevância",
  sortOpen: false,
  activeLevel2Category: "paraQuem",
  homeFilterSelected: ["Pai/Avô"],
  drawerLevel2OpenGroups: ["Pet", "Família", "Amor e amizade"],
  filterSelections: {
    "Para quem": ["Pai/Avô"],
    "Ocasião": [],
    Produto: [],
    Personalização: [],
    Preço: [],
  },
  filterOpenGroups: ["Para quem", "Ocasião"],
  paginationPage: 1,
  cartCount: 0,
  pdpMediaIndex: 0,
  pdpWishlist: false,
  pdpSelectedStyle: "Retrato pop",
  cepValue: "",
  cepStatus: "default",
};

const products = [
  { tag: "Nome + foto", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-01.webp" },
  { tag: "Photo + phrase", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-02.webp", review: true },
  { tag: "Photo + text", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-03.webp" },
  { tag: "Name + portrait", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-04.webp" },
  { tag: "Pet portrait", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-05.webp" },
  { tag: "Photo + quote", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-06.webp" },
  { tag: "Name + date", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-07.webp" },
  { tag: "Couple photo", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-08.webp" },
  { tag: "Dog lover", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-09.webp" },
  { tag: "Cat lover", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "home-product-10.webp" },
];

const pdpMediaImages = [
  "pdp-product-media.webp",
  "home-product-02.webp",
  "home-product-03.webp",
  "home-product-04.webp",
  "home-product-05.webp",
  "home-product-06.webp",
  "home-product-07.webp",
  "home-product-08.webp",
  "home-product-09.webp",
];

const pdpStyleOptions = [
  { label: "Retrato pop", image: "pdp-personalization-style-01.webp" },
  { label: "Aquarela", image: "pdp-related-02.webp" },
  { label: "Minimalista", image: "pdp-related-03.webp" },
];

const pdpRelatedProducts = [
  { tag: "Nome + foto", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-01.webp" },
  { tag: "Photo + phrase", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-02.webp", review: true },
  { tag: "Photo + text", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-03.webp" },
  { tag: "Name + portrait", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-04.webp" },
  { tag: "Nome + foto", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-05.webp" },
  { tag: "Photo + quote", name: "Caneca personalizada Retrato Pet Caneca personalizada Retrato Pet", price: "R$ 59,90", image: "pdp-related-06.webp" },
];

const homeFilterProductCatalog = {
  "Pai/Avô": products,
  "Mãe/Avó": [
    { tag: "Name + portrait", name: "Caneca personalizada para Mãe e Avó Caneca personalizada", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Photo + quote", name: "Lembrança personalizada para Avó Caneca personalizada", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Photo + phrase", name: "Caneca personalizada com frase para Mãe", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Nome + foto", name: "Presente personalizado para Mãe com foto", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + text", name: "Quadro de lembranças para Avó personalizado", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Name + date", name: "Presente com data especial para Mãe", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Couple photo", name: "Caneca família personalizada para Avós", price: "R$ 59,90", image: "home-product-08.webp" },
    { tag: "Pet portrait", name: "Retrato pet para mãe de pet personalizada", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Cat lover", name: "Presente carinhoso para mãe de gato", price: "R$ 59,90", image: "home-product-10.webp" },
    { tag: "Dog lover", name: "Presente carinhoso para mãe de cachorro", price: "R$ 59,90", image: "home-product-09.webp" },
  ],
  "Família": [
    { tag: "Photo + text", name: "Presente personalizado para toda família", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Couple photo", name: "Caneca personalizada com foto da família", price: "R$ 59,90", image: "home-product-08.webp" },
    { tag: "Name + date", name: "Lembrança personalizada de data especial", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Nome + foto", name: "Caneca com foto para família", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + quote", name: "Quadro personalizado com mensagem familiar", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Photo + phrase", name: "Caneca personalizada com frase de família", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Name + portrait", name: "Retrato familiar personalizado para presente", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Pet portrait", name: "Presente família e pet personalizado", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Dog lover", name: "Presente para família que ama cachorro", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Presente para família que ama gato", price: "R$ 59,90", image: "home-product-10.webp" },
  ],
  Casal: [
    { tag: "Couple photo", name: "Caneca personalizada para casal com foto", price: "R$ 59,90", image: "home-product-08.webp" },
    { tag: "Photo + quote", name: "Presente personalizado romântico para casal", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Name + date", name: "Lembrança de data especial para casal", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Photo + phrase", name: "Caneca com frase para casal", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Nome + foto", name: "Caneca personalizada com foto do casal", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + text", name: "Presente com texto personalizado para casal", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Name + portrait", name: "Retrato personalizado para casal", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Pet portrait", name: "Presente casal com pet personalizado", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Dog lover", name: "Presente para casal que ama cachorro", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Presente para casal que ama gato", price: "R$ 59,90", image: "home-product-10.webp" },
  ],
  Você: [
    { tag: "Photo + quote", name: "Presente personalizado para guardar lembranças", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Pet portrait", name: "Retrato pet personalizado para você", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Nome + foto", name: "Caneca personalizada com sua foto", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + phrase", name: "Caneca personalizada com sua frase", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Photo + text", name: "Presente personalizado com seu texto", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Name + portrait", name: "Retrato personalizado do seu jeito", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Name + date", name: "Lembrança personalizada com sua data", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Dog lover", name: "Presente para quem ama cachorros", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Presente para quem ama gatos", price: "R$ 59,90", image: "home-product-10.webp" },
    { tag: "Couple photo", name: "Caneca personalizada para momentos especiais", price: "R$ 59,90", image: "home-product-08.webp" },
  ],
  "Amantes de Pets": [
    { tag: "Pet portrait", name: "Retrato personalizado para amantes de pets", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Dog lover", name: "Caneca personalizada para amantes de cães", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Caneca personalizada para amantes de gatos", price: "R$ 59,90", image: "home-product-10.webp" },
    { tag: "Nome + foto", name: "Caneca personalizada com foto do pet", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + phrase", name: "Caneca pet com frase personalizada", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Photo + text", name: "Presente pet com texto personalizado", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Name + portrait", name: "Retrato pet com nome personalizado", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Photo + quote", name: "Lembrança personalizada para pet", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Name + date", name: "Presente pet com data especial", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Couple photo", name: "Presente para casal e pet", price: "R$ 59,90", image: "home-product-08.webp" },
  ],
  "Melhores Amigos": [
    { tag: "Photo + text", name: "Presente personalizado para melhor amigo", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Photo + phrase", name: "Caneca com frase para amizade", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Couple photo", name: "Lembrança personalizada para amigos", price: "R$ 59,90", image: "home-product-08.webp" },
    { tag: "Nome + foto", name: "Caneca com foto para melhor amigo", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Name + portrait", name: "Retrato personalizado para amigos", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Photo + quote", name: "Quadro personalizado de amizade", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Name + date", name: "Presente de amizade com data", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Dog lover", name: "Presente para amigo que ama cachorro", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Presente para amigo que ama gato", price: "R$ 59,90", image: "home-product-10.webp" },
    { tag: "Pet portrait", name: "Presente pet para amigo especial", price: "R$ 59,90", image: "home-product-05.webp" },
  ],
  "Crianças/Bebês": [
    { tag: "Name + date", name: "Presente personalizado para crianças e bebês", price: "R$ 59,90", image: "home-product-07.webp" },
    { tag: "Nome + foto", name: "Caneca com foto para criança", price: "R$ 59,90", image: "home-product-01.webp" },
    { tag: "Photo + text", name: "Lembrança personalizada para bebê", price: "R$ 59,90", image: "home-product-03.webp" },
    { tag: "Photo + phrase", name: "Presente infantil com frase personalizada", price: "R$ 59,90", image: "home-product-02.webp" },
    { tag: "Name + portrait", name: "Retrato personalizado para criança", price: "R$ 59,90", image: "home-product-04.webp" },
    { tag: "Pet portrait", name: "Presente fofo com pet para criança", price: "R$ 59,90", image: "home-product-05.webp" },
    { tag: "Photo + quote", name: "Quadro infantil personalizado", price: "R$ 59,90", image: "home-product-06.webp" },
    { tag: "Couple photo", name: "Lembrança personalizada da família", price: "R$ 59,90", image: "home-product-08.webp" },
    { tag: "Dog lover", name: "Presente infantil com cachorro", price: "R$ 59,90", image: "home-product-09.webp" },
    { tag: "Cat lover", name: "Presente infantil com gato", price: "R$ 59,90", image: "home-product-10.webp" },
  ],
};

const recipients = [
  ["Dia das Crianças", "recipient-kids.webp", "r1"],
  ["Amantes de Cachorros", "recipient-dog-lovers.webp", "r2"],
  ["Amantes de Gatos", "recipient-cat-lovers.webp", "r3"],
  ["Pai de Cachorro", "recipient-dog-dad.webp", "r4"],
  ["Mãe de Cachorro", "recipient-dog-mom.webp", "r5"],
  ["Casais com Pets", "recipient-pet-couples.webp", "r6"],
];

const trendingTerms = [
  "Mãe de pet",
  "Amantes de cães",
  "Amantes de gatos",
  "Mãe",
  "Pai",
  "Avós",
];

const suggestionTerms = [
  "Mãe de pet",
  "Caneca mãe de pet",
  "Camiseta mãe de pet",
  "Presente para mãe",
  "Presente para pai de pet",
  "Amantes de gatos",
];

const searchRecommendationCatalog = [
  "caneca",
  "canecas personalizadas",
  "canecas para mulheres",
  "canecas para homens",
  "caneca com animal de estimação",
  "caneca com casal",
  "mãe de pet",
  "caneca mãe de pet",
  "camiseta mãe de pet",
  "presente para mãe",
  "presente para pai de pet",
  "amantes de gatos",
];

const firstLevelDrawerItems = [
  { label: "Para quem-2", image: "drawer-nav-01.webp", target: "categoryLevel2", categoryKey: "paraQuem" },
  { label: "Ocasiões-3", image: "drawer-nav-02.webp", target: "categoryFlatList" },
  { label: "Produtos", image: "drawer-nav-03.webp", target: "categoryLevel2", categoryKey: "produtos" },
  { label: "Coleções", image: "drawer-nav-04.webp", target: "categoryLevel2", categoryKey: "colecoes" },
  { label: "Destaques", image: "drawer-nav-05.webp", target: "categoryLevel2", categoryKey: "destaques" },
  { label: "Buscador de presentes", image: "drawer-nav-06.webp", target: "giftStep1" },
];

const flatDrawerCategories = [
  {
    title: "Ocasiões",
    links: ["Aniversário", "Agradecimento", "Só porque sim", "Dia dos Namorados", "Natal", "Casamento", "Formatura", "Amigo secreto"],
  },
];

const secondLevelDrawerItems = [
  { title: "Pet", links: ["Mãe de Pet", "Pai de Pet", "Amantes de Cachorros", "Amantes de Gatos"] },
  { title: "Família", links: ["Mãe", "Pai", "Avós", "Filhos"] },
  { title: "Amor e amizade", links: ["Casal", "Amigos", "Namorados", "Melhores amigos"] },
];

const secondLevelDrawerCatalog = {
  paraQuem: {
    title: "Para quem",
    groups: secondLevelDrawerItems,
  },
  produtos: {
    title: "Produtos",
    groups: [
      { title: "Canecas", links: ["Caneca com foto", "Caneca com nome", "Caneca pet", "Caneca casal"] },
      { title: "Camisetas", links: ["Camiseta com foto", "Camiseta pet", "Camiseta família", "Camiseta casal"] },
      { title: "Quadros e decoração", links: ["Quadros personalizados", "Almofadas", "Porta-retratos", "Azulejos"] },
    ],
  },
  colecoes: {
    title: "Coleções",
    groups: [
      { title: "Datas especiais", links: ["Dia dos Namorados", "Aniversário", "Natal", "Dia dos Pais"] },
      { title: "Histórias com pets", links: ["Amantes de cães", "Amantes de gatos", "Mãe de pet", "Pai de pet"] },
      { title: "Família e amigos", links: ["Família", "Melhores amigos", "Casal", "Avós"] },
    ],
  },
  destaques: {
    title: "Destaques",
    groups: [
      { title: "Mais vendidos", links: ["Canecas favoritas", "Camisetas favoritas", "Presentes com foto", "Presentes para pets"] },
      { title: "Novidades", links: ["Lançamentos", "Personalização com frase", "Combos especiais", "Pronta entrega"] },
      { title: "Ofertas", links: ["Até R$ 50", "Kits presenteáveis", "Promoções da semana", "Últimas unidades"] },
    ],
  },
};

const filterOptions = [
  { title: "Para quem", chips: ["Pai/Avô", "Mãe/Avó", "Família", "Casal", "Amantes de Pets"] },
  { title: "Ocasião", chips: ["Aniversário", "Agradecimento", "Só porque sim"] },
  { title: "Produto", chips: ["Caneca", "Camiseta", "Quadro", "Capinha"] },
  { title: "Personalização", chips: ["Nome", "Foto", "Frase"] },
  { title: "Preço", chips: ["Até R$ 50", "R$ 50-R$ 100", "Acima de R$ 100"] },
];

const sortOptions = ["Relevância", "Menor preço", "Maior preço", "Novidades"];

const drawerScreens = new Set(["categoryDrawer", "categoryLevel2", "categoryFlatList", "filterDrawer"]);

const assetIcons = {
  menu: "./assets/figma/icon-menu.svg",
  bag: "./assets/figma/icon-bag.svg",
  search: "./assets/figma/icon-search.svg",
  searchNavy: "./assets/figma/icon-search-navy.svg",
  arrowRight: "./assets/figma/icon-chevron-right.svg",
  sortChevron: "./assets/figma/icon-sort-chevron.svg",
  drawerChevron: "./assets/figma/icon-drawer-chevron-down.svg",
  chipClose: "./assets/figma/icon-chip-close.svg",
  searchClose: "./assets/figma/icon-search-close.svg",
  checkboxCheck: "./assets/figma/icon-checkbox-check.svg",
  pix: "./assets/figma/icon-pix.svg",
  truck: "./assets/figma/icon-cep.svg",
  pin: "./assets/figma/icon-map.svg",
  whatsapp: "./assets/figma/icon-whatsapp.svg",
  close: "./assets/figma/icon-close.svg",
  filter: "./assets/figma/icon-filter.svg",
  account: "./assets/figma/icon-account.svg",
  drawerNavChevron: "./assets/figma/icon-drawer-nav-chevron.svg",
  drawerBack: "./assets/figma/icon-drawer-back.svg",
  drawerService: "./assets/figma/icon-drawer-service.svg",
  drawerServiceArrow: "./assets/figma/icon-drawer-service-arrow.svg",
  trackOrder: "./assets/figma/icon-track-order.svg",
  stars: "./assets/figma/icon-stars.svg",
};

function rasterImageSrc(name) {
  return `./assets/figma/${name.replace(/\.(png|jpe?g)$/i, ".webp")}`;
}

function imageTag(name, { className = "", alt = "", loading = "lazy", fetchpriority = "", width = "", height = "" } = {}) {
  const attrs = [
    `src="${rasterImageSrc(name)}"`,
    className ? `class="${className}"` : "",
    `alt="${escapeHtml(alt)}"`,
    `loading="${loading}"`,
    'decoding="async"',
    fetchpriority ? `fetchpriority="${fetchpriority}"` : "",
    width ? `width="${width}"` : "",
    height ? `height="${height}"` : "",
  ].filter(Boolean);

  return `<img ${attrs.join(" ")} />`;
}

const finderImages = [
  "gift-finder-1.webp",
  "gift-finder-3.webp",
  "gift-finder-5.webp",
  "gift-finder-2.webp",
  "gift-finder-4.webp",
];

const screens = {
  home: {
    title: "Home",
    transitions: [
      { action: "home", target: "home" },
      { action: "menu", target: "categoryDrawer" },
      { action: "banner", target: "giftStep1" },
      { action: "search", target: "searchTrending" },
      { action: "cart", target: "cartEmpty" },
    ],
    render: renderHome,
  },
  cartEmpty: {
    title: "Cart empty",
    transitions: [
      { action: "search", target: "searchTrending" },
      { action: "continue", target: "home" },
    ],
    render: renderCartEmpty,
  },
  trackOrder: {
    title: "Track order",
    transitions: [
      { action: "search", target: "searchTrending" },
      { action: "home", target: "home" },
    ],
    render: renderTrackOrder,
  },
  categoryDrawer: {
    title: "Category drawer",
    transitions: [
      { action: "navigate", target: "categoryLevel2" },
      { action: "navigate", target: "categoryFlatList" },
      { action: "navigate", target: "listPage" },
      { action: "navigate", target: "giftStep1" },
      { action: "navigate", target: "trackOrder" },
    ],
    render: renderCategoryDrawer,
  },
  categoryLevel2: {
    title: "Category level 2",
    transitions: [
      { action: "toggle-level2-group", target: "categoryLevel2" },
      { action: "choose-subcategory", target: "listPage" },
      { action: "back", target: "categoryDrawer" },
    ],
    render: renderCategoryLevel2,
  },
  categoryFlatList: {
    title: "Category flat third level",
    transitions: [
      { action: "choose-flat-category", target: "listPage" },
      { action: "back", target: "categoryDrawer" },
    ],
    render: renderCategoryFlatList,
  },
  listPage: {
    title: "List page",
    transitions: [
      { action: "category", target: "categoryDrawer" },
      { action: "filter", target: "filterDrawer" },
      { action: "search", target: "searchTrending" },
      { action: "product", target: "pdpPage" },
    ],
    render: renderListPage,
  },
  listPageFiltered: {
    title: "List page filtered",
    transitions: [
      { action: "category", target: "categoryDrawer" },
      { action: "filter", target: "filterDrawer" },
      { action: "search", target: "searchTrending" },
    ],
    render: () => renderListPage({ filtered: true }),
  },
  pdpPage: {
    title: "PDP",
    transitions: [
      { action: "search", target: "searchTrending" },
      { action: "cart", target: "cartEmpty" },
      { action: "category", target: "categoryDrawer" },
    ],
    render: renderPdpPage,
  },
  filterDrawer: {
    title: "Filter drawer",
    transitions: [
      { action: "apply", target: "listPageFiltered" },
      { action: "back", target: "listPage" },
    ],
    render: renderFilterDrawer,
  },
  giftStep1: {
    title: "Gift finder step 1",
    transitions: [
      { action: "recipient", target: "giftStep2" },
      { action: "back", target: "home" },
    ],
    render: () => renderGiftFinder(1),
  },
  giftStep2: {
    title: "Gift finder step 2",
    transitions: [
      { action: "occasion", target: "giftStep3" },
      { action: "close", target: "retentionModal" },
    ],
    render: () => renderGiftFinder(2),
  },
  giftStep3: {
    title: "Gift finder step 3",
    transitions: [
      { action: "close", target: "retentionModal" },
      { action: "results", target: "giftFinderResults" },
    ],
    render: () => renderGiftFinder(3),
  },
  giftFinderResults: {
    title: "Gift finder results",
    transitions: [
      { action: "menu", target: "categoryDrawer" },
      { action: "search", target: "searchTrending" },
    ],
    render: renderGiftFinderResults,
  },
  retentionModal: {
    title: "Gift finder retention",
    transitions: [
      { action: "continue", target: "giftStep3" },
      { action: "exit", target: "home" },
    ],
    render: renderRetentionModal,
  },
  searchTrending: {
    title: "Search trending",
    transitions: [
      { action: "input", target: "searchSuggest" },
      { action: "submit", target: "searchResultsHas" },
      { action: "back", target: "home" },
    ],
    render: () => renderSearch("trending"),
  },
  searchSuggest: {
    title: "Search suggest",
    transitions: [
      { action: "submit", target: "searchResultsHas" },
      { action: "clear", target: "searchTrending" },
    ],
    render: () => renderSearch("suggest"),
  },
  searchResultsHas: {
    title: "Search results",
    transitions: [
      { action: "filter", target: "filterDrawer" },
      { action: "search", target: "searchTrending" },
    ],
    render: renderSearchResults,
  },
  searchResultsEmpty: {
    title: "Search results empty",
    transitions: [
      { action: "filter", target: "filterDrawer" },
      { action: "search", target: "searchTrending" },
    ],
    render: renderSearchResultsEmpty,
  },
};

const appRoot = document.querySelector("#appRoot");
const appViewport = document.querySelector("#appViewport");
const horizontalScrollSelectors = [".category-pills"];

function captureHorizontalScrollPositions() {
  return horizontalScrollSelectors.map((selector) => {
    const element = appRoot.querySelector(selector);
    return { selector, scrollLeft: element ? element.scrollLeft : 0 };
  });
}

function restoreHorizontalScrollPositions(positions = []) {
  requestAnimationFrame(() => {
    positions.forEach(({ selector, scrollLeft }) => {
      const element = appRoot.querySelector(selector);
      if (element) {
        element.scrollLeft = scrollLeft;
      }
    });
  });
}

function fitFrame() {
  const viewport = window.visualViewport;
  const viewportWidth = viewport?.width || window.innerWidth || 390;
  const viewportHeight = viewport?.height || window.innerHeight || 844;
  const isPhoneViewport = viewportWidth <= 480;
  const outerPadding = isPhoneViewport ? 0 : 24;
  const availableWidth = Math.max(280, viewportWidth - outerPadding);
  const rawScale = availableWidth / 390;
  const scale = isPhoneViewport ? Math.min(1.14, rawScale) : Math.min(1, rawScale);
  const appScale = Math.max(0.72, scale);
  const appHeight = isPhoneViewport ? Math.max(844, Math.round(viewportHeight / appScale)) : 844;

  document.documentElement.style.setProperty("--app-scale", String(appScale));
  document.documentElement.style.setProperty("--app-height", `${appHeight}px`);
}

function icon(name) {
  if (assetIcons[name]) {
    return `<img class="svg-icon" src="${assetIcons[name]}" alt="" />`;
  }

  const icons = {
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    chevron: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    down: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    up: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>',
    trend: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17 10 11l4 4 6-8"/><path d="M15 7h5v5"/></svg>',
    filter: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    heart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    heartFill: '<svg class="icon fill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    facebook: '<svg class="icon fill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.4l.6-3h-3V9c0-.6.4-1 1-1Z"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg>',
    pinterest: '<svg class="icon fill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a8.6 8.6 0 0 0-3.1 16.6c-.1-.8-.2-2 .1-2.8l1.1-4.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-2.3 3.1-5 0-2.1-1.4-3.7-4-3.7-2.9 0-4.7 2.2-4.7 4.6 0 .8.2 1.4.6 1.9.2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.6.3-1.2-.5-1.8-1.9-1.8-3.4 0-2.6 2.2-5.7 6.9-5.7 3.7 0 6.1 2.7 6.1 5.6 0 3.8-2.1 6.7-5.2 6.7-1 0-2-.5-2.3-1.1l-.6 2.3c-.2.8-.8 1.7-1.2 2.3.8.2 1.5.3 2.3.3A8.6 8.6 0 0 0 12 3Z"/></svg>',
    instagram: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M16.5 7.5h.01"/></svg>',
  };
  return icons[name] || "";
}

function isPillSelected(group, label) {
  return Array.isArray(state[group]) && state[group].includes(label);
}

function renderSelectablePill(label, { group, className = "" } = {}) {
  const selected = isPillSelected(group, label);
  const classNames = [className, selected ? "is-selected" : ""].filter(Boolean).join(" ");
  const escapedLabel = escapeHtml(label);
  return `<button class="${classNames}" type="button" data-action="toggle-pill" data-pill-group="${group}" data-pill-label="${escapedLabel}">${escapedLabel}${selected ? icon("chipClose") : ""}</button>`;
}

function renderFilterPill(group, label, { className = "filter-chip" } = {}) {
  const selected = isFilterSelected(group, label);
  const escapedGroup = escapeHtml(group);
  const escapedLabel = escapeHtml(label);

  if (className === "filter-chip") {
    return `
      <button class="filter-option ${selected ? "is-selected" : ""}" type="button" data-action="toggle-filter-chip" data-filter-group="${escapedGroup}" data-filter-label="${escapedLabel}" aria-pressed="${selected}">
        <span class="filter-checkbox">${selected ? icon("checkboxCheck") : ""}</span>
        <span>${escapedLabel}</span>
      </button>
    `;
  }

  const classNames = [className, selected ? "is-selected" : ""].filter(Boolean).join(" ");
  return `<button class="${classNames}" type="button" data-action="toggle-filter-chip" data-filter-group="${escapedGroup}" data-filter-label="${escapedLabel}">${escapedLabel}${selected ? ` ${icon("chipClose")}` : ""}</button>`;
}

function renderSortControl() {
  return `
    <div class="sort-control ${state.sortOpen ? "is-open" : ""}">
      <button class="sort-button" type="button" data-action="toggle-sort" aria-haspopup="listbox" aria-expanded="${state.sortOpen}">
        <span>${escapeHtml(state.sortLabel)}</span>${icon("sortChevron")}
      </button>
      ${state.sortOpen ? `<div class="sort-menu" role="listbox" aria-label="Ordenar presentes">
        ${sortOptions.map((label) => {
          const selected = label === state.sortLabel;
          return `<button class="${selected ? "is-selected" : ""}" type="button" role="option" aria-selected="${selected}" data-action="select-sort" data-sort-label="${escapeHtml(label)}">${escapeHtml(label)}</button>`;
        }).join("")}
      </div>` : ""}
    </div>
  `;
}

function statusBar() {
  return `
    <div class="status-bar" aria-hidden="true">
      <span class="status-time">9:41</span>
      <span class="status-icons">
        <span class="signal"></span>
        <span class="wifi"></span>
        <span class="battery"></span>
      </span>
    </div>
  `;
}

function header() {
  return `
    <header class="header">
      <button class="icon-button menu-button" type="button" aria-label="Categorias" data-action="navigate" data-target="categoryDrawer">
        ${icon("menu")}
      </button>
      <button class="logo" type="button" aria-label="Pra Emocionar" data-action="home">
        <img src="./assets/figma/logo-header.svg" alt="Pra Emocionar" />
      </button>
      <button class="icon-button account-button" type="button" aria-label="Conta">
        ${icon("account")}
      </button>
      <button class="icon-button bag-button" type="button" aria-label="Carrinho" data-action="open-cart">
        ${icon("bag")}
      </button>
      ${cartCountBadge()}
    </header>
  `;
}

function pdpHeader() {
  return `
    <header class="header pdp-header">
      <button class="icon-button menu-button" type="button" aria-label="Categorias" data-action="navigate" data-target="categoryDrawer">
        ${icon("menu")}
      </button>
      <button class="icon-button header-search-button" type="button" aria-label="Buscar" data-action="navigate" data-target="searchTrending">
        ${icon("searchNavy")}
      </button>
      <button class="logo" type="button" aria-label="Pra Emocionar" data-action="home">
        <img src="./assets/figma/logo-header.svg" alt="Pra Emocionar" />
      </button>
      <button class="icon-button account-button" type="button" aria-label="Conta">
        ${icon("account")}
      </button>
      <button class="icon-button bag-button" type="button" aria-label="Carrinho" data-action="open-cart">
        ${icon("bag")}
      </button>
      ${cartCountBadge()}
    </header>
  `;
}

function cartCountBadge() {
  const count = escapeHtml(state.cartCount);
  return `
    <svg class="cart-count" viewBox="0 0 18 18" width="18" height="18" aria-label="${count} itens no carrinho" role="img">
      <circle cx="9" cy="9" r="9" fill="#F16050"></circle>
      <text x="9" y="9" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="12" font-weight="700">${count}</text>
    </svg>
  `;
}

function searchBar({ active = false, readonly = true, plainButton = false } = {}) {
  const hasSearchValue = state.searchQuery.trim().length > 0;
  const searchClass = `search ${active ? "is-active" : ""} ${plainButton ? "is-plain-button" : ""} ${hasSearchValue ? "has-clear" : ""}`;
  const searchIcon = active ? "search" : "searchNavy";

  if (readonly) {
    return `
      <form class="${searchClass}" data-action="navigate" data-target="searchTrending">
        <label class="sr-only" for="search-field">Search</label>
        <input id="search-field" type="search" value="${state.searchQuery}" placeholder="Busque por pessoa, ocasião ou produto" readonly />
        <button type="button" aria-label="Search">${icon(searchIcon)}</button>
      </form>
    `;
  }

  return `
    <form class="search is-active" data-search-form>
      <label class="sr-only" for="searchInput">Search</label>
      <input id="searchInput" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="Busque por pessoa, ocasião ou produto" autocomplete="off" />
      ${hasSearchValue ? `<button class="search-clear" type="button" aria-label="Limpar busca" data-action="clear-search">${icon("searchClose")}</button>` : ""}
      <button type="submit" aria-label="Pesquisar">${icon(searchIcon)}</button>
    </form>
  `;
}

function resultSearchBar(query) {
  return `
    <form class="search result-query-search is-active" data-search-form>
      <label class="sr-only" for="searchInput">Search</label>
      <input id="searchInput" type="search" value="${escapeHtml(query)}" autocomplete="off" />
      <button class="search-clear" type="button" aria-label="Limpar busca" data-action="navigate" data-target="searchTrending">${icon("searchClose")}</button>
      <button class="search-submit" type="submit" aria-label="Pesquisar">${icon("search")}</button>
    </form>
  `;
}

function renderHome(options = {}) {
  return `
    <section class="screen home-screen ${options.dimmed ? "is-dimmed" : ""}">
      ${header()}
      ${searchBar()}
      <section class="hero">
        <button class="hero-link" type="button" data-action="navigate" data-target="giftStep1" aria-label="Encontrar um presente">
          ${imageTag("banner_pic.webp", { className: "hero-frame", alt: "Tem presente que vira lembrança. Encontrar um presente", loading: "eager", fetchpriority: "high", width: 366, height: 458 })}
        </button>
      </section>
      ${renderHomeTrustBar()}
      <section class="recipient-section section-block">
        <div class="section-title recipient-title">
          <h2>Para quem você ama</h2>
          <p>Encontre o presente perfeito para fazer quem você ama sorrir nesta temporada!</p>
        </div>
        <div class="recipient-grid">
          ${recipients.map(([name, image, slot]) => `
            <button class="recipient-card ${slot}" type="button" data-action="navigate" data-target="listPage">
              ${imageTag(image, { width: 100, height: 112 })}
              <strong>${name}</strong>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="trending section-block">
        <h2 class="section-heading">2026 Em Alta Agora</h2>
        <div class="product-grid large-grid">
          ${products.slice(0, 6).map((product, index) => renderProductCard(product, { size: "large", withReview: index === 1 })).join("")}
        </div>
        <button class="more-button" type="button" data-action="navigate" data-target="listPage">Ver Mais ${icon("arrowRight")}</button>
      </section>
      <section class="trust-badges section-block">
        <h2 class="section-heading">Compre com Confiança</h2>
        ${renderTrustBadges()}
      </section>
      ${renderCollection("summer", "Aproveite Cada Momento do Verão", "Celebre quem você ama com presentes inspirados no sol e nos sorrisos.", "collection-summer.webp")}
      ${renderCollection("pets", "Celebre o Amor de Quatro Patas", "Transforme fotos dos seus pets em presentes cheios de carinho.", "collection-pets.webp")}
      <section class="recipient-filter section-block">
        <div class="section-title">
          <h2>Para quem você está comprando hoje?</h2>
          <p>Encontre o presente perfeito para fazer seus entes queridos sorrirem nesta temporada!</p>
        </div>
        <div class="filter-pills" aria-label="Recipient filters">
          ${["Pai/Avô", "Mãe/Avó", "Família", "Casal", "Você", "Amantes de Pets", "Melhores Amigos", "Crianças/Bebês"].map((label) => renderSelectablePill(label, { group: "homeFilterSelected" })).join("")}
          <button class="filter-more" type="button" data-action="navigate" data-target="listPage">Ver Mais ${icon("arrowRight")}</button>
        </div>
        <div class="product-row filter-products">
          ${renderProductRow(10, getHomeFilterProducts())}
        </div>
      </section>
      <section class="reviews section-block">
        <h2 class="section-heading">Clientes Satisfeitos</h2>
        <div class="review-row">
          ${renderReviewCards(10)}
        </div>
        <button class="more-button review-more" type="button" data-action="navigate" data-target="listPage">Ver Mais ${icon("arrowRight")}</button>
      </section>
      ${renderFooter()}
    </section>
  `;
}

function renderHomeTrustBar() {
  return `
    <section class="trust-bar" aria-label="Trust highlights">
      <div class="trust-item trust-item-a">
        ${icon("pix")}
        <strong>Pague com Pix</strong>
      </div>
      <div class="trust-item trust-item-b">
        ${icon("truck")}
        <strong>Calcule o frete e o<br />prazo pelo CEP</strong>
      </div>
      <div class="trust-item trust-item-c">
        ${icon("pin")}
        <strong>Produzido no<br />Paraná</strong>
      </div>
      <div class="trust-item trust-item-d">
        ${icon("whatsapp")}
        <strong>Fale com a gente<br />no WhatsApp</strong>
      </div>
    </section>
  `;
}

function renderTrustBadges() {
  const badges = [
    ["b1", "pix", "Pague com Pix", "Pagamento rápido, seguro e aprovado na hora."],
    ["b2", "truck", "Calcule o frete e o<br />prazo pelo CEP", "Informe seu CEP para consultar o frete e o prazo de entrega."],
    ["b3", "pin", "Produzido no<br />Paraná", "Produzido com carinho e cuidado no Paraná, Brasil."],
    ["b4", "whatsapp", "Fale com a gente<br />no WhatsApp", "Tire suas dúvidas e fale diretamente com a nossa equipe."],
  ];

  return badges.map(([slot, iconName, title, copy]) => `
    <article class="badge-card ${slot}">
      <div class="badge-bg"></div>
      ${icon(iconName)}
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>
  `).join("");
}

function renderCollection(kind, title, copy, image) {
  return `
    <section class="collection ${kind} section-block">
      <div class="collection-tab">
        ${imageTag(image, { width: 366, height: 160 })}
        <div class="collection-copy">
          <h2>${title}</h2>
          <p>${copy}</p>
          <button class="collection-more" type="button" data-action="navigate" data-target="listPage">Ver Mais ${icon("arrowRight")}</button>
        </div>
      </div>
      <div class="product-row">
        ${renderProductRow(10)}
      </div>
    </section>
  `;
}

function getHomeFilterProducts() {
  const selectedFilter = state.homeFilterSelected[0];
  return homeFilterProductCatalog[selectedFilter] || products;
}

function renderProductRow(count, productList = products) {
  return productList.slice(0, count).map((product) => renderProductCard(product, { size: "small" })).join("");
}

function renderRatingStars(count = 5) {
  return `
    <span class="rating-stars" aria-label="${count} estrelas">
      ${Array.from({ length: count }, () => '<img src="./assets/figma/icon-review-star.svg" alt="" />').join("")}
    </span>
  `;
}

function renderFinderStrip() {
  const finderLoopImages = [...finderImages, ...finderImages, ...finderImages, ...finderImages];

  return `
    <div class="finder-strip">
      <div class="finder-track">
        ${finderLoopImages.map((image) => `<div class="finder-photo">${imageTag(image, { width: 110, height: 146 })}</div>`).join("")}
      </div>
    </div>
  `;
}

function renderProductCard(product, { size = "small", withReview = false } = {}) {
  const classes = `product-card ${size === "large" ? "large-card" : "small-card"} ${withReview ? "with-review" : ""}`;
  return `
    <article class="${classes}" role="button" tabindex="0" data-action="navigate" data-target="pdpPage">
      ${imageTag(product.image, { className: "product-image", width: size === "large" ? 175 : 152, height: size === "large" ? 175 : 152 })}
      ${withReview ? `<div class="stars">${renderRatingStars()}<em>(99+)</em></div>` : ""}
      <p class="tag">${product.tag}</p>
      <h3>${product.name}</h3>
      <p class="price ${withReview ? "sale" : ""}">${product.price}${withReview ? " <s>R$ 59,90</s>" : ""}</p>
    </article>
  `;
}

function renderVerticalProductGrid() {
  const offset = ((state.paginationPage - 1) * 2) % products.length;
  const pageProducts = [...products.slice(offset), ...products.slice(0, offset)].slice(0, 10);

  return `
    <section class="list-product-grid">
      ${pageProducts.map((product, index) => renderProductCard(product, { size: "large", withReview: index === 1 })).join("")}
    </section>
  `;
}

function renderPagination() {
  const maxPage = 8;
  const pageNumbers = [1, 2, 3, 8];

  return `
    <nav class="pagination" aria-label="Pagination">
      <button class="pagination-arrow pagination-prev" type="button" aria-label="Previous page" data-action="step-page" data-page-step="-1">${icon("arrowRight")}</button>
      ${pageNumbers.slice(0, 3).map((page) => {
        const isCurrent = state.paginationPage === page;
        return `<button class="pagination-page ${isCurrent ? "is-current" : ""}" type="button" aria-current="${isCurrent ? "page" : "false"}" data-action="set-page" data-page="${page}">${page}</button>`;
      }).join("")}
      <span class="pagination-gap">...</span>
      ${pageNumbers.slice(3).map((page) => {
        const isCurrent = state.paginationPage === page;
        return `<button class="pagination-page ${isCurrent ? "is-current" : ""}" type="button" aria-current="${isCurrent ? "page" : "false"}" data-action="set-page" data-page="${page}">${page}</button>`;
      }).join("")}
      <button class="pagination-arrow" type="button" aria-label="Next page" data-action="step-page" data-page-step="1" data-max-page="${maxPage}">${icon("arrowRight")}</button>
    </nav>
  `;
}

function renderReviewCards(count) {
  return Array.from({ length: count }, (_, index) => `
    <article class="review-card">
      ${imageTag("review-one.webp", { width: 130, height: 130 })}
      <div class="review-copy">
        <div class="verified">
          <img src="./assets/figma/icon-verified.svg" alt="" />
          Verified Buyer
        </div>
        <strong>${index % 2 === 0 ? "Cherie A." : "Mariana S."}</strong>
        <img class="review-stars" src="./assets/figma/icon-stars.svg" alt="5 estrelas" />
        <p>My friends teared up when they saw it and now keep their favorite rings in it every night.</p>
      </div>
    </article>
  `).join("");
}

function renderFooter() {
  return `
    <footer class="footer">
      <section class="newsletter">
        <div class="section-title">
          <h2>Um pequeno presente de boas-vindas para você</h2>
          <p>Cadastre-se para desbloquear sua surpresa</p>
        </div>
        <form class="newsletter-form" action="#">
          <label class="sr-only" for="email-field">Email</label>
          <input id="email-field" type="email" placeholder="Digite seu e-mail" />
          <button type="button">Receber cupom</button>
        </form>
      </section>
      <section class="footer-main">
        <div class="footer-brand">
          <img class="footer-logo" src="./assets/figma/logo.svg" alt="Pra Emocionar" />
          <p>Personalized gifts to transform names, photos, and stories into keepsakes.</p>
          <a href="#" class="whatsapp-link">
            <img src="./assets/figma/icon-whatsapp-footer.svg" alt="" />
            Customer service via WhatsApp
          </a>
        </div>
        <div class="trustpilot-row">
          <img class="trustpilot-logo" src="./assets/figma/trustpilot-logo-white.svg" alt="Trustpilot" />
          <a class="trustpilot-review-link" href="#">13,578 review</a>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <div>
            <h3>Comprar</h3>
            <a href="#">Para quem</a>
            <a href="#">Ocasiões</a>
            <a href="#">Produtos</a>
            <a href="#">Coleções</a>
          </div>
          <div>
            <h3>Ajuda</h3>
            <a href="#">Frete e prazo</a>
            <a href="#">Trocas e devoluções</a>
            <a href="#">Acompanhar pedido</a>
            <a href="#">Fale com a gente</a>
          </div>
          <div>
            <h3>Informações</h3>
            <a href="#">Privacidade e LGPD</a>
            <a href="#">Termos de uso</a>
            <a href="#">Pagamento</a>
            <a href="#">Produção no Paraná</a>
          </div>
        </nav>
        <div class="copyright">
          <p>© 2026 Pra Emocionar. Protótipo de experiência BRP.</p>
          <p>Preços em R$ · Português do Brasil</p>
        </div>
      </section>
    </footer>
  `;
}

function renderCategoryDrawer() {
  return `
    ${renderHome({ dimmed: true })}
    <div class="overlay" data-action="close-drawer"></div>
    <aside class="category-drawer" aria-label="Categorias">
      <div class="drawer-header">
        <h2 class="drawer-title">Menu</h2>
        <button class="icon-button" type="button" aria-label="Fechar" data-action="close-drawer">${icon("close")}</button>
      </div>
      <div class="drawer-first-list">
        ${firstLevelDrawerItems.map(renderFirstLevelDrawerItem).join("")}
      </div>
      <div class="drawer-divider"></div>
      <button class="drawer-service" type="button">
        ${icon("drawerService")}
        <span>Serviço</span>
        ${icon("drawerServiceArrow")}
      </button>
      <button class="drawer-service drawer-track-order" type="button" data-action="navigate" data-target="trackOrder">
        ${icon("trackOrder")}
        <span>Acompanhar pedido</span>
        ${icon("drawerServiceArrow")}
      </button>
    </aside>
  `;
}

function renderFirstLevelDrawerItem(item) {
  return `
    <button class="drawer-nav-item" type="button" data-action="navigate" data-target="${item.target}" data-category-key="${item.categoryKey || ""}">
      ${imageTag(item.image, { className: "drawer-thumb", width: 52, height: 52 })}
      <span>${escapeHtml(item.label)}</span>
      ${icon("drawerNavChevron")}
    </button>
  `;
}

function renderCategoryLevel2() {
  const category = getActiveSecondLevelCategory();

  return `
    ${renderHome({ dimmed: true })}
    <div class="overlay" data-action="close-drawer"></div>
    <aside class="category-drawer" aria-label="${escapeHtml(category.title)}">
      <div class="drawer-header level2-header">
        <button class="drawer-back-title" type="button" aria-label="Voltar para menu" data-action="navigate" data-target="categoryDrawer">
          ${icon("drawerBack")}<span>${escapeHtml(category.title)}</span>
        </button>
      </div>
      <div class="drawer-level2-list">
        ${category.groups.map(renderSecondLevelDrawerItem).join("")}
      </div>
    </aside>
  `;
}

function renderCategoryFlatList() {
  const category = flatDrawerCategories[0];

  return `
    ${renderHome({ dimmed: true })}
    <div class="overlay" data-action="close-drawer"></div>
    <aside class="category-drawer" aria-label="${escapeHtml(category.title)}">
      <div class="drawer-header level2-header">
        <button class="drawer-back-title" type="button" aria-label="Voltar para menu" data-action="navigate" data-target="categoryDrawer">
          ${icon("drawerBack")}<span>${escapeHtml(category.title)}</span>
        </button>
      </div>
      <div class="drawer-flat-list">
        ${category.links.map((label) => `<button class="drawer-flat-link" type="button" data-action="navigate" data-target="listPage">${escapeHtml(label)}</button>`).join("")}
        <button class="drawer-flat-link view-all" type="button" data-action="navigate" data-target="listPage">
          <span>Ver tudo</span>${icon("drawerServiceArrow")}
        </button>
      </div>
    </aside>
  `;
}

function renderSecondLevelDrawerItem(item) {
  const isOpen = isLevel2GroupOpen(item.title);

  return `
    <div class="drawer-level2-group ${isOpen ? "is-open" : ""}">
      <button class="drawer-level2-row ${isOpen ? "is-open" : ""}" type="button" data-action="toggle-level2-group" data-level2-group="${escapeHtml(item.title)}" aria-expanded="${isOpen}">
        <span>${escapeHtml(item.title)}</span>
        ${icon("drawerChevron")}
      </button>
      ${isOpen ? `<div class="drawer-level2-children">
        ${item.links.map((label) => `<button class="drawer-level2-child" type="button" data-action="navigate" data-target="listPage">${escapeHtml(label)}</button>`).join("")}
      </div>` : ""}
    </div>
  `;
}

function renderListPage(options = {}) {
  const filterCount = getDraftFilterCount();
  const filterLabel = filterCount > 0 ? `Filtrar (${filterCount})` : "Filtrar";
  const listPills = filterOptions.find((group) => group.title === "Para quem").chips;

  return `
    <section class="screen list-screen ${options.filtered ? "is-filtered" : ""} ${filterCount > 0 ? "has-filter-count" : ""} ${options.dimmed ? "is-dimmed" : ""}">
      ${header()}
      ${searchBar()}
      <nav class="crumbs" aria-label="Breadcrumb">
        <button class="crumb-link" type="button" data-action="home">Home</button>
        ${icon("chevron")}
        <button class="crumb-link" type="button" data-action="navigate" data-target="categoryDrawer">Para quem</button>
        ${icon("chevron")}
        <strong>Mãe de Pet</strong>
      </nav>
      <section class="list-intro">
        <h1>Presentes para quem ama pets</h1>
        <p>Canecas e camisetas personalizadas com nome, foto e retrato do pet. Escolha a ideia, personalize e confira a prévia.</p>
        <div class="category-pills">
          ${listPills.map((label) => renderFilterPill("Para quem", label, { className: "category-pill" })).join("")}
        </div>
      </section>
      <section class="list-toolbar">
        <div class="result-count">999 ideias<br />de presente</div>
        <div class="toolbar-buttons">
          ${renderSortControl()}
          <button class="filter-button" type="button" data-action="navigate" data-target="filterDrawer">${icon("filter")} ${filterLabel}</button>
        </div>
      </section>
      ${renderVerticalProductGrid()}
      ${renderPagination()}
      ${renderFooter()}
    </section>
  `;
}

function renderPdpPage() {
  const mediaImage = pdpMediaImages[state.pdpMediaIndex] || pdpMediaImages[0];
  const cepClass = state.cepStatus === "success" ? "pdp-cep-expanded" : state.cepStatus === "unavailable" ? "pdp-cep-error-state" : "";

  return `
    <section class="screen pdp-screen ${cepClass}">
      ${pdpHeader()}
      <section class="pdp-local-production">${icon("pin")} <span>Produzido localmente no Paraná</span></section>
      <section class="pdp-product-media" aria-label="Galeria do produto">
        ${imageTag(mediaImage, { className: "pdp-main-image", alt: "Caneca personalizada Retrato Pet", loading: "eager", fetchpriority: "high", width: 366, height: 366 })}
        <button class="pdp-wishlist ${state.pdpWishlist ? "is-selected" : ""}" type="button" data-action="toggle-wishlist" aria-label="Favoritar produto">
          ${icon(state.pdpWishlist ? "heartFill" : "heart")}
        </button>
        <button class="pdp-media-button pdp-media-prev" type="button" data-action="step-pdp-media" data-media-step="-1" aria-label="Imagem anterior">${icon("drawerNavChevron")}</button>
        <button class="pdp-media-button pdp-media-next" type="button" data-action="step-pdp-media" data-media-step="1" aria-label="Próxima imagem">${icon("drawerNavChevron")}</button>
        <span class="pdp-media-counter">${state.pdpMediaIndex + 1} /9</span>
      </section>
      <section class="pdp-summary">
        <h1>Caneca personalizada Retrato Pet — Nome e Foto</h1>
        <p>Transforme a foto do seu pet em um presente que cabe na rotina e fica na memória.</p>
        <div class="pdp-price-row">
          <strong>R$ 59,90</strong>
          <span class="pdp-rating">${renderRatingStars(1)} <b>5.0</b> <em>(696 )</em></span>
        </div>
        <p class="pdp-pix-note">${icon("pix")} Pague com Pix ou use as opções disponíveis no checkout.</p>
      </section>
      ${renderPdpCep()}
      <section class="pdp-size-selector">
        <p>Tamanho</p>
        <div class="pdp-size-options">
          <button class="is-selected" type="button">12x18</button>
          <button type="button">16x24</button>
          <button type="button">24x36</button>
        </div>
      </section>
      <section class="pdp-personalization">
        <div class="pdp-section-title">
          ${icon("stars")}
          <h2>Personalize seu presente</h2>
        </div>
        <label class="pdp-field">
          <span>Nome do pet</span>
          <input type="text" value="Mel" aria-label="Nome do pet" />
        </label>
        <label class="pdp-field">
          <span>Nome de quem recebe</span>
          <input type="text" value="Sarah" aria-label="Nome de quem recebe" />
        </label>
        <div class="pdp-style-group" aria-label="Estilo da arte">
          <p>Escolha o estilo</p>
          <div class="pdp-style-options">
            ${pdpStyleOptions.map((option) => renderPdpStyleOption(option)).join("")}
          </div>
        </div>
        <button class="pdp-preview-button" type="button">${icon("searchNavy")} Ver prévia</button>
        <button class="pdp-add-cart" type="button" data-action="add-pdp-cart">Adicionar ao carrinho</button>
      </section>
      <section class="pdp-contact-service">
        ${icon("whatsapp")}
        <span>Precisa de ajuda? Fale com a gente</span>
        ${icon("drawerServiceArrow")}
      </section>
      <section class="pdp-info-accordion">
        ${["Descrição do produto", "Guia de fotos", "Produção, entrega e trocas"].map((title, index) => `
          <button class="pdp-accordion-row ${index === 0 ? "is-open" : ""}" type="button">
            <span>${title}</span>${icon("drawerChevron")}
          </button>
          ${index === 0 ? `<p>Produto personalizado com impressão em alta definição, feito para transformar fotos especiais em presentes cheios de afeto.</p>` : ""}
        `).join("")}
      </section>
      <section class="pdp-share">
        <span>Compartilhe:</span>
        <button type="button" aria-label="Facebook">${icon("facebook")}</button>
        <button type="button" aria-label="X">${icon("x")}</button>
        <button type="button" aria-label="Pinterest">${icon("pinterest")}</button>
        <button type="button" aria-label="Instagram">${icon("instagram")}</button>
      </section>
      <section class="pdp-reviews-section">
        <h2>Clientes Satisfeitos</h2>
        <div class="pdp-review-summary">
          ${renderRatingStars(5)}
          <strong>4.8</strong><span>/5</span>
        </div>
        <div class="pdp-reviews-carousel">
          ${renderPdpReviewCards()}
        </div>
        <button class="more-button pdp-review-more" type="button">Ver Mais ${icon("arrowRight")}</button>
      </section>
      <section class="pdp-related-section">
        <h2>Itens relacionados que você pode gostar</h2>
        <div class="pdp-related-grid">
          ${pdpRelatedProducts.map((product, index) => renderProductCard(product, { size: "large", withReview: index === 1 })).join("")}
        </div>
      </section>
      ${renderFooter()}
    </section>
  `;
}

function renderPdpStyleOption(option) {
  const isSelected = state.pdpSelectedStyle === option.label;
  return `
    <button class="pdp-style-option ${isSelected ? "is-selected" : ""}" type="button" data-action="select-pdp-style" data-style-label="${escapeHtml(option.label)}" aria-pressed="${isSelected}">
      ${imageTag(option.image, { width: 60, height: 60 })}
      <span>${escapeHtml(option.label)}</span>
    </button>
  `;
}

function renderPdpReviewCards() {
  return [
    ["pdp-review-01.webp", "Cherie A."],
    ["pdp-review-02.webp", "Mariana S."],
  ].map(([image, name]) => `
    <article class="review-card pdp-review-card">
      ${imageTag(image, { width: 130, height: 130 })}
      <div class="review-copy">
        <div class="verified">
          <img src="./assets/figma/icon-verified.svg" alt="" />
          Verified Buyer
        </div>
        <strong>${name}</strong>
        <img class="review-stars" src="./assets/figma/icon-stars.svg" alt="5 estrelas" />
        <p>My friends teared up when they saw it and now keep their favorite rings in it every night.</p>
      </div>
    </article>
  `).join("");
}

function renderPdpCep() {
  const digits = state.cepValue.replace(/\D/g, "");
  const complete = digits.length === 8;
  const status = complete ? state.cepStatus : digits.length ? "inputting" : "default";
  const disabled = !complete || status === "loading";
  const buttonLabel = status === "loading" ? "Calculando..." : "Calcular";

  return `
    <section class="pdp-cep pdp-cep-${status}">
      <div class="pdp-cep-inner">
        <div class="pdp-cep-title">${icon("truck")}<strong>Calcule o frete e o prazo</strong></div>
        <div class="pdp-cep-form">
          <input data-cep-input type="text" inputmode="numeric" maxlength="9" value="${escapeHtml(state.cepValue)}" placeholder="Digite um CEP válido com 8 números" aria-label="CEP" />
          <button class="pdp-cep-button ${disabled ? "is-disabled" : ""}" type="button" data-action="calculate-cep" ${disabled ? "disabled" : ""}>${buttonLabel}</button>
        </div>
        ${status === "success" ? `
          <p class="pdp-cep-destination">Entrega para ${escapeHtml(state.cepValue)} - São Paulo, SP</p>
          <div class="pdp-delivery-options">
            ${renderDeliveryOption("SEDEX", "Chega em até 6 dias úteis", "R$ 13,98")}
            ${renderDeliveryOption("JADLOG Econômico", "Chega em até 5 dias úteis", "R$ 14,89")}
            ${renderDeliveryOption("PAC", "Chega em até 4 dias úteis", "R$ 20.32")}
          </div>
          <p class="pdp-production-note">${icon("pin")} Prazo estimado com produção personalizada + entrega.</p>
        ` : ""}
        ${status === "unavailable" ? '<p class="pdp-cep-error">Entrega indisponível para este CEP</p>' : ""}
      </div>
    </section>
  `;
}

function renderDeliveryOption(name, time, price) {
  return `
    <div class="pdp-delivery-option">
      <span><strong>${name}</strong><em>${time}</em></span>
      <b>${price}</b>
    </div>
  `;
}

function renderFilterDrawer() {
  return `
    ${renderListPage({ dimmed: true })}
    <div class="overlay" data-action="back"></div>
    <aside class="filter-drawer" aria-label="Filtrar presentes">
      <div class="drawer-header">
        <h2 class="drawer-title">Filtrar presentes</h2>
        <button class="icon-button" type="button" aria-label="Fechar filtro" data-action="back">${icon("close")}</button>
      </div>
      <div class="filter-content">
        ${filterOptions.map((group) => filterGroup(group.title, group.chips, -1, isFilterGroupOpen(group.title))).join("")}
      </div>
      <div class="filter-footer">
        <button class="secondary-button" type="button" data-action="clear-filter">limpar tudo</button>
        <button class="primary-button" type="button" data-action="apply-filter">Ver presentes</button>
      </div>
    </aside>
  `;
}

function filterGroup(title, chips, selectedIndex, isOpen = true) {
  return `
    <section class="filter-group ${isOpen ? "is-open" : ""}">
      <button class="filter-group-head ${isOpen ? "is-open" : ""}" type="button" data-action="toggle-filter-group" data-filter-group="${escapeHtml(title)}" aria-expanded="${isOpen}">
        <span>${escapeHtml(title)}</span>${icon("drawerChevron")}
      </button>
      ${isOpen && chips.length ? `<div class="filter-chip-row">
        ${chips.map((chip) => renderFilterPill(title, chip)).join("")}
      </div>` : ""}
    </section>
  `;
}

function collapsedFilter(title) {
  return filterGroup(title, [], -1, false);
}

function renderGiftFinder(step) {
  state.lastGiftStep = `giftStep${step}`;
  const stepMap = {
    1: {
      title: "Quem vai receber?",
      note: "(Passo 1 de 3) Por favor, escolha apenas 1 opção",
      choices: ["Mãe do pet", "Pai do pet", "Mãe", "Pai", "Avós", "Casal"],
      selectionKey: "recipient",
      target: "giftStep2",
      closeTarget: "home",
    },
    2: {
      title: "Qual é a ocasião?",
      note: "(Passo 2 de 3) Por favor, escolha apenas 1 opção",
      choices: ["Aniversário", "Obrigado", "Só porque", "Natal"],
      selectionKey: "occasion",
      target: "giftStep3",
      closeTarget: "retentionModal",
    },
    3: {
      title: "Quanto quer investir?",
      note: "(Passo 3 de 3) Por favor, escolha apenas 1 opção",
      choices: ["Até R$ 70", "R$ 70 a R$ 100", "Acima de R$ 100"],
      selectionKey: "budget",
      target: "giftFinderResults",
      closeTarget: "retentionModal",
    },
  };
  const config = stepMap[step];

  return `
    <section class="screen gift-modal-screen">
      ${renderHome({ dimmed: true })}
      <div class="overlay" data-action="close-gift" data-target="${config.closeTarget}"></div>
      <section class="gift-modal gift-step-${step}" aria-label="Gift finder">
        <button class="icon-button gift-close" type="button" aria-label="Fechar gift finder" data-action="close-gift" data-target="${config.closeTarget}">${icon("close")}</button>
        <div class="gift-title-block">
          <h1 class="modal-title">Encontre o presente perfeito</h1>
          <p class="modal-subtitle">Descubra seu presente ideal em segundos</p>
        </div>
        ${renderFinderStrip()}
        ${giftSelectionSummary(step)}
        <div class="step-title">
          <h2>${config.title}</h2>
          <p><strong>${config.note.split(")")[0]})</strong>${config.note.slice(config.note.indexOf(")") + 1)}</p>
        </div>
        <div class="choice-list">
          ${config.choices.map((choice) => `<button class="choice-button" type="button" data-action="choose-gift" data-gift-key="${config.selectionKey}" data-gift-value="${escapeHtml(choice)}" data-target="${config.target}">${escapeHtml(choice)}</button>`).join("")}
        </div>
      </section>
    </section>
  `;
}

function giftSelectionSummary(step) {
  if (step < 2) {
    return "";
  }

  const parts = [`Para: ${escapeHtml(state.giftSelections.recipient)}`];
  if (step > 2) {
    parts.push(escapeHtml(state.giftSelections.occasion));
  }

  return `
    <button class="gift-selection-summary" type="button" data-action="back" aria-label="Voltar">
      ${icon("drawerBack")}
      <span>${parts.join(' <span class="selection-dot"></span> ')}</span>
    </button>
  `;
}

function renderRetentionModal() {
  const resumeTarget = state.lastGiftStep || "giftStep3";

  return `
    <section class="screen gift-modal-screen">
      ${renderHome({ dimmed: true })}
      <div class="overlay"></div>
      <section class="retention-card" aria-label="Continuar gift finder">
        <button class="icon-button modal-close" type="button" aria-label="Fechar" data-action="close-gift" data-target="home">${icon("close")}</button>
        <h2 class="modal-title">Você está quase lá!</h2>
        <p class="modal-subtitle">Continue para ver sugestões de presentes.</p>
        <div class="retention-actions">
          <button class="secondary-button" type="button" data-action="close-gift" data-target="home">Sair</button>
          <button class="primary-button" type="button" data-action="close-gift" data-target="${resumeTarget}">Continuar escolhendo</button>
        </div>
      </section>
    </section>
  `;
}

function renderSearch(mode) {
  const hasQuery = state.searchQuery.trim().length > 0 || mode === "suggest";
  const filteredSuggestions = getFilteredSuggestions();

  return `
    <section class="screen search-screen">
      ${renderHome({ dimmed: true })}
      <div class="search-fixed-head">
        ${header()}
        ${searchBar({ active: true, readonly: false })}
      </div>
      <div class="overlay search-overlay" data-action="back"></div>
      <section class="search-layer ${hasQuery ? "search-recommend" : ""}" aria-label="Busca">
        ${hasQuery ? "" : '<p class="search-layer-title">Pesquisas em alta</p>'}
        <div class="suggestion-list">
          ${(hasQuery ? filteredSuggestions : trendingTerms).map((term) => suggestionItem(term, hasQuery ? "recommend" : false)).join("")}
        </div>
      </section>
    </section>
  `;
}

function suggestionItem(term, withMeta) {
  if (withMeta === "recommend") {
    return `
      <button class="suggestion-item recommend-item" type="button" data-search-term="${escapeHtml(term)}">
        <span>${escapeHtml(term)}</span>
      </button>
    `;
  }

  return `
    <button class="suggestion-item" type="button" data-search-term="${escapeHtml(term)}">
      ${icon("trend")}
      <span>${term}</span>
      ${withMeta ? '<span class="suggestion-meta">produto e ocasião</span>' : ""}
    </button>
  `;
}

function getFilteredSuggestions() {
  const query = state.searchQuery.trim();
  const normalized = normalizeText(query);
  if (!normalized) {
    return trendingTerms;
  }

  const filteredSuggestions = searchRecommendationCatalog.filter((term) => normalizeText(term).includes(normalized));
  if (filteredSuggestions.length) {
    return filteredSuggestions.slice(0, 6);
  }

  return [
    query,
    `${query} personalizado`,
    `${query} para mulheres`,
    `${query} para homens`,
    `${query} com animal de estimação`,
    `${query} com casal`,
  ];
}

function renderSearchResults() {
  const query = state.searchQuery || "Mãe de pet";
  return `
    <section class="screen list-screen search-results-screen">
      ${header()}
      ${resultSearchBar(query)}
      <section class="results-title">
        <h1>Search results</h1>
      </section>
      <section class="list-toolbar">
        <div class="result-count">128 ideias<br />de presente</div>
        <div class="toolbar-buttons">
          ${renderSortControl()}
          <button class="filter-button" type="button" data-action="navigate" data-target="filterDrawer">${icon("filter")} Filtrar</button>
        </div>
      </section>
      ${renderVerticalProductGrid()}
      ${renderPagination()}
      ${renderFooter()}
    </section>
  `;
}

function renderSearchResultsEmpty() {
  const query = state.searchQuery || "xaddas";
  return `
    <section class="screen list-screen search-empty-screen">
      ${header()}
      ${resultSearchBar(query)}
      <p class="search-empty-message">Não encontramos uma correspondência exata – mas você pode gostar destas...</p>
      <section class="list-toolbar">
        <div class="result-count">999 ideias<br />de presente</div>
        <div class="toolbar-buttons">
          ${renderSortControl()}
          <button class="filter-button" type="button" data-action="navigate" data-target="filterDrawer">${icon("filter")} Filtrar</button>
        </div>
      </section>
      ${renderVerticalProductGrid()}
      ${renderPagination()}
      ${renderFooter()}
    </section>
  `;
}

function renderGiftFinderResults() {
  return `
    <section class="screen list-screen gift-results-screen">
      ${header()}
      ${searchBar({ plainButton: true })}
      <section class="list-toolbar gift-results-toolbar">
        <div class="result-count">999 ideias<br />de presente</div>
        <div class="toolbar-buttons">
          ${renderSortControl()}
        </div>
      </section>
      ${renderVerticalProductGrid()}
      ${renderPagination()}
      ${renderFooter()}
    </section>
  `;
}

function renderCartEmpty() {
  return `
    <section class="screen cart-empty-screen">
      ${header()}
      ${searchBar({ plainButton: true })}
      <section class="cart-empty-state">
        <h1>Seu carrinho está vazio</h1>
        <p>Parece que você ainda não adicionou nada ao seu carrinho. Aproveite para explorar alguns presentes personalizados especiais para você e seus entes queridos em nossas principais categorias</p>
        <button class="cart-continue" type="button" data-action="home">Continue comprando ${icon("arrowRight")}</button>
      </section>
      <section class="cart-related">
        <h2>Itens relacionados que você pode gostar</h2>
        <div class="cart-related-grid">
          ${products.slice(0, 6).map((product, index) => renderProductCard(product, { size: "large", withReview: index === 1 })).join("")}
        </div>
        <button class="more-button cart-related-more" type="button" data-action="navigate" data-target="listPage">Ver Mais ${icon("arrowRight")}</button>
      </section>
      ${renderFooter()}
    </section>
  `;
}

function renderTrackOrder() {
  return `
    <section class="screen track-order-screen">
      ${header()}
      ${searchBar({ plainButton: true })}
      <section class="track-order-panel">
        <h1>Acompanhe seu pedido</h1>
        <p>Digite seu e-mail e o número do pedido para ver o status da entrega.</p>
        <form class="track-order-form" action="#">
          <label class="sr-only" for="track-email">E-mail</label>
          <input id="track-email" type="email" placeholder="E-mail" />
          <label class="sr-only" for="track-number">Número do pedido</label>
          <input id="track-number" type="text" placeholder="Número do pedido" />
          <button type="button">Acompanhar pedido</button>
        </form>
        <div class="track-order-note">
          <strong>Onde encontro meu número?</strong>
          <span>Ele está no e-mail de confirmação da compra.</span>
        </div>
      </section>
      ${renderFooter()}
    </section>
  `;
}

function navigateTo(screenId, options = {}) {
  if (!screens[screenId]) {
    return;
  }
  state.sortOpen = false;
  if (!options.replace && screenId !== state.currentScreenId) {
    state.history.push(state.currentScreenId);
  }
  state.currentScreenId = screenId;
  if (screenId === "searchTrending") {
    state.searchQuery = "";
  }
  if (screenId === "categoryLevel2") {
    state.drawerLevel2OpenGroups = getActiveSecondLevelCategory().groups.map((item) => item.title);
  }
  render({ focusSearch: screenId === "searchTrending" || screenId === "searchSuggest" });
}

function goBack() {
  state.sortOpen = false;
  state.currentScreenId = state.history.pop() || "home";
  render({ focusSearch: state.currentScreenId === "searchTrending" || state.currentScreenId === "searchSuggest" });
}

function closeDrawer() {
  state.sortOpen = false;
  const returnIndex = state.history.findLastIndex((screenId) => !drawerScreens.has(screenId));
  const returnScreen = returnIndex >= 0 ? state.history[returnIndex] : "home";
  state.history = returnIndex > 0 ? state.history.slice(0, returnIndex) : [];
  state.currentScreenId = returnScreen;
  render({ focusSearch: state.currentScreenId === "searchTrending" || state.currentScreenId === "searchSuggest" });
}

function goHome() {
  state.sortOpen = false;
  state.history = [];
  state.currentScreenId = "home";
  render();
}

function openCart() {
  if (state.cartCount === 0) {
    navigateTo("cartEmpty");
    return;
  }
  navigateTo("cartEmpty");
}

function stepPdpMedia(step) {
  const nextIndex = state.pdpMediaIndex + Number(step || 0);
  state.pdpMediaIndex = (nextIndex + pdpMediaImages.length) % pdpMediaImages.length;
  render({ preserveScroll: true });
}

function toggleWishlist() {
  state.pdpWishlist = !state.pdpWishlist;
  render({ preserveScroll: true });
}

function selectPdpStyle(label) {
  if (!pdpStyleOptions.some((option) => option.label === label)) {
    return;
  }
  state.pdpSelectedStyle = label;
  render({ preserveScroll: true });
}

function addPdpToCart() {
  state.cartCount += 1;
  render({ preserveScroll: true });
}

function formatCep(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function handleCepInput(value) {
  state.cepValue = formatCep(value);
  const digits = state.cepValue.replace(/\D/g, "");
  state.cepStatus = digits.length === 8 ? "valid" : digits.length ? "inputting" : "default";
  render({ preserveScroll: true });
}

function calculateCep() {
  const digits = state.cepValue.replace(/\D/g, "");
  if (digits.length !== 8 || state.cepStatus === "loading") {
    return;
  }

  state.cepStatus = "loading";
  render({ preserveScroll: true });

  window.setTimeout(() => {
    if (state.cepValue.replace(/\D/g, "") === "00000000") {
      state.cepStatus = "unavailable";
    } else {
      state.cepStatus = "success";
    }
    render({ preserveScroll: true });
  }, 420);
}

function submitSearch() {
  if (!state.searchQuery.trim()) {
    state.searchQuery = "Mãe de pet";
  }
  const target = normalizeText(state.searchQuery).includes("xaddas") ? "searchResultsEmpty" : "searchResultsHas";
  navigateTo(target);
}

function pressKey(key) {
  if (key === "search") {
    submitSearch();
    return;
  }
  if (key === "space") {
    state.searchQuery += " ";
  } else if (key === "backspace") {
    state.searchQuery = state.searchQuery.slice(0, -1);
  } else {
    state.searchQuery += key;
  }
  state.currentScreenId = state.searchQuery ? "searchSuggest" : "searchTrending";
  render({ focusSearch: true, preserveScroll: true });
}

function handleInput(value) {
  state.searchQuery = value;
  state.currentScreenId = state.searchQuery.trim() ? "searchSuggest" : "searchTrending";
  render({ focusSearch: true, preserveScroll: true });
}

function clearSearch() {
  state.searchQuery = "";
  state.currentScreenId = "searchTrending";
  render({ focusSearch: true, preserveScroll: true });
}

function togglePill(group, label) {
  if (!Array.isArray(state[group])) {
    return;
  }
  if (group === "homeFilterSelected") {
    state[group] = [label];
    render({ preserveScroll: true });
    return;
  }
  if (state[group].includes(label)) {
    state[group] = state[group].filter((item) => item !== label);
  } else {
    state[group] = [...state[group], label];
  }
  render({ preserveScroll: true });
}

function getActiveSecondLevelCategory() {
  return secondLevelDrawerCatalog[state.activeLevel2Category] || secondLevelDrawerCatalog.paraQuem;
}

function isLevel2GroupOpen(title) {
  return state.drawerLevel2OpenGroups.includes(title);
}

function toggleLevel2Group(title) {
  if (isLevel2GroupOpen(title)) {
    state.drawerLevel2OpenGroups = state.drawerLevel2OpenGroups.filter((item) => item !== title);
  } else {
    state.drawerLevel2OpenGroups = [...state.drawerLevel2OpenGroups, title];
  }
  render({ preserveScroll: true });
}

function getFilterSelections(group) {
  return state.filterSelections[group] || [];
}

function getDraftFilterCount() {
  return Object.values(state.filterSelections).reduce((total, selections) => total + selections.length, 0);
}

function isFilterSelected(group, label) {
  return getFilterSelections(group).includes(label);
}

function isFilterGroupOpen(group) {
  return state.filterOpenGroups.includes(group);
}

function toggleFilterGroup(group) {
  if (isFilterGroupOpen(group)) {
    state.filterOpenGroups = state.filterOpenGroups.filter((item) => item !== group);
  } else {
    state.filterOpenGroups = [...state.filterOpenGroups, group];
  }
  render({ preserveScroll: true });
}

function toggleFilterChip(group, label) {
  state.sortOpen = false;
  const selections = getFilterSelections(group);
  if (selections.includes(label)) {
    state.filterSelections[group] = selections.filter((item) => item !== label);
  } else {
    state.filterSelections[group] = [...selections, label];
  }
  state.filterCount = getDraftFilterCount();
  render({ preserveScroll: true });
}

function toggleSort() {
  state.sortOpen = !state.sortOpen;
  render({ preserveScroll: true });
}

function selectSort(label) {
  if (!sortOptions.includes(label)) {
    return;
  }
  state.sortLabel = label;
  state.sortOpen = false;
  render({ preserveScroll: true });
}

function setPaginationPage(page) {
  const nextPage = Number(page);
  if (!Number.isFinite(nextPage)) {
    return;
  }
  state.paginationPage = Math.min(8, Math.max(1, nextPage));
  state.sortOpen = false;
  render({ preserveScroll: true });
}

function stepPagination(step) {
  setPaginationPage(state.paginationPage + Number(step || 0));
}

function clearFilters() {
  state.sortOpen = false;
  state.filterSelections = Object.fromEntries(Object.keys(state.filterSelections).map((group) => [group, []]));
  state.filterCount = 0;
  render({ preserveScroll: true });
}

function applyFilters() {
  const filterCount = getDraftFilterCount();
  state.filterCount = filterCount;
  navigateTo(filterCount ? "listPageFiltered" : "listPage");
}

function chooseGift(key, value, target) {
  if (Object.prototype.hasOwnProperty.call(state.giftSelections, key)) {
    state.giftSelections[key] = value;
  }
  navigateTo(target);
}

function closeGiftModal(target) {
  const modal = appRoot.querySelector(".gift-modal, .retention-card");
  if (!modal) {
    navigateTo(target || "home");
    return;
  }
  modal.classList.add("is-leaving");
  window.setTimeout(() => {
    if (target === "home") {
      goHome();
      return;
    }
    navigateTo(target || "home");
  }, 160);
}

function lockSearchScrollPosition() {
  if (state.currentScreenId !== "searchTrending" && state.currentScreenId !== "searchSuggest") {
    return;
  }
  appViewport.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ left: 0, top: 0 });
}

function focusSearchInputWithoutScroll() {
  requestAnimationFrame(() => {
    const input = document.querySelector("#searchInput");
    if (!input) {
      return;
    }
    try {
      input.focus({ preventScroll: true });
    } catch {
      input.focus();
    }
    input.setSelectionRange(input.value.length, input.value.length);
    lockSearchScrollPosition();
    requestAnimationFrame(lockSearchScrollPosition);
    window.setTimeout(lockSearchScrollPosition, 120);
    window.setTimeout(lockSearchScrollPosition, 320);
  });
}

function render(options = {}) {
  const screen = screens[state.currentScreenId] || screens.home;
  const previousScrollTop = appViewport.scrollTop;
  const previousHorizontalScroll = options.preserveScroll ? captureHorizontalScrollPositions() : [];
  document.body.dataset.currentScreen = state.currentScreenId;
  document.body.dataset.renderMotion = options.preserveScroll ? "static" : "enter";
  document.body.dataset.screenCount = String(Object.keys(screens).length);
  appRoot.innerHTML = screen.render();
  history.replaceState(null, "", `#${state.currentScreenId}`);
  appViewport.scrollTop = options.preserveScroll ? previousScrollTop : 0;
  if (options.preserveScroll) {
    restoreHorizontalScrollPositions(previousHorizontalScroll);
  }

  if (options.focusSearch) {
    focusSearchInputWithoutScroll();
  }
}

appRoot.addEventListener("click", (event) => {
  const keyButton = event.target.closest("[data-key]");
  if (keyButton) {
    pressKey(keyButton.dataset.key);
    return;
  }

  const termButton = event.target.closest("[data-search-term]");
  if (termButton) {
    state.searchQuery = termButton.dataset.searchTerm;
    navigateTo("searchResultsHas");
    return;
  }

  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) {
    if (state.sortOpen) {
      state.sortOpen = false;
      render({ preserveScroll: true });
    }
    return;
  }

  const action = actionElement.dataset.action;
  if (action === "navigate") {
    if (actionElement.dataset.categoryKey) {
      state.activeLevel2Category = actionElement.dataset.categoryKey;
    }
    navigateTo(actionElement.dataset.target);
  } else if (action === "back") {
    goBack();
  } else if (action === "close-drawer") {
    closeDrawer();
  } else if (action === "home") {
    goHome();
  } else if (action === "open-cart") {
    openCart();
  } else if (action === "close-gift") {
    closeGiftModal(actionElement.dataset.target);
  } else if (action === "clear-search") {
    clearSearch();
  } else if (action === "toggle-pill") {
    togglePill(actionElement.dataset.pillGroup, actionElement.dataset.pillLabel);
  } else if (action === "toggle-level2-group") {
    toggleLevel2Group(actionElement.dataset.level2Group);
  } else if (action === "toggle-filter-group") {
    toggleFilterGroup(actionElement.dataset.filterGroup);
  } else if (action === "toggle-filter-chip") {
    toggleFilterChip(actionElement.dataset.filterGroup, actionElement.dataset.filterLabel);
  } else if (action === "toggle-sort") {
    toggleSort();
  } else if (action === "select-sort") {
    selectSort(actionElement.dataset.sortLabel);
  } else if (action === "set-page") {
    setPaginationPage(actionElement.dataset.page);
  } else if (action === "step-page") {
    stepPagination(actionElement.dataset.pageStep);
  } else if (action === "step-pdp-media") {
    stepPdpMedia(actionElement.dataset.mediaStep);
  } else if (action === "toggle-wishlist") {
    toggleWishlist();
  } else if (action === "select-pdp-style") {
    selectPdpStyle(actionElement.dataset.styleLabel);
  } else if (action === "calculate-cep") {
    calculateCep();
  } else if (action === "add-pdp-cart") {
    addPdpToCart();
  } else if (action === "apply-filter") {
    applyFilters();
  } else if (action === "clear-filter") {
    clearFilters();
  } else if (action === "choose-gift") {
    chooseGift(actionElement.dataset.giftKey, actionElement.dataset.giftValue, actionElement.dataset.target);
  }
});

appRoot.addEventListener("submit", (event) => {
  if (event.target.matches("[data-search-form]")) {
    event.preventDefault();
    submitSearch();
  }
});

appRoot.addEventListener("input", (event) => {
  if (event.target.matches("#searchInput")) {
    handleInput(event.target.value);
  } else if (event.target.matches("[data-cep-input]")) {
    handleCepInput(event.target.value);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    goBack();
  }
});

window.addEventListener("resize", fitFrame);
window.visualViewport?.addEventListener("resize", fitFrame);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const hashScreen = location.hash.slice(1);
if (screens[hashScreen]) {
  state.currentScreenId = hashScreen;
}

window.demoState = () => ({
  currentScreenId: state.currentScreenId,
  searchQuery: state.searchQuery,
  sortLabel: state.sortLabel,
  sortOpen: state.sortOpen,
  activeLevel2Category: state.activeLevel2Category,
  filterCount: state.filterCount,
  cartCount: state.cartCount,
  pdpMediaIndex: state.pdpMediaIndex,
  pdpWishlist: state.pdpWishlist,
  pdpSelectedStyle: state.pdpSelectedStyle,
  cepValue: state.cepValue,
  cepStatus: state.cepStatus,
  filterSelections: JSON.parse(JSON.stringify(state.filterSelections)),
  drawerLevel2OpenGroups: [...state.drawerLevel2OpenGroups],
  history: [...state.history],
});

fitFrame();
render();
