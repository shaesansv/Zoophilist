import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ProductCard from "../../components/ProductCard";
import rainforestHero from "../../components/assets/rainforest-hero.jpg";
import rainforestSection from "../../components/assets/rainforest-section.jpg";
import rainforestFeatures from "../../components/assets/rainforest-features.jpg";

const Home: React.FC = () => {
  const {
    shop,
    categories,
    products,
    refreshShop,
    refreshCategories,
    refreshProducts,
  } = useAppContext();

  useEffect(() => {
    refreshShop();
    refreshCategories();
    refreshProducts();
  }, []);

  const featuredProducts = products.slice(0, 6);
  const featuredCategories = categories.slice(0, 4);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return videoId
      ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=0&mute=1`
      : "";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-32 px-4 text-center min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${rainforestHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-up text-white">
            Welcome to <span className="text-forest-glow">Zoophilist</span>
          </h1>
          <p
            className="text-2xl md:text-3xl text-gray-200 mb-6 animate-fade-in-up max-w-4xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            Where Nature Meets Pet Care Excellence
          </p>
          <p
            className="text-lg md:text-xl text-gray-300 mb-12 animate-fade-in-up max-w-3xl mx-auto"
            style={{ animationDelay: "0.3s" }}
          >
            {shop?.description ||
              "Nestled in the heart of the Amazon rainforest, we provide premium pet care products sourced from nature's finest ingredients. Your pets deserve the purity and quality that only the forest can provide."}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/order"
              className="forest-button text-xl px-10 py-4 inline-block transform hover:scale-105 transition-all"
            >
              🌿 Start Shopping 🐾
            </Link>
            <Link
              to="/contact"
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white px-10 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="relative py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(22, 78, 99, 0.9), rgba(22, 78, 99, 0.9)), url(${rainforestSection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Story in the{" "}
                <span className="text-forest-glow">Zoophilist</span>
              </h2>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                In the heart of the city, there’s a little shop filled with
                wagging tails, gentle purrs, and cheerful chirps. What started
                as a small corner store with a few puppies and kittens has grown
                into a lively space where families find their perfect
                companions. Every pet here has its own story—whether it’s a
                playful puppy waiting for a best friend, a graceful fish that
                brightens aquariums, or a curious cat eager for adventure.
              </p>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Our shop is more than just a place to buy pets and supplies—it’s
                a place where love for animals brings people together.From
                healthy food and cozy accessories to trusted advice, we make
                sure each pet finds not just a home, but a happy life. Step
                inside, and you’ll discover a world of friendship, joy, and
                endless paw prints on your heart.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-glow mb-2">
                    500+
                  </div>
                  <div className="text-gray-300">Happy Pets</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-glow mb-2">
                    100%
                  </div>
                  <div className="text-gray-300">Natural Products</div>
                </div>
              </div>
            </div>
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Why Choose Zoophilist?
                </h3>
                <ul className="space-y-4 text-gray-200">
                  <li className="flex items-center gap-3">
                    <span className="text-forest-glow text-xl">🐾</span>
                    <span>Veterinarian approved and tested products</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-forest-glow text-xl">🌍</span>
                    <span>Eco-friendly packaging and practices</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-forest-glow text-xl">💚</span>
                    <span>Supporting wildlife conservation efforts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${rainforestFeatures})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white animate-fade-in-up">
            Premium <span className="text-forest-glow">Zoophilist</span> Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌊🐠",
                title: "Colourful Water Fish",
                description:
                  " Low Maintenance – Fish require less space and care compared to other pets",
              },
              {
                icon: "🐦🦜",
                title: "Healthy Cockateil",
                description:
                  "🎶 Whistlers & Talkers – Can mimic sounds, whistle tunes, and sometimes learn words.",
              },
              {
                icon: "🐕🐶",
                title: "Friendly companions",
                description:
                  "Loyal Companions – Dogs are known for their unconditional love and loyalty.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center animate-fade-in-up hover:bg-white/20 transition-all transform hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      {shop?.youtubeUrl && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Discover Our World
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden bg-forest-medium shadow-lg">
              <iframe
                src={getYouTubeEmbedUrl(shop.youtubeUrl)}
                title="Shop Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/order?category=${category._id}`}
                  className="forest-card text-center group cursor-pointer"
                >
                  <div className="text-4xl mb-4">
                    {category.name === "Dogs" && "🐕"}
                    {category.name === "Cats" && "🐱"}
                    {category.name === "Fishes" && "🐠"}
                    {category.name === "Food" && "🍖"}
                    {category.name === "Accessories" && "🎾"}
                    {![
                      "Dogs",
                      "Cats",
                      "Fishes",
                      "Food",
                      "Accessories",
                    ].includes(category.name) && "🐾"}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-forest-glow transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onBuy={() => {
                    // Redirect to order page with this product
                    window.location.href = `/order?product=${product._id}`;
                  }}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/order" className="forest-button text-lg px-8 py-3">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";
