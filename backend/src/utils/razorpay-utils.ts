import axios from "axios";
import { CreateContactProps, FundAccountCreationProps } from "../types";

export const BASE_URL = "https://api.razorpay.com/v1";
export const KEY_ID = process.env.RAZORPAY_KEY_ID!;
export const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!

/**
 * Create a contact in Razorpay
 */
export const createContact = async ({
    name,
    email,
    contact,
    type = "customer",
    reference_id,
}: CreateContactProps) => {
    const body = {
        name,
        email,
        contact,
        type,
        reference_id
    };
    const auth = {
        username: KEY_ID,
        password: KEY_SECRET,
    }

    try {
        const res = await axios.post(`${BASE_URL}/contacts`, body, { auth });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errMsg =
                error.response?.data?.error?.description || error.message || "Unknown error";
            console.log("Razorpay createContact error:", errMsg);
            return null;
        }
        console.log("Unexpected createContact error:", error);
        return null;
    }
};

/**
 * Create a fund account (bank) in Razorpay
 */
export const createFundAccountBank = async ({
    contact_id,
    name,
    ifsc,
    account_number,
}: FundAccountCreationProps) => {
    const body = {
        contact_id,
        bank_account: {
            name,
            ifsc,
            account_number
        },
        account_type: "bank_account",
    };
    const auth = {
        username: KEY_ID,
        password: KEY_SECRET,
    }

    try {
        const res = await axios.post(`${BASE_URL}/fund_accounts`, body, { auth });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errMsg =
                error.response?.data?.error?.description || error.message || "Unknown error";
            console.log("Razorpay createFundAccountBank error:", errMsg);
            return null;
        }
        console.log("Unexpected createFundAccountBank error:", error);
        return null;
    }
};