import { motion } from "framer-motion";

export const FeatureCards = () => {
  const features = [
    { title: "Advanced Analysis", color: "from-violet-400 to-indigo-400" },
    { title: "Real-time Results", color: "from-amber-400 to-orange-400" },
    { title: "Secure & Private", color: "from-green-400 to-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 0.95, rotate: "-1deg" }}
          className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
          <div className={`absolute bottom-0 left-0 right-0 top-32 rounded-t-2xl bg-gradient-to-br ${feature.color} p-4 transition-transform duration-250 group-hover:translate-y-4`}>
            <span className="text-white font-medium">FEATURE DETAILS</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};