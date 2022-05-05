// 235- Status/Sub-Status Filtering
// Name: EmployeBridge Customization: Status/Sub-Status Filtering
// Entity/Tracks:  candidate, 
// Fields: status, customText34
// Event: Fi –On init


const metaCandidate = '/meta/Candidate?fields=customText34'
const status = API.form.controls.status.value
let customText20 = API.form.controls.customText20
customText20.controlType = customText20.type = "select";
return API.appBridge
  .httpGET(metaCandidate)
  .then((resp) => {
    const customText34 = resp.data.fields[0].options;
    let filteredCustomText34 = [];
    customText34.forEach((element) => {
      if (element.value === status)
        filteredCustomText34.push({
          value: element.label,
          label: element.label,
        });
    });
    if (filteredCustomText34.length > 0) {
      API.form.controls["customText20"].options = filteredCustomText34;
      console.log("Mauricio - Assignment Validation - Onboarding ", API);
    }
  })
  .catch((err) => console.log(err));

// 235- Status/Sub-Status Filtering
// Name: EmployeBridge Customization: Status/Sub-Status Filtering
// Entity/Tracks:  candidate,
// Fields: customText20
// Event: PI – Modify overview fields

if (field.name === "customText20" || field.name === "status")
  field.disabled = true;

// 235- Status/Sub-Status Filtering
// Name: EmployeBridge Customization: Status/Sub-Status Filtering
// Entity/Tracks:  candidate,
// Fields: customText20
// Event: PI – Filter dropdown

console.log("Mauricio - Status/Sub-Status Filtering remove items ", API);
const userTypeName = API._globals.user.userTypeName;
let talentStatus = API.form.controls.status.options;
if (!userTypeName.includes("Admin") && !userTypeName.includes("HR")) {
  API.form.controls["status"].options = deleteStatus([
    "Candidate",
    "Associate",
    "Do Not Use - Adjudication",
  ]);
}
if (userTypeName.includes("HR")) {
  API.form.controls["status"].options = [
    "Inactive",
    "Do Not Use",
    "Do Not Use - Adjudication",
  ];
}

function deleteStatus(arrayList) {
  return talentStatus.filter((x) => !arrayList.includes(x.value));
}

// 235- Status/Sub-Status Filtering
// Name: EmployeBridge Customization: Status/Sub-Status Filtering
// Entity/Tracks:  candidate,
// Fields: customText33
// Event: PI – Hide/show

console.log("Mauricio - Status/Sub-Status Filtering remove items ", API);
let talentStatus = API.form.controls.status.value;
let customText33 = API.form.controls.customText33;
if (
  talentStatus === "Inactive" ||
  talentStatus === "Do Not Use" ||
  talentStatus === "Do Not Use - Adjudication"
) {
  customText33.hidden = false;
  customText33.required = true;
  API.markAsInvalid("customText33", "Cannot be blank");
} else customText33.hidden = true;