import { Room } from './room-class';
export class Rooms {
  constructor(public allRooms: Room[]) {
    this.allRooms = allRooms;
  }
  getAllRoomsColor (rooms: Room[]) {
    // console.log(rooms);

  // tslint:disable-next-line:forin
  for (const colors in rooms) {
    return (rooms[colors].color);

  }
}

}
