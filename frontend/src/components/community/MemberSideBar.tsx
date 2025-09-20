import type { Member } from "../../types";
import getAvatarUrl from "../../utils/getAvatarUrl";

interface MemberProps {
	members: Member[];
}

const MemberSideBar = ({ members }: MemberProps) => {
	return (
		<div className="hidden md:block md:w-1/4 border-r border-[#2298b9] p-4 overflow-y-auto bg-[#242038]">
			<span className="text-lg font-semibold block mb-4 text-gray-100">Members</span>
			<ul className="space-y-3">
				{members.map((member: Member) => {
					const avatar = getAvatarUrl(member?.memberId);

					let badgeText = "";
					let badgeColor = "";

					switch (member.memberModel) {
						case "User":
							badgeText = "User";
							badgeColor = "bg-blue-600";
							break;
						case "NGO":
							badgeText = "NGO";
							badgeColor = "bg-green-700";
							break;
						case "Govt":
							badgeText = "Govt";
							badgeColor = "bg-red-600";
							break;
						default:
							badgeText = "";
							badgeColor = "";
					}

					return (
						<li key={member._id} className="flex items-center gap-3">
							<img
								src={avatar}
								alt={member.memberId?.name || "User"}
								className="w-9 h-9 rounded-full object-cover bg-[#2e3550] ring-1 ring-[#2298b9]/30 shadow-sm"
								loading="lazy"
							/>
							<div className="flex flex-col items-right">
								<span className="text-gray-200 text-sm">
									{member.memberId?.name}
								</span>
								{badgeText && (
									<div>
										<span
											className={`px-2 py-0.5 text-xs rounded-full font-medium text-white ${badgeColor}`}
										>
											{badgeText}
										</span>
									</div>
								)}
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MemberSideBar;