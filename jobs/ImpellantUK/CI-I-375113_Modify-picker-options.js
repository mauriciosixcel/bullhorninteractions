function getWCCList(array) {
    var result = "";
    let grouped = array.reduce((result, current) => {
        result[current.text1] = result[current.text1] || [];
        result[current.text1].push(current);
        return result;
    }, {});
    for (const [key, value] of Object.entries(grouped)) {
        result = result + "," + `'${key}'`;
    }
    return result.substring(1, result.length);
}
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

function getWCCList(array) {
    var result = "";
    let grouped = array.reduce((result, current) => {
        result[current.text1] = result[current.text1] || [];
        result[current.text1].push(current);
        return result;
    }, {});
    for (const [key, value] of Object.entries(grouped)) {
        result = result + "," + `'${key}'`;
    }
    return result.substring(1, result.length);
}



API.modifyPickerConfig(API.getActiveKey(), {
    optionsPromise: function (query) {
        return new Promise(function (resolve) {
            if (query && query.length) {
                var clientCorporationID = API.form.controls.clientCorporation.value.id;
                var CustomUrl = "/query/ClientCorporationCustomObjectInstance1?fields=id,text1&where=clientCorporation.id=" + clientCorporationID;

                return API.appBridge.httpGET(CustomUrl).then(function (CustomObj) {



                    var url = "/query/WorkersCompensationRate?fields=id,compensation&where=compensation.name IN (" + getWCCList(CustomObj.data.data) + ") AND compensation.name LIKE " + encodeURIComponent("'%" + query + "%'");
                    url += '&fields=id,rate,compensation,name,code&count=500';
                    return API.appBridge.httpGET(url).then(function (response) {




                        var filteredWorkers = [];
                        for (var i = 0; i < response.data.data.length; i++) {



                            console.log(response.data.data[i]);
                            //if (response.data.data[i].compensation.code == "8810") {
                            var worker = response.data.data[i];
                            worker.label = response.data.data[i].compensation.name;
                            filteredWorkers.push(worker);
                            //}
                        }
                        resolve(filteredWorkers);




                    });



                });



            } else {
                resolve([]);
            }
        });
    }
});