/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from "@solana/spl-token";
import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category ProcessDistributeToken
 * @category generated
 */
export type ProcessDistributeTokenInstructionArgs = {
  distributeForMint: boolean;
};
/**
 * @category Instructions
 * @category ProcessDistributeToken
 * @category generated
 */
const processDistributeTokenStruct = new beet.BeetArgsStruct<
  ProcessDistributeTokenInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["distributeForMint", beet.bool],
  ],
  "ProcessDistributeTokenInstructionArgs"
);
/**
 * Accounts required by the _processDistributeToken_ instruction
 * @category Instructions
 * @category ProcessDistributeToken
 * @category generated
 */
export type ProcessDistributeTokenInstructionAccounts = {
  payer: web3.PublicKey;
  member: web3.PublicKey;
  membershipMintTokenAccount: web3.PublicKey;
  membershipVoucher: web3.PublicKey;
  fanout: web3.PublicKey;
  holdingAccount: web3.PublicKey;
  fanoutForMint: web3.PublicKey;
  fanoutForMintMembershipVoucher: web3.PublicKey;
  fanoutMint: web3.PublicKey;
  fanoutMintMemberTokenAccount: web3.PublicKey;
  membershipMint: web3.PublicKey;
  memberStakeAccount: web3.PublicKey;
};

const processDistributeTokenInstructionDiscriminator = [
  126, 105, 46, 135, 28, 36, 117, 212,
];

/**
 * Creates a _ProcessDistributeToken_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProcessDistributeToken
 * @category generated
 */
export function createProcessDistributeTokenInstruction(
  accounts: ProcessDistributeTokenInstructionAccounts,
  args: ProcessDistributeTokenInstructionArgs
) {
  const {
    payer,
    member,
    membershipMintTokenAccount,
    membershipVoucher,
    fanout,
    holdingAccount,
    fanoutForMint,
    fanoutForMintMembershipVoucher,
    fanoutMint,
    fanoutMintMemberTokenAccount,
    membershipMint,
    memberStakeAccount,
  } = accounts;

  const [data] = processDistributeTokenStruct.serialize({
    instructionDiscriminator: processDistributeTokenInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: member,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: membershipMintTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: membershipVoucher,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanout,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: holdingAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutForMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutForMintMembershipVoucher,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: fanoutMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: fanoutMintMemberTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: membershipMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: memberStakeAccount,
      isWritable: true,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey(
      "5F6oQHdPrQBLdENyhWUAE4mCUN13ZewVxi5yBnZFb9LW"
    ),
    keys,
    data,
  });
  return ix;
}
