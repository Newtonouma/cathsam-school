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
      { imgSrc: '/images/programs/culinary.jpg', title: 'Culinary Arts', description: 'Hands-on training in cuisine preparation...', link: '/programs/culinary' },
    ];
  
     // Data for gallery (simple example)
    const mainGallery = { main: '/images/gallery/campus.jpeg', side1: '/images/gallery/library.jpg', side2: '/images/gallery/Karate.jpeg', side3: '/images/gallery/playground.jpg' };
    const smallGallery = [
        {img: '/images/gallery/Karate.jpeg', title: 'Tae Kwondo'},
        {img: '/images/gallery/library.jpg', title: 'Facilities'},
        {img: '/images/gallery/playground.jpg', title: 'Playground'},
        // ... more gallery items
    ];
  
  </script>
  
 
  <!-- Section 1: Image Carousel -->
  <Carousel />
  
 <!-- Section 2: Welcome / Who We Are (Replicates the image design) -->
<section class="bg-gray-100 py-16 md:py-24">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
   
      <div class="text-center md:text-left">
         <p class="text-sm uppercase tracking-wider text-gray-600 mb-1">WELCOME TO</p>
         <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-red-600 mb-2 leading-tight">CATHSAM SCHOOL</h1>
         <p class="text-base uppercase font-semibold text-gray-800 tracking-wide">"A FIRM FOUNDATION - MSINGI IMARA"</p>
      </div>
      
      <div>
         <h2 class="text-2xl md:text-3xl font-bold text-red-600 mb-4">Who We Are</h2>
         <p class="text-gray-700 leading-relaxed mb-6 text-base">
            Cathsam School is a <strong class="text-red-600 font-semibold">Mixed Day & Boarding</strong> school located at Umoja Innercore Nairobi along Moi Drive on spacious and beautiful premises.
         </p>
         <a href="/about" class="inline-block bg-red-600 text-white uppercase font-semibold py-3 px-8 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out">
           Know Who We Are
         </a>
      </div>
    </div>
  </div>
</section>
<!-- End Section 2 -->


<!-- ===== INSERTED SECTION: Mission & Vision ===== -->
<section class="py-16 bg-white"> 
  <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-red-600 mb-12 text-center">Our Foundation</h2> 

      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"> 

          <!-- Mission Card -->
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-600"> 
             <h3 class="text-2xl font-semibold text-red-700 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 align-text-bottom" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> </svg>
                Our Mission
             </h3>
             <p class="text-gray-700 leading-relaxed">
               
                To provide quality, cost-effective, personalized, and innovative primary education within a conducive environment, fostering creativity, critical thinking, and character development to nurture holistic children prepared for success in their lives.
             </p>
          </div>

          <!-- Vision Card -->
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-600"> 
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
</section>
<!-- ===== END: Mission & Vision Section ===== -->


<!-- Programs Section (Keep as is) -->
<section class="py-16 bg-gray-50"> 
    <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Our Programs</h3>
    <div class="container mx-auto px-4">
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
<!-- End Programs Section -->

  
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
                       <img src={mainGallery.side2} alt="Tae kwondo" class="w-full h-full object-cover">
                       <!-- Overlay -->
                   </div>
                   <div class="relative rounded-lg overflow-hidden h-44">
                     <img src={mainGallery.side3} alt="Playground" class="w-full h-full object-cover">
                     <!-- Overlay -->
                 </div>

               </div>
          </div>
  
          <!-- Small images gallery -->
      <!--     <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>-->
  
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