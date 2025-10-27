<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ProgramCard from './ProgramCard.svelte';

  export let programs = [];

  let currentIndex = 0;
  let interval: ReturnType<typeof setInterval>;
  const intervalDuration = 6000; // ms (6 seconds)
  let itemsPerPage = 4; // default for large screens
  let isTransitioning = true;

  // Calculate items per page based on screen width
  function updateItemsPerPage() {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const oldItemsPerPage = itemsPerPage;
      if (width < 768) {
        itemsPerPage = 1; // mobile (phones)
      } else if (width < 1024) {
        itemsPerPage = 3; // tablet
      } else {
        itemsPerPage = 4; // laptop and above
      }
      // Reset to first slide if items per page changed
      if (oldItemsPerPage !== itemsPerPage) {
        currentIndex = 1;
      }
    }
  }

  function nextSlide() {
    if (!isTransitioning) return;
    const maxIndex = Math.ceil(programs.length / itemsPerPage);
    currentIndex++;
    
    if (currentIndex > maxIndex) {
      setTimeout(() => {
        isTransitioning = false;
        currentIndex = 1;
        setTimeout(() => {
          isTransitioning = true;
        }, 50);
      }, 700);
    }
    resetInterval();
  }

  function prevSlide() {
    if (!isTransitioning) return;
    currentIndex--;
    
    if (currentIndex < 1) {
      setTimeout(() => {
        isTransitioning = false;
        currentIndex = Math.ceil(programs.length / itemsPerPage);
        setTimeout(() => {
          isTransitioning = true;
        }, 50);
      }, 700);
    }
    resetInterval();
  }

  function goToSlide(index: number) {
    if (!isTransitioning) return;
    currentIndex = index + 1;
    resetInterval();
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

  onMount(() => {
    updateItemsPerPage();
    currentIndex = 1; // Start at first real slide
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateItemsPerPage);
    }
    startInterval();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      clearInterval(interval);
      window.removeEventListener('resize', updateItemsPerPage);
    }
  });

  $: totalSlides = Math.ceil(programs.length / itemsPerPage);
  
  // Helper function to get cards for a slide, cycling through programs if needed
  function getSlidePrograms(slideIndex: number) {
    const startIdx = slideIndex * itemsPerPage;
    const result = [];
    // Only get the exact number of items we need for this viewport
    const itemsToShow = itemsPerPage;
    for (let i = 0; i < itemsToShow; i++) {
      const idx = (startIdx + i) % programs.length;
      result.push(programs[idx]);
    }
    return result.slice(0, itemsToShow);
  }
</script>

<div class="relative overflow-hidden pb-16">
  <!-- Programs Display -->
  <div 
    class="flex {isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}"
    style="transform: translateX(-{currentIndex * 100}%)"
  >
    <!-- Last slide clone (for backward infinite loop) -->
    <div class="flex-shrink-0 w-full">
      <div class="carousel-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 items-start">
        {#each getSlidePrograms(totalSlides - 1) as program}
          <ProgramCard
            imgSrc={program.imgSrc}
            title={program.title}
            description={program.description}
            link={program.link}
          />
        {/each}
      </div>
    </div>
    
    <!-- Real slides -->
    {#each Array(totalSlides) as _, slideIndex}
      <div class="flex-shrink-0 w-full">
        <div class="carousel-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 items-start">
          {#each getSlidePrograms(slideIndex) as program}
            <ProgramCard
              imgSrc={program.imgSrc}
              title={program.title}
              description={program.description}
              link={program.link}
            />
          {/each}
        </div>
      </div>
    {/each}
    
    <!-- First slide clone (for forward infinite loop) -->
    <div class="flex-shrink-0 w-full">
      <div class="carousel-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 items-start">
        {#each getSlidePrograms(0) as program}
          <ProgramCard
            imgSrc={program.imgSrc}
            title={program.title}
            description={program.description}
            link={program.link}
          />
        {/each}
      </div>
    </div>
  </div>

  <!-- Navigation Controls -->
  <div class="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:px-0">
    <!-- Prev Button -->
    <button
      on:click={prevSlide}
      class="pointer-events-auto bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label="Previous Programs"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- Next Button -->
    <button
      on:click={nextSlide}
      class="pointer-events-auto bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label="Next Programs"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <!-- Slide Indicators -->
  <div class="flex items-center justify-center space-x-2 absolute bottom-0 left-0 right-0">
    {#each Array(totalSlides) as _, index}
      <button
        on:click={() => goToSlide(index)}
        class="h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 {(currentIndex === index + 1 || (currentIndex === 0 && index === totalSlides - 1) || (currentIndex === totalSlides + 1 && index === 0)) ? 'w-8 bg-red-600' : 'w-2.5 bg-gray-400 hover:bg-gray-500'}"
        aria-label="Go to slide {index + 1}"
        aria-current={(currentIndex === index + 1) ? 'true' : 'false'}
      ></button>
    {/each}
  </div>
</div>

<style>
  /* Hide extra cards on mobile (show only 1) */
  @media (max-width: 767px) {
    :global(.carousel-grid > *:nth-child(n+2)) {
      display: none !important;
    }
  }
  
  /* Hide extra cards on tablet (show only 3) */
  @media (min-width: 768px) and (max-width: 1023px) {
    :global(.carousel-grid > *:nth-child(n+4)) {
      display: none !important;
    }
  }
</style>

