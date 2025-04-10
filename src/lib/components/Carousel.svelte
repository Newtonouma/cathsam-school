<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  // Default slides data (can be overridden by passing a prop)
  export let slides = [
    { id: 0, img: '/images/carousel/admissions.jpg', title: 'Admissions Open', desc: 'Join our community of excellence and innovation' },
    { id: 1, img: '/images/carousel/lab.jpg', title: 'State-of-the-art Labs', desc: 'Hands-on learning with modern equipment' },
    { id: 2, img: '/images/carousel/concert.jpg', title: 'Annual Concert', desc: 'Celebrating talent and creativity' },
    { id: 3, img: '/images/carousel/Karate.jpeg', title: 'Karate Training', desc: 'Building discipline and physical fitness' }, // Ensure Karate.jpeg has correct case
    { id: 4, img: '/images/carousel/sports.jpg', title: 'Sports Excellence', desc: 'Developing teamwork and leadership' },
  ];

  let activeSlide = 0;
  let interval: ReturnType<typeof setInterval>;
  const intervalDuration = 5000; // ms

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

  // --- Lifecycle ---
  onMount(startInterval);
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      clearInterval(interval);
    }
  });

</script>

<!-- Responsive Container: aspect-video is 16:9. Adjust max-height as needed. Added bg-gray-200 for loading state -->
<div class="relative overflow-hidden w-full aspect-video max-h-[85vh] bg-gray-200">

    <!-- Carousel Image Slides -->
    <div class="relative w-full h-full">
        {#each slides as slide (slide.id || slide.img)} 
          {#if slides[activeSlide]?.id === slide.id || slides[activeSlide]?.img === slide.img} 
            <div
              class="absolute inset-0 bg-cover bg-center"
              style="background-image: url('{slide.img}');"
              in:fade={{ duration: 300 }}
              out:fade={{ duration: 300 }}
            >
             
              <div class="absolute inset-0 bg-black bg-opacity-30"></div>

              
              <div class="absolute inset-y-0 left-0 z-10 flex items-center p-6 md:p-10 lg:p-12"> 
                <div class="text-white max-w-xl"> 
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{slide.title}</h2>
                  <p class="text-lg md:text-xl">{slide.desc}</p>
                </div>
              </div>
            </div>
          {/if}
        {/each}
    </div>

    <!-- Carousel controls (Positioned over the image, inset slightly) -->
    <div class="absolute inset-0 z-10 flex items-center justify-between px-4 sm:px-6">
      <!-- Prev Button -->
      <button
        on:click={prevSlide}
        class="bg-red-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black/50 transition duration-200 ease-in-out"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <!-- Next Button -->
      <button
        on:click={nextSlide}
        class="bg-red-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black/50 transition duration-200 ease-in-out"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Carousel indicators (Bottom center) -->
    <div class="absolute bottom-4 sm:bottom-5 left-0 right-0 z-10">
      <div class="flex items-center justify-center space-x-2">
        {#each slides as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white transition-opacity duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-black/50"
            class:opacity-100={activeSlide === index} 
            class:opacity-50={activeSlide !== index} 
            class:hover:opacity-75={activeSlide !== index} 
            aria-label="Go to slide {index + 1}"
            aria-current={activeSlide === index ? 'true' : 'false'}
          ></button>
        {/each}
      </div>
    </div>
</div>

<!-- No <style> block needed if sizing is handled by Tailwind classes -->