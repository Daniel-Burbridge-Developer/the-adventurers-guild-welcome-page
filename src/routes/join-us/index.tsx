import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/join-us/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='bg-white dark:bg-gray-950 transition-colors duration-300'>
      <GuildHomePage />
    </div>
  );
}

function JoinUsHero() {
  return (
    <div className='relative bg-gradient-to-br from-purple-700 to-indigo-900 dark:from-purple-900 dark:to-gray-900 py-32 md:py-48 lg:py-64 overflow-hidden'>
      {/* Background Image/Overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-50'
        style={{
          backgroundImage:
            "url('src/routes/join-us/-images/join-us-hero-image.png')",
        }}
      />
      <div className='container mx-auto px-6 relative z-10 text-center'>
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight mb-6 font-serif'>
          Forge Your Legend With Us!
        </h1>
        <p className='text-lg md:text-2xl text-gray-200 dark:text-gray-300 font-medium shadow-sm mb-10 max-w-2xl mx-auto'>
          Ready to embark on epic adventures and become a vital part of our
          thriving guild? Join our ranks and let your story unfold!
        </p>
        <Link to='/apply'>
          <button className='bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full shadow-xl text-lg transition duration-300 border-2 border-orange-600 hover:scale-105 dark:from-yellow-400 dark:to-orange-500 dark:border-orange-500'>
            Apply to Join!
          </button>
        </Link>
      </div>

      {/* Decorative Curved Divider */}
      <div className='absolute bottom-0 left-0 w-full h-28 pointer-events-none'>
        <svg
          className='w-full h-full'
          viewBox='0 0 1440 140'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient id='curveGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#ede9fe' stopOpacity='0.95' />
              <stop offset='100%' stopColor='#fff' stopOpacity='1' />
            </linearGradient>
            <filter
              id='curveShadow'
              x='-20'
              y='0'
              width='1480'
              height='160'
              filterUnits='userSpaceOnUse'
            >
              <feDropShadow
                dx='0'
                dy='8'
                stdDeviation='8'
                floodColor='#a78bfa'
                floodOpacity='0.18'
              />
            </filter>
          </defs>
          {/* Light mode: gradient fill */}
          <path
            d='M0,100 C360,180 1080,0 1440,100 L1440,140 L0,140 Z'
            fill='url(#curveGradient)'
            filter='url(#curveShadow)'
            className='block dark:hidden'
          />
          {/* Dark mode: solid bg-gray-900 fill */}
          <path
            d='M0,100 C360,180 1080,0 1440,100 L1440,140 L0,140 Z'
            fill='#111827'
            filter='url(#curveShadow)'
            className='hidden dark:block'
          />
        </svg>
      </div>
    </div>
  );
}

function WhyJoinSection() {
  const reasons = [
    {
      title: 'Unforgettable Adventures',
      description:
        'Participate in thrilling quests, explore mysterious lands, and face formidable challenges alongside your guildmates.',
      icon: '🗺️',
      color: 'text-blue-400 dark:text-blue-300',
    },
    {
      title: 'Strong Community Bonds',
      description:
        'Forge lasting friendships with a diverse group of passionate adventurers who share your enthusiasm and camaraderie.',
      icon: '🤝',
      color: 'text-green-400 dark:text-green-300',
    },
    {
      title: 'Skill Enhancement',
      description:
        'Learn from experienced members, develop your abilities, and master new crafts and combat techniques within a supportive environment.',
      icon: '⚔️',
      color: 'text-red-400 dark:text-red-300',
    },
    {
      title: 'Shared Glory and Rewards',
      description:
        "Reap the benefits of your collective efforts, earning valuable treasures, recognition, and a place in the guild's storied history.",
      icon: '🏆',
      color: 'text-yellow-400 dark:text-yellow-300',
    },
  ];

  return (
    <section className='bg-white dark:bg-gray-900 py-16 md:py-24 transition-colors duration-300'>
      <div className='container mx-auto px-6 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8'>
          Why Join Our Esteemed Guild?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className='bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300'
            >
              <div className={`text-4xl mb-4 ${reason.color}`}>
                {reason.icon}
              </div>
              <h3 className='font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2'>
                {reason.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationProcessSection() {
  const steps = [
    'Review our Guild Charter and Values.',
    'Prepare a brief introduction about yourself and your adventuring experience.',
    'Fill out the online application form with the required details.',
    'Await our response – we carefully review all applications.',
    'If accepted, join our initiation process and become a full member!',
  ];

  return (
    <section className='bg-gray-200 dark:bg-gray-950 py-16 md:py-24 transition-colors duration-300'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center'>
          The Path to Membership
        </h2>
        <ol className='list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 space-y-4 max-w-xl mx-auto'>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className='mt-10 text-center'>
          <Link to='/apply'>
            <button className='bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-full shadow-xl text-lg transition duration-300 border-2 border-teal-600 hover:scale-105 dark:from-green-400 dark:to-teal-500 dark:border-teal-500'>
              Start Your Application!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GuildHomePage() {
  return (
    <div>
      <JoinUsHero />
      <WhyJoinSection />
      <ApplicationProcessSection />
      {/* You can add a Footer or other relevant sections here */}
    </div>
  );
}
