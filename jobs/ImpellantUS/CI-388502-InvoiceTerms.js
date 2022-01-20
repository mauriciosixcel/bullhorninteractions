if (API.currentEntity === "ClientCorporation") {
    let getInvoiceTerms = `${API.http.restURL}/query/InvoiceTerm?fields=id,title,versions&where=clientCorporation=${API.currentEntityId}`
    API.http.get(getInvoiceTerms)
        .subscribe(resp => {
            if (resp.count > 0) {
                const invoiceTerms = resp.data
                invoiceTerms.forEach(element => {
                    element.versions.data.forEach(el => {
                        if (el.effectiveEndDate >= new Date().toISOString().slice(0, 10)) {
                            let updateInvoiceTermsEnd = `${API.http.restURL}/entity/InvoiceTerm/${element.id}`
                            let customText6 = { "versionID": el.id, "customText6": form.controls['customText15'].value }
                            API.http.post(updateInvoiceTermsEnd, customText6).subscribe(respObj => console.log("ok ", respObj))
                        }
                    });
                });
            }
        })
}

//InvoiceTerms - 2) Default PaymentTerms
let getcustomText15 = `${API.http.restURL}/entity/ClientCorporation/${API.form.controls.clientCorporation.value}?fields=id,customText15`
API.http.get(getcustomText15)
    .subscribe(resp => {
        if (resp.data.id > 0) {
            API.setValue('customText6', resp.data.customText15)
        }
    })
//InvoiceTerms - 3) Days to Pay
const PaymentTerms = API.form.controls['customText6'].value
API.setValue('paymentTerms', setPaymentTerms(PaymentTerms))
function setPaymentTerms(params) {
    switch (params) {
        case "Credit Card":
            return 0
        case "Net 5":
            return 5
        case "Net 7":
            return 7
        case "1/7 Net 10":
            return 10
        case "Net 10":
            return 10
        case "Net 15":
            return 15
        case "Net 21":
            return 21
        case "2/10 Net 30":
            return 30
        case "Net 30":
            return 30
        case "Net 45":
            return 45
        case "Net 60":
            return 60
        case "Net 65":
            return 65
        case "Net 75":
            return 75
        case "Net 90":
            return 90
        case "Net 100":
            return 100
        case "Net 120":
            return 120
        default:
            break;
    }
}

