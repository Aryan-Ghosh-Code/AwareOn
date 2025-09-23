import twilio from "twilio";
import Govt from "../models/govt.model";

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

async function notifyGovernment(
    ministry: string,
    town: string,
    city: string,
    problemName: string,
    address: string
) {
    // 1️⃣ Find Govt body covering the given town first, else fallback to city
    let govDept = await Govt.findOne({
        "departments.name": ministry,
        "jurisdiction.town": town
    });

    if (!govDept) {
        govDept = await Govt.findOne({
            "departments.name": ministry,
            "jurisdiction.city": city
        });
    }

    if (!govDept) return; // no government department found to notify

    // 2️⃣ Filter out only the departments matching the ministry name
    const departmentsToAlert = govDept.departments.filter(
        d => d.name === ministry && d.contact
    );

    // 3️⃣ Send SOS alert SMS to each matching department contact
    for (const dept of departmentsToAlert) {
        const message = `🚨 SOS Alert: ${problemName} verified at ${address}`;

        await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${dept.contact}`, // assuming Indian numbers
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID
        });
    }
}

export default notifyGovernment;