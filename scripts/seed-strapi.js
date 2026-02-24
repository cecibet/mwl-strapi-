/**
 * Strapi Content Seed Script
 * Populates the Strapi PostgreSQL instance with content from midwestlabs.com
 *
 * Usage:
 *   STRAPI_URL=https://mwl-strapi-production.up.railway.app STRAPI_TOKEN=<token> node scripts/seed-strapi.js
 *
 * Pre-requisite:
 *   Generate a Full Access API token in Strapi Admin → Settings → API Tokens
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌  Missing STRAPI_TOKEN environment variable.');
  console.error('    Generate one at: <your-strapi-url>/admin → Settings → API Tokens');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

// ─── Helpers ────────────────────────────────────────────────────────────────

async function post(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌  POST /api/${endpoint} failed:`, JSON.stringify(json, null, 2));
    throw new Error(`POST /api/${endpoint} failed`);
  }
  return json.data.id;
}

async function put(endpoint, data) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌  PUT /api/${endpoint} failed:`, JSON.stringify(json, null, 2));
    throw new Error(`PUT /api/${endpoint} failed`);
  }
  return json.data;
}

function log(msg) {
  console.log(`  ✅  ${msg}`);
}

// ─── 1. Contact Info (single type) ─────────────────────────────────────────

async function seedContactInfo() {
  console.log('\n📋 Seeding Contact Info...');
  await put('contact-info', {
    address_line1: '13611 B Street',
    city: 'Omaha',
    state: 'Nebraska',
    zip: '68144',
    phone: '(402) 334-7770',
    fax: '(402) 334-9121',
    email: 'contactus@midwestlabs.com',
    survey_url: 'https://www.surveymonkey.com/r/ZW3ZWN3',
    hours_of_operation: 'Monday through Friday 8 am to 5 pm CST',
    holiday_notice:
      'We observe the following US holidays: New Year\'s Day, Memorial Day, Independence Day, Labor Day, Thanksgiving Day, and Christmas Day.',
  });
  log('Contact Info updated');
}

// ─── 2. Announcements (collection) ─────────────────────────────────────────

async function seedAnnouncements() {
  console.log('\n📢 Seeding Announcements...');
  const announcements = [
    {
      text: 'Create your MyLab Portal Account and start submitting samples',
      cta_label: 'LEARN MORE',
      cta_url: 'https://midwestlabs.com/get-started/create-mylab-account',
      is_active: true,
      sort_order: 1,
    },
    {
      text: 'Get ahead of Fall Soil Season with our in-depth sampling guides',
      cta_label: 'LEARN MORE',
      cta_url: 'https://midwestlabs.com/resources/product-sampling-guides',
      is_active: true,
      sort_order: 2,
    },
    {
      text: 'Learn the latest industry insights at our upcoming Agronomy Seminar',
      cta_label: 'LEARN MORE',
      cta_url: 'https://midwestlabs.com/agronomy',
      is_active: true,
      sort_order: 3,
    },
    {
      text: 'Midwest Labs partners with Biome Makers to offer BeCrop® DNA Analysis',
      cta_label: 'LEARN MORE',
      cta_url: 'https://midwestlabs.com/agronomy',
      is_active: true,
      sort_order: 4,
    },
    {
      text: '2025 Catalog of Analytical Services is Available',
      cta_label: 'VIEW HERE',
      cta_url: 'https://midwestlabs.com/browse-catalog',
      is_active: true,
      sort_order: 5,
    },
  ];

  const ids = [];
  for (const a of announcements) {
    const id = await post('announcements', a);
    ids.push(id);
    log(`Announcement: "${a.text.substring(0, 50)}..."`);
  }
  return ids;
}

// ─── 3. Industries (collection) ─────────────────────────────────────────────

async function seedIndustries() {
  console.log('\n🏭 Seeding Industries...');
  const industries = [
    {
      name: 'Agronomy',
      slug: 'agronomy',
      intro_text:
        'Midwest Laboratories has been the industry leader in providing expedient, reliable, and traceable analytical services for the agriculture industry for over 40 years. Knowing what is going on with your soil is the first step in creating high yielding, sustainable agriculture.',
      popular_analyses: [
        { text: 'Soil & Soil Health' },
        { text: 'Plant Tissue' },
        { text: 'Plant Parasitic Nematodes' },
        { text: 'Irrigation Water' },
        { text: 'Stalk Nitrate' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Agronomy Testing Services | Midwest Laboratories',
      seo_description:
        'Soil, plant tissue, nematode, and irrigation water testing services for agriculture. Industry leader for over 40 years.',
    },
    {
      name: 'Environmental',
      slug: 'environmental',
      intro_text:
        'Our environmental services include a wide range of tests for regulatory reporting and research, including testing for wastewater, underground storage tanks, concentrated animal feeding operations, groundwater and drinking water.',
      popular_analyses: [
        { text: 'Storm Water' },
        { text: 'Underground Storage Tanks' },
        { text: 'Groundwater Monitoring' },
        { text: 'Wastewater' },
        { text: 'Biosolids' },
        { text: 'Hazardous Waste' },
        { text: 'Drinking Water' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Environmental Testing Services | Midwest Laboratories',
      seo_description:
        'Environmental analysis for regulatory reporting and research: wastewater, drinking water, hazardous waste, biosolids, and more.',
    },
    {
      name: 'Nutrient Management',
      slug: 'nutrient-management',
      intro_text:
        'Our nutrient management testing helps farmers manage inputs while optimizing farm productivity and reducing nutrient loss. Our tests include soil testing, fertilizer testing, compost testing, biosolids land application and lime quality testing.',
      popular_analyses: [
        { text: 'Commercial & Organic Fertilizer' },
        { text: 'Animal Manure & Lagoon Water' },
        { text: 'Compost' },
        { text: 'Lime & Gypsum' },
        { text: 'Growth Media' },
        { text: 'Irrigation & Livestock Water' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Nutrient Management Testing | Midwest Laboratories',
      seo_description:
        'Fertilizer, manure, compost, and lime testing to optimize farm productivity and reduce nutrient loss.',
    },
    {
      name: 'Animal Nutrition',
      slug: 'animal-nutrition',
      intro_text:
        'We provide high-quality analytical and testing services for commercial livestock producers and commercial manufacturers. Our animal feed tests include testing for proximates and trace minerals, mycotoxins and mold, amino acids, starch content, vitamins, and more.',
      popular_analyses: [
        { text: 'Proximates & Minerals' },
        { text: 'Vitamins' },
        { text: 'Amino Acids' },
        { text: 'Shelf Life & Stability' },
        { text: 'Microbiology Screening' },
        { text: 'Allergens & GMOs' },
        { text: 'Mycotoxins' },
        { text: 'Nitrate' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Animal Nutrition Testing | Midwest Laboratories',
      seo_description:
        'Feed and pet food testing: proximates, minerals, vitamins, amino acids, mycotoxins, microbiology, and more.',
    },
    {
      name: 'Food & Ingredient',
      slug: 'food-ingredient',
      intro_text:
        'Our food and beverage tests support FSMA compliance and include nutritional labeling, shelf life testing, microbiology food screenings, allergen testing and GMO testing.',
      popular_analyses: [
        { text: 'Shelf Life Stability & Sensory' },
        { text: 'Allergens' },
        { text: 'Nutritional Labeling (Analytical & Database)' },
        { text: 'Pesticides' },
        { text: 'Meat Speciation' },
        { text: 'GMO Detection' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Food & Ingredient Testing | Midwest Laboratories',
      seo_description:
        'Food safety testing: FSMA compliance, nutritional labeling, shelf life, allergens, GMO detection, and microbiology.',
    },
    {
      name: 'Fuel',
      slug: 'fuel',
      intro_text:
        'We have been at the forefront of alternative fuel testing and distiller\'s dried grains with solubles (DDGS) and other ethanol co-products analysis. Our fuel tests include sulfate, chloride, and other speciation under ASTM D4806 for ethanol quality.',
      popular_analyses: [
        { text: 'Ethanol D4806' },
        { text: 'Ethanol Canada' },
        { text: 'Ethanol European' },
        { text: 'Ethanol E70-E85' },
        { text: 'Denaturant Testing' },
        { text: 'DDG (Distiller\'s Dried Grains)' },
        { text: 'Corn' },
        { text: 'Mycotoxins' },
      ],
      shipping_address: '13611 B Street, Omaha NE 68144',
      catalog_url: 'https://midwestlabs.com/browse-catalog',
      seo_title: 'Fuel Testing Services | Midwest Laboratories',
      seo_description:
        'Alternative fuel and ethanol co-products testing under ASTM D4806 and other industry standards.',
    },
  ];

  const idMap = {}; // name → id
  for (const industry of industries) {
    const id = await post('industries', industry);
    idMap[industry.name] = id;
    log(`Industry: ${industry.name} (id: ${id})`);
  }
  return idMap;
}

// ─── 4. Get Started Steps (collection) ──────────────────────────────────────

async function seedGetStartedSteps() {
  console.log('\n🚀 Seeding Get Started Steps...');
  const steps = [
    {
      step_number: 1,
      title: 'Pick Your Analysis Package',
      description:
        'Select from one of the many comprehensive analysis packages we\'ve prepared for every industry we serve. You can also browse our full analysis offerings in our Fee Schedule, broken out by industry. If you do not see a specific analysis you need, please email your account manager directly.',
      cta_label: 'Learn More',
      cta_url: 'https://midwestlabs.com/get-started/pick-analysis-package',
    },
    {
      step_number: 2,
      title: 'Complete Your Submittal Form',
      description:
        'Sending in proper submittal paperwork with your samples is required at Midwest Labs. Proper paperwork serves as a packing slip and ensures that your results are completed as accurately and efficiently as possible. To create your submittal form, follow the QuickStart Guide.',
      cta_label: 'Learn More',
      cta_url: 'https://midwestlabs.com/get-started/complete-submittal-form',
    },
    {
      step_number: 3,
      title: 'Mail Your Samples',
      description:
        'Once your samples are prepared, labeled, and boxed up with your submittal form, ship them to Midwest Labs at 13611 B Street, Omaha NE 68144. We also accept samples Monday through Friday from 8 am to 4 pm with local drop off, and a drop box is available at our main entrance for after hours.',
      cta_label: 'Learn More',
      cta_url: 'https://midwestlabs.com/get-started/mail-your-samples',
    },
    {
      step_number: 4,
      title: 'View Your Results',
      description:
        'You can view your analysis progress and completed results in your myLab Portal under View Reports. We will also email your completed results to you. After 30 days from your analysis testing, you will be invoiced. View and pay your invoice in the myLab Portal under View Invoices.',
      cta_label: 'Learn More',
      cta_url: 'https://midwestlabs.com/get-started/view-results',
    },
    {
      step_number: 5,
      title: 'Create Your myLab Portal Account',
      description:
        'To make your experience with Midwest Labs as seamless as possible, we ask that you create a myLab Portal Account. The myLab Portal is our online account management system and allows you to create submittal paperwork, view your results, and safely pay your monthly invoices.',
      cta_label: 'Learn More',
      cta_url: 'https://midwestlabs.com/get-started/create-mylab-account',
    },
  ];

  const ids = [];
  for (const step of steps) {
    const id = await post('get-started-steps', step);
    ids.push(id);
    log(`Step ${step.step_number}: ${step.title}`);
  }
  return ids;
}

// ─── 5. Videos (collection) ─────────────────────────────────────────────────

async function seedVideos() {
  console.log('\n🎥 Seeding Videos...');
  const videos = [
    {
      title: '2025 Agronomy Seminar',
      youtube_url: 'https://www.youtube.com/watch?v=GLLGFD66Pgk',
      description: 'Event featuring agronomy experts discussing the latest trends in agricultural testing and soil health.',
      published_date: '2025-10-27',
    },
    {
      title: 'Environmental Sampling Webinar',
      youtube_url: 'https://www.youtube.com/watch?v=8Gk7tRw8504',
      description: 'Water sampling best practices with our account manager and field supervisor.',
      published_date: '2025-10-27',
    },
    {
      title: 'MWL Minute - Fall Sampling',
      youtube_url: 'https://www.youtube.com/watch?v=FjLME2MPdOM',
      description: 'A field representative discusses fall soil sampling essentials and their importance for next season.',
      published_date: '2025-10-09',
    },
    {
      title: 'MyLab Portal Guide - Summer 2025 Updates',
      youtube_url: 'https://www.youtube.com/watch?v=3wmcjH86z_I',
      description: 'Our onboarding specialist demonstrates the latest updates to the myLab Portal.',
      published_date: '2025-08-27',
    },
  ];

  const ids = [];
  for (const video of videos) {
    const id = await post('videos', video);
    ids.push(id);
    log(`Video: "${video.title}"`);
  }
  return ids;
}

// ─── 6. Laboratories (collection) ───────────────────────────────────────────

async function seedLaboratories(industryIdMap) {
  console.log('\n🔬 Seeding Laboratories...');
  const labs = [
    {
      name: 'Soils',
      slug: 'soils',
      description:
        'The Soils Lab opened in 1975 when Ken started his dream and vision for Midwest Laboratories with soil testing. Today, Midwest Labs operates as the largest privately owned soil testing facility in North America, focusing on analyzing soil to provide fertilizer recommendations that optimize crop yields while minimizing input costs.',
      services_offered: [
        { text: 'Soil testing and analysis' },
        { text: 'Fertilizer recommendations' },
        { text: 'Crop management data' },
        { text: 'Custom instrumentation analysis' },
        { text: 'Agronomist report review' },
      ],
      who_we_support: [
        { text: 'Farming operations of all sizes' },
        { text: 'Agricultural cooperatives' },
        { text: 'Ag retailers and fertilizer dealers' },
        { text: 'Compost producers' },
        { text: 'Agriculture technology companies' },
        { text: 'Organic growers' },
      ],
      highlights: [
        { text: 'Analyzed 1.8 million soil samples in 2017' },
        { text: 'Largest privately owned soil testing facility in North America' },
        { text: 'Certified through three organizations across seven states' },
        { text: 'In-house agronomist reviews every outbound report' },
        { text: 'Dedicated R&D department for continuous operational improvements' },
      ],
      related_industries: [industryIdMap['Agronomy'], industryIdMap['Nutrient Management']].filter(Boolean),
    },
    {
      name: 'Foods',
      slug: 'foods',
      description:
        'The Foods Lab opened in 1985 with a focus on supporting local industry and assuring the safety and quality of food. Since its inception, the laboratory has expanded significantly to encompass nutritional analysis, allergen detection, GMO identification, chemical testing, shelf life studies, food safety protocols, and environmental monitoring services.',
      services_offered: [
        { text: 'Nutritional labeling' },
        { text: 'GMO (genetic) testing' },
        { text: 'Allergen analysis' },
        { text: 'Rancidity assessment' },
        { text: 'Viscosity measurement' },
        { text: 'Water activity determination' },
        { text: 'Chemical testing' },
        { text: 'Shelf life studies' },
        { text: 'Food safety screening' },
        { text: 'Environmental monitoring' },
      ],
      who_we_support: [
        { text: 'Organic growers' },
        { text: 'Food brands and ingredient companies' },
        { text: 'CPG manufacturers and co-packers' },
      ],
      highlights: [
        { text: 'Personal customer experience' },
        { text: 'Experience with highly complicated matrices' },
        { text: 'Efficient turnaround times' },
      ],
      related_industries: [industryIdMap['Food & Ingredient']].filter(Boolean),
    },
    {
      name: 'Feeds',
      slug: 'feeds',
      description:
        'The Feeds Lab, established in 1975, was created to address unmet testing needs both locally and nationally. It supports clients requiring fast, personalized, accurate, and reliable laboratory testing for animal product safety and quality assessment.',
      services_offered: [
        { text: 'Nutrition label verifications' },
        { text: 'Protein testing' },
        { text: 'Fat analysis' },
        { text: 'Fiber testing' },
        { text: 'Ash content measurement' },
        { text: 'Specialty lab work' },
      ],
      who_we_support: [
        { text: 'Zoos' },
        { text: 'Pet food manufacturers and brands' },
        { text: 'Livestock producers' },
        { text: 'Ethanol plants' },
      ],
      highlights: [
        { text: 'Over 50 years of laboratory experience' },
        { text: 'Processing approximately 28,000 samples monthly' },
        { text: 'On-staff nutritionist' },
        { text: 'Efficient turnaround times' },
      ],
      related_industries: [industryIdMap['Animal Nutrition']].filter(Boolean),
    },
    {
      name: 'Microbiology',
      slug: 'microbiology',
      description:
        'The Microbiology Lab, which opened in 1976, evaluates samples for the presence of pathogens and other microorganisms. The facility tests environmental samples such as water, compost, and fecal materials, as well as ingredients and finished products from food manufacturers. The new state-of-the-art micro lab opened in 2016.',
      services_offered: [
        { text: 'Pathogen and microbe detection' },
        { text: 'Nematode and antibiotic resistance testing' },
        { text: 'Environmental monitoring programs' },
        { text: 'HACCP testing' },
        { text: 'Food and pet food ingredient analysis' },
      ],
      who_we_support: [
        { text: 'Food manufacturers and brands' },
        { text: 'Pet food manufacturers and brands' },
        { text: 'Agricultural businesses (fertilizers, soil amendments, compost dealers)' },
        { text: 'Municipalities and landfills' },
        { text: 'Wastewater and treatment plants' },
        { text: 'Probiotic manufacturers' },
      ],
      highlights: [
        { text: '21 full-time employees' },
        { text: 'Seven senior analysts with nearly 100 years combined lab experience' },
        { text: 'Processes over 21,000 tests monthly' },
        { text: 'Operates seven days per week with same-day sample setup' },
        { text: 'State-of-the-art micro lab opened in 2016' },
      ],
      related_industries: [
        industryIdMap['Food & Ingredient'],
        industryIdMap['Animal Nutrition'],
        industryIdMap['Environmental'],
      ].filter(Boolean),
    },
  ];

  for (const lab of labs) {
    const { related_industries, ...labData } = lab;
    const id = await post('laboratories', {
      ...labData,
      related_industries,
    });
    log(`Laboratory: ${lab.name} (id: ${id})`);
  }
}

// ─── 7. Home Page (single type) ─────────────────────────────────────────────

async function seedHomePage(announcementIds, stepIds, videoIds) {
  console.log('\n🏠 Seeding Home Page...');
  await put('home-page', {
    hero_tagline: 'DRIVING SMART DECISIONS™',
    hero_vision_text:
      'Our Vision: To be the trusted name in the industry that delivers science like no one else in the world, through innovation, teamwork and dynamic service.',
    about_title: 'About Midwest Labs',
    about_text:
      'The mission of Midwest Laboratories is to drive a positive impact on the lives of our employees, clients, and communities. Midwest Laboratories is an ISO 17025 and NELAP accredited lab. Operating a 14-building campus headquartered in Omaha, NE. Choose from supported industries to view related documents and available test packages, or view our full catalog of analyses.',
    announcements: announcementIds,
    get_started_steps: stepIds,
    latest_videos: videoIds,
  });
  log('Home Page updated with all relations');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌱 Starting Strapi seed against: ${STRAPI_URL}\n`);

  try {
    await seedContactInfo();
    const industryIdMap = await seedIndustries();
    const announcementIds = await seedAnnouncements();
    const stepIds = await seedGetStartedSteps();
    const videoIds = await seedVideos();
    await seedLaboratories(industryIdMap);
    await seedHomePage(announcementIds, stepIds, videoIds);

    console.log('\n✨ Seed complete!\n');
    console.log('Verify at:');
    console.log(`  ${STRAPI_URL}/api/industries`);
    console.log(`  ${STRAPI_URL}/api/laboratories`);
    console.log(`  ${STRAPI_URL}/api/home-page?populate=*`);
    console.log('\nRemaining manual steps:');
    console.log('  • Add images via Strapi Admin → Media Library');
    console.log('  • Add remaining labs: Chromatography, Wet Chemistry, Metals, Fuel');
    console.log('  • Fill in About Us and Careers pages');
    console.log('  • Add blog posts');
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

main();
