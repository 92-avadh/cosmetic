import { z } from "zod";

// Schema for OTP generation request
export const otpRequestSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .transform((val) => val.toLowerCase().trim()),
});

// Schema for OTP verification
export const otpVerifySchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .transform((val) => val.toLowerCase().trim()),
  code: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

// Schema for promo code validation
export const promoValidateSchema = z.object({
  code: z
    .string()
    .min(1, "Promo code cannot be empty")
    .max(50, "Promo code is too long")
    .transform((val) => val.toUpperCase().trim()),
});

// Schema for individual cart items
export const cartItemSchema = z.object({
  id: z.string().min(1, "Product identifier is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than zero"),
  name: z.string().optional(),
  subtitle: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
});

// Schema for cart synchronization
export const cartSyncSchema = z.object({
  items: z.array(cartItemSchema),
});

// Schema for order placement & checkouts
export const orderCreateSchema = z.object({
  totalUSD: z.number().positive("Total price must be positive"),
  items: z
    .array(
      z.object({
        id: z.string().min(1, "Product ID is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be positive"),
        name: z.string().optional(),
      })
    )
    .min(1, "Order must contain at least one item"),
  shippingDetails: z.object({
    firstName: z.string().min(1, "First name is required").max(50),
    lastName: z.string().min(1, "Last name is required").max(50),
    street: z.string().min(1, "Street address is required").max(150),
    city: z.string().min(1, "City is required").max(100),
    state: z.string().max(100).optional().nullable(),
    zip: z.string().min(1, "ZIP / Postal code is required").max(20),
    country: z.string().min(1, "Country is required").max(50).default("US"),
  }),
  promoCode: z.string().max(50).optional().nullable(),
});

// Schema for user profile/address operations
export const userActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("get"),
  }),
  z.object({
    action: z.literal("update"),
    firstName: z.string().max(50).optional().nullable(),
    lastName: z.string().max(50).optional().nullable(),
    addressDetails: z
      .object({
        name: z.string().max(100).optional().nullable(),
        street: z.string().min(1, "Street address is required").max(150),
        city: z.string().max(100).optional().nullable(),
        state: z.string().max(100).optional().nullable(),
        postalCode: z.string().max(20).optional().nullable(),
        country: z.string().max(50).optional().nullable(),
      })
      .optional()
      .nullable(),
  }),
  z.object({
    action: z.literal("add_address"),
    addressDetails: z.object({
      name: z.string().max(100).optional().nullable(),
      street: z.string().min(1, "Street address is required").max(150),
      city: z.string().max(100).optional().nullable(),
      state: z.string().max(100).optional().nullable(),
      postalCode: z.string().max(20).optional().nullable(),
      country: z.string().max(50).optional().nullable(),
    }),
  }),
  z.object({
    action: z.literal("delete_address"),
    addressId: z.string().uuid("Invalid address ID"),
  }),
]);

// Schema for Razorpay checkout verification
export const razorpayVerifySchema = z.object({
  razorpay_order_id: z.string().min(1, "Razorpay order ID is required"),
  razorpay_payment_id: z.string().min(1, "Razorpay payment ID is required"),
  razorpay_signature: z.string().min(1, "Razorpay signature is required"),
  orderId: z.string().uuid("Invalid checkout order reference ID"),
});
