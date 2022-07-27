// ps integration PostSave
var controller = {
    updateExternalId: function (companyId, locationId, clientCorporation) {
        return new Promise(function (resolve) {
            console.log("inside updateExternalId fn");
            console.log("companyId: ", companyId);
            console.log("locationId: ", locationId);
            console.log("clientCorporation: ", clientCorporation);

            if (companyId && locationId) {
                var externalId = companyId + "-" + locationId;
                var customText1 = `${clientCorporation.name.substring(0, 2)}${String(locationId).slice(-4)}`
                var locationObj = {
                    externalID: externalId,
                    versionID: form.data.data.changedVersionId,
                    customText1: customText1
                };
                var url = API.http.restURL + "entity/Location/" + locationId;
                API.http.post(url, locationObj).subscribe(function (res) {
                    console.log("res: ", res);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    },
};
console.log("inside generate location external id PI: ", form);
if (
    form.data.data.changedEntityType === "Location" &&
    form.data.data.data.clientCorporation &&
    form.data.data.data.clientCorporation.id
) {
    return controller.updateExternalId(
        form.data.data.data.clientCorporation.id,
        form.data.data.changedEntityId,
        form.data.data.data.clientCorporation
    );
} else {

    const queryLocation = `entity/Location/${form.data.data.changedEntityId}?fields=id,clientCorporation`

    return API.appBridge.httpGET(queryLocation)
        .then((wcObj) => {
            console.log('wcObj : ', wcObj);
            console.log('clientCorporation : ', wcObj.data.data.clientCorporation);
            return controller.updateExternalId(
                wcObj.data.data.clientCorporation.id,
                form.data.data.changedEntityId,
                wcObj.data.data.clientCorporation
            );
        })

}