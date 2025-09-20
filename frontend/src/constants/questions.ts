import type { Question, SDGInfo } from "../types";

export const questions: Question[] = [
    {
        sdg: 13,
        question: "What is the primary cause of global warming?",
        options: [
            "Solar flares",
            "Greenhouse gas emissions from human activities",
            "Natural climate cycles only",
            "Ocean currents"
        ],
        correct: 1,
        explanation: "Human activities, especially burning fossil fuels, release greenhouse gases that trap heat in the atmosphere.",
        difficulty: "easy"
    },
    {
        sdg: 14,
        question: "What percentage of Earth's oxygen is produced by ocean phytoplankton?",
        options: [
            "20%",
            "40%",
            "50-80%",
            "10%"
        ],
        correct: 2,
        explanation: "Ocean phytoplankton produces 50-80% of Earth's oxygen, making healthy oceans crucial for life.",
        difficulty: "medium"
    },
    {
        sdg: 15,
        question: "How many species go extinct daily due to human activities?",
        options: [
            "1-5 species",
            "10-50 species",
            "100-1000 species",
            "Over 1000 species"
        ],
        correct: 2,
        explanation: "Scientists estimate 100-1000 species go extinct daily, making this a biodiversity crisis.",
        difficulty: "hard"
    },
    {
        sdg: 13,
        question: "Which renewable energy source has grown fastest globally?",
        options: [
            "Hydroelectric power",
            "Wind power",
            "Solar power",
            "Geothermal power"
        ],
        correct: 2,
        explanation: "Solar power has experienced the fastest growth due to decreasing costs and improving technology.",
        difficulty: "medium"
    },
    {
        sdg: 14,
        question: "What is the main cause of ocean acidification?",
        options: [
            "Industrial waste dumping",
            "Plastic pollution",
            "CO2 absorption from the atmosphere",
            "Oil spills"
        ],
        correct: 2,
        explanation: "Oceans absorb CO2 from the atmosphere, forming carbonic acid and lowering ocean pH.",
        difficulty: "medium"
    },
    {
        sdg: 15,
        question: "What percentage of land should be protected to maintain biodiversity?",
        options: [
            "10%",
            "20%",
            "30%",
            "50%"
        ],
        correct: 2,
        explanation: "Scientists recommend protecting at least 30% of land to maintain healthy ecosystems and biodiversity.",
        difficulty: "medium"
    },
    {
        sdg: 13,
        question: "By what year do scientists say we need to reach net-zero emissions?",
        options: [
            "2030",
            "2040",
            "2050",
            "2060"
        ],
        correct: 2,
        explanation: "The IPCC recommends reaching net-zero CO2 emissions by 2050 to limit warming to 1.5°C.",
        difficulty: "easy"
    },
    {
        sdg: 14,
        question: "What is a 'dead zone' in the ocean?",
        options: [
            "An area with no fish",
            "An area with low oxygen levels",
            "An area covered in plastic",
            "An area that's too deep for life"
        ],
        correct: 1,
        explanation: "Dead zones are areas where oxygen levels are too low to support most marine life, often caused by pollution.",
        difficulty: "hard"
    },
    {
        sdg: 15,
        question: "Which ecosystem stores the most carbon per hectare?",
        options: [
            "Tropical rainforests",
            "Grasslands",
            "Peatlands",
            "Temperate forests"
        ],
        correct: 2,
        explanation: "Peatlands store more carbon per hectare than any other ecosystem, making their protection crucial.",
        difficulty: "hard"
    },
    {
        sdg: 13,
        question: "What is the most effective individual action to reduce carbon footprint?",
        options: [
            "Recycling more",
            "Using LED bulbs",
            "Reducing meat consumption",
            "Taking shorter showers"
        ],
        correct: 2,
        explanation: "Animal agriculture produces significant greenhouse gases, so reducing meat consumption has a major impact.",
        difficulty: "medium"
    }
];

export const sdgInfo: Record<number, SDGInfo> = {
    13: {
        color: 'bg-green-500',
        icon: '🌍',
        title: 'Climate Action'
    },
    14: {
        color: 'bg-blue-500',
        icon: '🌊',
        title: 'Life Below Water'
    },
    15: {
        color: 'bg-green-600',
        icon: '🌿',
        title: 'Life on Land'
    }
};

export const pointValues = {
    easy: 10,
    medium: 15,
    hard: 25
} as const;