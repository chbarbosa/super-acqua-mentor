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

export type Aquarium = {
  id: string;
  volumeLiters: number;
  faunaDescription: string;
  floraDescription: string;
  substrateDescription: string;
  hasFilter: boolean;
  hasHeater: boolean;
  hasLighting: boolean;
  setupDate: string;
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

const INITIAL_AQUARIUMS: Aquarium[] = [
  {
    id: '1',
    volumeLiters: 100,
    faunaDescription: 'Neon Tetras, Corydoras',
    floraDescription: 'Amazon Sword, Java Fern',
    substrateDescription: 'Fine gravel substrate',
    hasFilter: true,
    hasHeater: true,
    hasLighting: true,
    setupDate: '2024-01-15'
  },
  {
    id: '2',
    volumeLiters: 200,
    faunaDescription: 'Guppies, Cherry Shrimp',
    floraDescription: 'Dwarf Hairgrass, Anubias',
    substrateDescription: 'Aqua soil with sand',
    hasFilter: true,
    hasHeater: true,
    hasLighting: true,
    setupDate: '2024-02-20'
  },
  {
    id: '3',
    volumeLiters: 50,
    faunaDescription: 'Betta fish',
    floraDescription: 'Water Wisteria, Moss Ball',
    substrateDescription: 'Black sand',
    hasFilter: true,
    hasHeater: true,
    hasLighting: false,
    setupDate: '2024-03-10'
  }
];

let mockDB: Recommendation[] = [...INITIAL_RECOMMENDATIONS];
let aquariumDB: Aquarium[] = [...INITIAL_AQUARIUMS];

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // fetch('/api/recommendations')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDB]);  
    }, 750);
  });
};

export const fetchAquariums = async (): Promise<Aquarium[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...aquariumDB]);
    }, 750);
  });
};

export const deleteAquarium = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      aquariumDB = aquariumDB.filter(aquarium => aquarium.id !== id);
      resolve();
    }, 750);
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