use crate::cli_api::init_api;
use anchor_client::anchor_lang::solana_program::example_mocks::solana_sdk::signature::Keypair;
use anchor_client::anchor_lang::AccountDeserialize;
use anchor_client::solana_client::client_error::ClientError;
use anchor_client::solana_client::rpc_client::RpcClient;
use anchor_client::solana_client::rpc_config::{RpcAccountInfoConfig, RpcProgramAccountsConfig};

use anchor_client::solana_client::rpc_filter::{Memcmp, MemcmpEncodedBytes, RpcFilterType};

use clap::{ArgMatches, Error, ErrorKind};
use update_metadata::state::{Fanout, FanoutMint};
use solana_account_decoder::UiAccountEncoding;
use solana_sdk::commitment_config::{CommitmentConfig, CommitmentLevel};
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signature::read_keypair_file;

use std::str::FromStr;
use std::time::Duration;

mod cli_api;

fn setup_connection(app: &ArgMatches) -> (RpcClient, Keypair) {
    let json = app
        .value_of("rpc")
        .unwrap_or(&"wss://api.devnet.solana.com".to_owned())
        .to_owned();
    let _wss = json.replace("https", "wss");

    let _payer = read_keypair_file(app.value_of("keypair").unwrap()).unwrap();
    let timeout = Duration::from_secs(30);

    (
        RpcClient::new_with_timeout_and_commitment(json, timeout, CommitmentConfig::confirmed()),
        Keypair,
    )
}

#[derive(Debug)]
struct UpdateMetadataMint {
    fanout_mint: FanoutMint,
    address: Pubkey,
}

#[derive(Debug)]
struct UpdateMetadataObject {
    pub fanout: Fanout,
    pub address: Pubkey,
    pub children: Option<UpdateMetadataMint>,
}

fn main() {
    let app = init_api().get_matches();
    let (rpc, _payer) = setup_connection(&app);
    let (rpc2, _payer) = setup_connection(&app);

    let missing_update_metadata_address =
        || Error::with_description("Missing UpdateMetadata Address", ErrorKind::ArgumentNotFound);
    let invalid_update_metadata_address =
        || Error::with_description("Invalid UpdateMetadata Address", ErrorKind::InvalidValue);
    let update_metadata_not_found =
        || Error::with_description("UpdateMetadata not found at address", ErrorKind::InvalidValue);
    let _update_metadata_mint_not_found =
        || Error::with_description("No UpdateMetadatas for mint found", ErrorKind::InvalidValue);
    let update_metadata_mint_rpcs_error =
        |e: ClientError| Error::with_description(&*format!("{:?}", e), ErrorKind::InvalidValue);
    let get_update_metadata_account = |rpc: RpcClient| {
        move |update_metadata_pub: Pubkey| {
            let hpu = &update_metadata_pub;
            rpc.get_account_data(hpu)
                .map(|d| (update_metadata_pub, d))
                .map_err(|_| return update_metadata_not_found())
        }
    };

    let get_update_metadata_mints = |rpc: RpcClient| {
        move |update_metadata_pub: Pubkey, _fanout: Fanout| {
            rpc.get_program_accounts_with_config(
                &update_metadata::id(),
                RpcProgramAccountsConfig {
                    filters: Some(vec![RpcFilterType::Memcmp(Memcmp {
                        offset: 40,
                        bytes: MemcmpEncodedBytes::Base58(update_metadata_pub.to_string()),
                        encoding: None,
                    })]),
                    account_config: RpcAccountInfoConfig {
                        encoding: Some(UiAccountEncoding::Base64),
                        data_slice: None,
                        commitment: Some(CommitmentConfig {
                            commitment: CommitmentLevel::Confirmed,
                        }),
                    },
                    with_context: None,
                },
            )
            .map_err(|e| update_metadata_mint_rpcs_error(e))
            .map(|result| -> Vec<UpdateMetadataMint> {
                result
                    .iter()
                    .map(|(addr, fanoutMintAccount)| UpdateMetadataMint {
                        fanout_mint: FanoutMint::try_deserialize(
                            &mut fanoutMintAccount.data.as_slice(),
                        )
                        .unwrap(),
                        address: *addr,
                    })
                    .collect()
            })
        }
    };

    let parse_update_metadata_account = |input: (Pubkey, Vec<u8>)| -> Result<UpdateMetadataObject, Error> {
        Fanout::try_deserialize(&mut input.1.as_slice())
            .map(|f| UpdateMetadataObject {
                address: input.0,
                fanout: f,
                children: None,
            })
            .map_err(|_| invalid_update_metadata_address())
    };

    match app.subcommand() {
        (SHOW, Some(arg_matches)) => {
            println!("Running {}", SHOW);
            let update_metadata_pub = arg_matches
                .value_of("update_metadata_address")
                .ok_or(missing_update_metadata_address())
                .and_then(|update_metadata_address| {
                    Pubkey::from_str(update_metadata_address).map_err(|_| invalid_update_metadata_address())
                });
            let get_mints = get_update_metadata_mints(rpc);
            let get_h = get_update_metadata_account(rpc2);
            update_metadata_pub
                .and_then(get_h)
                .and_then(parse_update_metadata_account)
                .and_then(|hy| {
                    println!("{:#?}", hy);
                    get_mints(hy.address, hy.fanout)
                })
                .and_then(|mints| {
                    if mints.is_empty() {
                        println!("No UpdateMetadata Children");
                        return Ok(());
                    }
                    mints.iter().for_each(|m| {
                        println!("\n\n{:#?}", m);
                    });
                    return Ok(());
                })
                .map_err(|e| {
                    println!("{:?}", e);
                })
                .unwrap();
        }
        _ => unreachable!(),
    }
}
