// Simulate AI recommendation
export const getRecommendation = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          recommendation: "Change 20% water weekly. Check ammonia levels.",
          timestamp: new Date().toISOString(),
        });
      }, 1000); // Simulate network delay
    });
  };