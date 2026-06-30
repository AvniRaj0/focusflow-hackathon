// =========================================
// DASHBOARD AI
// =========================================

const API_KEY = prompt("Enter your Gemini API Key");;

console.log("Dashboard JS Loaded!");

const generatePlanBtn = document.getElementById("generatePlanBtn");

console.log(generatePlanBtn);

generatePlanBtn.addEventListener("click", async function () {

    console.log("Button clicked");

    generatePlanBtn.disabled = true;
    generatePlanBtn.innerText = "Generating...";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
Create today's study plan.

Tasks:
- DBMS
- DSA
- Hackathon

Rules:
- Exactly 5 bullet points.
- Under 8 words per bullet.
- One motivational sentence at the end.
- No headings.
- Maximum 50 words.
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        if (!response.ok) {
            throw new Error("API Request Failed");
        }

        const data = await response.json();

        console.log(data);

        const text =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Unable to generate plan.";

        document.getElementById("aiInsightText").innerText = text;

    } catch (error) {

        console.error(error);

        document.getElementById("aiInsightText").innerText =
            "Unable to generate AI plan.";

    }

    generatePlanBtn.disabled = false;
    generatePlanBtn.innerText = "Generate AI Plan";

});