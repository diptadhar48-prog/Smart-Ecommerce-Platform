const About = () => {
  const teamMembers = [
    {
      name: 'Dipta Dhar',
      role: 'CEO & Founder',
      image: 'https://i.ibb.co/tp2v9rvp/Copy-of-hi.jpg',
      bio: 'Visionary leader with 15 years in e-commerce'
    },
    {
      name: 'Zayed Bin Nasim',
      role: 'CTO',
      image: "https://i.ibb.co/Fk5PGSt9/Whats-App-Image-2026-01-22-at-5-14-16-AM.jpg",
      bio: 'Tech innovator passionate about user experience'
    },
    {
      name: 'Dipta Dhar',
      role: 'Head of Operations',
      image: 'https://i.ibb.co/tp2v9rvp/Copy-of-hi.jpg',
      bio: 'Operations expert ensuring smooth delivery'
    },
    {
      name: 'Farzin',
      role: 'Marketing Director',
      image: 'https://i.ibb.co/Z6tqc6PL/the-iron-man-4k-4t.jpg',
      bio: 'Creative marketer connecting with customers'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-5xl font-bold text-center mb-8">About SmartShop</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-6 text-gray-700">
            Welcome to SmartShop, your trusted partner in online shopping. We are committed to providing you with the best products, exceptional service, and an unmatched shopping experience.
          </p>
        </div>
      </section>

      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2020, SmartShop began with a simple mission: to make quality products accessible to everyone. What started as a small startup has grown into a thriving e-commerce platform serving thousands of customers worldwide.
          </p>
          <p className="text-gray-700">
            Our journey has been driven by innovation, customer feedback, and a relentless pursuit of excellence. Today, we continue to evolve, bringing you the latest products and the most seamless shopping experience.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
            alt="Our Story"
            className="rounded-lg shadow-xl w-full h-80 object-cover"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h3 className="card-title text-2xl">Our Mission</h3>
              <p>
                To deliver exceptional value to our customers through quality products, competitive prices, and outstanding service. We strive to make online shopping convenient, secure, and enjoyable for everyone.
              </p>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <h3 className="card-title text-2xl">Our Vision</h3>
              <p>
                To become the world's most customer-centric e-commerce platform, where people can find and discover anything they want to buy online, backed by cutting-edge technology and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="font-bold text-xl mb-2">Excellence</h3>
            <p className="text-gray-600">We pursue excellence in everything we do</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="font-bold text-xl mb-2">Trust</h3>
            <p className="text-gray-600">Building lasting relationships with our customers</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="font-bold text-xl mb-2">Innovation</h3>
            <p className="text-gray-600">Constantly improving and adapting</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="font-bold text-xl mb-2">Sustainability</h3>
            <p className="text-gray-600">Committed to environmental responsibility</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;