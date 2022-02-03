// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On change

const clientID = API.form.controls.clientCorporation.value.id
const getCompany = `/entity/ClientCorporation/${clientID}?fields=id,customText10`
return API.appBridge.httpGET(getCompany)
    .then(resp => {
        if (resp.data.data.customText10 !== '') {
            API.setValue('owner', resp.data.data.customText10)
        }
    })
    .catch(err => console.log(err))