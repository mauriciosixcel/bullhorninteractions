// Create a field interaction, ON INIT and ON CHANGE of a job order rate card, which will copy the standard contract markup (company.customFloat1) to the job order rate card (jobOrderRateCardLine.markupPercent) if Earn Code (jobOrderRateCardLine.earnCodeID) = REG. 

const clientName = document.querySelectorAll('[data-automation-id="clientCorporation"]')[0].lastChild.innerText
const queryCompany = `/query/ClientCorporation?BhRestToken={{BhRestToken}}&fields=id,name,customFloat1&where=name='${clientName}'`

return API.appBridge.httpGET(queryCompany)
    .then((wcObj) => {
        console.log("form.controls['earnCodeID'].value ", API.form.controls);
        if (wcObj.data.count > 0 && API.form.controls['earnCode'].value.code === 'DT') {
            API.setValue('markupPercent', wcObj  / 100);
        }
    });


// Create a field interaction, ON INIT of a placement (Placement III), which will copy the standard direct hire fee percentage (job.feeArrangment) to the placement (placement.fee). 

const placement = `/entity/Placement/${API.currentEntityId}?fields=id,clientCorporation,employmentType,employeeType,candidate,status`

return API.appBridge.httpGET(placement)
    .then((wcObj) => {
        console.log("wcObj ", wcObj);
        if (wcObj.data.data.id > 0) {
            return API.appBridge.httpGET(`/entity/Placement/${wcObj.data.data.id}?fields=id,clientCorporation,employmentType,employeeType,candidate,status`)
                .then((wcObj) => {
                    console.log("wcObj ", wcObj);
                    if (wcObj.data.data.id > 0) {

                    }
                });
        }
    });


// Create a field interaction, ON INIT of a job record (JOB II), which will copy the time and expense source from the company (company.customText10) to the job record (job.customText4).  ON INIT of a placement record (PLACEMENT II), copy the time and expense source from the job (job.customText4) to the placement (timeAndExpense.source). 




// Create a field interaction ON INIT of a job (JOB II, JOB III), which will copy the Guarantee period (company.customInt1) to the job record (correlatedCustomInt1). 
