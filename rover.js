class Rover {
  constructor(position) {
    this.position = position,
    this.mode = 'NORMAL',
    this.generatorWatts = 110
  }

  receiveMessage(message) {

    for (let i = 0; i < message.commands.length; i++) {

      if (message.commands[i].commandType === 'MODE_CHANGE') {
        this.mode = message.commands[i].value;
      }

      if (message.commands[i].commandType === 'MOVE') {
        if (this.mode = 'NORMAL') {
          this.position = message.commands[i].value;
        } else if (this.mode = 'LOW_POWER') {
          this.position != message.commands[i].value;
        }
      }

    };

    let returnObject = {
      message: message.name,
      commands: message.commands,
      results: [
        //0: MOVE
        {completed: true, roverStatus: {position: this.position}},
        //1: STATUS_CHECK
        {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}},
        //2: MODE_CHANGE
        {completed: true, roverStatus: {mode: this.mode}}
        ]
    };

    if (message.commands.commandType === 'MOVE') {
      if (this.mode = 'LOW_POWER') {
        returnObject.results[0].completed = false;
      }
    }

    return returnObject;
  }
}

module.exports = Rover;