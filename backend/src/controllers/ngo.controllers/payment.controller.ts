import { Request, Response } from "express";
import razorpay from "../../services/razorpay";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, createContact, createFundAccountBank, KEY_ID, KEY_SECRET } from "../../utils/razorpay-utils";
import { OnboardingProps, PaymentProps, PaymentVerificationProps } from "../../types";
import crypto from "crypto";
import axios from "axios";
import Onboarding from "../../models/onboarding.model";
import Project from "../../models/project.model";

export const payFund = async (req: Request, res: Response) => {
    try {
        const { amount, purpose = "P2P Transfer", projectId }: PaymentProps = req.body;
        if (!amount || amount <= 0) {
            res.status(400).json({ error: "Invalid amount" });
            return;
        }

        const payload = {
            amount: Math.round(amount * 100),
            currency: "INR",
            accept_partial: false,
            description: purpose,
            reference_id: uuidv4(),
            customer: {
                name: req.ngo?.name || "Payer",
                email: req.ngo?.email || undefined,
                contact: req.ngo?.mobileNo || undefined
            },
            notify: {
                sms: true,
                email: true
            },
            callback_url: `${process.env.BASE_URL}/payment/payment-success?projectId=${projectId}`,
            callback_method: "get",
        };

        const link = await razorpay.paymentLink.create(payload);

        res.status(200).json(link.short_url);
    } catch (error) {
        console.log("Error in NGO payFund controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const onboardUser = async (req: Request, res: Response) => {
    try {
        const {
            ifsc,
            account_number
        }: OnboardingProps = req.body;

        if (req.ngo) {
            const contactRes = await createContact({
                name: req.ngo.name,
                email: req.ngo.email,
                contact: req.ngo.mobileNo,
                reference_id: req.ngo._id.toString()
            });

            if (!contactRes) {
                res.status(400).json({ error: "Error in creating Account" });
                return;
            }

            const fundRes = await createFundAccountBank({
                contact_id: contactRes.id,
                name: req.ngo.name,
                ifsc,
                account_number
            });

            if (!fundRes) {
                res.status(400).json({ error: "Error in Linking Bank Account" });
                return;
            }

            const newOnboarding = new Onboarding({
                customerId: req.ngo._id,
                customerModel: "NGO",
                contactId: contactRes.id,
                fundAccountId: fundRes.id
            });

            console.log(newOnboarding);

            if (newOnboarding) {
                await newOnboarding.save();
                res.status(201).json(newOnboarding);
            } else {
                res.status(400).json({ error: "Error in Onboarding User" });
            }
        } else {
            res.status(400).json({ error: "Cannot find Govt. Body Data" });
        }
    } catch (error) {
        console.log("Error in NGO onboardUser controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/*export const createPayout = async (req: Request, res: Response) => {
    try {
        // fetch receiver bank/upi from DB
        //const receiver = await User.findById(receiverId);

        // create payout
        const response = await axios.post(
            "https://api.razorpay.com/v1/payouts",
            {
                account_number: process.env.RAZORPAYX_VIRTUAL_ACCOUNT,
                fund_account_id: "fa_R829UHswy5rTPX",
                amount: 100 * 100,
                currency: "INR",
                mode: "UPI", // or IMPS/NEFT
                purpose: "p2p_transfer",
            },
            {
                auth: {
                    username: process.env.RAZORPAY_KEY_ID!,
                    password: process.env.RAZORPAY_KEY_SECRET!,
                },
            }
        );

        res.status(201).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Razorpay returns { error: { code, description, source, step, reason } }
            const rzpError = error.response?.data?.error;
            const errMsg =
                rzpError?.description || error.message || "Unknown Razorpay error";

            console.error("Razorpay payout error:", rzpError || errMsg);

            return res.status(error.response?.status || 400).json({
                success: false,
                error: errMsg,
                details: rzpError || null,
            });
        }

        console.error("Unexpected payout error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};*/

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_payment_link_id,
            razorpay_payment_link_reference_id,
            razorpay_payment_link_status,
            razorpay_signature,
            projectId,
        }: PaymentVerificationProps = req.body;

        if (!razorpay_signature) {
            res.status(400).json({ error: "Missing razorpay_signature" });
            return;
        }

        const payloadParts = [
            razorpay_payment_link_id || "",
            razorpay_payment_link_reference_id || "",
            razorpay_payment_link_status || "",
            razorpay_payment_id || "",
        ];
        const payload = payloadParts.join("|");

        const expectedSignature = crypto
            .createHmac("sha256", KEY_SECRET)
            .update(payload)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            res.status(400).json({ error: "Invalid signature" });
            return;
        }

        if (!razorpay_payment_id) {
            res.status(400).json({ error: "Missing payment id" });
            return;
        }

        const response = await axios.get(
            `${BASE_URL}/payments/${encodeURIComponent(razorpay_payment_id)}`,
            { auth: { username: KEY_ID, password: KEY_SECRET } }
        );

        const payment = response.data;

        if (!payment) {
            res.status(400).json({ error: "Error in verifying payment" });
            return;
        }

        if (payment.status !== "captured" && payment.status !== "authorized") {
            res.status(400).json({ error: "Payment not successful" });
            return
        }

        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }

        project.fundRaised = (project.fundRaised || 0) + payment.amount / 100;

        await project.save();

        return res.status(200).json({
            ok: true,
            signatureVerified: true,
            projectUpdated: true,
            paymentSummary: {
                id: payment.id,
                status: payment.status,
                amount: payment.amount / 100,
                currency: payment.currency,
                method: payment.method,
                captured: payment.captured,
                created_at: payment.created_at,
            },
            updatedProject: {
                id: project._id,
                name: project.name,
                fundRaised: project.fundRaised,
            },
        });
    } catch (error) {
        console.error("Error in NGO verifyPayment controller", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};