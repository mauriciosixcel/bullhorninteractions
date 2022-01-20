let elem = API.form.controls['reportTo'];
elem.controlType = elem.type = "select";
let reportTo = API.form.controls['reportTo'].value;
const placement = `/entity/Placement/${API.currentEntityId}?fields=clientCorporation,employmentType`
API.appBridge.httpGET(placement)
    .then((wcObj) => {
        if (wcObj.data.data.clientCorporation.id > 0 &&
            (wcObj.data.data.employmentType === 'Temp/Contract to Hire' ||
                wcObj.data.data.employmentType === 'Temp/Contract' ||
                wcObj.data.data.employmentType === 'Fixed Term Contract'
            )
        ) {
            const searchContacts = `/query/ClientContact?fields=id,firstName,lastName,status,isDeleted&where=clientCorporation=${wcObj.data.data.clientCorporation.id} and isDeleted=false and (status <> 'Archive'  or status='Active'  or status = 'New Lead' or status = 'Passive')&orderBy=name&count=500`
            API.appBridge.httpGET(searchContacts)
                .then(resp => {
                    if (resp.data.count > 0) {
                        const contacts = resp.data.data
                        let filteredcontacts = [];
                        contacts.forEach((element, index) => {
                            filteredcontacts.push({ value: element.id, label: `${element.firstName} ${element.lastName}` })
                        });
                        elem.options = filteredcontacts
                        return
                    }

                })
        }
    });