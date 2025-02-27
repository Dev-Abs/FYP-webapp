import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TrippyScroll = () => {
  const targetRef = useRef(null);
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0.9, 0.9]);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'openai/gpt-3.5-turbo',
            temperature: 0.7,
            max_tokens: 500,
            messages: [{
              role: 'user',
              content: 'Generate 25 concise mental health relief statements facts motivation for stress, depression, and anxiety. Format as numbered list without markdown.'
            }]
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'API request failed');
        }

        const content = data.choices[0].message.content;
        const statementsArray = content.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^\d+\.\s*/, '').trim())
          .slice(0, 25);

        if (statementsArray.length < 25) {
          throw new Error('Received insufficient number of statements');
        }

        setStatements(statementsArray);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-50">Loading relief statements...</div>;
  if (error) return <div className="flex items-center justify-center h-screen bg-gray-50 text-red-500">Error: {error}</div>;

  return (
    <div ref={targetRef} className="relative h-[800vh] bg-gray-50">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          className="w-full max-w-4xl px-6"
          style={{ opacity, scale }}
        >
          {statements.map((statement, index) => (
            <Statement
              key={index}
              statement={statement}
              index={index}
              total={statements.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Statement = ({ statement, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      className="my-8"
      style={{ opacity, y }}
    >
      <div className={`p-6 rounded-lg shadow-sm ${
        index % 2 === 0 ? 'bg-white' : 'bg-teal-50'
      }`}>
        <p className="text-lg text-gray-800 leading-relaxed">
          {statement}
        </p>
        <div className="mt-2 text-sm text-gray-400">
          {index + 1} / {total}
        </div>
      </div>
    </motion.div>
  );
};

export default TrippyScroll;