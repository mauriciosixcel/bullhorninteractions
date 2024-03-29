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
let customText20 = API.form.controls.customText20.value;
if (
  talentStatus === "Inactive" ||
  talentStatus === "Do Not Use" ||
  talentStatus === "Do Not Use - Adjudication"
) {
  API.setValue('customText20', 'Unavailable')
  customText33.hidden = false;
  customText33.required = true;
  API.markAsInvalid("customText33", "Cannot be blank");
} else {
  customText33.hidden = true;
  customText33.required = false;
}
if ((talentStatus === "Candidate" || talentStatus === "Associate") && customText20 === 'Unavailable') {
  API.setValue('customText20', '')
}
if ((talentStatus === "Associate") && (customText20 === 'Onboarding' || customText20 === 'Applying')) {
  API.setValue('customText20', '')
}
if ((talentStatus === "Candidate") && (customText20 === 'Available' || customText20 === 'Assigned')) {
  API.setValue('customText20', '')
}
if ((talentStatus === "Inactive") && (customText33 !== '')) {
  API.setValue('customText33', '')
  API.markAsInvalid("customText33", "Cannot be blank");
}

let elem = API.form.controls["customText33"];
elem.controlType = "select";
let options = [];
switch (talentStatus) {
  case 'Inactive':
    options = [
      'Lack of Relevant Experience',
      'Refused Background Check',
      'Refused Drug Screen',
      'Not Eligible to Work in the U.S.',
      'Unresponsive',
      'Seeking Higher Pay',
      'Not Actively Seeking Work',
      'Desired Shift Unavailable',
      'NCNS to Branch Interview / Appointment',
      'NCNS to Client Interview / Appointment /',
      'Orientation',
      'Unable to Accommodate Commute Preferences',
      'Accepted Other Job Offer',
      'Staying with Current Employer',
      'Position(s) Filled',
      'Hired on By Client',
    ];
    break;
  case 'Do Not Use':
    options = [
      'Conflict with Supervisor',
      'Poor Attitude',
      'Not Reliable / Poor Assignment Attendance',
      'Continuous NCNS to Assignment(s)',
      'EB Policy Violation',
      'Unsafe Work Habits',
      'Stolen Time'
    ];
    break;
  case 'Do Not Use - Adjudication':
    options = ['Does not meet requirements'];
    break;
  default:
    break;
}
elem.options = options;