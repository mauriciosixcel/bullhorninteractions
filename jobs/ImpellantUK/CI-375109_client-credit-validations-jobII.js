if (API.currentEntity === "JobOrder") {
  console.log("FORM ", form);
  const escapeRegExpMatch = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  const isExactMatch = (str, match) => {
    return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
  }


  return new Promise((resolve) => {
    const employmentType = form.data.employmentType;
    const clientCorporation = form.controls["clientCorporation"].value.id;
    let startDate = new Date(form.controls["startDate"].value).getTime();
    const ClientCorporationCustomObjectInstance1 = `/query/ClientCorporationCustomObjectInstance1?where=clientCorporation=${clientCorporation}&fields=id,date1,text2,text3`;
    return API.appBridge
      .httpGET(ClientCorporationCustomObjectInstance1)
      .then((resp) => {
        console.log("resp.data ", resp.data);
        if (resp.data.count > 0) {
          let thisFilter = resp.data.data.filter((item) => {
            console.log(' item.date1 > startDate', item.date1 > startDate);
            console.log(' item.text3.filter((el) => isExactMatch(el, employmentType))', item.text3.filter((el) => isExactMatch(el, employmentType)).length > 0);
            console.log(' item.text2 === "Approved"', item.text2 === "Approved");
            if (
              (item.date1 > startDate &&
                item.text3.filter((el) => isExactMatch(el, employmentType)).length > 0 &&
                item.text2 === "Approved")
            ) {
              return item;
            }
          });
          console.log('thisFilter ', thisFilter.length);
          if (thisFilter.length === 0) {
            resolve(
              API.promptUser({
                headerText: "Credit and Terms Alert",
                subheaderText:
                    "Do not meet the minimum credit requirements for this Job",
                })
              );
            } else {
              // resolve(
              //   form.errorMessage = 'Testing ClientCorporationCustomObjectInstance1 case',
              //   form.isFormValid = false
              // );
              const ClientCorporationCustomObjectInstance6 = `/query/ClientCorporationCustomObjectInstance6?where=clientCorporation=${clientCorporation}&fields=id,date2`;
              return API.appBridge
                .httpGET(ClientCorporationCustomObjectInstance6)
                .then((res) => {
                  console.log("res.data.count ", res);
                  if (res.data.count > 0) {
                    res.data.data.forEach((el) => {
                      const date2 = el.date2; // moved to ClientCorporationCustomObjectInstance6
                      if (date2 === "" || date2 === null) {
                        console.log("2");
                        resolve(
                          API.promptUser({
                            headerText: "Credit and Terms Alert",
                            subheaderText:
                              "Do not meet the minimum date terms requirements for this Job",
                          })
                        );
                        return false;
                      } else {
                        resolve();
                        return false;
                      }
                    });
                  } else {
                    console.log("3");
                    resolve(
                      API.promptUser({
                        headerText: "Credit and Terms Alert",
                        subheaderText:
                          "Do not meet the minimum terms requirements for this Job",
                      })
                    );
                    return false;
                  }
                })
              .catch((err) => console.log("ERROROOOOOOOO ", err));
          }
              // resp.data.data.every(element => {
              //     const date1 = element.date1
              //     const text3 = element.text3 || ['null'] // array -> make a filter
              //     const text2 = element.text2
              //     //text3 = Perm IF job.employmentType=Perm Or text3 = Temp IF job.employmentType = Temp
              //     console.log(date1 < startDate);
              //     console.log(text3.filter(el => employmentType.includes(el)).length < 0);
              //     console.log(text3.filter(el => employmentType.includes(el)).length);
              //     console.log(text3.filter(el => employmentType.includes(el)));
              //     console.log(text3);
              //     console.log(employmentType);

          //     console.log(text2 !== 'Approved');
          //     if (date1 < startDate ||
          //         text3.filter(el => employmentType.includes(el)).length <= 0 ||
          //         text2 !== 'Approved') {
          //         console.log('1');
          //         resolve(API.promptUser({
          //             headerText: 'Credit and Terms Alert',
          //             subheaderText: 'Do not meet the minimum requirements for this Job'
          //         }))
          //         return false
          //     } else {
          //         const ClientCorporationCustomObjectInstance6 = `/query/ClientCorporationCustomObjectInstance6?where=clientCorporation=${clientCorporation}&fields=id,date2`
          //         return API.appBridge.httpGET(ClientCorporationCustomObjectInstance6)
          //             .then(res => {
          //                 console.log('res.data.count ', res)
          //                 if (res.data.count > 0) {
          //                     res.data.data.forEach(el => {
          //                         const date2 = el.date2 // moved to ClientCorporationCustomObjectInstance6
          //                         if (date2 === '' || date2 === null) {
          //                             console.log('2');
          //                             resolve(API.promptUser({
          //                                 headerText: 'Credit and Terms Alert',
          //                                 subheaderText: 'Do not meet the minimum requirements for this Job'
          //                             }))
          //                             return false
          //                         } else {
          //                             resolve()
          //                             return false
          //                         }
          //                     })
          //                 } else {
          //                     console.log('3');
          //                     resolve(API.promptUser({
          //                         headerText: 'Credit and Terms Alert',
          //                         subheaderText: 'Do not meet the minimum requirements for this Job'
          //                     }))
          //                     return false
          //                 }
          //             })
          //             .catch(err => console.log('ERROROOOOOOOO ', err))
          //     }
          // });
        } else {
          console.log("4");
          resolve(
            API.promptUser({
              headerText: "Credit and Terms Alert",
              subheaderText:
                "Do not meet the minimum requirements for this Job",
            })
          );
        }
      });
  });
}
