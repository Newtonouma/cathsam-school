<script lang="ts">
    let mobileMenuOpen = false;
    let scrolled = false;

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            scrolled = window.scrollY > 20;
        });
    }
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}">
    <div class="container mx-auto px-4 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 group">
                <img src="images/programs/logopng.png" alt="Cathsam School Logo" class="h-12 w-auto transition-transform group-hover:scale-105">
                <div class="hidden sm:block">
                    <span class="font-bold text-xl text-gray-900 block leading-tight">Cathsam School</span>
                    <span class="text-xs text-red-600 font-medium">Excellence in Education</span>
                </div>
            </a>

            <!-- Desktop Nav -->
            <div class="hidden lg:flex items-center gap-1">
                <a href="/" class="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors rounded-lg hover:bg-red-50">Home</a>
                <a href="/about" class="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors rounded-lg hover:bg-red-50">About</a>
                <a href="/programs" class="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors rounded-lg hover:bg-red-50">Programs</a>
                <a href="/contact" class="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors rounded-lg hover:bg-red-50">Contact</a>
            </div>

            <!-- CTA Button -->
            <div class="hidden lg:flex items-center gap-3">
                <a href="/apply" class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span>Apply Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button 
                on:click={() => mobileMenuOpen = !mobileMenuOpen} 
                class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
            >
                {#if mobileMenuOpen}
                    <svg class="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                {:else}
                    <svg class="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                {/if}
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
    <div class="lg:hidden border-t border-gray-200 bg-white">
        <div class="container mx-auto px-4 py-4 space-y-1">
            <a 
                href="/" 
                on:click={() => mobileMenuOpen = false}
                class="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
                Home
            </a>
            <a 
                href="/about" 
                on:click={() => mobileMenuOpen = false}
                class="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
                About
            </a>
            <a 
                href="/programs" 
                on:click={() => mobileMenuOpen = false}
                class="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
                Programs
            </a>
            <a 
                href="/contact" 
                on:click={() => mobileMenuOpen = false}
                class="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
                Contact
            </a>
            <div class="pt-4">
                <a 
                    href="/apply" 
                    on:click={() => mobileMenuOpen = false}
                    class="flex items-center justify-center gap-2 w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg"
                >
                    <span>Apply Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
    {/if}
</nav>

<!-- Spacer to prevent content from going under fixed navbar -->
<div class="h-20"></div>
