var fontSizes = {
	HeadTitleFontSize: 18,
	Head2TitleFontSize: 16,
	TitleFontSize: 14,
	SubTitleFontSize: 12,
	NormalFontSize: 10,
	SmallFontSize: 8,
};

var lineSpacing = {
	NormalSpacing: 12,
};

function generateInvoice() {
	let doc = new jsPDF("portrait", "pt", "a4", true, { marginRight: 10 });
	let width = doc.internal.pageSize.getWidth();
	const agentDetails =
		customers[document.querySelector(".agentName").value - 1];
	var InvoiceNumber = $("#invoice_no").val();
	var date = document.getElementById("invoice_date").value;
	var agent = agentDetails.first_name;
	var address = agentDetails.address_line_one;
	var city = agentDetails.city;
	var state = agentDetails.state_name;
	var pin = agentDetails.pincode;
	var gstin = agentDetails.gstin;
	var passname = document.getElementById("name").value;
	var cabin = document.getElementById("cabin").value;
	var suite = document.getElementById("cat_bkg").value;
	var shipname = document.getElementById("ship_name").value;
	var currency = document.getElementById("currency").value;

	var rightStartCol1 = 400;
	var rightStartCol2 = 480;

	var InitialstartX = 40;
	var startX = 40;
	var InitialstartY = 50;
	var startY = 0;

	var lineHeights = 12;

	doc.setFontSize(fontSizes.SubTitleFontSize);

	// -------------- Company Info Start -----------------

	doc.addImage(
		company_logo.src,
		"PNG",
		startX,
		(startY += 50),
		company_logo.w,
		company_logo.h
	);
	doc.textAlign(
		comapnyJSON.CompanyName,
		{ align: "left" },
		startX,
		(startY += 15 + company_logo.h)
	);
	doc.setFontSize(fontSizes.NormalFontSize);

	doc.textAlign(
		comapnyJSON.CompanyAddressLine1,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		comapnyJSON.CompanyAddressLine2,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		"GSTIN : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.CompanyGSTIN, { align: "left" }, 80, startY);

	doc.textAlign(
		"Contact : ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.companyPhno, { align: "left" }, 80, startY);

	doc.textAlign(
		"Website :",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(comapnyJSON.companyWebsite, { align: "left" }, 80, startY);

	// ------------Company Info End ------//

	var tempY = InitialstartY;

	doc.textAlign(
		"INVOICE NO -  ",
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${InvoiceNumber}`, { align: "left" }, rightStartCol2, tempY);

	doc.textAlign(
		"INVOICE DATE - ",
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${date}`, { align: "left" }, rightStartCol2, tempY);

	doc.textAlign(
		`TOTAL AMOUNT PAYABLE { ${currency} }`,
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		`${thFormat(gross_amount)}`,
		{ align: "left" },
		rightStartCol1,
		(tempY += lineSpacing.NormalSpacing)
	);

	doc.setLineWidth(1);
	doc.line(
		20,
		startY + lineSpacing.NormalSpacing,
		220,
		startY + lineSpacing.NormalSpacing
	);
	doc.line(
		380,
		startY + lineSpacing.NormalSpacing,
		580,
		startY + lineSpacing.NormalSpacing
	);

	doc.setFontSize(fontSizes.Head2TitleFontSize);

	doc.textAlign(
		"INVOICE",
		{ align: "center" },
		startX,
		(startY += lineSpacing.NormalSpacing + 2)
	);

	doc.setFontSize(fontSizes.NormalFontSize);

	//-------Agent Info Billing---------------------
	var startBilling = startY + 10;

	doc.textAlign(
		"AGENT - ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(` ${agent}`, { align: "left" }, 80, startY);

	doc.textAlign(
		`${address}`,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${city} `,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${state} - ${pin} `,
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(
		"GSTIN - ",
		{ align: "left" },
		startX,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${gstin}`, { align: "left" }, 80, startY);

	// ------- Passenger details -----------

	var rightcol1 = 330;
	var rightcol2 = 410;
	startY = startBilling + 10;

	doc.textAlign(
		"Passenger Name - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${passname}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"Ship Name - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(`${shipname}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"Cabin / Suite - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${cabin} / ${suite}`, { align: "left" }, rightcol2, startY);

	doc.textAlign(
		"P A X - ",
		{ align: "left" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);

	doc.textAlign(`${total_passenger}`, { align: "left" }, rightcol2, startY);

	// doc.line(
	// 	20,
	// 	(startY += lineSpacing.NormalSpacing),
	// 	560,
	// 	(startY += lineSpacing.NormalSpacing)
	// );

	var options = {
		margin: {
			top: 15,
		},
		showHead: "never",
		styles: {
			overflow: "linebreak",
			font: "helvetica",
			minCellHeight: "auto",
			cellWidth: "wrap",
			fontStyle: "normal",
			textColor: [0, 26, 51],
		},
		columnStyles: {
			0: { cellWidth: "auto", fontSize: 8 },
			1: { cellWidth: "auto", halign: "right", fontSize: 10 },
		},

		startY: (startY += 40),
	};

	var columns = [
		{ title: "", dataKey: "text" },
		{ title: "", dataKey: "Total" },
	];
	var rows = [
		{
			text: "CRUISE BASE FARE",
			Total: thFormat(total),
		},
		{
			text: "N C F ",
			Total: thFormat(ncf_amount),
		},
		{
			text: "TAX ",
			Total: thFormat(tax_amount),
		},
		{
			text: "GRATUITY ",
			Total: thFormat(gratuity_amount),
		},
		{
			text: "HOLIDAY SURCHARGE",
			Total: thFormat(hs_amount),
		},
		{
			text: "EXTRA CHARGES",
			Total: thFormat(misc_amount),
		},
		{
			text: `COMMISSION `,
			Total: thFormat(comm_amount),
		},
		{
			text: `T D S `,
			Total: thFormat(tds_amount),
		},
		{
			text: `ADVANCE / TOKEN  `,
			Total: thFormat(token_amount),
		},
		{
			text: `SUB TOTAL `,
			Total: thFormat(net_amount),
		},
	];

	doc.autoTable(columns, rows, options);

	doc.line(
		20,
		doc.previousAutoTable.finalY + 15,

		560,
		doc.previousAutoTable.finalY + 15
	);

	//-------Invoice Footer---------------------
	var rightcol1 = 240;
	var rightcol2 = 340;
	var rightcol3 = 440;

	doc.setFontSize(fontSizes.SubTitleFontSize);
	startY = doc.lastAutoTable.finalY + 32;

	doc.textAlign(
		"SUB TOTAL AMOUNT ",
		{ align: "right" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing)
	);
	doc.textAlign(
		`${thFormat(net_amount)}`,
		{ align: "left" },
		rightcol3,
		startY
	);

	if (gst !== 0) {
		doc.setFontSize(fontSizes.NormalFontSize);
		doc.textAlign(
			`GST AMOUNT @ ${gst} %  `,
			{ align: "right" },
			rightcol1 + 8,
			(startY += lineSpacing.NormalSpacing + 8)
		);

		doc.textAlign(
			`${thFormat(total_gst)}`,
			{ align: "left" },
			rightcol3,
			startY
		);
	}

	if (val15 !== 0) {
		doc.setFontSize(fontSizes.NormalFontSize);
		doc.textAlign(
			`CGST @ ${val15} %  `,
			{ align: "right" },
			rightcol1 + 8,
			(startY += lineSpacing.NormalSpacing + 8)
		);

		doc.textAlign(`${cgst_amount}`, { align: "right" }, rightcol2, startY);
	}

	if (val17 !== 0) {
		doc.setFontSize(fontSizes.NormalFontSize);
		doc.textAlign(
			`SGST @ ${val17} %  `,
			{ align: "right" },
			rightcol1 + 8,
			(startY += lineSpacing.NormalSpacing + 8)
		);

		doc.textAlign(`${sgst_amount}`, { align: "right" }, rightcol2, startY);
	}
	doc.setFontSize(fontSizes.SubTitleFontSize);
	doc.textAlign(
		`TOTAL AMOUNT PAYABLE { ${document.getElementById("currency").value} } `,
		{ align: "right" },
		rightcol1,
		(startY += lineSpacing.NormalSpacing + 10)
	);

	doc.textAlign(
		`${thFormat(gross_amount)}`,
		{ align: "left" },
		rightcol3,
		startY
	);

	if (val18 !== 0) {
		doc.textAlign(
			`TOTAL AMOUNT PAYABLE { INR }`,
			{ align: "right" },
			rightcol1,
			(startY += lineSpacing.NormalSpacing + 10)
		);
		doc.textAlign(
			`${thFormat(gross_amount_inr)}`,
			{ align: "left" },
			rightcol3,
			startY
		);
	}

	doc.setFontSize(fontSizes.SmallFontSize);
	doc.textAlign(
		"Terms and conditions apply *",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 60)
	);

	var para =
		"Payment in Indian Rupees at the prevalent rate of exchange via Cheque/Demand Draft/RTGS, should be payable to Carrot Cruises Shipping Pvt Ltd.";

	var ParaWidth = width * 0.9;

	var lines = doc.splitTextToSize(para, ParaWidth);
	doc.text(lines, 20, (startY += lineSpacing.NormalSpacing + 11));
	doc.setFontSize(fontSizes.NormalFontSize);
	doc.textAlign(
		"BANK DEATILS FOR PAYMENT",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 12)
	);
	doc.textAlign(
		"HDFC BANK (Carrot Cruise Shipping Pvt. Ltd )  A/C No - 50200024394736   IFSC/RTGS/NEFT Code : HDFC0001441",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 12)
	);
	doc.textAlign(
		"YES BANK (Carrot Cruise Shipping Pvt. Ltd)      A/C No. 059861900002113   IFSC Code : YESB0000598",
		{ align: "left" },
		20,
		(startY += lineSpacing.NormalSpacing + 12)
	);
	doc.setFontSize(fontSizes.SmallFontSize);
	doc.textAlign(
		"*This is computer generated copy, hence does not require any signature.",
		{ align: "left" },
		200,
		(startY += lineSpacing.NormalSpacing + 12)
	);

	doc.save(`${InvoiceNumber}.pdf`);
}
