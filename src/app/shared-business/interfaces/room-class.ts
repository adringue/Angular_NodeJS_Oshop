export class Room {
  constructor(public chairsNumber: number, public color: string) {

    this.chairsNumber = chairsNumber;
    this.color = color;
  }

  myRoomColor = () => {
    return this.color;
    // console.log(this.roomColor);
  }

}
