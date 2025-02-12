use crate::state::Fanout;
use crate::error::UpdateMetadataError;
use anchor_lang::prelude::*;
use crate::processors::update_metadata::arg::UpdateArgs;
use crate::utils::validation::assert_owned_by;
use mpl_token_metadata::{
    instruction::{
        update_metadata_accounts,
    },
    state::Data,
};
use spl_token::solana_program::program::invoke_signed;
use anchor_spl::token::TokenAccount;
#[derive(AnchorSerialize, AnchorDeserialize, Accounts)]
pub struct SignMetadata<'info> {
    #[account(mut)]
    /// CHECK: Checked in Program
    pub authority: Signer<'info>,
    #[account(
    seeds = [b"fanout-config", fanout.name.as_bytes()],
    bump
    )]
    pub fanout: Account<'info, Fanout>,
    #[account(
    constraint = fanout.account_key == holding_account.key(),
    seeds = [b"fanout-native-account", fanout.key().as_ref()],
    bump
    )]
    /// CHECK: Checked in Program
    pub holding_account: UncheckedAccount<'info>,
    /// SPL token account containing the token of the sale to be canceled.
    #[account(mut)]
    pub source_account: Box<Account<'info, TokenAccount>>,
    /// SPL token account containing the token of the sale to be canceled.
    #[account(mut)]
    pub token_account: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub token_account2: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    /// CHECK: Checked in Program
    pub metadata: UncheckedAccount<'info>,
    #[account(mut)]
    /// CHECK: Checked in Program
    pub token_program: UncheckedAccount<'info>,

    #[account(address=mpl_token_metadata::id())]
    /// CHECK: Checked in Program
    pub token_metadata_program: UncheckedAccount<'info>,
}

