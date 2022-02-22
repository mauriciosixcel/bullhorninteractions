// 85- Assignment Validation - Onboarding
// Name: Belflex Customization: Populate Job Owner from Account Owner at Company
// Entity/Tracks:  ClientCompany
// Fields: customInt4, customInt2
// Event: Fi –On init


if (API.currentEntity === "Placement") {
    console.log('Mauricio - Assignment Validation - Onboarding ', API);
    const userTypeName = API._globals.user.userTypeName
    const isAdmin = (userTypeName.includes('Franchise Support') || userTypeName.includes('Admin')) ? true : false

    const placement = `/query/JobOrder?where=placements.id=${form.data.changedEntityId}&fields=id,numOpenings,isOpen`
    return new Promise((resolve) => {
        return API.appBridge.httpGET(placement)
            .then((wcObj) => {
                console.log('JobOrder query ', wcObj);
                if (wcObj.data.count > 0) {
                    let numOpenings = wcObj.data.data.numOpenings
                    const UpdateJobOrderData = `/entity/JobOrder/${form.data.changedEntityId}`;
                    let Obj = numOpenings - 1 > 0 ? {
                        "isOpen": 1,
                        "status": 'Partially Placed'
                    } : {
                        "isOpen": 0,
                        "status": 'Placed'
                    }
                    API.appBridge.httpPOST(UpdateJobOrderData, Obj)
                        .then(resp => {}).catch(err => {
                            console.log("error while updating the JobOrder data", err);
                        });
                }
            })
    })
}