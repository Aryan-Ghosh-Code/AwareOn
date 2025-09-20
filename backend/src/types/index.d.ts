import { Types } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AdminToken {
    password: string;
}

export interface UserSignupBody {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    city: string;
    state: string;
    pincode: string;
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface NGOSignupBody {
    regId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
    SDG: string[];
    aim: string;
    objectives: string[];
}

export interface NGOLoginBody {
    email: string;
    password: string;
}

export interface GovtSignupBody {
    govtId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    city: string;
    state: string;
    pincode: string;
}

export interface GovtLoginBody {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;
    role: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    gender: "M" | "F" | "O";
    problemRepoIds: Types.ObjectId[];
    location?: {
        city: string;
        state: string;
        pincode: string
    } | null;
    tier: Types.ObjectId;
    points: number;
    community: Types.ObjectId[];
    openCommunity: Types.ObjectId[];
}

export interface NGO {
    _id: Types.ObjectId;
    role: string;
    regId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    projectRepoIds: Types.ObjectId[];
    location?: {
        city: string;
        state: string;
        pincode: string
    } | null;
    SDG: string[];
    aim: string;
    objectives: string[];
    tier: Types.ObjectId;
    points: number;
    community: Types.ObjectId[];
    openCommunity: Types.ObjectId[];
}

export interface Govt {
    _id: Types.ObjectId;
    role: string;
    govtId: string;
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    profilePic?: string | null;
    projectRepoIds: Types.ObjectId[];
    jurisdiction?: {
        city: string;
        state: string;
        pincode: string
    } | null;
    tier: Types.ObjectId;
    points: number;
    community: Types.ObjectId[];
    openCommunity: Types.ObjectId[];
}

declare module "express" {
    export interface Request {
        user?: User;
        ngo?: NGO;
        govt?: Govt;
    }
}

export interface DecodedToken extends JwtPayload {
    userId: string;
    role: "user" | "ngo" | "govt";
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
}

export interface PostProblemProps {
    url: string;
    description?: string | null;
    lat: number;
    lon: number;
}

export interface PaymentProps {
    purpose?: string;
    amount: number;
    projectId: string;
}

export interface CreateContactProps {
    name: string;
    email: string;
    contact: string;
    type?: string;
    reference_id: string;
}

export interface FundAccountCreationProps {
    contact_id: string;
    name: string;
    ifsc: string;
    account_number: string;
}

export interface OnboardingProps {
    ifsc: string;
    account_number: string;
    reference_id: string;
}

export interface PaymentVerificationProps {
    razorpay_payment_id: string;
    razorpay_payment_link_id: string;
    razorpay_payment_link_reference_id: string;
    razorpay_payment_link_status: string;
    razorpay_signature: string;
    projectId: string;
}

export interface Receiver {
    index: number;
    id: string;
    entity: string;
    type: string;
    account_number: string;
    ifsc: string;
    bank_name: string;
    name: string;
    is_payout_account: boolean;
    use_for_payouts: string | null;
}

export interface VirtualAccount {
    index: number;
    id: string;
    status: string;
    description: string;
    amount_expected: number;
    amount_paid: number;
    customer_id: string;
    close_by: number | null;
    closed_at: number | null;
    created_at: number;
    receivers: Receiver[];
}

export interface ModelResult {
    problem: string;
    ConfidenceScore: number;
    sdgs: string[];
    actionableInsights: string[];
}

export interface ReportGenerationProps {
    type: "Project" | "Problem";
    startDate: string;
    endDate: string;
    actions: string[];
    workforce: number;
    articulateProof: string[];
}

export interface CommentProps {
    type: "Project" | "Problem";
    message: string;
}