import type { TrekState } from "@/types";

export interface District {
  id: string;
  name: string;
  state: TrekState;
  heroImage: string;
  description: string;
  tags: [string, string, string];
  lat: number;
  lng: number;
  trekCount: number;
  yatraCount: number;
}

export interface StateInfo {
  id: TrekState;
  name: string;
  heroImage: string;
  description: string;
  trekCount: number;
  yatraCount: number;
}

export const stateInfo: StateInfo[] = [
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1400&q=85&fit=crop",
    description:
      "The Land of Gods — home to Char Dham, Kedarnath and legendary glacier treks through the Garhwal and Kumaon Himalayas.",
    trekCount: 20,
    yatraCount: 10,
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    heroImage:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1400&q=85&fit=crop",
    description:
      "From lush Kullu valleys to the cold-desert landscapes of Spiti and Lahaul — Himachal is the adventurer's ultimate frontier.",
    trekCount: 20,
    yatraCount: 6,
  },
];

export const uttarakhandDistricts: District[] = [
  {
    id: "chamoli",
    name: "Chamoli",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1621969159027-c6d4b0ea2a66?w=800&q=80&fit=crop",
    description:
      "Chamoli is the gateway to Badrinath and the Valley of Flowers — a UNESCO World Heritage Site ablaze with 500+ wildflower species. It shelters the Nanda Devi Biosphere Reserve, the second-highest peak in India, and some of the most dramatic high-altitude meadows on Earth.",
    tags: ["Valley of Flowers", "Glacier Treks", "Badrinath Dham"],
    lat: 30.4088,
    lng: 79.3174,
    trekCount: 4,
    yatraCount: 2,
  },
  {
    id: "uttarkashi",
    name: "Uttarkashi",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1631854984440-a9e6a7c32e2c?w=800&q=80&fit=crop",
    description:
      "Uttarkashi cradles the sources of the Ganges and Yamuna rivers, crowned by Gangotri — one of the four Char Dhams. The Kedarkantha winter trek and Dayara Bugyal alpine meadows draw trekkers year-round.",
    tags: ["Gangotri Dham", "Snow Treks", "Alpine Meadows"],
    lat: 30.7268,
    lng: 78.4354,
    trekCount: 3,
    yatraCount: 1,
  },
  {
    id: "rudraprayag",
    name: "Rudraprayag",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1590778853090-f60de7b2e7f8?w=800&q=80&fit=crop",
    description:
      "Where the Alaknanda and Mandakini rivers meet, Rudraprayag is the spiritual corridor to Kedarnath — one of the twelve Jyotirlingas. The Chopta-Tungnath ridge and Deoria Tal offer some of the finest trekking terrain in Garhwal.",
    tags: ["Kedarnath Dham", "Chopta Trek", "Sacred Rivers"],
    lat: 30.2849,
    lng: 78.9812,
    trekCount: 2,
    yatraCount: 2,
  },
  {
    id: "tehri-garhwal",
    name: "Tehri Garhwal",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fit=crop",
    description:
      "Tehri Garhwal is dominated by Asia's largest dam reservoir — a dramatic blue expanse ringed by forested ridges. The Nag Tibba trek, popular among weekend trekkers from Delhi, offers panoramic Himalayan views in just two days.",
    tags: ["Nag Tibba Trek", "Tehri Lake", "Weekend Treks"],
    lat: 30.3786,
    lng: 78.4807,
    trekCount: 1,
    yatraCount: 0,
  },
  {
    id: "pithoragarh",
    name: "Pithoragarh",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80&fit=crop",
    description:
      "Pithoragarh is Kumaon's northernmost frontier, sharing borders with Nepal and Tibet. Milam Glacier, Adi Kailash Yatra, and Om Parvat Yatra converge here — the latter offering the rare sight of a natural snow swastika on the sacred Om Parvat mountain.",
    tags: ["Adi Kailash Yatra", "Milam Glacier", "Tibet Border"],
    lat: 29.5827,
    lng: 80.2181,
    trekCount: 1,
    yatraCount: 2,
  },
  {
    id: "bageshwar",
    name: "Bageshwar",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80&fit=crop",
    description:
      "Bageshwar is the base for glacier expeditions into the inner Kumaon — Pindari, Kafni, and Sunderdhunga glaciers all fan out from this compact mountain town. The Baijnath temple complex adds deep spiritual weight to every visit.",
    tags: ["Pindari Glacier", "Kafni Glacier", "Sunderdhunga"],
    lat: 29.8388,
    lng: 79.7693,
    trekCount: 3,
    yatraCount: 0,
  },
  {
    id: "almora",
    name: "Almora",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop",
    description:
      "Almora is the cultural heart of Kumaon — a ridge-top town of stone temples, traditional bazaars, and sweeping Himalayan panoramas. The Ali Bedni Bugyal trek and Binsar Wildlife Sanctuary draw those seeking both alpine meadows and forest solitude.",
    tags: ["Ali Bedni Bugyal", "Kumaon Culture", "Binsar Forest"],
    lat: 29.5971,
    lng: 79.6609,
    trekCount: 2,
    yatraCount: 0,
  },
  {
    id: "pauri",
    name: "Pauri Garhwal",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&fit=crop",
    description:
      "Pauri sits on a spur overlooking the Alaknanda valley, with the Garhwal Himalayas as a constant backdrop. The Kuari Pass trek — Jim Corbett's Curzon Trail — passes through here, offering legendary views of Nanda Devi, Kamet, and Trishul.",
    tags: ["Kuari Pass Trek", "Curzon Trail", "Nanda Devi Views"],
    lat: 30.1453,
    lng: 78.7772,
    trekCount: 1,
    yatraCount: 0,
  },
  {
    id: "dehradun",
    name: "Dehradun",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1592423571753-a4c4f6c6aaee?w=800&q=80&fit=crop",
    description:
      "Dehradun is the gateway to the Garhwal Himalayas and Uttarakhand's capital. With Mussoorie, Robbers Cave, and excellent rail/air connectivity, it serves as the main departure point for treks across the state.",
    tags: ["Gateway City", "Mussoorie Hills", "Base Camp Hub"],
    lat: 30.3165,
    lng: 78.0322,
    trekCount: 1,
    yatraCount: 0,
  },
  {
    id: "haridwar",
    name: "Haridwar",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1561361058-c12e83b5e8e4?w=800&q=80&fit=crop",
    description:
      "Haridwar is one of the seven holiest cities in Hinduism, where the Ganga descends from the Himalayas to the plains. The nightly Ganga Aarti at Har Ki Pauri is among India's most spiritually charged experiences.",
    tags: ["Ganga Aarti", "Char Dham Gateway", "Pilgrimage Hub"],
    lat: 29.9457,
    lng: 78.1642,
    trekCount: 0,
    yatraCount: 1,
  },
  {
    id: "nainital",
    name: "Nainital",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80&fit=crop",
    description:
      'Nainital is the "Lake District of India" — a charming colonial hill station built around a tear-shaped lake in the Kumaon hills. It serves as the leisure gateway to the Kumaon trekking region.',
    tags: ["Lake District", "Kumaon Gateway", "Hill Station"],
    lat: 29.3803,
    lng: 79.4636,
    trekCount: 1,
    yatraCount: 0,
  },
  {
    id: "champawat",
    name: "Champawat",
    state: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&fit=crop",
    description:
      "Champawat is a lesser-explored gem of Kumaon, with dense oak and rhododendron forests, ancient temples, and the start of the Swargarohini range. Jim Corbett's famous tiger hunts played out through these very forests.",
    tags: ["Dense Forests", "Ancient Temples", "Jim Corbett Heritage"],
    lat: 29.3367,
    lng: 80.0923,
    trekCount: 1,
    yatraCount: 0,
  },
];

