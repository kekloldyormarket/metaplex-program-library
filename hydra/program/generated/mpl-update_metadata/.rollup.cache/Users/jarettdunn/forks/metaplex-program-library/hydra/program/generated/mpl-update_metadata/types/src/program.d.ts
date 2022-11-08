import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
export declare const MPL_UPDATE_METADATA_PROGRAM_ID: PublicKey;
interface GetProgramParams {
    programId?: PublicKey;
    provider?: AnchorProvider;
}
export declare function mplUpdateMetadataProgram(params?: GetProgramParams): Program<MplUpdateMetadata>;
declare type MplUpdateMetadata = {
    version: '0.3.0';
    name: 'mpl_update_metadata';
    instructions: [];
    types: [
        {
            name: 'Fanout';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'authority';
                        type: 'publicKey';
                    },
                    {
                        name: 'name';
                        type: 'string';
                    },
                    {
                        name: 'accountKey';
                        type: 'publicKey';
                    },
                    {
                        name: 'totalShares';
                        type: 'u64';
                    },
                    {
                        name: 'totalMembers';
                        type: 'u64';
                    },
                    {
                        name: 'totalInflow';
                        type: 'u64';
                    },
                    {
                        name: 'lastSnapshotAmount';
                        type: 'u64';
                    },
                    {
                        name: 'bumpSeed';
                        type: 'u8';
                    },
                    {
                        name: 'accountOwnerBumpSeed';
                        type: 'u8';
                    },
                    {
                        name: 'totalAvailableShares';
                        type: 'u64';
                    },
                    {
                        name: 'membershipModel';
                        type: {
                            defined: 'MembershipModel';
                        };
                    },
                    {
                        name: 'membershipMint';
                        type: {
                            option: 'publicKey';
                        };
                    },
                    {
                        name: 'totalStakedShares';
                        type: {
                            option: 'u64';
                        };
                    }
                ];
            };
        },
        {
            name: 'FanoutMint';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'mint';
                        type: 'publicKey';
                    },
                    {
                        name: 'fanout';
                        type: 'publicKey';
                    },
                    {
                        name: 'tokenAccount';
                        type: 'publicKey';
                    },
                    {
                        name: 'totalInflow';
                        type: 'u64';
                    },
                    {
                        name: 'lastSnapshotAmount';
                        type: 'u64';
                    },
                    {
                        name: 'bumpSeed';
                        type: 'u8';
                    }
                ];
            };
        },
        {
            name: 'FanoutMembershipVoucher';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'fanout';
                        type: 'publicKey';
                    },
                    {
                        name: 'totalInflow';
                        type: 'u64';
                    },
                    {
                        name: 'lastInflow';
                        type: 'u64';
                    },
                    {
                        name: 'bumpSeed';
                        type: 'u8';
                    },
                    {
                        name: 'membershipKey';
                        type: 'publicKey';
                    },
                    {
                        name: 'shares';
                        type: 'u64';
                    }
                ];
            };
        },
        {
            name: 'FanoutMembershipMintVoucher';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'fanout';
                        type: 'publicKey';
                    },
                    {
                        name: 'fanoutMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'lastInflow';
                        type: 'u64';
                    },
                    {
                        name: 'bumpSeed';
                        type: 'u8';
                    }
                ];
            };
        }
    ];
    errors: [
        {
            code: 0;
            name: 'BadArtithmetic';
            msg: 'Encountered an arithmetic error';
        },
        {
            code: 1;
            name: 'InvalidAuthority';
            msg: 'Invalid authority';
        },
        {
            code: 2;
            name: 'InsufficientShares';
            msg: 'Not Enough Available Shares';
        },
        {
            code: 3;
            name: 'SharesArentAtMax';
            msg: 'All available shares must be assigned to a member';
        },
        {
            code: 4;
            name: 'NewMintAccountRequired';
            msg: 'A New mint account must be provided';
        },
        {
            code: 5;
            name: 'MintAccountRequired';
            msg: 'A Token type Fanout requires a Membership Mint';
        },
        {
            code: 6;
            name: 'InvalidMembershipModel';
            msg: 'Invalid Membership Model';
        },
        {
            code: 7;
            name: 'InvalidMembershipVoucher';
            msg: 'Invalid Membership Voucher';
        },
        {
            code: 8;
            name: 'MintDoesNotMatch';
            msg: 'Invalid Mint for the config';
        },
        {
            code: 9;
            name: 'InvalidHoldingAccount';
            msg: 'Holding account does not match the config';
        },
        {
            code: 10;
            name: 'HoldingAccountMustBeAnATA';
            msg: 'A Mint holding account must be an ata for the mint owned by the config';
        },
        {
            code: 11;
            name: 'DerivedKeyInvalid';
        },
        {
            code: 12;
            name: 'IncorrectOwner';
        },
        {
            code: 13;
            name: 'WalletDoesNotOwnMembershipToken';
            msg: 'Wallet Does not Own Membership Token';
        },
        {
            code: 14;
            name: 'InvalidMetadata';
            msg: 'The Metadata specified is not valid Token Metadata';
        },
        {
            code: 15;
            name: 'NumericalOverflow';
        },
        {
            code: 16;
            name: 'InsufficientBalanceToDistribute';
            msg: 'Not enough new balance to distribute';
        },
        {
            code: 17;
            name: 'InvalidFanoutForMint';
        },
        {
            code: 18;
            name: 'MustDistribute';
            msg: 'This operation must be the instruction right after a distrobution on the same accounts.';
        },
        {
            code: 19;
            name: 'InvalidStakeAta';
        },
        {
            code: 20;
            name: 'CannotTransferToSelf';
        },
        {
            code: 21;
            name: 'TransferNotSupported';
            msg: 'Transfer is not supported on this membership model';
        },
        {
            code: 22;
            name: 'RemoveNotSupported';
            msg: 'Remove is not supported on this membership model';
        },
        {
            code: 23;
            name: 'RemoveSharesMustBeZero';
            msg: 'Before you remove a wallet or NFT member please transfer the shares to another member';
        },
        {
            code: 24;
            name: 'InvalidCloseAccountDestination';
            msg: 'Sending Sol to a SPL token destination will render the sol unusable';
        }
    ];
};
export {};
//# sourceMappingURL=program.d.ts.map