// import ProductCard from "../../components/ProductCard";

// const Home: React.FC = () => {
//   const {
//     shop,
//     categories,
//     products,
//     refreshShop,
//     refreshCategories,
//     refreshProducts,
//   } = useAppContext();

//   useEffect(() => {
//     refreshShop();
//     refreshCategories();
//     refreshProducts();
//   }, []);

//   const featuredProducts = products.slice(0, 6);
//   const featuredCategories = categories.slice(0, 4);

//   const getYouTubeEmbedUrl = (url: string) => {
//     if (!url) return "";
//     const videoId = url.match(
//       /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
//     );
//     return videoId
//       ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=0&mute=1`
//       : "";
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative py-20 px-4 text-center">
//         <div className="container mx-auto max-w-4xl">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up text-foreground">
//             Welcome to{" "}
//             <span className="text-forest-glow">Zoophilist Pet Shop</span>
//           </h1>
//           <p
//             className="text-xl text-forest-text mb-8 animate-fade-in-up"
//             style={{ animationDelay: "0.2s" }}
//           >
//             {shop?.description ||
//               "Your trusted companion for all pet needs in the heart of nature"}
//           </p>
//           <Link
//             to="/order"
//             className="forest-button text-lg px-8 py-4 animate-fade-in-up inline-block"
//             style={{ animationDelay: "0.4s" }}
//           >
//             Start Shopping 🐾
//           </Link>
//         </div>
//       </section>

//       {/* YouTube Video Section */}
//       {shop?.youtubeUrl && (
//         <section className="py-16 px-4">
//           <div className="container mx-auto max-w-4xl">
//             <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
//               Discover Our World
//             </h2>
//             <div className="aspect-video rounded-xl overflow-hidden bg-forest-medium shadow-lg">
//               <iframe
//                 src={getYouTubeEmbedUrl(shop.youtubeUrl)}
//                 title="Shop Video"
//                 className="w-full h-full"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Featured Categories */}
//       {featuredCategories.length > 0 && (
//         <section className="py-16 px-4">
//           <div className="container mx-auto">
//             <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
//               Shop by Category
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {featuredCategories.map((category) => (
//                 <Link
//                   key={category._id}
//                   to={`/order?category=${category._id}`}
//                   className="forest-card text-center group cursor-pointer"
//                 >
//                   <div className="text-4xl mb-4">
//                     {category.name === "Dogs" && "🐕"}
//                     {category.name === "Cats" && "🐱"}
//                     {category.name === "Fishes" && "🐠"}
//                     {category.name === "Food" && "🍖"}
//                     {category.name === "Accessories" && "🎾"}
//                     {![
//                       "Dogs",
//                       "Cats",
//                       "Fishes",
//                       "Food",
//                       "Accessories",
//                     ].includes(category.name) && "🐾"}
//                   </div>
//                   <h3 className="font-semibold text-lg text-foreground group-hover:text-forest-glow transition-colors">
//                     {category.name}
//                   </h3>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Featured Products */}
//       {featuredProducts.length > 0 && (
//         <section className="py-16 px-4">
//           <div className="container mx-auto">
//             <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
//               Featured Products
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredProducts.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   onBuy={() => {
//                     // Redirect to order page with this product
//                     window.location.href = `/order?product=${product._id}`;
//                   }}
//                 />
//               ))}
//             </div>
//             <div className="text-center mt-12">
//               <Link to="/order" className="forest-button text-lg px-8 py-3">
//                 View All Products
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Home;
