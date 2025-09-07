import React from "react";

const About = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-100 to-yellow-50 py-16 px-6 text-center shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Bringing you wholesome, natural, and traditional goodness — straight
          from farms to your table.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-6 space-y-12">
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-3">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We started with a simple mission — to revive the traditional,
              authentic way of producing food and essentials. At{" "}
              <span className="text-yellow-700 font-semibold">Mumtaz</span>, we
              believe in purity, sustainability, and preserving the richness of
              nature. Each of our products carries the legacy of natural
              farming, age-old recipes, and unprocessed nutrition.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/farm.jpg"
              alt="Our Farm"
              className="rounded-lg shadow-lg w-full md:w-4/5"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="/images/tradition.jpg"
              alt="Tradition"
              className="rounded-lg shadow-lg w-full md:w-4/5"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold text-green-800 mb-3">
              Our Values
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Every product we craft is rooted in{" "}
              <span className="text-yellow-700 font-semibold">
                honesty, purity, and care
              </span>
              . From hand-picking the finest ingredients to following
              eco-friendly processes, our goal is to provide you with food and
              essentials that are not just healthy but also deeply nourishing.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-800">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Because we bring you{" "}
            <span className="text-yellow-700 font-semibold">
              100% natural, chemical-free, and authentic products
            </span>{" "}
            that celebrate tradition while nourishing your modern lifestyle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">🌱 Pure</h3>
              <p className="text-gray-600 text-sm">
                Straight from trusted farms — no shortcuts, no preservatives.
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">✨ Authentic</h3>
              <p className="text-gray-600 text-sm">
                Traditional methods like stone grinding & cold pressing.
              </p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="font-semibold text-green-900 mb-2">🤝 Sustainable</h3>
              <p className="text-gray-600 text-sm">
                Supporting local farmers & protecting the environment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
