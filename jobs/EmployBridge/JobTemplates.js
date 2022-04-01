
console.log('Job Templates : mauricio ', API);

//3.1.3.8 Create a Field Interaction On Change (and On Init) on clientCorporationID (Job II & III) to modify the control and populate drop-down values on customText25.
const clientID = API.form.controls.clientCorporation.value.id
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text1&where=clientCorporation=${clientID}`
if (clientID) {
    API.appBridge.httpGET(searchJobTemplates)
        .then(resp => {
            if (resp.data.count > 0) {
                var contacts = resp.data.data;
                var filteredcontacts_1 = [];
                contacts.forEach(element => {
                    filteredcontacts_1.push(element.text1);
                });
                let elem = API.form.controls['customText25'];
                elem.controlType = "select";
                elem.options = filteredcontacts_1;
            }
        });
}
// 3.1.3.2 PRevent duplicate names when create Job codes ClientCorporationCustomObjectInstance7
if (API.currentEntity === "ClientCorporationCustomObjectInstance7" && API.currentEntityId === null) {
    return new Promise((resolve) => {
        const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text1&where=clientCorporation=${form.data.clientCorporation.id}`
        return API.appBridge.httpGET(searchJobTemplates)
            .then(resp => {
                if (resp.data.count > 0) {
                    var contacts = resp.data.data;
                    console.log('contacts ', contacts);
                    const matches = contacts.filter(element => {
                        console.log('element ', element.text1, ' form.controls.text1.value ', form.controls.text1.value, element.text1 === form.controls.text1.value);
                        if (element.text1 === form.controls.text1.value) {
                            return element
                        }
                    })
                    console.log('matches ', matches);
                    if (matches) {
                        form.errorMessage = `A record already exists for this Job Code on this Account `,
                        form.isFormValid = false
                        resolve(form)
                    }else
                        resolve([])
                }else
                    resolve([])
                
            });
    })
}

//3.1.3.3 Create a Field Interaction On Init on Text8 to modify the control and populate drop-down values on Text8.
console.log('custom interaction text8 ', API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance4?fields=id,text1&where=clientCorporation=${API.form.associations.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push(element.text1);
            });
            let elem = API.form.controls['text8'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });

//3.1.3.4 Create a Field Interaction On Init on Text12 (ClientCorporationCustomObjectInstance7) to modify the control and populate drop-down values on Text12.
console.log('custom interaction text12 ', API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance3?fields=id,text4&where=clientCorporation=${API.form.associations.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push(element.text4);
            });
            let elem = API.form.controls['text12'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });

//3.1.3.5 Create a Field Interaction On Init on Text9 (ClientCorporationCustomObjectInstance7) to default the drop-down value of Text9
console.log('custom interaction customText6 ', API)
const customText6 = `/entity/ClientCorporation/${API.form.associations.clientCorporation.id}?fields=customText6`
API.appBridge.httpGET(customText6)
    .then(resp => {
        if (resp.data.data.customText6) {
            let elem = API.form.controls['text9'];
            elem.controlType = "select";
            elem.options = { label: resp.data.data.customText6, value: resp.data.data.customText6 };
        }
    });

//3.1.3.6 Create a Field Interaction On Init on Text4 (ClientCorporationCustomObjectInstance7) to modify the control and set default value on Text4
console.log('custom interaction Text4 ', API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=id,text2&where=clientCorporation=${API.form.associations.clientCorporation.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            var contacts = resp.data.data;
            var filteredcontacts_1 = [];
            contacts.forEach(element => {
                filteredcontacts_1.push({ label: element.text2, value: element.text2 });
            });
            let elem = API.form.controls['text4'];
            elem.controlType = "select";
            elem.options = filteredcontacts_1;
        }
    });

//3.1.3.7 
if (item.label === 'Job Templates') {
    console.log('itemmmmmmm ', item, API);
    const ClientCorporation = `/entity/ClientCorporation/${API.currentEntityId}?fields=id,trackTitle`
    API.appBridge.httpGET(ClientCorporation)
        .then(resp => {
            if (resp.data.data.id > 0 && (resp.data.data.trackTitle === 'EB Branch' || resp.data.data.trackTitle === 'EB Brand')) {
                item.hidden = true;
            }
        });
}

//3.1.3.9 Create a Field Interaction On Change on customText25(Job II & III) to query ClientCorporationCustomObjectInstance7 where text2 equals customText25.
console.log('custom interaction customText25 ', API)
const searchJobTemplates = `/query/ClientCorporationCustomObjectInstance7?fields=clientCorporation(customText5),text1,text2,textBlock1,text4,text9,text5,text6,text7,text10,text11,text12&where=clientCorporation=${API.form.controls.clientCorporation.value.id}`
API.appBridge.httpGET(searchJobTemplates)
    .then(resp => {
        if (resp.data.count > 0) {
            const contacts = resp.data.data;
            const filteredJobTemplate = contacts.find(el => el.text1 === API.form.controls.customText25.value)
            let skills = []
            let categories = []

            console.log('filteredJobTemplatesssssssss', filteredJobTemplate);
            API.setValue('description', filteredJobTemplate.textBlock1)
            API.setValue('customText14', filteredJobTemplate.text9)
            console.log('filteredJobTemplate.text6 ', filteredJobTemplate.text6);
            API.setValue('customText2', filteredJobTemplate.text6)
            console.log('filteredJobTemplate.text7 ', filteredJobTemplate.text7);
            API.setValue('customText3', filteredJobTemplate.text7)
            console.log('filteredJobTemplate.text10 ', filteredJobTemplate.text10);
            API.setValue('customText19', filteredJobTemplate.text10)
            console.log('filteredJobTemplate.text10 ', filteredJobTemplate.text10);
            API.setValue('customText20', filteredJobTemplate.text11)
            API.setValue('title', filteredJobTemplate.text2)
            API.setValue('customText13', filteredJobTemplate.clientCorporation.customText5)
            filteredJobTemplate.text5?.forEach(element => {
                return API.appBridge.httpGET(`query/Skill?fields=id,name&where=name='${element}'`)
                    .then(respObj => {

                        if (respObj.data.count > 0) {
                            let dataSkill = respObj.data.data[0]

                            skills.push({ id: dataSkill.id, name: dataSkill.name });
                        }
                        API.setValue('skills', skills)
                    })

            });
            if (filteredJobTemplate.text4 !== null) {
                return API.appBridge.httpGET(`query/Category?fields=id,name,specialties&where=specialties.name='${filteredJobTemplate.text4}'`)
                    .then(respObj => {

                        if (respObj.data.count > 0) {
                            let dataCategories = respObj.data.data[0]
                            API.setValue('categories', dataCategories.name)
                        }

                    })
            }
        }
    });


// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On change


console.log('SWE-128:  Job Opening Automation ', API);
const customInt4 = Number(API.form.controls['customInt4'].value)
const customInt2 = Number(API.form.controls['customInt2'].value)
const customText8 = API.form.controls.customText8;
if (customInt2 < customInt4) {
    console.log('holaaaa');
    customText8.hidden = false;
    customText8.required = true;
} else if (customInt2 === customInt4) {
    customText8.hidden = true;
    customText8.removeTooltipArrow = true
} else {
    customText8.hidden = true;
    API.markAsInvalid(API.getActiveKey(), '# Committed cannot exceed Total Client Need');
}

if (API.form.controls['customText8'].value === '') {
    API.markAsInvalid('customText8', 'Cannot be blank');
}


