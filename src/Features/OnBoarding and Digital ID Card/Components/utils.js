// utils.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (joiners, selectedDate) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("🧾 Daily Joiner Report", 14, 20);

  // Subtitle and Date
  doc.setFontSize(12);
  doc.setTextColor(70);
  doc.text(`Date: ${selectedDate}`, 14, 28);
  doc.line(14, 30, 195, 30); // horizontal line

  // Summary
  const totalJoiners = joiners.length;
  const totalCost = joiners.reduce((sum, j) => sum + parseFloat(j.cost), 0);

  doc.setFontSize(11);
  doc.text(`Total Joiners: ${totalJoiners}`, 14, 38);
  doc.text(`Total Cost: \u20B9${totalCost.toLocaleString("en-IN")}`, 14, 44);  // Use Unicode for ₹ symbol

  // Table
  autoTable(doc, {
    startY: 50,
    head: [
      [
        "#",
        "Name",
        "Joining Date",
        "Department",
        "Role",
        "Site Name",
        "Site Manager",
        "Cost",
      ],
    ],
    body: joiners.map((j, i) => [
      i + 1,
      j.name,
      j.joiningDate,
      j.department,
      j.role,
      j.siteName,
      j.siteManagerName,
      `₹${parseFloat(j.cost).toLocaleString("en-IN")}`, // Use ₹ symbol explicitly
    ]),
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
      fontSize: 12,
    },
    bodyStyles: {
      fontSize: 10,
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      halign: "center",
    },
    theme: "striped",
  });

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.text(
    "This is an auto-generated report by the HR system.",
    14,
    pageHeight - 10
  );

  // Save PDF
  doc.save(`Daily_Joiner_Report_${selectedDate}.pdf`);
};
