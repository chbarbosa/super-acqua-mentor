// Types
export type AquariumParams = {
  volumeLiters: number;
  ph: number;
  temperature: number;
  // Add all other parameters
};

export type Recommendation = {
  id: string;
  message: string;
  aiModel: string;
  timestamp: string;
};

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    message: "Initial advice: Perform 25% water change weekly",
    aiModel: 'gpt4',
    timestamp: '2023-10-01T10:00:00Z'
  },
  {
    id: '2',
    message: "System check: Clean filter media monthly",
    aiModel: 'claude',
    timestamp: '2023-10-05T14:30:00Z'
  }
];

let mockDB: Recommendation[] = [...INITIAL_RECOMMENDATIONS];

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // fetch('/api/recommendations')
  return new Promise((resolve) => {
    () => resolve([...mockDB]);
  });
};

// Generate deterministic mock responses
export const getRecommendation = (
  params: AquariumParams, 
  aiModel: string
): Recommendation => {
  const response: Recommendation = {
    id: crypto.randomUUID(),
    message: generateAIResponse(params, aiModel),
    aiModel,
    timestamp: new Date().toISOString(),
  };
  
  mockDB.unshift(response); // Add to "DB"
  return response;
};

// AI response logic
const generateAIResponse = (
  params: AquariumParams, 
  aiModel: string
): string => {
  const { volumeLiters, ph } = params;
  
  const responses: Record<string, string> = {
    gpt4: `GPT-4: For ${volumeLiters}L, ${ph > 7 ? 'lower' : 'raise'} pH slightly.`,
    claude: `Claude: ${volumeLiters > 50 ? 'Increase' : 'Maintain'} water changes.`,
    gemini: `Gemini: Test ammonia if pH reaches ${ph + 0.5}.`
  };
  
  return responses[aiModel] || "No recommendation";
};