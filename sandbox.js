let version="1.2.3";
let request="major"

console.log(calcNewVersion(version,request));




function calcNewVersion(currentVersion, requestmode){

    if(parseVersion(currentVersion)){} else{return false;}
    if(parseRequestmode(requestmode)){} else{return false;}

    let versionArray = currentVersion.split(".");
    switch(requestmode) {
        case "major":
        versionArray[0]=parseInt(versionArray[0])+1;
          break;
        case "minor":
        versionArray[1]=parseInt(versionArray[1])+1;
          break;
        case "patch":
        versionArray[2]=parseInt(versionArray[2])+1;
          break;
        default:
    }
    return versionArray[0] + "." + versionArray[1] + "." + versionArray[2];
}


function parseVersion(version){
    var regex = new RegExp('^\\d+\\.\\d+\\.\\d+$');
    return regex.test(version);
}

function parseRequestmode(version){
    var regex = new RegExp('major|minor|patch');
    return regex.test(request);


}
