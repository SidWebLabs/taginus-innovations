export type Faq = { q: string; a: string };
export type Feature = { title: string; text: string };
export type Item = { slug: string; name: string; seoTitle?: string; summary: string; meta?: string[]; features?: Feature[]; note?: string };
export type Group = { title: string; kind: "product" | "service" | "software"; items: Item[] };
export type Vertical = {
  slug: string;
  name: string;
  short: string;
  seoTitle?: string;
  tagline: string;
  intro: string;
  description: string;
  disclaimer?: string;
  groups: Group[];
  faqs: Faq[];
};

export const verticals: Vertical[] = [
  {
    slug: "agri-input",
    name: "Agri Input",
    short: "Agri Input",
    seoTitle: "Seeds, Lures & Organic Crop Protection",
    tagline: "Speciality seeds, pest lures and organic crop protection.",
    intro:
      "Taginus Innovations produces speciality seeds, pest-monitoring lures and organic and biological crop-protection solutions for farmers and growers in India.",
    description:
      "Speciality marigold, sunflower and Ocimum seeds, white grub, fruit fly and lemon fly lures, and organic crop protection for mealybugs, thrips, nematodes, wilt and more.",
    disclaimer:
      "Product efficacy, crop suitability, safety and regulatory compliance must be established for each product before commercial recommendations. Use only approved products, according to the label and local recommendations.",
    groups: [
      {
        title: "Speciality Seed Production",
        kind: "product",
        items: [
          { slug: "marigold-seeds", name: "Marigold Seeds", summary: "Speciality marigold seed production supporting quality planting material for ornamental, commercial and agricultural use, including crop diversification and integrated pest management systems." },
          { slug: "sunflower-seeds", name: "Sunflower Seeds", summary: "Speciality sunflower seed production for oilseed cultivation and crop diversification, depending on local climate, soil, market demand and cultivation practices." },
          { slug: "ocimum-seeds", name: "Ocimum Seeds", summary: "Seed production for Ocimum species such as basil and holy basil, supporting aromatic, medicinal and essential-oil crop cultivation." },
        ],
      },
      {
        title: "Traps & Lures",
        kind: "product",
        items: [
          { slug: "white-grub-lure", name: "White Grub Lure", summary: "Lures that support monitoring and management of white grubs, soil-dwelling beetle larvae that damage crop roots. Effectiveness depends on the target pest, formulation, placement and field conditions." },
          { slug: "fruit-fly-lure", name: "Fruit Fly Lure", summary: "Designed to attract targeted fruit fly species so farmers can monitor activity, spot periods of higher risk and make informed crop-protection decisions." },
          { slug: "lemon-fly-lure", name: "Lemon Fly Lure", summary: "Supports monitoring of targeted fly pests on citrus and other susceptible crops. Species-specific identification matters because different flies respond to different attractants." },
        ],
      },
      {
        title: "Organic & Biological Crop Protection",
        kind: "service",
        items: [
          { slug: "mealybug-management", name: "Mealybug Management", summary: "Integrated management of sap-feeding mealybugs through scouting, conservation of beneficial insects and suitable biological or registered products." },
          { slug: "thrips-management", name: "Thrips Management", summary: "Monitoring and correct identification first, then cultural, biological and chemical measures where required, to protect crop quality and reduce unnecessary sprays." },
          { slug: "nematode-management", name: "Nematode Management", summary: "Root-health focused management using crop rotation, clean planting material, soil health improvement and validated biological or registered products." },
          { slug: "wilt-management", name: "Wilt Management", summary: "Accurate diagnosis of soil-borne wilt pathogens followed by disease-free planting material, drainage, sanitation and validated protection measures." },
          { slug: "pomegranate-bacterial-blight-management", seoTitle: "Pomegranate Blight Management", name: "Bacterial Blight of Pomegranate Management", summary: "Preventive orchard management of Xanthomonas-associated blight: healthy planting material, sanitation, careful irrigation and early detection." },
          { slug: "aphid-management", name: "Aphid Management", summary: "Regular inspection, conservation of natural enemies such as ladybird beetles and lacewings, and treatment only when monitoring shows it is warranted." },
          { slug: "whitefly-management", name: "Whitefly Management", summary: "Field scouting, residue and weed management, beneficial insects and monitoring tools, with attention to resistance management." },
          { slug: "downy-mildew-management", name: "Downy Mildew Management", summary: "Crop monitoring, air circulation, irrigation that limits leaf wetness, resistant varieties where available and timely preventive measures." },
        ],
      },
    ],
    faqs: [
      { q: "Which seeds does Taginus Innovations produce?", a: "Speciality marigold, sunflower and Ocimum (basil and holy basil) seeds." },
      { q: "Which pests do the lures target?", a: "White grubs, fruit flies and lemon flies. A lure must be matched to the target species and the intended field use." },
    ],
  },
  {
    slug: "agri-tech",
    name: "Agri Tech",
    short: "Agri Tech",
    seoTitle: "Harvesters & Agricultural Equipment",
    tagline: "Harvesters, applicators and planting tools designed for the field.",
    intro:
      "The Agri Tech vertical designs agricultural tools, equipment and accessories around practical problems in harvesting, crop management, input application and horticulture.",
    description:
      "Multipurpose, papaya, dragon fruit, okra and mushroom harvesters, subsoil applicators, seedling planter, sugarcane leaf cutter, biofertiliser mixer and grafting accessories.",
    disclaimer: "Design registration references are listed as per available records. Statuses should be verified against official records.",
    groups: [
      {
        title: "Agricultural Harvesters",
        kind: "product",
        items: [
          { slug: "multipurpose-harvester", name: "Multipurpose Harvester", summary: "A versatile harvester that simplifies manual harvesting and improves handling convenience across suitable agricultural and horticultural crops.", meta: ["Design 416719-001 (Enhanced Multi-Purpose Harvester)", "Design 458410-001"] },
          { slug: "papaya-harvester", name: "Papaya Harvester", summary: "A lightweight harvesting concept that reduces unnecessary handling and the risk of mechanical damage to papaya fruit.", meta: ["Design 495711-001 (Granted)"] },
          { slug: "dragon-fruit-harvester", name: "Dragon Fruit Harvester", summary: "Controlled harvesting of dragon fruit with fruit protection and operator convenience in mind.", meta: ["Design 493946-001 (Granted)"] },
          { slug: "okra-harvester", name: "Okra Harvester", summary: "Lightweight tool for repetitive okra pod harvesting that aims to reduce physical strain in the field.", meta: ["Design 477816-001 (Registered)"] },
          { slug: "mushroom-harvester", name: "Mushroom Harvester", summary: "Designed for careful harvesting of delicate mushrooms, with controlled handling to reduce mechanical damage.", meta: ["Design 458437-001"] },
        ],
      },
      {
        title: "Agricultural Application Equipment",
        kind: "product",
        items: [
          { slug: "subsoil-pesticide-applicator", name: "Subsoil Pesticide Applicator", summary: "Targeted placement of suitable crop-protection inputs below the soil surface, directing them to the intended treatment zone.", meta: ["Design 489649-001", "Design 504974-001 (Granted)"] },
          { slug: "metarhizium-subsoil-applicator", name: "Metarhizium Subsoil Applicator", summary: "Convenient placement of Metarhizium-based biological pest-management products within the relevant soil zone.", meta: ["Design 467668-001"] },
        ],
      },
      {
        title: "Planting & Crop Management Equipment",
        kind: "product",
        items: [
          { slug: "seedling-planter", name: "Seedling Planter", summary: "Supports organised seedling transplantation with convenient operation, consistent placement and less repetitive manual effort.", meta: ["Design 495712-001 (Tripod Seedling Planter, Granted)"] },
          { slug: "sugarcane-leaf-cutter", name: "Sugarcane Leaf Cutter", summary: "A manually operated tool for cutting and removing selected sugarcane leaves during crop-management work.", meta: ["Design 493942-001", "Design 503404-001 (Registered)"] },
          // TODO: design registration number for the Biofertiliser Mixer is not confirmed yet - add to `meta` when available.
          { slug: "biofertiliser-mixer", name: "Biofertiliser Mixer", summary: "Supports uniform mixing of compatible biological agricultural inputs for convenient preparation and consistent distribution." },
        ],
      },
      {
        title: "Horticultural Accessories",
        kind: "product",
        items: [
          { slug: "grafting-clip", name: "Grafting Clip", summary: "Provides temporary support and alignment at the graft union during propagation, making nursery grafting more convenient.", meta: ["Design 444742-001"] },
          { slug: "grafting-ring", name: "Grafting Ring", summary: "Maintains positioning and contact between compatible plant parts during grafting and early establishment.", meta: ["Design 465988-001"] },
        ],
      },
    ],
    faqs: [
      { q: "What agricultural equipment does Taginus Innovations design?", a: "Harvesters for papaya, dragon fruit, okra and mushroom plus a multipurpose harvester, subsoil applicators, a seedling planter, a sugarcane leaf cutter, a biofertiliser mixer and grafting accessories." },
      { q: "Are the designs registered?", a: "Many carry Indian industrial design registration references, shown on each product page with the status in the available records." },
    ],
  },
  {
    slug: "research-development",
    name: "Research & Development",
    short: "R&D",
    seoTitle: "Pesticide R&D and Formulation",
    tagline: "Pesticide innovation, formulation science and applied chemistry.",
    intro:
      "Taginus Innovations runs research-driven development across agriculture, chemistry, crop protection and applied science, combining technical knowledge, formulation science and market understanding.",
    description: "Pesticide innovation, pesticide formulation development, pesticide market analysis, advanced chemistry and home science research.",
    disclaimer: "Formulations must meet applicable safety and regulatory requirements, and efficacy must be established before commercial recommendations.",
    groups: [
      {
        title: "Research Areas",
        kind: "service",
        items: [
          { slug: "pesticide-innovation", name: "Pesticide Innovation", summary: "Exploring botanical extracts, biological agents, attractant-based technologies and alternative delivery mechanisms for targeted pest management." },
          { slug: "pesticide-formulation-development", name: "Pesticide Formulation Development", summary: "Design and optimisation of agricultural formulations: active ingredients, carriers, solvents, stabilisers and delivery systems, tested for stability and performance." },
          { slug: "pesticide-market-analysis", name: "Pesticide Market Analysis", summary: "Industry trends, crop-specific pest-management needs, competing technologies and positioning to evaluate the potential of new crop-protection solutions." },
          { slug: "advanced-chemistry", name: "Advanced Chemistry", summary: "Chemical processes, molecular interactions, composition development and material properties that support innovation and product development." },
          { slug: "home-science-research", name: "Home Science Research", summary: "Practical, science-based solutions for household applications: product development, botanical applications, material functionality and product safety." },
        ],
      },
    ],
    faqs: [
      { q: "How does Taginus Innovations approach R&D?", a: "Projects move through problem identification, literature and prior-art review, concept development, experimental planning, prototype evaluation and technical documentation, then laboratory assessment, field validation, market evaluation and IP review where appropriate." },
      { q: "Does Taginus Innovations offer pesticide formulation development?", a: "Yes. The work covers selection of active ingredients, carriers, solvents and stabilisers, with laboratory evaluation and refinement under applicable safety and regulatory requirements." },
    ],
  },
  {
    slug: "intellectual-property",
    name: "Intellectual Property Rights",
    short: "IPR",
    seoTitle: "Patent, Design & Copyright Services",
    tagline: "Patents, designs, copyright and publishing support.",
    intro:
      "Taginus Innovations supports innovators, researchers, businesses and institutions with intellectual property documentation, filing support, prosecution assistance, design protection, copyright services, PCT filing support and book publishing.",
    description: "Patent drafting and filing, patent prosecution support, industrial design registration, process documentation, copyright registration support, PCT filing support and book publishing in India.",
    disclaimer: "Filing, registration and grant are different legal statuses. Patentability and outcomes depend on the invention and on examination by the relevant authority.",
    groups: [
      {
        title: "IP Services",
        kind: "service",
        items: [
          { slug: "patent-drafting-and-filing", name: "Patent Drafting & Filing", summary: "Turns inventions into structured patent documentation: prior-art review, specifications, claims, drawings, abstracts and application forms." },
          { slug: "patent-prosecution-support", name: "Patent Prosecution Support", summary: "Assistance after filing: status monitoring, reviewing examination reports, draft responses to objections, amendments and deadline tracking." },
          { slug: "industrial-design-registration", name: "Industrial Design Registration", summary: "Protects the visual appearance of eligible products, with product representations, Locarno classification, application preparation and status monitoring.", meta: ["117 industrial design filings in the reported portfolio"] },
          { slug: "process-documentation-and-protection", name: "Process Documentation & Protection", summary: "Records workflows, formulation processes and methods in a structured format, and helps assess patent, know-how or copyright protection.", meta: ["34 process documentation and protection records"] },
          { slug: "copyright-registration-support", name: "Copyright Registration Support", summary: "Prepares books, manuscripts, articles, illustrations, educational content and eligible software works for copyright registration.", meta: ["24 copyright registrations"] },
          { slug: "pct-international-patent-filing-support", seoTitle: "PCT International Patent Filing", name: "PCT International Patent Filing Support", summary: "Filing-readiness assessment, documentation, formalities and deadline tracking for Patent Cooperation Treaty applications. A PCT application does not grant a single worldwide patent." },
          { slug: "book-writing-and-publishing-services", name: "Book Writing & Publishing Services", summary: "Manuscript organisation, chapter planning, technical editing, formatting, cover and interior coordination and ISBN guidance for authors and experts.", meta: ["56 books written or published"] },
        ],
      },
    ],
    faqs: [
      { q: "Does Taginus Innovations file patents?", a: "It supports patent drafting, filing and prosecution. The reported portfolio lists 53 patent filings." },
      { q: "Can you help with PCT international patents?", a: "Yes, with filing-readiness assessment, documentation, formalities and deadline tracking. A PCT application starts the international process but does not itself grant a worldwide patent." },
      { q: "Do you register industrial designs?", a: "Yes. The reported portfolio lists 117 industrial design filings." },
    ],
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    short: "AI",
    seoTitle: "AI for Grape & Pomegranate Farming",
    tagline: "Crop-specific AI platforms for grape and pomegranate growers.",
    intro:
      "Taginus Innovations is developing AI-enabled agricultural platforms that make crop information, technical knowledge and data-driven decision support more accessible to growers.",
    description: "GrowGrapeAI for grape farming and ProducePomoAI for pomegranate production: disease and pest identification, nutrient analysis, weather advisories and irrigation guidance.",
    disclaimer: "AI results are decision-support information. Confirm through field inspection or expert diagnosis, and follow approved product labels, destination-market rules and pre-harvest intervals.",
    groups: [
      {
        title: "AI Platforms",
        kind: "software",
        items: [
          {
            slug: "growgrapeai",
            name: "GrowGrapeAI",
            summary: "An AI-powered viticulture and grape-farming platform giving growers crop-specific information, analysis and digital guidance for vineyard operations.",
            features: [
              { title: "Disease and pest identification", text: "AI-assisted image analysis for preliminary identification of visible grape disease and pest symptoms." },
              { title: "Nutrient deficiency analysis", text: "Helps interpret symptoms that may indicate deficiencies or crop stress, pointing towards further testing." },
              { title: "Weather-based advisory", text: "Connects rainfall, temperature, humidity and wind information with crop-specific guidance." },
              { title: "Fertigation and nutrient management", text: "Information on irrigation and fertigation decisions by crop stage, weather and vineyard needs." },
              { title: "Growth-stage monitoring", text: "Guidance organised around vegetative growth, flowering, fruit development, berry maturation and harvest preparation." },
              { title: "Export residue and pre-harvest interval guidance", text: "Access to residue-management and harvest-timing information for export-oriented production." },
            ],
          },
          {
            slug: "producepomoai",
            name: "ProducePomoAI",
            summary: "An AI platform for pomegranate production that supports orchard management with crop-specific information and digital assistance.",
            features: [
              { title: "Disease and pest assessment", text: "Preliminary assessment of visible symptoms on leaves, stems, flowers and fruit." },
              { title: "Orchard nutrition assessment", text: "Helps growers recognise possible nutrient-related symptoms and when to test further." },
              { title: "Irrigation and water management", text: "Information for irrigation planning based on growth, soil moisture, weather and fruit development." },
              { title: "Flowering and fruit development", text: "Stage-specific cultivation guidance for flowering, fruit set and development." },
              { title: "Weather and crop-risk awareness", text: "Weather information included in pomegranate-focused guidance." },
              { title: "Integrated crop management", text: "Organised guidance covering pest management, nutrition, irrigation and orchard sanitation together." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "What is GrowGrapeAI?", a: "GrowGrapeAI is an AI-powered platform from Taginus Innovations for grape cultivation, covering disease and pest identification, nutrient analysis, weather advisories, fertigation, growth-stage monitoring and export residue guidance." },
      { q: "What is ProducePomoAI?", a: "ProducePomoAI is an AI platform from Taginus Innovations for pomegranate production, covering disease and pest assessment, nutrition, irrigation, flowering and fruit development, and weather risk awareness." },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    short: "Technology",
    seoTitle: "QR Pay UPI QR Code Generator",
    tagline: "QR Pay, a UPI payment QR generator and manager.",
    intro:
      "Taginus Innovations builds accessible digital utilities for everyday business needs. QR Pay is an installable web app for generating and managing UPI payment QR codes.",
    description: "QR Pay is a UPI payment QR generator and manager PWA for retailers, freelancers and small businesses in India.",
    disclaimer: "QR Pay is a payment QR utility, not a bank, payment aggregator or payment-processing service. A generated QR code does not confirm that a customer has paid; verify payment in your bank or UPI app.",
    groups: [
      {
        title: "Digital Utilities",
        kind: "software",
        items: [
          {
            slug: "qr-pay",
            name: "QR Pay",
            summary: "A UPI payment QR generator and manager for merchants, retailers, freelancers and small businesses. Generate QR codes with preset amounts and notes, then download or share them.",
            features: [
              { title: "Instant UPI payment QR generation", text: "Pick a saved UPI profile, enter an amount and optional note, and generate a scannable QR code." },
              { title: "Multiple UPI profile management", text: "Save and label several UPI IDs for different shops or collection purposes." },
              { title: "Download, share and print", text: "Use QR codes at counters, on invoices, in payment requests or in customer materials." },
              { title: "QR generation history", text: "Find earlier QR codes and filter by today, this week or a date range. History is not a record of completed payments." },
              { title: "Local data storage", text: "Saved profiles and history are stored on your device rather than in a central account." },
              { title: "Installable PWA", text: "Add it to your home screen. Local features work offline, but completing a UPI payment needs an internet connection." },
              { title: "Works with UPI apps", text: "Compatible with Google Pay, PhonePe, Paytm, BHIM and other apps that support the UPI QR format." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "What is QR Pay?", a: "QR Pay is a UPI payment QR generator and manager PWA by Taginus Innovations for Indian merchants, freelancers and small businesses." },
      { q: "Does QR Pay confirm that a payment was received?", a: "No. A generated QR code does not confirm payment. Verify completion in your bank or UPI app." },
    ],
  },
  {
    slug: "innovation-engagement",
    name: "Innovation Engagement",
    short: "Innovation",
    seoTitle: "Innography Innovation Platform",
    tagline: "Innography, a platform to showcase ideas and connect innovators.",
    intro:
      "Innography is an innovation engagement platform envisioned by Taginus Innovations to showcase innovations, present innovator profiles and encourage collaboration among researchers, inventors, entrepreneurs, students and organisations.",
    description: "Innography: innovation showcase, innovator profiles, invention and project display, collaboration, idea submission and researcher engagement.",
    disclaimer: "Innography is an envisioned platform. The features below describe its planned scope.",
    groups: [
      {
        title: "Innovation Platform",
        kind: "software",
        items: [
          {
            slug: "innography",
            name: "Innography",
            summary: "An innovation and collaboration platform for presenting ideas, inventions and innovators, and connecting people with complementary expertise.",
            features: [
              { title: "Innovation Showcase", text: "A space to present ideas, emerging technologies, research outcomes and solutions across sectors." },
              { title: "Individual Innovator Profiles", text: "Inventors, researchers, students and entrepreneurs present their expertise and innovation work." },
              { title: "Invention and Project Display", text: "Structured presentation of inventions, prototypes, research projects and product concepts." },
              { title: "Innovation Collaboration", text: "Connects people and organisations with complementary skills for research and project development." },
              { title: "Idea Submission", text: "A channel to propose ideas and concepts as a starting point for review and development." },
              { title: "Researcher and Innovator Engagement", text: "Networking and knowledge sharing among researchers, academicians, students and industry professionals." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "What is Innography?", a: "Innography is an innovation and collaboration platform by Taginus Innovations for showcasing ideas, innovator profiles and inventions, and for connecting researchers, inventors and organisations." },
      { q: "Can I submit an idea?", a: "Idea submission is part of the planned scope of Innography. For now, write to taginusinnovation@gmail.com." },
    ],
  },
];

export const getVertical = (slug: string) => verticals.find((v) => v.slug === slug);

export const getItem = (vSlug: string, iSlug: string) => {
  const vertical = getVertical(vSlug);
  if (!vertical) return undefined;
  for (const group of vertical.groups) {
    const item = group.items.find((i) => i.slug === iSlug);
    if (item) return { vertical, group, item };
  }
  return undefined;
};

export const countItems = (v: Vertical) => v.groups.reduce((n, g) => n + g.items.length, 0);
