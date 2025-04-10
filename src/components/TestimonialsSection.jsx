import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    title: "Neuropsychiatrist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "NeuroCare has revolutionized how we diagnose and monitor depression in our patients. The speed and accuracy of the EEG analysis has improved our treatment outcomes significantly.",
    organization: "Johns Hopkins Medical Center"
  },
  {
    name: "Prof. Michael Chen",
    title: "Neuroscience Researcher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "As a researcher, the consistency and reliability of NeuroCare's analysis has been invaluable for our longitudinal studies on anxiety disorders. The data quality is exceptional.",
    organization: "National Institute of Mental Health"
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    quote: "My patients appreciate the objective insights that NeuroCare provides alongside traditional therapy. It's helped many understand their condition better and stay committed to treatment.",
    organization: "Behavioral Health Associates"
  }
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900/80"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Experts Are Saying</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Industry professionals trust NeuroCare for accurate mental health analysis and monitoring
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Testimonial cards */}
            <div className="relative h-[480px] md:h-[400px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: active === index ? 1 : 0,
                    x: active === index ? 0 : active > index ? -100 : 100,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${active === index ? 'z-10' : 'z-0 pointer-events-none'}`}
                >
                  <div className="bg-gray-800/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-700 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/50">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <svg className="w-10 h-10 text-indigo-500/30 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        
                        <p className="text-gray-200 text-lg mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                        
                        <div>
                          <h4 className="text-white font-semibold text-xl">{testimonial.name}</h4>
                          <p className="text-indigo-300">{testimonial.title}</p>
                          <p className="text-gray-400 text-sm mt-1">{testimonial.organization}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    active === index ? 'bg-indigo-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Logos of trusted organizations */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 pt-10 border-t border-gray-800"
          >
            <h3 className="text-center text-gray-400 text-sm uppercase tracking-wider mb-6">Trusted by leading institutions</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
              {[
                { name: "Harvard Medical School", logo: "Harvard" },
                { name: "Mayo Clinic", logo: "Mayo" },
                { name: "Stanford Research", logo: "Stanford" },
                { name: "MIT Brain Lab", logo: "MIT" },
                { name: "Johns Hopkins", logo: "Hopkins" }
              ].map((org, i) => (
                <div key={i} className="text-center">
                  <div className="h-8 flex items-center justify-center">
                    <span className="text-gray-300 font-semibold">{org.logo}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;