// ps integration
var controller = {
  updateExternalId: function (companyId, locationId) {
    return new Promise(function (resolve) {
      console.log("inside updateExternalId fn");
      console.log("companyId: ", companyId);
      console.log("locationId: ", locationId);
      
      if (API.form.controls['customText1'].value === '') {
        let customText1 = `${form.data.data.data.clientCorporation.name.str.substring(0, 2)}${locationId.slice(-4)}`;
        console.log("customText1: ", customText1);
          API.setValue('customText1', customText1)
      }

      if (companyId && locationId) {
        var externalId = companyId + "-" + locationId;
        var locationObj = {
          externalID: externalId,
          versionID: form.data.data.changedVersionId,
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
    form.data.data.changedEntityId
  );
}

