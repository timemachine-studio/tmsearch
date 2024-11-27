import React, { useState, useCallback } from 'react';

// Types
interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  image?: string;
}

function TimeMachineSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState('');

  // Mock search function
  const performSearch = useCallback((searchQuery: string): SearchResult[] => {
    // Simple keyword-based mock search
    const mockDatabase: SearchResult[] = [
      {
        title: "Wikipedia: AI",
        link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
        snippet: "Artificial intelligence (AI) is intelligence demonstrated by machines, unlike natural intelligence displayed by animals and humans.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Sci-fi_artificial_intelligence.jpg"
      },
      {
        title: "OpenAI Research",
        link: "https://openai.com/research",
        snippet: "Pioneering research in artificial intelligence to ensure that artificial general intelligence benefits all of humanity.",
        image: "https://openai.com/content/images/2022/05/openai-social-logo.png"
      },
      {
        title: "Machine Learning Basics",
        link: "https://www.coursera.org/learn/machine-learning",
        snippet: "Learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself.",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/20/8f20cc684011e88a7b4b3c5ee2f156/ML-hero.png"
      }
    ];

    // Filter mock database based on query
    return mockDatabase.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, []);

  // Generate overview
  const generateOverview = useCallback((searchQuery: string) => {
    const overviews: {[key: string]: string} = {
      'ai': "Artificial Intelligence is a rapidly evolving field of computer science. It focuses on creating intelligent machines that can simulate human-like thinking and behavior.",
      'machine learning': "Machine Learning is a subset of AI that enables computers to learn from data without being explicitly programmed. It's revolutionizing industries from healthcare to finance.",
      'technology': "Technology continues to advance at an unprecedented rate, transforming how we live, work, and interact with the world around us."
    };

    // Find closest match or return generic overview
    const matchedOverview = Object.entries(overviews).find(([key]) => 
      searchQuery.toLowerCase().includes(key)
    );

    return matchedOverview 
      ? matchedOverview[1] 
      : "A comprehensive search exploring various aspects of the topic, providing insights and relevant information.";
  }, []);

  // Search Handler
  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const searchResults = performSearch(query);
      const searchOverview = generateOverview(query);

      setResults(searchResults);
      setOverview(searchOverview);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#B026FF] mb-2">TimeMachine</h1>
          <h2 className="text-4xl font-bold text-[#B026FF]">Search</h2>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search anything..."
              className="w-full bg-[#B026FF] text-white rounded-lg px-6 py-4 pr-12 outline-none placeholder-white/70 text-lg"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
            >
              🔍
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-[#B026FF]">
            Searching... Please wait
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            {overview && (
              <div className="bg-[#B026FF]/10 p-4 rounded-lg mb-6">
                <h3 className="text-[#B026FF] font-bold mb-2">Overview</h3>
                <p>{overview}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="bg-[#B026FF]/10 p-6 rounded-lg hover:bg-[#B026FF]/20 transition-all"
                >
                  {result.image && (
                    <img 
                      src={result.image} 
                      alt={result.title} 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <a 
                    href={result.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#B026FF] text-xl font-bold hover:underline block mb-2"
                  >
                    {result.title}
                  </a>
                  <p className="text-gray-300">{result.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeMachineSearch;
