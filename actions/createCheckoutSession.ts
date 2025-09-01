"use server";

import stripe from "@/lib/stripe";
import { CartItem } from "@/store";
import Stripe from "stripe";
import { Product } from "@/types/product";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  address?: string;
}

export interface GroupedCartItems {
  product: Product;
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        address: metadata.address || "",
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items?.map((item) => ({
        price_data: {
          currency: "INR",
          unit_amount: Math.round(item?.product?.sellingPrice! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: `${item?.product?.brand} - ${item?.product?.specifications?.ram} RAM, ${item?.product?.specifications?.storage} Storage`,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.imageUrls && item?.product?.imageUrls?.length > 0
                ? [item?.product?.imageUrls[0]]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}
