import * as React from "react";
import { CartItem } from "@/types";

interface OrderConfirmationEmailProps {
  orderId: string;
  customerName: string;
  items: CartItem[];
  grandTotal: number;
}

export const OrderConfirmationEmail = ({
  orderId,
  customerName,
  items,
  grandTotal,
}: OrderConfirmationEmailProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={mainStyle}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <h1 style={logoStyle}>audiophile</h1>
          </div>

          <div style={contentStyle}>
            <h2 style={headingStyle}>
              Thank You for Your Order, {customerName}!
            </h2>
            <p style={paragraphStyle}>
              We are getting your order ready. You will receive a shipping
              confirmation email soon.
            </p>

            <div style={orderIdBoxStyle}>
              <p style={orderIdLabelStyle}>Order ID</p>
              <p style={orderIdValueStyle}>{orderId}</p>
            </div>

            <div style={itemsSectionStyle}>
              <h3 style={sectionHeadingStyle}>Order Summary</h3>
              {items.map((item, index) => (
                <div key={index} style={itemRowStyle}>
                  <div>
                    <p style={itemNameStyle}>{item.name}</p>
                    <p style={itemDetailsStyle}>
                      ${item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p style={itemTotalStyle}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={totalSectionStyle}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={totalLabelStyle}>Grand Total</td>
                  <td style={{ ...totalValueStyle, textAlign: "right" }}>
                    ${Math.round(grandTotal).toLocaleString()}
                  </td>
                </tr>
              </table>
            </div>

            <div style={ctaContainerStyle}>
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation?orderId=${orderId}`} style={ctaButtonStyle}>
                View Your Order
              </a>
            </div>

            <div style={supportSectionStyle}>
              <p style={supportHeadingStyle}>Need Help?</p>
              <p style={supportTextStyle}>
                Contact our support team at{" "}
                <a href="mailto:support@audiophile.com" style={linkStyle}>
                  support@audiophile.com
                </a>
              </p>
            </div>
          </div>

          <div style={footerStyle}>
            <p style={footerTextStyle}>
              © {new Date().getFullYear()} Audiophile. All rights reserved.
            </p>
            <p style={footerTextStyle}>
              Bringing you the best audio gear
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

const mainStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f5",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  padding: "20px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#101010",
  padding: "32px",
  textAlign: "center",
};

const logoStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
  textTransform: "lowercase",
};

const contentStyle: React.CSSProperties = {
  padding: "40px 32px",
};

const headingStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "28px",
  fontWeight: "700",
  marginTop: "0",
  marginBottom: "16px",
};

const paragraphStyle: React.CSSProperties = {
  color: "#4C4C4C",
  fontSize: "15px",
  lineHeight: "1.6",
  marginBottom: "24px",
};

const orderIdBoxStyle: React.CSSProperties = {
  backgroundColor: "#FAFAFA",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "32px",
};

const orderIdLabelStyle: React.CSSProperties = {
  color: "#4C4C4C",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0 0 8px 0",
};

const orderIdValueStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "18px",
  fontWeight: "700",
  margin: "0",
};

const itemsSectionStyle: React.CSSProperties = {
  marginBottom: "32px",
};

const sectionHeadingStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "18px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "20px",
};

const itemRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 0",
  borderBottom: "1px solid #F1F1F1",
};

const itemNameStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 4px 0",
};

const itemDetailsStyle: React.CSSProperties = {
  color: "#4C4C4C",
  fontSize: "13px",
  margin: "0",
};

const itemTotalStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0",
};

const totalSectionStyle: React.CSSProperties = {
  backgroundColor: "#101010",
  padding: "24px",
  borderRadius: "8px",
  marginBottom: "32px",
};

const totalLabelStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const totalValueStyle: React.CSSProperties = {
  color: "#D87D4A",
  fontSize: "24px",
  fontWeight: "700",
};

const ctaContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
};

const ctaButtonStyle: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#D87D4A",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: "16px 32px",
  borderRadius: "4px",
  textDecoration: "none",
};

const supportSectionStyle: React.CSSProperties = {
  backgroundColor: "#FAFAFA",
  padding: "24px",
  borderRadius: "8px",
  textAlign: "center",
};

const supportHeadingStyle: React.CSSProperties = {
  color: "#101010",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 8px 0",
};

const supportTextStyle: React.CSSProperties = {
  color: "#4C4C4C",
  fontSize: "14px",
  margin: "0",
};

const linkStyle: React.CSSProperties = {
  color: "#D87D4A",
  textDecoration: "none",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#101010",
  padding: "32px",
  textAlign: "center",
};

const footerTextStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "13px",
  opacity: "0.5",
  margin: "4px 0",
};
