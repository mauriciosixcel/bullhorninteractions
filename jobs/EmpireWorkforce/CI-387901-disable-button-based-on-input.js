// SWE-345: Empire Workforce Customization - Validate Candidate Address for Prism Integration
// Name: Empire Workforce Customization - Validate Candidate Address for Prism Integration
// Type: Start/End Date Automation
// Entity/Tracks: Candidate
// Fields: address1,address2,zip,state
// Event: Add Edit Presave

if (API.currentEntity === "Candidate") {
  let address1 = form.controls["address"].value.address1;
  let zip = form.controls["address"].value.zip;
  let state = form.controls["address"].value.state;
  return new Promise((resolve) => {
    const validateAddres = address1?.split(" ").find((element) => {
      if (
        [
          "PO",
          "PO BOX",
          "P.O",
          "P.O.",
          "PO.BOX",
          "P.O.BOX",
          "PO.Box",
          "P.O.Box",
          "POBOX",
        ].includes(element)
      )
        return element;
    });
    if (validateAddres !== undefined) {
      (form.errorMessage =
        "PO Box address are not allowed within the Candidate permanent Address field"),
        (form.isFormValid = false);
      resolve(form);
      return;
    } else if ((zip !== null && zip.length > 5 || zip.length < 5  )|| zip === null) {
      (form.errorMessage = "Zip Code must be 5 digits"),
        (form.isFormValid = false);
      resolve(form);
      return;
    } else if (state === "" || state === null) {
      (form.errorMessage =
        "State is missing or formatted incorrectly. Please select a state from the drop down."),
        (form.isFormValid = false);
      resolve(form);
      return;
    }
    form.isFormValid = true;
    resolve(form);
    return;
  });
}
