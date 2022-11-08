// @ts-nocheck
import * as B from '@native-to-anchor/buffer-layout';
export class MplUpdateMetadataInstructionCoder {
    constructor(_idl) { }
    encode(ixName, ix) {
        switch (ixName) {
            default: {
                throw new Error(`Invalid instruction: ${ixName}`);
            }
        }
    }
    encodeState(_ixName, _ix) {
        throw new Error('MplUpdateMetadata does not have state');
    }
}
const LAYOUT = B.union(B.u8('instruction'));
function encodeData(ix, span) {
    const b = Buffer.alloc(span);
    LAYOUT.encode(ix, b);
    return b;
}
//# sourceMappingURL=instructions.js.map