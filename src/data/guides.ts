export type GuideIcon =
  | "car"
  | "road"
  | "palm"
  | "plane"
  | "water"
  | "sun"
  | "ring"
  | "briefcase"
  | "compass"
  | "wheel";

export interface GuideSection {
  heading: string;
  body: string;
  wiki?: { label: string; url: string };
}

export interface GuideContent {
  title: string;
  description: string;
  keywords: string;
  intro: string;
  sections: GuideSection[];
  tips: string[];
  faqs: { q: string; a: string }[];
}

export interface Guide {
  slug: string;
  icon: GuideIcon;
  hue: number;
  ar: GuideContent;
  en: GuideContent;
  relatedSlugs?: string[];
}

export const guides: Guide[] = [
  {
    slug: "limousine-fayoum-complete-guide",
    icon: "car",
    hue: 45,
    ar: {
      title: "دليل ليموزين الفيوم الشامل 2026",
      description:
        "كل ما تحتاج معرفته عن خدمة ليموزين الفيوم: الأسعار، أنواع السيارات، مناطق التغطية، وطريقة الحجز خلال دقائق مع سائقين محترفين على مدار 24 ساعة.",
      keywords: "ليموزين الفيوم, ليموزين الفيوم القاهرة, سيارات ليموزين الفيوم, حجز ليموزين",
      intro:
        "يعد اختيار خدمة ليموزين موثوقة في محافظة الفيوم قراراً يوفر عليك ساعات من البحث والتفاوض. في هذا الدليل نلخص كل ما تحتاجه لتحجز بثقة: من فهم أنواع السيارات المتاحة، إلى معرفة الأسعار التقريبية بين المدن، وحتى نصائح تختصر عليك الوقت وتضمن لك رحلة آمنة ومريحة سواء كنت مسافراً للعمل، للسياحة، أو لاستقبال ضيوف من المطار.",
      sections: [
        {
          heading: "ما هو ليموزين الفيوم ولماذا يختلف عن التاكسي؟",
          body:
            "ليموزين الفيوم هو خدمة نقل خاصة (Private Chauffeur) تعتمد على سيارات حديثة مكيفة وسائقين مدربين على قواعد السلامة وخدمة العملاء. يختلف عن التاكسي التقليدي في ثلاث نقاط جوهرية: الاعتماد على حجز مسبق بموعد محدد، وضوح السعر قبل الرحلة بدون عداد مفاجئ، وجودة سيارة مصنّفة VIP بمقاعد جلد ومساحة أوسع للركاب والحقائب.",
          wiki: { label: "الفيوم على ويكيبيديا", url: "https://ar.wikipedia.org/wiki/الفيوم" },
        },
        {
          heading: "أنواع السيارات المتاحة وسعتها",
          body:
            "يضم أسطولنا سيارات 4 مقاعد للأفراد ورجال الأعمال، سيارات 7 مقاعد للعائلات، سيارات SUV فاخرة للرحلات الطويلة، وميكروباص هاي إس 14 راكب للمجموعات والشركات. جميع السيارات موديلات حديثة بها تكييف قوي، حزام أمان لكل راكب، وأنظمة صوت وشحن للجوال.",
        },
        {
          heading: "المناطق التي نغطيها من وإلى الفيوم",
          body:
            "نوفر رحلات من الفيوم إلى القاهرة، الجيزة، أكتوبر، الشيخ زايد، العاصمة الإدارية، الإسكندرية، الساحل الشمالي، العين السخنة، الغردقة، شرم الشيخ، بني سويف، والمنيا. داخل الفيوم نصل إلى سنورس، إطسا، أبشواي، طامية، ويوسف الصديق، بالإضافة إلى مواقع سياحية مثل بحيرة قارون ووادي الريان.",
        },
        {
          heading: "كيف تحجز رحلتك في أقل من دقيقة",
          body:
            "الحجز مباشر عبر الاتصال أو واتساب. أخبرنا بموعد الرحلة، نقطة الانطلاق، الوجهة، وعدد الركاب، وسنؤكد لك السعر والسيارة فوراً. يمكنك أيضاً استخدام خريطة الموقع أدناه لتحديد نقطة الانطلاق بدقة.",
        },
      ],
      tips: [
        "احجز قبل الرحلة بـ 6 ساعات على الأقل لضمان توفر السيارة المناسبة.",
        "اطلب سعر الرحلة كتابياً على واتساب لتوثيق الاتفاق.",
        "حدد عدد الحقائب مسبقاً لاختيار السيارة المناسبة.",
        "للرحلات الليلية اطلب سائق معتاد على الطريق الصحراوي.",
      ],
      faqs: [
        { q: "هل الأسعار ثابتة أم متغيرة؟", a: "الأسعار ثابتة يتم الاتفاق عليها قبل الرحلة، بدون عداد ولا مفاجآت." },
        { q: "هل يمكن الدفع بعد انتهاء الرحلة؟", a: "نعم، الدفع كاش عند الوصول أو تحويل بنكي حسب اتفاقك مع فريق الحجز." },
        { q: "هل تتوفر الخدمة 24 ساعة؟", a: "نعم، خدمتنا متاحة على مدار 24 ساعة طوال أيام الأسبوع بما فيها العطلات." },
      ],
    },
    en: {
      title: "The Complete Fayoum Limousine Guide 2026",
      description:
        "Everything you need to know about limousine service in Fayoum: pricing, vehicle types, coverage areas, and how to book in minutes with professional 24/7 chauffeurs.",
      keywords: "Fayoum limousine, Fayoum Cairo limousine, Fayoum limo cars, limousine booking Egypt",
      intro:
        "Choosing a reliable limousine service in Fayoum saves you hours of searching and negotiating. This guide summarises everything you need to book with confidence: the vehicle classes available, indicative fares between cities, and time-saving tips that guarantee a safe, comfortable ride — whether you are travelling for business, tourism, or picking up guests from the airport.",
      sections: [
        {
          heading: "What is a Fayoum limousine and how does it differ from a taxi?",
          body:
            "A Fayoum limousine is a private chauffeur service using modern air-conditioned cars and drivers trained in safety and hospitality. It differs from a regular taxi in three key ways: rides are pre-booked at a fixed time, the price is agreed upfront with no surprise meter, and the vehicle is a VIP-class car with leather seats and generous room for passengers and luggage.",
          wiki: { label: "Faiyum on Wikipedia", url: "https://en.wikipedia.org/wiki/Faiyum" },
        },
        {
          heading: "Available vehicle types and capacity",
          body:
            "Our fleet includes 4-seater sedans for individuals and executives, 7-seater cars for families, luxury SUVs for long trips, and 14-seater Hiace minibuses for groups and corporate travel. Every vehicle is a recent model with strong A/C, seat belts for each passenger, and audio and phone-charging systems.",
        },
        {
          heading: "Areas we cover to and from Fayoum",
          body:
            "We provide trips from Fayoum to Cairo, Giza, 6th of October, Sheikh Zayed, the New Administrative Capital, Alexandria, the North Coast, Ain Sokhna, Hurghada, Sharm El Sheikh, Beni Suef, and Minya. Inside Fayoum we serve Senores, Etsa, Ibshway, Tamiya, and Yusuf Al Seddik, plus tourist landmarks such as Lake Qarun and Wadi El Rayan.",
        },
        {
          heading: "How to book your ride in under a minute",
          body:
            "Booking is direct by phone or WhatsApp. Share the date and time, pickup point, destination, and passenger count, and we will confirm the price and car immediately. You can also use the map on our site to pin the pickup location precisely.",
        },
      ],
      tips: [
        "Book at least 6 hours in advance to secure the right car.",
        "Ask for the fare in writing on WhatsApp to document the agreement.",
        "Confirm luggage count upfront so we assign the right vehicle.",
        "For night trips, request a driver experienced on the desert road.",
      ],
      faqs: [
        { q: "Are prices fixed or variable?", a: "Prices are fixed and agreed before the trip — no meter, no surprises." },
        { q: "Can I pay after the ride?", a: "Yes — pay cash on arrival or by bank transfer, whichever you arrange with our booking team." },
        { q: "Is the service available 24/7?", a: "Yes, we operate around the clock, every day of the week including holidays." },
      ],
    },
    relatedSlugs: ["fayoum-to-cairo-airport", "wadi-el-rayan-private-trip", "wedding-limousine-fayoum"],
  },
  {
    slug: "fayoum-to-cairo-airport",
    icon: "plane",
    hue: 55,
    ar: {
      title: "النقل من الفيوم إلى مطار القاهرة الدولي",
      description:
        "خدمة توصيل خاصة من الفيوم إلى مطار القاهرة الدولي على مدار الساعة: أسعار واضحة، سيارات مكيفة، متابعة رحلتك، ووصول قبل موعد الإقلاع بأمان تام.",
      keywords: "الفيوم مطار القاهرة, توصيل مطار من الفيوم, ليموزين مطار القاهرة الفيوم",
      intro:
        "الوصول إلى مطار القاهرة الدولي من الفيوم يتطلب حساب دقيق للوقت وسائق يعرف الطرق البديلة عند الازدحام. رحلة تستغرق عادة ساعتين إلى ساعتين ونصف حسب حالة الطريق الصحراوي والدائري. في هذا الدليل نشرح كل شيء يخص التوصيل من الفيوم للمطار: من متى تنطلق، إلى مدخل المطار المناسب لرحلتك.",
      sections: [
        {
          heading: "المسافة والوقت المتوقع",
          body:
            "المسافة من مدينة الفيوم إلى مطار القاهرة الدولي تقارب 130 كيلومتراً عبر الطريق الصحراوي ثم الدائري. الوقت المتوقع من ساعة و45 دقيقة إلى ساعتين ونصف. ننصح بالانطلاق قبل موعد الإقلاع بـ 5 ساعات للرحلات الدولية، و3 ساعات للرحلات الداخلية.",
          wiki: { label: "مطار القاهرة الدولي — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/مطار_القاهرة_الدولي" },
        },
        {
          heading: "مباني المطار الثلاثة: أيها وجهتك؟",
          body:
            "المطار يضم مبنى 1 لرحلات مصر للطيران الداخلية وبعض الشركات، مبنى 2 لرحلات مصر للطيران الدولية وشركاء ستار أليانس، ومبنى 3 لباقي الرحلات الدولية. أخبر سائقك برقم المبنى مسبقاً لتوفير 15 دقيقة عند الوصول.",
        },
        {
          heading: "خدمة الاستقبال بعد الهبوط (Meet & Greet)",
          body:
            "نوفر خدمة انتظار مجانية حتى 60 دقيقة بعد هبوط رحلتك، مع لوحة اسم عند بوابة الوصول، ومساعدة في حمل الحقائب حتى السيارة. متابعة رحلتك تتم عبر أرقام الرحلة قبل الحجز.",
        },
      ],
      tips: [
        "شارك سائقك برقم رحلتك ليتابع مواعيد الإقلاع والهبوط.",
        "احتفظ بنسخة رقمية من تذكرتك على الجوال لتسريع دخول المطار.",
        "لرحلات الفجر احجز قبل موعد الرحلة بـ 24 ساعة على الأقل.",
      ],
      faqs: [
        { q: "كم تكلفة التوصيل من الفيوم للمطار؟", a: "تحدد التكلفة حسب نوع السيارة والوقت — اتصل بنا للحصول على عرض فوري." },
        { q: "هل توفرون سيارة للمجموعات الكبيرة؟", a: "نعم، ميكروباص هاي إس 14 راكب متاح مع مكان واسع للحقائب." },
        { q: "ماذا لو تأخرت رحلتي؟", a: "نتابع رقم رحلتك ونعدل موعد الاستقبال تلقائياً بدون رسوم إضافية." },
      ],
    },
    en: {
      title: "Fayoum to Cairo International Airport Transfer",
      description:
        "24/7 private transfers from Fayoum to Cairo International Airport: transparent pricing, air-conditioned cars, flight tracking, and stress-free arrivals before takeoff.",
      keywords: "Fayoum to Cairo airport, airport transfer Fayoum, Cairo airport limousine Fayoum",
      intro:
        "Reaching Cairo International Airport from Fayoum takes precise timing and a driver who knows the alternate routes when traffic builds up. The trip usually takes 2 to 2.5 hours depending on the desert road and Ring Road conditions. This guide covers everything about a Fayoum-to-CAI transfer: when to leave and which terminal fits your flight.",
      sections: [
        {
          heading: "Distance and expected duration",
          body:
            "The distance from Fayoum City to Cairo International Airport is roughly 130 km via the desert road and Ring Road. Expected drive time ranges from 1h 45m to 2h 30m. We recommend leaving 5 hours before departure for international flights and 3 hours for domestic flights.",
          wiki: { label: "Cairo International Airport — Wikipedia", url: "https://en.wikipedia.org/wiki/Cairo_International_Airport" },
        },
        {
          heading: "The three terminals — which one is yours?",
          body:
            "The airport has Terminal 1 for EgyptAir domestic flights and some other carriers, Terminal 2 for EgyptAir international and Star Alliance partners, and Terminal 3 for the rest of international traffic. Share your terminal number with the driver in advance to save 15 minutes on arrival.",
        },
        {
          heading: "Meet & Greet after landing",
          body:
            "We offer free waiting for up to 60 minutes after your flight lands, a name sign at the arrivals gate, and luggage assistance to the car. We track your flight using the flight number supplied at booking.",
        },
      ],
      tips: [
        "Share your flight number so we track departures and arrivals.",
        "Keep a digital copy of your ticket on your phone for faster airport entry.",
        "For dawn flights, book at least 24 hours ahead.",
      ],
      faqs: [
        { q: "How much is the Fayoum-to-airport transfer?", a: "The fare depends on the vehicle class and time of day — call us for an instant quote." },
        { q: "Do you have vehicles for large groups?", a: "Yes — a 14-seater Hiace minibus with generous luggage space is available." },
        { q: "What if my flight is delayed?", a: "We track your flight number and reschedule the pickup automatically at no extra charge." },
      ],
    },
    relatedSlugs: ["limousine-fayoum-complete-guide", "business-executive-fayoum", "airport-meet-greet-tips"],
  },
  {
    slug: "wadi-el-rayan-private-trip",
    icon: "water",
    hue: 40,
    ar: {
      title: "رحلة وادي الريان بسيارة خاصة من الفيوم",
      description:
        "خطط رحلتك إلى محمية وادي الريان الطبيعية بسيارة خاصة مريحة من الفيوم، مع أفضل مواعيد الزيارة، ونصائح للشلالات والبحيرات ومغامرات السفاري.",
      keywords: "وادي الريان, رحلة وادي الريان, ليموزين الفيوم رحلات, محمية وادي الريان",
      intro:
        "محمية وادي الريان الطبيعية جوهرة الفيوم البيئية، تضم بحيرتين وشلالات نادرة وسط الصحراء. الوصول لها براحة يحتاج سيارة خاصة تعرف الطرق الداخلية غير الممهدة. في هذا الدليل نأخذك في جولة مخطط لها من الفيوم حتى قلب المحمية.",
      sections: [
        {
          heading: "لماذا وادي الريان وجهة استثنائية؟",
          body:
            "المحمية أُعلنت محمية طبيعية عام 1989 وتضم البحيرة العليا والسفلى، الشلالات الوحيدة في محافظات الوجه القبلي، ومنطقة العيون الكبريتية، بالإضافة إلى تلال متحجرات بحرية عمرها ملايين السنين تصلح لعشاق التصوير والاستكشاف.",
          wiki: { label: "وادي الريان — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/وادي_الريان" },
        },
        {
          heading: "أفضل مواعيد الزيارة",
          body:
            "الفترة المثالية بين نوفمبر وأبريل حيث الطقس معتدل. تجنب الزيارة صيفاً خصوصاً وقت الظهيرة. جمعة أي أسبوع في الشتاء تشهد إقبالاً كبيراً؛ إن كنت تفضل الهدوء اختر يوماً بين الأحد والخميس.",
        },
        {
          heading: "خط سير مقترح ليوم واحد",
          body:
            "8 صباحاً انطلاق من الفيوم، 9:30 وصول بوابة المحمية، 10:00 الشلالات، 11:30 البحيرة السفلى للتصوير، 1:00 غداء في أحد المقاهي المطلة، 2:30 عيون الكبريت، 4:00 عودة إلى الفيوم. المسافة الإجمالية بالسيارة قرابة 180 كم داخل المحمية والعودة.",
        },
      ],
      tips: [
        "خذ معك مياه إضافية وواقي شمس.",
        "المحمية بها إشارة اتصال ضعيفة — نبه عائلتك مسبقاً.",
        "ارتدِ حذاءً مريحاً للسير على الرمال والصخور.",
        "احترم قواعد المحمية ولا ترمِ مخلفات.",
      ],
      faqs: [
        { q: "هل يمكن السباحة في الشلالات؟", a: "غير مسموح بالسباحة لحماية النظام البيئي." },
        { q: "كم تكلفة دخول المحمية؟", a: "رسوم رمزية للمصريين وأعلى قليلاً للأجانب — تُحصل عند البوابة." },
        { q: "هل الطريق مناسب للسيدان؟", a: "الطريق الرئيسي معبد، وبعض المسارات الداخلية تفضل معها SUV." },
      ],
    },
    en: {
      title: "Wadi El Rayan Private Day Trip from Fayoum",
      description:
        "Plan your visit to Wadi El Rayan Protected Area with a comfortable private car from Fayoum: best times to go, waterfall and lake tips, and safari-style desert adventures.",
      keywords: "Wadi El Rayan, Wadi El Rayan tour, Fayoum private trips, Wadi El Rayan protected area",
      intro:
        "Wadi El Rayan Protected Area is Fayoum's ecological gem — two lakes and rare desert waterfalls in the middle of the Sahara. Getting there comfortably needs a private car whose driver knows the unpaved inner tracks. This guide walks you through a well-planned day from Fayoum to the heart of the reserve.",
      sections: [
        {
          heading: "Why Wadi El Rayan is exceptional",
          body:
            "The reserve was declared protected in 1989. It contains the Upper and Lower Lakes, the only waterfalls in Upper Egypt's governorates, sulphur springs, and hills of marine fossils millions of years old — a paradise for photographers and explorers.",
          wiki: { label: "Wadi El Rayan — Wikipedia", url: "https://en.wikipedia.org/wiki/Wadi_El_Rayan" },
        },
        {
          heading: "Best times to visit",
          body:
            "The ideal window is November to April, when the weather is mild. Avoid summer visits, especially midday. Winter Fridays get very busy; for a quieter experience choose Sunday through Thursday.",
        },
        {
          heading: "Suggested one-day itinerary",
          body:
            "8:00 depart Fayoum, 9:30 reach the reserve gate, 10:00 waterfalls, 11:30 Lower Lake photo stop, 13:00 lunch at a lakefront café, 14:30 sulphur springs, 16:00 head back to Fayoum. Total driving distance is around 180 km round trip.",
        },
      ],
      tips: [
        "Bring extra water and sunscreen.",
        "Signal inside the reserve is weak — inform your family in advance.",
        "Wear comfortable shoes for sand and rocks.",
        "Respect reserve rules and leave no litter.",
      ],
      faqs: [
        { q: "Is swimming allowed at the waterfalls?", a: "No, swimming is prohibited to protect the ecosystem." },
        { q: "How much is the entry fee?", a: "A modest fee for Egyptians and slightly higher for foreign visitors, collected at the gate." },
        { q: "Is the road suitable for a sedan?", a: "The main road is paved; some inner tracks are better with an SUV." },
      ],
    },
    relatedSlugs: ["lake-qarun-day-tour", "tunis-village-visit", "wadi-el-hitan-tour"],
  },
  {
    slug: "lake-qarun-day-tour",
    icon: "sun",
    hue: 50,
    ar: {
      title: "جولة يوم كامل حول بحيرة قارون",
      description:
        "دليل رحلة يومية إلى بحيرة قارون: أفضل نقاط المشاهدة، المطاعم المطلة، رحلات القوارب، ومواقيت غروب لن تنساها — كل ذلك بسيارة خاصة من الفيوم.",
      keywords: "بحيرة قارون, رحلة بحيرة قارون, ليموزين الفيوم بحيرة قارون",
      intro:
        "بحيرة قارون واحدة من أقدم البحيرات الطبيعية في العالم، تحيط بها قرى صيادين وفنادق تراثية. جولة يوم كامل حولها تجربة تستحق التخطيط: صباح للطبيعة، ظهر لوجبة سمك طازج، ومساء لغروب ذهبي على المياه.",
      sections: [
        {
          heading: "أهمية بحيرة قارون تاريخياً",
          body:
            "البحيرة بقايا بحيرة موريس القديمة التي ذكرها هيرودوت. مساحتها تقارب 230 كم². تضم أنواعاً نادرة من الطيور المهاجرة شتاءً مما يجعلها مقصداً لعشاق مراقبة الطيور.",
          wiki: { label: "بحيرة قارون — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/بحيرة_قارون" },
        },
        {
          heading: "أفضل نقاط المشاهدة والمطاعم",
          body:
            "الشاطئ الشمالي يضم الفنادق التراثية والمطاعم العائمة. جرب سمك البلطي المشوي وسمك موسى المقلي. عند الغروب اذهب للشاطئ الجنوبي لالتقاط أفضل الصور بعيداً عن الازدحام.",
        },
        {
          heading: "رحلات القوارب وأنشطة المياه",
          body:
            "متاح استئجار قوارب صغيرة بأسعار مناسبة لجولة نصف ساعة. اختر قارب بسائق محلي يعرف مناطق الطيور والصيادين التقليديين — تجربة غنية للعائلات ومحبي التصوير.",
        },
      ],
      tips: [
        "أفضل توقيت وصول 10 صباحاً وعودة بعد الغروب.",
        "احضر جاكيت خفيف حتى صيفاً لأن الهواء على البحيرة أبرد.",
        "اسأل عن سعر القارب قبل الركوب.",
      ],
      faqs: [
        { q: "كم تبعد البحيرة عن مدينة الفيوم؟", a: "قرابة 25 كم شمالاً، الوصول في 30 دقيقة تقريباً." },
        { q: "هل يوجد أماكن للأطفال؟", a: "بعض المطاعم بها ملاعب صغيرة ومساحات آمنة." },
      ],
    },
    en: {
      title: "Full-Day Tour Around Lake Qarun",
      description:
        "Your day-trip guide to Lake Qarun: best viewpoints, waterfront restaurants, boat rides, and unforgettable sunsets — all with a private car from Fayoum.",
      keywords: "Lake Qarun, Lake Qarun tour, Fayoum Lake Qarun limousine",
      intro:
        "Lake Qarun is one of the oldest natural lakes on Earth, ringed by fishing villages and heritage hotels. A full day around it rewards planning: nature in the morning, fresh fish at midday, and a golden sunset on the water in the evening.",
      sections: [
        {
          heading: "Why Lake Qarun matters historically",
          body:
            "The lake is the remnant of ancient Lake Moeris, mentioned by Herodotus. It covers roughly 230 km² and hosts rare migratory birds in winter, making it a magnet for birdwatchers.",
          wiki: { label: "Lake Qarun — Wikipedia", url: "https://en.wikipedia.org/wiki/Lake_Qarun" },
        },
        {
          heading: "Best viewpoints and restaurants",
          body:
            "The northern shore hosts heritage hotels and floating restaurants. Try grilled tilapia and pan-fried sole. At sunset head to the southern shore for the best photos, well away from the crowds.",
        },
        {
          heading: "Boat rides and water activities",
          body:
            "Small boats are available for a modest fare on a half-hour tour. Pick a boat with a local skipper who knows the bird areas and traditional fishermen — a rich outing for families and photographers.",
        },
      ],
      tips: [
        "Best arrival is 10 a.m., returning after sunset.",
        "Bring a light jacket even in summer — the air on the lake is cooler.",
        "Agree on the boat fare before boarding.",
      ],
      faqs: [
        { q: "How far is the lake from Fayoum City?", a: "About 25 km north — roughly 30 minutes by car." },
        { q: "Are there kid-friendly spots?", a: "Some restaurants offer small play areas and safe zones." },
      ],
    },
    relatedSlugs: ["wadi-el-rayan-private-trip", "tunis-village-visit", "wadi-el-hitan-tour"],
  },
  {
    slug: "tunis-village-visit",
    icon: "palm",
    hue: 35,
    ar: {
      title: "زيارة قرية تونس الفيوم — دليل عاشق الفن",
      description:
        "قرية تونس عاصمة الفخار في الفيوم: ورش الخزف، النزل البيئية، والمعالم الفنية — دليل زيارة كامل مع خدمة توصيل خاصة مريحة.",
      keywords: "قرية تونس, قرية تونس الفيوم, رحلة قرية تونس, فخار تونس الفيوم",
      intro:
        "قرية تونس على شاطئ بحيرة قارون تحولت خلال عقود إلى مجتمع فني عالمي محوره الفخار والفن التشكيلي. زيارتها تجربة هادئة مختلفة تماماً عن روتين المدن.",
      sections: [
        {
          heading: "بداية قصة الفخار في تونس",
          body:
            "بدأت التجربة في السبعينيات على يد فنانة سويسرية عاشت في القرية وأسست ورشة لتعليم الأطفال صناعة الفخار. اليوم تضم القرية عشرات الورش النشطة.",
          wiki: { label: "قرية تونس — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/تونس_(قرية_مصرية)" },
        },
        {
          heading: "ماذا تشاهد وتشتري",
          body:
            "زُر ورش الخزف المفتوحة للجمهور، وشاهد الحرفيين وهم يشكلون الطين. أسعار القطع تبدأ من المخفف جداً حتى القطع الفنية الفاخرة. تجنب الشراء من أول ورشة — قارن قبل القرار.",
        },
        {
          heading: "أين تنام إذا أردت المبيت",
          body:
            "القرية تضم نزلاً بيئية جميلة بأسعار متفاوتة. للاسترخاء لليلة أو ليلتين، احجز مسبقاً في مواسم الذروة (نوفمبر إلى مارس).",
        },
      ],
      tips: [
        "أوقات الورش مرنة — اسأل مسبقاً عن جدول العروض.",
        "الطرق داخل القرية ترابية، ارتدِ حذاءً مناسباً.",
        "شراء الفخار الكبير يحتاج تغليف جيد للنقل.",
      ],
      faqs: [
        { q: "هل تناسب الأطفال؟", a: "نعم، بعض الورش تقدم جلسات تعليمية للصغار." },
        { q: "كم تبعد عن مدينة الفيوم؟", a: "قرابة 40 كم، ساعة بالسيارة تقريباً." },
      ],
    },
    en: {
      title: "Tunis Village Fayoum — An Art-Lover's Guide",
      description:
        "Tunis Village, Fayoum's pottery capital: ceramic workshops, eco-lodges, and art landmarks — a complete visitor guide with a comfortable private transfer.",
      keywords: "Tunis Village, Tunis Village Fayoum, Tunis Village tour, Fayoum pottery",
      intro:
        "Tunis Village, on the shore of Lake Qarun, has grown over decades into a world-class artistic community centred on pottery and visual art. Visiting it is a quiet, thoroughly different experience from big-city routines.",
      sections: [
        {
          heading: "How the pottery story began",
          body:
            "It started in the 1970s with a Swiss artist who settled in the village and opened a workshop to teach local children to work with clay. Today the village hosts dozens of active studios.",
          wiki: { label: "Tunis, Egypt — Wikipedia", url: "https://en.wikipedia.org/wiki/Tunis,_Egypt" },
        },
        {
          heading: "What to see and buy",
          body:
            "Visit the workshops open to the public and watch the artisans shape the clay. Prices range from very affordable pieces to fine art works. Don't buy at the first workshop — compare before deciding.",
        },
        {
          heading: "Where to stay overnight",
          body:
            "The village has beautiful eco-lodges at varied price points. For a night or two of unwinding, book ahead during high season (November to March).",
        },
      ],
      tips: [
        "Workshop hours are flexible — ask ahead about the day's schedule.",
        "Roads inside the village are dirt — wear suitable shoes.",
        "Large pottery needs careful packing for transport.",
      ],
      faqs: [
        { q: "Is it kid-friendly?", a: "Yes — several workshops offer learning sessions for children." },
        { q: "How far is it from Fayoum City?", a: "About 40 km — roughly one hour by car." },
      ],
    },
    relatedSlugs: ["lake-qarun-day-tour", "wadi-el-rayan-private-trip", "wadi-el-hitan-tour"],
  },
  {
    slug: "wadi-el-hitan-tour",
    icon: "compass",
    hue: 30,
    ar: {
      title: "رحلة وادي الحيتان — تراث اليونسكو في الفيوم",
      description:
        "وادي الحيتان أحد مواقع التراث العالمي: أحافير حيتان عمرها 40 مليون سنة وسط الصحراء. دليل زيارة كامل بسيارة خاصة من الفيوم مع خط سير موصى به.",
      keywords: "وادي الحيتان, تراث الفيوم اليونسكو, رحلة وادي الحيتان",
      intro:
        "وادي الحيتان في محمية وادي الريان يحتضن أهم مقبرة للحيتان في العالم. اليونسكو أدرجت الموقع ضمن التراث الطبيعي العالمي عام 2005 لقيمته العلمية الفريدة.",
      sections: [
        {
          heading: "ما الذي يجعل الوادي مميزاً؟",
          body:
            "يحوي الوادي هياكل عظمية شبه كاملة لحيتان بدائية أظهرت مرحلة تحولها من الحياة البرية إلى البحرية. الأحافير مكشوفة في الهواء الطلق ضمن مسار مرقّم للزوار.",
          wiki: { label: "وادي الحيتان — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/وادي_الحيتان" },
        },
        {
          heading: "المسار الموصى به",
          body:
            "المسار المخصص للزوار طوله كيلومتر ونصف بين الأحافير مع لوحات إرشادية. يوجد متحف صغير عند المدخل يعرض نماذج مصغرة تشرح تطور الحيتان.",
        },
        {
          heading: "متى تزور ومع من",
          body:
            "الشتاء والربيع فقط. تجنب الرياح المحملة بالرمال. الرحلة مناسبة للعائلات ومحبي العلوم والتصوير — لكنها غير مناسبة لمن يعانون من صعوبة في المشي على الرمال.",
        },
      ],
      tips: [
        "احمل ماء وقبعة وواقي شمس بكثرة.",
        "التصوير مسموح بدون فلاش قرب الأحافير.",
        "لا تقترب من الأحافير أو تلمسها.",
      ],
      faqs: [
        { q: "كم تكلفة تذكرة الدخول؟", a: "رسوم رمزية للمصريين وأعلى للأجانب، تتغير حسب سياسات الوزارة." },
        { q: "هل الطريق ممهد كاملاً؟", a: "الجزء الأخير رملي ويفضل سيارة دفع رباعي، ونحن نوفرها عند الطلب." },
      ],
    },
    en: {
      title: "Wadi El Hitan — UNESCO Heritage in Fayoum",
      description:
        "Wadi El Hitan (Valley of the Whales) is a UNESCO World Heritage site: 40-million-year-old whale fossils in the desert. A complete visitor guide with a private car from Fayoum and a recommended itinerary.",
      keywords: "Wadi El Hitan, Valley of the Whales, Fayoum UNESCO heritage, Wadi El Hitan tour",
      intro:
        "Wadi El Hitan, inside Wadi El Rayan reserve, holds the world's most important whale graveyard. UNESCO added the site to the World Natural Heritage list in 2005 for its unique scientific value.",
      sections: [
        {
          heading: "What makes the valley special",
          body:
            "The valley preserves nearly complete skeletons of primitive whales that document their transition from land to sea. The fossils are displayed in the open air along a numbered visitor trail.",
          wiki: { label: "Wadi El Hitan — Wikipedia", url: "https://en.wikipedia.org/wiki/Wadi_Al-Hitan" },
        },
        {
          heading: "The recommended trail",
          body:
            "The visitor loop is roughly 1.5 km among the fossils with interpretive panels. A small museum at the entrance shows scale models explaining whale evolution.",
        },
        {
          heading: "When to visit and with whom",
          body:
            "Winter and spring only. Avoid sand-laden winds. The trip suits families and lovers of science and photography, but is not ideal for anyone with difficulty walking on sand.",
        },
      ],
      tips: [
        "Carry plenty of water, a hat, and sunscreen.",
        "Flash-free photography is allowed near the fossils.",
        "Do not approach or touch the fossils.",
      ],
      faqs: [
        { q: "How much is the entry ticket?", a: "A modest fee for Egyptians and higher for foreign visitors, subject to ministry policy." },
        { q: "Is the road fully paved?", a: "The final stretch is sandy; a 4x4 is preferred and we provide one on request." },
      ],
    },
    relatedSlugs: ["wadi-el-rayan-private-trip", "lake-qarun-day-tour", "tunis-village-visit"],
  },
  {
    slug: "fayoum-to-alexandria-limousine",
    icon: "road",
    hue: 60,
    ar: {
      title: "من الفيوم إلى الإسكندرية بالليموزين",
      description:
        "دليل رحلة الفيوم إلى الإسكندرية بسيارة خاصة: المسار الأنسب، مدة الرحلة، أسعار تقريبية، ومحطات استراحة مقترحة على الطريق الصحراوي.",
      keywords: "الفيوم الإسكندرية, ليموزين الإسكندرية من الفيوم, رحلة الإسكندرية الفيوم",
      intro:
        "المسافة بين الفيوم والإسكندرية طويلة نسبياً لكنها ممتعة بسيارة مريحة وسائق محترف. الرحلة تستغرق بين 4 و5 ساعات حسب مسار الطريق الصحراوي أو الزراعي.",
      sections: [
        {
          heading: "المسار الأنسب: صحراوي أم زراعي؟",
          body:
            "الطريق الصحراوي أسرع وأكثر أماناً، بينما الزراعي أطول لكنه يمر بمدن ومحطات خدمة. اختيار المسار يعتمد على وقت انطلاقك وحالة الطرق.",
          wiki: { label: "الإسكندرية — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/الإسكندرية" },
        },
        {
          heading: "محطات استراحة موصى بها",
          body:
            "على الطريق الصحراوي محطات وقود ومطاعم كل 60 كم تقريباً. أشهرها منطقة كم 101 ومحطة العلمين الجديدة. خطط توقفاً كل ساعتين.",
        },
        {
          heading: "أفكار لرحلة عائلية ممتعة",
          body:
            "اجمع رحلة يوم في الإسكندرية بين الكورنيش، قلعة قايتباي، ومكتبة الإسكندرية. للعائلات: خصص فندقاً قرب المنتزه لاختصار المسافات داخل المدينة.",
        },
      ],
      tips: [
        "انطلق مبكراً قبل السابعة صباحاً لتفادي الازدحام.",
        "شحن كاميرا الجوال وتحضير بلاي ليست موسيقى للطريق.",
        "احجز مبيتاً مسبقاً في الصيف بسبب الإقبال.",
      ],
      faqs: [
        { q: "هل السعر ذهاباً وإياباً أوفر؟", a: "نعم عادة، اطلب باقة ذهاب وعودة موحدة." },
        { q: "هل تناسب رحلة يوم واحد؟", a: "ممكن، لكن الإقامة ليلة تعطي وقتاً أفضل لاستمتاع بالمدينة." },
      ],
    },
    en: {
      title: "Fayoum to Alexandria by Limousine",
      description:
        "Your guide to a Fayoum-to-Alexandria private-car trip: best route, drive time, indicative pricing, and recommended rest stops along the desert road.",
      keywords: "Fayoum to Alexandria, Alexandria limousine from Fayoum, Alexandria Fayoum trip",
      intro:
        "The distance between Fayoum and Alexandria is fairly long but pleasant in a comfortable car with a professional driver. The trip takes 4 to 5 hours depending on whether you choose the desert road or the agricultural road.",
      sections: [
        {
          heading: "Best route: desert or agricultural?",
          body:
            "The desert road is faster and safer; the agricultural road is longer but passes through towns and service stations. Your choice depends on departure time and road conditions.",
          wiki: { label: "Alexandria — Wikipedia", url: "https://en.wikipedia.org/wiki/Alexandria" },
        },
        {
          heading: "Recommended rest stops",
          body:
            "On the desert road, fuel stations and restaurants appear roughly every 60 km. The best known are the Km 101 area and the New Alamein station. Plan a break every two hours.",
        },
        {
          heading: "Ideas for a fun family day",
          body:
            "Combine a day in Alexandria: the Corniche, Qaitbay Citadel, and the Library of Alexandria. For families, pick a hotel near Montazah to shorten travel inside the city.",
        },
      ],
      tips: [
        "Set off early — before 7 a.m. — to avoid congestion.",
        "Charge your phone camera and prep a road playlist.",
        "Book accommodation ahead in summer, when demand is high.",
      ],
      faqs: [
        { q: "Is a round-trip package cheaper?", a: "Usually yes — ask for a combined outbound-and-return quote." },
        { q: "Is a one-day trip realistic?", a: "It's possible, but one overnight gives you far more time to enjoy the city." },
      ],
    },
    relatedSlugs: ["fayoum-to-hurghada-limousine", "limousine-fayoum-complete-guide", "business-executive-fayoum"],
  },
  {
    slug: "fayoum-to-hurghada-limousine",
    icon: "wheel",
    hue: 25,
    ar: {
      title: "من الفيوم إلى الغردقة بسيارة خاصة",
      description:
        "خدمة نقل خاصة من الفيوم إلى الغردقة على البحر الأحمر: مسار الرحلة، مدة السفر المتوقعة، والاستعداد لسفر طويل مريح وآمن للعائلات والمجموعات.",
      keywords: "الفيوم الغردقة, ليموزين الغردقة من الفيوم, رحلة الغردقة",
      intro:
        "الغردقة وجهة سياحية مفضلة على البحر الأحمر. رحلة السيارة من الفيوم إليها تستغرق حوالي 6 إلى 7 ساعات وتحتاج تخطيطاً جيداً وسائقاً معتاداً على مسارات الجبل الشرقي.",
      sections: [
        {
          heading: "المسار المفضل والمدة",
          body:
            "الرحلة تمر عبر بني سويف ثم طريق الزعفرانة/الغردقة الساحلي. المسار الطبيعي يستغرق قرابة 550 كم. ننصح بالتحرك قبل الفجر لاستقبال شروق الشمس على الجبل.",
          wiki: { label: "الغردقة — ويكيبيديا", url: "https://ar.wikipedia.org/wiki/الغردقة" },
        },
        {
          heading: "ما يجب تجهيزه قبل الانطلاق",
          body:
            "زجاجات مياه، وجبات خفيفة، شاحن جوال، عدة إسعافات أولية، ونظارة شمسية. للأطفال مقاعد أمان مخصصة نوفرها عند الطلب.",
        },
        {
          heading: "خيارات إقامة موصى بها",
          body:
            "الغردقة تضم فنادق لكل الفئات من إيكونومي إلى فاخر جداً. مناطق الممشى (Marina) هادئة وتناسب العائلات، بينما السقالة أكثر حيوية.",
        },
      ],
      tips: [
        "خطط توقفاً كل ساعتين على أقصى تقدير.",
        "لا تعتمد على GPS فقط — احفظ نقاط الطريق في ملاحظاتك.",
        "احتفظ بأرقام طوارئ خدمات الطريق.",
      ],
      faqs: [
        { q: "هل الطريق آمن ليلاً؟", a: "الأمان جيد لكن ننصح بالسفر نهاراً لظهور الحيوانات البرية أحياناً." },
        { q: "كم تكلفة الرحلة؟", a: "تحدد حسب نوع السيارة وعدد الأيام — اطلب عرضاً مخصصاً." },
      ],
    },
    en: {
      title: "Fayoum to Hurghada by Private Car",
      description:
        "Private transfers from Fayoum to Hurghada on the Red Sea: route, expected drive time, and how to prepare for a long, comfortable, and safe ride for families and groups.",
      keywords: "Fayoum to Hurghada, Hurghada limousine from Fayoum, Hurghada trip",
      intro:
        "Hurghada is a favourite Red Sea destination. The drive from Fayoum takes about 6 to 7 hours and needs careful planning and a driver familiar with the Eastern Mountain routes.",
      sections: [
        {
          heading: "Preferred route and duration",
          body:
            "The trip passes through Beni Suef then the Zafarana / Hurghada coastal road. The natural route is around 550 km. We recommend leaving before dawn to catch sunrise over the mountains.",
          wiki: { label: "Hurghada — Wikipedia", url: "https://en.wikipedia.org/wiki/Hurghada" },
        },
        {
          heading: "What to prepare before you leave",
          body:
            "Water bottles, snacks, phone charger, a first-aid kit, and sunglasses. Child safety seats are available on request.",
        },
        {
          heading: "Recommended accommodation",
          body:
            "Hurghada has hotels for every budget from economy to ultra-luxury. The Marina area is quiet and family-friendly, while Sekalla is livelier.",
        },
      ],
      tips: [
        "Plan a break at least every two hours.",
        "Don't rely on GPS alone — note the waypoints in your notes.",
        "Keep roadside-emergency numbers handy.",
      ],
      faqs: [
        { q: "Is the road safe at night?", a: "Safety is good, but we recommend daytime travel — wild animals occasionally cross the road." },
        { q: "How much is the trip?", a: "It depends on vehicle class and number of days — ask for a custom quote." },
      ],
    },
    relatedSlugs: ["fayoum-to-alexandria-limousine", "limousine-fayoum-complete-guide", "business-executive-fayoum"],
  },
  {
    slug: "wedding-limousine-fayoum",
    icon: "ring",
    hue: 65,
    ar: {
      title: "ليموزين الأفراح في الفيوم — إطلالة لا تُنسى",
      description:
        "دليل حجز ليموزين الأفراح في الفيوم: أنواع سيارات الزفاف، تنسيق الديكور، مواعيد الوصول، ونصائح للحصول على أفضل الصور في يومك المميز.",
      keywords: "ليموزين افراح الفيوم, سيارة زفاف الفيوم, حجز ليموزين للفرح",
      intro:
        "يوم الفرح لا يحتمل أي خطأ في التنسيق. اختيار سيارة الليموزين المناسبة يعكس ذوق العروسين ويضيف لمسة فخامة لصور اليوم. في هذا الدليل نشرح خطوات الاختيار الذكي.",
      sections: [
        {
          heading: "أفضل موديلات لسيارة الزفاف",
          body:
            "السيارات ذات الألوان الفاتحة (أبيض، فضي، شامبانيا) هي الأكثر طلباً. الموديلات الفاخرة مثل مرسيدس E-Class أو BMW الفئة الخامسة تعطي إطلالة راقية وصوراً لا تُنسى.",
        },
        {
          heading: "تنسيق الديكور والزهور",
          body:
            "نوفر تنسيق ورد طبيعي على الكابوت والمرايا وفق ذوق العروسين. تجنب المبالغة — التنسيق المعتدل أرقى في الصور. اطلب صوراً مسبقة للتصميم المقترح.",
        },
        {
          heading: "التوقيت والوصول",
          body:
            "خطط ليصل السائق قبل موعد التحرك بـ 45 دقيقة على الأقل. راجع مسار الفرح، أماكن التوقف للتصوير، ومكان الوصول النهائي (القاعة أو الفندق).",
        },
      ],
      tips: [
        "احجز قبل الفرح بأسبوعين على الأقل في المواسم.",
        "اتفق كتابياً على مسار الفرح وعدد ساعات الحجز.",
        "طلب سائق يرتدي زياً رسمياً بلا تكلفة إضافية.",
      ],
      faqs: [
        { q: "هل يمكن استئجار أكثر من سيارة؟", a: "نعم، نوفر أساطيل من 2 حتى 10 سيارات للحفلات الكبيرة." },
        { q: "هل تتضمن الخدمة تصويراً؟", a: "لا، لكن نوفر مصورين شركاء بأسعار متميزة عند الطلب." },
      ],
    },
    en: {
      title: "Wedding Limousine in Fayoum — An Unforgettable Arrival",
      description:
        "Your guide to booking a wedding limousine in Fayoum: bridal-car models, floral styling, arrival timing, and tips for the best photos on your special day.",
      keywords: "Fayoum wedding limousine, Fayoum bridal car, book wedding limousine",
      intro:
        "A wedding day leaves no room for logistical mistakes. Choosing the right limousine mirrors the couple's taste and adds a luxurious touch to the photographs. This guide walks you through the smart choices.",
      sections: [
        {
          heading: "Best models for a bridal car",
          body:
            "Light colours (white, silver, champagne) are most requested. Premium models such as the Mercedes E-Class or BMW 5 Series create a refined look and unforgettable pictures.",
        },
        {
          heading: "Floral and decor styling",
          body:
            "We provide fresh floral styling on the bonnet and side mirrors to the couple's taste. Avoid over-styling — a balanced arrangement photographs more elegantly. Ask for reference photos of the proposed design.",
        },
        {
          heading: "Timing and arrival",
          body:
            "Have the driver arrive at least 45 minutes before departure. Review the wedding route, photo stops, and the final destination (hall or hotel).",
        },
      ],
      tips: [
        "Book at least two weeks ahead during peak season.",
        "Confirm the route and reserved hours in writing.",
        "Request a driver in formal uniform at no extra cost.",
      ],
      faqs: [
        { q: "Can I hire more than one car?", a: "Yes — we offer fleets of 2 to 10 cars for large celebrations." },
        { q: "Is photography included?", a: "No, but we can recommend partner photographers at preferred rates on request." },
      ],
    },
    relatedSlugs: ["limousine-fayoum-complete-guide", "business-executive-fayoum", "airport-meet-greet-tips"],
  },
  {
    slug: "business-executive-fayoum",
    icon: "briefcase",
    hue: 20,
    ar: {
      title: "خدمة النقل التنفيذي لرجال الأعمال في الفيوم",
      description:
        "حلول نقل تنفيذية موثوقة لرجال الأعمال: سيارات مصنّفة VIP، سرية تامة، حجز مقعد يومي أو شهري، ومواعيد مضمونة لاجتماعاتك في القاهرة والفيوم.",
      keywords: "نقل رجال الأعمال الفيوم, ليموزين VIP, خدمة تنفيذية الفيوم",
      intro:
        "الوقت أثمن أصول رجل الأعمال. خدمة النقل التنفيذية توفر لك تركيزاً كاملاً على عملك أثناء التنقل، بدلاً من عبء القيادة أو ضياع الوقت في مواصلات غير موثوقة.",
      sections: [
        {
          heading: "ما يميز الخدمة التنفيذية؟",
          body:
            "سيارات جديدة، تكييف صامت، إنترنت 4G داخل السيارة، ماء بارد، وسائق يتقن السرية والالتزام بالمواعيد. تقارير رحلات شهرية للمحاسبة تُرسل بريدياً عند الطلب.",
        },
        {
          heading: "باقات الحجز الشهري",
          body:
            "نوفر باقات يومية وأسبوعية وشهرية بأسعار تفضيلية للعملاء الدائمين. الباقة الشهرية توفر حتى 25% مقارنة بالحجز الفردي، مع أولوية في الجدولة.",
        },
        {
          heading: "خصوصية بيانات العميل",
          body:
            "بيانات الرحلات والوجهات معاملة بسرية تامة. نوقع اتفاقيات NDA عند الطلب للشركات وأصحاب المناصب.",
        },
      ],
      tips: [
        "شارك جدول اجتماعاتك الأسبوعي مسبقاً لتحسين التخطيط.",
        "اطلب سائقاً ثابتاً كل الشهر لتوطيد التعامل.",
        "استخدم واتساب لتغييرات المواعيد الطارئة.",
      ],
      faqs: [
        { q: "هل تناسب المسؤولين والدبلوماسيين؟", a: "نعم، لدينا خبرة في تلبية بروتوكولات الشخصيات العامة." },
        { q: "هل الفواتير رسمية؟", a: "نعم، نصدر فواتير ضريبية مطابقة للنظام المصري." },
      ],
    },
    en: {
      title: "Executive Transport Service for Business Travellers in Fayoum",
      description:
        "Reliable executive transport for business travellers: VIP-class cars, full confidentiality, daily or monthly seat plans, and guaranteed timing for meetings in Cairo and Fayoum.",
      keywords: "Fayoum business transport, VIP limousine, Fayoum executive service",
      intro:
        "Time is a business traveller's most valuable asset. An executive transport service lets you focus on your work while moving, instead of driving yourself or losing time on unreliable transport.",
      sections: [
        {
          heading: "What sets executive service apart?",
          body:
            "New cars, silent A/C, in-car 4G internet, chilled water, and a driver who values discretion and punctuality. Monthly trip reports for accounting are emailed on request.",
        },
        {
          heading: "Monthly packages",
          body:
            "We offer daily, weekly, and monthly plans at preferential rates for regular clients. The monthly plan saves up to 25% vs. single bookings and includes scheduling priority.",
        },
        {
          heading: "Client data privacy",
          body:
            "Trip data and destinations are treated in full confidence. NDAs are signed on request for companies and public figures.",
        },
      ],
      tips: [
        "Share your weekly meeting schedule in advance to improve planning.",
        "Request the same driver each month to build a smooth working relationship.",
        "Use WhatsApp for last-minute schedule changes.",
      ],
      faqs: [
        { q: "Is it suitable for officials and diplomats?", a: "Yes — we have experience meeting the protocols of public figures." },
        { q: "Are invoices official?", a: "Yes — we issue tax invoices compliant with Egyptian regulations." },
      ],
    },
    relatedSlugs: ["limousine-fayoum-complete-guide", "fayoum-to-cairo-airport", "wedding-limousine-fayoum"],
  },
];

export const guidesBySlug: Record<string, Guide> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);
