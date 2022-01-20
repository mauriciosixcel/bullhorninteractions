// I-388501: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Name: IMPNA Customization - Validate Location Entity ZIP Code for Prism Integration
// Type: Start/End Date Automation
// Entity/Tracks: Location
// Fields: zip
// Event: Add Edit Presave

console.log('Mauricio - Company Export Status ', API);
const userTypeId = API._globals.user.userTypeId
if (userTypeId !== 115775) {
    API.setReadOnly('customText15', true)
}

if (API.currentEntity === 'Placement') {
    console.log('Mauricio - Company Export Status ', API, form);
    const placementStatus = form.data.data.status || form.controls.status.value
    if (placementStatus === 'Approved') {
        console.log('status approved', )
        const placementId = API.currentEntityId || form.data.changedEntityId
        const clientCorporation = 'clientContact' in form.controls ? form.controls.clientContact.value.clientCorporation.id : form.controls.billingProfile.value.clientCorporation.id
        console.log("placementId ", placementId);
        console.log("clientCorporation ", clientCorporation);
        const getCompanybycustomText15 = `/entity/ClientCorporation/${clientCorporation}?fields=id,customText15`
        return API.appBridge.httpGET(getCompanybycustomText15)
            .then(resp => {
                console.log('hola', resp);
                if (resp.data.data.id > 0 && resp.data.data.customText15 === 'New') {
                    console.log('hola2');
                    const UpdateCompanyData = `/entity/ClientCorporation/${clientCorporation}`;
                    let Obj = {
                        "customText15": "Ready to Export"
                    };
                    API.appBridge.httpPOST(UpdateCompanyData, Obj)
                        .then(resp => {
                            console.log('hola3 ', resp);
                            console.log('it works', resp);
                        })
                        .catch(err => {
                            console.log("error while updating the candidate data", err);
                        });
                } else {
                    console.log('no New status');
                }
            })
            .catch(err => {
                console.log("error while getting client data", err);
            });
    }
}

console.log('Mauricio - Company Export Status ', API);
const customText15 = API.form.controls['customText15'].value
if (customText15 === "Exported") {
    API.setValue('customText15', 'Ready to Export')
}

