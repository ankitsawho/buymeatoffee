// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract toffee {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buymeatoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "Don't pay zero");
        owner.transfer(msg.value);
        memos.push(Memo(_name, _message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
