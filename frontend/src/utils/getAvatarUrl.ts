import type { SenderProps } from "../types";

/* Professional, illustrated human avatars (stable per user)
	 DiceBear notionists-neutral: clean, professional illustrated portraits
*/
const getAvatarUrl = (input?: SenderProps) => {
	if (input?.profilePic) return input.profilePic;
	const seed = input?._id || input?.name || "un4gettable-user";

	return `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${encodeURIComponent(
		seed
	)}&backgroundType=gradientLinear&backgroundRotation=135&radius=50&shapeColor=2e3550,242038,223044&accessoriesProbability=15`;
};

export default getAvatarUrl;