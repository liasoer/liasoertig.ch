/* ==========================================================================
   Content data — Projects (client work) & Photography (editorial portraits)
   Image sources: liasoertig.ch (Squarespace CDN), used as placeholder real
   material until Lias supplies final selects/exports.
   ========================================================================== */

const CDN = "https://images.squarespace-cdn.com/content/v1/6294b081d7e567047cfd19dc/";

/* ---------------------------------------------------------------------- */
/* PROJECTS — client / event work                                         */
/* ---------------------------------------------------------------------- */
// Rendered order on projects.html is [...PROJECTS].reverse(), so this array
// is listed bottom-to-top of the desired display order: Kuenstlercantina,
// Showreel, TO, Look in the Mirror, Bubble Event, Dancing, Lothar Möbel.
const PROJECTS = [
  {
    slug: "lothar-moebel",
    title: "LOTHAR MÖBEL",
    subtitle: "Doppelstrich",
    category: "Short Form Video Content",
    instagram: null,
    year: "2025",
    description: "A look inside the Doppelstrich exhibition — craft, wood and process, captured in motion.",
    cover: "assets/posters/lothar-moebel-cover.png",
    accent: ["#df765c", "#dfa15c", "#df5c9e"],
    images: [],
    videos: [
      { title: "Video", youtube: "p4yqaqwlI8E", portrait: true }
    ]
  },
  {
    slug: "dancing",
    title: "DANCING",
    subtitle: "Camille & Sophie",
    category: "Short Form Video Content",
    instagram: "camillesjournal",
    year: "2024",
    description: "Double portrait with Camille and Sophie, in motion — the video reels from the same session.",
    cover: "assets/posters/dancing-cover.png",
    accent: ["#df7d5c", "#dfba5c", "#5c88df"],
    images: [],
    videosCarousel: true,
    videos: [
      { title: "Reel 1", youtube: "0s_XTEDXass", portrait: true },
      { title: "Reel 2", youtube: "S1jCECFDiBU", portrait: true },
      { title: "Reel 3", youtube: "JDGXIhkcFlY", portrait: true }
    ]
  },
  {
    slug: "bubble-event",
    title: "BUBBLE EVENT",
    subtitle: "NALI",
    category: "Short Form Video Content",
    instagram: null,
    year: "2025",
    description: "Reels and edits from the NALI Bubble Event — pure motion work, no photo set for this one.",
    cover: "assets/posters/bubble-event-cover.png",
    accent: ["#5c9edf", "#5cdf7d", "#dfb95c"],
    images: [],
    videosCarousel: true,
    videos: [
      { title: "Pre-Reel 1", youtube: "PiLUYnT9ymM", portrait: true },
      { title: "Pre-Reel 2", youtube: "f9QHsYk7BBA", portrait: true },
      { title: "Pre-Reel 3", youtube: "LS-gw1JQzHU", portrait: true },
      { title: "After-Reel 1", youtube: "Cj76jSYAK3w", portrait: true },
      { title: "After-Reel 2", youtube: "n2IM4hdluWk", portrait: true },
      { title: "After-Reel 3", youtube: "0wNqssDT_o8", portrait: true }
    ]
  },
  {
    slug: "look-in-the-mirror",
    title: "LOOK IN THE MIRROR",
    subtitle: "Minyar",
    category: "Music Video",
    instagram: null,
    year: "2025",
    description: "Music video \"Look in the Mirror\" — staged visual language, camera and edit.",
    cover: "assets/posters/look-in-the-mirror-cover.png",
    accent: ["#dfbf5c", "#df925c", "#5cdf5c"],
    images: [],
    comingSoon: "Coming soon"
  },
  {
    slug: "to",
    title: "TO",
    subtitle: "Enni",
    category: "Music Video",
    instagram: null,
    year: "2025",
    description: "Music video production for Enni — camera and edit.",
    cover: "assets/posters/to-enni-cover.png",
    accent: ["#dadf5c", "#a3df5c", "#dfb05c"],
    images: [],
    comingSoon: "Coming soon"
  },
  {
    slug: "camille-showreel",
    title: "SHOWREEL",
    subtitle: "Camille",
    category: "Showreel",
    instagram: null,
    year: null,
    description: "Showreel for Camille — a compilation of motion work.",
    cover: "assets/posters/camille-showreel-cover.png",
    images: [],
    videos: [
      { title: "Showreel", youtube: "0Q7BkdLOr28" }
    ]
  },
  {
    slug: "kuenstlercantina",
    title: "KUENSTLERCANTINA",
    subtitle: "NALI",
    category: "Imagefilm (inkl. Trailer)",
    instagram: "kuenstlercantina",
    year: "2024",
    description: "Concert nights at Künstlercantina — stage light, crowd energy, and the pulse of small venues.",
    cover: "assets/posters/kuenstlercantina-cover.png",
    accent: ["#5c81df", "#df9f5c", "#df5c9e"],
    videos: [
      {
        title: "Imagefilm",
        youtube: "6s4d2hCbOB4"
      },
      {
        title: "Trailer",
        youtube: "jNn2TTwVeKw"
      }
    ],
    images: []
  },
];

