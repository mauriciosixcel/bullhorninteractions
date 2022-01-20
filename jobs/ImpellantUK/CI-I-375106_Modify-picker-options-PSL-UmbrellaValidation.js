console.log('APi ', API)
let elem = API.form.controls['vendorClientCorporation'].value.id;
let elemStatus = API.form.controls['vendorClientCorporation'].value.status;
elem.controlType = elem.type = "dropdown";
API.mutatePickerConfig('vendorClientCorporationID', { where: "(customText12='international' OR customText12 ='LTD')" });

console.log('PLACEMENT3 APIIIIIII ', API)
API.modifyPickerConfig("vendorClientCorporation", {
    optionsPromise: (query) =>
        getUmbrellaCompanies(query)
});

function getUmbrellaCompanies(query) {
    console.log('holaaaaaaaaaaaa 11', query)
    return new Promise((resolve) => {
        if (!query || !query.length) resolve([]);
        const searchSupplier = `/query/ClientCorporation?fields=id,name,status,customText12&where=(customText12='international' OR customText12 ='LTD')  OR customText12 in ('Umbrella', 'CIS Umbrella', '2nd Tier', 'Consultancy') AND status in ('Authorized','Lorien - Authorised','Lorien - Authorised','SRG - Authorised','Carbon60 - Authorised')`
        API.appBridge.httpGET(searchSupplier)
            .then(resp => {
                if (resp.data.count > 0) {
                    console.log('holaaaaaaaaaaaa ', resp)
                    const Supplier = resp.data.data
                    let filteredSupplier = [];
                    Supplier.forEach((element) => {
                        var worker = element;
                        worker.label = element.name;
                        worker.name = element.name
                        console.log('element ', worker)
                        //filteredSupplier.label = element.name
                        filteredSupplier.push(worker)
                        element.searchEntity = "ClientCorporation"
                    });
                    resolve(filteredSupplier)
                }
            })
    });
}

API.modifyPickerConfig(API.getActiveKey(), {
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
                        const searchSupplier = `/query/ClientCorporation?fields=id,name,status,customText12&where=(customText12='international' OR customText12 ='LTD')  OR (customText12='Umbrella' OR customText12 ='CIS Umbrella' OR customText12 ='2nd Tier' OR customText12 ='Consultancy'  AND status ='Authorized*' )`
                        //const searchSupplier = `/search/ClientCorporation?fields=id,name,status,customText12&query=id:589973 AND -status:Pending*`;
                        API.appBridge.httpGET(searchSupplier)
                            .then(resp => {
                                if (resp.data.count > 0) {
                                    const Supplier = resp.data.data
                                    let filteredSupplier = [];
                                    Supplier.forEach((element) => {
                                        var worker = element;
                                        worker.label = element.name;
                                        console.log('element ', worker)

                                        //filteredSupplier.label = element.name
                                        filteredSupplier.push(worker)
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


const placement = `/entity/Placement/${API.currentEntityId}?fields=clientCorporation,employmentType`
API.appBridge.httpGET(placement)
    .then((wcObj) => {
        if (wcObj.data.data.clientCorporation.id > 0 &&
            (wcObj.data.data.employmentType === 'Temp/Contract to Perm' ||
                wcObj.data.data.employmentType === 'Temp/Contract' ||
                wcObj.data.data.employmentType === 'Fixed Term Contract'
            )
        ) {
            const searchSupplier = `/query/ClientCorporation?fields=id,name,status,customText12&where=(customText12='international' OR customText12 ='LTD')  OR (customText12='Umbrella' OR customText12 ='CIS Umbrella' OR customText12 ='2nd Tier' OR customText12 ='Consultancy'  AND status ='Authorized*' )`
            //const searchSupplier = `/search/ClientCorporation?fields=id,name,status,customText12&query=id:589973 AND -status:Pending*`;
            API.appBridge.httpGET(searchSupplier)
                .then(resp => {
                    if (resp.data.count > 0) {
                        const Supplier = resp.data.data
                        let filteredSupplier = [];
                        Supplier.forEach((element) => {
                            var worker = element;
                            worker.label = element.name;
                            console.log('element ', worker)

                            //filteredSupplier.label = element.name
                            filteredSupplier.push(worker)
                        });
                        API.form.controls['vendorClientCorporation'].config.options = filteredSupplier
                        return
                    }
                })
        }
    });