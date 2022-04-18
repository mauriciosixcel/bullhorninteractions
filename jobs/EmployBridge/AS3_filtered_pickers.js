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
                        elem.controlType = "select";
                        let filteredcontacts_1 = []
                        object.data.data.forEach(element => {
                            filteredcontacts_1.push({ label: element.name, value: element.name });
                        });
                        elem.options = filteredcontacts_1;
                        ;
                    }
                })
                .catch(err => console.log('Error while retrieving getclientCorporationtrackTitle ', err))
        }
    })
    .catch(err => console.log('Error while retrieving CorporateUser ', err))