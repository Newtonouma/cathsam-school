<script>
    import  Carousel  from '$lib/components/Carousel.svelte';
    import ProgramCard from '$lib/components/ProgramCard.svelte';
    // Import GalleryItem if you made one
  
    // Data for program cards
    const programs = [
      { imgSrc: '/images/programs/KGschool.jpeg', title: 'Kindergarten', description: 'A nurturing environment where young learners develop foundational skills...', link: '/programs/kindergarten' },
      { imgSrc: '/images/programs/juniorsec.jpeg', title: 'Junior Secondary', description: 'Comprehensive education that balances academic excellence...', link: '/programs/junior-secondary' },
      { imgSrc: '/images/programs/CBC.jpeg', title: 'CBC Program', description: 'Competency-Based Curriculum focusing on skills...', link: '/programs/cbc' },
      { imgSrc: '/images/programs/hairdressing.jpeg', title: 'Hairdressing', description: 'Professional training in cutting-edge techniques...', link: '/programs/hairdressing' },
      { imgSrc: '/images/programs/IT.jpeg', title: 'Information Technology', description: 'Preparing students for the digital future...', link: '/programs/it' },
      { imgSrc: '/images/programs/culinary.jpeg', title: 'Culinary Arts', description: 'Hands-on training in cuisine preparation...', link: '/programs/culinary' },
    ];
  
     // Data for gallery (simple example)
    const mainGallery = { main: '/images/gallery/campus.jpeg', side1: '/images/gallery/library.jpg', side2: '/images/gallery/science-lab.jpg' };
    const smallGallery = [
        {img: '/images/gallery/sports-field.jpg', title: 'Sports Field'},
        {img: '/images/gallery/cafeteria.jpg', title: 'Cafeteria'},
        {img: '/images/gallery/annual-concert.jpg', title: 'Annual Concert'},
        // ... more gallery items
    ];
  
  </script>
  
 
  <!-- Section 1: Image Carousel -->
  <Carousel />
  
  <!-- Section 2: Mission, Vision & Programs -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-red-600 mb-2">Our Mission & Vision</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          We strive to provide quality education that nurtures creativity, critical thinking, and character development in a supportive and inclusive environment.
        </p>
      </div>
  
      <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Our Programs</h3>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each programs as program}
          <ProgramCard
            imgSrc={program.imgSrc}
            title={program.title}
            description={program.description}
            link={program.link}
          />
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Section 3: Gallery -->
  <section class="py-16">
     <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-red-600 text-center mb-12">Our Gallery</h2>
  
          <!-- Main school picture and facilities -->
          <div class="flex flex-col md:flex-row mb-12 gap-6">
               <div class="md:w-2/3">
                  <!-- Main Image -->
                   <div class="relative rounded-lg overflow-hidden h-96">
                       <img src={mainGallery.main} alt="Main School Building" class="w-full h-full object-cover">
                       <!-- Overlay -->
                   </div>
               </div>
               <div class="md:w-1/3 grid grid-cols-1 gap-4">
                  <!-- Side Images -->
                   <div class="relative rounded-lg overflow-hidden h-44">
                       <img src={mainGallery.side1} alt="Library" class="w-full h-full object-cover">
                       <!-- Overlay -->
                   </div>
                    <div class="relative rounded-lg overflow-hidden h-44">
                       <img src={mainGallery.side2} alt="Science Lab" class="w-full h-full object-cover">
                       <!-- Overlay -->
                   </div>
               </div>
          </div>
  
          <!-- Small images gallery -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
               {#each smallGallery as item}
                  <div class="relative rounded-lg overflow-hidden h-48 group">
                      <img src={item.img} alt={item.title} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                      <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                          <div class="p-3 text-white">
                          <h4 class="text-lg font-semibold">{item.title}</h4>
                          </div>
                      </div>
                  </div>
               {/each}
          </div>
  
           <div class="text-center mt-8">
              <a href="/gallery" class="inline-block bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300">View Full Gallery</a>
          </div>
     </div>
  </section>
  
  <!-- Call to Action -->
  <section class="py-16 bg-red-600 text-white">
    <div class="container mx-auto px-4 text-center">
       <h2 class="text-3xl font-bold mb-4">Join Our School Community</h2>
       <p class="text-xl mb-8 max-w-2xl mx-auto">Discover the difference quality education can make...</p>
       <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/apply" class="bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">Apply Now</a>
          <a href="/visit" class="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-red-600 transition duration-300">Schedule a Visit</a>
      </div>
    </div>
  </section>