import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute('/gallery/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <GallerySection />
    </div>
  );
}
interface GalleryItem {
  src: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  { src: 'src/routes/gallery/-images/image-1.jpg', alt: 'Elara and Ignis' },
  {
    src: 'src/routes/gallery/-images/image-2.jpg',
    alt: 'Grolak, the Unburdened',
  },
  {
    src: 'src/routes/gallery/-images/image-3.jpg',
    alt: "Torvin, the Desert's Bite",
  },
  {
    src: 'src/routes/gallery/-images/image-4.jpg',
    alt: 'Sylvana',
  },
  {
    src: 'src/routes/gallery/-images/image-5.jpg',
    alt: 'Rajah, the Astral Claw',
  },
  { src: 'src/routes/gallery/-images/image-6.jpg', alt: 'Jerek' },
  {
    src: 'src/routes/gallery/-images/image-7.png',
    alt: 'Anya, the Iron Saint',
  },
  { src: 'src/routes/gallery/-images/image-8.jpg', alt: 'Frostfang' },
  {
    src: 'src/routes/gallery/-images/image-9.jpg',
    alt: "Aethelred, the Light's Vindicator",
  },
  {
    src: 'src/routes/gallery/-images/image-10.png',
    alt: 'Kage & Yami, the Crimson Reavers',
  },
  {
    src: 'src/routes/gallery/-images/image-11.jpg',
    alt: 'The Obsidian Bulwark',
  },
  { src: 'src/routes/gallery/-images/image-12.jpg', alt: 'Fidget' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openModal = (image: GalleryItem) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <section className='bg-gray-950 py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-white mb-12 text-center'>
          Guild Hall Gallery
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className='rounded-lg overflow-hidden cursor-pointer group relative'
              onClick={() => openModal(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300' />
              <p className='absolute bottom-2 left-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                {item.alt}
              </p>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className='relative max-w-3xl max-h-full'
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className='rounded-lg shadow-xl max-h-[80vh] w-auto'
                />
                <button
                  onClick={closeModal}
                  className='absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
                <p className='text-white text-center mt-2'>
                  {selectedImage.alt}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
