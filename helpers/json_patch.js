const jsonpatch = require('fast-json-patch');

const patchJson = (Userdata)=>{
    var patch = [
        { op: "replace", path: "/firstName", value: Userdata.user },
        { op:'remove' ,path: "/user" },
        { op: "add", path: "/lastName", value: "My Lastname" },
        { op: "add", path: "/company", value: "ABC"  }
    ];
    Userdata = jsonpatch.applyPatch(Userdata, patch).newDocument;
    return Userdata
}


module.exports = {
    patchJson
}