export const himachalDistricts: District[] = [
  {
    id: "kullu",
    name: "Kullu",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80&fit=crop",
    description:
      'Kullu is the "Valley of Gods" — a 80km corridor of pine forests, orchards, and rushing rivers flanked by snow-capped peaks. The Hampta Pass and Pin Parvati treks both begin here, and Rohtang Pass unlocks the door to the cold desert beyond.',
    tags: ["Hampta Pass Trek", "Valley of Gods", "Rohtang Pass"],
    lat: 31.9579,
    lng: 77.1091,
    trekCount: 4,
    yatraCount: 0,
  },
  {
    id: "lahaul-spiti",
    name: "Lahaul & Spiti",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80&fit=crop",
    description:
      "Lahaul and Spiti are two high-altitude cold-desert valleys that feel more like Tibet than India. Ancient Buddhist monasteries, turquoise rivers, and extreme altitude make this the most otherworldly trekking terrain in the country.",
    tags: ["Cold Desert", "Buddhist Monasteries", "Spiti Valley Trek"],
    lat: 32.2396,
    lng: 77.5885,
    trekCount: 2,
    yatraCount: 0,
  },
  {
    id: "kinnaur",
    name: "Kinnaur",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop",
    description:
      "Kinnaur is a world of apple orchards, slate-roofed villages, and the sacred Kinnaur Kailash — a 6050m peak considered the abode of Lord Shiva. The Kinnaur Kailash Parikrama is among India's most challenging yatras.",
    tags: ["Kinnaur Kailash Yatra", "Apple Orchards", "Sutlej Valley"],
    lat: 31.5925,
    lng: 78.4497,
    trekCount: 1,
    yatraCount: 1,
  },
  {
    id: "shimla",
    name: "Shimla",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop",
    description:
      "Shimla was the summer capital of British India — a charming Victorian hill town at 2200m ringed by cedar and oak forests. The Churdhar trek, accessible from Shimla district, is the highest peak in the outer Himalayas.",
    tags: ["Churdhar Yatra", "Colonial Heritage", "Cedar Forests"],
    lat: 31.1048,
    lng: 77.1734,
    trekCount: 2,
    yatraCount: 1,
  },
  {
    id: "chamba",
    name: "Chamba",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1530520073925-3b02af2c0a57?w=800&q=80&fit=crop",
    description:
      "Chamba is one of Himachal's most historically rich districts, home to the Manimahesh Lake — a sacred pilgrimage site at 4080m. The Mani Mahesh Yatra, held annually during Janmashtami, draws hundreds of thousands of devotees.",
    tags: ["Mani Mahesh Yatra", "Ancient Temples", "Ravi Valley"],
    lat: 32.5534,
    lng: 76.1268,
    trekCount: 2,
    yatraCount: 1,
  },
  {
    id: "kangra",
    name: "Kangra",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1493246318282-83aef21c0cd4?w=800&q=80&fit=crop",
    description:
      "Kangra is the green, forested gateway to the Dhauladhar range. Dharamsala, the seat of the Dalai Lama, is here — and the Triund and Indrahar Pass treks are the most popular entry points into these granite-walled mountains.",
    tags: ["Triund Trek", "Dhauladhar Range", "Dharamsala Gateway"],
    lat: 32.1024,
    lng: 76.2673,
    trekCount: 3,
    yatraCount: 0,
  },
  {
    id: "sirmaur",
    name: "Sirmaur",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=800&q=80&fit=crop",
    description:
      "Sirmaur is the southernmost district of Himachal, home to the Churdhar peak at 3647m — the highest point of the outer Himalayas. Dense forests of oak, rhododendron, and fir cover its slopes, making it a biodiversity hotspot.",
    tags: ["Churdhar Peak", "Outer Himalayas", "Dense Forests"],
    lat: 30.5596,
    lng: 77.4526,
    trekCount: 1,
    yatraCount: 1,
  },
  {
    id: "mandi",
    name: "Mandi",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80&fit=crop",
    description:
      "Mandi is the commercial hub of Himachal — a town of 81 stone temples on the banks of the Beas River. The Prashar Lake trek from here offers a floating island marvel within a glacial lake set against the Pir Panjal peaks.",
    tags: ["Prashar Lake", "Beas River", "Ancient Temples"],
    lat: 31.7148,
    lng: 76.9318,
    trekCount: 1,
    yatraCount: 0,
  },
  {
    id: "solan",
    name: "Solan",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&fit=crop",
    description:
      "Solan is Himachal's mushroom capital and home to Asia's largest brewery. Close to Shimla and Chandigarh, it offers easy weekend getaways to forested ridges, apple orchards, and the Kasauli cantonment.",
    tags: ["Weekend Getaways", "Kasauli Hills", "Orchard Walks"],
    lat: 30.9045,
    lng: 77.0967,
    trekCount: 0,
    yatraCount: 0,
  },
  {
    id: "una",
    name: "Una",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1496545672447-f699b503d270?w=800&q=80&fit=crop",
    description:
      "Una is the foothills gateway to Himachal from Punjab — a flat, agricultural district at the edge of the Shivalik range. The Chintpurni Mata temple here is one of the 51 Shakti Peethas and draws millions of pilgrims annually.",
    tags: ["Shakti Peetha", "Shivalik Gateway", "Plains Entry"],
    lat: 31.4685,
    lng: 76.2686,
    trekCount: 0,
    yatraCount: 0,
  },
  {
    id: "hamirpur",
    name: "Hamirpur",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80&fit=crop",
    description:
      "Hamirpur is a compact, densely populated hill district known for its high literacy rates and the Sujanpur Tira fort complex. Though not a primary trekking destination, it serves as a connecting point for temple circuits and cultural heritage tours.",
    tags: ["Heritage Forts", "Temple Circuits", "Cultural Tours"],
    lat: 31.6862,
    lng: 76.5212,
    trekCount: 0,
    yatraCount: 0,
  },
  {
    id: "manali",
    name: "Manali / Kullu-Manali",
    state: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1597483862633-1eac2d7e4f0a?w=800&q=80&fit=crop",
    description:
      "Manali is India's most celebrated Himalayan adventure hub — surrounded by three mountain ranges, home to the Solang Valley ski slopes, and the launch pad for Hampta Pass, Beas Kund, Bhrigu Lake, and the Rohtang-to-Spiti circuit.",
    tags: ["Beas Kund Trek", "Bhrigu Lake Trek", "Snow Adventures"],
    lat: 32.2396,
    lng: 77.1887,
    trekCount: 4,
    yatraCount: 0,
  },
];

export function getDistrictsByState(state: TrekState): District[] {
  return state === "uttarakhand" ? uttarakhandDistricts : himachalDistricts;
}

export function getDistrictById(
  state: TrekState,
  districtId: string,
): District | undefined {
  const districts = getDistrictsByState(state);
  return districts.find((d) => d.id === districtId);
}
