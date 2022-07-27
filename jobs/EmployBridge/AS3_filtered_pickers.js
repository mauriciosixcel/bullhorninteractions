const userId = API._globals.user.userId
const getUserCustomText1 = `/entity/CorporateUser/${userId}?fields=id,customText1`
let customText1 = null
return API.appBridge.httpGET(getUserCustomText1)
    .then(obj => {
        console.log('pass user');
        if (obj.data.data.id > 0) {
            customText1 = obj.data.data.customText1
            const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='Accounts' AND customText20='${customText1}'&count=500`
            return API.appBridge.httpGET(getclientCorporationtrackTitle)
                .then(object => {
                    console.log('passCompanies');
                    if (object.data.count > 0) {
                        console.log('filteredCompanies ', API);
                        let elem = API.form.controls["clientCorporationWhiteList"];
                        let elem2 = API.form.controls["clientCorporationBlackList"];
                        elem.controlType = "select";
                        elem2.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.name });
                        });
                        elem.options = filteredcontacts_1;
                        elem2.options = filteredcontacts_1;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 1', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ', err))


//CustomText31 on Init
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Brand'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["customText31"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 2 ', err))

//CustomText9 on Init
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Branch'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["customText9"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 3', err))

// ClientCorporation on Candidate Reference
const userId = API._globals.user.userId
const getUserCustomText1 = `/entity/CorporateUser/${userId}?fields=id,customText1`
let customText1 = null
return API.appBridge.httpGET(getUserCustomText1)
    .then(obj => {
        console.log('pass user');
        if (obj.data.data.id > 0) {
            customText1 = obj.data.data.customText1
            const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='Accounts' AND customText20='${customText1}'&count=500`
            return API.appBridge.httpGET(getclientCorporationtrackTitle)
                .then(object => {
                    console.log('passCompanies');
                    if (object.data.count > 0) {
                        console.log('filteredCompanies ', API);
                        let elem = API.form.controls["clientCorporation"];
                        elem.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.name });
                        });
                        elem.options = filteredcontacts_1;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle ClientCorporation on Candidate Reference', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ClientCorporation on Candidate Reference', err))


