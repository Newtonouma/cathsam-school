<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    export let slides = [
      { img: '/images/carousel/admissions.jpg', title: 'Admissions Open', desc: 'Join our community of excellence and innovation' },
      { img: '/images/carousel/lab.jpg', title: 'State-of-the-art Labs', desc: 'Hands-on learning with modern equipment' },
      { img: '/images/carousel/concert.jpg', title: 'Annual Concert', desc: 'Celebrating talent and creativity' },
      { img: '/images/carousel/Karate.jpeg', title: 'Karate Training', desc: 'Building discipline and physical fitness' },
      { img: '/images/carousel/sports.jpg', title: 'Sports Excellence', desc: 'Developing teamwork and leadership' },
    ];

    let activeSlide = 0;
    let interval: ReturnType<typeof setInterval>;

    function nextSlide() {
      activeSlide = (activeSlide + 1) % slides.length;
    }

    function prevSlide() {
      activeSlide = (activeSlide - 1 + slides.length) % slides.length;
    }

    function goToSlide(index: number) {
      activeSlide = index;
    }

    // Auto-play functionality
    onMount(() => {
      interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    });

    onDestroy(() => {
      clearInterval(interval); // Clear interval when component is destroyed
    });

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    $: { // Reset interval when user manually changes slide
        if (typeof window !== 'undefined') { // Ensure runs only in browser
            resetInterval();
        }
    }

</script>

<div class="relative overflow-hidden carousel-container h-[600px]">
    <!-- Carousel images -->
    {#each slides as slide, index (index)}
      {#if index === activeSlide}
        <div
          class="absolute inset-0 bg-cover bg-center"
          style="background-image: url('{slide.img}');"
          transition:fade={{ duration: 500 }}
        >
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 class="text-4xl font-bold">{slide.title}</h2>
            <p class="text-xl">{slide.desc}</p>
          </div>
        </div>
      {/if}
    {/each}

    <!-- Carousel controls -->
    <div class="absolute inset-0 flex">
      <div class="flex items-center justify-start w-1/2">
        <button
          on:click={prevSlide}
          class="bg-red-600 text-white p-3 rounded-full bg-opacity-80 shadow-md hover:bg-opacity-100 ml-4 focus:outline-none"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-end w-1/2">
        <button
          on:click={nextSlide}
          class="bg-red-600 text-white p-3 rounded-full bg-opacity-80 shadow-md hover:bg-opacity-100 mr-4 focus:outline-none"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel indicators -->
    <div class="absolute bottom-4 left-0 right-0">
      <div class="flex items-center justify-center space-x-2">
        {#each slides as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none"
            class:bg-white={true}
            class:bg-opacity-50={activeSlide !== index}
            aria-label="Go to slide {index + 1}"
          ></button>
        {/each}
      </div>
    </div>
</div>

<style>
  .carousel-container {
    width: 100%;
    aspect-ratio: 16/9;
    max-height: 80vh; /* Prevents the carousel from being too tall on large screens */
  }

  /* Ensure images cover the full container while maintaining aspect ratio */
  :global(.carousel-container .bg-cover) {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
  }
</style>