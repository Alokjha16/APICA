import twilio from "twilio";

export const sendSMS = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        message: "Phone number and message are required",
      });
    }

    // 🔥 Create client inside function
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.status(200).json({
      success: true,
      sid: result.sid,
      message: "SMS sent successfully",
    });

  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
