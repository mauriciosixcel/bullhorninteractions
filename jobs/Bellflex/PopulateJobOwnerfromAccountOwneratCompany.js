// SWE-75: Populate Job Owner from Account Owner at Company
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt1, customText4, customInt2, customDate1, customText12
// Event: Fi –On change

const clientID = API.form.controls.clientCorporation.value.id
const getCompany = `/entity/ClientCorporation/${clientID}?fields=id,customText10,owners`
const userTypeName = API._globals.user.userTypeName
console.log('userTypeName ', userTypeName);
if ((userTypeName === 'Belflex Staffing Network BH1 Standard User' || userTypeName === 'Belflex Staffing Network BH1 Standard User')) {
    API.setReadOnly('owner', true)
}
return API.appBridge.httpGET(getCompany)
    .then(resp => {
        console.log('resp.data.data.customText10 ', resp.data.data);
        if (resp.data.data.customText10 !== '') {
            const corporateUser = `/query/CorporateUser?fields=id,firstName,lastName&where=id>0 AND isHidden<>1 AND enabled=true AND firstName='${resp.data.data.customText10.split(" ")[0]}' AND lastName='${resp.data.data.customText10.split(" ")[1]}'&count=500`
            return API.appBridge.httpGET(corporateUser)
                .then(respObj => {
                    console.log('respObj ', respObj);
                    if(API.controls['owner'].value === '') {
                        API.setValue('owner', { id: respObj.data.data[0].id, firstName: respObj.data.data[0].firstName, lastName: respObj.data.data[0].lastName, label: `${respObj.data.data[0].firstName} ${respObj.data.data[0].lastName}` })
                    }
                    
                })

        }
    })
    .catch(err => console.log(err))

