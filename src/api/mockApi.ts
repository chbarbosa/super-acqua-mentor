type Recommendation = {
  recommendation: string;
  timestamp: string;
};

type AIResponseMap = {
  [key: string]: string;
};

const AI_RESPONSES: AIResponseMap = {
  gpt4: "GPT-4 recommends: Change 25% water weekly and monitor pH levels.",
  claude: "Claude suggests: Test ammonia levels and reduce feeding slightly.",
  gemini: "Google advises: Increase aeration and check filter media."
};

export const getRecommendation = async (data: { 
  volume: number;
  aiModel: string;
}): Promise<Recommendation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendation: `${AI_RESPONSES[data.aiModel]} (for ${data.volume}L tank)`,
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  });
};