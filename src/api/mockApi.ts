type Recommendation = {
  recommendation: string;
  timestamp: string;
};

export const getRecommendation = async (data: { volume: number }): Promise<Recommendation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendation: `For ${data.volume}L aquarium: Change 20% water weekly. Check ammonia levels.`,
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  });
};