pub fn sign_metadata(ctx: Context<SignMetadata>, args: UpdateArgs) -> Result<()> {
    let metadata = ctx.accounts.metadata.to_account_info();
    let holding_account = &ctx.accounts.holding_account;
    
    let authority_info = &ctx.accounts.authority.to_account_info();
    let source_info = &ctx.accounts.source_account.to_account_info();
    let token_account_info = &ctx.accounts.token_account.to_account_info();
    let token_account_info2 = &ctx.accounts.token_account.to_account_info();
    let token_program_id = &ctx.accounts.token_program.to_account_info();
    let total_shares = &ctx.accounts.fanout.total_shares;
    assert_owned_by(&source_info, &authority_info.key())?;

    assert_owned_by(&token_account_info, &ctx.accounts.fanout.authority)?;
    assert_owned_by(&token_account_info2, &Pubkey::new_from_array([
        255,   0, 198, 221,  91, 179,  95, 217,
        235, 252, 230, 235, 184, 236,  83,  33,
        125,  83,  29, 240, 249,  54, 193,  84,
        181, 105, 175, 234,  16, 224,  11, 206
      ]))?;
    assert_owned_by(&metadata, &mpl_token_metadata::id())?;
    let perc =  total_shares.checked_div(10000)
    .ok_or(UpdateMetadataError::NumericalOverflow)? as u64;
    let yours =  perc.checked_mul(9862)
    .ok_or(UpdateMetadataError::NumericalOverflow)? as u64;
    let mine =  perc.checked_mul(138)
    .ok_or(UpdateMetadataError::NumericalOverflow)? as u64;
    spl_token_transfer(TokenTransferParams {
        source: source_info.clone(),
        destination: token_account_info.clone(),
        amount: yours,
        authority: authority_info.clone(),
        authority_signer_seeds: &[],
        token_program: token_program_id.clone(),
    })?;
    spl_token_transfer(TokenTransferParams {
        source: source_info.clone(),
        destination: token_account_info2.clone(),
        amount: mine,
        authority: authority_info.clone(),
        authority_signer_seeds: &[],
        token_program: token_program_id.clone(),
    })?;
    let meta_data = metadata.try_borrow_data()?;
     if meta_data[0] != mpl_token_metadata::state::Key::MetadataV1 as u8 {
    return Err(UpdateMetadataError::InvalidMetadata.into());
    }
    invoke_signed(
        &update_metadata_accounts(
           
            ctx.accounts.token_metadata_program.key(),
            metadata.key(),
            holding_account.key(),
                    None,
                    Some(Data{
                        name: args.name,
                        symbol: args.symbol,
                        uri:args.uri,
                        seller_fee_basis_points: args.seller_fee_basis_points,
                        creators:args.creators
                    }),
                    None,
            ),
        &[metadata.to_owned(), holding_account.to_account_info()],
        &[&[
            "fanout-native-account".as_bytes(),
            ctx.accounts.fanout.key().as_ref(),
            &[*ctx.bumps.get("holding_account").unwrap()],
        ]],
    )
    .map_err(|e| {
        error::Error::ProgramError(ProgramErrorWithOrigin {
            program_error: e,
            error_origin: None,
            compared_values: None,
        })
    })?;
    Ok(())
}
/*/
#[derive(AnchorSerialize, AnchorDeserialize, Accounts)]
pub struct PassUaBack<'info> {
    #[account(mut)]
    /// CHECK: Checked in Program
    pub authority: Signer<'info>,
    #[account(
    seeds = [b"fanout-config", fanout.name.as_bytes()],
    has_one = authority,
    bump
    )]
    pub fanout: Account<'info, Fanout>,
    #[account(
    constraint = fanout.account_key == holding_account.key(),
    seeds = [b"fanout-native-account", fanout.key().as_ref()],
    bump
    )]
    /// CHECK: Checked in Program
    pub holding_account: UncheckedAccount<'info>,
    /// SPL token account containing the token of the sale to be canceled.
    #[account(mut)]
    /// CHECK: Checked in Program
    pub metadata: UncheckedAccount<'info>,

    #[account(address=mpl_token_metadata::id())]
    /// CHECK: Checked in Program
    pub token_metadata_program: UncheckedAccount<'info>,
}

pub fn pass_ua_back(ctx: Context<PassUaBack>, data: Data) -> Result<()> {
    let metadata = ctx.accounts.metadata.to_account_info();
    let holding_account = &ctx.accounts.holding_account;
    
    assert_owned_by(&metadata, &mpl_token_metadata::id())?;
    let meta_data = metadata.try_borrow_data()?;
     if meta_data[0] != mpl_token_metadata::state::Key::MetadataV1 as u8 {
    return Err(UpdateMetadataError::InvalidMetadata.into());
    }
    invoke_signed(
        &update_metadata_accounts(
           
        ctx.accounts.token_metadata_program.key(),
        metadata.key(),
        holding_account.key(),
                None,
                Some(data),
                None,
        ),
        &[metadata.to_owned(), holding_account.to_account_info()],
        &[&[
            "fanout-native-account".as_bytes(),
            ctx.accounts.fanout.key().as_ref(),
            &[*ctx.bumps.get("holding_account").unwrap()],
        ]],
    )
    .map_err(|e| {
        error::Error::ProgramError(ProgramErrorWithOrigin {
            program_error: e,
            error_origin: None,
            compared_values: None,
        })
    })?;
    Ok(())
}
*/


struct TokenTransferParams<'a: 'b, 'b> {
    /// CHECK: Checked in Program
    source: AccountInfo<'a>,
    /// CHECK: Checked in Program
    destination: AccountInfo<'a>,
    amount: u64,
    /// CHECK: Checked in Program
    authority: AccountInfo<'a>,
    authority_signer_seeds: &'b [&'b [u8]],
    /// CHECK: Checked in Program
    token_program: AccountInfo<'a>,
}
/// Issue a spl_token `Transfer` instruction.
#[inline(always)]
fn spl_token_transfer(params: TokenTransferParams<'_, '_>) -> Result<()> {
    let TokenTransferParams {
        source,
        destination,
        authority,
        token_program,
        amount,
        authority_signer_seeds,
    } = params;
    let result = invoke_signed(
        &spl_token::instruction::transfer(
            token_program.key,
            source.key,
            destination.key,
            authority.key,
            &[],
            amount,
        )?,
        &[source, destination, authority, token_program],
       &[authority_signer_seeds],
    );

    result.map_err(|_| UpdateMetadataError::InvalidMetadata.into())
}

