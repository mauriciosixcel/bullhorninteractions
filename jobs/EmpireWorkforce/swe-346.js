// SWE-346: Update payrollSyncStatusLookupID field
// Name: Placement - Payroll Status Sync
// Type: Page Interaction
// Entity/Tracks: Placement
// Action: Add Edit Postsave

if (API.currentEntity === "Placement" && API.pageContext === "Record") {
  console.log("Running Placement-PayrollSync Checks");
  var PlacementURL =
    "/query/Placement?fields=id,payrollSyncStatus,employmentType,jobOrder&where=id=" +
    API.currentEntityId;

  API.appBridge.httpGET(PlacementURL).then(function (PlacementObj) {
    let statusConst = ["approved"];
    let employmentTypeConst = ["contract", "contract to hire"];
    let employeeTypeConst = ["w2"];
    let syncStatusConst = [1, "1", null, undefined, ""]; // 1 = not ready to sync or blank
    let syncStatus = PlacementObj.data.data[0].payrollSyncStatus
      ? PlacementObj.data.data[0].payrollSyncStatus.id
      : null;

    if (
      statusConst.includes(form.controls.status.value.toLowerCase()) &&
      employmentTypeConst.includes(
        PlacementObj.data.data[0].employmentType.toLowerCase()
      ) &&
      (syncStatus === null || syncStatusConst.includes(syncStatus)) &&
      employeeTypeConst.includes(
        form.controls.payrollEmployeeType.value.label.toLowerCase()
      )
    ) {
      console.log(
        "SWE-369: Update payrollSyncStatusLookupID field to Ready to Sync"
      );
      let body = { payrollSyncStatus: { id: 2, label: "Ready to Sync" } };
      var pURL = "entity/Placement/" + API.currentEntityId;

      API.appBridge.httpPOST(pURL, body);
      console.log("SWE-369: Placement-PayrollSync Complete", body);
    }
  });
}
