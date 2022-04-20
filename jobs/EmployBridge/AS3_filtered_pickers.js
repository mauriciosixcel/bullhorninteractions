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
            elem2.options = filteredcontacts_1;
            elem3.options = filteredcontacts_1;
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