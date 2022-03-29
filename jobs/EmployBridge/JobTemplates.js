
console.log('Job Templates : mauricio ', API);

//3.1.3.8 Create a Field Interaction On Change (and On Init) on clientCorporationID (Job II & III) to modify the control and populate drop-down values on customText25.
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text1&where=clientCorporation=${API.form.controls.clientCorporation.value.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push(element.text1);
            });
            let elem = API.form.controls['customText25'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });
// 3.1.3.2 PRevent duplicate names when create Job codes ClientCorporationCustomObjectInstance7
if (API.currentEntity === "ClientCorporationCustomObjectInstance7") {
    return new Promise((resolve) => {
        const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text1&where=clientCorporation=${form.data.clientCorporation.id}`
        return API.appBridge.httpGET(searchJobTemplates)
            .then(resp => {
                if (resp.data.count > 0) {
                    var contacts = resp.data.data;
                    contacts.forEach(element => {
                        if (element.text1 === form.controls.text1.value) {
                            form.errorMessage = `A record already exists for this Job Code on this Account `,
                                form.isFormValid = false
                            resolve(form)
                        }
                    });
                    resolve([])
                }
                resolve([])
            });
    })
}

//3.1.3.3 Create a Field Interaction On Init on Text8 to modify the control and populate drop-down values on Text8.
console.log('custom interaction text8 ',API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance4?fields=id,text1&where=clientCorporation=${API.form.associations.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push(element.text1);
            });
            let elem = API.form.controls['text8'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });

//3.1.3.4 Create a Field Interaction On Init on Text12 (ClientCorporationCustomObjectInstance7) to modify the control and populate drop-down values on Text12.
console.log('custom interaction text12 ',API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance3?fields=id,text4&where=clientCorporation=${API.form.associations.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push(element.text1);
            });
            let elem = API.form.controls['text12'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });

//Create a Field Interaction On Init on Text9 (ClientCorporationCustomObjectInstance7) to default the drop-down value of Text9 to clientCorporationID.customText6.
console.log('custom interaction text6 ',API)
const searchJobTemplates = `/entity/ClientCorporation/${API.form.associations.clientCorporation.id}?fields=customText6`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.data.customText6) {
            let elem = API.form.controls['text6'];
            elem.controlType = "select";
            elem.options = resp.data.data.customText6;
        }
    });