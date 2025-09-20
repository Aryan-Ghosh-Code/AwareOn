import type { ReactNode } from "react";

export interface UserSignupParams {
    name: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    password: string;
    gender: string;
}

export interface LoginParams {
    role: "user" | "ngo" | "govt" | string;
    email: string;
    password: string;
}

export interface NgoSignupParams {
    regId: string;
    name: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    mobileNo: string;
    password: string;
    aim: string;
    SDG: string[];
}

export interface GovSignupParams {
    govtId: string;
    name: string;
    email: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
    password: string;
}

export interface AuthUser {
    _id: string;
    role: "user" | "ngo" | "govt";
    name: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    profilePic?: string | null;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    loading: boolean;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface TabIconProps {
    focused: boolean;
    icon: any;
}

export interface OwnerPreview {
    _id: string;
    name: string;
    email?: string;
    profilePic?: string | null;
}

export interface ReportPreview {
    timeline: {
        startDate: string;
        endDate: string;
    };
    _id: string;
    reporter: {
        _id: string;
        name: string;
    };
    reporterModel: "NGO" | "Govt"
}

export interface ProjectProps {
    _id: string;
    owner: OwnerPreview;
    ownerModel: "NGO" | "Govt";
    name: string;
    location: {
        city: string;
        state: string;
    };
    timeline: {
        startDate: string;
        endDate: string;
    };
    SDG: string[];
    aim: string;
    description: string;
    objectives: string[];
    target: number;
    tariff: number[];
    fundRaised: number;
    reports: ReportPreview[] | string[];
    comments: {
        _id: string;
        name: string;
        message: string
    }[];
}

export interface ProjectSearchBarProps {
    onSearch: (query: string) => void;
    resetFilters: () => void;
    sdgOptions: string[];
    ownerOptions: { _id: string; name: string }[];
    onFilterSDG: (sdg: string) => void;
    onFilterOwner: (owner: string) => void;
}

export interface ProblemSearchProps {
    onSearch: (query: string) => void;
    resetFilters: () => void;
    sdgOptions: string[];
    locationOptions: string[];
    onFilterSDG: (sdg: string) => void;
    onFilterLocation: (location: string) => void;
}

export interface WorkingEntityPreview {
    _id: string;
    name: string;
    email: string;
    profilePic?: string | null;
}

export interface ProblemProps {
    _id: string;
    owner: OwnerPreview;
    url: string;
    problem: string;
    SDG: string[];
    alertLevel: string;
    confidence: number;
    actionableInsights: string[];
    NGOWorking: WorkingEntityPreview[];
    GovtWorking: WorkingEntityPreview[];
    reports: ReportPreview[] | string[];
    statusForUser: string;
    statusForGovt: string;
    location: {
        lat: number;
        lon: number;
        address: string;
    };
    comments: {
        _id: string;
        name: string;
        message: string
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface ProjectCreationProps {
    name: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    SDG: string[];
    aim: string;
    description: string;
    objectives: string[];
    target: number;
    tariff: number[];
};

export interface ProblemCreationProps {
    url: string;
    description?: string | null;
    lat: number;
    lon: number;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface PaymentInitiationProps {
    amount: number;
    projectId: string;
}

export interface PaymentVerificationProps {
    razorpay_payment_id: string;
    razorpay_payment_link_id: string;
    razorpay_payment_link_reference_id: string;
    razorpay_payment_link_status: string;
    razorpay_signature: string;
    projectId: string;
}

export interface PaymentVerificationResponse {
    ok: boolean;
    signatureVerified: boolean;
    projectUpdated: boolean;
    paymentSummary: {
        id: string;
        status: string;
        amount: number;
        currency: string;
        method: string;
        captured: boolean;
        created_at: number;
    };
    updatedProject: {
        id: string;
        name: string;
        fundRaised: number;
    };
}

export interface Question {
    sdg: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
    questionIndex: number;
    selectedAnswer: number;
    isCorrect: boolean;
    points: number;
}

export interface ScoreLevel {
    title: string;
    color: string;
    bg: string;
}

export interface QuizState {
    currentQuestion: number;
    selectedAnswer: number | null;
    showResult: boolean;
    points: number;
    streak: number;
    gameCompleted: boolean;
    userAnswers: UserAnswer[];
}

export interface SDGInfo {
    color: string;
    icon: string;
    title: string;
}

export interface SubmitReportProps {
    id: string,
    type: "Project" | "Problem";
    startDate: string;
    endDate: string;
    actions: string[];
    workforce: number;
    articulateProof: string[];
}

export interface AddCommentProps {
    id: string;
    type: "Project" | "Problem";
    message: string;
}

export interface SendMessageProps {
    id: string;
    message: string;
}

export interface ReportSubmissionProps {
    startDate: string;
    endDate: string;
    actions: string[];
    workforce: number;
    articulateProof: string[];
}

export interface ReporterRef {
    _id: string;
    name: string;
    email: string;
}

export interface Report {
    _id: string;
    timeline: {
        startDate: string;
        endDate: string;
    };
    reporter: ReporterRef;
    reporterModel: "NGO" | "Govt";
    intentId: string;
    intentModel: "Project" | "Problem";
    actions: string[];
    workforce: number;
    articulateProof: string[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface StatsProps {
    problems: number;
    problems13: number;
    problems14: number;
    problems15: number;
    pendingProblems: number;
    ongoingProblems: number;
    resolvedForUser: number;
    resolvedForGovt: number;
    problemsReported: {
        oneHourAgo: number;
        sixHoursAgo: number;
        twelveHoursAgo: number;
        oneDayAgo: number;
        threeDaysAgo: number;
        sevenDaysAgo: number;
        thirtyDaysAgo: number;
    };
    _id?: string | null;
    funds13: number;
    funds14: number;
    funds15: number;
}

export interface ProblemsBySDG {
    sdg13: number;
    sdg14: number;
    sdg15: number;
}

export interface ProblemStatus {
    pending: number;
    ongoing: number;
    resolved: number;
}

export interface ResolvedComparison {
    byUsers: number;
    byGovt: number;
}

export interface FundsRaised {
    sdg13: number;
    sdg14: number;
    sdg15: number;
}

export interface ReportedProblems {
    oneHour: number;
    sixHours: number;
    twelveHours: number;
    oneDay: number;
    threeDays: number;
    sevenDays: number;
    thirtyDays: number;
}

export interface DashboardData {
    totalProblems: number;
    problemsBySDG: ProblemsBySDG;
    problemStatus: ProblemStatus;
    resolvedComparison: ResolvedComparison;
    fundsRaised: FundsRaised;
    reportedProblems: ReportedProblems;
}

export interface SDGColors {
    sdg13: string;
    sdg14: string;
    sdg15: string;
}

export interface ChartProps {
    data: DashboardData
};

export interface CommentForm {
    message: string;
}

export interface CommentModalProps {
    showCommentModal: boolean;
    setShowCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
    submitComment: () => Promise<void>;
    commentForm: CommentForm;
    setCommentForm: React.Dispatch<React.SetStateAction<CommentForm>>;
    commenting: boolean;
}

export interface HeatMapPoint extends Array<number> {
    0: number;
    1: number;
    2: number;
}

export interface HotspotViewState {
    maxLoss: number;
    selectedView: 'heatmap' | 'markers';
    setSelectedView: React.Dispatch<React.SetStateAction<'heatmap' | 'markers'>>;
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface StateDataProps {
    stateData: {
        state: string;
        loss_ha: number;
        abbreviation: string;
    }[];
}

export interface SenderProps {
    _id: string;
    name: string;
    profilePic?: string | null;
}

export interface Chat {
    _id: string;
    message: string;
    sender: SenderProps;
    senderModel: "User" | "NGO" | "Govt";
    createdAt: string;
}

export interface Member {
    _id: string;
    memberId: {
        _id: string;
        name: string;
        email: string;
        profilePic?: string | null;
    }
    memberModel: "User" | "NGO" | "Govt";
}

export interface Tier {
    tierId: string;
    tierName: string;
}

export interface Community {
    _id: string;
    tierId: Tier;
    members: Member[];
    chats: Chat[];
    createdAt: string;
    updatedAt: string
    __v: number;
}

export interface OpenCommunity {
    _id: string;
    SDG: "SDG 13" | "SDG 14" | "SDG 15";
    members: Member[];
    chats: Chat[];
    createdAt: string;
    updatedAt: string
    __v: number;
}

export interface Communities {
    _id: string;
    tierId: {
        _id: string;
        tierName: "Climate Vanguard" | "Ocean Guardians" | "Earth Stewards";
    };
    members: {
        memberId: string;
        memberModel: "User" | "NGO" | "Govt";
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OpenCommunities {
    _id: string;
    SDG: "SDG 13" | "SDG 14" | "SDG 15";
    members: {
        memberId: string;
        memberModel: "User" | "NGO" | "Govt";
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type TierName = "Climate Vanguard" | "Ocean Guardians" | "Earth Stewards";

export interface TierInfo {
    tierName: "Climate Vanguard" | "Ocean Guardians" | "Earth Stewards";
    points: string;
    img: string;
}

export interface ActivitiesButtonsProps {
    label: string,
    path: string;
}