import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerName, customerEmail, items, grandTotal } =
      await request.json();

    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmation - ${orderId}`,
      react: OrderConfirmationEmail({
        orderId,
        customerName,
        items,
        grandTotal,
      }),
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send confirmation email",
      },
      { status: 200 }
    );
  }
}
