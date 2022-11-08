// @ts-check
const path = require('path');
const programDir = path.join(__dirname, '..', 'program');
const idlDir = path.join(__dirname, 'idl');
const sdkDir = path.join(__dirname, 'src', 'generated');
const binaryInstallDir = '/Users/jarettdunn/.cargo';

module.exports = {
  idlGenerator: 'anchor',
  programName: 'update_metadata',
  programId: '5F6oQHdPrQBLdENyhWUAE4mCUN13ZewVxi5yBnZFb9LW',
  idlDir,
  sdkDir,
  binaryInstallDir,
  removeExistingIdl: false,
  programDir, idlHook: 
  (idl) => {
    idl.types = [ {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },...idl.types]
    return idl
  },
  typeAliases: {
    UnixTimestamp: 'i64',
  },
};
