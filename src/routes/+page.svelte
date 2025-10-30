<script>
    import  Carousel  from '$lib/components/Carousel.svelte';
    import ProgramsCarousel from '$lib/components/ProgramsCarousel.svelte';
    // Import GalleryItem if you made one
  
    // Data for program cards
    const programs = [
      { imgSrc: '/images/programs/KGschool.jpeg', title: 'Kindergarten', description: 'A nurturing environment where young learners develop foundational skills...', link: '/programs/kindergarten' },
      { imgSrc: '/images/programs/juniorsec.jpeg', title: 'Junior Secondary', description: 'Comprehensive education that balances academic excellence...', link: '/programs/junior-secondary' },
      { imgSrc: '/images/programs/CBC.jpeg', title: 'CBC Program', description: 'Competency-Based Curriculum focusing on skills...', link: '/programs/cbc' },
      { imgSrc: '/images/programs/hairdressing.jpeg', title: 'Hairdressing', description: 'Professional training in cutting-edge techniques...', link: '/programs/hairdressing' },
      { imgSrc: '/images/programs/IT.jpeg', title: 'Information Technology', description: 'Preparing students for the digital future...', link: '/programs/it' },
      { imgSrc: '/images/programs/culinary.jpg', title: 'Culinary Arts', description: 'Hands-on training in cuisine preparation...', link: '/programs/culinary' },
    ];
  
    // Statistics data
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    const studentsCount = tweened(0, { duration: 2000, easing: cubicOut });
    const teachersCount = tweened(0, { duration: 2000, easing: cubicOut });
    const yearsCount = tweened(0, { duration: 2000, easing: cubicOut });
    const programsCount = tweened(0, { duration: 2000, easing: cubicOut });
    
    let statsVisible = false;
    let statsSection;

    // Campus toggle
    let selectedCampus = 'umoja'; // 'umoja' or 'kamulu'

    function toggleCampus() {
      selectedCampus = selectedCampus === 'umoja' ? 'kamulu' : 'umoja';
    }

    // Refs for GSAP animations
    let missionSection;
    let programsSection;
    let campusSection;
    let gallerySection;
    let ctaSection;

    onMount(async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);


      // Mission & Vision: timeline with single, reliable ScrollTrigger
      if (missionSection) {
        const heading = missionSection.querySelector('h2');
        const video = missionSection.querySelector('.mv-vid');
        const cards = missionSection.querySelectorAll('.mv-card');

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: missionSection,
            start: 'top 80%', // standard practice threshold
            once: true,
            toggleActions: 'play none none none',
            invalidateOnRefresh: true
          }
        });

        if (heading) tl.fromTo(heading, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, immediateRender: false, force3D: true });
        if (video) tl.fromTo(video, { autoAlpha: 0, y: 50, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, immediateRender: false, force3D: true }, '-=0.4');
        if (cards?.length) tl.fromTo(cards, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, immediateRender: false, force3D: true }, '-=0.2');
      }

      // Programs cards (staggered reveal)
      if (programsSection) {
        const cards = programsSection.querySelectorAll('.program-card');
        ScrollTrigger.batch(cards, {
          start: 'top 85%',
          onEnter: (batch) => gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
              immediateRender: false,
              force3D: true
            }
          ),
          once: true
        });
      }

      // Stats counters trigger
      if (statsSection) {
        ScrollTrigger.create({
          trigger: statsSection,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            if (!statsVisible) {
              statsVisible = true;
              studentsCount.set(500);
              teachersCount.set(45);
              yearsCount.set(15);
              programsCount.set(10);
            }
          }
        });
      }

      // Campus info cards
      if (campusSection) {
        const infoCards = campusSection.querySelectorAll('.info-card');
        ScrollTrigger.batch(infoCards, {
          start: 'top 85%',
          onEnter: (batch) => gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger: 0.08,
              immediateRender: false,
              force3D: true
            }
          ),
          once: true
        });

        // Campus hero image cards
        const heroes = campusSection.querySelectorAll('.campus-hero');
        gsap.fromTo(
          heroes,
          { autoAlpha: 0, y: 40, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: campusSection,
              start: 'top 85%',
              once: true,
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Gallery grid columns: animate per-column (2/3/5) and only when in view
      if (gallerySection) {
        const items = Array.from(gallerySection.querySelectorAll('[data-gallery-item]'));
        const mm = gsap.matchMedia();

        function setup(cols) {
          // group by index modulo cols (CSS grid default flow is row)
          const groups = Array.from({ length: cols }, () => []);
          items.forEach((el, i) => groups[i % cols].push(el));

          groups.forEach((col) => {
            if (!col.length) return;
            gsap.fromTo(
              col,
              { autoAlpha: 0, x: 18, y: 0, scale: 0.99, transformOrigin: 'center center' },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.1,
                ease: 'sine.out',
                stagger: { each: 0.08, from: 'start' },
                immediateRender: false,
                force3D: true,
                scrollTrigger: {
                  trigger: col[0],
                  start: 'top 90%',
                  once: true,
                  toggleActions: 'play none none none'
                }
              }
            );
          });
          return () => {};
        }

        mm.add({
          '(max-width: 767px)': () => setup(2),
          '(min-width: 768px) and (max-width: 1023px)': () => setup(3),
          '(min-width: 1024px)': () => setup(5)
        });

        // Refresh on next tick and when gallery images load to avoid stuck hidden tiles
        requestAnimationFrame(() => {
          if (window && window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
        const imgs = gallerySection.querySelectorAll('img');
        imgs.forEach((img) => {
          if (img.complete) return;
          img.addEventListener('load', () => {
            if (window && window.ScrollTrigger) window.ScrollTrigger.refresh();
          }, { once: true });
        });

        // Fallback: ensure visibility via IntersectionObserver if triggers fail
        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                const el = e.target;
                el.classList.remove('reveal-init');
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.transform = 'none';
                io.unobserve(el);
              }
            });
          }, { rootMargin: '0px 0px -10% 0px' });
          items.forEach((el) => io.observe(el));
        }
      }

      // CTA section
      if (ctaSection) {
        gsap.from(ctaSection, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none'
          }
        });
      }

      // Refresh triggers after images/fonts load + after video metadata
      if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
          ScrollTrigger.refresh();
        });
        const vid = missionSection?.querySelector('.mv-vid video');
        if (vid) {
          vid.addEventListener('loadedmetadata', () => ScrollTrigger.refresh(), { once: true });
        }
      }
    });

     // Data for gallery - Elementary school focused images from Unsplash
    const galleryImages = [
        { img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', title: 'School Campus', desc: 'Welcoming learning environment' },
        { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', title: 'Elementary Classroom', desc: 'Bright and engaging classrooms' },
        { img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', title: 'Reading Corner', desc: 'Fostering love for reading' },
        { img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80', title: 'Young Learners', desc: 'Engaged students' },
        { img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80', title: 'Playground Fun', desc: 'Active play time' },
        { img: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&q=80', title: 'Art & Creativity', desc: 'Exploring creativity' },
        { img: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=800&q=80', title: 'Music Class', desc: 'Developing musical talents' },
        { img: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=800&q=80', title: 'Science Discovery', desc: 'Hands-on science fun' },
        { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', title: 'Computer Skills', desc: 'Digital literacy' },
        { img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', title: 'PE Activities', desc: 'Physical education' },
        { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', title: 'Group Projects', desc: 'Teamwork and collaboration' },
        { img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80', title: 'Happy Students', desc: 'Joyful learning atmosphere' },
        { img: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80', title: 'Math Activities', desc: 'Building number skills' }
    ];
  
  </script>
  
 
  <!-- Section 1: Hero Carousel with Welcome Section -->
  <Carousel />


<!-- ===== INSERTED SECTION: Mission & Vision ===== -->
<section bind:this={missionSection} class="py-16 bg-white"> 
  <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-red-600 mb-12 text-center reveal-init">Our Foundation</h2> 

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto items-center"> 

          <!-- Left: Video (replacing image) -->
          <div class="h-[500px] w-full overflow-hidden mv-vid will-change-transform reveal-init">
            <video 
              src="/videos/Good%20Morning%20(Poster).mp4"
              class="block w-full h-full max-w-full max-h-full object-contain object-center"
              autoplay
              loop
              muted
              playsinline
            ></video>
          </div>

          <!-- Right: Mission & Vision Cards -->
          <div class="space-y-6">
            <!-- Mission Card -->
            <div class="bg-gray-50 p-6 rounded-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 border-l-4 border-red-600 mv-card will-change-transform reveal-init">
               <h3 class="text-2xl font-semibold text-red-700 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> </svg>
                  Our Mission
               </h3>
               <p class="text-gray-700 leading-relaxed">
                  To provide quality, cost-effective, personalized, and innovative primary education within a conducive environment, fostering creativity, critical thinking, and character development to nurture holistic children prepared for success in their lives.
               </p>
            </div>

            <!-- Vision Card -->
            <div class="bg-gray-50 p-6 rounded-lg shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 border-l-4 border-red-600 mv-card will-change-transform reveal-init">
                <h3 class="text-2xl font-semibold text-red-700 mb-3">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> </svg>
                   Our Vision
                </h3>
                <p class="text-gray-700 leading-relaxed">
                   To be a leading educational institution recognized for its commitment to supporting and guiding young children to achieve success through sustainable, high-quality primary education, developing well-rounded individuals.
                </p>
            </div>
          </div>
      </div>
  </div>
</section>
<!-- ===== END: Mission & Vision Section ===== -->


<!-- Programs Section with Carousel -->
<section bind:this={programsSection} class="py-16 bg-gray-50"> 
    <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Our Programs</h3>
    <div class="container mx-auto px-4 max-w-[1600px]">
      <ProgramsCarousel {programs} />
    </div>
</section>
<!-- End Programs Section -->

<!-- Statistics Section -->
<section bind:this={statsSection} class="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
  </div>

  <div class="container mx-auto px-4 max-w-7xl relative z-10">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">Our Impact in Numbers</h2>
      <p class="text-xl text-red-100 max-w-2xl mx-auto">Building futures through quality education and dedicated commitment</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      
      <!-- Stat 1: Students -->
      <div class="text-center transform hover:scale-110 transition-transform duration-300">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="text-5xl md:text-6xl font-bold mb-2">{Math.floor($studentsCount)}+</div>
        <div class="text-lg text-red-100">Students</div>
      </div>

      <!-- Stat 2: Teachers -->
      <div class="text-center transform hover:scale-110 transition-transform duration-300">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="text-5xl md:text-6xl font-bold mb-2">{Math.floor($teachersCount)}+</div>
        <div class="text-lg text-red-100">Teachers</div>
      </div>

      <!-- Stat 3: Years of Excellence -->
      <div class="text-center transform hover:scale-110 transition-transform duration-300">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div class="text-5xl md:text-6xl font-bold mb-2">{Math.floor($yearsCount)}+</div>
        <div class="text-lg text-red-100">Years of Excellence</div>
      </div>

      <!-- Stat 4: Programs -->
      <div class="text-center transform hover:scale-110 transition-transform duration-300">
        <div class="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div class="text-5xl md:text-6xl font-bold mb-2">{Math.floor($programsCount)}+</div>
        <div class="text-lg text-red-100">Programs Offered</div>
      </div>

    </div>
  </div>
</section>
<!-- End Statistics Section -->

<!-- Campus Location Section -->
<section bind:this={campusSection} class="py-20 bg-white relative overflow-hidden">
  <!-- Background Accent -->
  <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50 to-transparent"></div>
  
  <div class="container mx-auto px-4 max-w-[1600px] relative z-10">
    <!-- Section Header with Campus Toggle -->
    <div class="text-center mb-16">
      <span class="text-red-600 font-semibold text-sm uppercase tracking-wider">Where to Find Us</span>
      <h2 class="text-4xl md:text-6xl font-bold text-gray-900 mt-3 mb-4">Our Campuses</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">Two exceptional locations serving our community</p>
      
      <!-- Campus Toggle Button -->
      <div class="inline-flex items-center bg-gray-100 p-2 rounded-full shadow-lg">
        <button
          on:click={() => selectedCampus = 'umoja'}
          class="px-8 py-3 rounded-full font-bold transition-all duration-300 {selectedCampus === 'umoja' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}"
        >
          Umoja Campus
        </button>
        <button
          on:click={() => selectedCampus = 'kamulu'}
          class="px-8 py-3 rounded-full font-bold transition-all duration-300 {selectedCampus === 'kamulu' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'}"
        >
          Kamulu Campus
        </button>
      </div>
    </div>

    <!-- Campus Display (Toggleable) -->
    <div class="w-full mx-auto">
      {#if selectedCampus === 'umoja'}
      <div class="relative">
        <!-- Hero Image Card -->
        <div class="relative h-[400px] overflow-hidden shadow-2xl group campus-hero will-change-transform reveal-init">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80"
            alt="Umoja Campus"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/70 to-transparent"></div>
          
          <!-- Floating Campus Name Card -->
          <div class="absolute top-8 left-8 bg-white px-8 py-4 shadow-2xl rounded-lg">
            <div class="flex items-center gap-4">
              <div class="h-12 w-1 bg-red-600 rounded-full"></div>
          <div>
                <h3 class="text-3xl font-bold text-gray-900">Umoja Campus</h3>
                <p class="text-red-600 font-medium text-sm">Where learning comes alive</p>
              </div>
            </div>
          </div>

          <!-- Program Badge -->
          <div class="absolute right-4 md:right-8 top-[18rem] md:top-8 z-20 bg-red-600 text-white px-6 py-3 shadow-xl rounded-full">
            <p class="font-semibold text-sm">Pre-School • Lower • Junior</p>
          </div>

          <!-- Bottom Info Strip -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 px-8 py-5 rounded-t-lg">
            <p class="text-white text-base">Right in the heart of Nairobi</p>
          </div>
        </div>

        <!-- Info Cards Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 relative z-10">
          <!-- Address Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-red-100 p-3 rounded-lg group-hover:bg-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Find us at</h4>
                <p class="text-gray-900 font-medium leading-relaxed">Umoja Innercore<br/>Moi Drive, Nairobi</p>
              </div>
            </div>
          </div>

          <!-- Phone Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Give us a call</h4>
                <p class="text-gray-900 font-medium">+254 XXX XXX XXX</p>
              </div>
            </div>
          </div>

          <!-- Email Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Send us an email</h4>
                <p class="text-gray-900 font-medium text-sm break-all">info@cathsamschool.ac.ke</p>
              </div>
            </div>
          </div>

          <!-- Hours Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">We're open</h4>
                <p class="text-gray-900 font-medium leading-relaxed text-sm">Mon-Fri: 8AM-5PM<br/>Sat: 8AM-12PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="grid lg:grid-cols-2">
            <div class="p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
              <div class="mb-8">
                <span class="inline-block text-red-600 text-sm font-semibold mb-3">Come Visit!</span>
                <h4 class="text-3xl font-bold text-gray-900 mb-4">See Our Campus</h4>
                <p class="text-gray-600 text-lg leading-relaxed">We'd love to show you around! Come experience our vibrant learning spaces and meet our wonderful community.</p>
              </div>
              <a href="https://maps.google.com/?q=Umoja+Innercore+Moi+Drive+Nairobi" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-3 bg-red-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Get Directions</span>
              </a>
            </div>
            <div class="h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.123456789!2d36.8897!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTkuOSJTIDM2wrA1Myc0Ni45IkU!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Umoja Campus Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {:else}
      <div class="relative">
        <!-- Hero Image Card -->
        <div class="relative h-[400px] overflow-hidden shadow-2xl group campus-hero will-change-transform reveal-init">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
            alt="Kamulu Campus"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-transparent"></div>
          
          <!-- Floating Campus Name Card -->
          <div class="absolute top-8 left-8 bg-white px-8 py-4 shadow-2xl rounded-lg">
            <div class="flex items-center gap-4">
              <div class="h-12 w-1 bg-red-600 rounded-full"></div>
              <div>
                <h3 class="text-3xl font-bold text-gray-900">Kamulu Campus</h3>
                <p class="text-red-600 font-medium text-sm">Your home away from home</p>
              </div>
            </div>
          </div>

          <!-- Program Badge -->
          <div class="absolute right-4 md:right-8 top-[18rem] md:top-8 z-20 bg-red-600 text-white px-6 py-3 shadow-xl rounded-full">
            <p class="font-semibold text-sm">Day & Boarding</p>
          </div>

          <!-- Bottom Info Strip -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 px-8 py-5 rounded-t-lg">
            <p class="text-white text-base">Complete day & boarding facilities</p>
          </div>
        </div>

        <!-- Info Cards Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 relative z-10">
          <!-- Address Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-red-100 p-3 rounded-lg group-hover:bg-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Find us at</h4>
                <p class="text-gray-900 font-medium leading-relaxed">Kamulu<br/>Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          <!-- Phone Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Give us a call</h4>
                <p class="text-gray-900 font-medium">+254 XXX XXX XXX</p>
              </div>
            </div>
          </div>

          <!-- Email Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">Send us an email</h4>
                <p class="text-gray-900 font-medium text-sm break-all">kamulu@cathsamschool.ac.ke</p>
              </div>
            </div>
          </div>

          <!-- Hours Card -->
          <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group info-card will-change-transform reveal-init">
            <div class="flex items-start gap-3">
              <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-500 mb-2">We're open</h4>
                <p class="text-gray-900 font-medium leading-relaxed text-sm">Mon-Fri: 8AM-5PM<br/>Sat: 8AM-12PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="grid lg:grid-cols-2">
            <div class="p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
              <div class="mb-8">
                <span class="inline-block text-red-600 text-sm font-semibold mb-3">Come Visit!</span>
                <h4 class="text-3xl font-bold text-gray-900 mb-4">Tour Our Facilities</h4>
                <p class="text-gray-600 text-lg leading-relaxed">Check out our amazing campus and boarding facilities! We're excited to show you around and answer any questions you have.</p>
              </div>
              <a href="https://maps.google.com/?q=Kamulu+Nairobi" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-3 bg-red-600 text-white font-semibold py-4 px-8 rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Get Directions</span>
              </a>
            </div>
            <div class="h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.123456789!2d37.0500!3d-1.2500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnMDAuMCJTIDM3wrAwMycwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890124!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Kamulu Campus Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/if}
    </div>
  </div>
</section>
<!-- End Campus Location Section -->

<!-- Section 3: Gallery -->
<section bind:this={gallerySection} class="py-16 bg-white">
   <div class="container mx-auto px-4 max-w-[1800px] w-full">
     <!-- Section Header -->
     <div class="text-center mb-12">
       <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h2>
       <p class="text-lg text-gray-600 max-w-2xl mx-auto">Explore the vibrant life at Cathsam School through moments captured in our facilities and activities</p>
     </div>
 
     <!-- Modern Grid Gallery -->
     <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
       
       {#each galleryImages as item, index}
         <a 
           href="/gallery" 
           data-gallery-item
           class="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 will-change-transform reveal-init {index === 0 ? 'lg:col-span-2 lg:row-span-3' : ''} {index === 1 || index === 2 ? 'lg:row-span-2' : ''}"
         >
           <img
             src={item.img}
             alt={item.title}
             class="w-full {index === 0 ? 'h-full' : index === 1 || index === 2 ? 'h-80' : 'h-64'} object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
           />
           <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <h3 class="{index === 0 ? 'text-2xl' : 'text-xl'} font-bold mb-1">{item.title}</h3>
               <p class="text-sm text-gray-200">{item.desc}</p>
             </div>
           </div>
         </a>
       {/each}

     </div>
 
     <!-- View Gallery Button -->
     <div class="text-center">
        <a href="/gallery" class="inline-flex items-center gap-2 bg-red-600 text-white font-semibold py-4 px-8 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
          <span>View Full Gallery</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
     </div>
 
   </div> 
 </section>

 <!-- End Section 3 -->
 
 <!-- Keep Call to Action Section -->
 <!-- ... -->

  
  <!-- Call to Action -->
  <section bind:this={ctaSection} class="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-visible md:overflow-hidden md:h-[50vh] flex items-center py-12 md:py-16">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>
    
    <div class="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 h-auto md:h-full flex items-center">
      <div class="w-full grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2 items-center">
        <!-- Left: Content -->
          <div class="text-center md:text-left">
          <span class="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">Ready to get started?</span>
          <h2 class="text-3xl md:text-4xl xl:text-5xl font-bold mb-3 leading-tight">Join Our School Community</h2>
          <p class="text-base md:text-lg text-white/90 leading-relaxed">Take the first step toward your child's bright future.</p>
        </div>
        
        <!-- Right: CTA Buttons & Quick Info -->
        <div class="flex flex-col gap-6">
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="/apply" class="group inline-flex items-center justify-center gap-3 bg-white text-red-600 font-bold py-4 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Apply Now</span>
            </a>
            <a href="/visit" class="group inline-flex items-center justify-center gap-3 bg-transparent border-3 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Schedule a Visit</span>
            </a>
          </div>
          
          <!-- Quick Contact -->
          <div class="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-white/90">+254 XXX XXX XXX</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-white/90">info@cathsamschool.ac.ke</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-white/90">Mon-Fri: 8AM-5PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
