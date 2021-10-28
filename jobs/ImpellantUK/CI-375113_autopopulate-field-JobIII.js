//Time Card Approver - Impellam UK I-375113 part 2

const clientCorporation = API.form.controls['clientCorporation'].value.id
const getCompanyCustomText2 = `/entity/ClientCorporation/${clientCorporation}?fields=customText2`
API.appBridge.httpGET(getCompanyCustomText2)
    .then(resp => {
        console.log('resp ', resp.data.data)
        if (resp.data.data.customText2 !== '') {
            API.setValue('correlatedCustomText6', resp.data.data.customText2)
        }
    })
    .catch(err => {
        console.log('Error retrieving the customText2 from Company ', err)
    })