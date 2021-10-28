console.log('ApI ', API)
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
                        const searchSupplier = `/search/ClientCorporation?fields=name&query=(customText12:"international" OR customText12:"LTD") OR ( (customText12:"Umbrella" OR customText12:"CIS Umbrella" OR customText12:"2nd Tier" OR customText12:"Consultancy") AND status:Authorized*)&count=500&start=0`
                        API.appBridge.httpGET(searchSupplier)
                            .then(resp => {
                                if (resp.data.count > 0) {
                                    const Supplier = resp.data.data
                                    let filteredSupplier = [];
                                    Supplier.forEach((element, index) => {
                                        filteredSupplier.push({ value: `${element.name}`, name: `${element.name} ` })
                                    });
                                    resolve(filteredSupplier)
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