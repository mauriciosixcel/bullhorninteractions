//Client Compliance - Impellam UK I-375113 part 1

let customText2 = API.form.controls['customText2'].value
let primaryDepartment = strtolower(API._globals.user.departmentName)
if (customText2 === '') {
    switch (true) {
        case primaryDepartment.startsWith('carbon60'):
            API.setValue('customText2', 'Carbon60 Standard');
            break;
        case primaryDepartment.startsWith('lorien'):
            API.setValue('customText2', 'Lorien Standard');
            break;
        case primaryDepartment.startsWith('srg'):
            API.setValue('customText2', 'SRG Standard');
            break;
    }
}