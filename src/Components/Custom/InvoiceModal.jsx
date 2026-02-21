// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const BRAND_RED = "#ec3557";

// const InvoiceModal = ({ open, onClose }) => {
//   const invoiceRef = useRef(null);
//   if (!open) return null;

//   const downloadPDF = async () => {
//     const element = invoiceRef.current;

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pageWidth = 210;
//     const pageHeight = 297;

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//    while (heightLeft > pageHeight)
//  {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save("invoice.pdf");
//   };

//   return (
//     <>
//       {/* Font inline – kahin aur kuch add karna nahi */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
//         rel="stylesheet"
//       />

//       <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto py-10">
//         <div className="mx-auto bg-white rounded-lg shadow-xl w-fit">

//           {/* INVOICE (A4 SIZE) */}
//           <div
//             ref={invoiceRef}
//             style={{
//               width: "210mm",
//               minHeight: "297mm",
//               padding: "24mm",
//               fontFamily: "Poppins, sans-serif",
//               color: "#222",
//             }}
//           >
//             {/* Header */}
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <img
//                 src="https://i.ibb.co/zhqcS6RS/download.png"
//                 alt="logo"
//                 style={{ height: 48 }}
//               />

//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontSize: 34, fontWeight: 500 }}>Invoice</div>
//                 <div
//                   style={{
//                     fontSize: 18,
//                     fontWeight: 600,
//                     color: BRAND_RED,
//                   }}
//                 >
//                   #JH56A1
//                 </div>
//               </div>
//             </div>

//             {/* Addresses */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 40,
//                 marginTop: 40,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontSize: 12,
//                     letterSpacing: 1,
//                     color: "#777",
//                     marginBottom: 6,
//                   }}
//                 >
//                   BILLING ADDRESS
//                 </div>
//                 <div style={{ fontSize: 15, fontWeight: 600 }}>
//                   Yesenia M. Lawrence
//                 </div>
//                 <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
//                   3647 Confederate Drive<br />
//                   Syracuse, NY 13221<br />
//                   email@youraddress.com<br />
//                   (555) 987-123
//                 </div>
//               </div>

//               <div>
//                 <div
//                   style={{
//                     fontSize: 12,
//                     letterSpacing: 1,
//                     color: "#777",
//                     marginBottom: 6,
//                   }}
//                 >
//                   SHIPPING ADDRESS
//                 </div>
//                 <div style={{ fontSize: 15, fontWeight: 600 }}>
//                   Yesenia M. Lawrence
//                 </div>
//                 <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
//                   3647 Confederate Drive<br />
//                   Syracuse, NY 13221<br />
//                   email@youraddress.com<br />
//                   (555) 987-123
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: 40,
//                 fontSize: 14,
//               }}
//             >
//               <thead>
//                 <tr style={{ background: BRAND_RED, color: "#fff" }}>
//                   <th style={{ padding: 10, textAlign: "left" }}>Product</th>
//                   <th style={{ padding: 10, textAlign: "center" }}>Qty</th>
//                   <th style={{ padding: 10, textAlign: "right" }}>
//                     Unit Price
//                   </th>
//                   <th style={{ padding: 10, textAlign: "right" }}>Total</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr style={{ borderBottom: "1px solid #eee" }}>
//                   <td style={{ padding: 10 }}>ToasterMaster Toaster</td>
//                   <td style={{ padding: 10, textAlign: "center" }}>1</td>
//                   <td style={{ padding: 10, textAlign: "right" }}>$50</td>
//                   <td style={{ padding: 10, textAlign: "right" }}>$49</td>
//                 </tr>

//                 <tr style={{ borderBottom: "1px solid #eee" }}>
//                   <td style={{ padding: 10 }}>QuickHeat Microwave</td>
//                   <td style={{ padding: 10, textAlign: "center" }}>1</td>
//                   <td style={{ padding: 10, textAlign: "right" }}>$150</td>
//                   <td style={{ padding: 10, textAlign: "right" }}>$135</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Totals */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 marginTop: 30,
//               }}
//             >
//               <div style={{ width: 280, fontSize: 15 }}>
//                 <div
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <span>Subtotal</span>
//                   <span>$184</span>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 8,
//                   }}
//                 >
//                   <span>Delivery Charges</span>
//                   <span>$0</span>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 12,
//                     fontWeight: 600,
//                     fontSize: 17,
//                     borderTop: "1px solid #ccc",
//                     paddingTop: 10,
//                   }}
//                 >
//                   <span>Total Paid</span>
//                   <span>$184</span>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Policy – readable */}
//             <div
//               style={{
//                 marginTop: 40,
//                 fontSize: 14,
//                 color: "#444",
//                 lineHeight: 1.8,
//               }}
//             >
//               <strong>Payment & Shipping Policy:</strong>
//               <br />
//               Orders are processed based on product availability and are usually
//               shipped within <strong>5 to 7 business days</strong>. Payments once
//               confirmed are non-refundable unless the product is damaged or
//               incorrect.
//               <br />
//               <br />
//               For any assistance, please contact our support team.  
//               Thank you for shopping with <strong>Nallakkar</strong>.
//             </div>
//           </div>

