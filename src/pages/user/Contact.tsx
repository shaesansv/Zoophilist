import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const Contact: React.FC = () => {
  const { shop, refreshShop } = useAppContext();

  useEffect(() => {
    refreshShop();
  }, []);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">
          Contact Us 📞
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="forest-card">
              <h2 className="text-2xl font-bold text-forest-glow mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">👤</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Owner</h3>
                    <p className="text-forest-text">
                      {shop?.owner?.name || "Zoophilist Pet Shop"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-forest-text">
                      {shop?.owner?.phone || "+91 98765 43210"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-forest-text">
                      {shop?.owner?.email || "contact@Zoophilistshop.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-forest-text">
                      {shop?.owner?.address ||
                        "Thiruvottiyur, Chennai, Tamil Nadu, India - 600019"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="forest-card">
              <h3 className="text-xl font-bold text-forest-glow mb-4">
                Store Hours
              </h3>
              <div className="space-y-2 text-forest-text">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="forest-card">
              <h3 className="text-xl font-bold text-forest-glow mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/order"
                  className="block text-forest-text hover:text-forest-glow transition-colors"
                >
                  🛒 Shop Products
                </a>
                <a
                  href="/"
                  className="block text-forest-text hover:text-forest-glow transition-colors"
                >
                  🏠 Back to Home
                </a>
                <a
                  href="tel:+919876543210"
                  className="block text-forest-text hover:text-forest-glow transition-colors"
                >
                  📞 Call Us Now
                </a>
                <a
                  href="mailto:contact@forestpetshop.com"
                  className="block text-forest-text hover:text-forest-glow transition-colors"
                >
                  ✉️ Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-8">
            <div className="forest-card">
              <h2 className="text-2xl font-bold text-forest-glow mb-6">
                Find Us Here
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-forest-medium">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.0800693023216!2d80.30198207484479!3d13.157349287175343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f2f8966321d%3A0x30a5559cd1503dd4!2sZoophilist%20Pet&#39;s%20and%20Aquariums!5e0!3m2!1sen!2sin!4v1758165713229!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
              <p className="text-sm text-forest-text mt-4 text-center">
                📍 Located in the heart of the green valley, surrounded by
                nature
              </p>
            </div>

            <div className="forest-card">
              <h3 className="text-xl font-bold text-forest-glow mb-4">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-forest-glow">✓</span>
                  <span className="text-forest-text">
                    High-quality pet products from trusted brands
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-forest-glow">✓</span>
                  <span className="text-forest-text">
                    Expert advice and personalized recommendations
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-forest-glow">✓</span>
                  <span className="text-forest-text">
                    Fast and reliable delivery service
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-forest-glow">✓</span>
                  <span className="text-forest-text">
                    Eco-friendly and sustainable practices
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-forest-glow">✓</span>
                  <span className="text-forest-text">
                    Supporting local wildlife conservation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
