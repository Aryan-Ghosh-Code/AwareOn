import type { TierInfo } from "../types";

export const communityCover = {
    "Climate Vanguard": "/Climate_Vanguard.png",
    "Ocean Guardians": "/Ocean_Guardians.png",
    "Earth Stewards": "/Earth_Stewards.png",
    "SDG 13": "/bg1.jpg",
    "SDG 14": "/bg4.jpg",
    "SDG 15": "/bg3.jpg"
}

export const communityColor = {
    "Climate Vanguard": "text-purple-700",
    "Ocean Guardians": "text-blue-700",
    "Earth Stewards": "text-green-700",
    "SDG 13": "text-green-600",
    "SDG 14": "text-blue-600",
    "SDG 15": "text-emerald-700"
}

export const tiers = [
    {
        tierName: "Climate Vanguard",
        points: "0-500",
        img: "/Climate_Vanguard.png"
    },
    {
        tierName: "Ocean Guardians",
        points: "501-1500",
        img: "/Ocean_Guardians.png"
    },
    {
        tierName: "Earth Stewards",
        points: "1501 and Above",
        img: "/Earth_Stewards.png"
    }
] as TierInfo[];