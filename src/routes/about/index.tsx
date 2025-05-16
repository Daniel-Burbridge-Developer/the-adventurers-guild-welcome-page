import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

interface Member {
  name: string;
  image: string;
}

const fetchMembers = createServerFn().handler(async () => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  const response = await fetch(
    'https://randomuser.me/api/?inc=name,picture&results=32'
  );
  const data = await response.json();
  const members: Member[] = data.results.map((user: any) => ({
    name: user.name.first,
    image: user.picture.medium,
  }));

  return members;
});

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <GuildAboutPage />
    </div>
  );
}

interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
}

const guildLeaders: Leader[] = [
  {
    name: 'Anya Swiftblade',
    title: 'Guild Master',
    bio: 'Anya is a legendary swordswoman and the charismatic leader of the guild. Her skill in combat is matched only by her unwavering determination and strategic mind. She guides the guild with wisdom and courage.',
    image: 'src/routes/-images/anya-swiftblade.jpg', // Replace with actual image paths
  },
  {
    name: 'Eldrin The Arcane',
    title: 'Chief Sorcerer',
    bio: 'Eldrin is a master of the arcane arts, wielding magic with precision and power. His knowledge of ancient spells and enchantments is invaluable to the guild. He is also known for his enigmatic personality.',
    image: 'src/routes/-images/eldrin-the-arcane.jpg', // Replace
  },
  {
    name: 'Borin Ironclad',
    title: 'Head of Arms',
    bio: "Borin is a stalwart warrior and the master of the guild's armory. His strength and skill with weapons are unmatched, and he ensures that every member is well-equipped for any challenge. He is also a master strategist.",
    image: 'src/routes/-images/borin-ironclad.jpg', // Replace
  },
  {
    name: 'Lysandra Shadowfoot',
    title: 'Master of Secrets',
    bio: "Lysandra is a cunning rogue and the guild's expert in espionage and infiltration. Her ability to gather information and move unseen is essential for the guild's success. She is very mysterious.",
    image: 'src/routes/-images/lysandra-shadowfoot.jpg', // Replace
  },
];

const GuildAboutPage = () => {
  const { data: members, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: () => fetchMembers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className='bg-gray-900 text-white'>
      {/* Hero Section */}
      <section className='bg-gradient-to-br from-gray-900 to-black py-20 md:py-32 text-center'>
        <div className='container mx-auto px-6'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 font-serif'>
            About Our Guild
          </h1>
          <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto'>
            We are a fellowship of adventurers, bound by a common purpose and a
            thirst for glory. We seek to carve our names into legend!
          </p>
        </div>
      </section>

      {/* Guild Charter Section */}
      <section className='bg-gray-800 py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold mb-8 text-center font-serif'>
            Guild Charter
          </h2>
          <p className='text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto'>
            <span className='font-semibold'>Purpose:</span> To unite skilled
            adventurers in pursuit of glory, knowledge, and the protection of
            the realm.
          </p>
          <ul className='list-disc list-inside text-gray-300 text-lg leading-relaxed mt-4 max-w-4xl mx-auto'>
            <li>Uphold the values of courage, honor, and integrity.</li>
            <li>
              Respect fellow guild members and foster a spirit of camaraderie.
            </li>
            <li>Seek knowledge and wisdom in all endeavors.</li>
            <li>Protect the innocent and defend against injustice.</li>
            <li>Contribute to the growth and prosperity of the guild.</li>
          </ul>
        </div>
      </section>

      {/* Guild Values Section */}
      <section className='bg-gray-900 py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold mb-8 text-center font-serif'>
            Our Core Values
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <div className='bg-gray-800 rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-cyan-300'>
                Courage
              </h3>
              <p className='text-gray-300'>
                We face challenges with bravery and determination, even in the
                face of overwhelming odds.
              </p>
            </div>
            <div className='bg-gray-800 rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-cyan-300'>
                Honor
              </h3>
              <p className='text-gray-300'>
                We act with integrity and uphold the highest ethical standards
                in all our dealings.
              </p>
            </div>
            <div className='bg-gray-800 rounded-lg p-6 shadow-md'>
              <h3 className='text-xl font-semibold mb-2 text-cyan-300'>
                Camaraderie
              </h3>
              <p className='text-gray-300'>
                We support and respect our fellow members, fostering a strong
                sense of community and teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leader Biographies Section */}
      <section className='bg-gray-800 py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold mb-12 text-center font-serif'>
            Meet Our Leaders
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {guildLeaders.map((leader) => (
              <div
                key={leader.name}
                className='flex flex-col md:flex-row items-center gap-6'
              >
                <div className='w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-gray-700'>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div>
                  <h3 className='text-2xl font-semibold mb-1 text-cyan-300'>
                    {leader.name}
                  </h3>
                  <p className='text-gray-400 mb-2'>{leader.title}</p>
                  <p className='text-gray-300 leading-relaxed'>{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Members Section */}
      <section className='bg-gray-900 py-16'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold mb-8 text-center font-serif'>
            Our Valued Members
          </h2>
          <div className='flex flex-wrap justify-center gap-6'>
            {isLoading && <p className='text-gray-400'>Loading members...</p>}
            {!isLoading &&
              members &&
              members.length > 0 &&
              members.map((member: Member) => (
                <div key={member.name} className='flex flex-col items-center'>
                  <div className='w-24 h-24 rounded-full overflow-hidden shadow-md border-2 border-gray-700'>
                    <img
                      src={member.image}
                      alt={member.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <p className='text-gray-400 mt-2 text-center'>
                    {member.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
