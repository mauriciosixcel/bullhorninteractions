//Client Compliance - Impellam UK I-375113 part 2

const clientCorporation = API.form.controls['clientCorporation'].value.id
const getCompanyCustomText3 = `/entity/ClientCorporation/${clientCorporation}?fields=customText3`
API.appBridge.httpGET(getCompanyCustomText3)
    .then(resp => {
        console.log('resp ', resp.data.data)
        if (resp.data.data.customText3 !== '') {
            API.setValue('correlatedCustomText6', resp.data.data.customText3)
        }
    })
    .catch(err => {
        console.log('Error retrieving the customText3 from Company ', err)
    })