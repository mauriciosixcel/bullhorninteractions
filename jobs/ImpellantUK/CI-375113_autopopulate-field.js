//Time Card Approver - Impellam UK I-375113 part 1

let customText2 = API.form.controls['customText2'].value
let primaryDepartment = API._globals.user.departmentName
if (customText2 === '') {
    switch (true) {
        case primaryDepartment.startsWith('Carbon60'):
            API.setValue('customText2', 'Carbon60 Standard');
            break;
        case primaryDepartment.startsWith('Lorien'):
            API.setValue('customText2', 'Lorien Standard');
            break;
        case primaryDepartment.startsWith('SRG'):
            API.setValue('customText2', 'SRG Standard');
            break;
    }
}