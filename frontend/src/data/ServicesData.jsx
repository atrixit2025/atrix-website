import { MdCategory } from "react-icons/md";
import img_1 from "../../src/assets/DTS_Influencer.webp";
// import img_2 from '../../assets/infulancer.png'
import Asset1 from "../assets/ServicesIcons/Asset 1.svg";
import Asset2 from "../assets/ServicesIcons/Asset 2.svg";
import hover_img from '../assets/service-hover.jpg';
import image_1 from '../assets/DTS_Influencer.webp'
import image_2 from '../assets/infulancer.png'




const ServicesData = [
  {
    service_id: "Branding-Graphic-Design",
    service_title: "Branding/Graphic Design",
    icon: Asset1,
    category: "Branding/Graphic Design",
    heading_1: "Crafting Memorable Brand Identities",
    description_1: "We transform businesses into distinctive brands through strategic design solutions that communicate your unique value and resonate with your target audience across all touchpoints.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Comprehensive Branding Services",
        services_desc: "From initial concept to final execution, we deliver complete branding solutions that make lasting impressions in competitive markets.",
        all_services: [
          {
            service_name: "Logo Design",
            service_desc: "Creating distinctive, memorable logos that perfectly capture your brand's essence and values, designed to be timeless and effective across all platforms and applications.",
            hover_image: hover_img
          },
          {
            service_name: "Brand Identity",
            service_desc: "Developing comprehensive visual systems including logos, color palettes, typography and graphic elements for cohesive brand recognition across all touchpoints.",
            hover_image: hover_img
          },
          {
            service_name: "Business Cards",
            service_desc: "Designing premium business cards with careful attention to typography, materials and finishes that reflect your brand's professionalism and quality.",
            hover_image: hover_img
          },
          {
            service_name: "Packaging Design",
            service_desc: "Creating innovative packaging solutions that stand out on shelves while effectively communicating product quality and brand values through design.",
            hover_image: hover_img
          },
          {
            service_name: "Brochures",
            service_desc: "Developing visually stunning marketing brochures with strategic information hierarchy and compelling layouts that guide readers through your brand story.",
            hover_image: hover_img
          },
          {
            service_name: "Social Media Graphics",
            service_desc: "Designing platform-optimized social media visuals that capture attention and maintain consistent brand recognition across all digital channels.",
            hover_image: hover_img
          },
          {
            service_name: "Print Advertising",
            service_desc: "Creating eye-catching print ads for magazines, newspapers and outdoor media that communicate quickly and leave lasting impressions.",
            hover_image: hover_img
          },
          {
            service_name: "Brand Guidelines",
            service_desc: "Documenting comprehensive standards for logo usage, colors, typography and imagery to ensure consistent brand application across all mediums.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Why Strong Branding Matters",
    cards_sec_data: [
      {
        cardTitle: "Competitive Differentiation",
        desc: "Distinctive branding helps you stand out in crowded markets and become instantly recognizable to your target audience."
      },
      {
        cardTitle: "Customer Connection",
        desc: "Strategic branding creates emotional resonance that fosters loyalty and advocacy through consistent visual storytelling."
      },
      {
        cardTitle: "Business Value",
        desc: "Professional branding increases perceived value by up to 40%, supporting premium pricing and long-term equity."
      }
    ],
    why_atrix_heading: "Our Branding Process",
    why_atrix_subheading: "Research-driven approach to visual identity development",
    why_atrix_desc: [
      "We begin with in-depth discovery sessions to understand your business objectives, market position and target audience demographics.",
      "Our iterative design process presents multiple creative directions refined through structured feedback rounds at each stage.",
      "Final deliverables include comprehensive brand guidelines and production-ready files for all applications."
    ],
    process_cards: [
      {
        title: "Discovery & Research",
        desc: "Conducting market analysis and competitor audits to establish strategic foundation."
      },
      {
        title: "Strategy Development",
        desc: "Defining brand personality, messaging framework and visual direction."
      },
      {
        title: "Identity Design",
        desc: "Creating logo systems, color palettes and supporting graphic elements."
      },
      {
        title: "Application Design",
        desc: "Extending the identity across digital, print and environmental touchpoints."
      },
      {
        title: "Guidelines & Handoff",
        desc: "Documenting usage standards and providing organized asset packages."
      }
    ],
    quote: "A brand is the sum total of how someone perceives a particular organization. Branding is about shaping that perception.",
    faqs: [
      {
        category: "Branding FAQs",
        content: [
          {
            q: "How long does the branding process typically take?",
            a: "Most comprehensive branding projects take 6-10 weeks from kickoff to final delivery, depending on complexity and feedback cycles."
          },
          {
            q: "What deliverables are included in branding projects?",
            a: "Our packages include primary/secondary logos, color system, typography, graphic elements, brand guidelines PDF, and production files."
          },
          {
            q: "Do you create brand applications beyond the logo?",
            a: "Yes, we design full identity systems including business cards, letterheads, email signatures, packaging, and marketing collateral."
          },
          {
            q: "How many logo concepts do you present?",
            a: "We typically develop 3-5 distinct creative directions in initial rounds, refined to 2-3 options for final selection."
          },
          {
            q: "What file formats will we receive?",
            a: "Final deliverables include vector files (AI/EPS), high-res PNGs/JPGs, PDF guidelines, and web-optimized formats."
          }
        ]
      }
    ]
  },
  {
    service_id: "Digital-Marketing",
    service_title: "Digital Marketing",
    icon: Asset1,
    category: "Digital Marketing",
    heading_1: "Data-Driven Digital Growth Strategies",
    description_1: "We develop performance-focused digital marketing campaigns that drive qualified traffic, generate leads, and deliver measurable ROI through precisely targeted channels and continuous optimization.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Digital Marketing Services",
        services_desc: "Comprehensive solutions covering the entire customer journey from initial awareness to final conversion and retention.",
        all_services: [
          {
            service_name: "SEO Services",
            service_desc: "Improving organic search visibility through technical optimization, keyword research and content strategies to drive sustainable, long-term traffic and conversions.",
            hover_image: hover_img
          },
          {
            service_name: "Social Media Marketing",
            service_desc: "Developing platform-specific strategies to build engaged communities through compelling content and targeted advertising across major social networks.",
            hover_image: hover_img
          },
          {
            service_name: "PPC Advertising",
            service_desc: "Managing high-converting paid campaigns on Google, Bing and social platforms with continuous optimization for maximum ROI.",
            hover_image: hover_img
          },
          {
            service_name: "Content Marketing",
            service_desc: "Creating valuable, SEO-optimized content that attracts and nurtures ideal customers through every stage of the buyer's journey.",
            hover_image: hover_img
          },
          {
            service_name: "Email Marketing",
            service_desc: "Designing automated email sequences and newsletters that convert subscribers into loyal customers with personalized messaging.",
            hover_image: hover_img
          },
          {
            service_name: "Influencer Marketing",
            service_desc: "Leveraging authentic influencer partnerships to expand brand reach and credibility through trusted voices in your industry.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Digital Marketing Advantages",
    cards_sec_data: [
      {
        cardTitle: "Precision Targeting",
        desc: "Reach your ideal customers based on demographics, interests and behaviors with pixel-perfect accuracy."
      },
      {
        cardTitle: "Performance Transparency",
        desc: "Real-time analytics provide clear visibility into campaign performance and ROI across all channels."
      },
      {
        cardTitle: "Scalable Growth",
        desc: "Digital campaigns can be precisely calibrated and scaled to match business objectives and budgets."
      }
    ],
    why_atrix_heading: "Our Marketing Methodology",
    why_atrix_subheading: "Scientific approach to digital growth",
    why_atrix_desc: [
      "We combine data analysis with creative execution to develop campaigns that deliver actual business results, not just vanity metrics.",
      "Every strategy begins with clearly defined KPIs tied to revenue goals and includes ongoing optimization based on performance data.",
      "Our team includes certified specialists in each digital marketing discipline, ensuring best practices across your entire marketing mix."
    ],
    process_cards: [
      {
        title: "Audience Research",
        desc: "Identifying buyer personas, pain points and digital behaviors."
      },
      {
        title: "Channel Strategy",
        desc: "Selecting optimal marketing mix based on goals and audience."
      },
      {
        title: "Campaign Development",
        desc: "Creating targeted messaging and conversion paths."
      },
      {
        title: "Execution & Monitoring",
        desc: "Launching campaigns with real-time performance tracking."
      },
      {
        title: "Optimization",
        desc: "Continuous testing and refinement for better results."
      }
    ],
    quote: "Digital marketing is about having the right conversation with the right person at the right time.",
    faqs: [
      {
        category: "Marketing FAQs",
        content: [
          {
            q: "How soon will we see results from SEO efforts?",
            a: "SEO typically takes 4-6 months to show measurable improvements, with compounding growth over 12-18 months of consistent effort."
          },
          {
            q: "What's your approach to PPC campaign management?",
            a: "We focus on high-intent keywords, tightly themed ad groups, and continuous bid optimization to maximize conversion value."
          },
          {
            q: "Do you specialize in specific industries?",
            a: "We have particular expertise in B2B technology, professional services, ecommerce, healthcare and financial services."
          },
          {
            q: "How do you measure marketing success?",
            a: "We establish clear KPIs upfront based on business objectives, tracking metrics like CAC, LTV, ROAS and pipeline influence."
          },
          {
            q: "Can you work with our internal marketing team?",
            a: "Absolutely - we frequently collaborate with in-house teams to provide specialized expertise or additional bandwidth."
          }
        ]
      }
    ]
  },
  {
    service_id: "Photo-Video-Production",
    service_title: "Photo/Video Production",
    icon: Asset1,
    category: "Media Production",
    heading_1: "Professional Visual Storytelling",
    description_1: "We produce high-quality photography and videography that showcases your products, services and brand story with cinematic quality and strategic messaging tailored to your marketing objectives.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Production Services",
        services_desc: "End-to-end production solutions tailored to your brand's needs—from concept development to final delivery across photography, videography and multimedia formats.",
        all_services: [
          {
            service_name: "Product Photography",
            service_desc: "Creating high-resolution product images that highlight features and quality, with studio lighting and professional styling for e-commerce and marketing materials.",
            hover_image: hover_img
          },
          {
            service_name: "Corporate Videos",
            service_desc: "Producing professional corporate videos including testimonials, training content and company profiles with polished scripting, filming and editing.",
            hover_image: hover_img
          },
          {
            service_name: "Commercial Photography",
            service_desc: "Capturing striking images for advertising campaigns with tailored lighting, composition and art direction for maximum visual impact.",
            hover_image: hover_img
          },
          {
            service_name: "Drone Videography",
            service_desc: "Providing stunning aerial footage for real estate, events and promotional content captured by licensed drone operators.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Why Professional Production Matters",
    cards_sec_data: [
      {
        cardTitle: "Brand Perception",
        desc: "High-quality visuals immediately elevate how customers perceive your brand quality and professionalism."
      },
      {
        cardTitle: "Engagement Impact",
        desc: "Video content generates significantly more shares and engagement than text or images alone."
      },
      {
        cardTitle: "Content Versatility",
        desc: "Professional assets can be repurposed across websites, social media, ads and print materials."
      }
    ],
    why_atrix_heading: "Our Production Approach",
    why_atrix_subheading: "Cinematic quality meets commercial objectives",
    why_atrix_desc: [
      "We combine artistic vision with technical expertise to create visuals that capture attention while clearly communicating your key messages.",
      "Our productions are strategically planned with your marketing goals and distribution channels in mind from the outset.",
      "The team includes award-winning directors, cinematographers and editors using professional cinema equipment for broadcast-quality results."
    ],
    process_cards: [
      {
        title: "Creative Briefing",
        desc: "Defining project objectives, audience and key messages."
      },
      {
        title: "Pre-Production",
        desc: "Scripting, storyboarding and planning all shoot details."
      },
      {
        title: "Production",
        desc: "Professional filming with proper lighting and equipment."
      },
      {
        title: "Post-Production",
        desc: "Editing, color correction and final mastering."
      },
      {
        title: "Delivery",
        desc: "Providing optimized files for all platforms."
      }
    ],
    quote: "Great visual content doesn't just capture attention - it captures hearts, minds and market share.",
    faqs: [
      {
        category: "Production FAQs",
        content: [
          {
            q: "What equipment do you use for video production?",
            a: "We shoot with professional cinema cameras (RED, ARRI, Blackmagic), prime lenses, and professional lighting/audio gear for broadcast-quality results."
          },
          {
            q: "Can you help develop concepts and scripts?",
            a: "Absolutely - our creative team develops strategic concepts and complete scripts tailored to your marketing objectives and brand voice."
          },
          {
            q: "How long does a typical video project take?",
            a: "Most corporate video projects take 4-6 weeks from concept to final delivery, depending on complexity, locations and revisions."
          },
          {
            q: "Do you provide actors/models or locations?",
            a: "Yes, we have access to professional talent pools and location resources to meet all production needs."
          },
          {
            q: "What file formats do you deliver?",
            a: "We provide web-optimized files (MP4, MOV) along with high-resolution masters suitable for broadcast or print use."
          }
        ]
      }
    ]
  },
  {
    service_id: "Web-Development",
    service_title: "Web Development",
    icon: Asset1,
    category: "Web Development",
    heading_1: "Custom Digital Experiences That Drive Results",
    description_1: "We design and build high-performance websites and web applications that combine stunning aesthetics with seamless functionality, optimized for user experience, conversions and business growth.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Web Development Services",
        services_desc: "Complete website solutions from simple brochure sites to complex web applications and ecommerce platforms.",
        all_services: [
          {
            service_name: "Website Development",
            service_desc: "Building responsive, performant websites with modern frameworks like React and Vue, optimized for speed, SEO and user experience across all devices.",
            hover_image: hover_img
          },
          {
            service_name: "E-commerce Solutions",
            service_desc: "Developing feature-rich online stores with Shopify, WooCommerce or custom platforms, including payment integration and inventory management.",
            hover_image: hover_img
          },
          {
            service_name: "Web Applications",
            service_desc: "Creating custom business tools, dashboards and SaaS platforms with robust backend functionality and intuitive interfaces.",
            hover_image: hover_img
          },
          {
            service_name: "CMS Development",
            service_desc: "Implementing WordPress, Drupal or other content management systems for easy content updates and publishing workflows.",
            hover_image: hover_img
          },
          {
            service_name: "API Integration",
            service_desc: "Connecting your website with third-party services, payment gateways and databases for seamless functionality.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Web Development Benefits",
    cards_sec_data: [
      {
        cardTitle: "Mobile-First Approach",
        desc: "Responsive designs that adapt perfectly to all devices, prioritizing mobile user experience."
      },
      {
        cardTitle: "Performance Optimized",
        desc: "Fast-loading sites improve user experience and search rankings while reducing bounce rates."
      },
      {
        cardTitle: "Future-Proof Architecture",
        desc: "Clean, modular codebase allows for easy updates and scalability as your business grows."
      }
    ],
    why_atrix_heading: "Our Development Philosophy",
    why_atrix_subheading: "Engineering excellence meets business objectives",
    why_atrix_desc: [
      "We approach development as problem-solving - creating technical solutions that address specific business challenges and opportunities.",
      "Our process emphasizes planning, quality assurance and long-term maintainability over quick fixes and technical debt.",
      "The team stays current with evolving web standards, security practices and emerging technologies to deliver future-ready solutions."
    ],
    process_cards: [
      {
        title: "Discovery & Planning",
        desc: "Defining requirements, user flows and technical specifications."
      },
      {
        title: "Design & Prototyping",
        desc: "Creating wireframes and UI designs for feedback."
      },
      {
        title: "Development",
        desc: "Building features with clean, documented code."
      },
      {
        title: "Testing & QA",
        desc: "Rigorous testing across devices and scenarios."
      },
      {
        title: "Launch & Optimization",
        desc: "Deploying with monitoring for improvements."
      }
    ],
    quote: "A great website is the digital storefront of your business - we build experiences that welcome visitors and convert them into customers.",
    faqs: [
      {
        category: "Web Development FAQs",
        content: [
          {
            q: "What technologies do you typically use?",
            a: "Our stack includes React, Vue, Node.js, Laravel, WordPress, Shopify and various databases depending on project needs."
          },
          {
            q: "Can you redesign our existing website?",
            a: "Yes, we frequently modernize legacy sites with improved design, functionality and technical architecture."
          },
          {
            q: "How do you ensure website security?",
            a: "We implement security best practices including regular updates, secure coding standards, HTTPS, and protection against common vulnerabilities."
          },
          {
            q: "What about website maintenance?",
            a: "We offer ongoing maintenance plans covering updates, backups, security monitoring and content changes as needed."
          },
          {
            q: "How long does website development take?",
            a: "Timelines vary by complexity - simple sites take 4-6 weeks, while complex web apps may require 3-6 months of development."
          }
        ]
      }
    ]
  },
  {
    service_id: "Visual-Effects",
    service_title: "Visual Effects",
    icon: Asset1,
    category: "Visual Effects",
    heading_1: "Cutting-Edge Visual Effects",
    description_1: "We create stunning visual effects that bring imagination to life, from subtle enhancements to full CGI environments, helping brands tell compelling stories through cinematic visuals.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "VFX Services",
        services_desc: "Comprehensive visual effects solutions for commercials, films, presentations and digital content.",
        all_services: [
          {
            service_name: "3D Animation",
            service_desc: "Creating lifelike character animations, product visualizations and environments with realistic physics and movement for immersive experiences.",
            hover_image: hover_img
          },
          {
            service_name: "Motion Graphics",
            service_desc: "Designing dynamic animated graphics for explainer videos, titles and presentations that communicate complex ideas simply and effectively.",
            hover_image: hover_img
          },
          {
            service_name: "Video Editing",
            service_desc: "Professional editing and assembly of video footage with seamless transitions, pacing and storytelling for maximum impact.",
            hover_image: hover_img
          },
          {
            service_name: "Color Correction",
            service_desc: "Enhancing and standardizing color across all footage for professional, consistent results that match brand aesthetics.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "VFX Advantages",
    cards_sec_data: [
      {
        cardTitle: "Enhanced Storytelling",
        desc: "Visual effects allow you to tell stories and explain concepts that would be impossible with live action alone."
      },
      {
        cardTitle: "Cost Efficiency",
        desc: "VFX can often achieve results more affordably than practical effects, especially for complex scenarios."
      },
      {
        cardTitle: "Creative Freedom",
        desc: "Break free from physical limitations and create anything imaginable through CGI and compositing."
      }
    ],
    why_atrix_heading: "Our VFX Approach",
    why_atrix_subheading: "Seamless integration of effects and reality",
    why_atrix_desc: [
      "We blend technical expertise with artistic vision to create effects that serve the story rather than distract from it.",
      "Our pipeline combines industry-standard software with proprietary techniques for efficient, high-quality results.",
      "The team includes veterans from film, television and advertising with deep experience across all VFX disciplines."
    ],
    process_cards: [
      {
        title: "Concept Development",
        desc: "Planning visual approach through storyboards and style frames."
      },
      {
        title: "Asset Creation",
        desc: "Modeling, texturing and rigging 3D assets."
      },
      {
        title: "Animation & Simulation",
        desc: "Bringing assets to life through movement."
      },
      {
        title: "Lighting & Rendering",
        desc: "Setting up proper lighting conditions."
      },
      {
        title: "Compositing",
        desc: "Integrating elements with live footage."
      }
    ],
    quote: "The best visual effects are invisible - they enhance reality without calling attention to themselves.",
    faqs: [
      {
        category: "VFX FAQs",
        content: [
          {
            q: "What software do you use for VFX work?",
            a: "Our toolkit includes Maya, Cinema 4D, Houdini, Nuke, After Effects, Substance and Unreal Engine."
          },
          {
            q: "Can you match our existing visual style?",
            a: "Absolutely - we analyze and replicate existing styles to maintain brand consistency across projects."
          },
          {
            q: "How long do VFX projects typically take?",
            a: "Timelines vary widely by complexity - simple motion graphics may take days, while complex CGI sequences can require months."
          },
          {
            q: "Do you provide on-set supervision?",
            a: "Yes, we offer on-set VFX supervision to ensure proper filming for post-production integration."
          },
          {
            q: "What file formats can you deliver?",
            a: "We provide industry-standard formats including EXR, DPX, MOV, and PNG sequences at any required resolution."
          }
        ]
      }
    ]
  },
  {
    service_id: "Staffing",
    service_title: "Staffing",
    icon: Asset1,
    category: "Staffing Solutions",
    heading_1: "Strategic Talent Acquisition",
    description_1: "We connect businesses with top-tier talent through customized staffing solutions that address immediate hiring needs while building long-term workforce strategies for sustainable growth.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Staffing Services",
        services_desc: "Comprehensive workforce solutions tailored to your industry, company culture and specific role requirements.",
        all_services: [
          {
            service_name: "Permanent Staffing",
            service_desc: "Finding the right long-term candidates through targeted search and comprehensive vetting processes to ensure perfect cultural and skills fit.",
            hover_image: hover_img
          },
          {
            service_name: "Temporary Staffing",
            service_desc: "Providing qualified temporary professionals for project-based needs, seasonal demands and special initiatives with flexible terms.",
            hover_image: hover_img
          },
          {
            service_name: "Executive Search",
            service_desc: "Identifying and recruiting C-level and senior leadership talent through discreet, targeted searches and thorough assessment processes.",
            hover_image: hover_img
          },
          {
            service_name: "Technical Recruitment",
            service_desc: "Specialized sourcing for IT, engineering and STEM positions with deep understanding of technical skills and industry requirements.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Staffing Benefits",
    cards_sec_data: [
      {
        cardTitle: "Reduced Hiring Time",
        desc: "Our extensive networks and processes fill positions 40% faster than traditional hiring methods."
      },
      {
        cardTitle: "Quality Candidates",
        desc: "Rigorous screening ensures only the most qualified, culture-fit candidates are presented."
      },
      {
        cardTitle: "Cost Efficiency",
        desc: "Reduce bad hires and turnover costs while optimizing recruitment spend."
      }
    ],
    why_atrix_heading: "Our Staffing Methodology",
    why_atrix_subheading: "Quality-focused talent acquisition",
    why_atrix_desc: [
      "We go beyond resumes to understand both candidate capabilities and cultural fit with your organization.",
      "Our recruiters specialize in specific industries and functions, bringing deep market knowledge to each search.",
      "Proprietary assessment tools and interview techniques ensure candidates meet both technical and soft skill requirements."
    ],
    process_cards: [
      {
        title: "Needs Assessment",
        desc: "Understanding role requirements and team dynamics."
      },
      {
        title: "Talent Sourcing",
        desc: "Identifying potential candidates through networks."
      },
      {
        title: "Screening & Evaluation",
        desc: "Conducting interviews and skills assessments."
      },
      {
        title: "Candidate Presentation",
        desc: "Submitting qualified candidates with profiles."
      },
      {
        title: "Onboarding Support",
        desc: "Facilitating smooth transitions for new hires."
      }
    ],
    quote: "The right talent transforms organizations - we don't just fill positions, we build high-performing teams.",
    faqs: [
      {
        category: "Staffing FAQs",
        content: [
          {
            q: "What industries do you specialize in?",
            a: "We have particular expertise in technology, healthcare, finance, engineering and professional services."
          },
          {
            q: "How do you source candidates?",
            a: "We use proprietary databases, professional networks, referrals and targeted outreach to passive candidates."
          },
          {
            q: "What's your placement guarantee?",
            a: "We offer 90-day replacement guarantees on most permanent placements at no additional cost."
          },
          {
            q: "Can you handle high-volume hiring?",
            a: "Yes, we've managed recruitment campaigns for 100+ positions simultaneously through scalable processes."
          },
          {
            q: "How do you assess cultural fit?",
            a: "We analyze your culture through interviews and tools, then evaluate candidates against those criteria."
          }
        ]
      }
    ]
  },
  {
    service_id: "Logistics",
    service_title: "Logistics",
    icon: Asset1,
    category: "Logistics Solutions",
    heading_1: "Optimized Supply Chain Solutions",
    description_1: "We design and implement logistics strategies that streamline operations, reduce costs and improve service levels through intelligent network design, transportation optimization and technology integration.",
    img_1: image_1,
    img_2: image_2,
    sub_service: [
      {
        services_heading: "Logistics Services",
        services_desc: "End-to-end supply chain solutions tailored to your product characteristics, customer requirements and business objectives.",
        all_services: [
          {
            service_name: "Supply Chain Management",
            service_desc: "Comprehensive oversight and optimization of your entire supply network from procurement to distribution for maximum efficiency.",
            hover_image: hover_img
          },
          {
            service_name: "Warehousing",
            service_desc: "Improving storage efficiency, inventory accuracy and picking processes through optimized warehouse layout and management systems.",
            hover_image: hover_img
          },
          {
            service_name: "Transportation",
            service_desc: "Optimizing routing, carrier selection and freight consolidation to reduce costs while improving delivery reliability.",
            hover_image: hover_img
          }
        ]
      }
    ],
    cards_sec_heading: "Logistics Advantages",
    cards_sec_data: [
      {
        cardTitle: "Cost Reduction",
        desc: "Our solutions typically reduce logistics costs by 15-30% through network optimization."
      },
      {
        cardTitle: "Service Improvement",
        desc: "Enhance customer satisfaction through faster, more reliable deliveries."
      },
      {
        cardTitle: "Scalability",
        desc: "Flexible solutions grow with your business needs and expansion."
      }
    ],
    why_atrix_heading: "Our Logistics Approach",
    why_atrix_subheading: "Data-driven supply chain optimization",
    why_atrix_desc: [
      "We analyze your current operations to identify inefficiencies and opportunities for improvement across the entire supply chain.",
      "Technology integration provides real-time visibility and control over inventory, shipments and costs.",
      "Customized solutions balance cost, service and flexibility based on your specific business requirements."
    ],
    process_cards: [
      {
        title: "Current State Analysis",
        desc: "Mapping existing processes and performance."
      },
      {
        title: "Opportunity Assessment",
        desc: "Identifying improvement areas through data."
      },
      {
        title: "Solution Design",
        desc: "Developing optimized network strategies."
      },
      {
        title: "Implementation",
        desc: "Executing changes with minimal disruption."
      },
      {
        title: "Continuous Improvement",
        desc: "Monitoring and refining strategies."
      }
    ],
    quote: "Efficient logistics operations are the invisible backbone of successful businesses - when they work well, no one notices, but when they fail, everyone feels the impact.",
    faqs: [
      {
        category: "Logistics FAQs",
        content: [
          {
            q: "What geographic areas do you cover?",
            a: "We provide logistics solutions for local, national and international supply chains across all major markets."
          },
          {
            q: "How do you measure logistics performance?",
            a: "Key metrics include order fulfillment time, inventory turns, transportation cost per unit and perfect order percentage."
          },
          {
            q: "Can you help implement logistics technology?",
            a: "Yes, we have experience with leading TMS, WMS and visibility platforms and can manage selection and implementation."
          },
          {
            q: "What industries do you specialize in?",
            a: "We have deep expertise in retail, manufacturing, healthcare and ecommerce logistics."
          },
          {
            q: "How long do logistics projects typically take?",
            a: "Initial assessments take 2-4 weeks, with implementation timelines varying by scope from 3-12 months."
          }
        ]
      }
    ]
  }
];



export default ServicesData;