/* ---------------------------------------------------------------------- */
/* PHOTOGRAPHY — editorial portrait shoots                                */
/* ---------------------------------------------------------------------- */
const PHOTOGRAPHY = [
  {
    slug: "camille-golf",
    title: "Camille",
    instagram: "camillesjournal",
    year: "2025",
    description: "Camille on the golf course — quiet lines, warm light, an afternoon between fairways.",
    cover: CDN + "7c684a05-f10d-4d71-959e-f1724c094996/LO-06156.jpg",
    images: [
      CDN + "7c684a05-f10d-4d71-959e-f1724c094996/LO-06156.jpg",
      CDN + "a266011a-256e-43b4-8c6c-93d27fb8a3d6/LO-05924.jpg",
      CDN + "75587df2-ed20-47aa-9401-f7a611a35e4e/LO-05756.jpg",
      CDN + "49d5ec67-0006-468a-b2cf-fdc004b65eff/LO-05797.jpg",
      CDN + "15b274cb-5030-408a-b8d3-33f8bf671061/LO-05804.jpg",
      CDN + "6995f80f-45e0-4945-8c90-912993598483/LO-05818.jpg",
      CDN + "2a291ca5-338b-4861-b606-aed369badb92/LO-05823.jpg",
      CDN + "7569e03a-bf57-47d1-991f-a1964a9c64f1/LO-05834.jpg",
      CDN + "097425ae-27d5-4c00-98c8-5e7379c4312b/LO-05839.jpg",
      CDN + "afce0e72-8095-4d12-ac25-9263ef7c1c5c/LO-05848.jpg",
      CDN + "bd2a331f-b406-4c42-a7c3-dd3dcab3a9e6/LO-05852.jpg",
      CDN + "8e1e76d4-d0e9-46a3-805f-f94d59a9c4aa/LO-05857.jpg",
    ]
  },
  {
    slug: "sophie-i",
    title: "Sophie",
    instagram: "sophie.loreti",
    year: "2025",
    description: "First collaboration with Sophie — natural light, warm tones, relaxed eye contact.",
    cover: CDN + "14b6518e-d239-4fc1-a2c3-611dd8deb96d/LO-000911.jpg",
    images: [
      CDN + "14b6518e-d239-4fc1-a2c3-611dd8deb96d/LO-000911.jpg",
      CDN + "c65aaf8e-512b-4584-8409-6bf2ff771cef/LO-001106.jpg",
      CDN + "8f0d9761-67d2-4adb-a5e1-c0852b417594/LO-000722.jpg",
      CDN + "32767932-ce6e-4d3a-9c91-4b70c87d3c46/LO-001060.jpg",
      CDN + "fd202003-3dd7-47cc-bffa-e0a21870becf/LO-001049.jpg",
      CDN + "95ef5d22-112d-41ee-b5c5-bae27fb306d7/LO-000628.jpg",
      CDN + "3e9667fb-b643-4897-9e20-1616280a0926/LO-001127.jpg",
      CDN + "ddeef69d-562f-45d4-95fe-78dbb59fb97a/LO-000636.jpg",
      CDN + "c1457e1f-bc50-431e-9949-f6d142005177/LO-000593.jpg",
      CDN + "dcef4c3e-e236-4dc1-acfa-d3b914b37034/LO-001096.jpg",
      CDN + "4bff901e-f671-43cf-b319-8dbd9373a806/LO-000572.jpg",
      CDN + "b3036774-18b6-4f27-bca9-e645c5b7c10d/LO-001025.jpg",
    ]
  },
  {
    slug: "emma-iii",
    title: "Emma",
    instagram: "emma_climent",
    year: "2024",
    description: "Third session with Emma — studio light and still poses, reduced to expression and texture.",
    cover: CDN + "c17dbf3a-350a-4298-8895-6f2537184566/LO-01698.jpg",
    images: [
      CDN + "c17dbf3a-350a-4298-8895-6f2537184566/LO-01698.jpg",
      CDN + "721a0526-a73b-4da7-85c3-e03fca96ee78/LO-01898.jpg",
      CDN + "2ff0a138-aaf8-44c7-beee-f6074e12fff6/LO-01954.jpg",
      CDN + "e8afc5d1-23aa-4ce0-bf6e-cee8889bf5ca/LO-01841.jpg",
      CDN + "409d819b-28c6-4787-a49b-c5f6d9a25614/LO-01547.jpg",
      CDN + "4e9671a5-8bfa-4a8b-92d9-e5196eb42449/LO-01888.jpg",
      CDN + "66ba9154-fba1-4896-abb5-32f89bf95d54/LO-01772.jpg",
      CDN + "ccc63265-e48d-4db0-86ea-a2f22795ee18/LO-01931.jpg",
      CDN + "5527e6aa-95c2-42cb-8dbe-7ab3514e4c35/LO-01776.jpg",
      CDN + "158b2331-f6c1-4413-9648-dba375498e37/LO-01661.jpg",
      CDN + "01ad9d79-9037-45e1-95e0-7e3af2b50511/LO-01936.jpg",
      CDN + "c63c5465-772b-4974-9151-3e23ff856fae/LO-01961.jpg",
    ]
  },
  {
    slug: "minyar-iii",
    title: "Minyar",
    instagram: "minyar_01",
    year: "2025",
    description: "Third session with Minyar — quiet portraits focused on light and silhouette.",
    cover: CDN + "fa074732-e759-470d-b284-44114cd93329/LO-06767.jpg",
    images: [
      CDN + "fa074732-e759-470d-b284-44114cd93329/LO-06767.jpg",
      CDN + "876d893d-c7e2-4b4e-8415-ee01eb2be5b3/LO-07115.jpg",
      CDN + "eb58fc41-06a0-4a00-95f4-a1285bc6355e/LO-06812.jpg",
      CDN + "fb73ffa9-1ff9-456a-9689-4d6cdba90534/LO-07079.jpg",
      CDN + "d24a8465-da25-440d-a120-248fc75c62dc/LO-07074.jpg",
      CDN + "4ef4332a-0706-405e-849d-9013c832de02/LO-07004.jpg",
      CDN + "05472048-7cce-473c-b3ac-07f20c1669fc/LO-07047.jpg",
      CDN + "4a8b0b6b-219a-43e6-8db0-f9c138cf8eb3/LO-06854.jpg",
      CDN + "1740315764415-CRTT052LGNBAX5XQ0B4M/LO-07014.jpg",
      CDN + "64f96bf2-e706-45ac-adab-eb90618c388d/LO-06863.jpg",
    ]
  },
  {
    slug: "lara-ii",
    title: "Lara",
    instagram: "_.larush._",
    year: "2025",
    description: "Second session with Lara — minimal, calm, plenty of room to breathe in the frame.",
    cover: CDN + "52b0c2ea-b85e-4fc9-b9a4-649bf0b30989/LO-03555.jpg",
    images: [
      CDN + "52b0c2ea-b85e-4fc9-b9a4-649bf0b30989/LO-03555.jpg",
      CDN + "8997ed24-5d7a-4ab3-a479-cea8bbce5a38/LO-03542.jpg",
      CDN + "553a85f9-8edc-4c29-ac56-8524e0e72a74/LO-03698.jpg",
      CDN + "ebc4e8a0-3dbb-4460-a935-9e1e2c40ef46/LO-03571.jpg",
      CDN + "58e699c9-fb2e-45fa-a6e5-2dc266467034/LO-03591.jpg",
      CDN + "ac566752-5edd-4d4a-86a0-0832e6769f00/LO-03600.jpg",
      CDN + "bea96b09-5f3e-4a66-8465-3c7222eec517/LO-03631.jpg",
      CDN + "8b356dcc-3d3c-4c1a-8f45-5e5af7ed53c6/LO-03675.jpg",
    ]
  },
  {
    slug: "camille",
    title: "Camille",
    instagram: "camillesjournal",
    year: "2024",
    description: "Camille in warm afternoon light — classic portraits with a filmic feel.",
    cover: CDN + "b9666fbd-2dfe-4e97-bcdc-590aa89dbd80/LO-04474.jpg",
    images: [
      CDN + "b9666fbd-2dfe-4e97-bcdc-590aa89dbd80/LO-04474.jpg",
      CDN + "4fb7f0c3-e946-4b72-925e-202d6e5496b2/LO-04542.jpg",
      CDN + "24dc8a7e-44f1-4e90-b41a-b3dc54ac5091/LO-04423.jpg",
      CDN + "de24ea8f-7b88-4c0e-8cd9-0fcdd8435759/LO-04550.jpg",
      CDN + "2e4db03f-5907-49a2-ba40-f5d22df736d1/LO-04435.jpg",
      CDN + "d39d19ee-cb9d-4d8b-9aff-9f7c479834ca/LO-04460.jpg",
      CDN + "78ce3aed-4d04-4920-a4f0-85a262ebac5a/LO-04440.jpg",
      CDN + "fbb7029a-77c4-4198-bc11-4ac72190e59d/LO-04471.jpg",
    ]
  },
  {
    slug: "lara-i",
    title: "Lara",
    instagram: "_.larush._",
    year: "2024",
    description: "First session with Lara — natural light, open gazes, unfussy images.",
    cover: CDN + "1728136081492-6FZN6KC89H63D626VSD3/LO-03524.jpg",
    images: [
      CDN + "1728136081492-6FZN6KC89H63D626VSD3/LO-03524.jpg",
      CDN + "3d901528-a652-493f-9389-c9014e845d95/LO-03461.jpg",
      CDN + "8632a560-4e29-4074-b06f-e561d1c19339/LO-03366.jpg",
      CDN + "a22c5a5a-e038-4751-be42-7e98d3e221a0/LO-03468.jpg",
      CDN + "9f813ce5-7dfe-4610-aa3d-6cab08cb4615/LO-03440.jpg",
      CDN + "127e01bc-2cef-41f8-8c31-c4beed07aa7f/LO-03477.jpg",
      CDN + "a06eb835-07d1-48fa-890b-c2cbe7e90c88/LO-03371.jpg",
      CDN + "4e8ddfcf-281f-4cbb-8895-1431bb1a4506/LO-03474.jpg",
      CDN + "4311e432-5fa3-4360-9605-5a92ea09b3b8/LO-03457.jpg",
      CDN + "39403069-70f4-47b3-8052-76ae6b5d23bb/LO-03515.jpg",
    ]
  },
  {
    slug: "emma-ii",
    title: "Emma",
    instagram: "emma_climent",
    year: "2024",
    description: "Second session with Emma — movement and close-ups in soft window light.",
    cover: CDN + "ca57ab9b-aca4-49d2-8b2a-6f187bc4b15a/LO-02067.jpg",
    images: [
      CDN + "ca57ab9b-aca4-49d2-8b2a-6f187bc4b15a/LO-02067.jpg",
      CDN + "c873c2e5-bcca-4d08-9d8e-211de9709082/LO-02183.jpg",
      CDN + "5b20f438-59f7-4d35-a5c2-d30872e3979f/LO-02089.jpg",
      CDN + "89e81e46-bd72-41c9-895a-9ac6a5da5794/LO-02128.jpg",
      CDN + "bb28d6f2-48d4-43f3-af79-b113a16f38f5/LO-02069.jpg",
      CDN + "6256e6b5-0ed2-4a52-ab64-e92ba505e50c/LO-01966.jpg",
      CDN + "610a16a4-7b3b-47a3-971f-f88fab4175b7/LO-01980.jpg",
      CDN + "d0936d03-9a8b-435a-be12-cfc609a0dce6/LO-01998.jpg",
      CDN + "df70797e-f8bd-416a-833c-bb4c3322574a/LO-01999.jpg",
      CDN + "4b558e28-9e5b-4313-8168-e43b383a39a8/LO-02006.jpg",
    ]
  },
  {
    slug: "minyar-ii",
    title: "Minyar",
    instagram: "minyar_01",
    year: "2024",
    description: "Second session with Minyar — reduced palette, clear compositions.",
    cover: CDN + "87b521d2-b888-40e3-b44c-a6b7b9c9d977/LO-05865.jpg",
    images: [
      CDN + "87b521d2-b888-40e3-b44c-a6b7b9c9d977/LO-05865.jpg",
      CDN + "ed738670-d152-4e55-b442-619e0b8dad3c/LO-05483.jpg",
      CDN + "cba8b2e5-eca7-4f66-bea1-f0739d8d580e/LO-05899.jpg",
      CDN + "a12870ce-5fbc-4768-83d2-27f1ba44e848/LO-05491.jpg",
      CDN + "33987766-8158-4da3-9836-daa4a2e2f817/LO-05772.jpg",
      CDN + "0eb0b71f-375c-41d1-b043-c9a0674fb7d8/LO-05605.jpg",
      CDN + "e4cd0ffc-c5ba-40fe-bdc6-a633968ad498/LO-05706.jpg",
      CDN + "01dc93ab-cff2-4ed5-9d07-333960616940/LO-05755.jpg",
      CDN + "626ac5f5-9ceb-4160-aae7-39a3d93229c3/LO-05732.jpg",
    ]
  },
  {
    slug: "fabienne-i",
    title: "Fabienne",
    instagram: "fabienne0805",
    year: "2024",
    description: "First session with Fabienne — soft light, many expressions, honest images.",
    cover: CDN + "30ff17df-ed12-4d6a-b0ba-8c8e74366d66/LO-01346.jpg",
    images: [
      CDN + "30ff17df-ed12-4d6a-b0ba-8c8e74366d66/LO-01346.jpg",
      CDN + "8508e201-5dd8-4b21-87d7-27acf6ba6cb2/LO-01072.jpg",
      CDN + "73cdb0af-1aa8-4355-bc8f-91351d024058/LO-01085.jpg",
      CDN + "a60ef6dd-f336-457b-87c1-f89dc9c0e751/LO-01278.jpg",
      CDN + "b3d6e908-dbf2-4f65-aa16-dbfaaec48ba1/LO-01100.jpg",
      CDN + "d54d215e-bc11-4230-a8f2-08244d245eaf/LO-01324.jpg",
      CDN + "fbb391e2-688c-431c-bdc6-c10b0ef035aa/LO-01108.jpg",
      CDN + "078b2170-67a2-4b0f-89c4-d60ca9ffc064/LO-01303.jpg",
      CDN + "38020aa5-32c6-4e35-b868-849da2fdce48/LO-01112.jpg",
      CDN + "b5a1fec4-b113-4c68-a30d-fa50c840afaf/LO-01333.jpg",
    ]
  },
  {
    slug: "emma-i",
    title: "Emma",
    instagram: "emma_climent",
    year: "2024",
    description: "First collaboration with Emma — classic studio portraits, clean and reduced.",
    cover: CDN + "9c5c2118-7fda-4a21-b3d3-3bbd3c7b4dba/LO-02486.jpg",
    images: [
      CDN + "9c5c2118-7fda-4a21-b3d3-3bbd3c7b4dba/LO-02486.jpg",
      CDN + "56bdfe8e-2ddc-46cb-b8b9-4617ef3a685b/LO-02316.jpg",
      CDN + "1486cda7-d33c-434f-bbff-163f9462c0c1/LO-02332.jpg",
      CDN + "95bd50a7-ab13-4346-802d-1fea6e92b0b0/LO-02373.jpg",
      CDN + "0a153095-8bb0-42b7-a73b-fb96860560dd/LO-02396.jpg",
      CDN + "b06462e3-de9f-44b7-8a84-2330b30efcc1/LO-02380.jpg",
      CDN + "2dc8b22e-a33e-4508-b3ae-c16dd71a7818/LO-02414.jpg",
      CDN + "9c0096b2-5912-4735-9b7e-a280988e328e/LO-02434.jpg",
    ]
  },
  {
    slug: "louisa-iii",
    title: "Louisa",
    instagram: "louisaeleonoraa",
    year: "2024",
    description: "Third session with Louisa — documentary, unstaged, full of movement.",
    cover: CDN + "7343155d-8059-4324-8451-0e58b8b3ccec/DSC03871.jpg",
    images: [
      CDN + "7343155d-8059-4324-8451-0e58b8b3ccec/DSC03871.jpg",
      CDN + "6e57204c-b747-4f27-9bfa-95fae2fb46fc/DSC04027.jpg",
      CDN + "8f4bd151-3fd9-42f0-951f-82ab5f972090/DSC03991.jpg",
      CDN + "b47c5445-6c04-4ce6-851c-3c09ec256029/DSC04022.jpg",
      CDN + "494eaad3-c50d-4fff-adf0-966d3a815839/DSC03687.jpg",
      CDN + "fdb62b7a-a6a8-43db-86a6-deadc4cffc9b/DSC03960.jpg",
      CDN + "7a2716ce-99ee-4485-ae38-e742eb6ba8a0/DSC03952.jpg",
      CDN + "fc33d669-669d-4a59-9729-70730620fd8d/DSC03835.jpg",
    ]
  },
  {
    slug: "minyar-i",
    title: "Minyar",
    instagram: "minyar_01",
    year: "2024",
    description: "First session with Minyar — the start of a longer collaboration, quiet tonality.",
    cover: CDN + "ddc32955-691c-426f-89fd-412619cd558d/LO-06378.jpg",
    images: [
      CDN + "ddc32955-691c-426f-89fd-412619cd558d/LO-06378.jpg",
      CDN + "06a9766e-73e4-4b45-9bb3-d05bc40bb68a/LO-06353.jpg",
      CDN + "691990b0-4009-4fe6-9b58-b8b04b8a21db/LO-06538.jpg",
      CDN + "e367088a-4425-4393-86f5-3684c9a42988/LO-06075.jpg",
      CDN + "a94cf634-a7bd-438b-88d1-ccd1b0ccfcea/LO-06552.jpg",
      CDN + "89108ecc-83c9-445b-870e-8bdad9c84347/LO-06089.jpg",
      CDN + "15ce6d2f-f371-4140-a8de-3b41b38e70f7/LO-05974.jpg",
      CDN + "f63c899c-84bd-4b7c-a7bc-02136c535ba9/LO-06205.jpg",
    ]
  },
  {
    slug: "louisa-ii",
    title: "Louisa",
    instagram: "louisaeleonoraa",
    year: "2024",
    description: "Second session with Louisa — street-style portraits with a quiet eye for detail.",
    cover: CDN + "0c4f1159-8262-4820-8b92-6cba33053898/DSC03411.jpg",
    images: [
      CDN + "0c4f1159-8262-4820-8b92-6cba33053898/DSC03411.jpg",
      CDN + "9bb96010-7f7b-4439-890c-751ead0df6ef/DSC03390.jpg",
      CDN + "ed459088-ba29-4f8e-8c9e-28669526522e/DSC03138.jpg",
      CDN + "800413e7-3ae4-4744-a6b2-6ab206cfde8a/DSC03122.jpg",
      CDN + "96909a78-deed-4796-ad4b-4d8a0f92891f/DSC03401.jpg",
      CDN + "a4e9fdb1-a46e-4a29-a35c-2f7514656b71/DSC03494.jpg",
      CDN + "3d00eca4-7b71-4de1-8c3e-961faed1e43a/DSC03336.jpg",
      CDN + "61d9a72c-fa10-4b33-8c32-837784b45710/DSC03241.jpg",
    ]
  },
  {
    slug: "lina-ii",
    title: "Lina",
    instagram: "linabarmettler",
    year: "2024",
    description: "Second session with Lina — portraits in golden-hour light, relaxed and warm.",
    cover: CDN + "9272da02-d64e-4254-a7dd-940c741dec66/DSC00848.jpg",
    images: [
      CDN + "9272da02-d64e-4254-a7dd-940c741dec66/DSC00848.jpg",
      CDN + "14174fcc-e738-4726-93ed-c02a0bca644e/DSC00709.jpg",
      CDN + "de905834-92f2-4375-a4f1-b5b296e98b0f/DSC00547.jpg",
      CDN + "f83fd507-8005-4449-be19-04510171d627/DSC00788.jpg",
      CDN + "fe5a7ee4-606f-4a04-b207-c09b3b6f7058/DSC00748.jpg",
      CDN + "b1461707-b5f2-4054-be46-91265ab52932/DSC00536.jpg",
      CDN + "c9d02531-0466-43af-a271-e2e4be6c62fe/DSC00735.jpg",
      CDN + "6391610c-380d-4fdd-a2fc-097ca85238a2/DSC00718.jpg",
    ]
  },
  {
    slug: "camillesophie",
    title: "Camille & Sophie",
    instagram: "camillesjournal",
    year: "2024",
    description: "Double portrait with Camille and Sophie — friendship, movement, plenty of spontaneous moments.",
    cover: CDN + "f2810ccc-d612-4a35-bba1-f3d94ab15a78/LO-03325.jpg",
    images: [
      CDN + "f2810ccc-d612-4a35-bba1-f3d94ab15a78/LO-03325.jpg",
      CDN + "781fdde6-19e8-428b-9076-ff31ac8554fd/LO-02547.jpg",
      CDN + "b3f67255-cdf6-4cfd-a5ce-153c4d26ca7b/LO-02691.jpg",
      CDN + "6f343d53-2e2b-4cc6-b989-b4061edb2650/LO-02928.jpg",
      CDN + "426e96ea-309e-4701-946e-752bb00334d9/LO-03038.jpg",
      CDN + "8f6aac61-f60f-4c13-8c8f-7f741bf02b5c/LO-03076.jpg",
      CDN + "e399c990-7528-4794-bb67-f58753bb8d86/LO-03176.jpg",
      CDN + "0494913c-cea9-4e89-9445-9ff2a9219222/LO-03172.jpg",
      CDN + "6c1e339d-5458-4394-96a2-b86ecbd9fe9c/LO-03111.jpg",
      CDN + "e2c81648-2d4d-4a80-b09b-734700535b53/LO-02993.jpg",
    ]
  },
  {
    slug: "joy",
    title: "Joy",
    instagram: "joywalcher",
    year: "2024",
    description: "Session with Joy — versatile expressions between studio and natural light.",
    cover: CDN + "19c6739a-e294-40f6-a4dc-6eb0e4870393/LO-00987.jpg",
    images: [
      CDN + "19c6739a-e294-40f6-a4dc-6eb0e4870393/LO-00987.jpg",
      CDN + "bbc9a5a5-df0c-465a-a17d-e54283033f09/LO-00864.jpg",
      CDN + "6ebfea7b-6e53-4e2b-9691-a1b309fa1660/LO-09467.jpg",
      CDN + "f375d93e-d88b-45c2-af44-9da51715cdc8/LO-01078.jpg",
      CDN + "555f09bd-0926-48e2-82c4-c55d150a556c/LO-09893.jpg",
      CDN + "b7ce790e-1f2a-4206-9a57-df3940b07a6b/LO-01714.jpg",
      CDN + "31e928a3-e0b2-4196-971f-19321c675ee5/LO-09698.jpg",
      CDN + "dc849094-ee47-4302-9c60-d12261076d06/LO-00931.jpg",
    ]
  },
  {
    slug: "louisa-i",
    title: "Louisa",
    instagram: "louisaeleonoraa",
    year: "2024",
    description: "First session with Louisa — the start of a series, documentary and unhurried.",
    cover: CDN + "cf139ab5-cb83-4dec-892d-82bdcd90e59a/DSC02331.jpg",
    images: [
      CDN + "cf139ab5-cb83-4dec-892d-82bdcd90e59a/DSC02331.jpg",
      CDN + "009bf052-84d8-4534-8ca5-83358a7cc8fd/DSC02365.jpg",
      CDN + "ec5fb1a0-f207-4e8f-b5bb-ad8e6358f054/DSC02805.jpg",
      CDN + "af48b6c5-be27-40e5-b64d-36306a4c2332/DSC02517.jpg",
      CDN + "8788fdfe-8013-4359-a875-c89bb846e855/DSC02431.jpg",
      CDN + "07a5b3da-4ebf-4636-8a6e-5499427943f6/DSC02547.jpg",
      CDN + "b97f4cab-60dc-49ff-82a4-0ab922eac90d/DSC02575.jpg",
      CDN + "2a12ad9a-b82a-4208-840a-d0f2f5e98fd2/DSC02719.jpg",
    ]
  },
  {
    slug: "lina-i",
    title: "Lina",
    instagram: "linabarmettler",
    year: "2024",
    description: "First session with Lina — classic portraits, calmly composed.",
    cover: CDN + "f51cb187-649e-45a2-91cf-829f2a8aad6a/DSC09585.jpg",
    images: [
      CDN + "f51cb187-649e-45a2-91cf-829f2a8aad6a/DSC09585.jpg",
      CDN + "9438aa75-eaad-484d-b6c8-f5403f68269c/DSC09318.jpg",
      CDN + "5af24675-2831-483d-99cc-cd959975ef93/DSC09336.jpg",
      CDN + "eb566580-1a59-4742-871e-e4e7722702eb/DSC09414.jpg",
      CDN + "8b5d04ef-eeec-4601-a9f5-ddaa25f9db96/DSC09435.jpg",
      CDN + "3cb1057a-ee75-42b4-87ea-33e283465380/DSC09678.jpg",
      CDN + "eaef8ed0-a5df-4bb4-9727-d455749d65ac/DSC09456.jpg",
      CDN + "3bff8edb-fb38-4f71-b76d-fbd7cd6489fc/DSC09471.jpg",
    ]
  },
  {
    slug: "mara",
    title: "Mara",
    instagram: "mara.parker_",
    year: "2024",
    description: "Session with Mara — natural light, many angles, honest closeness.",
    cover: CDN + "cc11b6e4-c905-4971-890a-62495ae8620f/DSC02264.jpg",
    images: [
      CDN + "cc11b6e4-c905-4971-890a-62495ae8620f/DSC02264.jpg",
      CDN + "9ef20c5a-ce08-4d4e-8115-7b9d573e7e20/DSC02430.jpg",
      CDN + "5e5c9b65-6867-48da-b533-a0168e80e8be/DSC02742.jpg",
      CDN + "69513e69-af47-45ee-a468-d2e305d84296/DSC02079.jpg",
      CDN + "982befea-b5a7-4e82-a78e-5a7f4b1db6e5/DSC02041.jpg",
      CDN + "90a6ee5f-293a-4204-be38-3d362d227010/DSC02021.jpg",
      CDN + "73461f65-d454-49eb-9c16-9794f7624636/DSC01995.jpg",
      CDN + "46c2f472-cb36-45b3-82ac-983ccd19e3c6/DSC01848.jpg",
    ]
  },
  {
    slug: "ania",
    title: "Ania",
    instagram: "ania.schuster",
    year: "2024",
    description: "Session with Ania — versatile series focused on expression and window light.",
    cover: CDN + "a2462dbc-9724-48e1-b45b-be7d01d88f3e/DSC08122.jpg",
    images: [
      CDN + "a2462dbc-9724-48e1-b45b-be7d01d88f3e/DSC08122.jpg",
      CDN + "0ee305ca-aa09-4033-8dec-b28f94482098/DSC08907.jpg",
      CDN + "0892082b-70ea-48ec-93e4-818e01cc6efe/DSC08698.jpg",
      CDN + "0f6e1f67-e9f2-4278-8bd2-c68bed5a8a97/DSC08547.jpg",
      CDN + "d3a9c793-0c9d-4609-b10c-cfe8eb7c3a9a/DSC08353.jpg",
      CDN + "a3de9e73-bc75-4f7b-bd2e-21a52e3aee78/DSC08265.jpg",
      CDN + "b7b6c130-fa86-41e8-8d14-210e6db73bd9/DSC08232.jpg",
      CDN + "28571601-ec0a-4af2-9fde-4d37ecc1e38f/DSC08180.jpg",
    ]
  },
  {
    slug: "into-that-goodnight",
    title: "Into That Goodnight",
    subtitle: "Elin",
    category: "Video",
    instagram: null,
    year: "2026",
    description: "Music video \"Into That Goodnight\" with Elin — camera and edit.",
    cover: "assets/posters/into-that-goodnight-cover.png",
    images: [],
    videos: [
      { title: "Video", youtube: "lCqNFMANtN0" }
    ]
  },
];
