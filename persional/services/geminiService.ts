
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from '../types';

const getFinancialInsights = async (transactions: Transaction[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const simplifiedTransactions = transactions.slice(0, 50).map(t => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
  }));

  const prompt = `
    Based on the following recent financial transactions, provide some actionable insights and tips.
    All monetary values are in Indian Rupees (₹).
    Analyze spending patterns, identify potential savings, and suggest improvements.
    Keep the response concise, professional, and easy to understand for a non-expert.
    Transactions: ${JSON.stringify(simplifiedTransactions)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for the insights." },
            insights: {
              type: Type.ARRAY,
              description: "A list of 2-4 actionable insights.",
              items: { type: Type.STRING }
            },
            summary: { type: Type.STRING, description: "A brief overall summary of the financial health." }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    // Simple check if it looks like JSON
    if (jsonText.startsWith('{') && jsonText.endsWith('}')) {
      const parsed = JSON.parse(jsonText);
      return `### ${parsed.title}\n\n${parsed.insights.map((insight: string) => `- ${insight}`).join('\n')}\n\n**Summary:** ${parsed.summary}`;
    }
    return "Could not parse AI insights. The model may have returned an unexpected format.";

  } catch (error) {
    console.error("Error fetching financial insights:", error);
    return "Sorry, I couldn't generate insights at the moment. Please check your API key and try again later.";
  }
};

export { getFinancialInsights };
