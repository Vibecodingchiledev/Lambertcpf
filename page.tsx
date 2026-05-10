'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">☕</span>
              </div>
              <h1 className="text-2xl font-bold text-espresso">Caffe Italia</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className="text-espresso hover:text-gold transition-colors">
                About
              </Link>
              <Link href="#menu" className="text-espresso hover:text-gold transition-colors">
                Menu
              </Link>
              <Link href="#contact" className="text-espresso hover:text-gold transition-colors">
                Contact
              </Link>
            </div>
            <button className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors">
              Reserve
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-b from-cream-dark to-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-6xl md:text-7xl font-bold text-espresso mb-6 leading-tight">
                Experience Italian Excellence
              </h2>
              <p className="text-xl text-espresso/70 mb-8 leading-relaxed">
                Discover the art of authentic Italian coffee. Each cup tells a story of tradition, passion, and craftsmanship passed down through generations.
              </p>
              <div className="flex gap-4">
                <button className="bg-gold text-white px-8 py-3 rounded-lg hover:bg-gold/90 transition-transform hover:scale-105">
                  Explore Menu
                </button>
                <button className="border-2 border-gold text-gold px-8 py-3 rounded-lg hover:bg-gold hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl"></div>
              <div className="absolute inset-4 border-2 border-gold/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl">☕</span>
                  <p className="text-2xl font-bold text-gold mt-4">Caffe Italia</p>
                  <p className="text-espresso/60 mt-2">Since 1985</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-espresso mb-16">Why Choose Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌾',
                title: 'Premium Beans',
                description: 'Sourced from the finest coffee regions worldwide, roasted to perfection'
              },
              {
                icon: '👨‍🍳',
                title: 'Expert Baristas',
                description: 'Trained artisans dedicated to crafting the perfect cup every time'
              },
              {
                icon: '🏠',
                title: 'Cozy Atmosphere',
                description: 'Warm, inviting spaces perfect for work, meetings, or relaxation'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-espresso mb-3">{feature.title}</h3>
                <p className="text-espresso/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-24 bg-gradient-to-b from-cream to-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center text-espresso mb-16">Our Menu</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {[
              {
                category: 'Espresso Classics',
                items: ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Macchiato']
              },
              {
                category: 'Specialty Drinks',
                items: ['Affogato', 'Cortado', 'Lungo', 'Ristretto', 'Flat White']
              }
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-warm-border">
                <h3 className="text-3xl font-bold text-gold mb-6">{section.category}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center text-lg text-espresso">
                      <span className="w-2 h-2 bg-gold rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/menu" className="inline-block bg-gold text-white px-10 py-4 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-espresso text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-white/80 mb-8">
            Visit our cozy corner for an unforgettable coffee experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold text-espresso px-8 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
              Reserve a Table
            </button>
            <button className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-semibold hover:bg-gold hover:text-espresso transition-colors">
              Find Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/30 backdrop-blur-sm border-t border-warm-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h4 className="text-lg font-bold text-espresso mb-4">Caffe Italia</h4>
              <p className="text-espresso/70">Bringing authentic Italian coffee culture to every cup.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-espresso mb-4">Hours</h4>
              <p className="text-espresso/70">Mon - Fri: 7am - 8pm</p>
              <p className="text-espresso/70">Sat - Sun: 8am - 9pm</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-espresso mb-4">Contact</h4>
              <p className="text-espresso/70">📍 123 Coffee Street, Italy</p>
              <p className="text-espresso/70">☎️ +39 123 456 789</p>
            </div>
          </div>
          
          <div className="border-t border-warm-border pt-8 text-center text-espresso/60">
            <p>&copy; 2026 Caffe Italia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
