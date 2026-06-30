const API_KEY = "AQ.Ab8RN6KK-mUOI5IjrumW0GywLzadNbIGO7DUIDF1qh6pck9dsA";// =========================================
// AI COACH
// =========================================

const generateCoachBtn = document.getElementById("generateCoachBtn");

generateCoachBtn.addEventListener("click", async function () {

    generateCoachBtn.innerText = "Generating...";
    generateCoachBtn.disabled = true;

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
                            generationConfig: {
                                     maxOutputTokens: 180,
                                     temperature: 0.6
You are FocusFlow AI, an intelligent productivity coach.

Return ONLY valid JSON.

{
  "plan": [
    "",
    "",
    ""
  ],
  "avoidance": {
    "task": "",
    "count": "",
    "reason": ""
  },
  "reasoning": [
    "",
    "",
    ""
  ],
  "confidence": 85,
  "risk": "",
  "confidenceReason": ""
}

The student is currently working on:

- DBMS
- DSA
- Building a hackathon project

Your responsibility is to analyze the student's workload and generate coaching insights.

-------------------------
TODAY'S FOCUS PLAN
-------------------------

Generate EXACTLY 3 tasks.

Rules:

- Action-oriented.
- Maximum 4 words each.
- Prioritize the most important work first.

Example:

Revise DBMS

Solve DSA

Complete Hackathon

-------------------------
AVOIDANCE LOOP
-------------------------

Identify ONE study task that the student is MOST LIKELY avoiding or procrastinating.

DO NOT mention social media, gaming or unrelated distractions.

The task MUST be one of the student's study tasks.

Return:

task
count
reason

Rules:

task
- Maximum 3 words.

Examples:
Normalization
DSA Practice
Hackathon Testing

count

Return ONLY a number between 1 and 5.

reason

Explain WHY that task is commonly postponed.

Maximum 7 words.

Examples:

Conceptually difficult

Requires sustained concentration

Feels overwhelming initially

-------------------------
AI REASONING
-------------------------

Explain WHY you generated today's focus plan.

Return EXACTLY 3 points.

Each point should explain the reasoning behind ONE plan item.

Maximum 8 words each.

Examples:

Strengthens database fundamentals

Problem solving needs fresh focus

Practical implementation reinforces concepts

-------------------------
CONFIDENCE SCORE
-------------------------

Return an INTEGER between 70 and 100.

This score represents how confident the AI is that today's plan is achievable.

-------------------------
RISK LEVEL
-------------------------

Return ONLY ONE:

Low

Medium

High

Risk represents the probability that the student will fail to complete today's study plan.

-------------------------
CONFIDENCE REASON
-------------------------

Explain the confidence score.

Maximum 6 words.

Examples:

Balanced workload

Tasks realistically achievable

Heavy workload today

Return ONLY valid JSON.

Do NOT include markdown.

Do NOT include code fences.

Do NOT include explanations.
`
                        }
                    ]
                }
            ]
        })
    }
);

if (!response.ok) {

    const err = await response.json();
    console.log(err);

    throw new Error("Gemini request failed");

}

const result = await response.json();

const rawText =
    result.candidates[0].content.parts[0].text;

const cleanText = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const coach = JSON.parse(cleanText);

        
// ===============================
// Today's Plan
// ===============================

document.getElementById("coachPlan").innerHTML = "";

coach.plan.forEach(function (item) {

    const li = document.createElement("li");

    li.innerText = item;

    document.getElementById("coachPlan").appendChild(li);

});

// ===============================
// Avoidance
// ===============================

document.getElementById("avoidanceTask").innerText =
    coach.avoidance.task;

document.getElementById("avoidanceCount").innerText =
    "Missed - " + coach.avoidance.count + " Times";

document.getElementById("avoidanceReason").innerText =
    coach.avoidance.reason;

// ===============================
// AI Reasoning
// ===============================

document.getElementById("reasoningList").innerHTML = "";

coach.reasoning.forEach(function (reason) {

    const li = document.createElement("li");

    li.innerText = reason;

    document.getElementById("reasoningList").appendChild(li);

});

// ===============================
// Confidence
// ===============================

document.getElementById("confidenceValue").innerText =
    coach.confidence + "%";

document.getElementById("confidenceBar").style.width =
    coach.confidence + "%";

// ===============================
// Risk
// ===============================

const risk = document.getElementById("riskLevel");

risk.innerText = coach.risk;

risk.classList.remove(
    "ff-risk-alert-low",
    "ff-risk-alert-medium",
    "ff-risk-alert-high"
);

if (coach.risk === "Low") {
    risk.classList.add("ff-risk-alert-low");
}

if (coach.risk === "Medium") {
    risk.classList.add("ff-risk-alert-medium");
}

if (coach.risk === "High") {
    risk.classList.add("ff-risk-alert-high");
}

// ===============================
// Reason
// ===============================

document.getElementById("confidenceReason").innerText =
    coach.confidenceReason;

    } catch (error) {

        console.error(error);

    }

    generateCoachBtn.innerText = "Generate AI Analysis";
    generateCoachBtn.disabled = false;

});