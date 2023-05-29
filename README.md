# Airdrop Smart Contract

The Airdrop Smart Contract is a Solidity contract that enables the distribution of ETH and ERC20 tokens to multiple addresses in a single transaction. It provides functions to perform airdrops with different amounts of ether or tokens to either the same or different addresses.

## Prerequisites

Make sure you have the following dependencies installed in your project:

- Solidity version 0.8.10
- OpenZeppelin Contracts library

## Usage

To use the Airdrop Smart Contract, follow the steps below:

1. Deploy the contract by compiling and deploying the Solidity code using a compatible Ethereum development framework or tool.

2. Once deployed, you can interact with the contract by calling its functions with the required parameters.

## Functions

### `aidropDifferentEtherToAddresses`

This function allows you to airdrop different amounts of ether to different addresses.

#### Parameters

- `recipients`: An array of Ethereum addresses that will receive ether.
- `values`: The corresponding amounts of ether to be sent to each address.

### `aidropSameEtherToAddresses`

This function allows you to airdrop the same amount of ether to different addresses.

#### Parameters

- `recipients`: An array of Ethereum addresses that will receive ether.

### `airdropDifferentTokenToAddresses`

This function allows you to airdrop different amounts of ERC20 tokens to different addresses.

#### Parameters

- `token`: The address of the ERC20 token contract.
- `recipients`: An array of Ethereum addresses that will receive tokens.
- `values`: The corresponding amounts of tokens to be sent to each address.

### `airdropSameTokenToAddresses`

This function allows you to airdrop the same amount of ERC20 tokens to different addresses.

#### Parameters

- `token`: The address of the ERC20 token contract.
- `recipients`: An array of Ethereum addresses that will receive tokens.
- `value`: The total amount of tokens to be distributed among the recipients.

## Custom Errors

The following custom errors can be thrown by the smart contract:

- `SizeofRecipientsAndValuesArrayNotEqual`: Thrown when the lengths of the `recipients` and `values` arrays provided in the airdrop functions are not equal.
- `CannotSendZeroAmountToEachAddress`: Thrown when attempting to airdrop zero ether or tokens to each address.

## Events

The contract emits the following event:

- `airdropSuccessful`: This event is emitted after a successful airdrop. It includes the `owner` (caller of the airdrop function) and the total `amount` of ether or tokens distributed.

## License

This smart contract is licensed under the UNLICENSED license.
