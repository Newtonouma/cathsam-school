<script lang="ts">
    export let imgSrc = '/api/placeholder/400/250'; // Default placeholder
    export let title = 'Program Title';
    export let description = 'Program description goes here.';
    export let link = '#'; // Or a specific path like '/programs/kindergarten'
  </script>
  
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img src={imgSrc} alt={title} class="w-full h-48 object-cover">
    <div class="p-6">
      <h3 class="text-xl font-bold text-red-600 mb-2">{title}</h3>
      <p class="text-gray-600 mb-4">{description}</p>
      <a href={link} class="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">Learn More</a>
    </div>
  </div>