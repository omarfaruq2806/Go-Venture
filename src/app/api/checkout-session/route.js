import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/session/server-session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const userSession = await getSession();
    const formData = await request.formData();
    const price = formData.get("price");
    const title = formData.get("title");
    const bookingId = formData.get("bookingId");
    console.log({price , title , bookingId} , 'from route');

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: userSession.user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            product_data: {
              name: formData.get("title"),
            },
            unit_amount: Number(formData.get("price")) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: price,
        userId: userSession.user.id,
        userEmail: userSession.user.email,
        userName: userSession.user.name,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
