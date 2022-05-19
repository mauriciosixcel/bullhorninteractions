// SWE-346: Update payrollSyncStatusLookupID field
// Name: Placement - Payroll Status Sync
// Type: Page Interaction
// Entity/Tracks: Placement
// Action: Add Edit Postsave

if (API.currentEntity === "Placement" && API.pageContext === "Record") {
  console.log(
    "Running Placement-PayrollSync Checks",
    form.controls.payrollEmployeeType
  );
  var PlacementURL =
    "/query/Placement?fields=id,payrollSyncStatus,employmentType,jobOrder&where=id=" +
    API.currentEntityId;

  return API.appBridge.httpGET(PlacementURL).then(function (PlacementObj) {
    let statusConst = ["approved"];
    let employmentTypeConst = ["contract", "contract to hire"];
    let employeeTypeConst = ["w2"];
    let syncStatusConst = [1, "1", null, undefined, ""]; // 1 = not ready to sync or blank
    let syncStatus = PlacementObj.data.data[0].payrollSyncStatus
      ? PlacementObj.data.data[0].payrollSyncStatus.id
      : null;
    console.log("PlacementObj.data.data[0].employmentType,", syncStatus, PlacementObj.data.data[0].employmentType, form.controls.payrollEmployeeType.value);
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

// SWE-346: Update payrollSyncStatusLookupID field
// On Add or Edit of Placement, if placement.payrollSyncStatusLookupID is blank, set value to 1 - Not Ready to Sync.
// Name: Placement - Payroll Status Sync
// Type: Page Interaction
// Entity/Tracks: Placement
// Action: Add Edit Postsave

const payrollSyncStatusLookupID =
  API.form.controls.payrollSyncStatus.value.id ??
  API.form.controls.payrollSyncStatus.value;
if (payrollSyncStatusLookupID === "" || payrollSyncStatusLookupID === null) {
  API.setValue("payrollSyncStatus", { id: 1, label: "Not Ready to Sync" });
}
