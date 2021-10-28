// limit-job-codes

var FI = {
	currentField: "jobCode",
	prepender: "jobCodeID->limit-job-codes: ",

	init: function () {

		let elem = API.form.controls[FI.currentField];
		let initialValue = elem.initialValue;
		var optValue = "";
		elem.controlType = elem.type = "select";
		elem.optionsType = null;
		elem.config = {};
		elem.value = "";
		let elemS = API.form.controls["status"];

		var opt = [];
		
		var companyElem = API.getValue("clientCorporation");
		var wcURL = "/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=" + companyElem.id + "&fields=id,text1";
		var jcURL = "";

		API.appBridge.httpGET(wcURL).then(function (wcObj) {
			if (wcObj.data.count > 0) {
				let wcData = wcObj.data.data;
				if (wcData.length <= 0) {
					done = true;
				}
				else {
					wcData.forEach(function (wc, i) {
						if (!opt.some(opt => opt['label'] === wc.text1)) {
							opt.push({ value: { id: 0 }, label: wc.text1, text : wc.text1 });
							if (jcURL === "")
								jcURL = "/query/JobCode?fields=id,externalID&where=externalID IN ('" + wc.text1 + "'";
							else
								jcURL = jcURL + ",'" + wc.text1 + "'";
						}
					});

					if (jcURL != "") {
						jcURL += ")";

						API.appBridge.httpGET(jcURL).then(function (jcObj) {
							let jcData = jcObj.data.data;
							jcData.forEach(function (jc, i) {
								var optVal = opt.find(opt => opt['label'] === jc.externalID);                                
								if (optVal) { 
                                    optVal.value.id = jc.id; 
                                    if (jc.id === initialValue.id) {  API.setValue(FI.currentField, optVal.label); }
                                }								
								
							});
						});
					}
				}
								
				elem.options = opt;				
				elem.value = initialValue;
			}
			else {
				elem.options = null;
				elem.value = "";
			}
		});
	}

};
FI.init();