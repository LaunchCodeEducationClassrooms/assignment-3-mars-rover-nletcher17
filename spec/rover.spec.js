const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  })

  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover();
    let commands = new Command('TYPE');
    let message = new Message('Test 8', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test 8');
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover();
    let commandOne = new Command('TYPE', 'VALUE');
    let commandTwo = new Command('TYPE_TWO', 'VALUE_TWO');
    let commands = [commandOne, commandTwo];
    let message = new Message('Test 9', commands);
    let response = rover.receiveMessage(message);
    expect(response.commands.length).toEqual(commands.length);
    })

  it("responds correctly to status check command", function() {
    let rover = new Rover(87382098);
    let commands = new Command('STATUS_CHECK');
    let message = new Message('Test 10', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[1].roverStatus.position).toEqual(87382098);
  })
  
  it("responds correctly to mode change command", function() {
    let rover = new Rover();
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test 11', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[2].completed).toEqual(true);
    expect(response.results[2].roverStatus.mode).toEqual('LOW_POWER');
  })

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(0, 'LOW_POWER', 110);
    let commands = new Command('MOVE', 98382);
    let message = new Message('Test 12', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(false);
    expect(response.results[0].roverStatus.position).toEqual(0);
  })

  it("responds with position for move command", function() {
    let rover = new Rover(0);
    let commandOne = new Command('MODE_CHANGE', 'NORMAL');
    let commandTwo = new Command('MOVE', 98382);
    let commands = [commandOne, commandTwo];
    let message = new Message('TEST 13', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  })

});
