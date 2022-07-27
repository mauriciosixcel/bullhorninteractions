if (API.currentEntity === "Placement") {
  const workersCompRateID = form.controls.workersCompensationRate.value.compensation.code;
  const employeeOTType =
    form.controls["timeAndExpense.employeeOtType"].value === 3 ? "Y" : "N";
  const correlatedCustomText5 = form.controls.correlatedCustomText5.value;
  const Placement = `/entity/Placement/${API.currentEntityId}`;
  console.log('form.controls.workersCompensationRate.value ', form.controls.workersCompensationRate.value.compensation);
  console.log("workersCompRateID ", workersCompRateID);
  console.log("employeeOTType ", employeeOTType);
  console.log("correlatedCustomText5 ", correlatedCustomText5);
  let customText1 = "";
  let Obj = {
    customText1: customText1.concat(
      workersCompRateID,
      employeeOTType,
      correlatedCustomText5
    ),
  };

  return API.appBridge.httpPOST(Placement, Obj);
}
