let version="aaa";
let request="major";

console.log(calcNewVersion(version,request));


const { execSync } = require('child_process');




console.log(getCurrentVersion());

function getCurrentVersion(){
    console.log('getCurrentVersion() has started');
    currentVersion=execSync('/Users/ken/github/gittag/getLatestVersion.sh')
    return currentVersion.toString(); 
}





function calcNewVersion(currentVersion, requestmode){

    if(parseVersion(currentVersion)){} else{return false;}
    if(parseRequestmode(requestmode)){} else{return false;}

    let versionArray = currentVersion.split(".");
    switch(requestmode) {
        case "major":
        versionArray[0]=parseInt(versionArray[0])+1;
        versionArray[1]=0;
        versionArray[2]=0;
        
        break;
        case "minor":
        versionArray[1]=parseInt(versionArray[1])+1;
        versionArray[2]=0;
        
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
