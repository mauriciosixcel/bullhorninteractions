// SWE-75: Populate Job Owner from Account Owner at Company
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On change

const clientID = API.form.controls.clientCorporation.value.id
const getCompany = `/entity/ClientCorporation/${clientID}?fields=id,customText10`
const userTypeName = API._globals.user.userTypeName
console.log('userTypeName ', userTypeName);
if ((userTypeName === 'Belflex Staffing Network BH1 Standard User')) {
    API.setReadOnly('owner', true)
}
return API.appBridge.httpGET(getCompany)
    .then(resp => {
        if (resp.data.data.customText10 !== '') {
            API.setValue('owner', {id: resp.data.data.id, label: resp.data.data.customText10})
        }
    })
    .catch(err => console.log(err))