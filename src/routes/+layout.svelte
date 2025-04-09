<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css'; // Import global styles
  </script>
  
  <div class="red-theme flex min-h-screen flex-col bg-white">
	<Navbar />
  
	<main class="flex-grow">
	  <slot /> <!-- Page content goes here -->
	</main>
  
	<Footer />
  </div>