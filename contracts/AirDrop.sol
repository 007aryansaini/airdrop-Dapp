// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

/// @dev Importing openzeppelin libraries.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract Airdrop is Initializable, ReentrancyGuardUpgradeable {
    event airdropSuccessful(address owner, uint amount);

    /// @dev Initialize ReentrancyGuard.
    function initialize() external initializer {
        __ReentrancyGuard_init();
    }

    /**
     * @dev airdrop different amount of ethers to different addresses.
     * @param recipients: An array of ETH address who will receive ETH.
     * @param values: The ETH amounts for each address.
     */
    function aidropDifferentEtherToAddresses(
        address[] calldata recipients,
        uint256[] calldata values
    ) external payable nonReentrant {
        /// @dev Parameter checking.
        require(recipients.length == values.length, "ArraySizeShouldBeSame");

        uint256 amount;

        /// @dev Dispersing ETH to addresses.
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: values[i]}("");
            require(success, "ETHTransferFailed");
            amount += values[i];
        }
        /// @dev Refunding back the rest amount.
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = msg.sender.call{value: balance}("");
            require(success, "ETHRefundTransferFailed");
        }

        emit airdropSuccessful(msg.sender, amount);
    }

    /**
     * @dev airdrop equal amount of ethers to different addresses.
     * Amount will be msg.value/length.
     * @param recipients: An array of ETH address who will receive ETH.
     */
    function aidropSameEtherToAddresses(
        address[] calldata recipients
    ) external payable nonReentrant {
        /// @dev Getting the amount per address.
        uint256 airdropPerAddress = msg.value / recipients.length;
        require(airdropPerAddress > 0, "ETHPerAddressShouldBeMoreThanZero");

        /// @dev Dispersing ETH to addresses.
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: airdropPerAddress}("");
            require(success, "ETHTransferFailed");
        }
        /// @dev Refunding back the rest amount.
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = msg.sender.call{value: balance}("");
            require(success, "ETHRefundTransferFailed");
        }

        emit airdropSuccessful(msg.sender, msg.value);
    }

    /**
     * @dev airdrop different amount of TOKEN to different addresses.
     * @param token: The token address for the airdrop.
     * @param recipients: An array of ETH address who will receive ETH.
     * @param values: The ETH amounts for each address.
     */
    function airdropDifferentTokenToAddresses(
        IERC20 token,
        address[] calldata recipients,
        uint256[] calldata values
    ) external nonReentrant {
        /// @dev Parameter checking.
        require(recipients.length == values.length, "ArraySizeShouldBeSame");

        uint256 amount;
        /// @dev Dispersing TOKEN to addresses.
        for (uint256 i = 0; i < recipients.length; i++) {
            bool success = token.transferFrom(
                msg.sender,
                recipients[i],
                values[i]
            );
            require(success, "TokenTransferFailed");
            amount += values[i];
        }

        emit airdropSuccessful(msg.sender, amount);
    }

    /**
     * @dev airdrop same amount of TOKEN to different addresses.
     * Amount will be value/length.
     * @param recipients: An array of ETH address who will receive ETH.
     * @param value: The amount for airdrop.
     */
    function airdropSameTokenToAddresses(
        IERC20 token,
        address[] calldata recipients,
        uint256 value
    ) external nonReentrant {
        /// @dev Getting the amount per address.
        uint256 airdropPerAddress = value / recipients.length;
        require(airdropPerAddress > 0, "TokenPerAddressShouldBeMoreThanZero");

        /// @dev Dispersing TOKEN to addresses.
        for (uint256 i = 0; i < recipients.length; i++) {
            bool success = token.transferFrom(
                msg.sender,
                recipients[i],
                airdropPerAddress
            );
            require(success, "TokenTransferFailed");
        }

        emit airdropSuccessful(msg.sender, value);
    }
}
