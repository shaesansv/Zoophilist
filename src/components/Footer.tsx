import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-forest-accent">
              Zoophilist Pet Shop
            </h3>
            <p className="text-forest-text text-sm leading-relaxed">
              Your trusted marketplace for quality products. Experience nature's
              finest selections in our digital forest.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-forest-text hover:text-forest-accent transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/order"
                  className="text-forest-text hover:text-forest-accent transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-forest-text hover:text-forest-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base font-medium text-foreground">
              Contact Info
            </h4>
            <div className="space-y-2 text-sm text-forest-text">
              <p>📧 support@Zoophilistshop.com</p>
              <p>📞 +91 9874561234</p>
              <p>📍 Thiruvottiyur, Chennai, Tamil Nadu - 600019</p>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-forest-text">
            © 2025 Forest Shop. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-forest-text hover:text-forest-accent transition-colors"
            >
              <span className="sr-only">Facebook</span>
              📱
            </a>
            <a
              href="#"
              className="text-forest-text hover:text-forest-accent transition-colors"
            >
              <span className="sr-only">Twitter</span>
              🐦
            </a>
            <a
              href="#"
              className="text-forest-text hover:text-forest-accent transition-colors"
            >
              <span className="sr-only">Instagram</span>
              📷
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