// ClientCorporation on parentClientCorporation Track 2
const userId = API._globals.user.userId
const getUserCustomText1 = `/entity/CorporateUser/${userId}?fields=id,customText1`
let customText1 = null
return API.appBridge.httpGET(getUserCustomText1)
    .then(obj => {
        console.log('pass user');
        if (obj.data.data.id > 0) {
            customText1 = obj.data.data.customText1
            const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='Accounts' AND customText20='${customText1}'&count=500`
            return API.appBridge.httpGET(getclientCorporationtrackTitle)
                .then(object => {
                    console.log('passCompanies');
                    if (object.data.count > 0) {
                        console.log('filteredCompanies ', API);
                        let elem = API.form.controls["parentClientCorporation"];
                        elem.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.name });
                        });
                        elem.options = filteredcontacts_1;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle ClientCorporation on parentClientCorporation', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ClientCorporation on parentClientCorporation', err))

// ClientCorporation on parentClientCorporation Track 3


const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Brand'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        console.log('passCompanies');
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["parentClientCorporation"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle ClientCorporation on parentClientCorporation', err))


//CustomText20 on Init on clientCorporation (all tracks)
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Branch'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["customText20"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving CustomText20 on Init on clientCorporation', err))


//CustomText5 on Init on clientCorporation (all tracks)
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Brand'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["customText5"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving CustomText5 on Init on clientCorporation ', err))


//reportToUserID Client Contact (all tracks)
const clientCorporation = API.form.controls.clientCorporation.value.id ?? 0
const getclientCorporationtrackTitle = `/query/ClientContact?fields=id,trackTitle,customText20,clientCorporation,name&where=trackTitle='Account Contact' AND clientCorporation.id=${clientCorporation}&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        console.log('passContacts');
        if (object.data.count > 0) {
            console.log('filteredContacts ', API);
            let elem = API.form.controls["reportToPerson"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientContactstrackTitle 1', err))


//clientCorporationID Client Contact (all tracks)
const userId = API._globals.user.userId
const getUserCustomText1 = `/entity/CorporateUser/${userId}?fields=id,customText1`
let customText1 = null
return API.appBridge.httpGET(getUserCustomText1)
    .then(obj => {
        console.log('pass user');
        if (obj.data.data.id > 0) {
            customText1 = obj.data.data.customText1
            const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name,id&where=trackTitle='Accounts' AND customText20='${customText1}'&count=500`
            return API.appBridge.httpGET(getclientCorporationtrackTitle)
                .then(object => {
                    console.log('passCompanies');
                    if (object.data.count > 0) {
                        console.log('filteredCompanies ', API);
                        let elem = API.form.controls["clientCorporation"];
                        elem.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.id });
                        });
                        elem.options = filteredcontacts_1;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 1', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ', err))

//clientUserID Job (all tracks)
const clientCorporation = API.form.controls.clientCorporation.value.id ?? 0
const getclientCorporationtrackTitle = `/query/ClientContact?fields=id,name&where=trackTitle='EB Contact'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        console.log('passContacts');
        if (object.data.count > 0) {
            console.log('filteredContacts ', API);
            let elem = API.form.controls["clientContact"];
            //elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.id });
            });
            const validation = object.data.data.filter(el => el.name !== `${API.form.controls['clientContact'].value.firstName} ${API.form.controls['clientContact'].value.lastName}`)

            if (validation.length > 0) {
                API.setValue('clientContact', '')
            }
            //elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientContactstrackTitle 1', err))

//reportToUserID Job (all tracks)
console.log('API ', API);
const clientCorporation = API.form.controls.clientCorporation.value.id ?? 0
console.log('clientCorporation ', clientCorporation);
const getclientCorporationtrackTitle = `/query/ClientContact?fields=id,trackTitle,customText20,clientCorporation,name&where=trackTitle='Account Contact' AND clientCorporation.id=${clientCorporation}&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        console.log('passContacts');
        if (object.data.count > 0) {
            console.log('filteredContacts ', API);
            let elem = API.form.controls["reportToClientContact"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientContactstrackTitle 1', err))

//clientCorporationID Job (all tracks)
const userId = API._globals.user.userId
const getUserCustomText1 = `/entity/CorporateUser/${userId}?fields=id,customText1`
let customText1 = null
return API.appBridge.httpGET(getUserCustomText1)
    .then(obj => {
        console.log('pass user');
        if (obj.data.data.id > 0) {
            customText1 = obj.data.data.customText1
            const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name,id&where=trackTitle='Accounts' AND customText20='${customText1}'&count=500`
            return API.appBridge.httpGET(getclientCorporationtrackTitle)
                .then(object => {
                    console.log('passCompanies');
                    if (object.data.count > 0) {
                        console.log('filteredCompanies ', API);
                        let elem = API.form.controls["clientCorporation"];
                        elem.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.id });
                        });
                        elem.options = filteredcontacts_1;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 1', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ', err))


//CustomText13 on Init
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Brand'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["customText13"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 2 ', err))

//correlatedCustomText10 on Init
const getclientCorporationtrackTitle = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Branch'&count=500`
return API.appBridge.httpGET(getclientCorporationtrackTitle)
    .then(object => {
        if (object.data.count > 0) {
            console.log('filteredCompanies ', API);
            let elem = API.form.controls["correlatedCustomText10"];
            elem.controlType = "select";
            let filteredcontacts_1 = []
            object.data.data.forEach(element => {
                filteredcontacts_1.push({ label: element.name, value: element.name });
            });
            elem.options = filteredcontacts_1;
        }
    })
    .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle 2 ', err))

//------------------------------------------------------------------------------------------------------------------------------------

const abr = {
    customerRequiredFields: 'correlatedCustomText10',
    customerRequiredFieldsFake: 'CorrelatedCustomText10Fake',
    init: function () {
        console.log("Mauricio - Placement - correlatedCustomText10");
        abr.getCustomerRequiredFields()
            .then(data => {
                let options = [];
                let count = data.count;
                if (count > 0) {
                    data.data.forEach(element => {
                        options.push({ label: element.name, value: element.name });
                    });
                }
                abr.addCustomControl(options);
            });
    },

    getCustomerRequiredFields: () => {
        let placUrl = `/query/ClientCorporation?fields=customText20,name&where=trackTitle='EB Branch'&count=500`;
        return API.appBridge.httpGET(placUrl)
            .then(result => result.data);
    },

    addCustomControl: (pickerOptions) => {
        API.addControl(
            abr.customerRequiredFields, {
            key: abr.customerRequiredFieldsFake,
            name: abr.customerRequiredFieldsFake,
            type: 'chips',
            label: API.getControl(abr.customerRequiredFields).label,
            config: {
                options: pickerOptions
            },
            interactions: [
                {
                    event: 'init',
                    invokeOnInit: true,
                    script: function (API) {
                        abr.setCustomFieldInitialValue();
                        API.hide(abr.customerRequiredFields, false);
                    }
                }
            ]
        },
            'ABOVE_FIELD', API.getValue(abr.customerRequiredFields));
    },

    setCustomFieldInitialValue: () => {
        API.setValue(abr.customerRequiredFieldsFake, abr.customerRequiredFields);
    },
};

abr.init()


//billingUserID, approvingUserID, backupApprovingUserID Placement (all tracks)
console.log("billingUserIDss, approvingUserID, backupApprovingUserID Placement (all tracks) API  ", API);
const placement = `/entity/Placement/${API.form.currentEntityId}?fields=id,clientCorporation`;
return API.appBridge
    .httpGET(placement)
    .then((placementObj) => {
        if (placementObj.data.data.id > 0) {
            const clientCorporation = placementObj.data.data.clientCorporation.id;
            const getclientCorporationContacts = `/query/ClientContact?fields=id,name,status&where=clientCorporation.id=${clientCorporation}&count=500`;
            return API.appBridge
                .httpGET(getclientCorporationContacts)
                .then((object) => {
                    console.log("passContacts cvv", object);
                    if (object.data.count > 0) {
                        console.log("filteredContacts ", API);
                        let elem = API.form.controls["billingClientContact"];
                        let elem2 = API.form.controls["approvingClientContact"];
                        let elem3 = API.form.controls["backupApprovingClientContact"];
                        elem.controlType = "select";
                        elem2.controlType = "select";
                        elem3.controlType = "select";
                        let filteredcontacts_1 = [];
                        object.data.data.forEach((element) => {
                            filteredcontacts_1.push({
                                label: element.name,
                                value: element.name,
                                name: element.name,
                            });
                        });
                        elem.options = filteredcontacts_1;
                        elem2.options = filteredcontacts_1
                        elem3.options = filteredcontacts_1
                        const validation = object.data.data.filter(el => el.name !== `${API.form.controls['billingClientContact'].value.firstName} ${API.form.controls['billingClientContact'].value.lastName}`)

                        if (validation.length > 0) {
                            API.setValue('billingClientContact', '')
                        }

                    }
                })
                .catch((err) =>
                    console.log(
                        "Error while retrieving getclientContactstrackTitle 1",
                        err
                    )
                );
        }
    })
    .catch((err) => console.log("Error ", err));

//correlatedCustomText10 Placement (all tracks)
console.log("API ", API);
const placement = `/entity/Placement/${API.form.currentEntityId}?fields=id,clientCorporation`;
return API.appBridge
    .httpGET(placement)
    .then((placementObj) => {
        if (placementObj.data.data.id > 0) {
            const clientCorporation = placementObj.data.data.clientCorporation.id;
            const getclientCorporationtrackTitle = `/query/ClientContact?fields=id,trackTitle,customText20,clientCorporation,name&where=trackTitle='Account Contact' AND clientCorporation.id=${clientCorporation}&count=500`;
            return API.appBridge
                .httpGET(getclientCorporationtrackTitle)
                .then((object) => {
                    console.log("passContacts");
                    if (object.data.count > 0) {
                        console.log("filteredContacts ", API);
                        let elem = API.form.controls["correlatedCustomText10"];
                        elem.controlType = "select";
                        let filteredcontacts_1 = [];
                        object.data.data.forEach((element) => {
                            filteredcontacts_1.push({
                                label: element.name,
                                value: element.name,
                            });
                        });
                        elem.options = filteredcontacts_1;
                    }
                })
                .catch((err) =>
                    console.log(
                        "Error while retrieving getclientContactstrackTitle 1",
                        err
                    )
                );
        }
    })
    .catch((err) => console.log("Error ", err));


console.log('EB Branch', API.form.controls['correlatedCustomText10'].value, API);
console.log('USER TYPE', userTypeName);
const userTypeName = API._globals.user.userTypeName
if (userTypeName.includes('Employbridge SOW2 QA Enterprise Standard User') ||
    userTypeName.includes('Employbridge SOW2 QA Enterprise HR/Risk/Legal') ||
    userTypeName.includes('Employbridge SOW2 QA Recruiter Trainee') ||
    userTypeName.includes('Employbridge SOW2 QA Email Only')) {
    console.log('sup');
    API.setReadOnly('correlatedCustomText10 ', true)
}