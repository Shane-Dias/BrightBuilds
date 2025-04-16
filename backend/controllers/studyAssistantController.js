const { GoogleGenerativeAI } = require("@google/generative-ai");

const studyAssistantController = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        // Initialize the Google Generative AI
        const googleAPIKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(googleAPIKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construct prompt for AI focused on study assistance
        const prompt = `You are a helpful Project assistant. Provide informative and educational guidance about ${query}. Include specific tips, strategies or explanations that would help a student. Format your response in a clean, easy-to-read manner with sections and bullet points where appropriate.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({
            query: query,
            information: responseText,
        });

    } catch (error) {
        console.error("Error generating study assistance:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { studyAssistantController };