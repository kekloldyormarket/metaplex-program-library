import { Idl, Coder } from '@project-serum/anchor';
import { MplUpdateMetadataAccountsCoder } from './accounts';
import { MplUpdateMetadataEventsCoder } from './events';
import { MplUpdateMetadataInstructionCoder } from './instructions';
import { MplUpdateMetadataStateCoder } from './state';
import { MplUpdateMetadataTypesCoder } from './types';
/**
 * Coder for MplUpdateMetadata
 */
export declare class MplUpdateMetadataCoder implements Coder {
    readonly accounts: MplUpdateMetadataAccountsCoder;
    readonly events: MplUpdateMetadataEventsCoder;
    readonly instruction: MplUpdateMetadataInstructionCoder;
    readonly state: MplUpdateMetadataStateCoder;
    readonly types: MplUpdateMetadataTypesCoder;
    constructor(idl: Idl);
}
//# sourceMappingURL=index.d.ts.map