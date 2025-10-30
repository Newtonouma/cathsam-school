<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { fade } from 'svelte/transition';

  // Default slides data (can be overridden by passing a prop)
  export let slides = [
    { id: 0, img: '/images/carousel/admissions.jpg', title: 'Admissions Open', desc: 'Join our community of excellence and innovation', cta: 'Apply Now', ctaLink: '/apply' },
    { id: 1, img: '/images/carousel/lab.jpg', title: 'State-of-the-art Labs', desc: 'Hands-on learning with modern equipment', cta: 'Explore Facilities', ctaLink: '/facilities' },
    { id: 2, img: '/images/carousel/concert.jpg', title: 'Annual Concert', desc: 'Celebrating talent and creativity', cta: 'View Events', ctaLink: '/events' },
    { id: 3, img: '/images/carousel/Karate.jpeg', title: 'Karate Training', desc: 'Building discipline and physical fitness', cta: 'Learn More', ctaLink: '/programs' },
    { id: 4, img: '/images/carousel/sports.jpg', title: 'Sports Excellence', desc: 'Developing teamwork and leadership', cta: 'Join Our Team', ctaLink: '/sports' },
  ];

  let activeSlide = 0;
  let interval: ReturnType<typeof setInterval>;
  const intervalDuration = 5000; // ms

  // Refs for hero animations
  let heroLeft: HTMLElement;
  let heroRight: HTMLElement;
  let currentSlideEl: HTMLElement;
  let gsap: any;

  // --- Functions ---
  function nextSlide() {
    activeSlide = (activeSlide + 1) % slides.length;
    resetInterval(); // Reset timer when manually changed
  }

  function prevSlide() {
    activeSlide = (activeSlide - 1 + slides.length) % slides.length;
    resetInterval(); // Reset timer when manually changed
  }

  function goToSlide(index: number) {
    activeSlide = index;
    resetInterval(); // Reset timer when manually changed
  }

  function startInterval() {
    if (typeof window !== 'undefined') {
      clearInterval(interval);
      interval = setInterval(nextSlide, intervalDuration);
    }
  }

  function resetInterval() {
    if (typeof window !== 'undefined') {
      clearInterval(interval);
      interval = setInterval(nextSlide, intervalDuration);
    }
  }

  async function runHeroAnimations() {
    if (!gsap) return;
    await tick();
    // Ken Burns subtle zoom on current slide background
    if (currentSlideEl) {
      gsap.killTweensOf(currentSlideEl);
      gsap.fromTo(
        currentSlideEl,
        { scale: 1.12, transformOrigin: 'center center', force3D: true },
        { scale: 1, duration: intervalDuration / 1000, ease: 'power2.out', force3D: true }
      );
    }
    // Overlay text reveal
    if (heroLeft && heroRight) {
      gsap.killTweensOf([heroLeft, heroRight]);
      gsap.fromTo(
        [heroLeft, heroRight],
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.18, force3D: true, immediateRender: false }
      );
    }
  }

  // --- Lifecycle ---
  onMount(async () => {
    const mod = await import('gsap');
    // @ts-ignore
    gsap = mod.gsap || mod.default || mod;
    startInterval();
    runHeroAnimations();
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      clearInterval(interval);
    }
  });

  // Re-run animations when slide changes
  $: if (gsap != null && activeSlide >= 0) {
    runHeroAnimations();
  }
</script>

<!-- Modern Hero Section Container -->
<div class="relative overflow-hidden w-full h-[80vh] min-h-[500px] bg-gray-900">

    <!-- Hero Image Slides -->
    <div class="relative w-full h-full">
        {#each slides as slide (slide.id || slide.img)} 
          {#if slides[activeSlide]?.id === slide.id || slides[activeSlide]?.img === slide.img} 
            <div
              class="absolute inset-0 bg-cover bg-center hero-bg will-change-transform"
              style="background-image: url('{slide.img}');"
              in:fade={{ duration: 500 }}
              out:fade={{ duration: 500 }}
              bind:this={currentSlideEl}
            >
             
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-black/20"></div>
            </div>
          {/if}
        {/each}
    </div>


    <!-- Slide Indicators -->
    <div class="absolute bottom-8 md:bottom-12 left-0 right-0 z-20">
      <div class="flex items-center justify-center space-x-3">
        {#each slides as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="h-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full {activeSlide === index ? 'w-12 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'}"
            aria-label="Go to slide {index + 1}"
            aria-current={activeSlide === index ? 'true' : 'false'}
          ></button>
        {/each}
      </div>
    </div>

    <!-- Static Welcome Section Overlay at Bottom -->
    <div class="absolute top-1/2 bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/100 via-black/90 to-transparent flex items-end pb-10">
      <div class="container mx-auto px-6 md:px-10 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div class="text-center md:text-left will-change-transform" bind:this={heroLeft}>
            <p class="text-sm uppercase tracking-wider text-gray-300 mb-1">WELCOME TO</p>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-red-500 mb-2 leading-tight">CATHSAM SCHOOL</h1>
            <p class="text-base uppercase font-semibold text-gray-200 tracking-wide">"A FIRM FOUNDATION - MSINGI IMARA"</p>
          </div>
          
          <div class="will-change-transform" bind:this={heroRight}>
            <h2 class="text-2xl md:text-3xl font-bold text-red-500 mb-4">Who We Are</h2>
            <p class="text-gray-200 leading-relaxed mb-6 text-base">
              Cathsam School is a <strong class="text-red-400 font-semibold">Mixed Day & Boarding</strong> school located at Umoja Innercore Nairobi along Moi Drive on spacious and beautiful premises.
            </p>
            <a href="/about" class="inline-block bg-red-600 text-white uppercase font-semibold py-3 px-8 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition duration-300 ease-in-out">
              Know Who We Are
            </a>
          </div>
        </div>
      </div>
    </div>
</div>

<!-- No <style> block needed if sizing is handled by Tailwind classes -->