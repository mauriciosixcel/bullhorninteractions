if (API.currentEntity === "JobSubmission") {
    console.log('form dataaa ', form);
    return new Promise((resolve) => {
        let candidateID = form.controls.candidate.value.id ?? form.controls.candidate.value[0].id
        const candidateQuery = `/entity/Candidate/${candidateID}?fields=status,customText20`
        return API.appBridge.httpGET(candidateQuery)
            .then((candObj) => {
                console.log('candidate ', candObj.data.data);
                if (candObj.data.data) {
                    console.log(candObj.data.data.customText20, ' candidate ', (candObj.data.data.customText20 === 'Available' || candObj.data.data.customText20 === 'Assigned'));
                    if ((candObj.data.data.status !== 'Associate' || 
                         candObj.data.data.status !== 'Candidate') &&
                        candObj.data.data.customText20 !== 'Unavailable') {
                        form.errorMessage = `Candidate status is not valid for Submission: ${candObj.data.data.status}` ,
                            form.isFormValid = false
                        resolve(form)
                    }else{
                        resolve([])  
                    }
                }else{
                    form.errorMessage = `No candidate data found` ,
                            form.isFormValid = false
                        resolve(form)
                }
            })
    })
}