//           {/* Footer Buttons */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 12,
//               padding: 16,
//               borderTop: "1px solid #eee",
//               background: "#fff",
//             }}
//           >
//             <button onClick={onClose} className="px-4 py-2 border rounded">
//               Close
//             </button>
//             <button
//               onClick={downloadPDF}
//               style={{
//                 background: BRAND_RED,
//                 color: "#fff",
//                 padding: "10px 18px",
//                 borderRadius: 6,
//               }}
//             >
//               Download Invoice
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InvoiceModal;























import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import imgData from "./logo1.png"
const BRAND_RED = "#ec3557";
// const imgData = "./logo1.png"
import logo from "./logo1.png";
const InvoiceModal = ({ open, onClose, order }) => {
  const invoiceRef = useRef(null);
  if (!open || !order) return null;

  const d = order.order_details || {};
  const items = d.order_items || [];

  const fullName =
    `${d.billing_first_name || ""} ${d.billing_last_name || ""}`.trim() ||
    order.customer_email;

  const invoiceNo = order.shiprocket_order_id || order.order_id;
  const invoiceDate = new Date(order.created_at).toLocaleDateString("en-IN");

  const subtotal = Number(d?.sub_total ?? 0);

  const shipping = 0;

  const totalPaid = subtotal;


const downloadPDF = async () => {
  const canvas = await html2canvas(invoiceRef.current, {
    scale: 3,              // 🔥 better sharpness
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Directly fit into A4 (no height calculation, no loop)
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

  pdf.save(`Invoice-${invoiceNo}.pdf`);
};

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto py-10">
        <div className="mx-auto bg-white rounded-lg shadow-xl w-fit">

          {/* ===== INVOICE PAGE ===== */}
          <div
            ref={invoiceRef}
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "24mm",
              fontFamily: "Poppins, sans-serif",
              color: "#222",
            }}
          >
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src={logo} alt="logo" style={{ height: 48 }} />

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 34, fontWeight: 500 }}>Invoice</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: BRAND_RED }}>
                  #{invoiceNo}
                </div>
                <div style={{ fontSize: 13 }}>{invoiceDate}</div>
              </div>
            </div>

            {/* ADDRESSES */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
                marginTop: 40,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#777", marginBottom: 6 }}>
                  BILLING ADDRESS
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{fullName}</div>
                <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                  {d.billing_address}<br />
                  {d.billing_city} - {d.billing_pincode}<br />
                  {d.billing_state}, {d.billing_country}<br />
                  {d.billing_phone}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: "#777", marginBottom: 6 }}>
                  SHIPPING ADDRESS
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {d.shipping_first_name || fullName}
                </div>
                <div style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                  {d.shipping_address}<br />
                  {d.shipping_city} - {d.shipping_pincode}<br />
                  {d.shipping_state}, {d.shipping_country}<br />
                  {d.shipping_phone}
                </div>
              </div>
            </div>

            {/* ITEMS TABLE */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 40,
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: BRAND_RED, color: "#fff" }}>
                  <th style={{ padding: 10, textAlign: "left" }}>Product</th>
                  <th style={{ padding: 10, textAlign: "center" }}>Qty</th>
                  {/* <th style={{ padding: 10, textAlign: "right" }}>Unit Price</th> */}
                  <th style={{ padding: 10, textAlign: "right" }}>Total</th>
                </tr>
              </thead>

             <tbody>
  {items.map((item, i) => {
    const totalAmountInRupees = Number(order.total_amount || 0) / 100;
    const itemTotal = totalAmountInRupees / (item.units || 1);

    return (
      <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
        <td style={{ padding: 10 }}>{item.name}</td>

        <td style={{ padding: 10, textAlign: "center" }}>
          {item.units}
        </td>

        <td style={{ padding: 10, textAlign: "right" }}>
          ₹{itemTotal.toFixed(2)}
        </td>
      </tr>
    );
  })}
</tbody>
            </table>

            {/* TOTALS */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 30,
              }}
            >
              <div style={{ width: 280, fontSize: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <span>Delivery Charges</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 12,
                    fontWeight: 600,
                    fontSize: 17,
                    borderTop: "1px solid #ccc",
                    paddingTop: 10,
                  }}
                >
                  <span>Total Paid</span>
                  <span>₹{totalPaid.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* PAYMENT POLICY */}
            <div
              style={{
                marginTop: 40,
                fontSize: 14,
                color: "#444",
                lineHeight: 1.8,
              }}
            >
              <strong>Payment Policy:</strong>
              <br />
              By making a payment, you agree to Nallakkar’s Privacy Policy and Terms & Conditions.
              For support, contact us at <a className="text-primary" href="mailto:support@nallakkar.com">support@nallakkar.com</a>

              <br /><br />
              Thank you for shopping with <strong>Nallakkar</strong>.
            </div>

          </div>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              padding: 16,
              borderTop: "1px solid #eee",
              background: "#fff",
            }}
          >
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Close
            </button>
            <button
              onClick={downloadPDF}
              style={{
                background: BRAND_RED,
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 6,
              }}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;
