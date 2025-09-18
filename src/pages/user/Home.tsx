import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ProductCard from '../../components/ProductCard';

const Home: React.FC = () => {
  const { shop, categories, products, refreshShop, refreshCategories, refreshProducts } = useAppContext();

  useEffect(() => {
    refreshShop();
    refreshCategories();
    refreshProducts();
  }, []);

  const featuredProducts = products.slice(0, 6);
  const featuredCategories = categories.slice(0, 4);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=0&mute=1` : '';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up text-foreground">
            Welcome to <span className="text-forest-glow">Forest Pet Shop</span>
          </h1>
          <p className="text-xl text-forest-text mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {shop?.description || 'Your trusted companion for all pet needs in the heart of nature'}
          </p>
          <Link
            to="/order"
            className="forest-button text-lg px-8 py-4 animate-fade-in-up inline-block"
            style={{ animationDelay: '0.4s' }}
          >
            Start Shopping 🐾
          </Link>
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
                    {category.name === 'Dogs' && '🐕'}
                    {category.name === 'Cats' && '🐱'}
                    {category.name === 'Fishes' && '🐠'}
                    {category.name === 'Food' && '🍖'}
                    {category.name === 'Accessories' && '🎾'}
                    {!['Dogs', 'Cats', 'Fishes', 'Food', 'Accessories'].includes(category.name) && '🐾'}
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
              <Link
                to="/order"
                className="forest-button text-lg px-8 py-3"
              >
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