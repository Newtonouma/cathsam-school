<script lang="ts">
    let mobileMenuOpen = false; // Example state for mobile menu
  </script>
  
  <nav class="bg-red-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <!-- Logo -->
            <div class="flex items-center py-2 px-2"></div>
            <a href="/" class="flex items-center space-x-2">
              <img src="programs/logopng.png" alt="Cathsam School Logo" class="h-12 w-auto">
              <span class="font-bold text-xl">Cathsam School</span>
            </a>
            </div>
          <!-- Primary Nav -->
          <div class="hidden md:flex items-center space-x-1">
            <a href="/" class="py-5 px-3 hover:bg-red-700 transition duration-300">Home</a>
            <a href="/about" class="py-5 px-3 hover:bg-red-700 transition duration-300">About</a>
            <a href="/programs" class="py-5 px-3 hover:bg-red-700 transition duration-300">Programs</a>
            <a href="/gallery" class="py-5 px-3 hover:bg-red-700 transition duration-300">Gallery</a>
            <a href="/contact" class="py-5 px-3 hover:bg-red-700 transition duration-300">Contact</a>
          </div>
        </div>
        <!-- Secondary Nav -->
        <div class="hidden md:flex items-center space-x-1">
          <a href="/apply" class="py-2 px-4 bg-white text-red-600 rounded hover:bg-gray-100 transition duration-300">Apply Now</a>
        </div>
  
        <!-- Mobile button -->
        <div class="md:hidden flex items-center">
          <button aria-label="Toggle mobile menu" on:click={() => mobileMenuOpen = !mobileMenuOpen} class="mobile-menu-button p-4 focus:outline-none focus:bg-red-700">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  
    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
    <div class="mobile-menu md:hidden pb-3">
      <a href="/" class="block py-2 px-4 text-sm hover:bg-red-700">Home</a>
      <a href="/about" class="block py-2 px-4 text-sm hover:bg-red-700">About</a>
      <!-- ... other mobile links ... -->
      <a href="/apply" class="block mt-2 mx-4 py-2 px-4 bg-white text-red-600 rounded text-center hover:bg-gray-100 transition duration-300">Apply Now</a>
    </div>
    {/if}
  </nav>