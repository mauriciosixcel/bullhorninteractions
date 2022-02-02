// I-408404: Customization Interaction: Company Export Status
// Name: Belflex Customization - Company Export Status
// Entity/Tracks: Company
// Fields: customText15
// Event: FI on init

console.log('Mauricio - Company Export Status ', API);
const userTypeName = API._globals.user.userTypeName
if (userTypeName.includes('Pay Bill')) {
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


// I-408404: Customization Interaction: Company Export Status
// Name: Belflex Customization - Company Export Status
// Entity/Tracks: Company
// Fields: customText15
// Event: FI on init
console.log('Mauricio - Company Export Status ', API);
API.getControl('address').valueChanges.subscribe(() => {
    if (API.form.controls['customText15'].value === 'Exported') {
        API.setValue('customText15', "Ready to Export")
    }
});


 