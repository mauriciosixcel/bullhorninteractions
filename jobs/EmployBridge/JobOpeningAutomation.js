// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On init

console.log('SWE-128:  Job Opening Automation ', API);
const customInt4 = Number(API.form.controls['customInt4'].value)
const customInt2 = Number(API.form.controls['customInt2'].value)
API.setValue('customInt2', customInt4)


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
} else {
    customText8.hidden = true;
    API.markAsInvalid(API.getActiveKey(), '# Committed cannot exceed Total Client Need');
}

// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On change

//validate if is modal view
const modalView = API.form.layout;
//getting the tittle by xpath
let tittle = document.evaluate(
    '//h1[contains(., "Move 1 to Assignment")]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
).singleNodeValue;

if (modalView === 'vertical' && tittle.innerText.includes('Move 1 to Assignment')) {

    //get the info of JobOrder.numOpenings (# of Openings)
    const elems = document.body.getElementsByTagName('div');

    for (let i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute('data-automation-id') === 'id') {

            //get the element child by class
            const valuElem = elems[i].getElementsByClassName('value');

            //get the value to number
            let valueId = parseInt(valuElem[0].innerText);
            const jobEndpoint = `/entity/JobOrder/${valueId}?fields=id,numOpenings`
            API.appBridge.httpGET(jobEndpoint)
                .then(resp => {
                    if (resp.data.data.id > 0) {

                        const divContainer = document.body.getElementsByClassName('tile-container')[1];
                        //input with value NO = divContainer.children[0] = jobCloseNo
                        //input with value YES = divContainer.children[1] = jobCloseYes
                        let jobCloseYes = divContainer.children[1];
                        let jobCloseNo = divContainer.children[0];

                        const clickOnInput = (adding) => {
                            let inputCheckAdding = adding.getElementsByTagName('input');
                            inputCheckAdding[0].click();
                        };

                        if (resp.data.data.numOpening <= 1) {
                            //Set "Would you like to close this job to YES"
                            clickOnInput(jobCloseYes);
                        } else {
                            //Set "Would you like to close this job to NO"
                            clickOnInput(jobCloseNo);
                        }
                    }
                })
        }
    }
}

// SWE-128:  Job Opening Automation
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On change

if (API.currentEntity === "Placement") {
    console.log(API, form);
    const placement = `/query/JobOrder?where=placements.id=${form.data.changedEntityId}&fields=id,numOpenings,isOpen`

    return API.appBridge.httpGET(placement)
        .then((wcObj) => {
            console.log('JobOrder query ', wcObj);
            if (wcObj.data.count > 0) {
                let numOpenings = wcObj.data.data[0].numOpenings
                const UpdateJobOrderData = `/entity/JobOrder/${wcObj.data.data[0].id}`;
                let Obj = numOpenings - 1 > 0 ? {
                    "isOpen": true,
                    "status": 'Partially Placed'
                } : {
                    "isOpen": false,
                    "status": 'Placed'
                }
                return API.appBridge.httpPOST(UpdateJobOrderData, Obj)
                    .then(resp => { }).catch(err => {
                        console.log("error while updating the JobOrder data", err);
                    });
            }
        })
}