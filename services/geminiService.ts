import { GoogleGenAI, Type } from '@google/genai';
import type { FeatureKey, ReviewResult } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. The application will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY_HERE' });

const buildPrompt = (code: string, features: FeatureKey[], language: string): string => {
  return `
You are an expert AI code reviewer named BigO. Your goal is to provide insightful, comprehensive, and constructive feedback on the provided code based on the user's selected analysis types.

**Programming Language:**
${language}

**Code Snippet:**
\`\`\`${language}
${code}
\`\`\`

**User Requirements:**
Analyze the following code based on standard best practices and the requested analyses.

**Requested Analyses:**
Please perform the following analyses: ${features.join(', ')}.
Provide your response in a structured JSON format. The JSON object must have keys corresponding to the selected analysis types.

Here are the details for each analysis type:

1.  **requirementValidation**:
    -   Analyze if the code's logic and functionality correctly and fully implement standard expectations for code of this nature.
    -   Point out any discrepancies, missing pieces, or potential bugs.
    -   Provide a summary and a boolean 'isMet' flag based on general best practices.

2.  **onboardingAssistance**:
    -   Identify complex or non-obvious code segments.
    -   Generate explanatory comments within a markdown code block.
    -   Provide a high-level documentation paragraph.

3.  **generativeTesting**:
    -   Generate meaningful unit tests, integration tests, and edge-case test scenarios that are missing for the submitted code.
    -   Provide the generated tests as code snippets in markdown.

4.  **socraticFeedback**:
    -   Deliver all feedback as a list of guiding, non-confrontational questions to encourage critical thinking.

Only include the keys in the final JSON response for the features selected by the user. The entire output must be a single, valid JSON object.
  `;
};

const getResponseSchema = (features: FeatureKey[]) => {
    const properties: { [key in FeatureKey]?: object } = {};

    if (features.includes('requirementValidation')) {
        properties.requirementValidation = {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                isMet: { type: Type.BOOLEAN },
                discrepancies: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        };
    }
     if (features.includes('onboardingAssistance')) {
        properties.onboardingAssistance = {
            type: Type.OBJECT,
            properties: {
                comments: { type: Type.STRING },
                documentation: { type: Type.STRING }
            }
        };
    }
    if (features.includes('generativeTesting')) {
        properties.generativeTesting = {
            type: Type.OBJECT,
            properties: {
                tests: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            code: { type: Type.STRING }
                        }
                    }
                },
                evaluation: { type: Type.STRING }
            }
        };
    }
    if (features.includes('socraticFeedback')) {
        properties.socraticFeedback = {
            type: Type.OBJECT,
            properties: {
                questions: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        };
    }
    
    return { type: Type.OBJECT, properties };
};


export const getAICodeReview = async (
  code: string,
  features: FeatureKey[],
  language: string
): Promise<ReviewResult> => {
  const prompt = buildPrompt(code, features, language);
  const schema = getResponseSchema(features);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const text = response.text;
    const jsonResponse = JSON.parse(text);
    return jsonResponse as ReviewResult;

  } catch (error) {
    console.error("Error getting AI code review:", error);
    throw new Error("The AI failed to generate a valid review. Please try again.");
  }
};

export const getCorrectedCode = async (code: string, language: string): Promise<string> => {
    const prompt = `
You are an expert AI code assistant named BigO. Your task is to correct the provided code snippet.
- Analyze the code for syntax errors, logical errors, and violations of best practices.
- Provide the fully corrected code.
- Your response should ONLY contain the corrected code within a single markdown code block for the specified language. Do not include any explanations, apologies, or introductory text.

**Programming Language:**
${language}

**Code to Correct:**
\`\`\`${language}
${code}
\`\`\`
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        const codeBlockRegex = /```(?:[a-zA-Z]+)?\n([\s\S]+?)\n```/;
        const match = text.match(codeBlockRegex);

        if (match && match[1]) {
            return match[1].trim();
        } else {
            // Fallback for when the AI doesn't use markdown
            if (text.trim()) return text.trim();
            throw new Error("AI did not return a valid code block.");
        }
    } catch (error) {
        console.error("Error getting corrected code:", error);
        throw new Error("The AI failed to correct the code. It might be too complex or ambiguous.");
    }
};