const payrollSyncStatusLookupID = API.form.controls.payrollSyncStatus.value;
if (payrollSyncStatusLookupID === 3) {
  API.setReadOnly("legalBusinessEntity", true);
}
