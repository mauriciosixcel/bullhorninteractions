// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Entity/Tracks: Placement / Location
// Fields: customText20
// Event: Add Edit PostSave

if (API.currentEntity === 'Placement') {
    console.log('Mauricio - Location Export Status ', API, form);
    const placementStatus = form.data.data.status || form.controls.status.value
    if (placementStatus === 'Approved') {
        console.log('status approved',)
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

// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Entity/Tracks: Placement / Location
// Fields: customText20
// Event: Add Edit PostSave

if (API.currentEntity === 'Placement') {
    console.log('Mauricio - Location Export Status LOCATION', API, form);
    const placementStatus = form.data.data.status || form.controls.status.value
    if (placementStatus === 'Approved') {
        console.log('status approved',)
        const placementId = API.currentEntityId || form.data.changedEntityId
        console.log("placementId ", placementId);
        const getPlacement = `/entity/Placement/${placementId}?fields=id,location(versionID),billingProfile`
        return API.appBridge.httpGET(getPlacement)
            .then(resp => {
                console.log('Placement Data ', resp);
                if (resp.data.data.id > 0) {
                    console.log('Data ');
                    const getLocationcustomText20 = `/entity/Location/${resp.data.data.location.id}?fields=id,customText20`;
                    return API.appBridge.httpGET(getLocationcustomText20)
                        .then(respLocation => {
                            if (respLocation.data.data.id > 0 && respLocation.data.data.customText20 === 'New') {
                                console.log('customText20 its new! ');
                                const UpdateLocationData = `/entity/Location/${resp.data.data.location.id}`;
                                let Obj = {
                                    "versionID": resp.data.data.location.versionID,
                                    "customText20": "Ready to Export"
                                };
                                API.appBridge.httpPOST(UpdateLocationData, Obj)
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
                            console.log("error while getting Location data", err);
                        });
                }
            })
            .catch(err => {
                console.log("error while getting Placement data", err);
            });
    }
}

// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Entity/Tracks: Placement / Location
// Fields: customText20, Address1, City, State, Zip
// Event: Fi –On Change

API.getControl('address').valueChanges.subscribe(() => {
    if (API.form.controls['customText20'].value === 'Exported') {
        API.setValue('customText20', "Ready to Export")
    }
});


// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Type: Start/End Date Automation
// Entity/Tracks: Placement / Location
// Fields: customText20, Address1, City, State, Zip
// Event: Fi –On Change

if (API.currentEntity === 'Placement') {
    console.log('Mauricio - Location Export Status Placement', API, form);
    const placementStatus = form.data.data.status || form.controls.status.value
    if (placementStatus === 'Approved') {
        console.log('status approved',)
        const placementId = API.currentEntityId || form.data.changedEntityId
        console.log("placementId ", placementId);
        const getPlacement = `/entity/Placement/${placementId}?fields=id,location(versionID),billingProfile`
        return API.appBridge.httpGET(getPlacement)
            .then(resp => {
                console.log('Placement Data ', resp);
                if (resp.data.data.id > 0) {
                    console.log('Data ');
                    const getLocationcustomText20 = `/entity/Location/${resp.data.data.location.id}?fields=id,customText20`;
                    return API.appBridge.httpGET(getLocationcustomText20)
                        .then(respLocation => {
                            if (respLocation.data.data.id > 0 && respLocation.data.data.customText20 === 'New') {
                                console.log('customText20 its new! ');
                                const UpdateLocationData = `/entity/Location/${resp.data.data.location.id}`;
                                let Obj = {
                                    "versionID": resp.data.data.location.versionID,
                                    "customText20": "Ready to Export"
                                };
                                API.appBridge.httpPOST(UpdateLocationData, Obj).then(resp => { })
                                    .catch(err => {
                                        console.log("error while updating the candidate data", err);
                                    });
                            } else {
                                console.log('no New status');
                            }
                        })
                        .catch(err => {
                            console.log("error while getting Location data", err);
                        });
                }
            })
            .catch(err => {
                console.log("error while getting Placement data", err);
            });
    }
}

// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Entity/Tracks: Placement / Location
// Fields: customText20, userTypeName
// Event: Fi –On Change

console.log('Mauricio - Location Export Status ', API);
API.getControl('location').valueChanges.subscribe(() => {
    if (API.currentEntity === 'Placement') {
        console.log('Mauricio - Location Export Status Placement', API);
        const placementStatus = API.form.controls.status.value
        if (placementStatus === 'Approved') {
            console.log('status approved',)
            const placementId = API.form.currentEntityId 
            console.log("placementId ", placementId);
            const getPlacement = `/entity/Placement/${placementId}?fields=id,location(versionID),billingProfile`
            return API.appBridge.httpGET(getPlacement)
                .then(resp => {
                    console.log('Placement Data ', resp);
                    if (resp.data.data.id > 0) {
                        console.log('Data ');
                        const getLocationcustomText20 = `/entity/Location/${resp.data.data.location.id}?fields=id,customText20`;
                        return API.appBridge.httpGET(getLocationcustomText20)
                            .then(respLocation => {
                                if (respLocation.data.data.id > 0 && respLocation.data.data.customText20 === 'New') {
                                    console.log('customText20 its new! ');
                                    const UpdateLocationData = `/entity/Location/${resp.data.data.location.id}`;
                                    let Obj = {
                                        "versionID": resp.data.data.location.versionID,
                                        "customText20": "Ready to Export"
                                    };
                                    API.appBridge.httpPOST(UpdateLocationData, Obj).then(resp => { })
                                        .catch(err => {
                                            console.log("error while updating the candidate data", err);
                                        });
                                } else {
                                    console.log('no New status');
                                }
                            })
                            .catch(err => {
                                console.log("error while getting Location data", err);
                            });
                    }
                })
                .catch(err => {
                    console.log("error while getting Placement data", err);
                });
        }
    }
})



// I-408405: Customization Interaction: Location Export Status
// Name: Belflex Customization - Customization Interaction: Location Export Status
// Entity/Tracks: Placement / Location
// Fields: customText20, userTypeName
// Event: Fi –On Change

console.log('Mauricio - Location Export Status ', API);
const userTypeName = API._globals.user.userTypeName
if (userTypeName.includes('Pay Bill')) {
    API.setReadOnly('customText15', true)
}
