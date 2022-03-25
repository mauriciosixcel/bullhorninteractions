

var searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text1&where=clientCorporation=${API.form.controls.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(function (element, index) {
                filteredcontacts_1.push(element);
            });
            API.form.controls['customText25'].config.options = filteredcontacts_1;
            API.form.controls['customText25'].config.enableInfiniteScroll = false;
        }
    });