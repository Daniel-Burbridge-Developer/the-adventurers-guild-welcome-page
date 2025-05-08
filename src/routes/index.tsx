import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeroImage />
      <GuildHomePage />
    </div>
  );
}

function HeroImage() {
  return (
    <div
      className="splash-banner"
      style={{
        backgroundImage: "url('src/routes/-images/hero-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  );
}

interface HeroCardProps {
  name: string;
  role: string;
  imageSrc: string;
  colorClass: "cyan" | "blue" | "purple" | "gray";
  mdHidden?: boolean;
}

function HeroCard({
  name,
  role,
  imageSrc,
  colorClass,
  mdHidden,
}: HeroCardProps) {
  const bgGradientClass = `bg-gradient-to-br from-gray-800/80 to-${colorClass}-900/80`;
  const borderClass = `border-2 border-${colorClass}-400/40`;
  const textColorClass = `text-${colorClass}-50`;
  const secondaryTextColorClass = `text-${colorClass}-200`;

  return (
    <div
      className={`${bgGradientClass} rounded-xl shadow-lg overflow-hidden ${borderClass} ${
        mdHidden ? "hidden md:block" : ""
      } flex flex-col`}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className={`p-3 text-center ${textColorClass} mt-auto`}>
        {" "}
        {/* mt-auto pushes to the bottom */}
        <h3 className="font-bold text-lg font-serif">{name}</h3>
        <p className={`text-sm ${secondaryTextColorClass}`}>{role}</p>
      </div>
    </div>
  );
}

interface MemberData {
  name: string;
  role: string;
  imageSrc: string;
  colorClass: "cyan" | "blue" | "purple" | "gray";
  mdHidden?: boolean;
}

function HeroSection() {
  const membersData: MemberData[] = [
    {
      name: "Anya 'Swiftblade'",
      role: "Guild Master",
      imageSrc: "src/routes/-images/anya-swiftblade.jpg",
      colorClass: "cyan",
    },
    {
      name: "Eldrin 'The Arcane'",
      role: "Chief Sorcerer",
      imageSrc: "src/routes/-images/eldrin-the-arcane.jpg",
      colorClass: "blue",
    },
    {
      name: "Borin 'Ironclad'",
      role: "Head of Arms",
      imageSrc: "src/routes/-images/borin-ironclad.jpg",
      colorClass: "purple",
      mdHidden: true,
    },
    {
      name: "Lysandra 'Shadowfoot'",
      role: "Master of Secrets",
      imageSrc: "src/routes/-images/lysandra-shadowfoot.jpg",
      colorClass: "gray",
      mdHidden: true,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 py-16 md:py-24 lg:py-32 overflow-hidden shadow-xl relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('src/routes/-images/guild-hall-background.jpg')",
        }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Guild Motto */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg tracking-tight mb-4 font-serif">
          By Skill and Valor, Our Glory Soars!
        </h1>
        {/* Call to Action */}
        <p className="text-lg md:text-xl text-gray-200 font-medium shadow-sm mb-8 max-w-xl mx-auto">
          Embark on legendary quests, forge unbreakable bonds, and etch your
          name in the annals of adventure!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10">
          <Link to="/join-us">
            <button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-md text-lg transition duration-300 border-2 border-blue-700 hover:scale-105">
              Join the Guild!
            </button>
          </Link>
          <Link to="/gallery">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-full shadow-md text-lg transition duration-300 border-2 border-indigo-700 hover:scale-105">
              View Our History
            </button>
          </Link>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-gradient-to-t from-black/80 to-transparent py-8 md:py-12 mt-12 md:mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-6 text-center drop-shadow">
            Our Esteemed Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {membersData.map((member, index) => (
              <HeroCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface AchievementItemProps {
  icon: string;
  title: string;
  description: string;
  colorClass:
    | "cyan"
    | "blue"
    | "purple"
    | "yellow"
    | "green"
    | "orange"
    | "lime"
    | "red"
    | "teal";
}

function AchievementItem({
  icon,
  title,
  description,
  colorClass,
}: AchievementItemProps) {
  // Map colorClass to explicit Tailwind classes
  const bgGradientClassMap: Record<string, string> = {
    cyan: "bg-gradient-to-br from-gray-700/90 to-cyan-800/90",
    blue: "bg-gradient-to-br from-gray-700/90 to-blue-800/90",
    purple: "bg-gradient-to-br from-gray-700/90 to-purple-800/90",
    yellow: "bg-gradient-to-br from-gray-700/90 to-yellow-800/90",
    green: "bg-gradient-to-br from-gray-700/90 to-green-800/90",
    orange: "bg-gradient-to-br from-gray-700/90 to-orange-800/90",
    lime: "bg-gradient-to-br from-gray-700/90 to-lime-800/90",
    red: "bg-gradient-to-br from-gray-700/90 to-red-800/90",
    teal: "bg-gradient-to-br from-gray-700/90 to-teal-800/90",
  };
  const borderClassMap: Record<string, string> = {
    cyan: "border-2 border-cyan-600/30",
    blue: "border-2 border-blue-600/30",
    purple: "border-2 border-purple-600/30",
    yellow: "border-2 border-yellow-600/30",
    green: "border-2 border-green-600/30",
    orange: "border-2 border-orange-600/30",
    lime: "border-2 border-lime-600/30",
    red: "border-2 border-red-600/30",
    teal: "border-2 border-teal-600/30",
  };
  const iconTextColorClassMap: Record<string, string> = {
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
    orange: "text-orange-400",
    lime: "text-lime-400",
    red: "text-red-400",
    teal: "text-teal-400",
  };

  const bgGradientClass = bgGradientClassMap[colorClass] || "";
  const borderClass = borderClassMap[colorClass] || "";
  const iconTextColorClass = iconTextColorClassMap[colorClass] || "";

  return (
    <div
      className={`${bgGradientClass} rounded-xl shadow-md p-6 text-center ${borderClass}`}
    >
      <div className={`${iconTextColorClass} text-4xl mb-3 drop-shadow`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 font-serif text-gray-200">
        {title}
      </h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

function AchievementsSection() {
  const achievementsData: AchievementItemProps[] = [
    {
      icon: "🏆",
      title: "Slayers of the Shadow Drake",
      description:
        "Brave heroes who vanquished the terror of the Whispering Peaks, bringing peace to the nearby villages and recovering ancient artifacts.",
      colorClass: "cyan",
    },
    {
      icon: "🗺️",
      title: "Charted the Lost Isles",
      description:
        "First to map the treacherous archipelago of Azmar, discovering new trade routes and uncovering forgotten civilizations.",
      colorClass: "blue",
    },
    {
      icon: "🛡️",
      title: "Defenders of Eldoria",
      description:
        "Repelled the massive Goblin Horde at the Gates of the Silver City, saving countless lives and earning the eternal gratitude of the Eldorian people.",
      colorClass: "purple",
    },
    {
      icon: "🌟",
      title: "Champions of the Azure Tournament",
      description:
        "Victorious in the prestigious Azure Tournament, showcasing unparalleled skill in combat, magic, and strategy against the realm's finest.",
      colorClass: "yellow",
    },
    {
      icon: "📜",
      title: "Recovered the Scrolls of Knowledge",
      description:
        "Successfully retrieved the lost Scrolls of Knowledge from the clutches of the ancient Lich of Blackwood, preserving invaluable historical and magical lore.",
      colorClass: "green",
    },
    {
      icon: "💰",
      title: "Amassed a King's Ransom",
      description:
        "Through daring expeditions and shrewd negotiations, the guild has accumulated a treasure hoard of legendary proportions, funding further adventures and benefiting the local communities.",
      colorClass: "orange",
    },
    {
      icon: "🤝",
      title: "Forged Alliances with the Sylvans",
      description:
        "Established a lasting alliance with the reclusive Sylvan people of the Emerald Forest, gaining access to their ancient wisdom and powerful magic.",
      colorClass: "lime",
    },
    {
      icon: "🐉",
      title: "Tamed the Wild Gryphon",
      description:
        "A daring feat of courage and skill, members successfully tamed a wild Gryphon, adding a magnificent aerial asset to the guild's capabilities.",
      colorClass: "red",
    },
    {
      icon: "🏰",
      title: "Restored the Ancient Citadel",
      description:
        "Undertook the monumental task of restoring a long-abandoned citadel, transforming it into a formidable guild hall and a beacon of hope for the surrounding lands.",
      colorClass: "teal",
    },
  ];

  return (
    <section className="py-12 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 text-center">
          Our Notable Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuildHomePage() {
  return (
    <div>
      <HeroSection />
      <AchievementsSection />
    </div>
  );
}
