// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

/// @dev Importing openzeppelin libraries.
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ApproveToken {
    function approveAnyTokenToAddress(
        IERC20 tokenAddress,
        address _to,
        uint256 _amount
    ) external {
        require(address(tokenAddress) != address(0), "Invalid Token Address");
        require(_to != address(0), "Invalid _to address");
        require(_amount > 0, "Amount <=0");

        tokenAddress.approve(_to, _amount);
    }
}
