
API.modifyPickerConfig(API.getActiveKey(), {
    format: '$value',
    optionsPromise: () => {
        return new Promise((resolve) => {
            const placement = `/entity/Placement/${API.currentEntityId}?fields=clientCorporation,employmentType`
            API.appBridge.httpGET(placement)
                .then((wcObj) => {
                    if (wcObj.data.data.clientCorporation.id > 0 &&
                        (wcObj.data.data.employmentType === 'Temp/Contract to Perm' ||
                            wcObj.data.data.employmentType === 'Temp/Contract' ||
                            wcObj.data.data.employmentType === 'Fixed Term Contract'
                        )
                    ) {
                        const searchContacts = `/query/ClientContact?fields=id,firstName,lastName,status,isDeleted&where=clientCorporation=${wcObj.data.data.clientCorporation.id} and isDeleted=false and (status <> 'Archive'  or status = 'New Lead' or status = 'Passive')`
                        API.appBridge.httpGET(searchContacts)
                            .then(resp => {
                                if (resp.data.count > 0) {
                                    const contacts = resp.data.data
                                    let filteredcontacts = [];
                                    contacts.forEach((element, index) => {
                                        filteredcontacts.push({ value: `${element.firstName} ${element.lastName}`, name: `${element.firstName} ${element.lastName}` })
                                    });
                                    resolve(filteredcontacts)
                                    return
                                }
                                resolve([]);
                            })
                    } else {
                        resolve([]);
                    }
                });
        })
    }
})