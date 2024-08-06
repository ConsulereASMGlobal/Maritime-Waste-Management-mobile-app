import { Alert, Platform } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { epochToHumanReadable } from "../../../utils/dateUtils";
import { truncateToTwoDecimalPlaces } from "../../../utils/getSum";
import Share from "react-native-share";

export const pdfGenerator = async (
  navigation: any,
  dQr: any,
  recieptData: any,
  customerName: any,
  customerMobile: any,
  signUrl: any
) => {
  try {
    // const html = `
    //     <html>
    //         <head>
    //         <style>
    //             body {
    //             font-family: "NunitoSans-Regular";
    //             font-size: 12px;
    //             }
    //             header,
    //             footer {
    //             height: 50px;
    //             background-color: #fff;
    //             color: #000;
    //             display: flex;
    //             justify-content: center;
    //             padding: 0 20px;
    //             }
    //             table {
    //             width: 90%;
    //             border-collapse: collapse;
    //             /* margin: 30px; */
    //             margin: 0px 10px 0px 10px;
    //             }
    //             th {
    //             padding: 5px;
    //             text-align: center;
    //             font-weight: normal;
    //             font-size: 18px;
    //             color: #000;
    //             }

    //             td {
    //             padding: 5px;
    //             text-align: center;
    //             font-weight: normal;
    //             font-size: 18px;
    //             color: #777777;
    //             }

    //             h1 {
    //             font-weight: bold;
    //             font-size: 26px;
    //             text-decoration: underline;
    //             }
    //             h2 {
    //             font-weight: normal;
    //             margin: 20px 0px 20px 0px;
    //             font-size: 22px;
    //             }
    //             h3 {
    //             font-weight: bold;
    //             margin: 20px 0px 20px 0px;
    //             font-size: 20px;
    //             }
    //             p {
    //             color: #777777;
    //             line-height: 0.5;
    //             font-size: 18px;
    //             }
    //         </style>
    //         </head>
    //         <body>
    //         <header>
    //             <h1>Collection Receipt</h1>
    //         </header>
    //         <h2>Depositor Information</h2>
    //         <p>Collection Date : ${
    //           epochToHumanReadable(recieptData?.createdAt) ?? 'n/a'
    //         }</p>
    //         <p>Collection No. : ${recieptData?.id ?? 'n/a'}</p>
    //         <p>Name : ${customerName ?? 'n/a'}</p>
    //         <p>Mobile : ${customerMobile ?? 'n/a'}</p>
    //         <p>Source : ${recieptData?.source ?? 'n/a'}</p>

    //         <table>
    //         <tr style="border-bottom: 1px solid #929292">
    //             <th>Category</th>
    //             <th>Type</th>
    //             <th>Quantity</th>
    //             <th>Unit Price</th>
    //             </tr>
    //           ${recieptData?.orderDetails?.map(item =>
    //             item?.items?.map(
    //               ite =>
    //                 ` <tr>
    //               <td>${item?.categoryName ?? 'n/a'}</td>
    //               <td>${ite?.itemName ?? 'n/a'}</td>
    //               <td>${
    //                 ite?.quantity
    //                   ? truncateToTwoDecimalPlaces(ite?.quantity)
    //                   : 'n/a'
    //               }</td>
    //               <td>${
    //                 ite?.price ? truncateToTwoDecimalPlaces(ite?.price) : 'n/a'
    //               }</td>
    //               </tr>`
    //             )
    //           )}

    //         </table>
    //         <div style="margin: 20px 0px 20px 0px">
    //             <h3>Total Order Value: ${truncateToTwoDecimalPlaces(
    //               recieptData?.totalAmount
    //             )}</h3>
    //         </div>
    //         <div style="margin: 20px 0px 20px 0px">
    //           <strong style="font-size: 12px"><i>Note : Quantity in Kgs</i></strong>
    //         </div>

    //         <div>
    //             <h2>Collector Information</h2>
    //             <p>Name : ${recieptData?.centerName}</p>
    //             <p>Address : ${
    //               recieptData?.centreInfo?.address?.street +
    //               ',  ' +
    //               recieptData?.centreInfo?.address?.city +
    //               ', ' +
    //               recieptData?.centreInfo?.address?.state
    //             }</p>
    //             <p>Payment Mode : ${recieptData?.paymentMode ?? 'n/a'}</p>
    //         </div>
    //         <h2>Receiver Signature</h2>
    //         <div
    //             style="
    //             align-items: center;
    //             margin: 30px 0px 50px 0px;
    //             flex: 1;
    //         display: flex; justify-content: center;
    //         border-style:dashed;
    //             "
    //         >
    //             <img
    //             src="${signUrl?.uri}"
    //             alt="sign"
    //             style="height: 50px; width: 150px"
    //             />

    //         </div>
    //         <div style="align-items: center;
    //         margin: 30px 0px 50px 0px;
    //         flex: 1;
    //     display: flex; justify-content: center;">

    //         <img
    //             src="${dQr}"
    //             alt="QR"
    //             style="height: 150px; width: 150px"
    //             />
    //             </div>
    //         <footer>
    //             <p>Thank you !!!</p>
    //         </footer>
    //         </body>
    //     </html>
    //   `;

    const html = `
    <html lang="en" data-bs-theme="light">
    <head style="box-sizing: border-box">
      <!-- <meta charset="utf-8" style="box-sizing: border-box" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        style="box-sizing: border-box" /> -->
      <!-- <meta name="theme-color" content="#000000" style="box-sizing: border-box" /> -->
      <!-- <meta
        name="description"
        content="Maritime"
        style="box-sizing: border-box" /> -->
  
      <style>
        body {
          margin: 0 auto !important;
          max-width: 640px;
        }
      </style>
  
      <script src="/static/js/bundle.js" style="box-sizing: border-box"></script>
    </head>
  
    <body>
      <div class="modal-content" style="box-sizing: border-box">
        <div
          style="
            padding: 20px;
            width: 100%;
            border: 2px solid black;
            background-repeat: no-repeat;
            // background-image: '';
            background-position: left top, right bottom;
            background-size: auto, auto;
            box-sizing: border-box;
          ">
          <div
            id="pdf-content"
            class="container"
            style="
              position: relative;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 20%;
              box-sizing: border-box;
              --bs-gutter-x: 1.5rem;
              --bs-gutter-y: 0;
              width: 100%;
              padding-right: calc(var(--bs-gutter-x) * 0.5);
              padding-left: calc(var(--bs-gutter-x) * 0.5);
              margin-right: auto;
              margin-left: auto;
            ">
            <!-- This is for header -->
            <div
              class="row"
              style="
                box-sizing: border-box;
                --bs-gutter-x: 1.5rem;
                --bs-gutter-y: 0;
                display: flex;
                flex-wrap: wrap;
                margin-top: calc(-1 * var(--bs-gutter-y));
                margin-right: calc(-0.5 * var(--bs-gutter-x));
                margin-left: calc(-0.5 * var(--bs-gutter-x));
              ">
              <div
                class="col-9"
                style="
                  padding: 2rem 3.25rem;
                  font-family: 'GT Walsheim Pro';
                  box-sizing: border-box;
                  flex-shrink: 0;
                  width: 75%;
                  max-width: 100%;
                  padding-right: calc(var(--bs-gutter-x) * 0.5);
                  padding-left: calc(var(--bs-gutter-x) * 0.5);
                  margin-top: var(--bs-gutter-y);
                  flex: 0 0 auto;
                ">
                <div style="box-sizing: border-box">
                  Certificate Number :
                  <span class="fw-bolder text-dark" style="box-sizing: border-box"
                    >${recieptData?.id ?? "n/a"}</span
                  >
                </div>
              </div>
              <div
                class="col-3"
                style="
                  margin-top: -20px;
                  box-sizing: border-box;
                  flex-shrink: 0;
                  width: 25%;
                  max-width: 100%;
                  padding-right: calc(var(--bs-gutter-x) * 0.5);
                  padding-left: calc(var(--bs-gutter-x) * 0.5);
                  flex: 0 0 auto;
                  position: absolute;
                  right: 30px;
                ">
                <!-- <img
                  width="180"
                  height="100"
                  src=""
                  alt="main-logo"
                  style="
                    background-color: rgb(255, 255, 255);
                    box-sizing: border-box;
                    vertical-align: middle;
                  " /> -->
              </div>
            </div>
            <!-- Cursive logo -->
            <div
              class="text-center"
              style="
                color: rgb(28, 67, 121);
                font-size: 45px;
                font-style: italic;
                font-weight: bold;
                font-family: 'Monotype Corsiva', cursive;
                line-height: 54px;
                box-sizing: border-box;
              ">
              Plastic Deposit Certificate
            </div>
  
            <br style="box-sizing: border-box" />
            <!-- Depositor Details -->
            <table width="100%">
              <tr>
                <td
                  colspan="4"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 10px;
                  ">
                  Depositor Details
                </td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Depositor Name
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">${customerName ?? "n/a"}</td>
                    </tr>
  
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Mobile Number
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">${
                        customerMobile ?? "n/a"
                      }</td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Source
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">
                        ${recieptData?.source ?? "n/a"}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Collection Date
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">
                        ${epochToHumanReadable(recieptData?.createdAt) ?? "n/a"}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Status
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">
                        ${recieptData?.status ?? "n/a"}
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Geo-Coordinates
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td colspan="2" style="text-align: left">
                        ${recieptData?.latitude ?? "n/a"},
                        ${recieptData?.longitude ?? "n/a"}
                      </td>
                    </tr>
                  </table>
                </td>
                <td rowspan="5" style="text-align: right">
                  <img
                    src="${dQr}"
                    alt="QR Code"
                    style="width: 100px; height: auto" />
                </td>
              </tr>
            </table>
            <br />
            <!-- Table -->
  
            <table align="center" style="width: 100%; box-sizing: border-box">
              <tr>
                <td
                  colspan="4"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 4px;
                  ">
                  Material Details
                </td>
              </tr>
              <tr>
                <td>
                  <table
                    width="100%"
                    border="1"
                    cellspacing="0"
                    cellpadding="5"
                    style="
                      border-collapse: collapse;
                      width: 100%;
                      max-width: 600px;
                      font-family: Arial, sans-serif;
                      color: #333;
                    ">
                    <tr style="background-color: #003366; color: #ffffff">
                      <th style="text-align: left">Category</th>
                      <th style="text-align: left">Type</th>
                      <th style="text-align: left">Quantity</th>
                      <th style="text-align: left">Unit Rate</th>
                      <th style="text-align: left">Total Value</th>
                    </tr>
                    ${recieptData?.orderDetails?.map((item) =>
                      item?.items?.map(
                        (ite) => `
                    <tr>
                      <td>${item?.categoryName ?? "n/a"}</td>
                      <td>${ite?.itemName ?? "n/a"}</td>
                      <td>
                        ${
                          ite?.quantity
                            ? truncateToTwoDecimalPlaces(ite?.quantity)
                            : "n/a"
                        }
                      </td>
                      <td>
                        ${
                          ite?.price
                            ? truncateToTwoDecimalPlaces(ite?.price)
                            : "n/a"
                        }
                      </td>
                      <td>
                        ${
                          ite?.price
                            ? truncateToTwoDecimalPlaces(
                                ite?.quantity * ite?.price
                              )
                            : "n/a"
                        }
                      </td>
                    </tr>
                    `
                      )
                    )}
                    <!-- <tr>
                      <td>Shredded</td>
                      <td>Flexible (Post Consumer Waste)</td>
                      <td>2620 KG</td>
                      <td>1 POINTS</td>
                    </tr> -->
                    <tr>
                      <td
                        colspan="4"
                        style="text-align: right; font-weight: bold">
                        SubTotal
                      </td>
                      <td>
                        ${truncateToTwoDecimalPlaces(recieptData?.totalAmount)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
  
            <br />
  
            <table width="100%">
              <tr>
                <td
                  colspan="4"
                  style="
                    font-size: 16px;
                    font-weight: bold;
                    padding-bottom: 10px;
                  ">
                  Collector Details
                </td>
              </tr>
              <tr>
                <td>
                  <table>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Collector Point
                      </td>
                      <td style="text-align: left; padding: 0 5px">:</td>
                      <td style="text-align: left">${
                        recieptData?.centerName
                      }</td>
                    </tr>
                    <!-- <tr>
                      <td style="text-align: left; padding-right: 10px">
                        Signature
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          width="60"
                          height="60"
                          alt="images"
                          src="${signUrl?.uri}"
                          style="
                            box-sizing: border-box;
                            vertical-align: middle;
                          " />
                      </td>
                    </tr> -->
                  </table>
                </td>
                <td rowspan="5" style="text-align: right">
                  <img
                    src="${recieptData?.images[0]}"
                    alt="Image"
                    style="width: 100px; height: auto" />
                </td>
              </tr>
            </table>
  
            <br />
  
            <table
            align="center"
            style="
              max-width: 640px;
              width: 100%;
              padding: 20px;
              box-sizing: border-box;
              padding: 12px;
              background-color: #f8f8f4;
            "
          >
            <tr>
              <td>
                <table
                  width="100%"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  style="max-width: 600px; width: 100%"
                >
                  <tr>
                    <td style="padding-bottom: 10px">
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <!-- Each table row contains three cells: Label, Colon, and Details -->
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Company Name
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>Matitime Waste Management</td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Regd Address
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>
                          1.4 1st Floor, Menara Surian, No.1 Jalan PJU 7/3, Mutiara Damansara, 47810 Petaling Jaya, Selangor, Malaysia.
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Email
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>alex@marea.com.my</td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              padding-right: 10px;
                              white-space: nowrap;
                            "
                          >
                            Website
                          </td>
                          <td style="padding-right: 10px">:</td>
                          <td>https://www.marea.com.my/</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-size: 12px;
                        padding-top: 10px;
                        border-top: 1px solid #ccc;
                      "
                    >
                      This is not a tax invoice.<br />
                      This is computer generated document, no signature is
                      required. The material type information is as per RA 11898
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
  
            <table width="100%">
              <tr style="text-align: center">
                <td>
                  <img
                    width="100"
                    height="25"
                    src="http://143.110.188.171:3001/media/svg/dashboard/asm-final-2.png"
                    alt="image"
                    style="box-sizing: border-box; vertical-align: middle" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </body>
  </html>`;

    try {
      const options = {
        html,
        fileName: `Invoice_${recieptData?.id}`,
        directory: "Documents",
        base64: true,
      };

      const pdfFile = await RNHTMLtoPDF.convert(options);
      const shareOptions = {
        url: `${pdfFile.filePath}`,
        type: "application/pdf",
        failOnCancel: false,
      };

      await Share.open(shareOptions);
      console.log("PDF file saved to:", pdfFile.filePath);
    } catch (error) {
      console.error("Error converting HTML to PDF:", error);
    }
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};
